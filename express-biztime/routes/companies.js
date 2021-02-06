const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");
const slugify = require("slugify");

/* Get data for all companies */
router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM companies`);
    return res.json({ companies: results.rows });
  } catch (err) {
    return next(err);
  }
});

/* Get data for one company */
router.get("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const results = await db.query(`SELECT * FROM companies WHERE code = $1`, [
      code,
    ]);
    if (results.rows.length === 0) {
      throw new ExpressError(`Can't find company with code ${code}`, 404);
    }
    const invoices = await db.query(
      "SELECT * FROM invoices WHERE comp_code=$1",
      [code]
    );
    const companyData = results.rows[0];
    companyData.invoices = invoices.rows;

    return res.json({ company: companyData });
  } catch (err) {
    return next(err);
  }
});

/* Add new company */
router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const code = slugify(name, {
      lower: true,
      strict: true,
    });
    const results = await db.query(
      "INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description",
      [code, name, description]
    );
    return res.status(201).json({ user: results.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/* Update data for a company */
router.put("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const { name, description } = req.body;
    const results = await db.query(
      "UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description",
      [name, description, code]
    );
    if (results.rows.length === 0) {
      throw new ExpressError(`Cannot find company with code ${code}`, 404);
    }
    return res.json({ company: results.rows[0] });
  } catch (err) {}
});

/* Delete a company */
router.delete("/:code", async (req, res, next) => {
  try {
    const results = db.query("DELETE FROM companies WHERE code = $1", [
      req.params.code,
    ]);
    return res.json({ msg: `Company with code ${req.params.code} deleted.` });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

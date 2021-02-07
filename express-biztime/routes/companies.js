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
    const results = await db.query(
      `SELECT c.code, c.name, c.description, i.industry 
      FROM companies AS c
      LEFT JOIN companies_industries AS c_i 
      ON c.code = c_i.company_code 
      LEFT JOIN industries AS i 
      ON c_i.industry_code = i.code 
      WHERE c.code=$1;`,
      [code]
    );
    if (results.rows.length === 0) {
      throw new ExpressError(`Can't find company with code ${code}`, 404);
    }
    const invoice_results = await db.query(
      "SELECT * FROM invoices WHERE comp_code=$1",
      [code]
    );
    const { c_code, name, description } = results.rows[0];
    const invoices = invoice_results.rows;
    const industries = results.rows.map((r) => r.industry);

    return res.json({
      company: c_code,
      name,
      description,
      industries,
      invoices,
    });
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

/* Associate a company with an industry */
router.put("/:code/industry", async (req, res, next) => {
  try {
    const results = await db.query(
      `INSERT INTO companies_industries (company_code, industry_code)
        VALUES ($1, $2) RETURNING company_code, industry_code`,
      [req.params.code, req.body.industry_code]
    );
    return res.json(results.rows[0]);
  } catch (err) {
    return next(err);
  }
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

const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

/* Gets all invoices */
router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM INVOICES`);
    return res.json({ invoices: results.rows });
  } catch (err) {
    return next(err);
  }
});

/* Gets one invoice */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await db.query("SELECT * FROM invoices WHERE id=$1", [id]);
    if (results.rows.length === 0) {
      throw new ExpressError(`Can't find invoice with id ${id}`, 404);
    }
    return res.json({ invoice: results.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/* Creates a new invoice. */
router.post("/", async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body;
    const results = await db.query(
      "INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date",
      [comp_code, amt]
    );
    return res.status(201).json({ invoice: results.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/* Updates an invoice. */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amt, paid } = req.body;

    // Query database for current record of payment or non-payment paid status
    const record = await db.query(
      "SELECT paid, paid_date FROM invoices WHERE id=$1",
      [id]
    );

    let paid_date;
    if (paid) {
      if (!record.rows[0].paid_date) {
        paid_date = new Date();
      } else {
        paid_date = current.rows[0].paid_date;
      }
    } else {
      paid_date = null;
    }

    // Update record
    const results = await db.query(
      "UPDATE invoices SET amt=$1, paid=$2, paid_date=$3 WHERE id=$4 RETURNING id, comp_code, amt, paid, add_date, paid_date",
      [amt, paid, paid_date, id]
    );

    if (results.rows.length === 0) {
      throw new ExpressError(`Invoice with id ${id} not found`, 404);
    }

    return res.json({ invoice: results.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/* Deletes an invoice. */
router.delete("/:id", async (req, res, next) => {
  try {
    // TODO: add returning clause and throw 404 if no results
    const results = db.query("DELETE FROM invoices WHERE id = $1", [
      req.params.id,
    ]);
    return res.json({ msg: `Invoice with id ${req.params.id} deleted.` });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

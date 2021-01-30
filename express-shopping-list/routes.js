const express = require("express");
const ExpressError = require("./ExpressError");
const router = new express.Router();
const items = require("./fakeDb");

router.get("/items", function (req, res, next) {
  /* this should render a list of shopping items.
   ** Here is what a response looks like:
   ** [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
   */
  return res.json(items);
});

router.post("/items", function (req, res, next) {
  /* this route should accept JSON data and add it to the shopping list.
   ** Here is what a sample request/response looks like:
   ** {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}} */
  // TODO
  try {
    if (!req.body.name || !req.body.price)
      throw new ExpressError("Both name and price are required", 400);
    if (!parseFloat(req.body.price)) {
      throw new ExpressError("Price must be a number", 400);
    }
    const newItem = { name: req.body.name, price: parseFloat(req.body.price) };
    items.push(newItem);
    return res.status(201).json({ item: newItem });
  } catch (e) {
    return next(e);
  }
});

router.get("/items/:name", function (req, res, next) {
  /* this route should display a single item’s name and price. */
  // TODO
});

router.patch("/items/:name", function (req, res, next) {
  /* this route should modify a single item’s name and/or price.
   ** Here is what a sample request/response looks like:
   ** {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}} */
  // TODO
});

router.delete("/items/:name", function (req, res, next) {
  /* This route should allow you to delete a specific item from the array.
   ** Here is what a sample response looks like:
   ** {message: “Deleted”}
   */
  // TODO
});

module.exports = router;

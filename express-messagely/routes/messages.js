const Router = require("express").Router;
const Message = require("../models/message");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const ExpressError = require("../expressError");

const router = new Router();

function ensureToOrFromUser(toUser, fromUser) {
  if (req.user.username === toUser || req.user.username === fromUser) {
    return next();
  } else {
    return next({ status: 401, message: "Unauthorized" }, 401);
  }
}

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get("/:id", async function (req, res, next) {
  try {
    if (!req.user) {
      throw new ExpressError({ status: 401, message: "Unauthorized" }, 401);
    }
    let result = await Message.get(req.params.id);
    if (result.rows.length === 0) {
      throw new ExpressError(
        { status: 404, message: "Message not found" },
        404
      );
    }
    if (
      req.user.username === result.from_user ||
      req.user.username === result.to_user
    ) {
      return res.json(result);
    } else {
      throw new ExpressError({ status: 401, message: "Unauthorized" }, 401);
    }
  } catch (err) {
    return next(err);
  }
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

module.exports = router;

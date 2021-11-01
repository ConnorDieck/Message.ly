/** Routes for demonstrating authentication in Express. */

const express = require("express");
const jwt = require("jsonwebtoken");
const router = new express.Router();

const { SECRET_KEY } = require("../config");
const User = require("../models/user");
const ExpressError = require("../expressError");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post("/register", async (req, res, next) => {
	try {
		let { username } = await User.register(req.body);
		let token = jwt.sign({ username }, SECRET_KEY);
		return res.json({ token });
	} catch (e) {
		// if (e.code === "23505") {
		// 	return next(new ExpressError("Username taken. Please pick another!", 400));
		// }
		next(e);
	}
});

module.exports = router;

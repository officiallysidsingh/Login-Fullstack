const express = require("express");
const router = express.Router();

/* POST Methods */

// To register a new user
router.route("/register").post((req, res) => {
  res.json({ message: "Register POST Request" });
});

// Send the email
router.route("/registerMail").post((req, res) => {});

// To authenticate a user
router.route("/authenticate").post((req, res) => {});

// To login in the app
router.route("/login").post((req, res) => {});

/* GET Methods */

// To get the user with username
router.route("/user/:username").get((req, res) => {});

// To generate random OTP
router.route("/generateOTP").get((req, res) => {});

// To verify the generated OTP
router.route("/verifyOTP").get((req, res) => {});

// Reset all the variables
router.route("/createResetSession").get((req, res) => {});

/* PUT Methods */

// To update the user profile
router.route("/updateUser").put((req, res) => {});

// To reset the password
router.route("/resetPassword").put((req, res) => {});

module.exports = router;

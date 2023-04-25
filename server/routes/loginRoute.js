const express = require("express");
const router = express.Router();

// Controllers
const {
  registerUser,
  loginUser,
  getUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  updateUser,
  resetPassword,
} = require("../controllers/loginController");

/* POST Methods */

// To register a new user
router.route("/register").post(registerUser);

// Send the email
// router.route("/registerMail").post((req, res) => {});

// To authenticate a user
// router.route("/authenticate").post((req, res) => {});

// To login in the app
router.route("/login").post(loginUser);

/* GET Methods */

// To get the user with username
router.route("/user/:username").get(getUser);

// To generate random OTP
router.route("/generateOTP").get(generateOTP);

// To verify the generated OTP
router.route("/verifyOTP").get(verifyOTP);

// Reset all the variables
router.route("/createResetSession").get(createResetSession);

/* PUT Methods */

// To update the user profile
router.route("/updateUser").put(updateUser);

// To reset the password
router.route("/resetPassword").put(resetPassword);

module.exports = router;

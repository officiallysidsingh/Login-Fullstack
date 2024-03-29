const express = require("express");
const router = express.Router();

// Controllers For Login
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

// Controllers For Mail
const mailer = require("../controllers/mailer");

/* Verification Middlewares Import */
const verifyUser = require("../middlewares/verifyUser");

/* User Exists Middleware Import */
const userExist = require("../middlewares/userExist");

/* OTP Local Variable Middlerware */
const localVariables = require("../middlewares/localVariables");

/* POST Methods */

// To register a new user
router.route("/register").post(registerUser);

// Send the email
router.route("/registerMail").post(mailer);

// To authenticate a user
router.route("/authenticate").post(userExist, (req, res) => res.end());

// To login in the app
router.route("/login").post(userExist, loginUser);

/* GET Methods */

// To get the user with username
router.route("/user/:username").get(getUser);

// To generate random OTP
router.route("/generateOTP").get(userExist, localVariables, generateOTP);

// To verify the generated OTP
router.route("/verifyOTP").get(userExist, verifyOTP);

// Reset all the variables
router.route("/createResetSession").get(createResetSession);

/* PUT Methods */

// To update the user profile
router.route("/updateUser").put(verifyUser, updateUser);

// To reset the password
router.route("/resetPassword").put(userExist, resetPassword);

module.exports = router;

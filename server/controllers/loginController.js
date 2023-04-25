const asyncHandler = require("express-async-handler");
const Login = require("../models/loginModel");

// POST Methods Controllers

/*
    @desc    Register a new user
    
    @route   POST /api/register

    @param: {
        "username": "example123",
        "password": "Admin123",
        "email": "example@gmail.com",
        "firstname": "John",
        "lastname": "Doe",
        "phone": "1234567890",
        "address": "1234 Example Street",
        "profile": ""
    }
*/
const registerUser = asyncHandler(async (req, res) => {
  // const { username, email, password } = req.body;
  res.json({ message: "Register POST Request" });
});

/*
    @desc    Login a user

    @route   POST /api/login

    @param: {
        "username": "example123",
        "password": "Admin123"
    }

*/
const loginUser = asyncHandler(async (req, res) => {
  ////const { username, email, password } = req.body;
  res.json({ message: "Login POST Request" });
});

// GET Methods Controllers

/*
    @desc    Get a user

    @route   GET /api/user/:username
*/
const getUser = asyncHandler(async (req, res) => {
  // const { username, email, password } = req.body;
  res.json({ message: "getUser GET Request" });
});

/*
    @desc    Generate OTP

    @route   GET /api/generateOTP
*/
const generateOTP = asyncHandler(async (req, res) => {
  // const { username, email, password } = req.body;
  res.json({ message: "generateOTP GET Request" });
});

/*
    @desc    Verify OTP

    @route   GET /api/verifyOTP
*/
const verifyOTP = asyncHandler(async (req, res) => {
  // const { username, email, password } = req.body;
  res.json({ message: "verifyOTP GET Request" });
});

/*
    @desc    Update a user

    @route   PUT /api/updateUser

    @param: {
        "id": "<userid>"
    }

    @body: {
        firstname: "",
        address: "",
        profile: ""
    }
 */
const updateUser = asyncHandler(async (req, res) => {
  // const { username, email, password } = req.body;
  res.json({ message: "updatUser PUT Request" });
});

/*
    @desc    Reset all the variables

    @route   GET /api/createResetSession

    Successfully redirect user when OTP is valid
*/
const createResetSession = asyncHandler(async (req, res) => {
  // const { username, email, password } = req.body;
  res.json({ message: "createResetSession GET Request" });
});

/*
    @desc    Reset password

    @route   PUT /api/resetPassword

    Update the password once the OTP is verified and the session is created
*/
const resetPassword = asyncHandler(async (req, res) => {
  // const { username, email, password } = req.body;
  res.json({ message: "resetPassword PUT Request" });
});

const asyncHandler = require("express-async-handler");
const Login = require("../models/login.model");
const bcrypt = require("bcrypt");

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
  const { username, password, email, profile } = req.body;

  //Check if all the fields are filled
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  //Check if user already exists
  const existUsername = await Login.findOne({ username });
  if (existUsername) {
    res.status(400);
    throw new Error("Username already exists");
  }

  //Check if email already exists
  const existEmail = await Login.findOne({ email });
  if (existEmail) {
    res.status(400);
    throw new Error("Email already exists");
  }

  //Salting and Hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create a new user
  const user = await Login.create({
    username,
    password: hashedPassword,
    email,
    profile: profile || "",
  });

  //If user is registered successfully
  if (user) {
    res.status(201).json({ message: "User Registered Successfully" });
  }

  //If user is not created successfully
  else {
    res.status(400);
    throw new Error("Invalid user data");
  }
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
    @desc    Reset all the variables

    @route   GET /api/createResetSession

    Successfully redirect user when OTP is valid
*/
const createResetSession = asyncHandler(async (req, res) => {
  // const { username, email, password } = req.body;
  res.json({ message: "createResetSession GET Request" });
});

// PUT Methods Controllers

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
  res.json({ message: "updateUser PUT Request" });
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

module.exports = {
  registerUser,
  loginUser,
  getUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  updateUser,
  resetPassword,
};

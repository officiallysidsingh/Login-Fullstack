const asyncHandler = require("express-async-handler");
const Login = require("../models/login.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

// POST Methods Controllers

/*
    @desc    Register a new user
    
    @route   POST /api/register

    @param: {
        "username": "example123",     !Required and Unique
        "password": "Admin123",       !Required
        "email": "example@gmail.com", !Required and Unique
        "profile": ""                 Optional
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
  const { username, password } = req.body;

  //Check if all the fields are filled
  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  //Check if user exists
  const user = await Login.findOne({ username });

  //If user exists
  if (user) {
    //Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    //If password matches
    if (isMatch) {
      //Create a JWT token
      const accessToken = jwt.sign(
        {
          userId: user._id,
          username: user.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );
      return res.status(200).json({
        message: "User Logged In Successfully",
        username: user.username,
        accessToken,
      });
    }

    //If password doesn't match
    else {
      res.status(400);
      throw new Error("Password is incorrect");
    }
  }

  //If user doesn't exist
  else {
    res.status(404);
    throw new Error("User not found");
  }
});

// GET Methods Controllers

/*
    @desc    Get a user

    @route   GET /api/user/:username
*/
const getUser = asyncHandler(async (req, res) => {
  const { username } = req.params;

  //Check if username is present
  if (!username) {
    res.status(501);
    throw new Error("Invalid Username");
  }

  //Check if user exists
  const user = await Login.findOne({ username });

  //If user exists
  if (user) {
    res.status(200);
    res.json({
      userId: user._id,
      username: user.username,
      email: user.email,
      profile: user.profile,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/*
    @desc    Generate OTP

    @route   GET /api/generateOTP
*/
const generateOTP = asyncHandler(async (req, res) => {
  // Get username from query params
  const { username } = req.query;

  if (!username) {
    res.status(400);
    throw new Error("Invalid Username");
  }

  // Check if username is present
  let exist = await Login.findOne({ username });
  if (!exist) {
    res.status(404);
    throw new Error("User not found");
  }

  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(200).json({ code: req.app.locals.OTP });
});

/*
    @desc    Verify OTP

    @route   GET /api/verifyOTP
*/
const verifyOTP = asyncHandler(async (req, res) => {
  // Get username from query params
  const { username } = req.query;

  // Check if username is present
  if (!username) {
    res.status(400);
    throw new Error("Invalid Username");
  }

  // Check if user is present
  let exist = await Login.findOne({ username });

  // If user is not present
  if (!exist) {
    res.status(404);
    throw new Error("User not found");
  }

  // If user present
  // Get OTP from query params
  const { code } = req.query;

  // Check if OTP is present
  if (!code) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  // If OTP is present
  // Check if OTP is valid
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // Reset OTP
    req.app.locals.resetSession = true; // Start Session for Reset Password
    return res.status(200).json({ message: "OTP Verified Successfully" });
  }

  // If OTP is invalid
  else {
    res.status(400);
    throw new Error("Invalid OTP");
  }
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
  const { userId } = req.user;

  // Check if user id is present
  if (!userId) {
    res.status(400);
    throw new Error("Invalid User Id");
  }

  // Check if user exists
  const user = await Login.findById(userId);

  // If user doesn't exist
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  // If User Exists, Update the User
  else {
    const updatedUser = await Login.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    // If user is updated successfully
    res.status(201).json({
      message: "Record Updated Successfully",
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profile: updatedUser.profile,
    });
  }
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

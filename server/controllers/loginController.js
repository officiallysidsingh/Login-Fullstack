const asyncHandler = require("express-async-handler");
const Login = require("../models/login.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  // Check if user exists
  const userId = await Login.findById(req.query.id);

  // If user doesn't exist
  if (!userId) {
    res.status(404);
    throw new Error("User Not Found");
  }

  // If User Exists, Update the User
  else {
    const updatedUser = await Login.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    });

    // If user is updated successfully
    res.status(200).json(updatedUser);
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

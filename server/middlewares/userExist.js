const asyncHandler = require("express-async-handler");
const Login = require("../models/login.model");

const userExist = asyncHandler(async (req, res, next) => {
  const { username } = req.method == "GET" ? req.query : req.body;

  // Check if username exists
  if (!username) {
    res.status(400);
    throw new Error("Username is required");
  }

  // Check if user with that username exists in DB
  let exist = await Login.findOne({ username });

  // If user doesn't exist
  if (!exist) {
    res.status(404);
    throw new Error("User not found");
  }

  // If user exists
  next();
});

module.exports = userExist;

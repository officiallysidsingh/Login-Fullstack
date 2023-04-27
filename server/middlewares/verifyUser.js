const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyUser = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  // Check if token exists
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    // If token is not present
    if (!token) {
      res.status(401);
      throw new Error("User Not Authorized");
    } else {
      // Decode the token
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      // Send token to req.user
      req.user = decoded;
      next();
    }
  } else {
    res.status(401);
    throw new Error("No Token Found");
  }
});

module.exports = verifyUser;

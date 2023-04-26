const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyUser = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  // Check if token exists
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User Not Authorized");
      } else {
        req.user = decoded;
        next();
      }
    });

    // If token is not present
    if (!token) {
      res.status(401);
      throw new Error("User Not Authorized");
    }
  }
});

module.exports = verifyUser;

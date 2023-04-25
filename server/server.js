const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

// Connect to MongoDB
connectDB();

//PORT
const PORT = process.env.PORT || 8080;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

// HTTP GET Request
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server connected to http://localhost:${PORT}`);
});

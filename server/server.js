const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

const PORT = 8080;

// HTTP GET Request
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server connected to http://localhost:${PORT}`);
});

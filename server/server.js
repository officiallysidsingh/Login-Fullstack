const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/dbConnection");
const loginRoute = require("./routes/loginRoute");
const errorHandler = require("./middlewares/errorHandler");

// Load env variables
const dotenv = require("dotenv").config();

// Connect to MongoDB
connectDB();

//PORT
const PORT = process.env.PORT || 8080;

const app = express();

// Middleware Libraries
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

// HTTP GET Request
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

/* API Routes */
app.use("/api", loginRoute);

// Error Handling Custom Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server connected to http://localhost:${PORT}`);
});

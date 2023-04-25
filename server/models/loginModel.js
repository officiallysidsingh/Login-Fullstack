const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Login", LoginSchema);

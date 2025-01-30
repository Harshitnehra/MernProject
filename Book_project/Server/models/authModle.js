const mongoose = require("mongoose");

const authschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const authmodle = mongoose.model("users", authschema);
module.exports = authmodle;

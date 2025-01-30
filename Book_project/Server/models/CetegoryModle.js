const mongoose = require("mongoose");

const categoryschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const categorymodle = mongoose.model("categor", categoryschema);
module.exports = categorymodle;

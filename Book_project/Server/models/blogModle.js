const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true,
  },
});

const blogModel = mongoose.model("blogs", blogSchema);
module.exports = blogModel;

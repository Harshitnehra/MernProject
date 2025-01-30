const blogModle = require("../models/blogModle");

class BlogControllers {
  static getallblogs = async (req, res) => {
    try {
      const fetchllblog = await blogModle.findById({user : req.user._id}); // Fetch user by ID
      if (!fetchllblog) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(fetchllblog); // Respond with user data
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  static addnewblogs = async (req, res) => {
    try {
      const { title, category, description } = req.body;
      const thumbnail = req.file ? req.file.filename : null; 
  
      if (!title || !category || !description || !thumbnail) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "User authentication failed" });
      }
  
      const newBlog = new blogModel({
        title,
        category,
        description,
        thumbnail,
        user: req.user._id, // Ensure user is added
      });
  
      const savedBlog = await newBlog.save();
      return res.status(201).json({ message: "Blog added successfully!", blog: savedBlog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

  static getsingleblogs = async (req, res) => {
    const {id} = req.params
    try {
        if(id){
            const fetchlblogid = await blogModle.findById({});
            return res.status(200).json({fetchlblogid});
        }else{
            return res.status(400).json({ message: "invalid url"});
        }
    } catch (error) {
        return res.status(400).json({ message: error.massage });
    }
  };
}

module.exports = BlogControllers;

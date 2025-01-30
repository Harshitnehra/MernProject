const express = require("express");
const AuthController = require("../controllers/authcontroller");
const BlogControllers = require("../controllers/blogcontrollers")
const categoryControllers = require("../controllers/categoryControlers")
const checkUserAuthenticated= require("../middlewares/authmiddleware")
const router = express.Router();
const multer = require("multer");
// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uplode/"); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    },
  });
  
  // Initialize Multer
  const upload = multer({ storage: storage });

// const User = require("../models/User");

router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

// procated routers
router.get("/get/allblog", checkUserAuthenticated, BlogControllers.getallblogs)
router.post("/get/blog", upload.single("thumbnail"), checkUserAuthenticated, BlogControllers.addnewblogs);

router.get("/get/blog/:id",  checkUserAuthenticated,BlogControllers.getsingleblogs)

router.get("/get/category", checkUserAuthenticated, categoryControllers.getallcategory)
router.post("/add/category", checkUserAuthenticated, categoryControllers.addnewcategory)
module.exports = router;


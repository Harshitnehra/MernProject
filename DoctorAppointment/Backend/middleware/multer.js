import multer from "multer";

// Configure storage
const storage = multer.diskStorage({
    filename: (req, file, callback) => {
    callback(null, file.originalname); 
  },
});

// Initialize Multer
const upload = multer({ storage });

export default upload;

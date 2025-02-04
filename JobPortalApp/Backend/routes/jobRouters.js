import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js"; // Ensure this middleware exists
import multer from "multer";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobControllers.js";
const router = express.Router();

// Configure Multer for file uploads (if needed)
const upload = multer({ storage: multer.memoryStorage() });

// Authentication Routes
router.post("/post", authenticateUser, postJob);
router.get("/get", authenticateUser, getAllJobs);
router.get("/getadminjobs", authenticateUser, getAdminJobs);
router.get("/get/:id", authenticateUser, getJobById);

export default router;
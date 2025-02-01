import express from "express";
import { register, login, logout, updateProfile } from "../controllers/user.controllers.js";
import { authenticateUser } from "../middlewares/authMiddleware.js"; // Ensure this middleware exists
import multer from "multer";

const router = express.Router();

// Configure Multer for file uploads (if needed)
const upload = multer({ storage: multer.memoryStorage() });

// Authentication Routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.put("/update-profile", authenticateUser, updateProfile);

export default router;

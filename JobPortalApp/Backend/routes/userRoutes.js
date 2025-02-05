import express from "express";
import { register, login, logout, updateProfile } from "../controllers/user.controllers.js";
import { authenticateUser } from "../middlewares/authMiddleware.js"; // Ensure this middleware exists

const router = express.Router();

// Authentication Routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.put("/update-profile", authenticateUser, updateProfile);

export default router;

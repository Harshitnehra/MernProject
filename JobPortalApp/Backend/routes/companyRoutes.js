import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js"; // Ensure this middleware exists
import multer from "multer";
import { companyregister, getcompany,getcompanybyid,updateCompany } from "../controllers/companyControllers.js";

const router = express.Router();

// Configure Multer for file uploads (if needed)
const upload = multer({ storage: multer.memoryStorage() });

// Authentication Routes
router.post("/register", authenticateUser, companyregister);
router.get("/get", authenticateUser, getcompany);
router.get("/get/:id", authenticateUser, getcompanybyid);
router.put("/update/:id", authenticateUser, updateCompany);

export default router;

import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js"; // Ensure this middleware exists
import { companyregister, getcompany,getcompanybyid,updateCompany } from "../controllers/companyControllers.js";

const router = express.Router(); 

// Authentication Routes
router.post("/register", authenticateUser, companyregister);
router.get("/get", authenticateUser, getcompany);
router.get("/get/:id", authenticateUser, getcompanybyid);
router.put("/update/:id", authenticateUser, updateCompany);

export default router;

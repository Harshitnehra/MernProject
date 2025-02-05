import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js"; // Ensure this middleware exists
import {getApplicants,updateStatus,applyJob,getAppliedJobs} from "../controllers/applicationController.js";
const router = express.Router();


// Authentication Routes
router.post("/apply/:id", authenticateUser, applyJob);
router.get("/get", authenticateUser, getAppliedJobs);
router.get("/:id/applicants", authenticateUser, getApplicants);
router.get("/status/:id/update", authenticateUser, updateStatus);

export default router;
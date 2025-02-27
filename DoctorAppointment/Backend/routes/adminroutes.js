import express from "express";
import { addDoctor, adminAllAppointment, adminDashboard, AllDoctors, AppointmentCancel, loginAdmin } from "../controllers/admincontrollers.js";
import { verifyAdminToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import { changeavailable } from "../controllers/doctorcontrollers.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor",verifyAdminToken, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors",verifyAdminToken, AllDoctors)
adminRouter.post("/change-availability",verifyAdminToken, changeavailable)
adminRouter.post("/change-appointment",verifyAdminToken, AppointmentCancel)
adminRouter.get("/dashboard",verifyAdminToken, adminDashboard)
adminRouter.get("/appointment", verifyAdminToken, adminAllAppointment)


export default adminRouter;
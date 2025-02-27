import express from "express";
import { cancelledAppointment, completeAppointment, dashboardData, doctorAppointments, doctorList, doctorlogin, getDoctorProfile, updateDoctorProfile } from "../controllers/doctorcontrollers.js";
import { authDoctor } from "../middleware/authDoctor.js";
// import { loginUser } from "../controllers/usercontrollers.js";

const doctorRouter = express.Router();

doctorRouter.get("/list" , doctorList);
doctorRouter.get("/appointments" ,authDoctor, doctorAppointments);
doctorRouter.post("/complete-appointments" ,authDoctor, completeAppointment);
doctorRouter.post("/cancelled-appointments" ,authDoctor, cancelledAppointment);
doctorRouter.post("/login", doctorlogin)
doctorRouter.get("/dashboard",authDoctor, dashboardData)
doctorRouter.get("/profile",authDoctor, getDoctorProfile)
doctorRouter.post("/updateDoctorProfile" ,authDoctor, updateDoctorProfile);

export default doctorRouter;

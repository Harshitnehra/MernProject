import validator from "validator";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctermodels.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import appointmentmodels from "../models/appointmentmodels.js";
import userModel from "../models/userModels.js";

export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
    } = req.body;
    const imageFile = req.file; // Ensure this is defined

    // Check if all required fields are provided
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fee ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format." });
    }

    // Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor with this email already exists.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure image file is provided
    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required." });
    }

    // Upload image to Cloudinary
    let imageUrl = "";
    try {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    } catch (uploadError) {
      console.error("Cloudinary Upload Error:", uploadError);
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
        error: uploadError.message,
      });
    }

    // Parse address safely
    const parsedAddress =
      typeof address === "string" ? JSON.parse(address) : address;

    // Create a new doctor
    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword, // Store hashed password
      speciality,
      degree,
      experience,
      about,
      fee,
      address: parsedAddress, // Fixed JSON parsing
      image: imageUrl, // Store Cloudinary URL
      date: Date.now(),
    });

    await newDoctor.save();
    res.status(201).json({
      success: true,
      message: "Doctor added successfully!",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// api for admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    // Validate admin credentials from environment variables
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Generate JWT Token
      const token = jwt.sign(
        email + password,
        process.env.JWT_SECRET // Secret key
      );
      return res.status(200).json({
        success: true,
        message: "Admin login successful!",
        token, // Return JWT token
      });
    } else {
      res.json({ success: false, message: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


//  api to get all doctor list for admin apnel

export const AllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true,  doctors });
  } catch (error) {
    console.error("Server Error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }

}

// api to get all appointment

export const adminAllAppointment = async (req, res) => {
  try {
    const appointments = await appointmentmodels.find({});
    res.json({ success: true,  appointments });
  } catch (error) {
    console.error("Server Error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }

}

//  api for appointment cancel
export const AppointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentmodels.findById(appointmentId)
    
    await appointmentmodels.findByIdAndUpdate(appointmentId, {cancelled:true})

    const {docId, slotDate, slotTime} = appointmentData
    const doctorData = await doctorModel.findById(docId)
    const slots_booked = doctorData.slots_booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    await doctorModel.findByIdAndUpdate(docId, {slots_booked})
    res.json({
      success: true,
      message: "Appointment cancelled successfully!",
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.json({
      success: false,
      message: "Server error, unable to cancel appointment.",
    });
  }
}

// api for admin dashboard

export const adminDashboard = async (req, res) => {
  try {
    const totalDoctors = await doctorModel.find({});
    const user = await userModel.find({});
    const Appointments = await appointmentmodels.find({})
    const dashData ={
      totalDoctors: totalDoctors.length,
      totalUsers: user.length,
      totalAppointments: Appointments.length,
      latetest: Appointments.reverse().slice(0,5)
    }
    res.json({ success: true, dashData });
  } catch (error) {
    console.error("Server Error:", error);
    res.json({
      success: false,
      message: "Server error, unable to fetch dashboard data.",
    });
  }
}

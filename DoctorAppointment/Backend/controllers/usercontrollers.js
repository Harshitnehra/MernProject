import userModel from "../models/userModels.js";
import { v2 as cloudinary } from "cloudinary";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctermodels.js";
import appointmentmodels from "../models/appointmentmodels.js";
import razorpay from "razorpay"

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required." });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format." });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate JWT Token
    // const token = jwt.sign(
    //   { id: user._id },
    //   process.env.JWT_SECRET
    //   //   { expiresIn: "1h" } // Optional expiration time
    // );

    res.json({
      success: true,
      message: "User registered successfully!",
      // token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Generate JWT Token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
        //   { expiresIn: "1h" } // Optional expiration time
      );
      res.json({
        success: true,
        message: "User logged in successfully!",
        token,
      });
    } else {
      return res.json({ success: false, message: "Incorrect password." });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//  api to get profile data

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.error("Server Error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, email, gender, dob, phone } = req.body;
    let imageFile = req.file;

    // Find the user by ID
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Update fields if provided
    if (name) userData.name = name;
    if (email) userData.email = email;
    // if (address) userData.address = address;
    if (gender) userData.gender = gender;
    if (dob) userData.dob = dob;
    if (phone) userData.phone = phone;

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    // Save the updated user
    await userData.save();

    res.json({
      success: true,
      message: "Profile updated successfully!",
      userData,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.json({
      success: false,
      message: "Server error, unable to update profile.",
    });
  }
};

// api for bookAppointment

export const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password")
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available." });
    }
    let slots_booked = docData.slots_booked

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot already booked." });
      }else{
        slots_booked[slotDate].push(slotTime)
      }
    }else{
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }
    const userData = await userModel.findById(userId).select("-password")
    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount:docData.fee,
      date: Date.now(), 
    }
    const newAppointment = new appointmentmodels(appointmentData);
    await newAppointment.save();
    await doctorModel.findByIdAndUpdate(docId, {slots_booked})
    res.json({
      success: true,
      message: "Appointment booked successfully!",
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.json({
      success: false,
      message: "Server error, unable to update profile.",
    });
  }
};


// api for user Appointments for my-Appointment

export const listAppointments = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointmentData = await appointmentmodels.find({ userId }) 
    res.json({
      success: true,
      appointmentData,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.json({
      success: false,
      message: "Server error, unable to fetch appointments.",
    });
  }
};

// api for cancel appointment

export const cancelAppointment = async (req, res) => {
  try {
    const {userId, appointmentId } = req.body;
    const appointmentData = await appointmentmodels.findById(appointmentId)
    if (appointmentData.userId !== userId) {
      return res
       .status(404)
       .json({ success: false, message: "unauthorized action" });
    }
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

// api for make payment of appointment using razorpay
// const razorpayInstance = new razorpay(
//   {key_id:"",
//   key_secret: ""}
// )

// export const makePayment = async (req, res) => {
//   try {
    
//   } catch (error) {
    
//   }
// }
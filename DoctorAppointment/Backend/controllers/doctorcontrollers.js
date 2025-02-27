import doctorModel from "../models/doctermodels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentmodels from "../models/appointmentmodels.js";

export const changeavailable = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({
      success: true,
      message: "Doctor status updated successfully",
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]); // Exclude email & password
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({
      success: false,
      message: "Server error, unable to fetch doctors.",
    });
  }
};

// api for doctor login

export const doctorlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    // Validate Password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ Id: doctor._id }, process.env.JWT_SECRET);

      res.json({
        success: true,
        message: "Login successful",
        token,
      });
    } else {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// Api to get doctor appointment for doctor panel

export const doctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    // console.log(docId);

    const appointments = await appointmentmodels.find({ docId });
    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error, unable to fetch appointments.",
    });
  }
};

// Api to mark doctor appointment complete for doctor panel

export const completeAppointment = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentmodels.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      // console.log(appointmentData);
      // console.log(docId);
      // console.log(appointmentId);
      // console.log(appointmentData.docId);

      await appointmentmodels.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      res.json({
        success: true,
        message: "Appointment marked as complete successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid appointment id or doctor id.",
      });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error, unable to mark appointment as complete.",
    });
  }
};

// Api to mark doctor appointment cancelled for doctor panel

export const cancelledAppointment = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentmodels.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      // console.log(appointmentData);
      // console.log(docId);
      // console.log(appointmentId);
      // console.log(appointmentData.docId);

      await appointmentmodels.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      res.json({
        success: true,
        message: "Appointment marked as cancelled ",
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid appointment id or doctor id.",
      });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error, unable to mark appointment as complete.",
    });
  }
};

// Api to get dashboard data for doctor panel

export const dashboardData = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentmodels.find({ docId });
    let earnings = 0
    appointments.map((item) => {
      if (item.isCompleted && !item.payment) {
        earnings += item.amount;
      }
    });
    // appointments.map((item) => {
    //   if (item.cancelled && !item.payment) {
    //     earnings -= item.amount;
    //   }
    // });
    let patients = []
    appointments.map((item) => {
      if (patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const dashboard = {
      earnings,
      patients: patients.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0,5)
    }
    res.json({
      success: true,
      dashboard,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error, unable to fetch dashboard data.",
    });
  }
};

// get doctor profile

export const getDoctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const doctor = await doctorModel.findById(docId);
    res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error, unable to fetch doctor profile.",
    });
  }
};

// change available

export const updateDoctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({
      success: true,
      message: "Doctor status updated successfully",
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

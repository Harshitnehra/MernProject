import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    docId: {
      type: String,
      required: true,
    },
    slotDate: {
      type: String,
      required: true,
    },
    slotTime: {
      type: String,
      required: true,
    },
    userData: {
      type: Object, // Stores user's name, email, phone for quick access
      required: true,
    },
    docData: {
        type: Object, // Stores user's name, email, phone for quick access
        required: true,
      },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
    payment: {
        type: Boolean,
        default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  }, 
);

const appointmentmodels = mongoose.model("Appointment", AppointmentSchema);

export default appointmentmodels;

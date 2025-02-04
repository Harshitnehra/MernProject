import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [{
    type: String, // Array of required skills/qualifications
    required: true,
  }],
  salary: {
    type: Number,
    required: true,
  },
  experiencelevle:{
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", // Reference to the Company model
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User who created the job
    required: true,
  },
  applications: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "applications", // Reference to the User who created the applications
        required: true,
      },
  ],
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;

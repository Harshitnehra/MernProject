import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminroutes.js";
import { initializeCloudinary } from "./config/cloudinary.js";
import doctorRouter from "./routes/doctorroutes.js";
import userRouter from "./routes/userroutes.js";

dotenv.config();
initializeCloudinary();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor" , doctorRouter)
app.use("/api/user" , userRouter)


app.get("/", (req, res) => {
  res.send("Hello from the server");
});

// Start the server with error handling
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit process with failure
  }
});

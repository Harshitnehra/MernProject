import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import connectDB from "./utils/db.js"; // Import DB connection
import dotenv from "dotenv";
import UserRoutes from "./routes/userRoutes.js";
import companyroutes from "./routes/companyRoutes.js";
import jobsroutes from "./routes/jobRouters.js";

dotenv.config({}); 
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsoptions = {
    origin : 'http://localhost:5173',
    Credentials:true
}
app.use(cors(corsoptions));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/company", companyroutes);
app.use("/api/v1/job", jobsroutes);

app.get("/", (req, res) => {
  res.send("Hello, harshit!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

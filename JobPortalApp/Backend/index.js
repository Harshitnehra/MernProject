import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import connectDB from "./utils/db.js"; // Import DB connection
import dotenv from "dotenv";
import authRoutes from "./routes/userRoutes.js";
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
app.use("/api/v1/user", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello, harshit!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes/blogs"); // Import your routes

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Correctly use express.json middleware

// Connect to MongoDB
connectDB();

// Use the authentication routes
app.use("/api/v1", router);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

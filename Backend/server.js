import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"; // Security middleware
import db from "./config/db.js"; // Database connection

dotenv.config(); // Load environment variables

const app = express();

// Middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(helmet()); // Security headers

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/booking", bookingRoutes);

// Connect to database before starting the server
const startServer = async () => {
  try {
    await db.connect();
    console.log("Database connected successfully");

    // Start server only after DB connection is established
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port: ${port}`));
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Start server
startServer();

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
app.use(helmet()); // add security headers

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/booking", bookingRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message} | Route: ${req.method} ${req.url}`);
  res.status(500).json({ message: "Internal server error" });
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port: ${port}`));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js"; // To establishing the database connection when server starts.

dotenv.config(); // Ensure environment variables are loaded from .env

const app = express();

app.use(cors()); // Cross-Origin Resource Sharing (CORS)

app.use(express.json()); // Middleware to parse incoming JSON requests

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// Path for Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/booking", bookingRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));

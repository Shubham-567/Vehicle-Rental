import express from "express";
import {
  createBooking,
  getUserBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
import { validateBooking } from "../middlewares/validator.js";

const router = express.Router();

// User routes
router.post("/", verifyToken, isAdmin, validateBooking, createBooking); // Create a new booking
router.get("/user/:userId", verifyToken, getUserBookings); // Get bookings for a user
router.put("/:id", verifyToken, isAdmin, updateBookingStatus); // Update booking status (e.g., Confirmed, Cancelled)

export default router;

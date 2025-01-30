import express from "express";
import {
  createBooking,
  getUserBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Middleware to check user id
const checkUserIdMatch = (req, res, next) => {
  if (String(req.user.id) !== String(req.params.userId)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

// User routes
router.post("/", verifyToken, createBooking); // Create a new booking
router.get("/user/:userId", verifyToken, checkUserIdMatch, getUserBookings); // Get bookings for a user
router.put("/:id", verifyToken, updateBookingStatus); // Update booking status (e.g., Confirmed, Cancelled)

export default router;

import db from "../config/db.js";

// create new booking
export const createBooking = async (req, res) => {
  const { vehicle_id, start_date, end_date, total_price } = req.body;
  const user_id = req.user.id; // this is set by verifyToken middleware

  if (!vehicle_id || !start_date || !end_date || !total_price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db
      .promise()
      .query(
        "INSERT INTO bookings (user_id, vehicle_id, start_date, end_date, total_price, status, payment_status) VALUES (?, ?, ?, ?, ?, 'Pending', 'Pending')",
        [user_id, vehicle_id, start_date, end_date, total_price]
      );

    res.status(201).json({ message: "Booking created successfully" });
  } catch (err) {
    console.error("Error creating booking: ", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// get user bookings
export const getUserBookings = async (req, res) => {
  const user_id = req.user.id; // Ensure the user ID matches the authenticated user
  const { userId } = req.params; // userId from the request parameters

  if (user_id !== userId) {
    return res
      .status(403)
      .json({ message: "You are not authorized to access these bookings" });
  }

  try {
    const [bookings] = await db
      .promise()
      .query("SELECT * FROM bookings WHERE user_id = ? ", [user_id]);

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No booking found" });
    }

    res.status(200).json({ bookings });
  } catch (err) {
    console.error("Error fetching user bookings: ", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// update booking status
export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // status should be of "Confirmed", "Canceled", etc..

  if (
    !status ||
    !["Confirmed", "Canceled", "Pending", "Completed"].includes(status)
  ) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const [result] = await db
      .promise()
      .query("UPDATE bookings SET status = ? WHERE booking_id = ?", [
        status,
        id,
      ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking status updated successfully" });
  } catch (err) {
    console.error("Error updating booking status: ", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

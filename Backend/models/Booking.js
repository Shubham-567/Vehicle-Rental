import db from "../config/db.js";

const Booking = {
  // Create a new booking
  create: async (
    user_id,
    { vehicle_id, start_date, end_date, total_price }
  ) => {
    return await db.query(
      "INSERT INTO bookings (user_id, vehicle_id, start_date, end_date, total_price, status, payment_status) VALUES (?, ?, ?, ?, ?, 'Pending', 'Pending')",
      [user_id, vehicle_id, start_date, end_date, total_price]
    );
  },

  // get all booking for a user
  getByUserId: async (user_id) => {
    const [bookings] = await db.query(
      "SELECT * FROM bookings WHERE user_id = ?",
      [user_id]
    );
    return bookings;
  },

  // update booking status
  updateStatus: async (id, status) => {
    return await db.query(
      "UPDATE bookings SET status = ? WHERE booking_id = ?",
      [status, id]
    );
  },
};

export default Booking;

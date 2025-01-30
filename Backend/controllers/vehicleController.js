import db from "../config/db.js";

// Get all available vehicles
export const getVehicles = async (req, res) => {
  try {
    const [vehicles] = await db.query(
      "SELECT * FROM vehicles WHERE availability = 1"
    );
    res.status(200).json({ vehicles });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Get a vehicle by ID
export const getVehicleByID = async (req, res) => {
  const { id } = req.params;

  try {
    const [vehicle] = await db.query(
      "SELECT * FROM vehicles WHERE vehicle_id = ?",
      [id]
    );

    if (vehicle.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ vehicle: vehicle[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Add a new vehicle (Admin only)
export const addVehicle = async (req, res) => {
  const { name, brand, type, price_per_day, image_url } = req.body;

  if (!name || !brand || !type || !price_per_day || !image_url) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.query(
      "INSERT INTO vehicles (name, brand, type, price_per_day, image_url) VALUES (?, ?, ?, ?, ?)",
      [name, brand, type, price_per_day, image_url]
    );

    res.status(201).json({ message: "Vehicle added successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Update vehicle details (Admin only)
export const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { name, brand, type, price_per_day, image_url, availability } =
    req.body;

  // Ensure all required fields are provided (allowing availability = 0)
  if (
    !name ||
    !brand ||
    !type ||
    !price_per_day ||
    !image_url ||
    availability == null
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "UPDATE vehicles SET name = ?, brand = ?, type = ?, price_per_day = ?, image_url = ?, availability = ? WHERE vehicle_id = ?",
      [name, brand, type, price_per_day, image_url, availability, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Vehicle not found or no changes made" });
    }

    res.status(200).json({ message: "Vehicle details updated successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Delete a vehicle (Admin only)
export const deleteVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "DELETE FROM vehicles WHERE vehicle_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

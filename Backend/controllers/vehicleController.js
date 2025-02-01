import { validationResult } from "express-validator"; // for input validation
import Vehicle from "../models/Vehicle.js";

// Get all available vehicles
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.getAllAvailable();

    res.status(200).json({ vehicles });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Get a vehicle by ID
export const getVehicleById = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.getById(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ vehicle });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Add a new vehicle (Admin only)
export const addVehicle = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { name, brand, type, price_per_day, image_url } = req.body;
  const owner_id = req.user.id; // set by verifyToken middleware

  try {
    await Vehicle.create(owner_id, {
      name,
      brand,
      type,
      price_per_day,
      image_url,
    });

    res.status(201).json({ message: "Vehicle added successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Update vehicle details (Admin only)
export const updateVehicle = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { id } = req.params;
  const { name, brand, type, price_per_day, image_url, availability } =
    req.body;

  try {
    const [result] = await Vehicle.update(id, {
      name,
      brand,
      type,
      price_per_day,
      image_url,
      availability,
    });

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
    const [result] = await Vehicle.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

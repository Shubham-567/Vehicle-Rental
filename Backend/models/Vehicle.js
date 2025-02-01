import db from "../config/db.js";

// Vehicle is Object of Functions

const Vehicle = {
  // Get all available vehicles
  getAllAvailable: async () => {
    const [vehicles] = await db.query(
      "SELECT * FROM vehicles WHERE availability = 1"
    );

    return vehicles;
  },

  // Get a vehicle by id
  getById: async (id) => {
    const [vehicle] = await db.query(
      "SELECT * FROM vehicles WHERE vehicle_id = ?",
      [id]
    );

    return vehicle.length > 0 ? vehicle[0] : null;
  },

  // Add a new vehicle
  create: async (owner_id, { name, brand, type, price_per_day, image_url }) => {
    return await db.query(
      "INSERT INTO vehicles (owner_id, name, brand, type, price_per_day, image_url) VALUES (?, ?, ?, ?, ?, ?)",
      [owner_id, name, brand, type, price_per_day, image_url]
    );
  },

  // Update vehicle details
  update: async (
    id,
    { name, brand, type, price_per_day, image_url, availability }
  ) => {
    return await db.query(
      "UPDATE vehicles SET name = ?, brand = ?, type= ?, price_per_day = ?, image_url = ?, availability = ? WHERE vehicle_id = ?",
      [name, brand, type, price_per_day, image_url, availability, id]
    );
  },

  // Delete a vehicle
  delete: async (id) => {
    return await db.query("DELETE FROM vehicles WHERE vehicle_id = ? ", [id]);
  },
};

export default Vehicle;

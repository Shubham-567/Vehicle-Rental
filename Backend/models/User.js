import db from "../config/db.js";

const User = {
  findByEmail: async (email) => {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    return users.length > 0 ? users[0] : null;
  },

  findById: async (id) => {
    const [users] = await db.query("SELECT * FROM users WHERE user_id = ?", [
      id,
    ]);

    return users.length > 0 ? users[0] : null;
  },

  create: async ({ name, email, password, phone, role }) => {
    try {
      const [result] = await db.query(
        "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
        [name, email, password, phone, role || "customer"]
      );

      return result;
    } catch (error) {
      console.error("DB Insert Error:", error);
      throw new Error("Database error: Failed to create user.");
    }
  },
};

export default User;

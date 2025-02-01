import db from "../config/db.js";

const User = {
  findByEmail: async (email) => {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    return users.length > 0 ? users[0] : null;
  },

  create: async ({ name, email, password, phone, role }) => {
    return await db.query(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, phone, role || "customer"]
    );
  },
};

export default User;

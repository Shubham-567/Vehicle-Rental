import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import { validationResult } from "express-validator"; // for input validation

export const registerUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { name, email, password, phone, role } = req.body;

  try {
    // Check if email already exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user into database
    await db.query(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phone, role || "customer"]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: { name, email, phone, role },
    });

    console.log("User registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // get user from database
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = users[0];

    // compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid Password");
      return res.status(400).json({ message: "Invalid Password " });
    }

    // generate Json Web Token
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // return token and user data
    res.status(200).json({ token, user });

    console.log("User log in successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, Please try again later" });
  }
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator"; // for input validation
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { name, email, password, phone, role } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user in db
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    // ensure insertId is available
    if (!result || !result.insertId) {
      throw new Error("User registration failed, no user ID returned.");
    }

    // fetch the newly created user
    const newUser = await User.findById(result.insertId);

    // generate Json web token
    const token = jwt.sign(
      { user_id: newUser.user_id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // send response with user data and token
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        user_id: newUser.user_id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
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
    // get user from db
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

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

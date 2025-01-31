import jwt from "jsonwebtoken";
import db from "../config/db.js";

// Token verification middleware
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1]; // Extract the actual token

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid token, please log in again" });
    }

    req.user = {
      id: decoded.user_id,
      role: decoded.role,
    };
    next();
  });
};

// admin role check middleware
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only" });
  }

  next();
};

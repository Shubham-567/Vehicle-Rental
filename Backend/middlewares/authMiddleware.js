import jwt from "jsonwebtoken";
import db from "../config/db.js";

// Token verification middleware
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Authorization token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid token, please log in again" });
    }

    req.user_id = decoded.user_id;
    req.role = decoded.role;

    next();
  });
};

// admin role check middleware
export const isAdmin = (req, res, next) => {
  const { role } = req; // get role directly from decoded token
  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only" });
  }

  next();
};

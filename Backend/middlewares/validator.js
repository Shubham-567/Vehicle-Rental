import { body } from "express-validator";

export const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
  body("phone").isMobilePhone().withMessage("Valid phone number is required"),
  body("role")
    .optional()
    .isIn(["customer", "admin"])
    .withMessage("Role must be either 'customer' or 'admin'"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateVehicle = [
  body("name").notEmpty().withMessage("Vehicle name is required"),
  body("brand").notEmpty().withMessage("Vehicle brand is required"),
  body("type")
    .isIn(["Car", "Bike", "SUV", "Truck"])
    .withMessage("Type must be one of: Car, Bike, SUV, Truck"),
  body("price_per_day")
    .isFloat({ gt: 0 })
    .withMessage("Price per day must be a positive number"),
  body("image_url").isURL().withMessage("Valid image URL is required"),
  body("availability")
    .optional()
    .isBoolean()
    .withMessage("Availability must be a boolean value (true/false)"),
];

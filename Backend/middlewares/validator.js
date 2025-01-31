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

export const validateBooking = [
  body("vehicle_id")
    .isInt({ min: 1 })
    .withMessage("Valid vehicle id is required"),
  body("start_date")
    .isISO8601()
    .withMessage("Valid start date is required (YYYY-MM-DD) "),
  body("end_date")
    .isISO8601()
    .withMessage("Valid end date is required (YYYY-MM-DD)")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.start_date)) {
        throw new Error("End date must be after start date");
      }

      return true;
    }),
  body("total_price")
    .isFloat({ min: 1 })
    .withMessage("Total price must be a positive number"),
];

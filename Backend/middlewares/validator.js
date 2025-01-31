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

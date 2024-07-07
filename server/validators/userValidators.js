import { body } from "express-validator";

// Validation middleware for creating a user
const userValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export default { userValidation };

import { body } from "express-validator";

// Validation middleware for creating an event
const eventValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),
  body("description")
    .notEmpty()
    .withMessage("Description is required"),
  body("date")
    .isISO8601()
    .withMessage("Valid date is required"),
  body("location")
    .notEmpty()
    .withMessage("Location is required"),
  body("imageUrl")
    .isURL()
    .withMessage("Valid URL is required"),
];

export default { eventValidation };

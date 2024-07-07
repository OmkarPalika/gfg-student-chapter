import { body } from "express-validator";

// Validation middleware for creating a resource
const resourceValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),
  body("description")
    .notEmpty()
    .withMessage("Description is required"),
  body("url")
    .isURL()
    .withMessage("Valid URL is required"),
];

export default { resourceValidation };

import { body } from "express-validator";

// Validation middleware for creating a feedback
const feedbackValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),
  body("content")
    .notEmpty()
    .withMessage("Content is required"),
];

export default { feedbackValidation };

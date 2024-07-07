import { body } from "express-validator";

// Validation middleware for creating a blog post
const blogPostValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),
  body("content")
    .notEmpty()
    .withMessage("Content is required"),
  body("tags")
    .isArray()
    .withMessage("Tags must be an array"),
  body("imageUrl")
    .isURL()
    .withMessage("Valid URL is required"),
];

export default { blogPostValidation };

import { body } from "express-validator";

// Validation middleware for creating a discussion
const discussionValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),
  body("content")
    .notEmpty()
    .withMessage("Content is required"),
];

// Validation middleware for creating a reply
const replyValidation = [
  body("content")
    .notEmpty()
    .withMessage("Content is required"),
];

export default { discussionValidation, replyValidation };

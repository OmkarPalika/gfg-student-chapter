// validators/discussionValidators.js
import { body } from 'express-validator';

// Validation middleware for creating a discussion
const discussionValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
];

// Validation middleware for creating a reply
const replyValidation = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
];

export { discussionValidation, replyValidation };

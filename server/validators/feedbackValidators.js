// validators/feedbackValidators.js
import { body } from 'express-validator';

// Validation middleware for creating a feedback
const feedbackValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
];

export { feedbackValidation };

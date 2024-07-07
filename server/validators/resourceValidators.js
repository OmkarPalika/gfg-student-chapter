// validators/resourceValidators.js
import { body } from 'express-validator';

// Validation middleware for creating a resource
const resourceValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  body('url')
    .isURL()
    .withMessage('Valid URL is required'),
];

export { resourceValidation };

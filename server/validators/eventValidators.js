// validators/eventValidators.js
import { body } from 'express-validator';

// Validation middleware for creating an event
const eventValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  body('date')
    .isISO8601({ strict: true })
    .withMessage('Valid date in ISO8601 format is required'),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),

  body('imageUrl')
    .trim()
    .isURL()
    .optional()
    .withMessage('Valid URL is required for image'),
];

export { eventValidation };

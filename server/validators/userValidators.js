// validators/userValidators.js
import { body } from 'express-validator';

// Validation middleware for user registration
const userValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .isEmail()
    .withMessage('Valid email is required'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// Validation middleware for updating user profile
const profileUpdateValidation = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Name cannot be empty'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Valid email is required'),

  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('bio')
    .optional()
    .notEmpty()
    .withMessage('Bio cannot be empty'),

  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),

  body('avatar')
    .optional()
    .isURL()
    .withMessage('Avatar must be a valid URL'),

  body('birthdate')
    .optional()
    .isISO8601()
    .withMessage('Birthdate must be a valid date'),

  body('location')
    .optional()
    .notEmpty()
    .withMessage('Location cannot be empty'),
];

export { userValidation, profileUpdateValidation };

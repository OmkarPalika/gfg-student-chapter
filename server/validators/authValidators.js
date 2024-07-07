// validators/authValidators.js
import { body } from 'express-validator';

// Validation middleware for user registration
const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
];

// Validation middleware for user login
const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export { registerValidation, loginValidation };

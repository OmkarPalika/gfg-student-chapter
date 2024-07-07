// validators/blogValidators.js
import { body } from 'express-validator';

// Validation middleware for creating a blog post
const blogPostValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),

  body('tags')
    .isArray()
    .withMessage('Tags must be an array'),

  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Valid URL is required'),
];

export { blogPostValidation };

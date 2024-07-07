// middleware/validate.js
import { validationResult } from 'express-validator';

const validate = (validations) => {
  return async (req, res, next) => {
    try {
      await Promise.all(validations.map(validation => validation.run(req)));
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }

      throw new Error(errors.array().map(err => ({ [err.param]: err.msg })));
    } catch (error) {
      console.error('Validation error:', error.message);
      res.status(400).json({ errors: error.message });
    }
  };
};

export default validate;

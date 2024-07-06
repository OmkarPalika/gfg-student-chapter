const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { registerValidation, loginValidation } = require('../validators/authValidators');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // limit each IP to 10 login requests per windowMs
  message: "Too many login attempts from this IP, please try again after 15 minutes"
});

router.post('/login', loginLimiter, validate(loginValidation), login);

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message: "Too many accounts created from this IP, please try again after an hour"
});

router.post('/register', registerLimiter, validate(registerValidation), register);

module.exports = router;

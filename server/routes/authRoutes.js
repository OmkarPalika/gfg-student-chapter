import { Router } from 'express';
import register from '../controllers/authController.js';
import login from '../controllers/authController.js';
import validate from '../middleware/validate.js';
import defaultValidator from '../validators/authValidators.js';
import rateLimit from 'express-rate-limit';

const router = Router();
const { registerValidation, loginValidation } = defaultValidator;

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts from this IP, please try again after 15 minutes"
});

router.post('/login', loginLimiter, validate(loginValidation), async (req, res) => {
  try {
    const token = await login(req.body.email, req.body.password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many accounts created from this IP, please try again after an hour"
});

router.post('/register', registerLimiter, validate(registerValidation), async (req, res) => {
  try {
    await register(req.body);
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

// routes/authRoutes.js
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { registerUser, loginUser } from '../controllers/authController.js';
import validate from '../middleware/validate.js';
import { registerValidation, loginValidation } from '../validators/authValidators.js';
import User from '../models/User.js';

const router = Router();

// Rate limiter for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many login attempts from this IP, please try again after 15 minutes"
});

// Rate limiter for registration attempts
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Too many accounts created from this IP, please try again after an hour"
});

// Login route
router.post('/login', loginLimiter, validate(loginValidation), loginUser);

// Register route
router.post('/register', registerLimiter, validate(registerValidation), async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if there are any existing admin users
    const countAdmins = await User.countDocuments({ role: 'admin' });

    // Determine if the user should be an admin
    const isAdmin = countAdmins === 0;

    await registerUser({ name, email, password, isAdmin });
    
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;

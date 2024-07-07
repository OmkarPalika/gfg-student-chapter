// controllers/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const { sign } = jwt;

// Define predefined admin emails (this can be stored in a separate config file or database)
const adminEmails = ['palikaomkar@gmail.com', 'admin2@example.com'];

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Default role is member; check if email is admin's
    let role = 'member';
    if (adminEmails.includes(email)) {
      role = 'admin';
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create new user instance
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    // Generate JWT token
    const token = sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Respond with user info and token
    res.status(201).json({ 
      user: { 
        id: newUser._id, 
        name: newUser.name, 
        email: newUser.email, 
        role: newUser.role 
      }, 
      token 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
}

/**
 * Login an existing user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Respond with user info and token
    res.json({ 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }, 
      token 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}

export default {
  register,
  login
};

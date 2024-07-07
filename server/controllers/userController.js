// controllers/userController.js
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

const adminEmails = ['palikaomkar@gmail.com', 'admin2@example.com'];

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    let role = 'member'; // Default role is member

    if (adminEmails.includes(email)) {
      role = 'admin';
    }

    // Check if user with the same email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create a new user instance
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    // Generate JWT token for authentication
    const token = sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Respond with user details and token
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
 * Login a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and verify password
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token for authentication
    const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Respond with user details and token
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

/**
 * Get users based on filter criteria
 * @param {Object} filter - Filter criteria for user query
 */
async function getUsers(filter = {}) {
  try {
    // Fetch users based on provided filter, excluding password field
    const users = await User.find(filter).select('-password');
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users');
  }
}

/**
 * Approve or reject a user based on status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function approveUser(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user approval status
    user.approvalStatus = status;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: `User ${status}` });
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Error approving user' });
  }
}

export default {
  register,
  login,
  getUsers,
  approveUser,
};

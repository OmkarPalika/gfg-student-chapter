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

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    let role = 'member';

    if (adminEmails.includes(email)) {
      role = 'admin';
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    const token = sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

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
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

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
    const filter = req.query;
    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

async function approveUser(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.approvalStatus = status;
    await user.save();

    res.status(200).json({ message: `User ${status}` });
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Error approving user' });
  }
}

async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user approval status
    user.approvalStatus = status;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: `User ${status}` });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Error fetching profile' });
  }
}

async function updateProfile(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, email, bio, interests, location } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (interests) user.interests = interests;
    if (location) user.location = location;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(400).json({ error: 'Error updating profile' });
  }
}

export default {
  register,
  login,
  getUsers,
  approveUser,
  getProfile,
  updateProfile
};

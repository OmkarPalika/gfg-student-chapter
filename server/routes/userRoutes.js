// routes/userRoutes.js
import { Router } from 'express';
import getProfile from '../controllers/userController.js';
import updateProfile from '../controllers/userController.js';
import getUsers from '../controllers/userController.js';
import approveUser from '../controllers/userController.js';
import getUser from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import validate from '../middleware/validate.js';
import { profileUpdateValidation } from '../validators/userValidators.js';

const router = Router();

// GET user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const profile = await getProfile(req, res);
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update user profile
router.put('/profile', auth, validate(profileUpdateValidation), async (req, res) => {
  try {
    const updatedProfile = await updateProfile(req, res);
    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(400).json({ error: error.message });
  }
});

// GET all users with pending approval status
router.get('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const users = await getUsers({ approvalStatus: 'pending' });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT approve user
router.put('/:id/approve', auth, authorize(['admin']), async (req, res) => {
  try {
    await approveUser(req, res);
    res.json({ message: 'User approved successfully' });
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET a single user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

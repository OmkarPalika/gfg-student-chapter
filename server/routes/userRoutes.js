// routes/userRoutes.js
// routes/userRoutes.js
import { Router } from 'express';
import userController from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import validate from '../middleware/validate.js';
import { profileUpdateValidation } from '../validators/userValidators.js';

const router = Router();

// GET user profile
// GET user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const profile = await userController.getProfile(req, res);
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update user profile
// PUT update user profile
router.put('/profile', auth, validate(profileUpdateValidation), async (req, res) => {
  try {
    const updatedProfile = await userController.updateProfile(req, res);
    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    console.error('Error updating profile:', error);
    res.status(400).json({ error: error.message });
  }
});

// GET all users (filtered by approvalStatus if provided)
router.get('/users', auth, authorize(['admin']), userController.getUsers);

// PUT approve/reject user by ID
router.put('/users/:id/approve', auth, authorize(['admin']), userController.approveUser);

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
    console.error('Error fetching user:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

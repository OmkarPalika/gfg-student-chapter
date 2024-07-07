import { Router } from 'express';
import getProfile from '../controllers/userController.js';
import updateProfile from '../controllers/userController.js';
import getUsers from '../controllers/userController.js';
import getUser from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import validate from '../middleware/validate.js';
import profileUpdateValidation from '../validators/userValidators.js';

const router = Router();

router.get('/profile', auth, async (req, res) => {
  try {
    const profile = await getProfile(req.user._id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/profile', auth, validate(profileUpdateValidation), async (req, res) => {
  try {
    const updatedProfile = await updateProfile(req.user._id, req.body);
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

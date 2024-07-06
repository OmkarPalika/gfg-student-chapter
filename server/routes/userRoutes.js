import { Router } from 'express';
const router = Router();
import { getProfile, updateProfile, getUsers, getUser } from '../controllers/userController';
import { auth, authorize } from '../middleware';

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/', auth, authorize(['admin']), getUsers);
router.get('/:id', auth, getUser);

export default router;

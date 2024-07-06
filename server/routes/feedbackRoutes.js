import { Router } from 'express';
const router = Router();
import { createFeedback, getFeedbacks, getFeedback, updateFeedback, deleteFeedback } from '../controllers/feedbackController';
import auth from '../middleware/auth';

router.post('/', auth, createFeedback);
router.get('/', getFeedbacks);
router.get('/:id', getFeedback);
router.put('/:id', auth, updateFeedback);
router.delete('/:id', auth, deleteFeedback);

export default router;
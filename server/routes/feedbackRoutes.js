import { Router } from 'express';
import createFeedback from '../controllers/feedbackController.js';
import getFeedbacks from '../controllers/feedbackController.js';
import getFeedback from '../controllers/feedbackController.js';
import updateFeedback from '../controllers/feedbackController.js';
import deleteFeedback from '../controllers/feedbackController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import feedbackValidation from '../validators/feedbackValidators.js';

const router = Router();

router.post('/', auth, validate(feedbackValidation), async (req, res) => {
  try {
    const feedback = await createFeedback(req.body, req.user._id);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const feedbacks = await getFeedbacks();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const feedback = await getFeedback(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, validate(feedbackValidation), async (req, res) => {
  try {
    const updatedFeedback = await updateFeedback(req.params.id, req.body, req.user._id);
    res.json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await deleteFeedback(req.params.id, req.user._id);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

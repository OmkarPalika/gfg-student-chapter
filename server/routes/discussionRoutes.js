import { Router } from 'express';
import createDiscussion from '../controllers/discussionController.js';
import getDiscussions from '../controllers/discussionController.js';
import getDiscussion from '../controllers/discussionController.js';
import updateDiscussion from '../controllers/discussionController.js';
import deleteDiscussion from '../controllers/discussionController.js';
import addReply from '../controllers/discussionController.js';
import deleteReply from '../controllers/discussionController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import discussionValidation from '../validators/discussionValidators.js';
import replyValidation from '../validators/discussionValidators.js';

const router = Router();

router.post('/', auth, validate(discussionValidation), async (req, res) => {
  try {
    const discussion = await createDiscussion(req.body, req.user._id);
    res.status(201).json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const discussions = await getDiscussions();
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const discussion = await getDiscussion(req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, validate(discussionValidation), async (req, res) => {
  try {
    const updatedDiscussion = await updateDiscussion(req.params.id, req.body, req.user._id);
    res.json(updatedDiscussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await deleteDiscussion(req.params.id, req.user._id);
    res.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/replies', auth, validate(replyValidation), async (req, res) => {
  try {
    const reply = await addReply(req.params.id, req.body, req.user._id);
    res.status(201).json(reply);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id/replies/:replyId', auth, async (req, res) => {
  try {
    await deleteReply(req.params.id, req.params.replyId, req.user._id);
    res.json({ message: 'Reply deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

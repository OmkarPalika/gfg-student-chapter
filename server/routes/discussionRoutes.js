import { Router } from 'express';
const router = Router();
import { createDiscussion, getDiscussions, getDiscussion, updateDiscussion, deleteDiscussion, addReply, deleteReply } from '../controllers/discussionController';
import auth from '../middleware/auth';

router.post('/', auth, createDiscussion);
router.get('/', getDiscussions);
router.get('/:id', getDiscussion);
router.put('/:id', auth, updateDiscussion);
router.delete('/:id', auth, deleteDiscussion);
router.post('/:id/replies', auth, addReply);
router.delete('/:id/replies/:replyId', auth, deleteReply);

export default router;
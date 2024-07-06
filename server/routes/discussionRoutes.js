const express = require('express');
const router = express.Router();
const {
  createDiscussion,
  getDiscussions,
  getDiscussion,
  updateDiscussion,
  deleteDiscussion,
  addReply,
  deleteReply
} = require('../controllers/discussionController');
const auth = require('../middleware/auth');

router.post('/', auth, createDiscussion);
router.get('/', getDiscussions);
router.get('/:id', getDiscussion);
router.put('/:id', auth, updateDiscussion);
router.delete('/:id', auth, deleteDiscussion);
router.post('/:id/replies', auth, addReply);
router.delete('/:id/replies/:replyId', auth, deleteReply);

module.exports = router;
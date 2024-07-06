const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbacks, getFeedback, updateFeedback, deleteFeedback } = require('../controllers/feedbackController');
const auth = require('../middleware/auth');

router.post('/', auth, createFeedback);
router.get('/', getFeedbacks);
router.get('/:id', getFeedback);
router.put('/:id', auth, updateFeedback);
router.delete('/:id', auth, deleteFeedback);

module.exports = router;
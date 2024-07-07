import Feedback from '../models/Feedback.js';

async function createFeedback(req, res) {
  try {
    const { content, rating, targetType, target } = req.body;
    const feedback = new Feedback({
      user: req.user._id,
      content,
      rating,
      targetType,
      target
    });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getFeedbacks(req, res) {
  try {
    const feedbacks = await Feedback.find().populate('user', 'name');
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getFeedback(req, res) {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('user', 'name');
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateFeedback(req, res) {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this feedback' });
    }
    const { content, rating } = req.body;
    feedback.content = content || feedback.content;
    feedback.rating = rating || feedback.rating;
    await feedback.save();
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteFeedback(req, res) {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this feedback' });
    }
    await feedback.remove();
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default { createFeedback, getFeedbacks, getFeedback, updateFeedback, deleteFeedback };
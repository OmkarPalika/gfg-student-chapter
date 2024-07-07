// controllers/feedbackController.js
import Feedback from '../models/Feedback.js';

/**
 * Create a new feedback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createFeedback(req, res) {
  try {
    const { content, rating, targetType, target } = req.body;
    
    // Create new feedback
    const feedback = new Feedback({
      user: req.user._id, // Assign feedback to the current user
      content,
      rating,
      targetType,
      target
    });
    
    // Save feedback to database
    await feedback.save();
    
    // Respond with created feedback
    res.status(201).json(feedback);
  } catch (error) {
    // Handle error if any
    res.status(400).json({ error: error.message });
  }
}

/**
 * Get all feedbacks
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getFeedbacks(req, res) {
  try {
    // Fetch all feedbacks and populate user details
    const feedbacks = await Feedback.find().populate('user', 'name');
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get a specific feedback by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getFeedback(req, res) {
  try {
    // Find feedback by ID and populate user details
    const feedback = await Feedback.findById(req.params.id).populate('user', 'name');
    
    // Check if feedback exists
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    // Respond with the feedback
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Update an existing feedback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateFeedback(req, res) {
  try {
    // Find feedback by ID
    const feedback = await Feedback.findById(req.params.id);
    
    // Check if feedback exists
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    // Check if the current user is the author of the feedback
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this feedback' });
    }
    
    // Update feedback fields
    const { content, rating } = req.body;
    feedback.content = content || feedback.content;
    feedback.rating = rating || feedback.rating;
    
    // Save updated feedback to database
    await feedback.save();
    
    // Respond with the updated feedback
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Delete a feedback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteFeedback(req, res) {
  try {
    // Find feedback by ID
    const feedback = await Feedback.findById(req.params.id);
    
    // Check if feedback exists
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    // Check if the current user is the author of the feedback
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this feedback' });
    }
    
    // Remove feedback from database
    await feedback.remove();
    
    // Respond with success message
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback,
  deleteFeedback
};

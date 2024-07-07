// controllers/discussionController.js
import Discussion from '../models/Discussion.js';

/**
 * Create a new discussion
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createDiscussion(req, res) {
  try {
    const { title, content, category, tags } = req.body;
    
    // Create new discussion
    const discussion = new Discussion({
      title,
      content,
      author: req.user._id, // Assign author based on authenticated user
      category,
      tags
    });
    
    // Save discussion to database
    await discussion.save();
    
    // Respond with created discussion
    res.status(201).json(discussion);
  } catch (error) {
    // Handle error if any
    res.status(400).json({ error: error.message });
  }
}

/**
 * Get all discussions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getDiscussions(req, res) {
  try {
    // Fetch all discussions and populate author details
    const discussions = await Discussion.find().populate('author', 'name');
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get a specific discussion by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getDiscussion(req, res) {
  try {
    // Find discussion by ID and populate author and replies details
    const discussion = await Discussion.findById(req.params.id)
      .populate('author', 'name')
      .populate('replies.author', 'name');
    
    // Check if discussion exists
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    
    // Respond with the discussion
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Update an existing discussion
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateDiscussion(req, res) {
  try {
    // Find discussion by ID
    const discussion = await Discussion.findById(req.params.id);
    
    // Check if discussion exists
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    
    // Check if the current user is the author of the discussion
    if (discussion.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this discussion' });
    }
    
    // Update discussion fields
    const { title, content, category, tags } = req.body;
    discussion.title = title || discussion.title;
    discussion.content = content || discussion.content;
    discussion.category = category || discussion.category;
    discussion.tags = tags || discussion.tags;
    discussion.updatedAt = Date.now(); // Update updatedAt timestamp
    
    // Save updated discussion to database
    await discussion.save();
    
    // Respond with the updated discussion
    res.json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Delete a discussion
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteDiscussion(req, res) {
  try {
    // Find discussion by ID
    const discussion = await Discussion.findById(req.params.id);
    
    // Check if discussion exists
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    
    // Check if the current user is the author of the discussion
    if (discussion.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this discussion' });
    }
    
    // Remove discussion from database
    await discussion.remove();
    
    // Respond with success message
    res.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Add a reply to a discussion
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function addReply(req, res) {
  try {
    // Find discussion by ID
    const discussion = await Discussion.findById(req.params.id);
    
    // Check if discussion exists
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    
    // Add reply to discussion
    const { content } = req.body;
    discussion.replies.push({
      content,
      author: req.user._id // Assign author based on authenticated user
    });
    
    // Update updatedAt timestamp for discussion
    discussion.updatedAt = Date.now();
    
    // Save updated discussion with new reply
    await discussion.save();
    
    // Respond with updated discussion
    res.status(201).json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Delete a reply from a discussion
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteReply(req, res) {
  try {
    // Find discussion by ID
    const discussion = await Discussion.findById(req.params.id);
    
    // Check if discussion exists
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    
    // Find reply by ID in discussion's replies array
    const reply = discussion.replies.id(req.params.replyId);
    
    // Check if reply exists
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }
    
    // Check if the current user is the author of the reply
    if (reply.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this reply' });
    }
    
    // Remove reply from discussion's replies array
    reply.remove();
    
    // Update updatedAt timestamp for discussion
    discussion.updatedAt = Date.now();
    
    // Save updated discussion without deleted reply
    await discussion.save();
    
    // Respond with updated discussion
    res.json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export default {
  createDiscussion,
  getDiscussions,
  getDiscussion,
  updateDiscussion,
  deleteDiscussion,
  addReply,
  deleteReply
};

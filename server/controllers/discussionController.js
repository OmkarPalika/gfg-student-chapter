const Discussion = require('../models/Discussion');

exports.createDiscussion = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const discussion = new Discussion({
      title,
      content,
      author: req.user._id,
      category,
      tags
    });
    await discussion.save();
    res.status(201).json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('author', 'name');
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate('author', 'name')
      .populate('replies.author', 'name');
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    if (discussion.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this discussion' });
    }
    const { title, content, category, tags } = req.body;
    discussion.title = title || discussion.title;
    discussion.content = content || discussion.content;
    discussion.category = category || discussion.category;
    discussion.tags = tags || discussion.tags;
    discussion.updatedAt = Date.now();
    await discussion.save();
    res.json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    if (discussion.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this discussion' });
    }
    await discussion.remove();
    res.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addReply = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    const { content } = req.body;
    discussion.replies.push({
      content,
      author: req.user._id
    });
    discussion.updatedAt = Date.now();
    await discussion.save();
    res.status(201).json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteReply = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    const reply = discussion.replies.id(req.params.replyId);
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }
    if (reply.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this reply' });
    }
    reply.remove();
    discussion.updatedAt = Date.now();
    await discussion.save();
    res.json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
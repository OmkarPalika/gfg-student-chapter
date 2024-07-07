// controllers/blogController.js
import Blog from '../models/Blog.js';

/**
 * Create a new blog post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createBlogPost(req, res) {
  try {
    const { title, content, tags, imageUrl } = req.body;
    
    // Create new blog post
    const blog = new Blog({
      title,
      content,
      author: req.user._id, // Assign author based on authenticated user
      tags,
      imageUrl
    });
    
    // Save blog post to database
    await blog.save();
    
    // Respond with created blog post
    res.status(201).json(blog);
  } catch (error) {
    // Handle error if any
    res.status(400).json({ error: error.message });
  }
}

/**
 * Get all blog posts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getBlogPosts(req, res) {
  try {
    // Fetch all blog posts and populate author details
    const blogs = await Blog.find().populate('author', 'name');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get a specific blog post by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getBlogPost(req, res) {
  try {
    // Find blog post by ID and populate author details
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    
    // Check if blog post exists
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    // Respond with the blog post
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Update an existing blog post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateBlogPost(req, res) {
  try {
    // Find blog post by ID
    const blog = await Blog.findById(req.params.id);
    
    // Check if blog post exists
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    // Check if the current user is the author of the blog post
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this blog post' });
    }
    
    // Update blog post fields
    const { title, content, tags, imageUrl } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.imageUrl = imageUrl || blog.imageUrl;
    blog.updatedAt = Date.now(); // Update updatedAt timestamp
    
    // Save updated blog post to database
    await blog.save();
    
    // Respond with the updated blog post
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Delete a blog post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteBlogPost(req, res) {
  try {
    // Find blog post by ID
    const blog = await Blog.findById(req.params.id);
    
    // Check if blog post exists
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    // Check if the current user is the author of the blog post
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this blog post' });
    }
    
    // Remove blog post from database
    await blog.remove();
    
    // Respond with success message
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createBlogPost,
  getBlogPosts,
  getBlogPost,
  updateBlogPost,
  deleteBlogPost
};

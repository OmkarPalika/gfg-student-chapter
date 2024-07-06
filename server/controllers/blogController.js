const Blog = require('../models/Blog');

exports.createBlogPost = async (req, res) => {
  try {
    const { title, content, tags, imageUrl } = req.body;
    const blog = new Blog({
      title,
      content,
      author: req.user._id,
      tags,
      imageUrl
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBlogPosts = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogPost = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this blog post' });
    }
    const { title, content, tags, imageUrl } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.imageUrl = imageUrl || blog.imageUrl;
    blog.updatedAt = Date.now();
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this blog post' });
    }
    await blog.remove();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
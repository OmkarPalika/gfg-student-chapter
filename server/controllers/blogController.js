import Blog from '../models/Blog.js';

async function createBlogPost(req, res) {
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
}

async function getBlogPosts(req, res) {
  try {
    const blogs = await Blog.find().populate('author', 'name');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getBlogPost(req, res) {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateBlogPost(req, res) {
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
}

async function deleteBlogPost(req, res) {
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
}

export default {
  createBlogPost,
  getBlogPosts,
  getBlogPost,
  updateBlogPost,
  deleteBlogPost
};
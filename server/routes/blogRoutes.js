// routes/blogRoutes.js
import { Router } from 'express';
import createBlogPost from '../controllers/blogController.js';
import getBlogPosts from '../controllers/blogController.js';
import getBlogPost from '../controllers/blogController.js';
import updateBlogPost from '../controllers/blogController.js';
import deleteBlogPost from '../controllers/blogController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { blogPostValidation } from '../validators/blogValidators.js';

const router = Router();

// Create a new blog post
router.post('/', auth, validate(blogPostValidation), async (req, res) => {
  try {
    const blogPost = await createBlogPost(req.body, req.user._id);
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await getBlogPosts();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blogPost = await getBlogPost(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog post by ID
router.put('/:id', auth, validate(blogPostValidation), async (req, res) => {
  try {
    const updatedBlogPost = await updateBlogPost(req.params.id, req.body, req.user._id);
    res.json(updatedBlogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a blog post by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    await deleteBlogPost(req.params.id, req.user._id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

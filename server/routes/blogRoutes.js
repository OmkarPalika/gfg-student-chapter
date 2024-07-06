const express = require('express');
const router = express.Router();
const { createBlogPost, getBlogPosts, getBlogPost, updateBlogPost, deleteBlogPost } = require('../controllers/blogController');
const auth = require('../middleware/auth');

router.post('/', auth, createBlogPost);
router.get('/', getBlogPosts);
router.get('/:id', getBlogPost);
router.put('/:id', auth, updateBlogPost);
router.delete('/:id', auth, deleteBlogPost);

module.exports = router;
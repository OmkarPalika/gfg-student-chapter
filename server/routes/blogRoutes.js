import { Router } from 'express';
const router = Router();
import { createBlogPost, getBlogPosts, getBlogPost, updateBlogPost, deleteBlogPost } from '../controllers/blogController';
import auth from '../middleware/auth';

router.post('/', auth, createBlogPost);
router.get('/', getBlogPosts);
router.get('/:id', getBlogPost);
router.put('/:id', auth, updateBlogPost);
router.delete('/:id', auth, deleteBlogPost);

export default router;
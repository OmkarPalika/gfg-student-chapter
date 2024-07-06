import { Router } from 'express';
const router = Router();
import { createResource, getResources, getResource, updateResource, deleteResource } from '../controllers/resourceController';
import auth from '../middleware/auth';

router.post('/', auth, createResource);
router.get('/', getResources);
router.get('/:id', getResource);
router.put('/:id', auth, updateResource);
router.delete('/:id', auth, deleteResource);

export default router;
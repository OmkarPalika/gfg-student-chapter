import { Router } from 'express';
import createResource from '../controllers/resourceController.js';
import getResources from '../controllers/resourceController.js';
import getResource from '../controllers/resourceController.js';
import updateResource from '../controllers/resourceController.js';
import deleteResource from '../controllers/resourceController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import resourceValidation from '../validators/resourceValidators.js';

const router = Router();

router.post('/', auth, validate(resourceValidation), async (req, res) => {
  try {
    const resource = await createResource(req.body, req.user._id);
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const resources = await getResources();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const resource = await getResource(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, validate(resourceValidation), async (req, res) => {
  try {
    const updatedResource = await updateResource(req.params.id, req.body, req.user._id);
    res.json(updatedResource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await deleteResource(req.params.id, req.user._id);
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

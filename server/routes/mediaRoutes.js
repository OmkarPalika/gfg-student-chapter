import { Router } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import multer from 'multer';
import uploadMedia from '../controllers/mediaController.js';
import getMediaList from '../controllers/mediaController.js';
import getMediaById from '../controllers/mediaController.js';
import deleteMedia from '../controllers/mediaController.js';
import auth from '../middleware/auth.js';

const router = Router();

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const media = await uploadMedia(req.file, req.user._id);
    res.status(201).json(media);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const mediaList = await getMediaList();
    res.json(mediaList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const media = await getMediaById(req.params.id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await deleteMedia(req.params.id, req.user._id);
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

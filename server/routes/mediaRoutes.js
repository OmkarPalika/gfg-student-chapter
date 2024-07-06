import { Router } from 'express';
const router = Router();
import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import { uploadMedia, getMediaList, getMediaById, deleteMedia } from '../controllers/mediaController';
import auth from '../middleware/auth';

// Configure multer for file upload
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

router.post('/', auth, upload.single('file'), uploadMedia);
router.get('/', getMediaList);
router.get('/:id', getMediaById);
router.delete('/:id', auth, deleteMedia);

export default router;
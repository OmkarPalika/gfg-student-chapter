const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadMedia, getMediaList, getMediaById, deleteMedia } = require('../controllers/mediaController');
const auth = require('../middleware/auth');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

router.post('/', auth, upload.single('file'), uploadMedia);
router.get('/', getMediaList);
router.get('/:id', getMediaById);
router.delete('/:id', auth, deleteMedia);

module.exports = router;
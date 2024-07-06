const Media = require('../models/Media');

exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const media = new Media({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
      uploader: req.user._id
    });

    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMediaList = async (req, res) => {
  try {
    const mediaList = await Media.find().populate('uploader', 'name');
    res.json(mediaList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id).populate('uploader', 'name');
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    if (media.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this media' });
    }
    await media.remove();
    // Here you would also delete the file from your storage
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
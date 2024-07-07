// controllers/mediaController.js
import fs from 'fs';
import Media from '../models/Media.js';

/**
 * Upload media file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function uploadMedia(req, res) {
  try {
    // Check if file exists in request
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create new Media instance with file details
    const media = new Media({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`, // Assuming uploads directory
      uploader: req.user._id // Assign uploader as current user
    });

    // Save media record to database
    await media.save();

    // Respond with created media object
    res.status(201).json(media);
  } catch (error) {
    // Handle error if any
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get list of all media files
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getMediaList(req, res) {
  try {
    // Fetch all media records and populate uploader details
    const mediaList = await Media.find().populate('uploader', 'name');
    res.json(mediaList);
  } catch (error) {
    // Handle error if any
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get a specific media file by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getMediaById(req, res) {
  try {
    // Find media by ID and populate uploader details
    const media = await Media.findById(req.params.id).populate('uploader', 'name');
    
    // Check if media exists
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    // Respond with the media object
    res.json(media);
  } catch (error) {
    // Handle error if any
    res.status(500).json({ error: error.message });
  }
}

/**
 * Delete a media file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteMedia(req, res) {
  try {
    // Find media by ID
    const media = await Media.findById(req.params.id);
    
    // Check if media exists
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    // Check if the current user is the uploader of the media
    if (media.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this media' });
    }
    
    // Delete file from the file system (assuming media.url holds the file path)
    fs.unlinkSync(media.url);
    
    // Remove media record from the database
    await media.remove();
    
    // Respond with success message
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    // Handle error if any
    res.status(500).json({ error: error.message });
  }
}

export default {
  uploadMedia,
  getMediaList,
  getMediaById,
  deleteMedia
};

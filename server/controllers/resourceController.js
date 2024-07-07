// controllers/resourceController.js
import Resource from '../models/Resource.js';

/**
 * Create a new resource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createResource(req, res) {
  try {
    const { title, description, content, category, attachments } = req.body;
    const resource = new Resource({
      title,
      description,
      content,
      category,
      attachments,
      author: req.user._id // Assign author as current user
    });
    await resource.save();
    res.status(201).json(resource); // Respond with created resource object
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle error if any
  }
}

/**
 * Get all resources
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getResources(req, res) {
  try {
    // Fetch all resources and populate author details
    const resources = await Resource.find().populate('author', 'name email');
    res.json(resources); // Respond with list of resources
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle error if any
  }
}

/**
 * Get a specific resource by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getResource(req, res) {
  try {
    // Find resource by ID and populate author details
    const resource = await Resource.findById(req.params.id).populate('author', 'name email');
    
    // Check if resource exists
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    
    // Respond with the resource object
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle error if any
  }
}

/**
 * Update a resource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateResource(req, res) {
  try {
    // Find resource by ID
    const resource = await Resource.findById(req.params.id);
    
    // Check if resource exists
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    
    // Check if the current user is the author of the resource
    if (resource.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this resource' });
    }
    
    // Update resource fields with request body data
    const { title, description, content, category, attachments } = req.body;
    resource.title = title || resource.title;
    resource.description = description || resource.description;
    resource.content = content || resource.content;
    resource.category = category || resource.category;
    resource.attachments = attachments || resource.attachments;
    resource.updatedAt = Date.now(); // Update updatedAt timestamp
    await resource.save(); // Save updated resource
    res.json(resource); // Respond with updated resource object
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle error if any
  }
}

/**
 * Delete a resource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteResource(req, res) {
  try {
    // Find resource by ID
    const resource = await Resource.findById(req.params.id);
    
    // Check if resource exists
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    
    // Check if the current user is the author of the resource
    if (resource.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this resource' });
    }
    
    // Remove resource from database
    await resource.remove();
    
    // Respond with success message
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle error if any
  }
}

export default {
  createResource,
  getResources,
  getResource,
  updateResource,
  deleteResource
};

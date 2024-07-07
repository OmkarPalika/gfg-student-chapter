// controllers/eventController.js
import Event from '../models/Event.js';

/**
 * Create a new event
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createEvent(req, res) {
  try {
    const { title, description, date, location } = req.body;
    
    // Create new event
    const event = new Event({
      title,
      description,
      date,
      location,
      organizer: req.user._id // Assign organizer based on authenticated user
    });
    
    // Save event to database
    await event.save();
    
    // Respond with created event
    res.status(201).json(event);
  } catch (error) {
    // Handle error if any
    res.status(400).json({ error: error.message });
  }
}

/**
 * Get all events
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getEvents(req, res) {
  try {
    // Fetch all events and populate organizer details
    const events = await Event.find().populate('organizer', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get a specific event by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getEvent(req, res) {
  try {
    // Find event by ID and populate organizer details
    const event = await Event.findById(req.params.id).populate('organizer', 'name email');
    
    // Check if event exists
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Respond with the event
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Update an existing event
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateEvent(req, res) {
  try {
    // Find event by ID
    const event = await Event.findById(req.params.id);
    
    // Check if event exists
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Check if the current user is the organizer of the event
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this event' });
    }
    
    // Update event fields
    const { title, description, date, location } = req.body;
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    
    // Save updated event to database
    await event.save();
    
    // Respond with the updated event
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Delete an event
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteEvent(req, res) {
  try {
    // Find event by ID
    const event = await Event.findById(req.params.id);
    
    // Check if event exists
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Check if the current user is the organizer of the event
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this event' });
    }
    
    // Remove event from database
    await event.remove();
    
    // Respond with success message
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent
};

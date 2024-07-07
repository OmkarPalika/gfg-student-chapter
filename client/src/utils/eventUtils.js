import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Function to fetch all events
export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/events`);
    return response.data;
  } catch (error) {
    handleEventError('Fetch Events Error:', error);
  }
};

// Function to fetch event by ID
export const fetchEventById = async (eventId) => {
  try {
    const response = await axios.get(`${BASE_URL}/events/${eventId}`);
    return response.data;
  } catch (error) {
    handleEventError('Fetch Event Error:', error);
  }
};

// Function to create a new event
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${BASE_URL}/events`, eventData);
    return response.data;
  } catch (error) {
    handleEventError('Create Event Error:', error);
  }
};

// Function to update an event
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(`${BASE_URL}/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    handleEventError('Update Event Error:', error);
  }
};

// Function to delete an event
export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/events/${eventId}`);
    return response.data;
  } catch (error) {
    handleEventError('Delete Event Error:', error);
  }
};

// Helper function to handle event-related errors
const handleEventError = (prefix, error) => {
  console.error(prefix, error.response || error.message || error);
  throw error;
};

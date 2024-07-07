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
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error(prefix, 'Status:', error.response.status);
    console.error(prefix, 'Data:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error(prefix, 'No response received:', error.request);
  } else {
    // Something happened in setting up the request that triggered an error
    console.error(prefix, 'Other error:', error.message);
  }
  throw error;
};

import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Replace with your backend API URL

// Function to fetch all resources
export const fetchResources = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/resources`);
    return response.data; // Handle resources data in your application
  } catch (error) {
    handleResourceError('Fetch Resources Error:', error);
  }
};

// Function to fetch resource by ID
export const fetchResourceById = async (resourceId) => {
  try {
    const response = await axios.get(`${BASE_URL}/resources/${resourceId}`);
    return response.data; // Handle specific resource data in your application
  } catch (error) {
    handleResourceError('Fetch Resource Error:', error);
  }
};

// Function to create a new resource
export const createResource = async (resourceData) => {
  try {
    const response = await axios.post(`${BASE_URL}/resources`, resourceData);
    return response.data; // Handle new resource data in your application
  } catch (error) {
    handleResourceError('Create Resource Error:', error);
  }
};

// Function to update a resource
export const updateResource = async (resourceId, resourceData) => {
  try {
    const response = await axios.put(`${BASE_URL}/resources/${resourceId}`, resourceData);
    return response.data; // Handle updated resource data in your application
  } catch (error) {
    handleResourceError('Update Resource Error:', error);
  }
};

// Function to delete a resource
export const deleteResource = async (resourceId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/resources/${resourceId}`);
    return response.data; // Handle deleted resource data in your application
  } catch (error) {
    handleResourceError('Delete Resource Error:', error);
  }
};

// Helper function to handle resource-related errors
const handleResourceError = (prefix, error) => {
  console.error(prefix, error.response || error.message || error);
  throw error;
};

export { handleResourceError }; // Exporting error handler for testing or other utility

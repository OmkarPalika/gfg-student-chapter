import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Function to make a GET request
export const get = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to make a POST request
export const post = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to make a PUT request
export const put = async (endpoint, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to make a DELETE request
export const remove = async (endpoint) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Helper function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error.response || error.message || error);
  throw error;
};

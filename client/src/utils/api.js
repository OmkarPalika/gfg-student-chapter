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
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('API Error - Status:', error.response.status);
    console.error('API Error - Data:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Error - No response received:', error.request);
  } else {
    // Something happened in setting up the request that triggered an error
    console.error('API Error - Other error:', error.message);
  }
  throw error;
};

export default {
  get,
  post,
  put,
  remove,
};

import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Function for user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    handleAuthError('Login Error:', error);
  }
};

// Function for user registration
export const register = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    handleAuthError('Registration Error:', error);
  }
};

// Function to get user profile
export const getProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`);
    return response.data;
  } catch (error) {
    handleAuthError('Profile Error:', error);
  }
};

// Function to update user profile
export const updateProfile = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/profile`, data);
    return response.data;
  } catch (error) {
    handleAuthError('Update Profile Error:', error);
  }
};

// Function to handle user logout
export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    handleAuthError('Logout Error:', error);
  }
};

// Helper function to handle authentication errors
const handleAuthError = (prefix, error) => {
  console.error(prefix, error.response || error.message || error);
  throw error;
};

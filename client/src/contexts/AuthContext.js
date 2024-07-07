import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebaseConfig';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state for handling Firebase errors

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Update loading state when authentication state changes
    }, (error) => {
      setError(error.message); // Handle Firebase authentication errors
      setLoading(false);
    });

    return unsubscribe; // Cleanup function
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null); // Clear any previous errors on successful login
    } catch (error) {
      setError(error.message); // Handle login errors
      throw new Error('Failed to log in. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); // Clear currentUser state upon successful logout
      setError(null); // Clear any previous errors on successful logout
    } catch (error) {
      setError(error.message); // Handle logout errors
      throw new Error('Failed to log out. Please try again.');
    }
  };

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null); // Clear any previous errors on successful registration
    } catch (error) {
      setError(error.message); // Handle registration errors
      throw new Error('Failed to register. Please try again.');
    }
  };

  // Provide loading state to prevent rendering children before authentication state is determined
  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

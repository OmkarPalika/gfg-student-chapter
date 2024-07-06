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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Update loading state when authentication state changes
    });

    return unsubscribe; // Cleanup function
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Failed to log in. Please try again.'); // Handle login errors
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); // Clear currentUser state upon successful logout
    } catch (error) {
      throw new Error('Failed to log out. Please try again.'); // Handle logout errors
    }
  };

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Failed to register. Please try again.'); // Handle registration errors
    }
  };

  // Provide loading state to prevent rendering children before authentication state is determined
  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

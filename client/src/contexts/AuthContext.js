// AuthContext.js
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const { email } = user;

          let role = 'visitor'; // Default role is 'visitor'

          // Check if the user's email is in the list of admin emails
          const adminEmails = ['palikaomkar@gmail.com', 'admin2@example.com'];
          if (adminEmails.includes(email)) {
            role = 'admin';
          }

          // Set the current user with role
          setCurrentUser({ ...user, role });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user roles:', error);
          setCurrentUser(null);
          setLoading(false);
          setError('Failed to fetch user roles.');
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (error) {
      setError(error.message);
      throw new Error('Failed to log in. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setError(null);
    } catch (error) {
      setError(error.message);
      throw new Error('Failed to log out. Please try again.');
    }
  };

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (error) {
      setError(error.message);
      throw new Error('Failed to register. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, error }}>
      {!loading && children} {/* Render children only when loading is false */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

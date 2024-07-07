import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ children, roles }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    // Redirect to home page or unauthorized page based on your design
    return <Navigate to="/" replace />;
  }

  // Render children components if user is authenticated and has required role
  return children;
};

export default PrivateRoute;

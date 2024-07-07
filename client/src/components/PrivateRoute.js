import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ element, ...rest }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Route
      {...rest}
      element={currentUser ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;

import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container flex items-center justify-center h-full">
      <div className="loading-spinner"></div>
      <p className="ml-2">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;

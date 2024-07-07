import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md text-center">
      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Go to Home
      </Link>
    </div>
  </div>
);

export default NotFound;

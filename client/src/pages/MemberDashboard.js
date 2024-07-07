import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const MemberDashboard = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null; // Redirect or handle case where currentUser is not available
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Member Dashboard</h2>
        <p className="text-lg mb-4">Welcome, {currentUser.email}!</p>
        <div className="mb-4">
          {/* Example link to events or other member-specific content */}
          <a href="/events" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            View Events
          </a>
        </div>
        {/* Add more content and functionality as needed */}
      </div>
    </div>
  );
};

export default MemberDashboard;

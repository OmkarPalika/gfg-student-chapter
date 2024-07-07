import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
        <p>Welcome, {currentUser.email}!</p>
        {/* Add admin-specific functionalities like managing events, members, etc. */}
      </div>
    </div>
  );
};

export default AdminDashboard;

import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">Admin Dashboard</h2>
        <p>Welcome, {currentUser.email}!</p>
        {/* Add admin-specific functionalities like managing events, members, etc. */}
      </div>
    </div>
  );
};

export default AdminDashboard;

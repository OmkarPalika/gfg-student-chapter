import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Notification from '../components/Notification';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const approveUser = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}/approve`);

      setNotifications(prevNotifications => [
        ...prevNotifications,
        { 
          title: 'User Approved', 
          message: `User with ID ${userId} has been approved.`,
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
        <p>Welcome, {currentUser.email}!</p>
        <ul className="mt-4">
          {users.map(user => (
            <li key={user._id} className="flex items-center justify-between py-2">
              <div>{user.email} {user.approved ? '(Approved)' : '(Pending)'}</div>
              {!user.approved && (
                <button onClick={() => approveUser(user._id)} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Notifications</h2>
        <div>
          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications</p>
          ) : (
            notifications.map(notification => (
              <Notification key={notification._id} notification={notification} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

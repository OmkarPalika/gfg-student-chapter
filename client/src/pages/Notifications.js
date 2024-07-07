import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';
import { useAuth } from '../contexts/AuthContext';

const Notifications = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Notifications</h2>
        <p>Welcome, {currentUser.email}!</p>
        <div className="mt-4">
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

export default Notifications;

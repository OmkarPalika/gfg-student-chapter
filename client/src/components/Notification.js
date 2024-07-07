import React from 'react';

const Notification = ({ notification }) => {
  return (
    <div className="border border-gray-300 bg-white shadow-md rounded-lg p-4 my-2">
      <p className="text-lg font-semibold text-gray-800 mb-2">{notification.title}</p>
      <p className="text-sm text-gray-600">{notification.message}</p>
    </div>
  );
};

export default Notification;

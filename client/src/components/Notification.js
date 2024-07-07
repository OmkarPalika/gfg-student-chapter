import React from 'react';

const Notification = ({ notification }) => {
  return (
    <div className="border rounded p-4 my-2">
      <p className="font-bold">{notification.title}</p>
      <p className="text-sm">{notification.message}</p>
    </div>
  );
};

export default Notification;

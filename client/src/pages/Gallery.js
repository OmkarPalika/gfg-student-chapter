import React from 'react';

const Gallery = () => {
  // Fetch gallery data from backend or mock data

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">Gallery</h2>
        {/* Display photos and videos from past events */}
      </div>
    </div>
  );
};

export default Gallery;

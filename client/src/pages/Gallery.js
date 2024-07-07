import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    // Fetch gallery data from backend or mock data
    const fetchMedia = async () => {
      try {
        const response = await axios.get('/api/gallery');
        setMedia(response.data);
      } catch (error) {
        console.error('Error fetching gallery media:', error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Gallery</h2>
        {/* Display photos and videos from past events */}
        <div className="grid grid-cols-2 gap-4">
          {media.map((item) => (
            <div key={item.id}>
              <img src={item.imageUrl} alt={item.title} className="rounded-lg mb-2" />
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;

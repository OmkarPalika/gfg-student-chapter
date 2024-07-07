import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gallery');
        setMedia(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gallery media:', error);
        setError('Failed to fetch gallery media. Please try again.');
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  if (loading) return <LoadingSpinner />; // Display loading spinner while fetching data
  if (error) return <p className="text-red-500">{error}</p>; // Display error message if fetch fails

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Gallery</h2>
        {/* Display photos and videos from past events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((item) => (
            <div key={item.id} className="mb-4">
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

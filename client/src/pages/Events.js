import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events. Please try again.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <LoadingSpinner />; // Display loading spinner while fetching data
  if (error) return <p className="text-red-500">{error}</p>; // Display error message if fetch fails

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Events</h2>
        {events.map((event) => (
          <div key={event.id} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
              <Link to={`/events/${event.id}`} className="text-blue-500 hover:text-blue-600">
                {event.title}
              </Link>
            </h3>
            <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
            {/* Display event details like location, time, description */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;

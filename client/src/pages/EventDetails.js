import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching event details. Please try again.');
        console.error('Event details fetch error:', error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Event Details</h2>
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
        <p className="mb-4">{event.description}</p>
        {/* Additional event details like location, time, etc. */}
      </div>
    </div>
  );
};

export default EventDetails;

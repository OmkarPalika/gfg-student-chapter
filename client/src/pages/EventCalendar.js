import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events data from backend or mock data
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Event Calendar</h2>
        {events.map((event) => (
          <div key={event.id} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
            {/* Display event details like location, time, description */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;

import React from 'react';

const EventCard = ({ event, onRSVP }) => {
  const handleRSVP = () => {
    if (onRSVP) {
      onRSVP(event.id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-2">Date: {event.date ? new Date(event.date).toLocaleDateString() : 'Date not specified'}</p>
      <button
        onClick={handleRSVP}
        disabled={!onRSVP} // Disable the button if onRSVP callback is not provided
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${!onRSVP && 'opacity-50 cursor-not-allowed'}`}
      >
        {onRSVP ? 'RSVP' : 'RSVP Unavailable'}
      </button>
    </div>
  );
};

export default EventCard;

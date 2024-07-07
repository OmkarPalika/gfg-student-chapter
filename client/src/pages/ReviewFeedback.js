import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewFeedback = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // Fetch feedback data from backend or mock data
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback');
        setFeedback(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Review and Feedback</h2>
        {/* Display feedback items */}
        <ul className="list-disc list-inside">
          {feedback.map((item) => (
            <li key={item.id}>
              <p className="text-gray-800">{item.feedback}</p>
              <p className="text-gray-600">By: {item.username}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewFeedback;

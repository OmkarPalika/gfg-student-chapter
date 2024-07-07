import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DiscussionForums = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    // Fetch discussion threads from backend or mock data
    const fetchThreads = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/threads');
        setThreads(response.data);
      } catch (error) {
        console.error('Error fetching discussion threads:', error);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Discussion Forums</h2>
        {threads.map((thread) => (
          <div key={thread.id} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{thread.title}</h3>
            <p className="text-gray-600 mb-2">{thread.content}</p>
            {/* Display comments or additional thread details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForums;

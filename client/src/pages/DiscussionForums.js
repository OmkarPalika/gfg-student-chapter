import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DiscussionForums = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/threads');
        setThreads(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching discussion threads:', error);
        setError('Failed to fetch discussion threads. Please try again.');
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Discussion Forums</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {threads.length === 0 ? (
              <p className="text-gray-600">No threads found.</p>
            ) : (
              threads.map((thread) => (
                <div key={thread.id} className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">{thread.title}</h3>
                  <p className="text-gray-600 mb-2">{thread.content}</p>
                  <Link
                    to={`/threads/${thread.id}`}
                    className="text-blue-500 hover:text-blue-600 font-semibold"
                  >
                    View Thread →
                  </Link>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DiscussionForums;

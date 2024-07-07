import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Resources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch resources data from backend or mock data
    const fetchResources = async () => {
      try {
        const response = await axios.get('/api/resources');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Resources</h2>
        {/* Display repository of articles, tutorials, documents */}
        <ul className="list-disc list-inside">
          {resources.map((resource) => (
            <li key={resource.id}>
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Resources;

import React, { createContext, useContext, useState, useEffect } from 'react';

const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/resources');
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        const data = await response.json();
        setResources(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <ResourceContext.Provider value={{ resources, loading, error }}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResource = () => useContext(ResourceContext);

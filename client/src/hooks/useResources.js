// useResources.js
import { useContext } from 'react';
import { ResourceContext } from '../contexts/ResourceContext';

export const useResources = () => {
  const resourceContext = useContext(ResourceContext);

  if (!resourceContext) {
    throw new Error('useResources must be used within a ResourceProvider');
  }

  return resourceContext;
};

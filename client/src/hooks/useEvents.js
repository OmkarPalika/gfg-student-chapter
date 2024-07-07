// useEvents.js
import { useContext } from 'react';
import { EventContext } from '../contexts/EventContext';

export const useEvents = () => {
  const eventContext = useContext(EventContext);

  if (!eventContext) {
    throw new Error('useEvents must be used within an EventProvider');
  }

  return eventContext;
};

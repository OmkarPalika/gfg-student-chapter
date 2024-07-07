import { analytics } from './config/firebaseConfig';

// Function to log a custom event with Firebase Analytics
const logEvent = (eventName, eventParams) => {
  try {
    if (!analytics) {
      console.warn('Firebase Analytics is not initialized.');
      return;
    }

    // Optional: Validate eventName and eventParams before logging
    if (!eventName || typeof eventName !== 'string') {
      throw new Error('Event name must be a non-empty string.');
    }

    if (eventParams && typeof eventParams !== 'object') {
      throw new Error('Event parameters must be an object.');
    }

    // Log the event with Firebase Analytics
    analytics.logEvent(eventName, eventParams);

    console.log('Event logged:', eventName, eventParams);
  } catch (error) {
    console.error('Error logging event:', error);
    // Handle any errors that occur during event logging
  }
};

export { logEvent };

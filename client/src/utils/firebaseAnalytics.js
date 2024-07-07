import { analytics } from './config/firebaseConfig';

// Function to log a custom event with Firebase Analytics
const logEvent = (eventName, eventParams) => {
  try {
    if (!analytics) {
      console.warn('Firebase Analytics is not initialized.');
      return;
    }

    // Validate eventName and eventParams before logging (optional)

    // Log the event with Firebase Analytics
    analytics.logEvent(eventName, eventParams);

  } catch (error) {
    console.error('Error logging event:', error);
    // Handle any errors that occur during event logging
  }
};

export { logEvent };

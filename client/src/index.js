import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

// Functional ErrorBoundary component
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleErrors = () => setHasError(true);
    window.addEventListener('error', handleErrors);

    return () => window.removeEventListener('error', handleErrors);
  }, []);

  if (hasError) {
    return <h1>Something went wrong. Please try again later.</h1>;
  }

  return children;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

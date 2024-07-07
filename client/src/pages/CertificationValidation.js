import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

const CertificationValidation = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleValidation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/certificates/${certificateNumber}`);
      setValidationResult(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to validate certificate. Please try again.');
      console.error('Certificate validation error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Certification Validation</h2>
        <input
          type="text"
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
          placeholder="Enter certificate number"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button onClick={handleValidation} className="bg-green-500 text-white p-2 rounded w-full">
          {loading ? <LoadingSpinner /> : 'Validate Certificate'}
        </button>
        <ErrorBoundary>
          {validationResult && (
            <div className="mt-4">
              <p>Certificate Number: {validationResult.certificateNumber}</p>
              <p>Validation Status: {validationResult.valid ? 'Valid' : 'Invalid'}</p>
              {/* Display additional validation details as needed */}
            </div>
          )}
        </ErrorBoundary>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CertificationValidation;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }

      // You can add password strength validation here if needed
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
      }

      await register(email, password);
      setLoading(false);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setError('Failed to register. Please try again.');
      console.error('Registration error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-xl mb-4">Register</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          required
        />
        {/* Example of password strength meter or requirements */}
        {/* <p>Password must be at least 8 characters long.</p> */}
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Register;

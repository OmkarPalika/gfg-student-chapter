import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate(); // Access the navigate function

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Navigate to Home page upon successful logout
    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout error if needed
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to the GeeksforGeeks Student Chapter</h2>
        <p>Introduction to the GeeksforGeeks Student Chapter.</p>
        {currentUser ? (
          <>
            <p>Logged in as: {currentUser.email}</p>
            <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">Logout</button>
            {/* Customize content based on user roles */}
            {currentUser.role === 'admin' && (
              <p>Admin-specific content or actions</p>
            )}
            {currentUser.role === 'member' && (
              <p>Member-specific content or actions</p>
            )}
          </>
        ) : (
          <>
            <p>Highlight upcoming events.</p>
            <p>Display recent blog posts or news related to the chapter.</p>
            <div>
              <Link to="/register" className="bg-green-500 text-white p-2 rounded">Register</Link>
              <Link to="/login" className="bg-blue-500 text-white p-2 rounded ml-2">Login</Link>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;

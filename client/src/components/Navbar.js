import React from 'react';
import { Link } from 'react-router-dom'; // Assuming using React Router for navigation

const Navbar = () => {
  return (
    <nav className="bg-green-500 text-white p-4">
      <ul className="flex justify-end space-x-4">
        <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
        <li><Link to="/events" className="hover:text-blue-300">Events</Link></li>
        <li><Link to="/blog" className="hover:text-blue-300">Blog</Link></li>
        <li><Link to="/resources" className="hover:text-blue-300">Resources</Link></li>
        <li><Link to="/contact" className="hover:text-blue-300">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

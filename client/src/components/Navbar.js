import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-300">GFG Student Chapter</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
          <li><Link to="/events" className="hover:text-blue-300">Events</Link></li>
          <li><Link to="/blogs" className="hover:text-blue-300">Blogs</Link></li>
          <li><Link to="/resources" className="hover:text-blue-300">Resources</Link></li>
          <li><Link to="/contact" className="hover:text-blue-300">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

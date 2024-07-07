import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="bg-green-500 text-white p-4">
      <div className="container mx-auto">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;

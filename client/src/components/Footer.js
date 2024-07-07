import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-500 text-white p-4 mt-auto text-center">
      <p>&copy; {new Date().getFullYear()} GeeksforGeeks Student Chapter. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

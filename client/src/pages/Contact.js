import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <form className="mb-4">
          <input
            type="text"
            placeholder="Your Name"
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Send Message
          </button>
        </form>
        {/* Display contact information if needed */}
      </div>
    </div>
  );
};

export default Contact;

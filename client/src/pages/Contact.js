import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock API request (replace with actual endpoint)
      // const response = await axios.post('http://localhost:5000/api/contact', formData);
      // Handle response if needed
      setSuccessMessage('Message sent successfully!');
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="mb-2 p-2 border border-gray-300 rounded w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="mb-2 p-2 border border-gray-300 rounded w-full"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="mb-2 p-2 border border-gray-300 rounded w-full"
            required
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
        {/* Display contact information if needed */}
      </div>
    </div>
  );
};

export default Contact;

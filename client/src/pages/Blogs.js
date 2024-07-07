import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Blogs</h2>
        {blogs.map((blog) => (
          <div key={blog.id} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-2">{blog.excerpt}</p>
            <a href={`/${blog.slug}`} className="text-blue-500 hover:text-blue-600 font-semibold">
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;

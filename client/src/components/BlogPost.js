import React from 'react';
import { Link } from 'react-router-dom';

const BlogPost = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <Link to={`/blog/${post.id}`} className="text-blue-500 hover:text-blue-600 font-semibold block">
        Read more →
      </Link>
    </div>
  );
};

export default BlogPost;

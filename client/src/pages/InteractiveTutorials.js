import React from 'react';

const InteractiveTutorials = () => {
  // Sample interactive tutorial data (replace with actual data or fetch from backend)
  const tutorials = [
    {
      id: 1,
      title: 'Introduction to React Hooks',
      description: 'Learn about useState and useEffect hooks in React.',
      link: '/tutorial/react-hooks',
    },
    {
      id: 2,
      title: 'Node.js Crash Course',
      description: 'Explore Node.js fundamentals and asynchronous programming.',
      link: '/tutorial/nodejs-crash-course',
    },
    // Add more tutorial objects as needed
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4">Interactive Tutorials</h2>
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
            <p className="text-gray-600 mb-2">{tutorial.description}</p>
            <a href={tutorial.link} className="text-blue-500 hover:text-blue-600 font-semibold">
              Start Tutorial →
            </a>
          </div>
        ))}
        {/* Implement additional interactive tutorial content as needed */}
      </div>
    </div>
  );
};

export default InteractiveTutorials;

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">
        <h2 className="text-xl font-bold">Welcome to the GeeksforGeeks Student Chapter</h2>
        <p>Introduction to the GeeksforGeeks Student Chapter.</p>
        <p>Highlight upcoming events.</p>
        <p>Display recent blog posts or news related to the chapter.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

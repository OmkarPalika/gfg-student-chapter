import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberDashboard from './pages/MemberDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CertificationValidation from './pages/CertificationValidation';
import ReviewFeedback from './pages/ReviewFeedback';
import EventCalendar from './pages/EventCalendar';
import DiscussionForums from './pages/DiscussionForums';
import Blogs from './pages/Blogs';
import InteractiveTutorials from './pages/InteractiveTutorials';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/certification-validation" element={<CertificationValidation />} />
        <Route path="/review-feedback" element={<ReviewFeedback />} />
        <Route path="/event-calendar" element={<EventCalendar />} />
        <Route path="/discussion-forums" element={<DiscussionForums />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/interactive-tutorials" element={<InteractiveTutorials />} />
      </Routes>
    </Router>
  );
};

export default App;

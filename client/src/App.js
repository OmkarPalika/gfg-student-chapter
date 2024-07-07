import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Events = lazy(() => import('./pages/Events'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Resources = lazy(() => import('./pages/Resources'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const MemberDashboard = lazy(() => import('./pages/MemberDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const CertificationValidation = lazy(() => import('./pages/CertificationValidation'));
const ReviewFeedback = lazy(() => import('./pages/ReviewFeedback'));
const EventCalendar = lazy(() => import('./pages/EventCalendar'));
const DiscussionForums = lazy(() => import('./pages/DiscussionForums'));
const Blogs = lazy(() => import('./pages/Blogs'));
const InteractiveTutorials = lazy(() => import('./pages/InteractiveTutorials'));

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/member-dashboard" element={<PrivateRoute><MemberDashboard /></PrivateRoute>} />
              <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
              <Route path="/certification-validation" element={<CertificationValidation />} />
              <Route path="/review-feedback" element={<ReviewFeedback />} />
              <Route path="/event-calendar" element={<EventCalendar />} />
              <Route path="/discussion-forums" element={<DiscussionForums />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/interactive-tutorials" element={<InteractiveTutorials />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
};

export default App;

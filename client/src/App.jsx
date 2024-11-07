import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EventPage from './EventPage';
import TicketPage from './TicketPage'; 
import AboutUsPage from './AboutUsPage';
import ContactUsPage from './ContactUsPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import Newspage from './Newspage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import LandingPage from './LandingPage';
import EventCreate from './EventCreate';
import LoginModal from './Components/LoginModal';
import parseJWT from '../utility/Parse';
import * as cookie from "../utility/Cookie";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);
  const [modalOpen, setModalOpen] = useState(false);

  const ProtectedRoute = ({ element, adminOnly }) => {
    const token = cookie.getCookie("AccessToken"); // Get token from cookies
    const isAuthenticated = !!token; // Check if token exists
  
    if (isAuthenticated) {
      const decodedToken = parseJWT(token); // Manually parse the JWT token
  
      if (!decodedToken) {
        console.error("Invalid or corrupted token.");
        return <Navigate to="/login" replace />;
      }
  
      const userRole = decodedToken.Role; // Extract role from token payload
  
      if (adminOnly && userRole !== 'admin') {
        // If adminOnly is true and user isn't an admin, redirect to home
        return <Navigate to="/home" replace />;
      }
  
      return element; // User is authenticated and authorized
    } else {
      // If not authenticated, redirect or trigger login modal
      return <Navigate to="/login" replace />;
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/events" element={<ProtectedRoute element={<EventPage />} />} />
        <Route path="/ticket" element={<ProtectedRoute element={<TicketPage />} />} />
        <Route path="/aboutus" element={<ProtectedRoute element={<AboutUsPage />} />}/>
        <Route path="/contactus" element={<ProtectedRoute element={<ContactUsPage />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="/news" element={<ProtectedRoute element={<Newspage />} />} />
        <Route path="/login" element={<LoginPage setAuth={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/eventcreate" element={<ProtectedRoute element={<EventCreate />}  />} />
      </Routes>
      <LoginModal open={modalOpen} handleClose={handleCloseModal} />
    </Router>
  );
};

export default App;
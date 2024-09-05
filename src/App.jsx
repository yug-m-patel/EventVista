import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/news" element={<Newspage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/eventcreate" element={<EventCreate />} />
      </Routes>
    </Router>
  );
};

export default App;

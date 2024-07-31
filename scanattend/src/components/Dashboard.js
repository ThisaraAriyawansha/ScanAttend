import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import './DashboardUI.css'; // Import your CSS file

const DashboardUI = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <motion.div 
        className="sidebar" 
        initial={{ x: -200 }} 
        animate={{ x: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="logo">Your App Logo</div>
        <ul className="sidebar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

// Home component
const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to Your Dashboard</h2>
      {/* Add more content as needed */}
    </div>
  );
};

// Profile component
const Profile = () => {
  return (
    <div className="profile">
      <h2>Profile Page</h2>
      {/* Add more content as needed */}
    </div>
  );
};

// Settings component
const Settings = () => {
  return (
    <div className="settings">
      <h2>Settings Page</h2>
      {/* Add more content as needed */}
    </div>
  );
};

export default DashboardUI;

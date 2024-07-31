import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './Home';
import RegisterStudent from './RegisterStudent';
import StudentList from './StudentList';

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
          <li><Link to="/register-student">Register Student</Link></li>
          <li><Link to="/student-list">View Students</Link></li>
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-student" element={<RegisterStudent />} />
          <Route path="/student-list" element={<StudentList />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardUI;

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
        <div className="logo">Dashboard</div>
        <ul className="sidebar-nav">
          <li><Link to="/register">Register Student</Link></li>
          <li><Link to="/view">View Students</Link></li>
          <li><Link to="/qr">QR Code</Link></li>
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="/register" element={<RegisterStudent />} />
          <Route path="/view" element={<ViewStudents />} />
          <Route path="/qr" element={<QRCode />} />
        </Routes>
      </div>
    </div>
  );
};

// Register Student component
const RegisterStudent = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    // Handle student registration logic
  };

  return (
    <div className="register-student">
      <h2>Register Student</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" required />
        </div>
        <div>
          <label>Class:</label>
          <input type="text" name="class" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

// View Students component
const ViewStudents = () => {
  return (
    <div className="view-students">
      <h2>View Students</h2>
      {/* Add logic to fetch and display students */}
    </div>
  );
};

// QR Code component
const QRCode = () => {
  return (
    <div className="qr-code">
      <h2>QR Code</h2>
      {/* Add logic to handle QR Code functionality */}
    </div>
  );
};

export default DashboardUI;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './DashboardUI.css';

const DashboardUI = () => {
  const [selectedSection, setSelectedSection] = useState('StudentRegistration');
  const navigate = useNavigate(); // Hook for navigation

  const renderContent = () => {
    switch (selectedSection) {
      case 'StudentRegistration':
        return (
          <div>
            <h2>Student Registration</h2>
            <form>
              <label>
                Student Name:
                <input type="text" />
              </label>
              <label>
                Roll Number:
                <input type="text" />
              </label>
              <label>
                Class:
                <input type="text" />
              </label>
              <button type="submit">Register</button>
            </form>
          </div>
        );
      case 'StudentAttendanceMark':
        return (
          <div>
            <h2>Student Attendance Mark</h2>
            <form>
              <label>
                Roll Number:
                <input type="text" />
              </label>
              <label>
                Date:
                <input type="date" />
              </label>
              <label>
                Attendance:
                <select>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </label>
              <button type="submit">Mark Attendance</button>
            </form>
          </div>
        );
      case 'StudentAttendanceView':
        return (
          <div>
            <h2>Student Attendance View</h2>
            <form>
              <label>
                Roll Number:
                <input type="text" />
              </label>
              <label>
                Date Range:
                <input type="date" />
                to
                <input type="date" />
              </label>
              <button type="submit">View Attendance</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='animation'>
      <div className="settings-layout">
        <div className="sidebar">
          <h2 className="dashboard-title">Dashboard</h2>
          <br></br>
          <ul>
            <li onClick={() => setSelectedSection('StudentRegistration')}>Student Registration</li>
            <li onClick={() => setSelectedSection('StudentAttendanceMark')}>Student Attendance Mark</li>
            <li onClick={() => setSelectedSection('StudentAttendanceView')}>Student Attendance View</li>
          </ul>
          <button className="btn-back" onClick={() => navigate('/login')}>Back</button>
        </div>
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardUI;

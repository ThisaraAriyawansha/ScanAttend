import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react'; // QR code generation library
import './DashboardUI.css';

const DashboardUI = () => {
  const [selectedSection, setSelectedSection] = useState('StudentRegistration');
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [grade, setGrade] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [qrCodeData, setQrCodeData] = useState(null);
  const qrRef = useRef(null);

  const navigate = useNavigate();

  const handleGenerateQR = () => {
    const data = {
      name: studentName,
      rollNumber,
      birthday,
      grade,
      phoneNumber,
    };
    setQrCodeData(JSON.stringify(data));
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${studentName}_QR.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'StudentRegistration':
        return (
          <div>
            <h2>Student Registration</h2>
            <form className="modern-form">
              <div className="form-group">
                <label>Student Name:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Roll Number:</label>
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Photo:</label>
                <input type="file" accept="image/*" />
                <div className="profile-pic">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Profile"
                    className="profile-pic-img"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Birthday:</label>
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Grade:</label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <button type="button" className="btn-save" onClick={handleGenerateQR}>
                Generate QR
              </button>
            </form>
            {qrCodeData && (
              <div className="qr-section">
                <div ref={qrRef}>
                  <QRCode value={qrCodeData} size={150} />
                </div>
                <button className="btn-save" onClick={handleDownloadQR}>
                  Download QR Code
                </button>
              </div>
            )}
          </div>
        );
      // Add other sections like StudentAttendanceMark and StudentAttendanceView here
      default:
        return null;
    }
  };

  return (
    <div className="animation">
      <div className="settings-layout">
        <div className="sidebar">
          <h2 className="dashboard-title">Dashboard</h2>
          <ul>
            <li onClick={() => setSelectedSection('StudentRegistration')}>
              Student Registration
            </li>
            <li onClick={() => setSelectedSection('StudentAttendanceMark')}>
              Student Attendance Mark
            </li>
            <li onClick={() => setSelectedSection('StudentAttendanceView')}>
              Student Attendance View
            </li>
          </ul>
          <button className="btn-back" onClick={() => navigate('/login')}>
            Back
          </button>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DashboardUI;

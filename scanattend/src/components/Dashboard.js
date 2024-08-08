import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import './DashboardUI.css';

const DashboardUI = () => {
  const [selectedSection, setSelectedSection] = useState('StudentRegistration');
  const [studentName, setStudentName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [grade, setGrade] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState(''); // Added gender state
  const [qrCodeData, setQrCodeData] = useState(null);
  const qrRef = useRef(null);

  const navigate = useNavigate();

  const handleGenerateQR = () => {
    const data = {
      name: studentName,
      birthday,
      grade,
      phoneNumber,
      gender, // Include gender in QR code data
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

  const handleRegistration = () => {
    // Implement registration logic here
    console.log('Registration button clicked');
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'StudentRegistration':
        return (
          <div className="registration-container">
            <div className="form-and-qr">
              <form className="modern-form" onSubmit={(e) => e.preventDefault()}>
                <h2>Student Registration</h2>
                <div className="form-group">
                  <label>Student Name:</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
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
                <div className="btn-container">
                  <button type="button" className="btn-save" onClick={handleGenerateQR}>
                    Generate QR
                  </button>
                  <button type="button" className="btn-save" onClick={handleRegistration}>
                    Register
                  </button>
                </div>
              </form>
              <div className="qr-section">
                {qrCodeData && (
                  <div ref={qrRef} className="qr-code">
                    <QRCode value={qrCodeData} size={150} />
                    <button className="btn-save" onClick={handleDownloadQR}>
                      Download QR Code
                    </button>
                  </div>
                )}
              </div>
            </div>
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

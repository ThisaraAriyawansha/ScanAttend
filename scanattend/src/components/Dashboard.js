import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { QrReader } from 'react-qr-reader';  // Import the QrReader component
import './DashboardUI.css';

const DashboardUI = () => {
  const [selectedSection, setSelectedSection] = useState('StudentRegistration');
  const [studentName, setStudentName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [grade, setGrade] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/100');
  const [qrCodeData, setQrCodeData] = useState(null);
  const [students, setStudents] = useState([]);
  const [scanning, setScanning] = useState(false); // State to handle QR scanning
  const qrRef = useRef(null);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate();
  

  useEffect(() => {
    if (selectedSection === 'StudentAttendanceView') {
      fetchStudents();
    } else if (selectedSection === 'StudentAttendanceMark') {
      setScanning(true); // Start scanning when this section is selected
    }
  }, [selectedSection]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error('Failed to fetch students');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleGenerateQR = () => {
    setQrCodeData(studentName); // Use only the student's full name for QR code
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

  const handleRegistration = async () => {
    const data = {
      studentName,
      birthday,
      grade,
      phoneNumber,
      gender,
      profilePic,
      qrCodeData,
      attendanceCount: 0,
    };

    try {
      const response = await fetch('http://localhost:5000/api/students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage('Registration successful');
        setMessageType('success');
        resetForm();
      } else {
        setMessage('Failed to register. Please try again.');
        setMessageType('error');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    } finally {
      setShowMessage(true);
    }
  };

  const resetForm = () => {
    setStudentName('');
    setBirthday('');
    setGrade('');
    setPhoneNumber('');
    setGender('');
    setProfilePic('https://via.placeholder.com/100');
    setQrCodeData(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async (data) => {
    if (data) {
      console.log('Scanned Data:', data); // Log the scanned data for debugging
      setScanning(false);
  
      try {
        // If data is a JSON string or requires parsing, adjust this accordingly
        const student = students.find(s => s.studentName === data);
        if (student) {
          const response = await fetch(`http://localhost:5000/api/students/${student._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ attendanceCount: student.attendanceCount + 1 }),
          });
  
          if (response.ok) {
            setMessage('Attendance marked successfully');
            setMessageType('success');
          } else {
            setMessage('Failed to mark attendance. Please try again.');
            setMessageType('error');
          }
        } else {
          setMessage('Student not found.');
          setMessageType('error');
        }
      } catch (err) {
        console.error('Error:', err);
        setMessage('An error occurred. Please try again later.');
        setMessageType('error');
      } finally {
        setShowMessage(true);
      }
    }
  };
  

  
 
  const handleError = (error) => {
    console.error('Error:', error);
    setMessage('An error occurred. Please try again later.');
    setMessageType('error');
    setShowMessage(true);
  };
  

  const renderContent = () => {
    switch (selectedSection) {
      case 'StudentRegistration':
        return (
          <div className="registration-container">
            <div className="form-and-qr">
              <form className="modern-form" onSubmit={(e) => e.preventDefault()}>
                <h2>Student Registration</h2>
                <div className="profile-pic-top">
                  <p className="upload-message">Upload a clear picture:</p>
                  <div className="profile-pic">
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="profile-pic-img"
                    />
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                  <label>Student Full Name:</label>
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
                  </select>
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
                  <label>Parent's Phone Number:</label>
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

      case 'StudentAttendanceView':
        return (
          <div className="attendance-view">
            <h2>Student Attendance View</h2>
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Attendance Count</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.studentName}</td>
                    <td>{student.attendanceCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

        case 'StudentAttendanceMark':
          return (
            <div className="attendance-mark">
              <h2>Mark Attendance</h2>
              {scanning && (
                <div className="qr-reader-container">
                  <QrReader
                    delay={300}
                    onScan={handleScan}
                    onError={handleError}
                    className="qr-reader" // Add this class for additional styling if needed
                  />
                </div>
              )}
            </div>
          );
        

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
            Mark Attendance 
            </li>
            <li onClick={() => setSelectedSection('StudentAttendanceView')}>
            View Attendance 
            </li>
          </ul>
          <button className="btn-back" onClick={() => navigate('/login')}>
            Logout
          </button>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
      <MessageModal
        show={showMessage}
        message={message}
        onClose={() => setShowMessage(false)}
        type={messageType}
      />
    </div>
  );
};

// Modal Component for displaying messages
const MessageModal = ({ show, message, onClose, type }) => {
  if (!show) return null;

  return (
    <div className={`modal ${type}`}>
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose} className="btn-close">Close</button>
      </div>
    </div>
  );
};

export default DashboardUI;

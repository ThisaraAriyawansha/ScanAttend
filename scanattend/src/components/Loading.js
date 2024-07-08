import React, { useState } from 'react';
import { Button, ProgressBar, Container } from 'react-bootstrap';
import logo from './image/qr.jpg'; // Adjust the path to your logo
import './Loading.css';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 10;
      });
    }, 300); // Adjust the speed as needed
  };

  return (
    <Container className="loading-container">
      <img src={logo} alt="System Logo" className="loading-logo" />
      <h1 className="loading-title">ScanAttend</h1>
      <p className="loading-description">Streamlining attendance management with QR code technology.</p>
      <ProgressBar now={progress} className="loading-progress" />
      <Button onClick={startLoading} className="loading-button">Let's Start</Button>
    </Container>
  );
};

export default LoadingScreen;

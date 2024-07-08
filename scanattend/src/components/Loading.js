import React, { useState } from 'react';
import { Button, ProgressBar, Container } from 'react-bootstrap';
import logo from './image/qr.jpg'; // Adjust the path to your logo
import './Loading.css'; // Assuming you have custom styles here

const LoadingScreen = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setIsLoading(true); // Start loading animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete(); // Call onComplete when animation is complete
          return 100;
        }
        return prev + 10; // Increment progress
      });
    }, 300); // Adjust the speed as needed
  };

  return (
    <Container className="loading-container">
      <img src={logo} alt="System Logo" className="loading-logo" />
      <h1 className="loading-title">ScanAttend</h1>
      <p className="loading-description">Streamlining attendance management with QR code technology.</p>
      <Button onClick={startLoading} className="loading-button">Let's Start</Button>
      {isLoading && (
        <ProgressBar now={progress} className="loading-progress" variant="success" />
      )}
    </Container>
  );
};

export default LoadingScreen;

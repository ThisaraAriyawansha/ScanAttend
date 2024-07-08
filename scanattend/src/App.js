import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen'; // Adjust the path as per your project structure
import Login from './components/Login'; // Adjust the path as per your project structure

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoadingScreen />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

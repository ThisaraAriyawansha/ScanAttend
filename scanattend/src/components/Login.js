import React, { useState } from 'react';
import './LoginPage.css';
import loginImage from './image/login.jpg';
import axios from 'axios';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login request
      try {
        const response = await axios.post('http://localhost:5000/api/users/login', {
          email: formData.email,
          password: formData.password,
        });
        alert(response.data);
      } catch (err) {
        alert('Error logging in');
      }
    } else {
      // Register request
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      try {
        const response = await axios.post('http://localhost:5000/api/users/register', {
          email: formData.email,
          password: formData.password,
        });
        alert(response.data);
        toggleForm(); // Switch to login after successful registration
      } catch (err) {
        alert('Error registering');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="image-section">
        <img src={loginImage} alt="ScanAttend" />
      </div>
      <div className="login-section">
        {isLogin ? (
          <>
            <h2>Login to ScanAttend</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <button type="submit" className="loginbtn">Login</button>
            </form>
            <p className="toggle-text">Don't have an account? <span onClick={toggleForm} className="toggle-link">Register</span></p>
          </>
        ) : (
          <>
            <h2>Register for ScanAttend</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
              <button type="submit" className="loginbtn">Register</button>
            </form>
            <p className="toggle-text">Already have an account? <span onClick={toggleForm} className="toggle-link">Login</span></p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

import React from 'react';
import './LoginPage.css';
import loginImage from './image/login.jpg';  

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="image-section">
        <img src={loginImage} alt="ScanAttend" />
      </div>
      <div className="login-section">
        <h2>Login to ScanAttend</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="loginbtn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

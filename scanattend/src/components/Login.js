import React, { useState } from 'react';
import './LoginPage.css';
import loginImage from './image/login.jpg';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-page">
      <div className="image-section">
        <img src={loginImage} alt="ScanAttend" />
      </div>
      <div className="form-section">
        {isLogin ? (
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
            <button onClick={toggleForm} className="togglebtn">Register</button>
          </div>
        ) : (
          <div className="register-section">
            <h2>Register for ScanAttend</h2>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" required />
              </div>
              <button type="submit" className="loginbtn">Register</button>
            </form>
            <button onClick={toggleForm} className="togglebtn">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

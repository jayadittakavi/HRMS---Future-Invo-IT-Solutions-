import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './style.css';
import sideImage from '../../assets/images/loginside.png';
import logo from '../../assets/images/fislogo1.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const user = login(email, password);
      // Redirect to the main dashboard route, which handles role-based rendering
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-form-side">
          <div className="login-header">
            <img src={logo} alt="Logo" className="login-logo" />
            <h2>Welcome Back</h2>
            <p className="subtitle">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="helper-text">Try: superadmin@futureinvo.com, admin@hrms.com...</span>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn primary block">Sign In</button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/signup">Sign up for free</Link></p>
          </div>
        </div>

        <div className="login-image-side">
          <img src={sideImage} alt="HRMS Login Visual" />
          <div className="image-overlay">
            <h3>Manage your workforce efficiently</h3>
            <p>The number one dashboard to manage your company.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

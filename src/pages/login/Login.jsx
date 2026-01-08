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
            {/* Logo removed as per design image */}
            <h2>Login to HRMS your<br />work starts here!</h2>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>

            <button type="submit" className="btn primary block">Login</button>

            <div className="form-options">
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              <p className="signup-text">Don't have an account? <Link to="/signup">Sign up now</Link></p>
            </div>
          </form>
        </div>

        <div className="login-image-side">
          <img src={sideImage} alt="HRMS Dashboard Preview" />
        </div>
      </div>
    </div>
  );
};

export default Login;

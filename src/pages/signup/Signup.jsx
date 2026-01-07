import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import logo from '../../assets/images/fislogo1.png';
import sideImage from '../../assets/images/loginside.png'; // Reusing for consistency

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Registering user:', formData);
    setIsSubmitted(true);
    // In a real app, this would redirect or show a success message
  };

  if (isSubmitted) {
    return (
      <div className="signup-container">
        <div className="approval-card fade-in-up">
          <div className="icon-wrapper">
            <span className="sc-icon">⏳</span>
          </div>
          <h2>Registration Successful!</h2>
          <p className="approval-text">
            Your account has been created and is currently <strong>Waiting for Super Admin approval</strong>.
          </p>
          <p className="approval-subtext">
            You will be notified via email once your account is active.
          </p>
          <Link to="/home" className="btn primary mt-3">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-form-side">
          <div className="signup-header">
            <img src={logo} alt="Logo" className="signup-logo" />
            <h2>Create Account</h2>
            <p className="subtitle">Join Future Invo HRMS today</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn primary block mt-2">Sign Up</button>
          </form>

          <div className="signup-footer pb-2">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>

        <div className="signup-image-side">
          <img src={sideImage} alt="HRMS Signup Visual" />
          <div className="image-overlay">
            <h3>Start your journey</h3>
            <p>Join thousands of companies managing their HR with ease.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

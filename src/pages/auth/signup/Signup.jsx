import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../../../components/layout/Navbar';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');

      // Create a super-minimal payload to avoid 403 Forbidden triggers
      const payload = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password
      };

      // Use API_BASE from config
      const endpoint = "/api/auth/super-admin/signup"; 
      console.log('Sending Signup Attempt to:', endpoint, payload);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log('Signup Raw Response:', responseText);
      
      let data = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.warn("Response not JSON:", responseText);
      }

      if (!response.ok) {
        // If it's a 403, the server specifically rejected this request structure
        const serverMsg = data.message || data.error || (responseText.trim() ? responseText : `Connection Error (Status: ${response.status})`);
        throw new Error(serverMsg);
      }

      alert('Account created successfully! Please verify your email.');
      navigate('/signup-otp', { state: { email: formData.email.trim() } });

    } catch (err) {
      console.error('Signup Error Detailed:', err);
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Connection Error: Backend server unreachable.');
      } else {
        setError(`Signup Failed: ${err.message}`);
      }
    }
  };

  return (
    <div className="signup-wrapper">
      <Navbar />
      
      {/* Animated Background Elements */}
      <div className="animated-bg">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      <div className="signup-container-modern">
        <div className="signup-card-glass animate__animated animate__zoomIn">
          <div className="card-body p-0">
            <div className="mb-4 text-center">
              <h3 className="signup-title mb-1">Create an account</h3>
              <p className="signup-subtitle">Join our HRMS platform to manage your workforce seamlessly.</p>
            </div>

            {error && <div className="alert glass-alert py-2 text-center" role="alert">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control signup-input-modern"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control signup-input-modern"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control signup-input-modern"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control signup-input-modern border-end-0"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    className="btn password-toggle-glass border-start-0"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="form-control signup-input-modern border-end-0"
                    placeholder="Confirm Password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    className="btn password-toggle-glass border-start-0"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn signup-btn-premium mb-4">
                Sign Up
              </button>

              <div className="text-center">
                <span className="small" style={{ color: '#475569' }}>
                  Already have an account? <Link to="/login" className="login-link-modern fw-bold">Login here</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
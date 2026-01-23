import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signupService, SIGNUP_URL } from './signupService';
import sideImage from '../../assets/images/sigupbg.png';
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

      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password, // In a real app, never store plain text password
        confirm_password: formData.confirmPassword,
        role: 'superadmin', // Defaulting to superadmin for this signup flow as per request context usually
        name: `${formData.firstName} ${formData.lastName}`
      };

      // Simulate API call
      // const response = await signupService.signupSuperAdmin(userData);
      // const data = await response.json();

      // For this demo environment, save to localStorage so Login service can find it
      localStorage.setItem('mock_registered_user', JSON.stringify(userData));

      // Success
      alert('Account created successfully! Please login with your credentials.');
      navigate('/login');

    } catch (err) {
      console.error('Signup Error:', err);
      setError(err.message || 'Failed to connect to server');
    }
  };

  return (
    <div className="container-fluid signup-container">
      <div className="card signup-card">
        <div className="row g-0 h-100">
          {/* Form Side */}
          <div className="col-lg-6 p-5 d-flex flex-column justify-content-center bg-white">
            <div className="mb-4 text-center text-lg-start">
              <h3 className="signup-title">Create an account</h3>
            </div>

            {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control signup-input"
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
                    className="form-control signup-input"
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
                  className="form-control signup-input"
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
                    className="form-control signup-input"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-outline-light text-secondary border-start-0 border-top border-bottom border-end password-toggle-btn"
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
                    className="form-control signup-input"
                    placeholder="Confirm Password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-outline-light text-secondary border-start-0 border-top border-bottom border-end password-toggle-btn"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary signup-btn">
                Sign Up
              </button>

              <div className="text-center">
                <span className="text-muted small">
                  Already have an account? <Link to="/login" className="login-link">Login here</Link>
                </span>
              </div>
            </form>
          </div>

          {/* Image Side */}
          <div className="col-lg-6 d-none d-lg-block p-0 position-relative bg-light">
            <img
              src={sideImage}
              alt="HRMS Dashboard"
              className="img-fluid signup-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

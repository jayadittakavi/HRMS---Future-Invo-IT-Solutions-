import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../../../components/layout/Navbar';
import sideImage from '../../../assets/images/sigupbg.png';
import logo from '../../../assets/images/fislogo1.png';
import scholarlyBg from '../../../assets/images/scholarly_bg.png';
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

      console.log('Sending Signup Attempt:', payload);

      const response = await fetch("/api/auth/super-admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let data = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.warn("Response not JSON:", responseText);
      }

      if (!response.ok) {
        // If it's a 403, the server specifically rejected this request structure
        const serverMsg = data.message || data.error || (responseText.trim() || `Forbidden (403): Check backend permissions`);
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
    <div className="d-flex flex-column min-vh-100 overflow-hidden">
      <Navbar />
      <div className="container-fluid signup-container flex-grow-1" style={{ backgroundImage: `url(${scholarlyBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="d-flex flex-column align-items-center w-100">
          <div className="card signup-card shadow-lg border-0 py-4 px-2" style={{ maxWidth: '500px', borderRadius: '1.5rem' }}>
            <div className="card-body p-4">
              <div className="mb-4 text-center">
                <h3 className="signup-title mb-1">Create an account</h3>
                <p className="text-secondary small">Join our HRMS platform to manage your workforce seamlessly.</p>
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

                <button type="submit" className="btn btn-primary signup-btn mb-3">
                  Sign Up
                </button>

                <div className="text-center">
                  <span className="text-secondary small">
                    Already have an account? <Link to="/login" className="login-link fw-bold">Login here</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
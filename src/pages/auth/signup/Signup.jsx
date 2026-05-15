import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaPhone } from 'react-icons/fa';
import Navbar from '../../../components/layout/Navbar';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    countryCode: '+91',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // Clear any error when user starts typing again
  };

  // ── Check if mock mode is enabled via .env ──


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      return setError('Passwords do not match');
    }

    try {
      setError('');

      // Create payload matching what the backend expects

      // Create payload matching what the backend expects
      const payload = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile ? `${formData.countryCode}${formData.mobile.trim()}` : undefined,
        password: formData.password.trim(),
        confirm_password: formData.confirmPassword.trim(),
        confirmPassword: formData.confirmPassword.trim(),
        role: "superadmin"
      };
      // Direct backend URL for super-admin signup
      const endpoint = `/api/auth/super-admin/signup`;
      console.log('Sending Signup Attempt (Absolute URL):', endpoint, payload);

      const response = await fetch(endpoint, {
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
        console.error("Backend returned non-JSON response:", responseText);
        throw new Error(`Server returned an invalid response (${response.status}). Please ensure the backend is running and the route exists.`);
      }

      if (!response.ok) {
        const rawError = data.error || data.message || `Server Error ${response.status}`;
        console.error(rawError);

        // Friendly message for duplicate email
        if (rawError.includes('1062') || rawError.includes('Duplicate entry')) {
          throw new Error('This email is already registered. Please use a different email or log in.');
        }

        // OTP email failed but account was created — navigate to OTP page with a warning
        if (rawError.toLowerCase().includes('otp send failed') || rawError.toLowerCase().includes('email')) {
          navigate('/signup-otp', {
            state: {
              email: formData.email.trim(),
              warning: 'Account created, but the OTP email could not be sent. Please use "Resend OTP" below to try again.'
            }
          });
          return;
        }

        throw new Error(rawError || 'Server error. Please try again.');
      }

      alert('Account created successfully! Please verify your email.');
      navigate('/signup-otp', { state: { email: formData.email.trim() } });

    } catch (err) {
      console.error('Signup Error Detailed:', err);
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Connection Error: Backend server unreachable.');
      } else {
        setError(err.message);
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

              {/* Mobile Number with Country Code */}
              <div className="mb-3">
                <div className="input-group mobile-input-group">
                  <select
                    name="countryCode"
                    className="form-select signup-country-code"
                    value={formData.countryCode}
                    onChange={handleChange}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                  </select>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control signup-input-modern"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    pattern="[0-9]{7,15}"
                    title="Enter 7-15 digit mobile number"
                  />
                </div>
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

              <button type="submit" className="btn signup-btn-premium mb-3">
                Sign Up
              </button>

              {/* Social Signup Removed */}

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
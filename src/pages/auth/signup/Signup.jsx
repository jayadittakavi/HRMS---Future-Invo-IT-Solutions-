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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      return setError('Passwords do not match');
    }

    try {
      setError('');

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
      // Use current origin to leverage the Vite proxy and avoid CORS
      const API_URL = window.location.origin;
      const endpoint = `${API_URL}/api/auth/super-admin/signup`;
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

  const handleGoogleSignup = () => {
    const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
    const REDIRECT_URI = "http://localhost:3000/oauth/google/callback";
    const SCOPE = "openid email profile";
    const AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`;
    
    window.location.href = AUTH_URL;
  };

  const handleOutlookSignup = () => {
    const MICROSOFT_CLIENT_ID = "YOUR_MICROSOFT_CLIENT_ID";
    const REDIRECT_URI = "http://localhost:3000/oauth/outlook/callback";
    const SCOPE = "openid profile email User.Read";
    const AUTH_URL = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${MICROSOFT_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`;
    
    window.location.href = AUTH_URL;
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

              {/* Divider */}
              <div className="signup-divider my-3">
                <span>or continue with</span>
              </div>

              {/* Social Signup Buttons */}
              <div className="social-signup-group">
                <button
                  type="button"
                  className="btn signup-btn-google"
                  onClick={handleGoogleSignup}
                >
                  <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="visually-hidden">Continue with Google</span>
                </button>

                <button
                  type="button"
                  className="btn signup-btn-outlook"
                  onClick={handleOutlookSignup}
                >
                  <svg className="outlook-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.42.34-.76.22-.33.58-.52.37-.2.86-.2.5 0 .86.2.35.21.57.55.22.34.32.77.1.43.1.86zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.01V2.62q0-.46.33-.8.33-.32.8-.32h8.67q.46 0 .8.33.32.33.32.8V6H23q.41 0 .7.3.3.29.3.7v5.7zM8.98 7H1v10h7.98V7zM8.5 18.5q0-.2-.14-.35-.14-.14-.35-.14h-5.5q-.2 0-.35.14-.14.15-.14.35 0 .21.14.35.15.14.35.14h5.5q.2 0 .35-.14.14-.14.14-.35zm14.5-4.5H14l-2 2.5V17l-2-2.5H2v1h7.5l2 2.5V21l2-2.5H23v-1z" fill="#0078D4"/>
                    <path d="M14 6V2.62L22.33 6H14z" fill="#0078D4" opacity=".5"/>
                  </svg>
                  <span className="visually-hidden">Continue with Outlook</span>
                </button>
              </div>

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
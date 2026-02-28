// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/layout/Navbar';
import sideImage from '../../../assets/images/login1.jpg';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Using context login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');

      const response = await fetch('http://192.168.1.5:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('LOGIN RESPONSE 👉', data);

      if (!response.ok) throw new Error(data.message || 'Login failed');

      if (!data.token) throw new Error('Token missing in response');

      // Safe user extraction
      const safeUser = data.user || {
        email,
        role: data.role || 'employee',
        name: data.user?.name || email.split('@')[0].split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ') // Fallback: Proper Case from Email
      };

      // Normalize role: "SUPER_ADMIN" -> "superadmin"
      let role = safeUser.role.toLowerCase().replace('_', '');

      // Update safeUser with normalized role for consistency in Context
      safeUser.role = role;

      // Save in context + localStorage
      login(safeUser, data.token);

      switch (role) {
        case 'superadmin':
          navigate('/dashboard/super-admin'); // Redirect to dashboard to show all components
          break;
        case 'admin':
          navigate('/dashboard/admin');

          break;
        case 'manager':
          navigate('/dashboard/manager');
          break;
        case 'hr':
          navigate('/dashboard/hr');
          break;
        case 'accountant':
          navigate('/dashboard/accountant');
          break;
        case 'newuser':
          navigate('/dashboard/new-user');
          break;
        case 'employee':
        default:
          navigate('/dashboard/employee');
      }

    } catch (err) {
      console.error('Login Error:', err);
      setError('Failed to log in: ' + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        {/* Animated Background Blobs */}
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        <div className="bg-blob blob-3"></div>

        <div className="card login-card">
          <div className="row g-0 h-100 w-100">
            {/* Form Side */}
            <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center bg-white">
              <div className="mb-4">
                <h3 className="login-title text-start">
                  Login to HRMS
                </h3>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control border-end-0"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="btn password-toggle-btn px-3"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Link to="/forgot-password" gap className="forgot-password-link">
                    Forgot password?
                  </Link>
                </div>

                <button type="submit" className="btn login-btn">
                  LOGIN
                </button>

                <div className="mt-4 text-center">
                  <span className="small text-muted">Don't have an account? </span>
                  <Link to="/signup" className="small fw-bold text-primary text-decoration-none">Create Account</Link>
                </div>
              </form>
            </div>

            {/* Image Side */}
            <div className="col-lg-6 d-none d-lg-block p-2">
              <div className="login-image-container h-100 w-100">
                <img
                  src={sideImage}
                  alt="HRMS Dashboard"
                  className="login-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

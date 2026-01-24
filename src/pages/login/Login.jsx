import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import sideImage from '../../assets/images/loginimage.png';
import { loginService } from './service/service';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('superadmin@example.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');

      const response = await loginService.login(email, password);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect based on role
        const role = data.user.role;
        switch (role) {
          case 'superadmin':
            navigate('/dashboard/super-admin');
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
        // Force reload to update context if necessary
        window.location.reload();
      }
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container-fluid login-container flex-grow-1">
        <div className="card login-card">
          <div className="row g-0 h-100">
            {/* Form Side */}
            <div className="col-lg-6 p-5 d-flex flex-column justify-content-center bg-white">
              <div className="mb-4">
                <h3 className="login-title">Login to HRMS your work starts here!</h3>
              </div>

              {error && <div className="alert alert-danger" role="alert">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small text-muted">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small text-muted">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary login-btn">
                  Login
                </button>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
                </div>
              </form>
            </div>

            {/* Image Side */}
            <div className="col-lg-6 d-none d-lg-block p-0 position-relative bg-light">
              <img
                src={sideImage}
                alt="HRMS Dashboard"
                className="img-fluid login-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

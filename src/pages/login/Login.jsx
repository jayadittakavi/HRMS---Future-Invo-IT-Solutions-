import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import sideImage from '../../assets/images/loginside.png';

const Login = () => {
  const [email, setEmail] = useState('superadmin@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="card border-0 shadow-lg overflow-hidden" style={{ maxWidth: '1000px', width: '100%' }}>
        <div className="row g-0">
          {/* Form Side */}
          <div className="col-lg-6 p-5 d-flex flex-column justify-content-center bg-white">
            <div className="mb-4">
              <h2 className="fw-bold text-dark mb-2">Welcome Back!</h2>
              <p className="text-muted">Please sign in to continue.</p>
            </div>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">Email Address</label>
                <input
                  type="email"
                  className="form-control form-control-lg bg-light border-0"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-secondary">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg bg-light border-0"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold mb-3">
                Sign In
              </button>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <Link to="/forgot-password" className="text-decoration-none text-muted small">Forgot Password?</Link>
                <span className="text-muted small">
                  Don't have an account? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Sign Up</Link>
                </span>
              </div>
            </form>
          </div>

          {/* Image Side */}
          <div className="col-lg-6 d-none d-lg-block">
            <img
              src={sideImage}
              alt="HRMS Dashboard"
              className="img-fluid w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

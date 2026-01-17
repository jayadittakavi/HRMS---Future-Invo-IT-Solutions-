import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import sideImage from '../../assets/images/loginside.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
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
      // Default role is 'newuser' which will trigger the pending approval dashboard
      await signup(formData.email, formData.password, {
        name: formData.name,
        role: 'newuser'
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account: ' + err.message);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="card border-0 shadow-lg overflow-hidden" style={{ maxWidth: '1000px', width: '100%' }}>
        <div className="row g-0">
          {/* Form Side */}
          <div className="col-lg-6 p-5 d-flex flex-column justify-content-center bg-white">
            <div className="mb-4">
              <h2 className="fw-bold text-dark mb-2">Create Account</h2>
              <p className="text-muted">Sign up to get started.</p>
            </div>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-lg bg-light border-0"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg bg-light border-0"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg bg-light border-0"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-secondary">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control form-control-lg bg-light border-0"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold mb-3">
                Sign Up
              </button>

              <div className="text-center mt-3">
                <span className="text-muted small">
                  Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login</Link>
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

export default Signup;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signupService } from '../../signupService';
import sideImage from '../../assets/images/sigupbg.png';

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
        password: formData.password,
        confirm_password: formData.confirmPassword,
        role: 'SUPER_ADMIN'
      };

      const response = await signupService.signupSuperAdmin(userData);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Success
      alert('Super Admin account created successfully! Please login.');
      navigate('/login');

    } catch (err) {
      console.error('Signup Error:', err);
      setError(err.message || 'Failed to connect to server');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#eef2ff' }}>
      <div className="card border-0 shadow-lg overflow-hidden" style={{ maxWidth: '900px', width: '100%' }}>
        <div className="row g-0 h-100">
          {/* Form Side */}
          <div className="col-lg-6 p-5 d-flex flex-column justify-content-center bg-white">
            <div className="mb-4 text-center text-lg-start">
              <h3 className="fw-bold mb-2" style={{ color: '#1e40af' }}>Create an account</h3>
            </div>

            {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                  />
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                />
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                  />
                  <button
                    className="btn btn-outline-light text-secondary border-start-0 border-top border-bottom border-end"
                    type="button"
                    style={{ borderColor: '#e2e8f0', borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}
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
                    className="form-control"
                    placeholder="Confirm Password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                  />
                  <button
                    className="btn btn-outline-light text-secondary border-start-0 border-top border-bottom border-end"
                    type="button"
                    style={{ borderColor: '#e2e8f0', borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold mb-2" style={{ backgroundColor: '#1e40af', borderColor: '#1e40af', padding: '0.75rem' }}>
                Sign Up
              </button>

              <div className="text-center">
                <span className="text-muted small">
                  Already have an account? <Link to="/login" className="text-decoration-none" style={{ color: '#3b82f6' }}>Login here</Link>
                </span>
              </div>
            </form>
          </div>

          {/* Image Side */}
          <div className="col-lg-6 d-none d-lg-block p-0 position-relative bg-light">
            <img
              src={sideImage}
              alt="HRMS Dashboard"
              className="img-fluid w-100 h-100 position-absolute top-0 start-0"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

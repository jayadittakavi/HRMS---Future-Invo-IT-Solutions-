import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sideImage from '../../../assets/images/loginimage.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Sending reset link to:', email);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-body">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="row g-0">
                  <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                    <div className="mb-4">
                      <h2 className="fw-bold text-primary">Check your inbox</h2>
                      <p className="text-secondary">We have sent a password reset link to <strong>{email}</strong></p>
                    </div>

                    <button onClick={() => setIsSubmitted(false)} className="btn btn-primary btn-lg w-100 fw-bold shadow-sm mb-3">
                      Resend Link
                    </button>

                    <div className="text-center">
                      <Link to="/login" className="text-decoration-none text-secondary small fw-bold">Back to Login</Link>
                    </div>
                  </div>
                  <div className="col-md-6 d-none d-md-block position-relative">
                    <img
                      src={sideImage}
                      alt="Check Inbox"
                      className="img-fluid w-100 h-100 object-fit-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-body">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="row g-0">
                {/* Left Side - Form */}
                <div className="col-md-6 p-5">
                  <div className="mb-4">
                    <h2 className="fw-bold text-primary">Forgot Password?</h2>
                    <p className="text-secondary">Enter your email to reset your password.</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Email Address</label>
                      <input
                        type="email"
                        className="form-control form-control-lg bg-card"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm mb-4">
                      Send Reset Link
                    </button>

                    <div className="text-center">
                      <Link to="/login" className="text-decoration-none text-muted small fw-bold">
                        ← Back to Login
                      </Link>
                    </div>
                  </form>
                </div>

                {/* Right Side - Image */}
                <div className="col-md-6 d-none d-md-block position-relative">
                  <img
                    src={sideImage}
                    alt="Forgot Password"
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                  <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-dark bg-opacity-50 text-white">
                    <h4 className="fw-bold">Account Recovery</h4>
                    <p className="mb-0 small">Securely restore access to your HRMS account.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

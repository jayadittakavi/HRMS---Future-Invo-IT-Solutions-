import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Forgetpssword.css';
import logo from '../../assets/images/fislogo1.png';

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

  return (
    <div className="forget-container">
      <div className="forget-card animated-fade-in">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="forget-logo" />
        </div>

        {!isSubmitted ? (
          <>
            <h2>Forgot Password?</h2>
            <p className="subtitle text-center mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn primary block">Send Reset Link</button>
            </form>
          </>
        ) : (
          <div className="success-state">
            <div className="icon-wrapper-sm">
              ✉️
            </div>
            <h3>Check your inbox</h3>
            <p className="text-secondary mb-4">
              We have sent a password reset link to <strong>{email}</strong>.
            </p>
            <button onClick={() => setIsSubmitted(false)} className="btn outline block sm">Resend Link</button>
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/login" className="back-link">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

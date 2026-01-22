import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signupService } from '../signupService';
import { useAuth } from '../../../context/AuthContext';
import sideImage from '../../../assets/images/loginimage.png';
import './SignupOtp.css';

const SignupOtp = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || 'your email';

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const handleResend = () => {
        setTimeLeft(30);
        setCanResend(false);
        setError('');
        // Logic to resend OTP goes here
        console.log('Resending Signup OTP to', email);
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.value && element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                // Focus previous input if current is empty
                const inputs = document.querySelectorAll('.otp-input');
                if (inputs[index - 1]) {
                    inputs[index - 1].focus();
                }
            } else if (otp[index]) {
                // Clear current input if it has value
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            setError('');

            const response = await signupService.verifySignupOtp({ email, otp: otpValue });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup verification failed');
            }

            // Connection to Dashboard established here
            if (data.token) {
                // Auto-login logic
                const userData = data.user || { role: 'superadmin', email };
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(userData));

                // Force page reload to ensure all states (like AuthContext) are refreshed from localStorage
                window.location.href = '/dashboard/super-admin';
            } else {
                // Fallback if no token returned
                alert('Account verified successfully! Please login.');
                navigate('/login');
            }

        } catch (err) {
            console.error(err);
            setError(err.message || 'Invalid OTP. Please try again.');
        }
    };

    return (
        <div className="container-fluid otp-container">
            <div className="card otp-card">
                <div className="row g-0 h-100">
                    {/* Form Side */}
                    <div className="col-lg-6 p-5 d-flex flex-column justify-content-center bg-white">
                        <div className="mb-4 text-center">
                            <h3 className="otp-title">Verify Signup OTP</h3>
                            <p className="otp-description">Enter the 6-digit code sent to <strong>{email}</strong></p>
                        </div>

                        {error && <div className="alert alert-danger text-center p-2 small" role="alert">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="otp-input-group">
                                {otp.map((data, index) => (
                                    <input
                                        className="otp-input form-control"
                                        type="text"
                                        name="otp"
                                        maxLength="1"
                                        key={index}
                                        value={data}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onFocus={(e) => e.target.select()}
                                    />
                                ))}
                            </div>

                            <button type="submit" className="btn btn-primary verify-btn">
                                Verify & Proceed
                            </button>

                            <div className="text-center mt-3">
                                <span className="small text-muted">
                                    Didn't receive the code? {' '}
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className={`btn btn-link resend-btn ${canResend ? 'active' : 'disabled'}`}
                                        disabled={!canResend}
                                    >
                                        Resend {timeLeft > 0 && `(${timeLeft}s)`}
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>

                    {/* Image Side */}
                    <div className="col-lg-6 d-none d-lg-block p-0 position-relative bg-light">
                        <img
                            src={sideImage}
                            alt="Verification"
                            className="img-fluid otp-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupOtp;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import sideImage from '../../../assets/images/loginimage.png';


const ResetOtp = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || localStorage.getItem('resetEmail') || 'your email';

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const handleResend = async () => {
        setCanResend(false);
        setError('');

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to resend OTP");
            }

            // Restart timer only on success
            setTimeLeft(60);
            alert(`OTP resent successfully to ${email}`);

        } catch (err) {
            console.error("Resend OTP Error:", err);
            setError(err.message || 'Failed to resend OTP. Please try again.');
            setCanResend(true); // Allow retry immediately on failure
        }
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

            // Direct fetch call
            const response = await fetch("/api/auth/verify-reset-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: otpValue })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Reset verification failed');
            }

            // Direct reset for ALL users (as requested)
            const resetToken = data.token || otpValue;
            console.log("NAVIGATING TO RESET WITH:", { email, token: resetToken });
            navigate('/reset-password', { state: { email, token: resetToken } });

        } catch (err) {
            console.error(err);
            setError(err.message || 'Invalid OTP. Please try again.');
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-4 bg-body">
            <div className="card border-0 shadow-lg overflow-hidden" style={{ maxWidth: '900px', width: '100%' }}>
                <div className="row g-0 h-100">
                    {/* Form Side */}
                    <div className="col-lg-6 p-5 d-flex flex-column justify-content-center bg-card">
                        <div className="mb-4 text-center">
                            <h3 className="fw-bold mb-2 text-primary">Verify Reset OTP</h3>
                            <p className="text-secondary small">Enter the 6-digit code sent to <strong>{email}</strong></p>
                        </div>

                        {error && <div className="alert alert-danger text-center p-2 small" role="alert">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-between mb-4 gap-2">
                                {otp.map((data, index) => (
                                    <input
                                        className="otp-input form-control text-center fw-bold fs-4"
                                        type="text"
                                        name="otp"
                                        maxLength="1"
                                        key={index}
                                        value={data}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onFocus={(e) => e.target.select()}
                                        style={{
                                            width: '45px',
                                            height: '55px',
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '0.5rem',
                                            color: 'var(--primary-color)'
                                        }}
                                    />
                                ))}
                            </div>

                            <button type="submit" className="btn btn-primary w-100 fw-bold mb-3" style={{ padding: '10px' }}>
                                Verify & Proceed
                            </button>

                            <div className="text-center mt-3">
                                <span className="small text-muted">
                                    Didn't receive the code? {' '}
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className={`btn btn-link p-0 text-decoration-none fw-bold ${!canResend ? 'text-muted' : ''}`}
                                        style={{ color: canResend ? '#1e40af' : '#6c757d', pointerEvents: canResend ? 'auto' : 'none' }}
                                    >
                                        Resend {timeLeft > 0 && `(${timeLeft}s)`}
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>

                    {/* Image Side */}
                    <div className="col-lg-6 d-none d-lg-block p-0 position-relative">
                        <img
                            src={sideImage}
                            alt="Verification"
                            className="img-fluid w-100 h-100 position-absolute top-0 start-0"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetOtp;

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import sideImage from '../../../assets/images/loginimage.png';


const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const token = location.state?.token || location.state?.otp;
    const email = location.state?.email || localStorage.getItem('resetEmail');

    React.useEffect(() => {
        console.log("ResetPassword State Debug:", {
            hasState: !!location.state,
            email: email,
            hasToken: !!token
        });
    }, [location.state, email, token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !token) {
            const missing = !email && !token ? "Email and Token" : (!email ? "Email" : "Token");
            setError(`Missing session data (${missing}). Please restart the reset process from the Forgot Password page.`);
            console.warn("Reset Missing Session Data:", { email: !!email, token: !!token, state: location.state });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        const payload = {
            email: email,
            token: token,
            new_password: formData.password
        };
        console.log("SENDING RESET DATA 👉", payload);

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to reset password');
            }

            setIsSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100 bg-body">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                                <div className="row g-0">
                                    <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                                        <div className="mb-4 text-center">
                                            <h2 className="fw-bold text-success mb-3">Password Reset!</h2>
                                            <p className="text-secondary">Your password has been updated successfully.</p>
                                            <div className="spinner-border text-primary mt-3" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="small text-secondary mt-2">Redirecting to login...</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-none d-md-block position-relative">
                                        <img
                                            src={sideImage}
                                            alt="Reset Success"
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
                                        <h2 className="fw-bold text-primary">Reset Password</h2>
                                        <p className="text-secondary">Create a strong new password</p>
                                    </div>

                                    {error && <div className="alert alert-danger" role="alert">{error}</div>}

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">New Password</label>
                                            <div className="position-relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="form-control form-control-lg bg-card pe-5"
                                                    placeholder="••••••••"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="btn position-absolute top-50 end-0 translate-middle-y text-secondary border-0 bg-transparent"
                                                    style={{ zIndex: 10 }}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Confirm Password</label>
                                            <div className="position-relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className="form-control form-control-lg bg-card pe-5"
                                                    placeholder="••••••••"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="btn position-absolute top-50 end-0 translate-middle-y text-secondary border-0 bg-transparent"
                                                    style={{ zIndex: 10 }}
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm" disabled={isLoading}>
                                            {isLoading ? 'Saving...' : 'Save Password'}
                                        </button>
                                    </form>
                                </div>

                                {/* Right Side - Image */}
                                <div className="col-md-6 d-none d-md-block position-relative">
                                    <img
                                        src={sideImage}
                                        alt="Reset Password"
                                        className="img-fluid w-100 h-100 object-fit-cover"
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-dark bg-opacity-50 text-white">
                                        <h4 className="fw-bold">Security First</h4>
                                        <p className="mb-0 small">Protecting your data with industry-standard security.</p>
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

export default ResetPassword;

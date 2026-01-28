import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sideImage from '../../../assets/images/loginimage.png';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Simulate API call
        console.log('Resetting password');
        setIsSuccess(true);
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                                <div className="row g-0">
                                    <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                                        <div className="mb-4 text-center">
                                            <h2 className="fw-bold text-success mb-3">Password Reset!</h2>
                                            <p className="text-muted">Your password has been updated successfully.</p>
                                            <div className="spinner-border text-primary mt-3" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="small text-muted mt-2">Redirecting to login...</p>
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
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                            <div className="row g-0">
                                {/* Left Side - Form */}
                                <div className="col-md-6 p-5">
                                    <div className="mb-4">
                                        <h2 className="fw-bold text-primary">Reset Password</h2>
                                        <p className="text-muted">Create a strong new password</p>
                                    </div>

                                    {error && <div className="alert alert-danger" role="alert">{error}</div>}

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">New Password</label>
                                            <input
                                                type="password"
                                                className="form-control form-control-lg bg-light"
                                                placeholder="••••••••"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="form-control form-control-lg bg-light"
                                                placeholder="••••••••"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm">
                                            Save Password
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

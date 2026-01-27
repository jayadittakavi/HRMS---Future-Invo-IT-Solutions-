import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/fislogo1.png';

const NewUserDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-12 text-center mb-5">
                    <img src={logo} alt="HRMS" className="rounded-circle shadow-sm mb-3" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                    <h2 className="display-6 fw-bold text-dark">Welcome to Future Invo HRMS!</h2>
                    <p className="lead text-secondary">Let's get you set up. Please complete the following steps to activate your full account.</p>
                </div>

                <div className="col-md-10">
                    <div className="row g-4">
                        {/* Step 1: Complete Profile */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm hover-scale text-center p-4">
                                <div className="mb-3 text-primary display-4">
                                    <i className="bi bi-person-circle"></i>
                                </div>
                                <h5 className="fw-bold">Complete Profile</h5>
                                <p className="text-muted small">Fill in your personal and professional details.</p>
                                <button className="btn btn-outline-primary btn-sm rounded-pill mt-auto" onClick={() => navigate('/complete-profile')}>Start Now</button>
                            </div>
                        </div>

                        {/* Step 2: Upload Documents */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm hover-scale text-center p-4">
                                <div className="mb-3 text-success display-4">
                                    <i className="bi bi-file-earmark-arrow-up"></i>
                                </div>
                                <h5 className="fw-bold">Upload Documents</h5>
                                <p className="text-muted small">Submit digital copies of your ID and certificates.</p>
                                <button className="btn btn-outline-success btn-sm rounded-pill mt-auto" onClick={() => navigate('/upload-documents')}>Upload</button>
                            </div>
                        </div>

                        {/* Step 3: Policies */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm hover-scale text-center p-4">
                                <div className="mb-3 text-info display-4">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                                <h5 className="fw-bold">View Policies</h5>
                                <p className="text-muted small">Read and accept company policies and guidelines.</p>
                                <button className="btn btn-outline-info btn-sm rounded-pill mt-auto" onClick={() => navigate('/policies')}>View Policies</button>
                            </div>
                        </div>

                        {/* Step 4: Help & Support */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm hover-scale text-center p-4">
                                <div className="mb-3 text-warning display-4">
                                    <i className="bi bi-question-circle"></i>
                                </div>
                                <h5 className="fw-bold">Help & Support</h5>
                                <p className="text-muted small">Need assistance? Contact HR support.</p>
                                <button className="btn btn-outline-warning btn-sm rounded-pill mt-auto" onClick={() => navigate('/support')}>Get Help</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 text-center mt-5">
                    <button onClick={handleLogout} className="btn btn-light text-danger fw-bold px-4">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewUserDashboard;

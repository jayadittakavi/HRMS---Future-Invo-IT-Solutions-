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
        <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
            <div className="card border-0 shadow-lg p-5 text-center" style={{ maxWidth: '500px', width: '90%' }}>
                <div className="mb-4">
                    <img src={logo} alt="HRMS" className="rounded-circle shadow-sm" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                </div>
                <h2 className="h3 fw-bold text-dark mb-3">Account Pending Approval</h2>
                <p className="text-muted mb-4">
                    Your account is currently waiting for Super Admin approval.
                    You will be notified once your account is active.
                </p>
                <button onClick={handleLogout} className="btn text-white btn-lg w-100 rounded-pill fw-bold" style={{ backgroundColor: '#3464bc' }}>
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default NewUserDashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShieldOff, FiHome, FiArrowLeft } from 'react-icons/fi';

const AccessDenied = () => {
    const navigate = useNavigate();

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden text-center p-5" style={{ maxWidth: '500px', backgroundColor: '#fff' }}>
                <div className="mb-4 d-flex justify-content-center">
                    <div className="rounded-circle bg-danger bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                        <FiShieldOff size={48} className="text-danger" />
                    </div>
                </div>
                
                <h2 className="fw-bolder mb-2 text-dark" style={{ fontFamily: 'Georgia, serif' }}>Access Denied</h2>
                <p className="text-secondary mb-5">
                    You don't have the required permissions to access this page. 
                    Please contact your administrator if you believe this is an error.
                </p>

                <div className="d-flex flex-column gap-3">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="btn btn-primary rounded-pill py-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                        style={{ background: '#3b82f6' }}
                    >
                        <FiHome size={18} /> Back to Dashboard
                    </button>
                    
                    <button 
                        onClick={() => navigate(-1)}
                        className="btn btn-outline-secondary rounded-pill py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                    >
                        <FiArrowLeft size={18} /> Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessDenied;

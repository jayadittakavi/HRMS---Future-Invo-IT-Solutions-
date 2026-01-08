import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../pages/dashboard/Dashboardstyle.css';
import logo from '../assets/images/fislogo1.png';

const NewUserDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-layout" style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <aside className={`sidebar open`} style={{ display: 'none' }}>
                {/* Hidden sidebar for this view */}
            </aside>

            <main className="dashboard-content" style={{ marginLeft: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                    <img src={logo} alt="HRMS" style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
                    <h2 style={{ color: '#1e293b', marginBottom: '1rem' }}>Account Pending Approval</h2>
                    <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '400px' }}>
                        Your account is currently waiting for Super Admin approval.
                        You will be notified once your account is active.
                    </p>
                    <button onClick={handleLogout} className="btn primary">
                        Back to Login
                    </button>
                </div>
            </main>
        </div>
    );
};

export default NewUserDashboard;

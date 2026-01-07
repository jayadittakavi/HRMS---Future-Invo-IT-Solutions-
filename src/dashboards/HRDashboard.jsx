import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../pages/dashboard/Dashboardstyle.css';
import logo from '../assets/images/fislogo1.png';

const HRDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: '📊', path: '/dashboard' },
        { name: 'All Employees', icon: '👥', path: '/employees' },
        { name: 'Recruitment', icon: '🤝', path: '/recruitment' },
        { name: 'Onboarding', icon: '📋', path: '/onboarding' },
        { name: 'Attendance', icon: '🕒', path: '/attendance' },
    ];

    return (
        <div className="dashboard-layout">
            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <img src={logo} alt="HRMS" className="sidebar-logo" />
                    <span className="brand-name">Future Invo</span>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.name} className={item.name === 'Dashboard' ? 'active' : ''}>
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    <span className="icon">{item.icon}</span>
                                    <span className="label">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <span className="icon">🚪</span><span className="label">Logout</span>
                    </button>
                </div>
            </aside>

            <main className="dashboard-content">
                <header className="dashboard-header">
                    <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
                    <div className="header-right">
                        <div className="user-profile">
                            <div className="avatar">HR</div>
                            <div className="user-info"><p className="user-name">HR Manager</p><p className="user-role">Human Resources</p></div>
                        </div>
                    </div>
                </header>

                <div className="dashboard-grid">
                    <div className="welcome-banner">
                        <h2>HR Dashboard</h2>
                        <p>Manage recruitment, onboarding, and employee relations.</p>
                    </div>
                    <div className="stats-row">
                        <div className="d-card stat">
                            <div className="stat-icon p-blue">👥</div>
                            <div><h4>Total Staff</h4><p className="stat-value">1,234</p></div>
                        </div>
                        <div className="d-card stat">
                            <div className="stat-icon p-purple">🤝</div>
                            <div><h4>Open Positions</h4><p className="stat-value">8</p></div>
                        </div>
                        <div className="d-card stat">
                            <div className="stat-icon p-green">📋</div>
                            <div><h4>Onboarding</h4><p className="stat-value">3</p></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HRDashboard;

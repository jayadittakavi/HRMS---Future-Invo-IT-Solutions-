import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../pages/dashboard/Dashboardstyle.css'; // Reusing existing styles
import logo from '../assets/images/fislogo1.png';

const SuperAdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: '📊', path: '/dashboard' },
        { name: 'Companies', icon: '🏢', path: '/companies' },
        { name: 'Branches', icon: '🌴', path: '/branches' },
        { name: 'Departments', icon: '👥', path: '/departments' },
        { name: 'Assets', icon: '💻', path: '/assets' },
        { name: 'Employees', icon: '👷', path: '/employees' },
        { name: 'User Management', icon: '⚙️', path: '/users' },
        { name: 'Payroll', icon: '💰', path: '/payroll' },
        { name: 'Reports', icon: '📈', path: '/reports' },
    ];

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
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
                        <span className="icon">🚪</span>
                        <span className="label">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-content">
                <header className="dashboard-header">
                    <button
                        className="menu-toggle"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ☰
                    </button>

                    <div className="header-right">
                        <div className="notification-bell">
                            🔔 <span className="badge">5</span>
                        </div>
                        <div className="user-profile">
                            <div className="avatar">SA</div>
                            <div className="user-info">
                                <p className="user-name">Super Admin</p>
                                <p className="user-role">Super Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="dashboard-grid">
                    <div className="welcome-banner">
                        <h2>Welcome, Super Admin!</h2>
                        <p>You have full system access and control.</p>
                    </div>

                    <div className="stats-row">
                        <div className="d-card stat">
                            <div className="stat-icon p-blue">👥</div>
                            <div><h4>Total Employees</h4><p className="stat-value">1,234</p></div>
                        </div>
                        <div className="d-card stat">
                            <div className="stat-icon p-green">🏢</div>
                            <div><h4>Companies</h4><p className="stat-value">12</p></div>
                        </div>
                        <div className="d-card stat">
                            <div className="stat-icon p-orange">⚙️</div>
                            <div><h4>System Health</h4><p className="stat-value">98%</p></div>
                        </div>
                        <div className="d-card stat">
                            <div className="stat-icon p-purple">💰</div>
                            <div><h4>Total Payroll</h4><p className="stat-value">$1.2M</p></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SuperAdminDashboard;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../pages/dashboard/Dashboardstyle.css';
import logo from '../assets/images/fislogo1.png';

const AccountantDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: '📊', path: '/dashboard' },
        { name: 'Payroll', icon: '💰', path: '/payroll' },
        { name: 'Invoices', icon: '🧾', path: '/invoices' },
        { name: 'Expenses', icon: '💸', path: '/expenses' },
        { name: 'Reports', icon: '📈', path: '/reports' },
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
                            <div className="avatar">AC</div>
                            <div className="user-info"><p className="user-name">Accountant</p><p className="user-role">Finance</p></div>
                        </div>
                    </div>
                </header>

                <div className="dashboard-grid">
                    <div className="welcome-banner">
                        <h2>Accountant Dashboard</h2>
                        <p>Manage payroll, expenses, and financial reports.</p>
                    </div>
                    <div className="stats-row">
                        <div className="d-card stat">
                            <div className="stat-icon p-blue">💰</div>
                            <div><h4>Payroll Processed</h4><p className="stat-value">95%</p></div>
                        </div>
                        <div className="d-card stat">
                            <div className="stat-icon p-orange">🧾</div>
                            <div><h4>Pending Invoices</h4><p className="stat-value">4</p></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AccountantDashboard;

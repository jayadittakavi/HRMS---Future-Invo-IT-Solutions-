import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext'; // Added
import { FaCog, FaUserCircle, FaSearch, FaRegCalendarAlt, FaBell, FaSun, FaMoon } from 'react-icons/fa';

const DashboardHeader = ({ toggleSidebar, onNavigate, title }) => {
    const { user } = useAuth();
    const { toggleSettingsDrawer, skin, theme, toggleTheme } = useTheme();
    const { toggleNotificationDrawer, unreadCount } = useNotification(); // Added
    const navigate = useNavigate();

    return (
        <header className="border-bottom py-3 px-3 d-flex align-items-center justify-content-between sticky-top navbar-theme glass-header"
            style={{
                minHeight: '70px',
                zIndex: 1020
            }}>
            {/* Left Side: Toggle & User Name */}
            <div className="d-flex align-items-center gap-3">
                <button
                    className="btn btn-light border-0 d-md-none"
                    onClick={toggleSidebar}
                    aria-label="Toggle Sidebar"
                >
                    <span className="fs-4">☰</span>
                </button>

                <span className="fw-bold text-main fs-5">
                    {title || 'Dashboard'}
                </span>
            </div>

            {/* Right Side: Navigation & Actions */}
            <div className="d-flex align-items-center gap-4">

                {/* User Actions: Search, Settings & Profile */}
                <div className="d-flex align-items-center gap-3">
                    {/* Search Bar - Gradient Glass UI */}
                    <div className="position-relative d-none d-md-block">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="form-control border-0 rounded-pill ps-5 text-main glassy-search"
                            style={{
                                width: '250px',
                                fontSize: '0.9rem',
                                paddingRight: '1rem',
                            }}
                        />
                        <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-75">
                            <FaSearch />
                        </span>
                    </div>




                    <button className="btn btn-link text-secondary p-0 position-relative" title="Notifications" onClick={toggleNotificationDrawer}>
                        <FaBell size={20} />
                        {unreadCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light" style={{ fontSize: '0.6rem' }}>
                                {unreadCount}
                                <span className="visually-hidden">New alerts</span>
                            </span>
                        )}
                    </button>
                    <button className="btn btn-link text-secondary p-0" title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"} onClick={toggleTheme}>
                        {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                    </button>
                    <button className="btn btn-link text-secondary p-0" title="Settings" onClick={toggleSettingsDrawer}>
                        <FaCog size={20} />
                    </button>
                    <button
                        className="btn btn-link text-dark p-0 border-0 bg-transparent"
                        title="Profile"
                        onClick={() => navigate('/profile')}
                    >
                        <FaUserCircle size={28} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;

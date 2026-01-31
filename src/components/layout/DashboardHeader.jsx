import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FaCog, FaUserCircle, FaSearch, FaRegCalendarAlt, FaBell, FaSun, FaMoon } from 'react-icons/fa';

const DashboardHeader = ({ toggleSidebar, onNavigate }) => {
    const { user } = useAuth();
    const { toggleSettingsDrawer, skin, theme, toggleTheme } = useTheme();

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
                    {user?.name || 'Dashboard'}
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
                            className="form-control border-0 rounded-pill ps-5 text-main"
                            style={{
                                width: '250px',
                                background: 'var(--bg-card)',
                                backdropFilter: 'var(--glass-blur)',
                                WebkitBackdropFilter: 'var(--glass-blur)',
                                border: 'var(--glass-border)',
                                boxShadow: 'var(--shadow-sm)', // Subtle pink & blue glow
                                fontSize: '0.9rem',
                                paddingRight: '1rem',
                                color: 'var(--text-main)'
                            }}
                        />
                        <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-75">
                            <FaSearch />
                        </span>
                    </div>




                    <button className="btn btn-link text-secondary p-0 position-relative" title="Notifications">
                        <FaBell size={20} />
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                        </span>
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
                        onClick={() => onNavigate && onNavigate('/profile')}
                    >
                        <FaUserCircle size={28} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;

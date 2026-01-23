import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaCog, FaUserCircle, FaSearch, FaRegCalendarAlt, FaBell } from 'react-icons/fa';

const DashboardHeader = ({ toggleSidebar }) => {
    const { user } = useAuth();
    const { toggleSettingsDrawer, skin } = useTheme();

    // Map skin to light background tints
    const skinColors = {
        blue: 'rgba(235, 248, 255, 0.95)',    // Light Blue
        purple: 'rgba(243, 232, 255, 0.95)',  // Light Purple
        green: 'rgba(220, 252, 231, 0.95)',   // Light Green
        orange: 'rgba(255, 237, 213, 0.95)', // Light Orange
        teal: 'rgba(204, 251, 241, 0.95)',    // Light Teal
        red: 'rgba(254, 226, 226, 0.95)',     // Light Red
    };

    const headerBg = skinColors[skin] || 'rgba(255, 255, 255, 0.65)'; // Fallback

    return (
        <header className="border-bottom py-3 px-4 d-flex align-items-center justify-content-between sticky-top glass-header"
            style={{
                minHeight: '70px',
                background: headerBg,
                transition: 'background 0.3s ease'
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

                <div className="vr d-none d-sm-block mx-2"></div>

                <span className="fw-bold text-dark small">
                    {user?.name || 'User'}
                </span>
            </div>

            {/* Right Side: Navigation & Actions */}
            <div className="d-flex align-items-center gap-4">
                {/* Navigation Menu */}
                <nav className="d-none d-md-flex align-items-center gap-4">
                    <Link to="/" className="text-decoration-none text-secondary fw-medium small hover-primary">Home</Link>
                    <Link to="/dashboard" className="text-decoration-none text-secondary fw-medium small hover-primary">My Space</Link>
                    <Link to="/features" className="text-decoration-none text-secondary fw-medium small hover-primary">Features</Link>
                    <Link to="/calendar" className="text-decoration-none text-secondary fw-medium small hover-primary">Calendar</Link>
                    <Link to="/about" className="text-decoration-none text-secondary fw-medium small hover-primary">About</Link>
                    <Link to="/contact" className="text-decoration-none text-secondary fw-medium small hover-primary">Contact</Link>
                </nav>

                <div className="vr d-none d-md-block mx-2"></div>

                {/* User Actions: Search, Settings & Profile */}
                <div className="d-flex align-items-center gap-3">
                    {/* Search Bar - Gradient Glass UI */}
                    <div className="position-relative d-none d-md-block">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="form-control border-0 rounded-pill ps-5 text-dark"
                            style={{
                                width: '250px',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.8)',
                                boxShadow: '0 2px 15px rgba(236, 72, 153, 0.1), 0 2px 15px rgba(59, 130, 246, 0.1)', // Subtle pink & blue glow
                                fontSize: '0.9rem',
                                paddingRight: '1rem',
                                color: '#1e293b'
                            }}
                        />
                        <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-75">
                            <FaSearch />
                        </span>
                    </div>




                    <Link to="/profile" className="btn btn-link text-dark p-0" title="Profile">
                        <FaUserCircle size={28} />
                    </Link>
                    <button className="btn btn-link text-secondary p-0 position-relative" title="Notifications">
                        <FaBell size={20} />
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                        </span>
                    </button>
                    <button className="btn btn-link text-secondary p-0" title="Settings" onClick={toggleSettingsDrawer}>
                        <FaCog size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;

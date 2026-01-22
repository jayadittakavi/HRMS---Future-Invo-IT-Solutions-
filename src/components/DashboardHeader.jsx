import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleSwitcher from './RoleSwitcher';
import { FaCog, FaUserCircle, FaSearch, FaBell } from 'react-icons/fa';

const DashboardHeader = ({ toggleSidebar, onOpenSettings }) => {
    const { user } = useAuth();

    return (
        <header className="border-bottom py-3 px-4 d-flex align-items-center justify-content-between sticky-top glass-header"
            style={{ minHeight: '70px' }}>
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

                    <RoleSwitcher />

                    <button className="btn btn-link text-dark p-0" title="Profile">
                        <FaUserCircle size={28} />
                    </button>

                    <button className="btn btn-link text-secondary p-0 position-relative" title="Notifications">
                        <FaBell size={20} />
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                        </span>
                    </button>

                    <button className="btn btn-link text-secondary p-0" title="Settings" onClick={onOpenSettings}>
                        <FaCog size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;

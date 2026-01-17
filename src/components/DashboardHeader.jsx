import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleSwitcher from './RoleSwitcher';
import { FaCog, FaUserCircle } from 'react-icons/fa';

const DashboardHeader = ({ toggleSidebar }) => {
    const { user } = useAuth();

    return (
        <header className="bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between sticky-top shadow-sm" style={{ minHeight: '70px' }}>
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
                    {user?.name || 'Meera Krishnan'}
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

                {/* User Actions: Settings & Profile */}
                <div className="d-flex align-items-center gap-3">
                    <button className="btn btn-link text-secondary p-0" title="Settings">
                        <FaCog size={20} />
                    </button>
                    <button className="btn btn-link text-dark p-0" title="Profile">
                        <FaUserCircle size={28} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;

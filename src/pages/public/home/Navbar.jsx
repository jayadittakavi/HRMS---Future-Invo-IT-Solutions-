import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/images/fislogo1.png';
import { FaCog, FaUserCircle, FaSearch } from 'react-icons/fa';

const Navbar = () => {
    // const { user, logout, isSystemInitialized } = useAuth();
    const { toggleSettingsDrawer } = useTheme();
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     logout();
    //     navigate('/login');
    // };

    return (
        <nav className="navbar navbar-expand-lg navbar-light glass-navbar sticky-top shadow-sm py-2" style={{ minHeight: '70px' }}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={logo} alt="HRMS Logo" height="40" className="me-3 rounded-4 shadow-sm" style={{ borderRadius: '12px' }} />
                    <span className="fw-bold text-primary fs-4">Future Invo HRMS</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/features">Features</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" to="/calendar">Calendar</Link>
                        </li>

                        {/* Search Bar */}
                        <li className="nav-item d-none d-lg-block">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="form-control border-0 rounded-pill ps-5 bg-light"
                                    style={{ width: '200px', fontSize: '0.9rem' }}
                                />
                                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-75">
                                    <FaSearch />
                                </span>
                            </div>
                        </li>

                        <li className="nav-item d-flex align-items-center gap-2">
                            <button className="btn btn-link text-primary p-0" title="Profile">
                                <FaUserCircle size={28} />
                            </button>
                            <button className="btn btn-link text-secondary p-0" title="Settings" onClick={toggleSettingsDrawer}>
                                <FaCog size={22} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

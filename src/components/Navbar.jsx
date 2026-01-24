import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/images/fislogo1.png';
import { FaCog, FaUserCircle, FaSearch, FaRegCalendarAlt, FaBell } from 'react-icons/fa';

const Navbar = ({ toggleSidebar, hideLogo }) => {
    const { user, logout } = useAuth();
    const { toggleSettingsDrawer } = useTheme();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (user) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm" style={{ minHeight: '70px', zIndex: 1030 }}>
            <div className="container-fluid px-4">
                {/* Mobile Sidebar Toggle (only valid if functionality provided) */}
                {toggleSidebar && (
                    <button
                        className="btn btn-light border-0 me-2 d-lg-none"
                        onClick={toggleSidebar}
                        aria-label="Toggle Sidebar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                )}

                {!hideLogo && (
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img src={logo} alt="HRMS Logo" height="35" className="me-2 rounded-3" />
                        <span className="fw-bold text-primary d-none d-sm-block">Future Invo HRMS</span>
                    </Link>
                )}

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
                    <ul className="navbar-nav ms-auto align-items-center gap-3">
                        <li className="nav-item">
                            <Link className="nav-link fw-medium text-secondary hover-primary" to="/home">Home</Link>
                        </li>

                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link fw-medium text-secondary hover-primary" to="/dashboard">My Space</Link>
                            </li>
                        )}

                        <li className="nav-item">
                            <Link className="nav-link fw-medium text-secondary hover-primary" to="/features">Features</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium text-secondary hover-primary" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium text-secondary hover-primary" to="/calendar">Calendar</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-medium text-secondary hover-primary" to="/contact">Contact</Link>
                        </li>

                        {/* Search Bar */}
                        <li className="nav-item d-none d-lg-block ms-2">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="form-control border-0 rounded-pill ps-5 bg-light"
                                    style={{ width: '220px', fontSize: '0.9rem' }}
                                />
                                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-75">
                                    <FaSearch />
                                </span>
                            </div>
                        </li>

                        {/* Icons */}
                        <li className="nav-item d-flex align-items-center gap-3 ms-2">
                            <div className="d-lg-none w-100 my-2 border-top"></div> {/* Divider for mobile */}

                            <button className="btn btn-link text-secondary p-0 position-relative" title="Notifications">
                                <FaBell size={20} />
                                {/* Optional: Notification Badge */}
                                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                    <span className="visually-hidden">New alerts</span>
                                </span>
                            </button>

                            <button className="btn btn-link text-secondary p-0" title="Settings" onClick={toggleSettingsDrawer}>
                                <FaCog size={20} />
                            </button>

                            <button className="btn btn-link text-primary p-0" title="Profile" onClick={handleProfileClick}>
                                <FaUserCircle size={28} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/fislogo1.png';
import { FaCog, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout, isSystemInitialized } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light glass-navbar sticky-top shadow-sm py-4" style={{ minHeight: '90px' }}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={logo} alt="HRMS Logo" height="55" className="me-3 rounded-4 shadow-sm" style={{ borderRadius: '12px' }} />
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
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
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

                        <li className="nav-item ms-lg-3 d-flex align-items-center gap-3">
                            <Link className="btn btn-outline-primary btn-sm rounded-pill px-4" to="/login">Login</Link>
                            <Link className="btn btn-primary btn-sm rounded-pill px-4" to="/signup">Sign Up</Link>

                            <div className="vr mx-3 ms-4"></div>

                            <button className="btn btn-link text-primary p-0" title="Profile">
                                <FaUserCircle size={30} />
                            </button>
                            <button className="btn btn-link text-secondary p-0" title="Settings">
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

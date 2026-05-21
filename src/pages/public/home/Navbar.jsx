import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { useCompany } from '../../../context/CompanyContext';
import logo from '../../../assets/images/logo.jpg';
import { FaCog, FaUserCircle, FaSearch, FaRegCalendarAlt, FaBell } from 'react-icons/fa';

const Navbar = () => {
    const { toggleSettingsDrawer } = useTheme();
    const { settings } = useCompany();
    const navigate = useNavigate();

    const companyName = settings?.company_name || 'WS HRMS';
    const companyLogo = settings?.logo_url || logo;

    return (
        <nav className="navbar navbar-expand-lg glass-navbar sticky-top py-2" style={{ minHeight: '70px' }}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" style={{ textDecoration: 'none' }} to="/">
                    <img src={companyLogo} alt="HRMS Logo" height="40" className="me-3 rounded-circle shadow-sm" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                    <div className="d-flex flex-column ms-2">
                        <span className="fw-bold fs-4 lh-1 text-primary text-truncate" style={{ maxWidth: '180px' }} title={companyName}>{companyName}</span>
                    </div>
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
                            <Link className="nav-link fw-semibold px-3" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold px-3" to="/features">Features</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold px-3" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold px-3" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold px-3" to="/calendar">Calendar</Link>
                        </li>

                        {/* Search Bar */}
                        <li className="nav-item d-none d-lg-block ms-2">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    placeholder="Search features..."
                                    className="form-control border-0 rounded-pill ps-5 modern-search"
                                    style={{ width: '220px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.1)', fontSize: '0.9rem' }}
                                />
                                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-primary opacity-50">
                                    <FaSearch size={14} />
                                </span>
                            </div>
                        </li>

                        <li className="nav-item d-flex align-items-center gap-2 ms-3">
                            <button className="nav-icon-circle bg-purple-soft" title="Settings" onClick={toggleSettingsDrawer}>
                                <FaCog size={16} />
                            </button>
                            <button className="nav-icon-circle bg-pink-soft" title="Calendar" onClick={() => navigate('/calendar')}>
                                <FaRegCalendarAlt size={16} />
                            </button>
                            <button className="nav-icon-circle bg-orange-soft" title="Notifications">
                                <FaBell size={16} />
                            </button>
                            <button className="nav-icon-circle bg-blue-soft" title="Profile">
                                <FaUserCircle size={16} />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

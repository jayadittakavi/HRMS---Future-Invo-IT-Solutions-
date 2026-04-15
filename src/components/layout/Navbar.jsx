
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useNotification } from "../../context/NotificationContext"; // Added
import logo from "../../assets/images/logo.jpg";
import { FaCog, FaUserCircle, FaSearch, FaRegCalendarAlt, FaBell } from 'react-icons/fa';

const Navbar = ({ toggleSidebar, hideLogo, isHome }) => {
    const { user, logout } = useAuth();
    const { toggleSettingsDrawer, theme } = useTheme();
    const { toggleNotificationDrawer, unreadCount } = useNotification(); // Added
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (user) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg fixed-top ${isHome ? 'navbar-dark glass-navbar' : 'bg-white shadow-sm'}`}
                style={{ minHeight: '70px', zIndex: 1030 }}>
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
                            <img src={logo} alt="HRMS Logo" height="35" className="me-2 rounded-circle" style={{ width: '35px', objectFit: 'cover' }} />
                            <span className="fw-bold d-none d-sm-block" style={{ color: theme === 'dark' ? '#fff' : 'var(--cp-purple-main)', fontWeight: '800' }}>WS HRMS</span>
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
                                <Link className={`nav-link fw-medium ${!isHome || theme === 'dark' ? 'text-main' : 'text-dark-blue'} hover-primary`} to="/home">Home</Link>
                            </li>

                            {user && (
                                <li className="nav-item">
                                    <Link className={`nav-link fw-medium ${!isHome || theme === 'dark' ? 'text-main' : 'text-dark-blue'} hover-primary`} to={user.role === 'superadmin' ? "/dashboard/super-admin" : "/dashboard"}>My Space</Link>
                                </li>
                            )}

                            <li className="nav-item">
                                <Link className={`nav-link fw-medium ${!isHome || theme === 'dark' ? 'text-main' : 'text-dark-blue'} hover-primary`} to="/features">Features</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fw-medium ${!isHome || theme === 'dark' ? 'text-main' : 'text-dark-blue'} hover-primary`} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fw-medium ${!isHome || theme === 'dark' ? 'text-main' : 'text-dark-blue'} hover-primary`} to="/calendar">Calendar</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link fw-medium ${!isHome || theme === 'dark' ? 'text-main' : 'text-dark-blue'} hover-primary`} to="/contact">Contact</Link>
                            </li>

                            {/* Search Bar */}
                            <li className="nav-item d-none d-lg-block ms-2">
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="form-control rounded-pill ps-5 glassy-search"
                                        style={{ width: '220px', fontSize: '0.9rem' }}
                                    />
                                    <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-75">
                                        <FaSearch />
                                    </span>
                                </div>
                            </li>

                            {/* Icons */}
                            <li className="nav-item d-flex align-items-center gap-2 ms-2">
                                <div className="d-lg-none w-100 my-2 border-top"></div> {/* Divider for mobile */}

                                <button 
                                    className="header-icon-circle bg-purple-soft" 
                                    title="Settings" 
                                    onClick={() => {
                                        if (user) navigate('/settings');
                                        else navigate('/login');
                                    }}
                                >
                                    <FaCog size={16} />
                                </button>

                                <button 
                                    className="header-icon-circle bg-pink-soft" 
                                    title="Calendar" 
                                    onClick={() => {
                                        if (user) navigate('/calendar');
                                        else navigate('/login');
                                    }}
                                >
                                    <FaRegCalendarAlt size={16} />
                                </button>


                                <button className="header-icon-circle bg-orange-soft position-relative" title="Notifications" onClick={toggleNotificationDrawer}>
                                    <FaBell size={16} />
                                    {unreadCount > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light" style={{ fontSize: '0.55rem', padding: '0.2rem 0.4rem' }}>
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                <button className="header-icon-circle bg-blue-soft" title="Profile" onClick={handleProfileClick}>
                                    {user?.profilePic ? (
                                        <img src={user.profilePic} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="profile" />
                                    ) : (
                                        <FaUserCircle size={15} />
                                    )}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Spacer to prevent content overlap */}
            <div style={{ height: '70px' }}></div>
        </>
    );
};

export default Navbar;

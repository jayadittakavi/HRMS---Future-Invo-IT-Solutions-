import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import { useSearch } from '../../context/SearchContext';
import { FaCog, FaUserAlt, FaSearch, FaRegCalendarAlt, FaBell, FaPhoneAlt, FaSignOutAlt, FaUserEdit, FaQuestionCircle, FaBook, FaShieldAlt, FaMapMarkerAlt, FaCommentAlt } from 'react-icons/fa';

const DashboardHeader = ({ toggleSidebar, onNavigate, title }) => {
    const { user, logout } = useAuth();
    const { toggleSettingsDrawer } = useTheme();
    const { toggleNotificationDrawer, unreadCount } = useNotification();
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="border-bottom py-3 px-3 d-flex align-items-center justify-content-between sticky-top navbar-theme glass-header"
            style={{
                minHeight: '70px',
                zIndex: 1020,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)'
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

                <span className="fw-bold text-main fs-5" style={{ color: '#1e293b' }}>
                    {title || 'Dashboard'}
                </span>
            </div>

            {/* Right Side: Navigation & Actions */}
            <div className="d-flex align-items-center gap-4">
                {/* Search Bar */}
                <div className="position-relative d-none d-md-block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="form-control border-0 rounded-pill ps-5 text-main glassy-search"
                        style={{
                            width: '240px',
                            fontSize: '0.88rem',
                            backgroundColor: '#f8fafc',
                            height: '38px'
                        }}
                        value={globalSearchTerm}
                        onChange={(e) => setGlobalSearchTerm(e.target.value)}
                    />
                    <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-50">
                        <FaSearch size={14} />
                    </span>
                </div>

                {/* Styled Icon Circles */}
                <div className="d-flex align-items-center gap-2">
                    <button className="header-icon-circle bg-purple-soft" title="Settings" onClick={() => navigate('/settings')}>
                        <FaCog size={16} />
                    </button>
                    <button className="header-icon-circle bg-pink-soft" title="Calendar" onClick={() => navigate('/calendar')}>
                        <FaRegCalendarAlt size={16} />
                    </button>
                    <button className="header-icon-circle bg-blue-soft" title="Directory" onClick={() => navigate('/directory')}>
                        <FaPhoneAlt size={15} />
                    </button>
                    <button className="header-icon-circle bg-orange-soft position-relative" title="Notifications" onClick={toggleNotificationDrawer}>
                        <FaBell size={16} />
                        {unreadCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light" style={{ fontSize: '0.55rem', padding: '0.2rem 0.4rem' }}>
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Profile Dropdown */}
                    <div className="position-relative ms-1">
                        <button
                            className="header-icon-circle bg-green-soft"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            onBlur={() => setTimeout(() => setShowProfileMenu(false), 200)}
                        >
                            {user?.profilePic ? (
                                <img src={user.profilePic} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="profile" />
                            ) : (
                                <FaUserAlt size={15} />
                            )}
                        </button>

                        {showProfileMenu && (
                            <div className="profile-dropdown-menu position-absolute end-0 bg-white">
                                <div className="dropdown-user-info">
                                    <span className="user-name">{user?.name || 'User'}</span>
                                    <span className="user-email">{user?.email || 'user@example.com'}</span>
                                </div>

                                <Link to="/profile" className="dropdown-item-custom">
                                    <FaUserEdit size={16} /> Personal Settings
                                </Link>
                                <Link to="/branches" className="dropdown-item-custom">
                                    <FaMapMarkerAlt size={16} /> Branches
                                </Link>
                                <Link to="/support" className="dropdown-item-custom">
                                    <FaQuestionCircle size={16} /> Support Ticket
                                </Link>
                                <Link to="/knowledge-base" className="dropdown-item-custom">
                                    <FaBook size={16} /> Knowledge Base
                                </Link>
                                <Link to="/privacy" className="dropdown-item-custom">
                                    <FaShieldAlt size={16} /> Privacy Policy
                                </Link>
                                <Link to="/feedback" className="dropdown-item-custom">
                                    <FaCommentAlt size={16} /> Give Feedback
                                </Link>

                                <div className="dropdown-item-custom logout-item" onClick={handleLogout}>
                                    <FaSignOutAlt size={16} /> Log out
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;

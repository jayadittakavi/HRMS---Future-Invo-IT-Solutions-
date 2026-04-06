import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { useSearch } from '../../context/SearchContext';
import {
    FaSearch, FaBell, FaCog
} from 'react-icons/fa';
import {
    FiUser, FiMapPin, FiFileText, FiShield, FiLogOut
} from 'react-icons/fi';

const DashboardHeader = ({ toggleSidebar, onNavigate, title }) => {
    const { user, logout } = useAuth();
    const { toggleNotificationDrawer, unreadCount } = useNotification();
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleMenuClick = (path) => {
        setShowProfileMenu(false);
        if (onNavigate) {
            onNavigate(path);
        } else {
            navigate(path);
        }
    };

    return (
        <header className="border-bottom py-3 px-3 d-flex align-items-center justify-content-between sticky-top glass-header"
            style={{
                minHeight: '70px',
                zIndex: 1020,
                backgroundColor: 'rgba(245, 243, 255, 0.9)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease'
            }}>
            {/* Left Side: Toggle & Title */}
            <div className="d-flex align-items-center gap-3">
                <button
                    className="btn d-md-none border-0 shadow-none d-flex align-items-center justify-content-center p-2 rounded-circle hover-bg-light"
                    onClick={toggleSidebar}
                    aria-label="Toggle Sidebar"
                    style={{ background: '#f1f5f9' }}
                >
                    <span className="fs-5 text-dark">☰</span>
                </button>

                <h1 className="fw-bold text-main fs-5 mb-0" style={{ color: '#1e293b', letterSpacing: '-0.3px' }}>
                    {title || 'Dashboard'}
                </h1>
            </div>

            {/* Right Side: Search & Icons */}
            <div className="d-flex align-items-center gap-4">
                {/* Search Bar */}
                <div className="position-relative d-none d-md-block">
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="form-control border-0 rounded-pill ps-5 text-main"
                        style={{
                            width: '260px',
                            fontSize: '0.88rem',
                            backgroundColor: '#ffffff',
                            height: '42px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                            border: '1px solid #f1f5f9'
                        }}
                        value={globalSearchTerm}
                        onChange={(e) => setGlobalSearchTerm(e.target.value)}
                    />
                    <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ opacity: 0.7 }}>
                        <FaSearch size={14} />
                    </span>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <button className="header-icon-circle-premium" title="Settings" onClick={() => navigate('/settings')}>
                        <FaCog size={15} />
                    </button>
                    <button className="header-icon-circle-premium notify position-relative" title="Notifications" onClick={toggleNotificationDrawer}>
                        <FaBell size={15} />
                        {unreadCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white" style={{ fontSize: '0.55rem', padding: '0.25rem 0.4rem', marginTop: '5px', marginLeft: '-5px' }}>
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <div className="vr mx-2 d-none d-md-block" style={{ height: '30px', opacity: 0.1 }}></div>

                    {/* Profile Toggle */}
                    <div className="position-relative ps-1">
                        <button
                            className="profile-trigger border-0 bg-transparent p-0 d-flex align-items-center gap-2"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <div className="profile-img-container shadow-sm border border-2 border-white">
                                {user?.profilePic ? (
                                    <img src={user.profilePic} alt="profile" />
                                ) : (
                                    <div className="profile-placeholder">
                                        <FiUser size={18} />
                                    </div>
                                )}
                            </div>
                            <div className="text-start d-none d-xl-block me-1">
                                <div className="fw-bold text-main x-small-text leading-tight">{user?.name?.split(' ')[0] || 'Member'}</div>
                                <div className="text-muted smaller-text leading-tight">{user?.role || 'Staff'}</div>
                            </div>
                        </button>

                        {showProfileMenu && (
                            <div className="profile-dropdown-menu-premium position-absolute end-0 bg-white"
                                style={{
                                    width: '280px',
                                    top: '130%',
                                    zIndex: 1050
                                }}>
                                <div className="p-4 dropdown-profile-header">
                                    <div className="d-flex align-items-center gap-3 mb-1">
                                        <div className="profile-img-preview">
                                            {user?.profilePic ? (
                                                <img src={user.profilePic} alt="profile" />
                                            ) : (
                                                <FiUser size={24} />
                                            )}
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="fw-bold text-dark text-truncate" style={{ fontSize: '1rem' }}>{user?.name || 'User Profile'}</div>
                                            <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>{user?.email || 'user@example.com'}</div>
                                        </div>
                                    </div>
                                    <span className="role-badge mt-2">{user?.role?.toUpperCase() || 'EMPLOYEE'}</span>
                                </div>

                                <div className="dropdown-divider-luxury"></div>

                                <div className="py-2 px-2">
                                    <div className="premium-dropdown-item" onClick={() => handleMenuClick('/profile')}>
                                        <div className="icon-wrapper"><FiUser /></div>
                                        <span>Personal Profile</span>
                                    </div>

                                    {/* Hide Company Hubs for HR, Employee, Manager */}
                                    {(() => {
                                        const r = user?.role?.toLowerCase() || '';
                                        if (r.includes('hr') || r.includes('employee') || r.includes('manager') || r.includes('fulltime')) {
                                            return null;
                                        }
                                        return (
                                            <div className="premium-dropdown-item" onClick={() => handleMenuClick('/branches')}>
                                                <div className="icon-wrapper"><FiMapPin /></div>
                                                <span>Company Hubs</span>
                                            </div>
                                        );
                                    })()}

                                    <div className="premium-dropdown-item" onClick={() => handleMenuClick('/privacy')}>
                                        <div className="icon-wrapper"><FiShield /></div>
                                        <span>Legal & Privacy</span>
                                    </div>
                                </div>

                                <div className="dropdown-divider-luxury"></div>

                                <div className="py-2 px-2">
                                    <div className="premium-dropdown-item logout" onClick={handleLogout}>
                                        <div className="icon-wrapper"><FiLogOut /></div>
                                        <span>Logout Account</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .header-icon-circle-premium {
                    width: 38px;
                    height: 38px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f8fafc;
                    color: #64748b;
                    border: 1px solid #f1f5f9;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }
                .header-icon-circle-premium:hover {
                    color: #4f46e5;
                    background: #f5f3ff;
                    border-color: #e0e7ff;
                    transform: translateY(-2px);
                }
                .header-icon-circle-premium.calendar:hover { color: #db2777; background: #fff1f2; }
                .header-icon-circle-premium.support:hover { color: #2563eb; background: #eff6ff; }
                .header-icon-circle-premium.notify:hover { color: #ea580c; background: #fff7ed; }

                .profile-trigger:hover .profile-img-container {
                    border-color: #6366f1 !important;
                    transform: scale(1.05);
                }
                .profile-img-container {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    background: #f1f5f9;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .profile-img-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .profile-placeholder {
                    color: #64748b;
                }
                
                .x-small-text { font-size: 0.85rem; }
                .smaller-text { font-size: 0.72rem; }
                .leading-tight { line-height: 1.1; }

                .profile-dropdown-menu-premium {
                    background: #ffffff;
                    border-radius: 1.25rem;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.12);
                    border: 1px solid #f1f5f9;
                    padding-bottom: 8px;
                    animation: slideDownFade 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                }

                @keyframes slideDownFade {
                    from { transform: translateY(10px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .dropdown-profile-header {
                    background: linear-gradient(to bottom right, #ffffff, #f9fafb);
                    border-radius: 1.25rem 1.25rem 0 0;
                }
                .profile-img-preview {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: #f5f3ff;
                    color: #6366f1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .profile-img-preview img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .role-badge {
                    font-size: 0.625rem;
                    font-weight: 800;
                    background: #f5f3ff;
                    color: #7c3aed;
                    padding: 3px 10px;
                    border-radius: 6px;
                    display: inline-block;
                }

                .dropdown-divider-luxury {
                    height: 1px;
                    background: linear-gradient(to right, transparent, #f1f5f9 20%, #f1f5f9 80%, transparent);
                    margin: 0;
                }

                .premium-dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 14px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.88rem;
                    color: #4b5563;
                }
                .premium-dropdown-item:hover {
                    background: #f5f3ff;
                    color: #6d28d9;
                }
                .premium-dropdown-item .icon-wrapper {
                    font-size: 1.1rem;
                    color: #9ca3af;
                    transition: all 0.2s;
                }
                .premium-dropdown-item:hover .icon-wrapper {
                    color: #6d28d9;
                    transform: scale(1.1);
                }
                .premium-dropdown-item.logout { color: #dc2626; }
                .premium-dropdown-item.logout:hover { background: #fee2e2; }
                .premium-dropdown-item.logout .icon-wrapper { color: #ef4444; }
                
                .hover-bg-light:hover { background: #f8fafc !important; }
            `}</style>
        </header>
    );
};

export default DashboardHeader;

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.jpg';
import './Sidebar.css';
import {
    MdDashboard,
    MdPeople,
    MdBusiness, // Departments
    MdBadge, // Designations
    MdFactCheck, // Attendance
    MdEventBusy, // Leave
    MdAttachMoney, // Payroll
    MdBarChart, // Reports
    MdNotifications,
    MdPerson, // Profile
    MdLogout,
    MdGroups, // Team
    MdDescription, // Documents or Leave Req
    MdCalculate, // Tax
    MdAccountBalanceWallet, // Salary Structure
    MdFileUpload, // Upload
    MdPolicy, // Policies
    MdVpnKey, // Change Password
    MdTask, // Alternative for Task
    MdAssignment, // Alternative for Daily Task
    MdAttachMoney as MdMoney, // Loans/Money
    MdFlight, // Travel
    MdEventNote, // Manage Leave
    MdLaptopMac, // Asset
    MdAdminPanelSettings, // Superadmin
    MdChecklist as MdTasks, // Task
    MdSecurity, // Audit Logs
    MdWindow, // Desk Management
    MdGridView, // Advanced
    MdExpandLess,
    MdExpandMore,
    MdChevronLeft,
    MdChevronRight,
    MdHistory
} from 'react-icons/md';

const Sidebar = ({ isOpen, toggleSidebar, onNavigate, activePath }) => {
    const { user, logout, hasPermission } = useAuth();
    const navigate = useNavigate();

    // If no user is logged in, hide sidebar (Safety check)
    if (!user) return null;

    const role = user?.role?.toLowerCase().replace(/\s/g, '') || 'new_user';
    const [openDropdowns, setOpenDropdowns] = useState({});

    const toggleDropdown = (name) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    // Helper to format role name for display
    const displayRole = role === 'new_user' ? 'New User' :
        role === 'superadmin' ? 'Super Admin' :
            role.charAt(0).toUpperCase() + role.slice(1);

    const handleLogout = () => {
        if (logout) logout();
        navigate('/login');
    };

    const renderLinks = () => {
        // Helper to generate the Dashboard link structure
        const getDashboardLink = (userRole) => {
            const commonIcon = <MdDashboard size={20} />;
            const paths = {
                superadmin: '/dashboard/super-admin',
                admin: '/dashboard/admin',
                manager: '/dashboard/manager',
                hr: '/dashboard/hr',
                employee: '/dashboard/employee',
                accountant: '/dashboard/accountant',
                newuser: '/dashboard/new-user'
            };
            const path = paths[userRole] || '/dashboard';
            return { name: 'Dashboard', icon: commonIcon, path: path, perm: 'Dashboard' };
        };

        const dashboardLink = getDashboardLink(role);

        // Core sidebar definition with permission keys
        const allLinks = [
            dashboardLink,
            { name: 'My Team', icon: <MdGroups size={20} />, path: '/dashboard/my-team', perm: 'My Team' },
            { name: 'Companies', icon: <MdBusiness size={20} />, path: '/companies', perm: 'Companies' },
            { name: 'Departments', icon: <MdGroups size={20} />, path: '/departments', perm: 'Departments' },
            { name: 'Employees', icon: <MdPeople size={20} />, path: '/employee-directory', perm: 'Employees' },
            { name: 'Attendance', icon: <MdFactCheck size={20} />, path: role === 'employee' ? '/my-attendance' : '/attendance', perm: 'Attendance' },
            {
                name: 'Requests',
                icon: <MdEventBusy size={20} />,
                perm: 'Requests',
                children: role === 'employee' ? [
                    { name: 'Apply Leave', path: '/my-leaves' },
                    { name: 'WFH', path: '/wfh-requests' }
                ] : [
                    { name: 'Leave Mgmt', path: '/leave-management' },
                    { name: 'WFH', path: '/wfh-requests' }
                ]
            },
            { name: 'Payroll & Salary', icon: <MdAttachMoney size={20} />, path: role === 'employee' ? '/my-payslips' : '/payroll-dashboard', perm: 'Payroll' },
            { name: 'Loans & Advances', icon: <MdMoney size={20} />, path: '/loans', perm: 'Loan' },
            { name: 'Travel & Expenses', icon: <MdFlight size={20} />, path: '/travel-expenses', perm: 'Travel & Expenses' },
            { name: 'Financial Reports', icon: <MdBarChart size={20} />, path: '/financial-reports', perm: 'Financial Reports' },
            {
                name: 'Administration',
                icon: <MdGridView size={20} />,
                perm: 'Administration',
                children: [
                    { name: 'Delegation', path: '/delegation' },
                    { name: 'Visitor Mgmt', path: '/visitors' },
                    { name: 'Desk Mgmt', path: '/desk-management' }
                ]
            },
            { name: 'Documents', icon: <MdDescription size={20} />, path: '/documents', perm: 'Documents' },
        ];

        // Filter links based on permissions
        const filteredLinks = allLinks.filter(link => {
            // Superadmin sees everything
            if (role === 'superadmin') return true;
            
            // If no permission key is defined, assume public-ish or common
            if (!link.perm) return true;
            
            // Check for VIEW permission
            return hasPermission(link.perm, 'VIEW');
        });

        return (
            <div className="d-flex flex-column gap-1 pt-2">
                {filteredLinks.map((link) => {
                    if (link.children) {
                        const isDropdownOpen = openDropdowns[link.name];
                        return (
                            <div key={link.name}>
                                <div
                                    className={`sidebar-link d-flex justify-content-between align-items-center ${isDropdownOpen ? 'active-dropdown' : ''}`}
                                    onClick={() => toggleDropdown(link.name)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <span className="sidebar-icon">{link.icon}</span>
                                        {isOpen && <span>{link.name}</span>}
                                    </div>
                                    {isOpen && (isDropdownOpen ? <MdExpandLess /> : <MdExpandMore />)}
                                </div>
                                {isDropdownOpen && isOpen && (
                                    <div className="bg-dark bg-opacity-10 py-1 rounded-bottom mb-1">
                                        {link.children.map(child => (
                                            <NavLink
                                                key={child.path}
                                                to={child.path}
                                                className={({ isActive }) => {
                                                    const isLinkActive = activePath !== undefined ? activePath === child.path : isActive;
                                                    return `sidebar-link ps-5 ${isLinkActive ? 'active' : ''}`;
                                                }}
                                                style={{ fontSize: '0.9em' }}
                                                onClick={(e) => {
                                                    if (window.innerWidth < 768) toggleSidebar();
                                                    if (onNavigate) {
                                                        e.preventDefault();
                                                        onNavigate(child.path);
                                                    }
                                                }}
                                            >
                                                {isOpen ? <span>{child.name}</span> : <span className="small text-center w-100">{child.name.charAt(0)}</span>}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }
                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => {
                                const isLinkActive = activePath !== undefined ? activePath === link.path : isActive;
                                return `sidebar-link ${isLinkActive ? 'active' : ''}`;
                            }}
                            onClick={(e) => {
                                if (window.innerWidth < 768) toggleSidebar();
                                if (onNavigate) {
                                    e.preventDefault();
                                    onNavigate(link.path);
                                }
                            }}
                        >
                            <span className="sidebar-icon">{link.icon}</span>
                            {isOpen && <span>{link.name}</span>}
                        </NavLink>
                    );
                })}
            </div>
        );
    };

    return (
        <div
            className={`sidebar-container h-100 d-flex flex-column transition-width ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}
            style={{ width: '100%', overflow: 'hidden' }}
        >
            {/* Logo Area */}
            <div className={`sidebar-header d-flex align-items-center mb-4 ps-2 ${!isOpen ? 'justify-content-center ps-0' : ''}`}>
                <div className="bg-white p-1 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', marginRight: isOpen ? '12px' : '0', minWidth: '40px' }}>
                    <img src={logo} alt="HRMS Logo" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }} />
                </div>
                {isOpen && (
                    <div>
                        <h5 className="mb-0 fw-bold sidebar-text-logo lh-1" style={{ fontSize: '16px' }}>WorkSphrer HRMS</h5>
                    </div>
                )}
            </div>

            {/* Role Info */}
            {isOpen && (
                <div className="sidebar-role-label text-white my-3">
                    Role : <span className="fw-bold text-white">{displayRole}</span>
                </div>
            )}

            {/* Links */}
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column gap-1 pt-2">
                    {isOpen && role === 'superadmin' && <div className="sidebar-nav-label mt-1">Super Admin Controls</div>}
                    {isOpen && role === 'admin' && <div className="sidebar-nav-label mt-1">Admin Controls</div>}
                </div>
                {renderLinks()}
            </div>

            {/* Logout Section & Collapse Action */}
            <div className="p-2 border-top border-secondary border-opacity-25 mt-auto">
                <button
                    onClick={handleLogout}
                    className="sidebar-link w-100 border-0 text-start d-flex align-items-center mb-2"
                    style={{ cursor: 'pointer', color: '#ef4444 !important', margin: isOpen ? '0 0.86rem' : '0 auto', justifyContent: isOpen ? 'flex-start' : 'center' }}
                >
                    <span className="sidebar-icon m-0"><MdLogout size={20} /></span>
                    {isOpen && <span className="ms-3">Logout</span>}
                </button>

                {/* Sidebar Collapse Action */}
                <div className={`d-flex ${isOpen ? 'justify-content-end pe-3' : 'justify-content-center'} py-2 mt-1`}>
                    <button
                        onClick={toggleSidebar}
                        className="sidebar-collapse-btn d-none d-md-flex align-items-center justify-content-center border-0 bg-transparent text-white opacity-60 hover-opacity-100"
                        style={{
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            outline: 'none',
                            boxShadow: 'none'
                        }}
                        title={isOpen ? "Collapse" : "Expand"}
                    >
                        {isOpen ? <MdChevronLeft size={24} /> : <MdChevronRight size={24} />}
                    </button>
                </div>

                {isOpen && (
                    <div className="text-center text-white small opacity-50 mt-1">
                        © 2026 WorkSphrer
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;

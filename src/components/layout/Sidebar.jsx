import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/fislogo1.png';
import './Sidebar.css';
import {
    MdDashboard,
    MdPeople,
    MdBusiness, // Departments
    MdBadge, // Designations
    MdFactCheck, // Attendance
    MdEventBusy, // Leave
    MdAttachMoney, // Payroll
    MdRateReview, // Performance
    MdBarChart, // Reports
    MdNotifications,
    MdPerson, // Profile
    MdLogout,
    MdGroups, // Team
    MdWork, // Recruitment
    MdAssignmentInd, // Onboarding
    MdSchool, // Training
    MdDescription, // Documents or Leave Req
    MdTrackChanges, // Goals
    MdCalculate, // Tax
    MdAccountBalanceWallet, // Salary Structure
    MdFileUpload, // Upload
    MdPolicy, // Policies
    MdHelp, // Help
    MdVpnKey, // Change Password
    MdReceiptLong, // Payslips
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
    MdChevronRight
} from 'react-icons/md';

const Sidebar = ({ isOpen, toggleSidebar, onNavigate, activePath }) => {
    const { user, logout } = useAuth(); // Assuming logout function exists in context
    const navigate = useNavigate();
    const role = user?.role?.toLowerCase() || 'new_user'; // Default to new_user if undefined
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
        let links = [];

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
            return { name: 'Dashboard', icon: commonIcon, path: path };
        };

        const dashboardLink = getDashboardLink(role);
        const myTeamLink = { name: 'My Team', icon: <MdGroups size={20} />, path: '/dashboard/my-team' };

        switch (role) {
            case 'admin':
                links = [
                    dashboardLink,
                    myTeamLink,
                    { name: 'Employees', icon: <MdPeople size={20} />, path: '/employee-directory' },
                    { name: 'Attendance', icon: <MdFactCheck size={20} />, path: '/attendance' },
                    { name: 'Loans', icon: <MdMoney size={20} />, path: '/loans' },
                    { name: 'Travel Expenses', icon: <MdFlight size={20} />, path: '/travel-expenses' },
                    { name: 'Payroll', icon: <MdAttachMoney size={20} />, path: '/payroll-dashboard' },
                    { name: 'Payslip', icon: <MdReceiptLong size={20} />, path: '/payslips' },
                    {
                        name: 'Administration',
                        icon: <MdGridView size={20} />,
                        children: [
                            { name: 'Delegation', path: '/delegation' },
                            { name: 'Visitor Management', path: '/visitors' },
                            { name: 'Desk Management', path: '/desk-management' }
                        ]
                    },
                    { name: 'Manage Leave', icon: <MdEventNote size={20} />, path: '/leave-management' },
                ];
                break;

            case 'superadmin':
                links = [
                    dashboardLink,
                    myTeamLink,
                    { name: 'Companies', icon: <MdBusiness size={20} />, path: '/companies' },
                    { name: 'Departments', icon: <MdGroups size={20} />, path: '/departments' },
                    { name: 'Attendance', icon: <MdFactCheck size={20} />, path: '/attendance' },
                    { name: 'Employees', icon: <MdPeople size={20} />, path: '/employee-directory' },
                    { name: 'Payroll', icon: <MdAttachMoney size={20} />, path: '/payroll-dashboard' },
                    { name: 'Leave Mgmt', icon: <MdEventBusy size={20} />, path: '/leave-management' },
                    {
                        name: 'Administration',
                        icon: <MdGridView size={20} />,
                        children: [
                            { name: 'Delegation', path: '/delegation' },
                            { name: 'Visitor Management', path: '/visitors' },
                            { name: 'Desk Management', path: '/desk-management' }
                        ]
                    }
                ];
                break;

            case 'hr':
                links = [
                    dashboardLink,
                    myTeamLink,
                    { name: 'Employee Directory', icon: <MdPeople size={20} />, path: '/employee-directory' },
                    { name: 'Attendance', icon: <MdFactCheck size={20} />, path: '/attendance' },
                    {
                        name: 'Request',
                        icon: <MdEventBusy size={20} />,
                        children: [
                            { name: 'Leave', path: '/leave-requests' },
                            { name: 'WFH', path: '/wfh-requests' },
                            { name: 'Other Requests', path: '/other-requests' }
                        ]
                    },
                    { name: 'Recruitment', icon: <MdWork size={20} />, path: '/recruitment' },
                    { name: 'Onboarding', icon: <MdAssignmentInd size={20} />, path: '/onboarding' },
                    { name: 'Training', icon: <MdSchool size={20} />, path: '/training' },
                    { name: 'Loans', icon: <MdMoney size={20} />, path: '/loans' },
                    { name: 'Transit & Travel', icon: <MdFlight size={20} />, path: '/travel-expenses' },
                    { name: 'Payroll', icon: <MdAttachMoney size={20} />, path: '/payroll-dashboard' },
                    {
                        name: 'Administration',
                        icon: <MdGridView size={20} />,
                        children: [
                            { name: 'Delegation', path: '/delegation' },
                            { name: 'Visitor Management', path: '/visitors' },
                            { name: 'Desk Management', path: '/desk-management' }
                        ]
                    },
                    { name: 'Documents', icon: <MdDescription size={20} />, path: '/documents' },
                ];
                break;

            case 'manager':
                links = [
                    dashboardLink,
                    myTeamLink,
                    { name: 'Attendance', icon: <MdFactCheck size={20} />, path: '/attendance' },
                    { name: 'Asset Allocation', icon: <MdLaptopMac size={20} />, path: '/asset-allocation' },
                    { name: 'Travel Expenses', icon: <MdFlight size={20} />, path: '/travel-expenses' },
                    { name: 'Payroll', icon: <MdAttachMoney size={20} />, path: '/payroll-dashboard' },
                    {
                        name: 'Administration',
                        icon: <MdGridView size={20} />,
                        children: [
                            { name: 'Delegation', path: '/delegation' },
                            { name: 'Visitor Management', path: '/visitors' },
                            { name: 'Desk Management', path: '/desk-management' }
                        ]
                    },
                    { name: 'Leave Management', icon: <MdEventBusy size={20} />, path: '/leave-management' },
                ];
                break;

            case 'employee':
                links = [
                    dashboardLink,
                    { name: 'My Payslips', icon: <MdReceiptLong size={20} />, path: '/my-payslips' },
                    {
                        name: 'Administration',
                        icon: <MdGridView size={20} />,
                        children: [
                            { name: 'Visitor Request', path: '/visitors' },
                            { name: 'Desk Management', path: '/desk-management' }
                        ]
                    },
                    { name: 'My Performance', icon: <MdRateReview size={20} />, path: '/my-performance' },
                    { name: 'Documents', icon: <MdDescription size={20} />, path: '/my-documents' },
                    { name: 'Change Password', icon: <MdVpnKey size={20} />, path: '/change-password' },
                ];
                break;

            case 'accountant':
                links = [
                    dashboardLink,
                    { name: 'Payroll Processing', icon: <MdAttachMoney size={20} />, path: '/payroll-processing' },
                    { name: 'Salary Structure', icon: <MdAccountBalanceWallet size={20} />, path: '/salary-structure' },
                    { name: 'Payslips', icon: <MdReceiptLong size={20} />, path: '/payslips' },
                    { name: 'Tax & Deductions', icon: <MdCalculate size={20} />, path: '/tax-deductions' },
                    { name: 'Financial Reports', icon: <MdBarChart size={20} />, path: '/financial-reports' },
                ];
                break;

            case 'new_user':
                links = [
                    dashboardLink,
                    { name: 'Complete Profile', icon: <MdPerson size={20} />, path: '/complete-profile' },
                    { name: 'Upload Documents', icon: <MdFileUpload size={20} />, path: '/upload-documents' },
                    { name: 'View Policies', icon: <MdPolicy size={20} />, path: '/policies' },
                ];
                break;

            default:
                links = [dashboardLink];
        }

        links = [...links];

        return (
            <div className="d-flex flex-column gap-1 pt-2">

                {links.map((link) => {
                    if (link.type === 'divider') {
                        return <div key={link.name} className="sidebar-divider mx-3 my-2 border-top border-secondary border-opacity-10"></div>;
                    }
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
                        <h5 className="mb-0 fw-bold sidebar-text-logo lh-1" style={{ fontSize: '16px' }}>Future Invo HRMS</h5>
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
                        © 2026 Future Invo
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;

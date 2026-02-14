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
    MdExpandLess,
    MdExpandMore
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

        // Helper to generate the My Space link structure
        const getMySpaceLink = (userRole) => {
            const commonIcon = <MdDashboard size={20} />;

            // Define all dashboard options
            const dashboards = {
                superadmin: { name: 'Super Admin Dashboard', path: '/dashboard/super-admin' },
                admin: { name: 'Admin Dashboard', path: '/dashboard/admin' },
                hr: { name: 'HR Dashboard', path: '/dashboard/hr' },
                manager: { name: 'Manager Dashboard', path: '/dashboard/manager' },
                employee: { name: 'Employee Dashboard', path: '/dashboard/employee' },
                accountant: { name: 'Accountant Dashboard', path: '/dashboard/accountant' },
                newuser: { name: 'New User Dashboard', path: '/dashboard/new-user' }
            };

            let children = [];

            switch (userRole) {
                case 'superadmin':
                    children = [
                        { ...dashboards.superadmin, name: 'My Dashboard' },
                        dashboards.admin,
                        dashboards.hr,
                        dashboards.manager,
                        dashboards.employee
                    ];
                    break;
                case 'admin':
                    children = [
                        { ...dashboards.admin, name: 'My Dashboard' },
                        dashboards.hr,
                        dashboards.manager,
                        dashboards.employee
                    ];
                    break;
                case 'manager':
                    children = [
                        { name: 'My Team', icon: commonIcon, path: '/dashboard/manager' },
                        { name: 'My Dashboard', icon: commonIcon, path: '/dashboard/manager?tab=myspace' },
                        dashboards.hr,
                        dashboards.employee
                    ];
                    break;
                case 'hr':
                    children = [
                        { ...dashboards.hr, name: 'My Dashboard' },
                        dashboards.employee
                    ];
                    break;
                case 'employee':
                    // No dropdown for employee
                    return { name: 'My Space', icon: commonIcon, path: '/dashboard/employee' };
                case 'accountant':
                    return { name: 'My Space', icon: commonIcon, path: '/dashboard/accountant' };
                case 'new_user':
                case 'newuser':
                    return { name: 'My Space', icon: commonIcon, path: '/welcome' };
                default:
                    return { name: 'My Space', icon: commonIcon, path: '/dashboard' };
            }

            return {
                name: 'My Space',
                icon: commonIcon,
                children: children
            };
        };

        const mySpaceLink = getMySpaceLink(role);

        switch (role) {
            case 'admin':
                links = [
                    mySpaceLink,
                    { name: 'Employees', icon: <MdPeople size={20} />, path: '/employees' },
                    { name: 'Attendance', icon: <MdFactCheck size={20} />, path: '/attendance' },
                    { name: 'Daily Task', icon: <MdAssignmentInd size={20} />, path: '/daily-task' },
                    { name: 'Task', icon: <MdTasks size={20} />, path: '/tasks' },
                    { name: 'Loans', icon: <MdMoney size={20} />, path: '/loans' },
                    { name: 'Travel Expenses', icon: <MdFlight size={20} />, path: '/travel-expenses' },
                    { name: 'Payslip', icon: <MdReceiptLong size={20} />, path: '/payslips' },

                    { name: 'Manage Leave', icon: <MdEventNote size={20} />, path: '/leave-management' },
                    { name: 'Onboarding', icon: <MdAssignmentInd size={20} />, path: '/onboarding' },
                    { name: 'Audit Logs', icon: <MdSecurity size={20} />, path: '/admin/audit-logs' },
                ];
                break;

            case 'superadmin':
                links = [
                    mySpaceLink,
                    { name: 'Companies', icon: <MdBusiness size={20} />, path: '/companies' },
                    { name: 'Branches', icon: <MdBusiness size={20} />, path: '/branches' },
                    { name: 'Departments', icon: <MdGroups size={20} />, path: '/departments' },
                    { name: 'Attendance', icon: <MdFactCheck size={20} />, path: '/attendance' },
                    { name: 'Employees', icon: <MdPeople size={20} />, path: '/employees' },
                    { name: 'Payroll', icon: <MdAttachMoney size={20} />, path: '/payroll' },
                    { name: 'Pay Grade', icon: <MdAttachMoney size={20} />, path: '/pay-grade' },
                    { name: 'Financial Year', icon: <MdEventNote size={20} />, path: '/financial-year' },
                    { name: 'Leave Mgmt', icon: <MdEventBusy size={20} />, path: '/leave-management' },
                    { name: 'User Mgmt', icon: <MdPerson size={20} />, path: '/users' },
                    { name: 'Audit Logs', icon: <MdSecurity size={20} />, path: '/super-admin/audit-logs' },
                ];
                break;

            case 'hr':
                links = [
                    mySpaceLink,
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
                    { name: 'Documents', icon: <MdDescription size={20} />, path: '/documents' },
                    { name: 'HR Reports', icon: <MdBarChart size={20} />, path: '/hr-reports' },
                ];
                break;

            case 'manager':
                links = [
                    mySpaceLink,
                    { name: 'My Attendance', icon: <MdFactCheck size={20} />, path: '/my-attendance' },
                    { name: 'Attendance', icon: <MdFactCheck size={20} />, path: '/attendance' },
                    { name: 'Daily Task', icon: <MdAssignment size={20} />, path: '/daily-task' },
                    { name: 'Task', icon: <MdTasks size={20} />, path: '/task' },
                    { name: 'Asset Allocation', icon: <MdLaptopMac size={20} />, path: '/asset-allocation' },
                    { name: 'Travel Expenses', icon: <MdFlight size={20} />, path: '/travel-expenses' },
                    { name: 'Leave Management', icon: <MdEventBusy size={20} />, path: '/leave-management' },
                ];
                break;

            case 'employee':
                links = [
                    mySpaceLink,
                    { name: 'My Attendance', icon: <MdFactCheck size={20} />, path: '/my-attendance' },
                    { name: 'My Leave', icon: <MdEventBusy size={20} />, path: '/my-leaves' },
                    { name: 'My Payslips', icon: <MdReceiptLong size={20} />, path: '/my-payslips' },
                    { name: 'My Performance', icon: <MdRateReview size={20} />, path: '/my-performance' },
                    { name: 'Documents', icon: <MdDescription size={20} />, path: '/my-documents' },
                    { name: 'Change Password', icon: <MdVpnKey size={20} />, path: '/change-password' },
                ];
                break;

            case 'accountant':
                links = [
                    mySpaceLink,
                    { name: 'Payroll Processing', icon: <MdAttachMoney size={20} />, path: '/payroll-processing' },
                    { name: 'Salary Structure', icon: <MdAccountBalanceWallet size={20} />, path: '/salary-structure' },
                    { name: 'Payslips', icon: <MdReceiptLong size={20} />, path: '/payslips' },
                    { name: 'Tax & Deductions', icon: <MdCalculate size={20} />, path: '/tax-deductions' },
                    { name: 'Financial Reports', icon: <MdBarChart size={20} />, path: '/financial-reports' },
                ];
                break;

            case 'new_user':
                links = [
                    mySpaceLink,
                    { name: 'Complete Profile', icon: <MdPerson size={20} />, path: '/complete-profile' },
                    { name: 'Upload Documents', icon: <MdFileUpload size={20} />, path: '/upload-documents' },
                    { name: 'View Policies', icon: <MdPolicy size={20} />, path: '/policies' },
                    { name: 'Help / Support', icon: <MdHelp size={20} />, path: '/support' },
                ];
                break;

            default:
                links = [mySpaceLink];
        }

        return (
            <div className="d-flex flex-column gap-1 pt-2">
                {links.map((link) => {
                    if (link.children) {
                        const isOpen = openDropdowns[link.name];
                        return (
                            <div key={link.name}>
                                <div
                                    className={`sidebar-link d-flex justify-content-between align-items-center ${isOpen ? 'active-dropdown' : ''}`}
                                    onClick={() => toggleDropdown(link.name)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <span className="sidebar-icon">{link.icon}</span>
                                        <span>{link.name}</span>
                                    </div>
                                    {isOpen ? <MdExpandLess /> : <MdExpandMore />}
                                </div>
                                {isOpen && (
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
                                                <span>{child.name}</span>
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
                            <span>{link.name}</span>
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
            <div className="sidebar-header d-flex align-items-center mb-4 ps-2">
                <div className="bg-white p-1 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', marginRight: '12px' }}>
                    <img src={logo} alt="HRMS Logo" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }} />
                </div>
                <div>
                    <h5 className="mb-0 fw-bold sidebar-text-logo lh-1" style={{ fontSize: '16px' }}>Future Invo HRMS</h5>
                </div>
            </div>

            {/* Role Info */}
            <div className="sidebar-role-label">
                Role : <span className="fw-bold text-main">{displayRole}</span>
            </div>

            {/* Links */}
            <div className="flex-grow-1 overflow-auto">
                {renderLinks()}
            </div>

            {/* Logout Section */}
            <div className="p-3 border-top border-secondary border-opacity-25">
                <button
                    onClick={handleLogout}
                    className="sidebar-link w-100 border-0 text-start d-flex align-items-center mb-0"
                    style={{ cursor: 'pointer', color: '#ef4444 !important' }} // Red tint for logout often implies action
                >
                    <span className="sidebar-icon"><MdLogout size={20} /></span>
                    <span>Logout</span>
                </button>

                <div className="text-center text-white small opacity-50 mt-2">
                    © 2026 Future Invo
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

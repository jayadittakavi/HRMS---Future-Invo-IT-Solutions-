import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/fislogo1.png';
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
    MdReceiptLong // Payslips
} from 'react-icons/md';

const Sidebar = ({ isOpen, toggleSidebar, onNavigate }) => {
    const { user, logout } = useAuth(); // Assuming logout function exists in context
    const navigate = useNavigate();
    const role = user?.role?.toLowerCase() || 'new_user'; // Default to new_user if undefined

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

        switch (role) {
            case 'admin':
            case 'superadmin': // Treating superadmin as admin for this list unless specified
                links = [
                    { name: 'Dashboard', icon: <MdDashboard size={20} />, path: '/dashboard' },
                    { name: 'Companies', icon: <MdBusiness size={20} />, path: '/companies' },
                    { name: 'Branches', icon: <MdBusiness size={20} />, path: '/branches' },
                    { name: 'Employee Management', icon: <MdPeople size={20} />, path: '/employees' },
                    { name: 'Departments', icon: <MdBusiness size={20} />, path: '/departments' },
                    { name: 'Designations', icon: <MdBadge size={20} />, path: '/designations' },
                    { name: 'Attendance Management', icon: <MdFactCheck size={20} />, path: '/attendance-management' },
                    { name: 'Leave Management', icon: <MdEventBusy size={20} />, path: '/leave-management' },
                    { name: 'Payroll Management', icon: <MdAttachMoney size={20} />, path: '/payroll-management' },
                    { name: 'Performance Management', icon: <MdRateReview size={20} />, path: '/performance-management' },
                    { name: 'Reports', icon: <MdBarChart size={20} />, path: '/reports' },
                ];
                break;

            case 'hr':
                links = [
                    { name: 'Dashboard', icon: <MdDashboard size={20} />, path: '/dashboard' },
                    { name: 'Employee Directory', icon: <MdPeople size={20} />, path: '/employee-directory' },
                    { name: 'Attendance', icon: <MdFactCheck size={20} />, path: '/attendance' },
                    { name: 'Leave Requests', icon: <MdEventBusy size={20} />, path: '/leave-requests' },
                    { name: 'Recruitment', icon: <MdWork size={20} />, path: '/recruitment' },
                    { name: 'Onboarding', icon: <MdAssignmentInd size={20} />, path: '/onboarding' },
                    { name: 'Training', icon: <MdSchool size={20} />, path: '/training' },
                    { name: 'Performance Reviews', icon: <MdRateReview size={20} />, path: '/performance-reviews' },
                    { name: 'Documents', icon: <MdDescription size={20} />, path: '/documents' },
                    { name: 'HR Reports', icon: <MdBarChart size={20} />, path: '/hr-reports' },
                ];
                break;

            case 'manager':
                links = [
                    { name: 'Dashboard', icon: <MdDashboard size={20} />, path: '/dashboard' },
                    { name: 'Team Members', icon: <MdGroups size={20} />, path: '/team-members' },
                    { name: 'Team Attendance', icon: <MdFactCheck size={20} />, path: '/team-attendance' },
                    { name: 'Leave Approvals', icon: <MdEventBusy size={20} />, path: '/leave-approvals' },
                    { name: 'Performance Feedback', icon: <MdRateReview size={20} />, path: '/performance-feedback' },
                    { name: 'Goals & Targets', icon: <MdTrackChanges size={20} />, path: '/goals' },
                    { name: 'Team Reports', icon: <MdBarChart size={20} />, path: '/team-reports' },
                ];
                break;

            case 'employee':
                links = [
                    { name: 'Dashboard', icon: <MdDashboard size={20} />, path: '/dashboard' },
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
                    { name: 'Dashboard', icon: <MdDashboard size={20} />, path: '/dashboard' },
                    { name: 'Payroll Processing', icon: <MdAttachMoney size={20} />, path: '/payroll-processing' },
                    { name: 'Salary Structure', icon: <MdAccountBalanceWallet size={20} />, path: '/salary-structure' },
                    { name: 'Payslips', icon: <MdReceiptLong size={20} />, path: '/payslips' },
                    { name: 'Tax & Deductions', icon: <MdCalculate size={20} />, path: '/tax-deductions' },
                    { name: 'Financial Reports', icon: <MdBarChart size={20} />, path: '/financial-reports' },
                ];
                break;

            case 'new_user':
                links = [
                    { name: 'Welcome Page', icon: <MdDashboard size={20} />, path: '/welcome' },
                    { name: 'Complete Profile', icon: <MdPerson size={20} />, path: '/complete-profile' },
                    { name: 'Upload Documents', icon: <MdFileUpload size={20} />, path: '/upload-documents' },
                    { name: 'View Policies', icon: <MdPolicy size={20} />, path: '/policies' },
                    { name: 'Help / Support', icon: <MdHelp size={20} />, path: '/support' },
                ];
                break;

            default:
                links = [{ name: 'Dashboard', icon: <MdDashboard size={20} />, path: '/dashboard' }];
        }

        return (
            <div className="d-flex flex-column gap-1 pt-2">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
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
                ))}
            </div>
        );
    };

    return (
        <div
            className={`sidebar-container h-100 d-flex flex-column transition-width ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}
            style={{ width: isOpen ? '260px' : '0', overflow: 'hidden', transition: 'width 0.3s ease' }}
        >
            {/* Logo Area */}
            <div className="sidebar-header d-flex align-items-center mb-4 ps-2">
                <div className="bg-white p-1 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', marginRight: '12px' }}>
                    <img src={logo} alt="HRMS Logo" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }} />
                </div>
                <div>
                    <h5 className="mb-0 fw-bold text-white lh-1" style={{ fontSize: '16px' }}>Future Invo HRMS</h5>
                </div>
            </div>

            {/* Role Info */}
            <div className="sidebar-role-label text-white">
                Role : <span className="text-white fw-bold">{displayRole}</span>
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

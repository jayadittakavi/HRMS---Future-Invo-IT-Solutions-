import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/fislogo1.png';
import './Sidebar.css';
import {
    MdDashboard,
    MdBusiness,
    MdAccountBalance,
    MdPeople,
    MdComputer,
    MdCategory,
    MdAttachMoney,
    MdCalendarToday,
    MdEventBusy,
    MdManageAccounts,
    MdBarChart,
    MdReceiptLong,
    MdWork,
    MdAssignmentInd,
    MdFactCheck,
    MdDescription,
    MdGroups,
    MdFolder,
    MdRateReview,
    MdPerson,
    MdAccessTime
} from 'react-icons/md';

const Sidebar = ({ isOpen, toggleSidebar, onNavigate }) => {
    const { user } = useAuth();
    const role = user?.role || 'employee';

    // Helper to capitalize role for display
    const displayRole = role.split(/(?=[A-Z])/).join(" ").replace(/\b\w/g, l => l.toUpperCase());

    const renderLinks = () => {
        const links = [];

        // Common link
        links.push({ name: 'Dashboard', icon: <MdDashboard size={20} />, path: '/dashboard' });

        if (role === 'admin' || role === 'superadmin') {
            links.push(
                { name: 'Companies', icon: <MdBusiness size={20} />, path: '/companies' },
                { name: 'Branches', icon: <MdAccountBalance size={20} />, path: '/branches' },
                { name: 'Departments', icon: <MdGroups size={20} />, path: '/departments' },
                { name: 'Assets', icon: <MdComputer size={20} />, path: '/assets' },
                { name: 'Asset Categories', icon: <MdCategory size={20} />, path: '/asset-categories' },
                { name: 'Pay Grade', icon: <MdAttachMoney size={20} />, path: '/pay-grade' },
                { name: 'Financial Year', icon: <MdCalendarToday size={20} />, path: '/financial-year' },
                { name: 'Leave Management', icon: <MdEventBusy size={20} />, path: '/leave-management' },
                { name: 'Employees', icon: <MdPeople size={20} />, path: '/employees' },
                { name: 'User Management', icon: <MdManageAccounts size={20} />, path: '/users' }
            );
        } else if (role === 'hr') {
            links.push(
                { name: 'All Employees', icon: <MdPeople size={20} />, path: '/employees' },
                { name: 'Recruitment', icon: <MdWork size={20} />, path: '/recruitment' },
                { name: 'Onboarding', icon: <MdAssignmentInd size={20} />, path: '/onboarding' },
                { name: 'Attendance', icon: <MdFactCheck size={20} />, path: '/attendance' }
            );
        } else if (role === 'manager') {
            links.push(
                { name: 'My Team', icon: <MdGroups size={20} />, path: '/my-team' },
                { name: 'Projects', icon: <MdFolder size={20} />, path: '/projects' },
                { name: 'Leave Requests', icon: <MdDescription size={20} />, path: '/leave-requests' },
                { name: 'Performance', icon: <MdRateReview size={20} />, path: '/performance' }
            );
        } else if (role === 'accountant') {
            links.push(
                { name: 'Payroll', icon: <MdAttachMoney size={20} />, path: '/payroll' },
                { name: 'Invoices', icon: <MdDescription size={20} />, path: '/invoices' },
                { name: 'Expenses', icon: <MdReceiptLong size={20} />, path: '/expenses' },
                { name: 'Reports', icon: <MdBarChart size={20} />, path: '/reports' }
            );
        } else {
            // Employee defaults
            links.push(
                { name: 'My Profile', icon: <MdPerson size={20} />, path: '/profile' },
                { name: 'Attendance', icon: <MdAccessTime size={20} />, path: '/my-attendance' },
                { name: 'Leave Requests', icon: <MdEventBusy size={20} />, path: '/my-leaves' },
                { name: 'Payslips', icon: <MdReceiptLong size={20} />, path: '/my-payslips' }
            );
        }

        return (
            <div className="d-flex flex-column gap-1 pt-2">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={(e) => {
                            if (window.innerWidth < 768) {
                                toggleSidebar();
                            }
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
                <div className="bg-white p-1 rounded d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', marginRight: '12px' }}>
                    <img src={logo} alt="HRMS Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
                <div>
                    <h5 className="mb-0 fw-bold text-dark lh-1" style={{ fontSize: '16px' }}>Future Invo HRMS</h5>
                </div>
            </div>

            {/* Role Info */}
            <div className="sidebar-role-label text-dark">
                Role : <span className="text-dark fw-bold">{displayRole === 'Superadmin' ? 'Super Admin' : displayRole}</span>
            </div>



            {/* Links */}
            <div className="flex-grow-1 overflow-auto">
                {renderLinks()}
            </div>

            <div className="p-3 text-center text-white small opacity-75">
                © 2026 Future Invo
            </div>
        </div>
    );
};

export default Sidebar;

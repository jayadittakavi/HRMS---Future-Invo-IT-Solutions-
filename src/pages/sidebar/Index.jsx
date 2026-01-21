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

        // 1. All users get Dashboard
        links.push({ name: 'Dashboard', icon: <MdDashboard size={20} />, path: '/dashboard' });

        const isSuperAdmin = role === 'superadmin';
        const isAdmin = role === 'admin';
        const isHR = role === 'hr';
        const isManager = role === 'manager';
        const isAccountant = role === 'accountant';
        const isEmployee = role === 'employee';

        // 2. Super Admin Exclusive
        if (isSuperAdmin) {
            links.push(
                { name: 'Companies', icon: <MdBusiness size={20} />, path: '/companies' },
                { name: 'Branches', icon: <MdAccountBalance size={20} />, path: '/branches' },
                { name: 'Departments', icon: <MdGroups size={20} />, path: '/departments' },
                { name: 'User Management', icon: <MdManageAccounts size={20} />, path: '/users' }
            );
        }

        // 3. Super Admin & Admin Shared (Admin cannot manage Companies/Users)
        if (isSuperAdmin || isAdmin) {
            links.push(
                { name: 'Assets', icon: <MdComputer size={20} />, path: '/assets' },
                { name: 'Asset Categories', icon: <MdCategory size={20} />, path: '/asset-categories' },
                { name: 'Pay Grade', icon: <MdAttachMoney size={20} />, path: '/pay-grade' },
                { name: 'Financial Year', icon: <MdCalendarToday size={20} />, path: '/financial-year' }
            );
        }

        // 4. Employee Management (Super Admin, Admin, HR)
        if (isSuperAdmin || isAdmin || isHR) {
            links.push(
                { name: 'Employees', icon: <MdPeople size={20} />, path: '/employees' },
                { name: 'Leave Management', icon: <MdEventBusy size={20} />, path: '/leave-management' }
                // Note: Attendance for HR is added below specifically
            );
        }

        // 5. HR Specific
        if (isHR) {
            links.push(
                { name: 'Recruitment', icon: <MdWork size={20} />, path: '/recruitment' },
                { name: 'Onboarding', icon: <MdAssignmentInd size={20} />, path: '/onboarding' },
                { name: 'Attendance', icon: <MdFactCheck size={20} />, path: '/attendance' }
            );
        }

        // 6. Manager Specific
        if (isManager) {
            links.push(
                { name: 'My Team', icon: <MdGroups size={20} />, path: '/my-team' },
                { name: 'Projects', icon: <MdFolder size={20} />, path: '/projects' },
                { name: 'Leave Requests', icon: <MdDescription size={20} />, path: '/leave-requests' },
                { name: 'Performance', icon: <MdRateReview size={20} />, path: '/performance' }
            );
        }

        // 7. Accountant Specific
        if (isAccountant) {
            links.push(
                { name: 'Payroll', icon: <MdAttachMoney size={20} />, path: '/payroll' },
                { name: 'Invoices', icon: <MdDescription size={20} />, path: '/invoices' },
                { name: 'Expenses', icon: <MdReceiptLong size={20} />, path: '/expenses' },
                { name: 'Reports', icon: <MdBarChart size={20} />, path: '/reports' }
            );
        }

        // 8. Employee Self-Service (Everyone essentially, or specifically Employee role)
        // Usually, even admins need to see their own profile/payslips. 
        // But to keep menu clean for high-level users, we might hide some.
        // However, "My Profile" is requested for everyone.

        links.push({ name: 'My Profile', icon: <MdPerson size={20} />, path: '/profile' });

        // Specific 'My' items usually for regular employees or everyone
        if (!isSuperAdmin && !isAdmin) { // Maybe Super Admin doesn't need to apply for leave?
            links.push(
                { name: 'My Attendance', icon: <MdAccessTime size={20} />, path: '/my-attendance' },
                { name: 'My Leaves', icon: <MdEventBusy size={20} />, path: '/my-leaves' },
                { name: 'My Payslips', icon: <MdReceiptLong size={20} />, path: '/my-payslips' }
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
            <div className="sidebar-header d-flex align-items-center">
                <div className="bg-white p-1 rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', marginRight: '12px' }}>
                    <img src={logo} alt="HRMS Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
                <div>
                    <h5 className="mb-0 fw-bold text-dark lh-1">HRMS</h5>
                    <small className="text-secondary" style={{ fontSize: '0.65rem' }}>Future Invo IT Solutions</small>
                </div>
            </div>

            {/* Role Info */}
            <div className="sidebar-role-label text-secondary">
                Role : <span className="fw-bold text-dark">{displayRole === 'Superadmin' ? 'Super Admin' : displayRole}</span>
            </div>

            {/* Navigation Label */}
            <div className="sidebar-nav-label text-secondary">
                Navigation
            </div>

            {/* Links */}
            <div className="flex-grow-1 overflow-auto">
                {renderLinks()}
            </div>

            <div className="p-3 text-center text-secondary small opacity-75">
                © 2026 Future Invo
            </div>
        </div>
    );
};

export default Sidebar;

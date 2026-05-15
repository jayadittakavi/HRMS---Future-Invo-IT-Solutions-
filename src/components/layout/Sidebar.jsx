import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePermissions } from '../../context/PermissionsContext';
import logo from '../../assets/images/logo.jpg';
import './Sidebar.css';
import {
    MdDashboard,
    MdPeople,
    MdBusiness,
    MdFactCheck,
    MdEventBusy,
    MdAttachMoney,
    MdBarChart,
    MdGroups,
    MdDescription,
    MdFlight,
    MdLaptopMac,
    MdGridView,
    MdExpandLess,
    MdExpandMore,
    MdChevronLeft,
    MdChevronRight,
    MdHomeWork,
    MdPersonOutline,
    MdAdminPanelSettings,
    MdSecurity,
    MdSettings,
    MdCalendarMonth,
    MdTask,
    MdSupportAgent,
    MdSchool,
    MdTrendingUp,
} from 'react-icons/md';

/* ══════════════════════════════════════════════════════════════
   CONFIG-DRIVEN SIDEBAR MENU
   
   Structure:
   {
     id:       unique key
     label:    display text
     icon:     React icon element
     path:     route (if no children)
     roles:    ['superadmin','admin','hr','manager','employee'] — who can see it
     children: [ { id, label, path, roles } ]   — dropdown items
   }

   Role logic:
   - If roles is undefined → visible to ALL authenticated users
   - If roles is defined   → only those roles can see it
   - superadmin always sees everything (handled in filter)
══════════════════════════════════════════════════════════════ */

const ALL_ROLES = ['superadmin', 'admin', 'hr', 'manager', 'employee'];
const MGMT_ROLES = ['superadmin', 'admin', 'hr', 'manager'];

const getSidebarConfig = (role) => {
    // Determine dashboard path for the current role
    const dashboardPaths = {
        superadmin: '/superadmin-dashboard',
        admin: '/admin-dashboard',
        hr: '/hr-dashboard',
        manager: '/manager-dashboard',
        employee: '/employee-dashboard',
    };
    const myDashboardPath = dashboardPaths[role] || '/dashboard';

    return [
        // ─── Dashboard ─────────────────────────────────────────
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: <MdDashboard size={20} />,
            roles: ALL_ROLES,
            children: [
                { id: 'my-dashboard', label: 'My Dashboard', path: myDashboardPath, roles: ALL_ROLES },
                { id: 'my-team', label: 'My Team', path: '/dashboard/my-team', roles: MGMT_ROLES },
            ],
        },

        // ─── Organization ───────────────────────────────────────
        { id: 'companies', label: 'Companies', icon: <MdBusiness size={20} />, path: '/companies', roles: ['superadmin'] },
        { id: 'departments', label: 'Departments', icon: <MdGroups size={20} />, path: '/departments', roles: ['superadmin', 'admin', 'hr', 'manager'] },
        { id: 'employees', label: 'Employees', icon: <MdPeople size={20} />, path: '/employee-directory', roles: ['superadmin', 'admin', 'hr'] },

        // ─── Attendance ─────────────────────────────────────────
        {
            id: 'attendance',
            label: 'Attendance',
            icon: <MdFactCheck size={20} />,
            roles: ALL_ROLES,
            children: [
                { id: 'my-attendance', label: 'My Attendance', path: '/my-attendance', roles: ALL_ROLES },
                { id: 'attendance-mgmt', label: 'Attendance', path: '/attendance', roles: MGMT_ROLES },
            ],
        },

        // ─── Leave Management ───────────────────────────────────
        {
            id: 'leave',
            label: 'Leave Management',
            icon: <MdEventBusy size={20} />,
            roles: ALL_ROLES,
            children: [
                { id: 'my-leaves', label: 'My Leave', path: '/my-leaves', roles: ALL_ROLES },
                { id: 'leave-requests', label: 'Requests', path: '/leave-management', roles: MGMT_ROLES },
                { id: 'wfh', label: 'Work From Home', path: '/wfh-requests', roles: ALL_ROLES },
            ],
        },

        // ─── Payroll ────────────────────────────────────────────
        {
            id: 'payroll',
            label: 'Payroll & Salary',
            icon: <MdAttachMoney size={20} />,
            roles: ALL_ROLES,
            children: [
                { id: 'my-payroll', label: 'My Payroll', path: '/my-payslips', roles: ALL_ROLES },
                { id: 'payroll-mgmt', label: 'Payroll', path: '/payroll-dashboard', roles: MGMT_ROLES },
            ],
        },

        // ─── Finance ────────────────────────────────────────────
        { id: 'loans', label: 'Loans & Advances', icon: <MdAttachMoney size={20} />, path: '/loans', roles: MGMT_ROLES },
        { id: 'travel', label: 'Travel & Expenses', icon: <MdFlight size={20} />, path: '/travel-expenses', roles: MGMT_ROLES },
        { id: 'reports', label: 'Financial Reports', icon: <MdBarChart size={20} />, path: '/financial-reports', roles: ['superadmin', 'admin'] },

        // ─── HR ─────────────────────────────────────────────────
        {
            id: 'hr-tools',
            label: 'HR Tools',
            icon: <MdAdminPanelSettings size={20} />,
            roles: ['superadmin', 'admin', 'hr'],
            children: [
                { id: 'recruitment', label: 'Recruitment', path: '/recruitment', roles: ['superadmin', 'admin', 'hr'] },
                { id: 'onboarding', label: 'Onboarding', path: '/onboarding', roles: ['superadmin', 'hr'] },
                { id: 'training', label: 'Training', path: '/training', roles: ['superadmin', 'admin', 'hr'] },
                { id: 'performance', label: 'Performance', path: '/performance-reviews', roles: ['superadmin', 'admin', 'hr'] },
            ],
        },

        // ─── Operations ─────────────────────────────────────────
        { id: 'documents', label: 'Documents', icon: <MdDescription size={20} />, path: '/documents', roles: ALL_ROLES },

        // ─── Administration ─────────────────────────────────────
        {
            id: 'administration',
            label: 'Administration',
            icon: <MdGridView size={20} />,
            roles: MGMT_ROLES,
            children: [
                { id: 'delegation', label: 'Delegation', path: '/delegation', roles: MGMT_ROLES },
                { id: 'visitor-approvals', label: 'Approvals', path: '/visitor-approvals', roles: MGMT_ROLES },
                { id: 'visitors', label: 'Visitor Mgmt', path: '/visitors', roles: ALL_ROLES },
                { id: 'desk', label: 'Desk Mgmt', path: '/desk-management', roles: ALL_ROLES },
                { id: 'automation', label: 'Automation', path: '/automation-center', roles: ['superadmin', 'admin'] },
                { id: 'audit-logs', label: 'Audit Logs', path: '/super-admin/audit-logs', roles: ['superadmin'] },
            ],
        },

        // ─── Support ────────────────────────────────────────────
        // Helpdesk removed per user request
    ];
};

/* ══════════════════════════════════════════════════════════════
   SIDEBAR COMPONENT
══════════════════════════════════════════════════════════════ */

const Sidebar = ({ isOpen, toggleSidebar, onNavigate, activePath }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (!user) return null;

    const role = user?.role?.toLowerCase().replace(/\s/g, '') || 'employee';
    const [openDropdowns, setOpenDropdowns] = useState({});

    // Auto-expand the dropdown that contains the current route
    useEffect(() => {
        const currentPath = location.pathname;
        const config = getSidebarConfig(role);
        config.forEach(item => {
            if (item.children) {
                const hasActiveChild = item.children.some(c => currentPath === c.path || currentPath.startsWith(c.path + '/'));
                if (hasActiveChild) {
                    setOpenDropdowns(prev => ({ ...prev, [item.id]: true }));
                }
            }
        });
    }, [location.pathname, role]);

    const toggleDropdown = (id) => {
        setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const displayRole = role === 'superadmin' ? 'Super Admin' :
        role.charAt(0).toUpperCase() + role.slice(1);

    const handleLogout = () => {
        if (logout) logout();
        navigate('/login');
    };

    const { currentUserPermissions } = usePermissions();

    // ── Filter items by role and permission ──
    const filterByRole = (items) => {
        return items.filter(item => {
            // Superadmin always sees everything
            if (role === 'superadmin') return true;
            
            // Check basic role restriction
            const roleAllowed = !item.roles || item.roles.includes(role);
            if (!roleAllowed) return false;

            // Check explicit permission if defined in context
            if (currentUserPermissions) {
                // Map sidebar IDs to permission keys
                const permissionMap = {
                    'dashboard': 'dashboard',
                    'my-dashboard': 'dashboard',
                    'my-team': 'dashboard',
                    'employees': 'hr',
                    'departments': 'hr',
                    'attendance': 'attendance',
                    'my-attendance': 'attendance',
                    'attendance-mgmt': 'attendance',
                    'leave': 'leave',
                    'my-leaves': 'leave',
                    'leave-requests': 'leave',
                    'payroll': 'payroll',
                    'my-payroll': 'payroll',
                    'payroll-mgmt': 'payroll',
                    'recruitment': 'hr', // Recruitment usually under HR
                    'onboarding': 'hr',
                    'documents': 'hr',
                    'reports': 'others',
                    'calendar': 'others',
                    'settings': 'others'
                };

                const permKey = permissionMap[item.id];
                if (permKey) {
                    const allowedModules = currentUserPermissions[permKey] || [];
                    // Check if specific module or the whole category is allowed
                    // Note: In PermissionsContext, we store internal module IDs like 'my_dashboard'
                    // We need to normalize or check if any allowed module matches
                    const normalizedId = item.id.replace(/-/g, '_');
                    const isPermitted = allowedModules.includes(normalizedId) || 
                                       allowedModules.some(m => m.includes(normalizedId));
                    
                    // If it's a category (like 'dashboard' or 'hr-tools'), it's visible if it has children or is directly allowed
                    if (item.children) return true; // Let the children filter themselves

                    return isPermitted;
                }
            }

            return true;
        });
    };

    const menuConfig = filterByRole(getSidebarConfig(role));

    // ── Check if a path is currently active ──
    const isPathActive = (path) => {
        if (activePath !== undefined) return activePath === path;
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    // ── Handle link click ──
    const handleClick = (e, path) => {
        if (window.innerWidth < 768) toggleSidebar();
        if (onNavigate) {
            e.preventDefault();
            onNavigate(path);
        }
    };

    return (
        <div
            className={`sidebar-container h-100 d-flex flex-column transition-width ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}
            style={{ width: '100%', overflow: 'hidden' }}
        >
            {/* Logo and Role */}
            <div className={`sidebar-header d-flex align-items-center mb-4 ps-2 ${!isOpen ? 'justify-content-center ps-0' : ''}`}>
                <div className="bg-white p-0 rounded-circle d-flex align-items-center justify-content-center overflow-hidden" style={{ width: '40px', height: '40px', marginRight: isOpen ? '12px' : '0', minWidth: '40px' }}>
                    <img src={logo} alt="HRMS Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {isOpen && (
                    <div className="d-flex flex-column">
                        <h5 className="mb-0 fw-bold sidebar-text-logo lh-1" style={{ fontSize: '18px' }}>WS HRMS</h5>
                        <span className="text-white opacity-75 mt-1" style={{ fontSize: '12px', fontWeight: '500' }}>Role : {displayRole}</span>
                    </div>
                )}
            </div>

            {/* Section label */}
            {isOpen && (
                <div className="sidebar-nav-label mt-1">
                    {role === 'superadmin' ? 'Super Admin Controls' :
                     role === 'admin' ? 'Admin Controls' :
                     role === 'hr' ? 'HR Controls' :
                     role === 'manager' ? 'Manager Controls' :
                     'My Dashboard'}
                </div>
            )}

            {/* Menu Items */}
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column gap-1 pt-1">
                    {menuConfig.map((item) => {
                        // ── Dropdown item ──
                        if (item.children) {
                            const visibleChildren = filterByRole(item.children);
                            if (visibleChildren.length === 0) return null;

                            const isDropdownOpen = openDropdowns[item.id];
                            const hasActiveChild = visibleChildren.some(c => isPathActive(c.path));

                            return (
                                <div key={item.id}>
                                    <div
                                        className={`sidebar-link d-flex ${isOpen ? 'justify-content-between' : 'justify-content-center'} align-items-center ${isDropdownOpen ? 'active-dropdown' : ''} ${hasActiveChild ? 'has-active-child' : ''}`}
                                        onClick={() => toggleDropdown(item.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className={`d-flex align-items-center ${isOpen ? 'gap-3' : ''}`}>
                                            <span className="sidebar-icon">{item.icon}</span>
                                            {isOpen && <span>{item.label}</span>}
                                        </div>
                                        {isOpen && (
                                            <span className="sidebar-dropdown-arrow">
                                                {isDropdownOpen ? <MdExpandLess /> : <MdExpandMore />}
                                            </span>
                                        )}
                                    </div>

                                    {/* Dropdown children with smooth animation */}
                                    <div className={`sidebar-dropdown-content ${isDropdownOpen && isOpen ? 'open' : ''}`}>
                                        {visibleChildren.map(child => (
                                            <NavLink
                                                key={child.id}
                                                to={child.path}
                                                className={() => `sidebar-child-link ${isPathActive(child.path) ? 'active' : ''}`}
                                                onClick={(e) => handleClick(e, child.path)}
                                            >
                                                <span className="sidebar-child-dot"></span>
                                                {isOpen ? <span>{child.label}</span> : <span className="small text-center w-100">{child.label.charAt(0)}</span>}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        // ── Simple link ──
                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className={() => `sidebar-link ${isPathActive(item.path) ? 'active' : ''}`}
                                onClick={(e) => handleClick(e, item.path)}
                            >
                                <span className="sidebar-icon">{item.icon}</span>
                                {isOpen && <span>{item.label}</span>}
                            </NavLink>
                        );
                    })}
                </div>
            </div>

            {/* Bottom collapse & copyright */}
            <div className="mt-auto d-flex align-items-center justify-content-between p-2 border-top border-secondary border-opacity-25" style={{ minHeight: '45px' }}>
                {isOpen ? (
                    <>
                        <div className="text-white opacity-50 ms-2" style={{ fontSize: '11px' }}>
                            © 2026 WorkSphrer
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="sidebar-collapse-btn d-none d-md-flex align-items-center justify-content-center border-0 text-white opacity-75 hover-opacity-100"
                            style={{ cursor: 'pointer', width: '28px', height: '28px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}
                        >
                            <MdChevronLeft size={20} />
                        </button>
                    </>
                ) : (
                    <button
                        onClick={toggleSidebar}
                        className="sidebar-collapse-btn d-none d-md-flex align-items-center justify-content-center border-0 text-white opacity-75 hover-opacity-100 mx-auto"
                        style={{ cursor: 'pointer', width: '28px', height: '28px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}
                    >
                        <MdChevronRight size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FiShield, FiUsers, FiEdit2, FiTrash2, FiSearch, FiPlus, FiCheck, FiX, 
    FiGrid, FiChevronRight, FiSearch as FiSearchIcon 
} from 'react-icons/fi';
import { MdOutlineSecurity, MdDashboard, MdFactCheck, MdEventBusy, MdAttachMoney, MdAdminPanelSettings, MdSettings } from 'react-icons/md';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { usePermissions } from '../../../../context/PermissionsContext';
import './RolesList.css';

const PermissionManagement = ({ role, onClose, onSave }) => {
    const [permissions, setPermissions] = useState(role.permissions || {});
    const [searchTerm, setSearchTerm] = useState('');

    const permissionCategories = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: <MdDashboard />,
            modules: [
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'my_dashboard', label: 'My Dashboard' }
            ]
        },
        {
            id: 'attendance',
            label: 'Attendance',
            icon: <MdFactCheck />,
            modules: [
                { id: 'attendance', label: 'Attendance' },
                { id: 'my_attendance', label: 'My Attendance' }
            ]
        },
        {
            id: 'leave',
            label: 'Leave',
            icon: <MdEventBusy />,
            modules: [
                { id: 'leave_management', label: 'Leave Management' },
                { id: 'my_leave', label: 'My Leave' }
            ]
        },
        {
            id: 'payroll',
            label: 'Payroll',
            icon: <MdAttachMoney />,
            modules: [
                { id: 'payroll_management', label: 'Payroll' },
                { id: 'my_payroll', label: 'My Payroll' }
            ]
        },
        {
            id: 'hr',
            label: 'HR',
            icon: <MdAdminPanelSettings />,
            modules: [
                { id: 'employees', label: 'Employees' },
                { id: 'departments', label: 'Departments' },
                { id: 'onboarding', label: 'Onboarding' },
                { id: 'documents', label: 'Documents' }
            ]
        },
        {
            id: 'others',
            label: 'Others',
            icon: <MdSettings />,
            modules: [
                { id: 'reports', label: 'Reports' },
                { id: 'calendar', label: 'Calendar' },
                { id: 'settings', label: 'Settings' }
            ]
        }
    ];

    const togglePermission = (category, moduleId) => {
        setPermissions(prev => {
            const current = prev[category] || [];
            const updated = current.includes(moduleId) 
                ? current.filter(id => id !== moduleId) 
                : [...current, moduleId];
            return { ...prev, [category]: updated };
        });
    };

    const handleSave = () => {
        onSave(role.id, permissions);
        onClose();
    };

    return (
        <div className="permission-drawer-overlay animate__animated animate__fadeIn" onClick={onClose}>
            <div className="permission-drawer animate__animated animate__slideInRight" onClick={e => e.stopPropagation()}>
                <div className="drawer-header">
                    <div className="d-flex align-items-center gap-3">
                        <div className="role-icon-circle" style={{ backgroundColor: role.dotColor }}>
                            <FiShield size={20} color="white" />
                        </div>
                        <div>
                            <h4 className="mb-0 fw-bold">Edit Permissions</h4>
                            <p className="text-muted small mb-0">{role.name} Role</p>
                        </div>
                    </div>
                    <button className="btn-close-custom" onClick={onClose}><FiX size={24} /></button>
                </div>

                <div className="drawer-body">
                    <div className="search-box mb-4">
                        <FiSearchIcon className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Search modules..." 
                            className="form-control shadow-none"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="permission-grid">
                        {permissionCategories.map(cat => (
                            <div key={cat.id} className="permission-category">
                                <div className="category-header d-flex align-items-center gap-2 mb-3">
                                    <span className="category-icon">{cat.icon}</span>
                                    <h6 className="mb-0 fw-bold">{cat.label}</h6>
                                </div>
                                <div className="category-modules d-flex flex-wrap gap-2">
                                    {cat.modules.filter(m => m.label.toLowerCase().includes(searchTerm.toLowerCase())).map(m => {
                                        const isActive = (permissions[cat.id] || []).includes(m.id);
                                        return (
                                            <div 
                                                key={m.id} 
                                                className={`permission-chip ${isActive ? 'active' : ''}`}
                                                onClick={() => togglePermission(cat.id, m.id)}
                                            >
                                                {isActive && <FiCheck className="me-1" />}
                                                {m.label}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="drawer-footer">
                    <button className="btn btn-light rounded-pill px-4" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary rounded-pill px-4" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

const RolesList = () => {
    const navigate = useNavigate();
    const { roles, updateRolePermissions } = usePermissions();
    const [editingRole, setEditingRole] = useState(null);

    const stats = [
        { icon: <MdOutlineSecurity size={18} />, label: `${roles.length} Roles Defined`, color: '#6366f1' },
        { icon: <FiUsers size={18} />, label: `${roles.reduce((acc, r) => acc + (r.usersCount || 0), 0)} Users Assigned`, color: '#3b82f6' },
        { icon: <FiGrid size={18} />, label: "12 Modules Protected", color: '#10b981' }
    ];

    return (
        <DashboardLayout title="">
            <div className="roles-management-container">
                {/* Page Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                    <div className="d-flex align-items-center gap-3">
                        <div className="header-icon-gradient">
                            <FiShield size={24} />
                        </div>
                        <div>
                            <h2 className="mb-1 fw-bold text-dark">Roles & Permissions</h2>
                            <p className="text-muted mb-0">Control who can access what with role-based access control</p>
                        </div>
                    </div>
                    
                    <div className="search-and-create d-flex gap-3">
                        <div className="modern-search">
                            <FiSearch />
                            <input type="text" placeholder="Search roles..." className="form-control" />
                        </div>
                        <button className="btn-create-role">
                            <FiPlus className="me-2" /> Create Role
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="row g-4 mb-5">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="col-md-4">
                            <div className="stat-card-glass">
                                <div className="stat-icon-wrapper" style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
                                    {stat.icon}
                                </div>
                                <div className="stat-info">
                                    <h5 className="mb-0 fw-bold">{stat.label}</h5>
                                    <p className="text-muted small mb-0">Security coverage enabled</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Roles List Table */}
                <div className="card-table-wrapper">
                    <div className="table-responsive">
                        <table className="table table-modern align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>Role Name</th>
                                    <th>Description</th>
                                    <th className="text-center">Users</th>
                                    <th className="text-center">Modules</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role) => (
                                    <tr key={role.id} className="role-row-animate">
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="role-dot" style={{ backgroundColor: role.dotColor }}></div>
                                                <div>
                                                    <div className="fw-bold text-dark">{role.name}</div>
                                                    <div className="text-muted small">System Level Access</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-secondary small mb-0 max-width-description">
                                                {role.description}
                                            </p>
                                        </td>
                                        <td className="text-center">
                                            <div className="badge-pill-users">
                                                <FiUsers size={12} className="me-1" /> {role.usersCount}
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="badge-pill-modules">
                                                {role.modulesCount} / 12
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <button className="btn-action-edit" onClick={() => setEditingRole(role)}>
                                                    <FiEdit2 size={14} className="me-1" /> Edit
                                                </button>
                                                {role.id !== 'superadmin' && (
                                                    <button className="btn-action-delete">
                                                        <FiTrash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="row g-4 mt-5">
                    {roles.slice(0, 4).map((role, idx) => (
                        <div key={idx} className="col-md-3">
                            <div className="role-preview-card" style={{ borderLeft: `4px solid ${role.dotColor}` }}>
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <div className="role-icon-sm" style={{ backgroundColor: `${role.dotColor}20`, color: role.dotColor }}>
                                        <FiShield size={16} />
                                    </div>
                                    <span className="text-muted tiny-text">ACTIVE</span>
                                </div>
                                <h6 className="fw-bold mb-1">{role.name}</h6>
                                <p className="text-muted extra-small mb-0 text-truncate">{role.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Permission Management Drawer */}
            {editingRole && (
                <PermissionManagement 
                    role={editingRole} 
                    onClose={() => setEditingRole(null)} 
                    onSave={updateRolePermissions}
                />
            )}
        </DashboardLayout>
    );
};

export default RolesList;

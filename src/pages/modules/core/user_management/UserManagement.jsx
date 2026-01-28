import React, { useState } from 'react';
import { FaEdit, FaTrash, FaUserShield, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";

export const UserManagementContent = () => {
    // Tab State
    const [activeTab, setActiveTab] = useState('users');

    // --- USER MANAGEMENT STATE ---
    const [users] = useState([
        { id: 1, name: 'Meera Krishnan', email: 'meera@example.com', role: 'Super Admin', status: 'Active', lastLogin: 'Today, 10:00 AM' },
        { id: 2, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: 'Yesterday, 05:30 PM' },
        { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'Employee', status: 'Inactive', lastLogin: '2 weeks ago' },
        { id: 4, name: 'Alice Johnson', email: 'alice@example.com', role: 'HR', status: 'Active', lastLogin: '1 hour ago' },
        { id: 5, name: 'Bob Williams', email: 'bob@example.com', role: 'Accountant', status: 'Active', lastLogin: '3 days ago' },
    ]);
    const [showUserAdd, setShowUserAdd] = useState(false);
    // const [showUserEdit, setShowUserEdit] = useState(false);
    // const [selectedUser, setSelectedUser] = useState(null);

    // --- ROLES & PERMISSIONS STATE ---
    const modules = ['Employees', 'Attendance', 'Leave', 'Payroll', 'Assets', 'Performance'];
    const actions = ['View', 'Add', 'Edit', 'Approve'];

    const [roles, setRoles] = useState([
        {
            id: 1,
            name: 'Super Admin',
            description: 'Full access to all modules',
            permissions: { all: true }
        },
        {
            id: 2,
            name: 'HR',
            description: 'Manage employees, attendance, and payroll',
            permissions: {
                Employees: ['View', 'Add', 'Edit'],
                Attendance: ['View', 'Edit', 'Approve'],
                Payroll: ['View', 'Add', 'Edit', 'Approve'],
                Leave: ['View', 'Approve']
            }
        },
        {
            id: 3,
            name: 'Manager',
            description: 'Team management and approvals',
            permissions: {
                Employees: ['View'],
                Attendance: ['View', 'Approve'],
                Leave: ['View', 'Approve'],
                Performance: ['View', 'Add', 'Edit']
            }
        },
        {
            id: 4,
            name: 'Accountant',
            description: 'Financial management access',
            permissions: {
                Payroll: ['View', 'Add', 'Edit', 'Approve'],
                Assets: ['View']
            }
        },
        {
            id: 5,
            name: 'Employee',
            description: 'Standard employee access',
            permissions: {
                Leave: ['Add'], // Apply leave
                Attendance: ['View', 'Add'] // Check-in
            }
        }
    ]);

    const [showRoleModal, setShowRoleModal] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);
    const [roleForm, setRoleForm] = useState({ name: '', description: '', permissions: {} });

    // --- HANDLERS ---

    // User Handlers
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowUserEdit(true);
    };

    // Role Handlers
    const handleAddRoleClick = () => {
        setCurrentRole(null);
        setRoleForm({ name: '', description: '', permissions: {} });
        setShowRoleModal(true);
    };

    const handleEditRoleClick = (role) => {
        setCurrentRole(role);
        // Deep copy permissions to avoid mutating state directly during edits
        setRoleForm({
            name: role.name,
            description: role.description,
            permissions: JSON.parse(JSON.stringify(role.permissions))
        });
        setShowRoleModal(true);
    };

    const togglePermission = (module, action) => {
        const currentPerms = roleForm.permissions[module] || [];
        let newPerms;

        if (currentPerms.includes(action)) {
            newPerms = currentPerms.filter(a => a !== action);
        } else {
            newPerms = [...currentPerms, action];
        }

        setRoleForm({
            ...roleForm,
            permissions: {
                ...roleForm.permissions,
                [module]: newPerms
            }
        });
    };

    const saveRole = () => {
        if (currentRole) {
            // Update
            setRoles(roles.map(r => r.id === currentRole.id ? { ...r, ...roleForm } : r));
        } else {
            // Add
            setRoles([...roles, { id: roles.length + 1, ...roleForm }]);
        }
        setShowRoleModal(false);
    };

    // Helper to check permission for UI checkbox
    const hasPermission = (module, action) => {
        // Super Admin has everything
        if (roleForm.name === 'Super Admin') return true;
        if (roleForm.permissions['all']) return true;

        return roleForm.permissions[module]?.includes(action);
    };

    return (
        <div className="d-flex flex-column h-100">
            {/* Header & Tabs */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Access Control & Users</h5>
                    <p className="text-secondary small mb-0">Manage users, roles, and granular permissions</p>
                </div>

                <div className="d-flex bg-white p-1 rounded-pill border shadow-sm">
                    <button
                        className={`btn btn-sm rounded-pill px-4 fw-bold transition-all ${activeTab === 'users' ? 'btn-primary' : 'btn-light text-secondary'}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Users
                    </button>
                    <button
                        className={`btn btn-sm rounded-pill px-4 fw-bold transition-all ${activeTab === 'roles' ? 'btn-primary' : 'btn-light text-secondary'}`}
                        onClick={() => setActiveTab('roles')}
                    >
                        Roles & Permissions
                    </button>
                </div>

                <button
                    className="btn btn-primary btn-sm px-3 rounded-pill d-flex align-items-center gap-2 shadow-sm"
                    onClick={() => activeTab === 'users' ? setShowUserAdd(true) : handleAddRoleClick()}
                >
                    <FaPlus size={12} /> {activeTab === 'users' ? 'Add User' : 'Create Role'}
                </button>
            </div>

            {/* TAB CONTENT: USERS */}
            {activeTab === 'users' && (
                <div className="table-card fade-in">
                    <div className="table-responsive">
                        <table className="table custom-table align-middle">
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="d-flex flex-column">
                                                <span className="fw-bold text-dark">{user.name}</span>
                                                <span className="small text-muted">Last login: {user.lastLogin}</span>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className="badge bg-light text-dark border fw-normal px-3 py-2 rounded-pill">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button className="action-btn edit" onClick={() => handleEditUser(user)}><FaEdit /></button>
                                                <button className="action-btn delete"><FaTrash /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: ROLES */}
            {activeTab === 'roles' && (
                <div className="flex-grow-1 fade-in">
                    <div className="row g-4">
                        {roles.map((role) => (
                            <div className="col-md-6 col-lg-4" key={role.id}>
                                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all relative overflow-hidden">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary">
                                                <FaUserShield size={24} />
                                            </div>
                                            <button
                                                className="btn btn-light btn-sm rounded-circle shadow-sm"
                                                onClick={() => handleEditRoleClick(role)}
                                                disabled={role.name === 'Super Admin'}
                                            >
                                                <FaEdit className="text-secondary" />
                                            </button>
                                        </div>

                                        <h5 className="fw-bold text-dark mb-2">{role.name}</h5>
                                        <p className="text-muted small mb-3">{role.description}</p>

                                        <div className="d-flex flex-wrap gap-2 mt-auto">
                                            {role.name === 'Super Admin' ? (
                                                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25">
                                                    Full System Access
                                                </span>
                                            ) : (
                                                <>
                                                    {Object.entries(role.permissions).slice(0, 3).map(([key, value]) => (
                                                        <span key={key} className="badge bg-light text-secondary border">
                                                            {key}
                                                        </span>
                                                    ))}
                                                    {Object.keys(role.permissions).length > 3 && (
                                                        <span className="badge bg-light text-secondary border">
                                                            +{Object.keys(role.permissions).length - 3} more
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* USER MODALS REMAIN THE SAME (SIMPLIFIED FOR BREVITY IN EDIT) */}
            {/* Add User Modal */}
            {showUserAdd && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add User</h5>
                                <button className="btn-close" onClick={() => setShowUserAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Full Name</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Email Address</label>
                                        <input type="email" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Assign Role</label>
                                        <select className="form-select">
                                            {roles.map((r) => (<option key={r.id}>{r.name}</option>))}
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowUserAdd(false)}>Cancel</button>
                                <button className="btn btn-primary btn-sm">Create User</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ROLE CONFIGURATION MODAL (THE KEY PART) */}
            {showRoleModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflowY: 'auto' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">
                                    {currentRole ? `Configure Permissions: ${currentRole.name}` : 'Create New Role'}
                                </h5>
                                <button className="btn-close" onClick={() => setShowRoleModal(false)}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Role Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={roleForm.name}
                                        onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
                                        disabled={currentRole?.name === 'Super Admin'}
                                        placeholder="e.g. Senior Manager"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={roleForm.description}
                                        onChange={(e) => setRoleForm({ ...roleForm, description: e.target.value })}
                                        placeholder="Brief description of responsibilities"
                                    />
                                </div>

                                <h6 className="fw-bold mb-3 text-primary border-bottom pb-2">Permission Matrix</h6>

                                {roleForm.name === 'Super Admin' ? (
                                    <div className="alert alert-info">
                                        Super Admin has full access to all system modules and actions by default. This cannot be modified.
                                    </div>
                                ) : (
                                    <div className="table-responsive bg-light rounded border p-2">
                                        <table className="table table-borderless table-sm align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="text-secondary ps-3">Module</th>
                                                    {actions.map(action => (
                                                        <th key={action} className="text-center text-secondary small text-uppercase">{action}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {modules.map(module => (
                                                    <tr key={module} className="border-bottom border-light">
                                                        <td className="fw-bold ps-3 py-3">{module}</td>
                                                        {actions.map(action => {
                                                            const isChecked = hasPermission(module, action);
                                                            return (
                                                                <td key={action} className="text-center">
                                                                    <div className="form-check d-flex justify-content-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            id={`${module}-${action}`}
                                                                            className="form-check-input"
                                                                            checked={isChecked}
                                                                            onChange={() => togglePermission(module, action)}
                                                                            style={{ cursor: 'pointer' }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm px-4" onClick={() => setShowRoleModal(false)}>Cancel</button>
                                <button className="btn btn-primary btn-sm px-4" onClick={saveRole}>Save Role Configuration</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const UserManagement = () => {
    return (
        <DashboardLayout title="">
            <UserManagementContent />
        </DashboardLayout>
    );
};

export default UserManagement;

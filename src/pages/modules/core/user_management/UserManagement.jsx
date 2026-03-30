import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaUserShield, FaCheck, FaTimes, FaPlus, FaUsers, FaUserTie, FaCalculator, FaUser, FaCrown, FaBriefcase, FaMoneyBillWave, FaSearch } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useSearch } from '../../../../context/SearchContext';
import "../../../../components/layout/DashboardLayout.css";
import { accessControlService } from './service';

export const UserManagementContent = () => {
    // Tab State
    const [activeTab, setActiveTab] = useState('users');
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);

    // Sync local search with global search
    useEffect(() => {
        setSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);

    // --- USER MANAGEMENT STATE ---
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [uData, rData] = await Promise.all([
                accessControlService.getUsers(),
                accessControlService.getRoles()
            ]);
            if (Array.isArray(uData)) setUsers(uData);
            if (Array.isArray(rData)) setRoles(rData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const [showUserAdd, setShowUserAdd] = useState(false);
    const [showUserEdit, setShowUserEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        employeeId: '',
        role: 'Employee',
        status: 'Active',
        permissions: []
    });

    const filteredUsers = users.filter(u =>
        (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- ROLES & PERMISSIONS STATE ---
    const modules = ['Employees', 'Attendance', 'Leave', 'Payroll', 'Assets', 'Performance'];
    const actions = ['View', 'Add', 'Edit', 'Delete', 'Status', 'Approve'];


    const [showRoleModal, setShowRoleModal] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);
    const [roleForm, setRoleForm] = useState({ name: '', description: '', permissions: {} });

    // --- HANDLERS ---

    // User Handlers
    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    const handleAddUserClick = () => {
        setUserForm({
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            employeeId: '',
            role: 'Employee',
            status: 'Active',
            permissions: []
        });
        setShowUserAdd(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setUserForm(user);
        setShowUserEdit(true);
    };

    const handleSaveUser = async () => {
        if (!userForm.name) return;
        try {
            const result = await accessControlService.saveUser(userForm);
            if (result) {
                setShowUserAdd(false);
                fetchData();
            }
        } catch (err) {
            alert("Error adding user: " + err.message);
        }
    };

    const handleUpdateUser = async () => {
        if (!selectedUser) return;
        try {
            const result = await accessControlService.saveUser({ ...userForm, id: selectedUser.id });
            if (result) {
                setShowUserEdit(false);
                fetchData();
            }
        } catch (err) {
            alert("Error updating user: " + err.message);
        }
    };

    const toggleUserStatus = async (id) => {
        try {
            const success = await accessControlService.toggleUserStatus(id);
            if (success) {
                setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
            }
        } catch (err) {
            console.error(err);
        }
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

    const saveRole = async () => {
        try {
            const payload = currentRole ? { ...roleForm, id: currentRole.id } : roleForm;
            const result = await accessControlService.saveRole(payload);
            if (result) {
                setShowRoleModal(false);
                fetchData();
            }
        } catch (err) {
            alert("Error saving role: " + err.message);
        }
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

                <div className="d-flex align-items-center gap-3">
                    <div className="position-relative d-none d-md-block">
                        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="form-control form-control-sm rounded-pill ps-5 bg-white shadow-sm border"
                            style={{ width: '250px' }}
                            value={searchTerm}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSearchTerm(val);
                                setGlobalSearchTerm(val);
                            }}
                        />
                    </div>
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
                    onClick={() => activeTab === 'users' ? handleAddUserClick() : handleAddRoleClick()}
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
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className={user.status === 'Inactive' ? 'opacity-50' : ''}>
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
                                                <button
                                                    className={`action-btn ${user.status === 'Active' ? 'text-danger' : 'text-success'}`}
                                                    onClick={() => toggleUserStatus(user.id)}
                                                    title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                >
                                                    {user.status === 'Active' ? <FaTimes /> : <FaCheck />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: ROLES (Already in place) */}
            {activeTab === 'roles' && (
                <div className="flex-grow-1 fade-in">
                    <div className="row g-4">
                        {roles.map((role) => (
                            <div className="col-md-6 col-lg-4" key={role.id}>
                                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all relative overflow-hidden">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            {(() => {
                                                let icon, colorClass, bgClass;
                                                switch (role.name) {
                                                    case 'Super Admin':
                                                        icon = <FaCrown size={24} />;
                                                        colorClass = 'text-warning';
                                                        bgClass = 'bg-warning';
                                                        break;
                                                    case 'HR':
                                                        icon = <FaUsers size={24} />;
                                                        colorClass = 'text-success';
                                                        bgClass = 'bg-success';
                                                        break;
                                                    case 'Manager':
                                                        icon = <FaUserTie size={24} />;
                                                        colorClass = 'text-info';
                                                        bgClass = 'bg-info';
                                                        break;
                                                    case 'Accountant':
                                                        icon = <FaCalculator size={24} />;
                                                        colorClass = 'text-danger';
                                                        bgClass = 'bg-danger';
                                                        break;
                                                    default:
                                                        icon = <FaUser size={24} />;
                                                        colorClass = 'text-secondary';
                                                        bgClass = 'bg-secondary';
                                                }
                                                return (
                                                    <div className={`p-2 rounded-circle ${bgClass} bg-opacity-10 ${colorClass}`}>
                                                        {icon}
                                                    </div>
                                                );
                                            })()}
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-light btn-sm rounded-circle shadow-sm"
                                                    onClick={() => handleEditRoleClick(role)}
                                                    disabled={role.name === 'Super Admin'}
                                                >
                                                    <FaEdit className="text-secondary" />
                                                </button>
                                            </div>
                                        </div>

                                        <h5 className="fw-bold text-dark mb-2">{role.name}</h5>
                                        <p className="text-muted small mb-3">{role.description}</p>

                                        <div className="d-flex flex-wrap gap-2 mt-auto">
                                            {role.name === 'Super Admin' ? (
                                                <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">
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

            {/* Add User Modal */}
            {showUserAdd && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflowY: 'auto' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                        <div className="modal-content border-0 shadow-lg">
                            <div className="modal-header border-0 pb-0">
                                <div>
                                    <h5 className="modal-title fw-bold">Add New User</h5>
                                    <p className="text-muted small mb-0">Create a new user account</p>
                                </div>
                                <button className="btn-close" onClick={() => setShowUserAdd(false)}></button>
                            </div>
                            <div className="modal-body p-4">
                                <form>
                                    {/* User Credentials Section */}
                                    <div className="card border-0 bg-primary bg-opacity-10 mb-3 rounded-4">
                                        <div className="card-body p-3">
                                            <div className="d-flex align-items-center gap-2 mb-3 text-primary">
                                                <FaUserShield size={20} />
                                                <h6 className="fw-bold mb-0">User Credentials</h6>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <label className="form-label small fw-bold text-primary">Username *</label>
                                                    <input type="text" className="form-control border-white shadow-sm" name="username" value={userForm.username} onChange={handleUserInputChange} placeholder="user6088" />
                                                    <div className="form-text xsmall text-primary opacity-75">This will be used for login</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small fw-bold text-primary">Password *</label>
                                                    <input type="password" name="password" className="form-control border-white shadow-sm" value={userForm.password} onChange={handleUserInputChange} placeholder="Enter secure password" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small fw-bold text-primary">Confirm Password *</label>
                                                    <input type="password" name="confirmPassword" className="form-control border-white shadow-sm" value={userForm.confirmPassword} onChange={handleUserInputChange} placeholder="Confirm password" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information Section */}
                                    <div className="card border p-3 mb-3 rounded-4 shadow-sm">
                                        <div className="d-flex align-items-center gap-2 mb-3 text-secondary">
                                            <FaBriefcase size={20} className="text-primary" />
                                            <h6 className="fw-bold mb-0 text-dark">Contact Information</h6>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">Full Name</label>
                                                <input type="text" className="form-control bg-light border-0" name="name" value={userForm.name} onChange={handleUserInputChange} placeholder="John Doe" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">Email Address</label>
                                                <input type="email" className="form-control bg-light border-0" name="email" value={userForm.email} onChange={handleUserInputChange} placeholder="user@company.com" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Role & Employment Details */}
                                    <div className="card border-0 bg-success bg-opacity-10 mb-3 rounded-4">
                                        <div className="card-body p-3">
                                            <div className="d-flex align-items-center gap-2 mb-3 text-success">
                                                <FaBriefcase size={20} />
                                                <h6 className="fw-bold mb-0">Role & Employment Details</h6>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label small fw-bold text-success">User Role *</label>
                                                    <select className="form-select border-white shadow-sm" name="role" value={userForm.role} onChange={handleUserInputChange}>
                                                        {roles.map((r) => (<option key={r.id} value={r.name}>{r.name}</option>))}
                                                    </select>
                                                    <div className="form-text xsmall text-success opacity-75">Determines access level</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label small fw-bold text-success">Employee ID</label>
                                                    <input type="text" className="form-control border-white shadow-sm" name="employeeId" value={userForm.employeeId} onChange={handleUserInputChange} placeholder="EMP001 (optional)" />
                                                    <div className="form-text xsmall text-success opacity-75">Link to employee record</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Settings */}
                                    <div className="card border-0 bg-warning bg-opacity-10 mb-3 rounded-4">
                                        <div className="card-body p-3">
                                            <div className="d-flex align-items-center gap-2 mb-3 text-warning">
                                                <FaCrown size={20} />
                                                <h6 className="fw-bold mb-0 text-dark">Account Settings</h6>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <label className="form-label small fw-bold text-warning">Account Status</label>
                                                    <div className="position-relative">
                                                        <select className="form-select border-white shadow-sm ps-5" name="status" value={userForm.status} onChange={handleUserInputChange}>
                                                            <option value="Active text-success">Active - User can login</option>
                                                            <option value="Inactive text-danger">Inactive - Access disabled</option>
                                                        </select>
                                                        <div className={`position-absolute top-50 start-0 translate-middle-y ms-3 rounded-circle ${userForm.status.includes('Active') ? 'bg-success' : 'bg-danger'}`} style={{ width: '12px', height: '12px' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* System Permissions Section */}
                                    <div className="card border-0" style={{ backgroundColor: '#F9F5FF', borderRadius: '1rem' }}>
                                        <div className="card-body p-3">
                                            <div className="d-flex align-items-center gap-2 mb-3" style={{ color: '#7F56D9' }}>
                                                <FaUserShield size={20} />
                                                <h6 className="fw-bold mb-0">System Permissions</h6>
                                            </div>
                                            <p className="text-secondary xsmall mb-3" style={{ fontSize: '0.75rem' }}>
                                                Select specific permissions for this user. Role-based permissions will also apply.
                                            </p>
                                            <div className="row g-3">
                                                {[
                                                    { id: 'view_dash', label: 'View Dashboard', desc: 'Access main dashboard' },
                                                    { id: 'manage_emp', label: 'Manage Employees', desc: 'Add, edit, delete employees' },
                                                    { id: 'manage_att', label: 'Manage Attendance', desc: 'Track and modify attendance' },
                                                    { id: 'manage_leave', label: 'Manage Leave', desc: 'Handle leave requests' },
                                                    { id: 'manage_pay', label: 'Manage Payroll', desc: 'Process salary and payslips' },
                                                    { id: 'manage_assets', label: 'Manage Assets', desc: 'Allocate and track assets' },
                                                    { id: 'manage_tasks', label: 'Manage Tasks', desc: 'Assign and monitor tasks' },
                                                    { id: 'view_reports', label: 'View Reports', desc: 'Generate and view reports' },
                                                    { id: 'manage_users', label: 'Manage Users', desc: 'Create and manage user accounts' }
                                                ].map((perm) => (
                                                    <div className="col-md-4" key={perm.id}>
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={perm.id}
                                                                checked={userForm.permissions.includes(perm.id)}
                                                                onChange={(e) => {
                                                                    const newPerms = e.target.checked
                                                                        ? [...userForm.permissions, perm.id]
                                                                        : userForm.permissions.filter(p => p !== perm.id);
                                                                    setUserForm({ ...userForm, permissions: newPerms });
                                                                }}
                                                            />
                                                            <label className="form-check-label fw-bold small mb-0 ms-1" htmlFor={perm.id}>{perm.label}</label>
                                                            <div className="text-muted xsmall ms-1" style={{ fontSize: '0.65rem' }}>{perm.desc}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-primary w-100 py-2 rounded-3 fw-bold" onClick={handleSaveUser}>Create User</button>
                                <button className="btn btn-light w-100 py-2 rounded-3 border mt-1" onClick={() => setShowUserAdd(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showUserEdit && selectedUser && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button className="btn-close" onClick={() => setShowUserEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={userForm.name}
                                            onChange={handleUserInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={userForm.email}
                                            onChange={handleUserInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Assign Role</label>
                                        <select
                                            className="form-select"
                                            name="role"
                                            value={userForm.role}
                                            onChange={handleUserInputChange}
                                        >
                                            {roles.map((r) => (<option key={r.id} value={r.name}>{r.name}</option>))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Status</label>
                                        <select
                                            className="form-select"
                                            name="status"
                                            value={userForm.status}
                                            onChange={handleUserInputChange}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowUserEdit(false)}>Cancel</button>
                                <button className="btn btn-primary btn-sm" onClick={handleUpdateUser}>Update User</button>
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

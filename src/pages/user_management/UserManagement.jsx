import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../components/DashboardLayout.css';

export const UserManagementContent = () => {
    // Mock Data
    const [users, setUsers] = useState([
        { id: 1, name: 'Meera Krishnan', email: 'meera@example.com', role: 'Super Admin', status: 'Active', lastLogin: 'Today, 10:00 AM' },
        { id: 2, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: 'Yesterday, 05:30 PM' },
        { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'Employee', status: 'Inactive', lastLogin: '2 weeks ago' },
    ]);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Handlers
    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEdit(true);
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDelete(true);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">User Management</h5>
                    <p className="text-secondary small mb-0">Manage system users and access roles</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={() => setShowAdd(true)}>
                    + Add New User
                </button>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Email Address</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Last Login</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td><span className="fw-bold text-dark">{user.name}</span></td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className="role-badge" style={{ backgroundColor: '#e2e8f0', color: '#1e293b' }}>{user.role}</span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${user.status === 'Active' ? 'bg-success text-white' : 'bg-danger text-white'}`} style={{ fontSize: '0.7rem' }}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>{user.lastLogin}</td>
                                    <td>
                                        <button className="action-btn edit" onClick={() => handleEdit(user)}>Edit</button>
                                        <button className="action-btn delete" onClick={() => handleDelete(user)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            {showAdd && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add User</h5>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Full Name</label>
                                        <input type="text" className="form-control" placeholder="Enter name" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Email Address</label>
                                        <input type="email" className="form-control" placeholder="Enter email" />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Role</label>
                                            <select className="form-select">
                                                <option>Employee</option>
                                                <option>Admin</option>
                                                <option>Super Admin</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Status</label>
                                            <select className="form-select">
                                                <option>Active</option>
                                                <option>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Password</label>
                                        <input type="password" class="form-control" placeholder="Create password" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Create User</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEdit && selectedUser && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Full Name</label>
                                        <input type="text" className="form-control" defaultValue={selectedUser.name} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Email Address</label>
                                        <input type="email" className="form-control" defaultValue={selectedUser.email} />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Role</label>
                                            <select className="form-select" defaultValue={selectedUser.role}>
                                                <option>Employee</option>
                                                <option>Admin</option>
                                                <option>Super Admin</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Status</label>
                                            <select className="form-select" defaultValue={selectedUser.status}>
                                                <option>Active</option>
                                                <option>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Update User</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDelete && selectedUser && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Delete User</h5>
                                <button className="btn-close" onClick={() => setShowDelete(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete user <strong>{selectedUser.name}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowDelete(false)}>Cancel</button>
                                <button className="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
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

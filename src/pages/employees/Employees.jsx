import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEllipsisH } from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';
import '../../components/layout/DashboardLayout.css';

export const EmployeesContent = () => {
    // Mock Data with status field
    const [employees, setEmployees] = useState([
        { id: 1, user: 'praveen', name: 'Praveen Kumar', email: 'praveen@trickuweb.com', phone: '+91 9876543210', gender: 'Male', city: 'Mumbai', status: 'ACTIVE', dept: 'Administration', desig: 'System Administrator', type: 'Admin' },
        { id: 2, user: 'priyanka', name: 'Priyanka Sharma', email: 'priyanka@trickuweb.com', phone: '+91 9876543221', gender: 'Female', city: 'Mumbai', status: 'ACTIVE', dept: 'HR', desig: 'HR Manager', type: 'Manager' },
        { id: 3, user: 'nitin', name: 'Nitin Patel', email: 'nitin@trickuweb.com', phone: '+91 9876543232', gender: 'Male', city: 'Mumbai', status: 'ACTIVE', dept: 'Engineering', desig: 'Software Developer', type: 'Employee' },
    ]);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [creationRole, setCreationRole] = useState('Employee');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [menuOpenId, setMenuOpenId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Handlers
    const handleRoleSelect = (role) => {
        setCreationRole(role);
        setShowRoleModal(false);
        setShowAdd(true);
    };

    const handleEdit = (emp) => {
        setSelectedEmployee({ ...emp }); // clone for editing
        setShowEdit(true);
    };

    const handleDelete = (emp) => {
        setSelectedEmployee(emp);
        setShowDelete(true);
    };

    const toggleMenu = (id) => {
        setMenuOpenId(prev => (prev === id ? null : id));
    };

    const handleStatusChange = (emp, newStatus) => {
        const confirmed = window.confirm(`Are you sure you want to ${newStatus === 'ACTIVE' ? 'activate' : 'deactivate'} this employee?`);
        if (!confirmed) return;
        const updated = employees.map(e => e.id === emp.id ? { ...e, status: newStatus } : e);
        setEmployees(updated);
        setMenuOpenId(null);
        // optional toast
        alert(`Employee ${newStatus === 'ACTIVE' ? 'activated' : 'deactivated'} successfully`);
    };

    const handleUpdateEmployee = () => {
        if (!selectedEmployee) return;
        setIsSaving(true);
        // Simulate async save
        setTimeout(() => {
            const updated = employees.map(e => e.id === selectedEmployee.id ? selectedEmployee : e);
            setEmployees(updated);
            setIsSaving(false);
            setShowEdit(false);
            alert('Employee updated successfully');
        }, 500);
    };

    return (
        <>
            <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold text-dark mb-0">Employee Details</h5>
                </div>
                <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center bg-white p-3 rounded shadow-sm">
                    <div className="d-flex gap-2 flex-grow-1">
                        <select className="form-select form-select-sm" style={{ maxWidth: '200px' }}>
                            <option>Select Department</option>
                            <option>Administration</option>
                            <option>HR</option>
                            <option>Engineering</option>
                        </select>
                        <select className="form-select form-select-sm" style={{ maxWidth: '150px' }}>
                            <option>By Name</option>
                        </select>
                        <select className="form-select form-select-sm" style={{ maxWidth: '150px' }}>
                            <option>By Number</option>
                        </select>
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-success btn-sm d-flex align-items-center gap-2">
                            <FaEdit /> EXPORT CSV
                        </button>
                        <button className="btn btn-primary btn-sm d-flex align-items-center gap-2">
                            <FaEdit /> CREATE USERNAME
                        </button>
                        <button className="btn btn-primary btn-sm d-flex align-items-center gap-2" onClick={() => setShowRoleModal(true)}>
                            ADD EMPLOYEE
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>City</th>
                                <th>Created At</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.id}>
                                    <td>{emp.user}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.phone}</td>
                                    <td>{emp.gender}</td>
                                    <td>{emp.city}</td>
                                    <td>27-09-2025</td>
                                    <td>
                                        <span className={`badge ${emp.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>{emp.status}</span>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2 align-items-center">
                                            <button className="btn btn-sm btn-outline-primary border-0" onClick={() => handleEdit(emp)}><FaEdit /></button>
                                            <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDelete(emp)}><FaTrash /></button>
                                            <div className="position-relative">
                                                <button className="btn btn-sm btn-outline-secondary border-0" onClick={() => toggleMenu(emp.id)}><FaEllipsisH /></button>
                                                {menuOpenId === emp.id && (
                                                    <ul className="dropdown-menu show" style={{ position: 'absolute', inset: 'auto auto 0 0' }}>
                                                        {emp.status === 'ACTIVE' ? (
                                                            <li><button className="dropdown-item" onClick={() => handleStatusChange(emp, 'INACTIVE')}>Deactivate</button></li>
                                                        ) : (
                                                            <li><button className="dropdown-item" onClick={() => handleStatusChange(emp, 'ACTIVE')}>Activate</button></li>
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {showEdit && selectedEmployee && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Employee</h5>
                                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Name</label>
                                            <input type="text" className="form-control" value={selectedEmployee.name} onChange={e => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Email</label>
                                            <input type="email" className="form-control" value={selectedEmployee.email} onChange={e => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Phone</label>
                                            <input type="text" className="form-control" value={selectedEmployee.phone} onChange={e => setSelectedEmployee({ ...selectedEmployee, phone: e.target.value })} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Profile Image (optional)</label>
                                            <input type="file" className="form-control" onChange={e => {
                                                // For simplicity, we just store the file name
                                                const file = e.target.files[0];
                                                setSelectedEmployee({ ...selectedEmployee, profileImage: file ? file.name : undefined });
                                            }} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Close</button>
                                <button className="btn btn-primary btn-sm" disabled={isSaving} onClick={handleUpdateEmployee}>
                                    {isSaving ? 'Saving...' : 'Update Employee'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDelete && selectedEmployee && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Delete Employee</h5>
                                <button className="btn-close" onClick={() => setShowDelete(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete <strong>{selectedEmployee.name}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowDelete(false)}>Cancel</button>
                                <button className="btn btn-danger btn-sm" onClick={() => {
                                    const filtered = employees.filter(e => e.id !== selectedEmployee.id);
                                    setEmployees(filtered);
                                    setShowDelete(false);
                                }}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Role Selection Modal */}
            {showRoleModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold">Select Role to Create</h5>
                                <button className="btn-close" onClick={() => setShowRoleModal(false)}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="d-grid gap-3">
                                    <button className="btn btn-outline-primary py-3 fw-bold" onClick={() => handleRoleSelect('Fulltime')}>Create Fulltime</button>
                                    <button className="btn btn-outline-info py-3 fw-bold" onClick={() => handleRoleSelect('Intern')}>Create Intern</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const Employees = () => {
    return (
        <DashboardLayout title="">
            <EmployeesContent />
        </DashboardLayout>
    );
};

export default Employees;

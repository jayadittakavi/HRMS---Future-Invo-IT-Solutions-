import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../components/DashboardLayout.css';

export const EmployeesContent = () => {
    // Mock Data
    const [employees] = useState([
        { id: 1, user: 'praveen', name: 'Praveen Kumar', email: 'praveen@trickuweb.com', dept: 'Administration', desig: 'System Administrator', pay: 'N/A', type: 'Admin' },
        { id: 2, user: 'priyanka', name: 'Priyanka Sharma', email: 'priyanka@trickuweb.com', dept: 'HR', desig: 'HR Manager', pay: 'N/A', type: 'Manager' },
        { id: 3, user: 'nitin', name: 'Nitin Patel', email: 'nitin@trickuweb.com', dept: 'Engineering', desig: 'Software Developer', pay: 'N/A', type: 'Employee' },
    ]);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Handlers
    const handleEdit = (emp) => {
        setSelectedEmployee(emp);
        setShowEdit(true);
    };

    const handleDelete = (emp) => {
        setSelectedEmployee(emp);
        setShowDelete(true);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Employee Management</h5>
                    <p className="text-secondary small mb-0">Manage employee records and information</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={() => setShowAdd(true)}>
                    + Add Employee
                </button>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Pay Grade</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.user}</td>
                                    <td><span className="fw-bold text-dark">{emp.name}</span></td>
                                    <td>{emp.email}</td>
                                    <td>{emp.dept}</td>
                                    <td>{emp.desig}</td>
                                    <td>{emp.pay}</td>
                                    <td>
                                        <span className={`role-badge ${emp.type.toLowerCase()}`}>{emp.type}</span>
                                    </td>
                                    <td>
                                        <button className="action-btn edit" onClick={() => handleEdit(emp)}><FaEdit /></button>
                                        <button className="action-btn delete" onClick={() => handleDelete(emp)}><FaTrash /></button>
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
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Employee</h5>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">First Name</label>
                                            <input type="text" className="form-control" placeholder="First Name" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Last Name</label>
                                            <input type="text" className="form-control" placeholder="Last Name" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Email</label>
                                            <input type="email" className="form-control" placeholder="Email" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Username</label>
                                            <input type="text" className="form-control" placeholder="Username" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Department</label>
                                            <select className="form-select">
                                                <option>Select Dept</option>
                                                <option>Administration</option>
                                                <option>HR</option>
                                                <option>Engineering</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Designation</label>
                                            <input type="text" className="form-control" placeholder="Designation" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">User Type</label>
                                            <select className="form-select">
                                                <option>Employee</option>
                                                <option>Admin</option>
                                                <option>Manager</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Save Employee</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                            <input type="text" className="form-control" defaultValue={selectedEmployee.name} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Email</label>
                                            <input type="email" className="form-control" defaultValue={selectedEmployee.email} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Department</label>
                                            <select className="form-select" defaultValue={selectedEmployee.dept}>
                                                <option>Administration</option>
                                                <option>HR</option>
                                                <option>Engineering</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Designation</label>
                                            <input type="text" className="form-control" defaultValue={selectedEmployee.desig} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">User Type</label>
                                            <select className="form-select" defaultValue={selectedEmployee.type}>
                                                <option>Employee</option>
                                                <option>Admin</option>
                                                <option>Manager</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Update Employee</button>
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
                                <button className="btn btn-danger btn-sm">Delete</button>
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

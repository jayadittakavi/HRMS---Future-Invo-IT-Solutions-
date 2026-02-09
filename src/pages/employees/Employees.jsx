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
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [creationRole, setCreationRole] = useState('Employee');
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Handlers
    const handleRoleSelect = (role) => {
        setCreationRole(role);
        setShowRoleModal(false);
        setShowAdd(true);
    };

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
                                <th>Download</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.user}</td>
                                    <td>{emp.name}</td>
                                    <td>+91 9876543210</td>
                                    <td>{['Male', 'Female'][Math.floor(Math.random() * 2)]}</td>
                                    <td>Mumbai</td>
                                    <td>---</td>
                                    <td>27-09-2025</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-sm btn-outline-primary border-0" onClick={() => handleEdit(emp)}><FaEdit /></button>
                                            <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDelete(emp)}><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Employee Modal */}
            {showAdd && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div>
                                    <h5 className="modal-title fw-bold">Add New {creationRole}</h5>
                                    <p className="text-secondary small mb-0">Enter {creationRole.toLowerCase()} information to add to the system</p>
                                </div>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row g-3">
                                        {/* Row 1 */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Select User Account</label>
                                            <select className="form-select">
                                                <option>Select a user account</option>
                                                {/* Only unassigned user accounts are shown */}
                                            </select>
                                            <div className="form-text small">Only unassigned user accounts are shown</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Full Name</label>
                                            <input type="text" className="form-control" placeholder="John Doe" />
                                        </div>

                                        {/* Row 2 */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Email</label>
                                            <input type="email" className="form-control" placeholder="john.doe@company.com" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Phone</label>
                                            <input type="tel" className="form-control" placeholder="Phone number" />
                                        </div>

                                        {/* Row 3 */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Department</label>
                                            <select className="form-select">
                                                <option>Select Department</option>
                                                <option>Administration</option>
                                                <option>HR</option>
                                                <option>Engineering</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Designation</label>
                                            <input type="text" className="form-control" placeholder="Software Engineer" />
                                        </div>

                                        {/* Row 4 */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Employee Type</label>
                                            <select className="form-select" defaultValue={creationRole}>
                                                <option>Employee</option>
                                                <option>HR</option>
                                                <option>Manager</option>
                                                <option>Admin</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Joining Date</label>
                                            <input type="date" className="form-control" />
                                        </div>

                                        {/* Row 5 */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Company</label>
                                            <select className="form-select">
                                                <option>Select Company</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Branch</label>
                                            <select className="form-select">
                                                <option>Select Branch</option>
                                            </select>
                                        </div>

                                        {/* Row 6 */}
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">PayGrade *</label>
                                            <select className="form-select">
                                                <option>Select PayGrade</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">CTC (Annual)</label>
                                            <input type="number" className="form-control" placeholder="600000" />
                                        </div>

                                        {/* Row 7 */}
                                        <div className="col-12">
                                            <label className="form-label small fw-bold">Manager (Optional)</label>
                                            <select className="form-select">
                                                <option>Select Manager</option>
                                            </select>
                                        </div>

                                        {/* Checkbox */}
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="lockForm" />
                                                <label className="form-check-label small" htmlFor="lockForm">
                                                    Lock Form Editing
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary w-100">Add Employee</button>
                                <button className="btn btn-light w-100 mt-2 border" onClick={() => setShowAdd(false)}>Cancel</button>
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
                                    <button className="btn btn-outline-primary py-3 fw-bold" onClick={() => handleRoleSelect('Employee')}>Create Employee</button>
                                    <button className="btn btn-outline-info py-3 fw-bold" onClick={() => handleRoleSelect('HR')}>Create HR</button>
                                    <button className="btn btn-outline-success py-3 fw-bold" onClick={() => handleRoleSelect('Manager')}>Create Manager</button>
                                    <button className="btn btn-outline-dark py-3 fw-bold" onClick={() => handleRoleSelect('Admin')}>Create Admin</button>
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

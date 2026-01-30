import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";

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
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [creationRole, setCreationRole] = useState('Employee');

    // Handlers
    const handleEdit = (emp) => {
        setSelectedEmployee(emp);
        setShowEdit(true);
    };

    const handleDelete = (emp) => {
        setSelectedEmployee(emp);
        setShowDelete(true);
    };

    const handleRoleSelect = (role) => {
        setCreationRole(role);
        setShowRoleModal(false);
        setShowAdd(true);
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
                            ADD
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
                                    <td>Female</td>
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

            {/* Add Employee Multi-Step Modal */}
            {showAdd && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                {/* Stepper Header */}
                                <div className="w-100">
                                    <h4 className="fw-bold text-center mb-4">Add {creationRole}</h4>
                                    <div className="d-flex justify-content-between align-items-center mb-4 px-4 position-relative">
                                        {/* Progress Line */}
                                        <div className="position-absolute top-50 start-0 w-100 translate-middle-y" style={{ height: '2px', backgroundColor: '#e9ecef', zIndex: 0 }}></div>

                                        {[
                                            { id: 1, label: 'Personal Details' },
                                            { id: 2, label: 'Official Details' },
                                            { id: 3, label: 'Education Details' },
                                            { id: 4, label: 'Last Work Details' },
                                            { id: 5, label: 'Other Details' }
                                        ].map((step) => (
                                            <div key={step.id} className="d-flex flex-column align-items-center position-relative z-1 bg-white px-2">
                                                <div
                                                    className={`rounded-circle d-flex align-items-center justify-content-center mb-2 fw-bold text-white transition-all`}
                                                    style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        backgroundColor: step.id <= currentStep ? '#0d6efd' : '#dee2e6',
                                                        transition: 'background-color 0.3s'
                                                    }}
                                                >
                                                    {step.id}
                                                </div>
                                                <span className={`small fw-bold ${step.id <= currentStep ? 'text-dark' : 'text-muted'}`}>{step.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="btn-close position-absolute top-0 end-0 m-3" onClick={() => setShowAdd(false)}></button>
                            </div>

                            <div className="modal-body px-4 py-3">
                                {currentStep === 1 && (
                                    <form>
                                        <div className="row g-4">
                                            {/* Column 1 */}
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Username</label>
                                                    <select className="form-select text-muted"><option>Select Username</option></select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Company*</label>
                                                    <select className="form-select"><option>Select Company</option></select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Branch*</label>
                                                    <select className="form-select"><option>Select Branch</option></select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Work Mode*</label>
                                                    <select className="form-select"><option>Select Work Mode</option></select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Name*</label>
                                                    <input type="text" className="form-control" placeholder="Enter Name" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Enter Email*</label>
                                                    <input type="email" className="form-control" placeholder="Enter Email" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Phone No.*</label>
                                                    <input type="tel" className="form-control" placeholder="Enter Phone No." />
                                                </div>
                                            </div>

                                            {/* Column 2 */}
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Emergency Phone No.</label>
                                                    <input type="tel" className="form-control" placeholder="Emergency Contact" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Gender*</label>
                                                    <select className="form-select"><option>Select Gender</option></select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Father / Husband Name</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Mother's Name</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Permanent Address</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Present Address</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            {/* Column 3 */}
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">City</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">State</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Pincode</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Pan</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Aadhaar</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">DOB</label>
                                                    <input type="date" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {/* Step 2: Official Details */}
                                {currentStep === 2 && (
                                    <form>
                                        <div className="row g-4">
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Employee ID*</label>
                                                    <input type="text" className="form-control" placeholder="EMP-001" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Department*</label>
                                                    <select className="form-select"><option>Select Dept</option></select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Designation*</label>
                                                    <select className="form-select"><option>Select Designation</option></select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Date of Joining*</label>
                                                    <input type="date" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Joining Salary (CTC)</label>
                                                    <input type="number" className="form-control" placeholder="0.00" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Reporting Manager</label>
                                                    <select className="form-select"><option>Select Manager</option></select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Shift</label>
                                                    <select className="form-select"><option>General Shift</option></select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Employment Type</label>
                                                    <select className="form-select">
                                                        <option>Permanent</option>
                                                        <option>Contract</option>
                                                        <option>Intern</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold text-secondary">Work Location</label>
                                                    <input type="text" className="form-control" placeholder="Office Location" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {/* Step 3: Education Details */}
                                {currentStep === 3 && (
                                    <form>
                                        <h6 className="fw-bold text-primary mb-3">SSC (10th Standard)</h6>
                                        <div className="row g-3 mb-4 border-bottom pb-3">
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">Institution Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">Board / University</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label small fw-bold text-secondary">Year</label>
                                                <input type="number" className="form-control" placeholder="YYYY" />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label small fw-bold text-secondary">% / CGPA</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>

                                        <h6 className="fw-bold text-primary mb-3">HSC / Diploma (12th Standard)</h6>
                                        <div className="row g-3 mb-4 border-bottom pb-3">
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">Institution Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">Board / University</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label small fw-bold text-secondary">Year</label>
                                                <input type="number" className="form-control" placeholder="YYYY" />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label small fw-bold text-secondary">% / CGPA</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>

                                        <h6 className="fw-bold text-primary mb-3">Graduation</h6>
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">Institution Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">University</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label small fw-bold text-secondary">Year</label>
                                                <input type="number" className="form-control" placeholder="YYYY" />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label small fw-bold text-secondary">% / CGPA</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {/* Step 4: Last Work Details */}
                                {currentStep === 4 && (
                                    <form>
                                        <div className="row g-3 align-items-end mb-3">
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">Previous Company Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">Job Title / Designation</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label small fw-bold text-secondary">From Date</label>
                                                <input type="date" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label small fw-bold text-secondary">To Date</label>
                                                <input type="date" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-md-8">
                                                <label className="form-label small fw-bold text-secondary">Reason for Leaving</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">Relevant Experience (Years)</label>
                                                <input type="number" className="form-control" step="0.1" />
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {/* Step 5: Other Details */}
                                {currentStep === 5 && (
                                    <form>
                                        <h6 className="fw-bold text-dark mb-3">Bank Details</h6>
                                        <div className="row g-3 mb-4 border-bottom pb-4">
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">Bank Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">Account Number</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">IFSC Code</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>

                                        <h6 className="fw-bold text-dark mb-3">Statutory Details</h6>
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">UAN Number</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">PF Account Number</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-secondary">ESIC Number</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>

                            <div className="modal-footer border-0 px-5 pb-4">
                                <button
                                    className="btn btn-outline-secondary px-4 me-auto"
                                    onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                                    disabled={currentStep === 1}
                                >
                                    BACK
                                </button>
                                <button
                                    className="btn btn-primary px-5 rounded-pill"
                                    onClick={() => {
                                        if (currentStep < 5) setCurrentStep(prev => prev + 1);
                                        else setShowAdd(false);
                                    }}
                                >
                                    {currentStep === 5 ? 'SUBMIT' : 'NEXT'}
                                </button>
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

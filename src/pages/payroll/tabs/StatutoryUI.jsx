import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFileDownload, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const StatutoryUI = () => {
    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: 'Alice Johnson',
            employeeId: 'EMP001',
            panNumber: 'ABCDE1234F',
            uanNumber: '123456789012',
            esiNumber: '1234567890123456',
            pfNumber: 'MH/MUM/0012345/000/0001234',
            pfContribution: 1800,
            esiContribution: 750,
            status: 'Active'
        },
        {
            id: 2,
            name: 'Bob Smith',
            employeeId: 'EMP002',
            panNumber: 'FGHIJ5678K',
            uanNumber: '987654321098',
            esiNumber: '9876543210987654',
            pfNumber: 'MH/MUM/0012345/000/0005678',
            pfContribution: 1620,
            esiContribution: 675,
            status: 'Active'
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        panNumber: '',
        uanNumber: '',
        esiNumber: '',
        pfNumber: '',
        pfContribution: '',
        esiContribution: ''
    });

    const stats = {
        totalPF: employees.reduce((sum, emp) => sum + emp.pfContribution, 0),
        totalESI: employees.reduce((sum, emp) => sum + emp.esiContribution, 0),
        totalEmployees: employees.length,
        compliance: 95
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Statutory Compliance</h5>
                    <p className="text-muted small mb-0">Manage PF, ESI, and other statutory requirements</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm rounded-pill px-3">
                        <FaFileDownload className="me-2" />
                        Download Report
                    </button>
                    <button className="btn btn-primary btn-sm rounded-pill px-3" onClick={() => setShowModal(true)}>
                        <FaPlus className="me-2" />
                        Add Details
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Total PF Contribution</h6>
                            <h3 className="fw-bold mb-0">₹{stats.totalPF.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Total ESI Contribution</h6>
                            <h3 className="fw-bold mb-0">₹{stats.totalESI.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Enrolled Employees</h6>
                            <h3 className="fw-bold mb-0">{stats.totalEmployees}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Compliance Rate</h6>
                            <h3 className="fw-bold mb-0">{stats.compliance}%</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statutory Details Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Employee</th>
                                    <th className="border-0 py-3">PAN Number</th>
                                    <th className="border-0 py-3">UAN Number</th>
                                    <th className="border-0 py-3">ESI Number</th>
                                    <th className="border-0 py-3">PF Number</th>
                                    <th className="border-0 py-3">PF Contribution</th>
                                    <th className="border-0 py-3">ESI Contribution</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(employee => (
                                    <tr key={employee.id}>
                                        <td className="px-4">
                                            <div>
                                                <div className="fw-bold text-dark">{employee.name}</div>
                                                <small className="text-muted">{employee.employeeId}</small>
                                            </div>
                                        </td>
                                        <td className="text-secondary small">{employee.panNumber}</td>
                                        <td className="text-secondary small">{employee.uanNumber}</td>
                                        <td className="text-secondary small">{employee.esiNumber}</td>
                                        <td className="text-secondary small">{employee.pfNumber}</td>
                                        <td className="fw-bold text-primary">₹{employee.pfContribution}</td>
                                        <td className="fw-bold text-info">₹{employee.esiContribution}</td>
                                        <td>
                                            <span className="badge bg-success bg-opacity-10 text-success">
                                                <FaCheckCircle className="me-1" size={10} />
                                                {employee.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm btn-outline-primary rounded-circle" title="Edit">
                                                    <FaEdit size={12} />
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger rounded-circle" title="Delete">
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">Add Statutory Details</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label small text-muted fw-bold">Employee ID</label>
                                        <input type="text" className="form-control" placeholder="EMP001" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">PAN Number</label>
                                        <input type="text" className="form-control" placeholder="ABCDE1234F" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">UAN Number</label>
                                        <input type="text" className="form-control" placeholder="123456789012" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">ESI Number</label>
                                        <input type="text" className="form-control" placeholder="1234567890123456" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">PF Number</label>
                                        <input type="text" className="form-control" placeholder="MH/MUM/0012345/000/0001234" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">PF Contribution</label>
                                        <input type="number" className="form-control" placeholder="1800" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">ESI Contribution</label>
                                        <input type="number" className="form-control" placeholder="750" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light rounded-pill px-4" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary rounded-pill px-4">
                                    Save Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatutoryUI;

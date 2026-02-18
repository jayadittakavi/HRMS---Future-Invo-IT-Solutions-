import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFileExport, FaCalculator } from 'react-icons/fa';

const SalaryUI = () => {
    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: 'Alice Johnson',
            employeeId: 'EMP001',
            department: 'Engineering',
            designation: 'Senior Developer',
            basic: 50000,
            hra: 20000,
            allowances: 10000,
            gross: 80000,
            deductions: 5000,
            net: 75000,
            status: 'Active'
        },
        {
            id: 2,
            name: 'Bob Smith',
            employeeId: 'EMP002',
            department: 'Sales',
            designation: 'Sales Manager',
            basic: 45000,
            hra: 18000,
            allowances: 12000,
            gross: 75000,
            deductions: 4500,
            net: 70500,
            status: 'Active'
        },
        {
            id: 3,
            name: 'Charlie Davis',
            employeeId: 'EMP003',
            department: 'HR',
            designation: 'HR Executive',
            basic: 35000,
            hra: 14000,
            allowances: 8000,
            gross: 57000,
            deductions: 3500,
            net: 53500,
            status: 'Active'
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        employeeId: '',
        basic: '',
        hra: '',
        allowances: '',
        deductions: ''
    });

    const handleViewDetails = (employee) => {
        setSelectedEmployee(employee);
        setShowDetailModal(true);
    };

    const handleEdit = (employee) => {
        setFormData({
            employeeId: employee.employeeId,
            basic: employee.basic,
            hra: employee.hra,
            allowances: employee.allowances,
            deductions: employee.deductions
        });
        setShowModal(true);
    };

    const calculateSalary = () => {
        const basic = parseFloat(formData.basic) || 0;
        const hra = parseFloat(formData.hra) || 0;
        const allowances = parseFloat(formData.allowances) || 0;
        const deductions = parseFloat(formData.deductions) || 0;
        const gross = basic + hra + allowances;
        const net = gross - deductions;
        return { gross, net };
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        totalEmployees: employees.length,
        totalPayroll: employees.reduce((sum, emp) => sum + emp.net, 0),
        avgSalary: employees.reduce((sum, emp) => sum + emp.net, 0) / employees.length,
        totalDeductions: employees.reduce((sum, emp) => sum + emp.deductions, 0)
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Salary Management</h5>
                    <p className="text-muted small mb-0">Manage employee salary structures and components</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm rounded-pill px-3">
                        <FaFileExport className="me-2" />
                        Export
                    </button>
                    <button className="btn btn-primary btn-sm rounded-pill px-3" onClick={() => setShowModal(true)}>
                        <FaPlus className="me-2" />
                        Add Salary
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Total Employees</h6>
                            <h3 className="fw-bold mb-0">{stats.totalEmployees}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Total Payroll</h6>
                            <h3 className="fw-bold mb-0">₹{stats.totalPayroll.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Average Salary</h6>
                            <h3 className="fw-bold mb-0">₹{Math.round(stats.avgSalary).toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Total Deductions</h6>
                            <h3 className="fw-bold mb-0">₹{stats.totalDeductions.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <FaSearch className="text-muted" />
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search by name, employee ID, or department..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Salary Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Employee</th>
                                    <th className="border-0 py-3">Department</th>
                                    <th className="border-0 py-3">Basic</th>
                                    <th className="border-0 py-3">HRA</th>
                                    <th className="border-0 py-3">Allowances</th>
                                    <th className="border-0 py-3">Gross</th>
                                    <th className="border-0 py-3">Deductions</th>
                                    <th className="border-0 py-3">Net Salary</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map(employee => (
                                    <tr key={employee.id}>
                                        <td className="px-4">
                                            <div>
                                                <div className="fw-bold text-dark">{employee.name}</div>
                                                <small className="text-muted">{employee.employeeId}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                {employee.department}
                                            </span>
                                        </td>
                                        <td className="text-secondary">₹{employee.basic.toLocaleString()}</td>
                                        <td className="text-secondary">₹{employee.hra.toLocaleString()}</td>
                                        <td className="text-secondary">₹{employee.allowances.toLocaleString()}</td>
                                        <td className="fw-bold text-primary">₹{employee.gross.toLocaleString()}</td>
                                        <td className="text-danger">₹{employee.deductions.toLocaleString()}</td>
                                        <td className="fw-bold text-success">₹{employee.net.toLocaleString()}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary rounded-circle"
                                                    onClick={() => handleViewDetails(employee)}
                                                    title="View Details"
                                                >
                                                    <FaEye size={12} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-primary rounded-circle"
                                                    onClick={() => handleEdit(employee)}
                                                    title="Edit"
                                                >
                                                    <FaEdit size={12} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger rounded-circle"
                                                    title="Delete"
                                                >
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
                                <h5 className="modal-title fw-bold">Configure Salary</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label small text-muted fw-bold">Employee ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.employeeId}
                                            onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
                                            placeholder="EMP001"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">Basic Salary</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.basic}
                                            onChange={e => setFormData({ ...formData, basic: e.target.value })}
                                            placeholder="50000"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">HRA</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.hra}
                                            onChange={e => setFormData({ ...formData, hra: e.target.value })}
                                            placeholder="20000"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">Allowances</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.allowances}
                                            onChange={e => setFormData({ ...formData, allowances: e.target.value })}
                                            placeholder="10000"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">Deductions</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.deductions}
                                            onChange={e => setFormData({ ...formData, deductions: e.target.value })}
                                            placeholder="5000"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <div className="card bg-light border-0">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <span className="text-muted">Gross Salary:</span>
                                                    <span className="fw-bold text-primary">₹{calculateSalary().gross.toLocaleString()}</span>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="text-muted">Net Salary:</span>
                                                    <span className="fw-bold text-success fs-5">₹{calculateSalary().net.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light rounded-pill px-4" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary rounded-pill px-4">
                                    <FaCalculator className="me-2" />
                                    Save Salary
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {showDetailModal && selectedEmployee && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">Salary Details</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Employee Name</label>
                                        <p className="fw-bold text-dark mb-0">{selectedEmployee.name}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Employee ID</label>
                                        <p className="text-dark mb-0">{selectedEmployee.employeeId}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Department</label>
                                        <p className="text-dark mb-0">{selectedEmployee.department}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Designation</label>
                                        <p className="text-dark mb-0">{selectedEmployee.designation}</p>
                                    </div>
                                    <div className="col-12"><hr /></div>
                                    <div className="col-md-4">
                                        <label className="small text-muted fw-bold">Basic Salary</label>
                                        <p className="fw-bold text-primary mb-0">₹{selectedEmployee.basic.toLocaleString()}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small text-muted fw-bold">HRA</label>
                                        <p className="fw-bold text-primary mb-0">₹{selectedEmployee.hra.toLocaleString()}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small text-muted fw-bold">Allowances</label>
                                        <p className="fw-bold text-primary mb-0">₹{selectedEmployee.allowances.toLocaleString()}</p>
                                    </div>
                                    <div className="col-12"><hr /></div>
                                    <div className="col-md-4">
                                        <label className="small text-muted fw-bold">Gross Salary</label>
                                        <p className="fw-bold text-info mb-0">₹{selectedEmployee.gross.toLocaleString()}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small text-muted fw-bold">Deductions</label>
                                        <p className="fw-bold text-danger mb-0">₹{selectedEmployee.deductions.toLocaleString()}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small text-muted fw-bold">Net Salary</label>
                                        <p className="fw-bold text-success fs-5 mb-0">₹{selectedEmployee.net.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light rounded-pill px-4" onClick={() => setShowDetailModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalaryUI;

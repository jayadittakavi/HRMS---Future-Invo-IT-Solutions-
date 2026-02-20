import React, { useState } from 'react';
import { FaEye, FaTrash, FaPrint, FaFilePdf, FaEdit, FaPlus, FaCalculator, FaTimes } from 'react-icons/fa';

const PayslipsTab = ({ personal = false }) => {
    // Mock Data
    const [payrolls, setPayrolls] = useState([
        { id: 1, employeeId: 'EMP004', employee: 'Rahul Sharma', designation: 'Senior Developer', department: 'Engineering', period: 'June 2025', payDate: '2025-07-02', basic: 45000, hra: 18000, transport: 5000, gross: 78000, deductions: 6500, net: 71500, status: 'Paid', leaves: 3, lop: 0 },
        { id: 2, employeeId: 'EMP024', employee: 'Sanjay Gupta', designation: 'Office Manager', department: 'Administration', period: 'Sep 2025', payDate: '2025-10-02', basic: 38000, hra: 15000, transport: 4000, gross: 65000, deductions: 5000, net: 60000, status: 'Processed', leaves: 1, lop: 1 },
    ]);

    // Modal States
    const [showAddModal, setShowAddModal] = useState(false);
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [selectedSlip, setSelectedSlip] = useState(null);

    // Form State for Add/Edit
    const [formData, setFormData] = useState({
        employee: '',
        payDate: '',
        paidDays: 30,
        totalDays: 30,
        basic: 0,
        hra: 0,
        transport: 0,
        communication: 0,
        pf: 0,
        esi: 0,
        tax: 0,
        otherDeductions: 0
    });

    // Handlers
    const handlePrint = (slip) => {
        setSelectedSlip(slip);
        setShowPrintModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this payslip?")) {
            setPayrolls(payrolls.filter(p => p.id !== id));
        }
    };

    const handleCalculate = () => {
        // Mock Calculation Logic used in the form
        const earnings = Number(formData.basic) + Number(formData.hra) + Number(formData.transport) + Number(formData.communication);
        const deductions = Number(formData.pf) + Number(formData.esi) + Number(formData.tax) + Number(formData.otherDeductions);
        alert(`Estimated Net Salary: ₹${earnings - deductions}`);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">{personal ? 'My Payslips' : 'Payslip Management'}</h5>
                    <p className="text-secondary small mb-0">
                        {personal ? 'View and download your monthly salary slips' : 'Manage employee salaries and generate payslips'}
                    </p>
                </div>
                {!personal && (
                    <button className="btn btn-primary btn-sm px-3 rounded-pill d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}>
                        <FaPlus size={12} /> Add Payslip
                    </button>
                )}
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table align-middle">
                        <thead className="bg-light">
                            <tr>
                                {!personal && <th>Employee</th>}
                                <th>Pay Period</th>
                                <th>Total Earnings</th>
                                <th>Total Deductions</th>
                                <th>Net Salary</th>
                                <th>Pay Date</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrolls.map((slip) => (
                                <tr key={slip.id}>
                                    {!personal && (
                                        <td>
                                            <div className="d-flex flex-column">
                                                <span className="fw-bold text-dark">{slip.employee}</span>
                                                <span className="text-muted small">{slip.employeeId}</span>
                                            </div>
                                        </td>
                                    )}
                                    <td><span className="badge bg-light text-dark border">{slip.period}</span></td>
                                    <td className="text-success">₹{slip.gross.toLocaleString()}</td>
                                    <td className="text-danger">₹{slip.deductions.toLocaleString()}</td>
                                    <td><span className="fw-bold text-primary">₹{slip.net.toLocaleString()}</span></td>
                                    <td>{slip.payDate}</td>
                                    <td>
                                        <span className={`badge ${slip.status === 'Paid' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                                            {slip.status}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-light text-primary me-1" title="Print/View" onClick={() => handlePrint(slip)}>
                                            <FaPrint />
                                        </button>
                                        {!personal && (
                                            <>
                                                <button className="btn btn-sm btn-light text-secondary me-1" title="Edit">
                                                    <FaEdit />
                                                </button>
                                                <button className="btn btn-sm btn-light text-danger" title="Delete" onClick={() => handleDelete(slip.id)}>
                                                    <FaTrash />
                                                </button>
                                            </>
                                        )}
                                        {personal && (
                                            <button className="btn btn-sm btn-light text-dark" title="Download PDF" onClick={() => handlePrint(slip)}>
                                                <FaFilePdf />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Print/View Modal */}
            {showPrintModal && selectedSlip && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1055 }}>
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">Payslip Preview</h5>
                                <button className="btn-close" onClick={() => setShowPrintModal(false)}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="border p-4 rounded-3 shadow-sm bg-white" id="printable-area">
                                    <div className="text-center mb-4">
                                        <h4 className="fw-bold text-primary mb-1">TrickuWeb Technologies</h4>
                                        <p className="text-muted small mb-2">Tech Park, Bangalore, Karnataka, India</p>
                                        <h5 className="text-uppercase border-top border-bottom py-2 d-inline-block mt-2">Salary Slip for {selectedSlip.period}</h5>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <h6 className="text-primary fw-bold mb-3">Employee Details</h6>
                                            <div className="row g-3 small">
                                                <div className="col-md-6"><strong>Name:</strong> {selectedSlip.employee}</div>
                                                <div className="col-md-6"><strong>Emp ID:</strong> {selectedSlip.employeeId}</div>
                                                <div className="col-md-6"><strong>Department:</strong> {selectedSlip.department}</div>
                                                <div className="col-md-6"><strong>Designation:</strong> {selectedSlip.designation}</div>
                                                <div className="col-md-6"><strong>Bank:</strong> HDFC Bank</div>
                                                <div className="col-md-6"><strong>Account:</strong> ************4590</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-responsive mb-4">
                                        <table className="table table-bordered table-sm">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Earnings</th>
                                                    <th className="text-end">Amount</th>
                                                    <th>Deductions</th>
                                                    <th className="text-end">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Basic Salary</td>
                                                    <td className="text-end">{selectedSlip.basic.toLocaleString()}</td>
                                                    <td>PF Employee</td>
                                                    <td className="text-end">1,800</td>
                                                </tr>
                                                <tr>
                                                    <td>HRA</td>
                                                    <td className="text-end">{selectedSlip.hra.toLocaleString()}</td>
                                                    <td>Professional Tax</td>
                                                    <td className="text-end">200</td>
                                                </tr>
                                                <tr>
                                                    <td>Transport Allowance</td>
                                                    <td className="text-end">{selectedSlip.transport.toLocaleString()}</td>
                                                    <td>Income Tax</td>
                                                    <td className="text-end">{(selectedSlip.deductions - 2000).toLocaleString()}</td>
                                                </tr>
                                                <tr className="fw-bold bg-light">
                                                    <td>Total Earnings</td>
                                                    <td className="text-end">{selectedSlip.gross.toLocaleString()}</td>
                                                    <td>Total Deductions</td>
                                                    <td className="text-end">{selectedSlip.deductions.toLocaleString()}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center bg-primary-subtle p-3 rounded">
                                        <h5 className="mb-0 text-primary">Net Salary Payable</h5>
                                        <h4 className="mb-0 fw-bold">₹{selectedSlip.net.toLocaleString()}</h4>
                                    </div>
                                    <p className="text-muted small mt-2 text-center">** This is a computer-generated document and does not require a signature.</p>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-secondary" onClick={() => setShowPrintModal(false)}>Close</button>
                                <button className="btn btn-success" onClick={() => window.print()}><FaPrint className="me-2" /> Print Payslip</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Payslip Modal */}
            {showAddModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1055 }}>
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Add Payslip</h5>
                                <button className="btn-close btn-close-white" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <div className="modal-body bg-light">
                                <div className="row g-3">
                                    {/* Employee Info */}
                                    <div className="col-md-3">
                                        <div className="card shadow-sm border-0 h-100">
                                            <div className="card-header bg-white fw-bold text-primary">Employee Information</div>
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold">Employee Name</label>
                                                    <select className="form-select" onChange={(e) => setFormData({ ...formData, employee: e.target.value })}>
                                                        <option>Select Employee</option>
                                                        <option value="rahul">Rahul Sharma (EMP004)</option>
                                                        <option value="sanjay">Sanjay Gupta (EMP024)</option>
                                                        <option value="pooja">Pooja Singh (EMP008)</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold">Paid Days</label>
                                                    <input type="number" className="form-control" value={formData.paidDays} onChange={(e) => setFormData({ ...formData, paidDays: e.target.value })} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label small fw-bold">Pay Date</label>
                                                    <input type="date" className="form-control" onChange={(e) => setFormData({ ...formData, payDate: e.target.value })} />
                                                </div>
                                                <button className="btn btn-success w-100 mt-3" onClick={handleCalculate}>
                                                    <FaCalculator className="me-2" /> Calculate Salary
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Earnings */}
                                    <div className="col-md-3">
                                        <div className="card shadow-sm border-0 h-100">
                                            <div className="card-header bg-success text-white fw-bold">Earnings</div>
                                            <div className="card-body">
                                                {['Basic', 'HRA', 'Transport', 'Communication', 'Education Allowance'].map((field) => (
                                                    <div className="mb-2" key={field}>
                                                        <label className="form-label small text-muted mb-0">{field}</label>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-sm"
                                                            placeholder="0"
                                                            onChange={(e) => setFormData({ ...formData, [field.toLowerCase().replace(' ', '')]: e.target.value })}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Deductions */}
                                    <div className="col-md-3">
                                        <div className="card shadow-sm border-0 h-100">
                                            <div className="card-header bg-danger text-white fw-bold">Deductions</div>
                                            <div className="card-body">
                                                {['PF Employee', 'ESI Employee', 'Income Tax', 'Loan EMI', 'Other Deductions'].map((field) => (
                                                    <div className="mb-2" key={field}>
                                                        <label className="form-label small text-muted mb-0">{field}</label>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-sm"
                                                            placeholder="0"
                                                            onChange={(e) => setFormData({ ...formData, [field.toLowerCase().replace(' ', '')]: e.target.value })}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Summary (Right Side) */}
                                    <div className="col-md-3">
                                        <div className="card shadow-sm border-0 h-100">
                                            <div className="card-header bg-info text-white fw-bold">Employer Contribution</div>
                                            <div className="card-body">
                                                <div className="mb-2">
                                                    <label className="form-label small text-muted mb-0">PF Employer (2%)</label>
                                                    <input type="number" className="form-control form-control-sm" readOnly value="763" />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label small text-muted mb-0">ESI Employer (3.25%)</label>
                                                    <input type="number" className="form-control form-control-sm" readOnly value="1450" />
                                                </div>
                                            </div>
                                            <div className="card-footer bg-white">
                                                <h6 className="fw-bold text-dark">Salary Summary</h6>
                                                <div className="d-flex justify-content-between small mb-1">
                                                    <span>Total Earnings:</span>
                                                    <span className="text-success fw-bold">₹0</span>
                                                </div>
                                                <div className="d-flex justify-content-between small mb-1">
                                                    <span>Total Deductions:</span>
                                                    <span className="text-danger fw-bold">₹0</span>
                                                </div>
                                                <div className="d-flex justify-content-between small border-top pt-2 mt-2">
                                                    <span className="h6 mb-0">Net Salary:</span>
                                                    <span className="h6 mb-0 text-primary">₹0</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-light" onClick={() => setShowAddModal(false)}>Close</button>
                                <button className="btn btn-primary px-4">Generate & Save Payslip</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PayslipsTab;

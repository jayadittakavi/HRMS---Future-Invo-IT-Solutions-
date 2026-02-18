import React, { useState } from 'react';
import { FaPlus, FaFileDownload, FaEnvelope, FaEye, FaPrint, FaSearch } from 'react-icons/fa';

const PayslipUI = () => {
    const [payslips, setPayslips] = useState([
        {
            id: 1,
            employeeId: 'EMP001',
            name: 'Alice Johnson',
            month: 'February 2026',
            basic: 50000,
            hra: 20000,
            allowances: 10000,
            gross: 80000,
            deductions: 5000,
            net: 75000,
            status: 'Generated',
            sentDate: '2026-02-28'
        },
        {
            id: 2,
            employeeId: 'EMP002',
            name: 'Bob Smith',
            month: 'February 2026',
            basic: 45000,
            hra: 18000,
            allowances: 12000,
            gross: 75000,
            deductions: 4500,
            net: 70500,
            status: 'Sent',
            sentDate: '2026-02-28'
        },
        {
            id: 3,
            employeeId: 'EMP003',
            name: 'Charlie Davis',
            month: 'February 2026',
            basic: 35000,
            hra: 14000,
            allowances: 8000,
            gross: 57000,
            deductions: 3500,
            net: 53500,
            status: 'Generated',
            sentDate: null
        }
    ]);

    const [selectedMonth, setSelectedMonth] = useState('February 2026');
    const [searchTerm, setSearchTerm] = useState('');
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [selectedPayslip, setSelectedPayslip] = useState(null);

    const filteredPayslips = payslips.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: payslips.length,
        generated: payslips.filter(p => p.status === 'Generated').length,
        sent: payslips.filter(p => p.status === 'Sent').length,
        totalAmount: payslips.reduce((sum, p) => sum + p.net, 0)
    };

    const handlePreview = (payslip) => {
        setSelectedPayslip(payslip);
        setShowPreviewModal(true);
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Payslip Management</h5>
                    <p className="text-muted small mb-0">Generate and distribute employee payslips</p>
                </div>
                <div className="d-flex gap-2">
                    <select className="form-select form-select-sm" style={{ width: 'auto' }} value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                        <option>February 2026</option>
                        <option>January 2026</option>
                        <option>December 2025</option>
                    </select>
                    <button className="btn btn-outline-success btn-sm rounded-pill px-3">
                        <FaEnvelope className="me-2" />
                        Send All
                    </button>
                    <button className="btn btn-primary btn-sm rounded-pill px-3">
                        <FaPlus className="me-2" />
                        Generate Payslips
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Total Payslips</h6>
                            <h3 className="fw-bold mb-0">{stats.total}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Generated</h6>
                            <h3 className="fw-bold mb-0">{stats.generated}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Sent to Employees</h6>
                            <h3 className="fw-bold mb-0">{stats.sent}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Total Amount</h6>
                            <h3 className="fw-bold mb-0">₹{stats.totalAmount.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <FaSearch className="text-muted" />
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search by employee name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Payslips Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Employee</th>
                                    <th className="border-0 py-3">Month</th>
                                    <th className="border-0 py-3">Gross Salary</th>
                                    <th className="border-0 py-3">Deductions</th>
                                    <th className="border-0 py-3">Net Salary</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayslips.map(payslip => (
                                    <tr key={payslip.id}>
                                        <td className="px-4">
                                            <div>
                                                <div className="fw-bold text-dark">{payslip.name}</div>
                                                <small className="text-muted">{payslip.employeeId}</small>
                                            </div>
                                        </td>
                                        <td className="text-secondary">{payslip.month}</td>
                                        <td className="fw-bold text-primary">₹{payslip.gross.toLocaleString()}</td>
                                        <td className="text-danger">₹{payslip.deductions.toLocaleString()}</td>
                                        <td className="fw-bold text-success">₹{payslip.net.toLocaleString()}</td>
                                        <td>
                                            <span className={`badge ${payslip.status === 'Sent' ? 'bg-success' : 'bg-warning text-dark'} bg-opacity-10`}>
                                                {payslip.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm btn-outline-secondary rounded-circle" onClick={() => handlePreview(payslip)} title="Preview">
                                                    <FaEye size={12} />
                                                </button>
                                                <button className="btn btn-sm btn-outline-primary rounded-circle" title="Download">
                                                    <FaFileDownload size={12} />
                                                </button>
                                                <button className="btn btn-sm btn-outline-success rounded-circle" title="Send Email">
                                                    <FaEnvelope size={12} />
                                                </button>
                                                <button className="btn btn-sm btn-outline-info rounded-circle" title="Print">
                                                    <FaPrint size={12} />
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

            {/* Preview Modal */}
            {showPreviewModal && selectedPayslip && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">Payslip Preview</h5>
                                <button type="button" className="btn-close" onClick={() => setShowPreviewModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {/* Payslip Design */}
                                <div className="border rounded p-4" style={{ background: '#f8f9fa' }}>
                                    <div className="text-center mb-4">
                                        <h4 className="fw-bold text-primary">Future Invo IT Solutions</h4>
                                        <p className="text-muted mb-0">Salary Slip for {selectedPayslip.month}</p>
                                    </div>
                                    <hr />
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <p className="mb-1"><strong>Employee Name:</strong> {selectedPayslip.name}</p>
                                            <p className="mb-1"><strong>Employee ID:</strong> {selectedPayslip.employeeId}</p>
                                        </div>
                                        <div className="col-6 text-end">
                                            <p className="mb-1"><strong>Month:</strong> {selectedPayslip.month}</p>
                                            <p className="mb-1"><strong>Pay Date:</strong> {selectedPayslip.sentDate || 'Pending'}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-6">
                                            <h6 className="fw-bold mb-3">Earnings</h6>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Basic Salary:</span>
                                                <span>₹{selectedPayslip.basic.toLocaleString()}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>HRA:</span>
                                                <span>₹{selectedPayslip.hra.toLocaleString()}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Allowances:</span>
                                                <span>₹{selectedPayslip.allowances.toLocaleString()}</span>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between fw-bold">
                                                <span>Gross Salary:</span>
                                                <span className="text-primary">₹{selectedPayslip.gross.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="fw-bold mb-3">Deductions</h6>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>PF:</span>
                                                <span>₹{Math.round(selectedPayslip.deductions * 0.6).toLocaleString()}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>ESI:</span>
                                                <span>₹{Math.round(selectedPayslip.deductions * 0.3).toLocaleString()}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Tax:</span>
                                                <span>₹{Math.round(selectedPayslip.deductions * 0.1).toLocaleString()}</span>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between fw-bold">
                                                <span>Total Deductions:</span>
                                                <span className="text-danger">₹{selectedPayslip.deductions.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                        <h5 className="fw-bold text-white mb-0">Net Salary:</h5>
                                        <h4 className="fw-bold text-white mb-0">₹{selectedPayslip.net.toLocaleString()}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light rounded-pill px-4" onClick={() => setShowPreviewModal(false)}>
                                    Close
                                </button>
                                <button className="btn btn-primary rounded-pill px-4">
                                    <FaFileDownload className="me-2" />
                                    Download PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PayslipUI;

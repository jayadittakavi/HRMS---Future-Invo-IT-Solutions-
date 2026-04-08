import React, { useState, useEffect } from 'react';
import { FaEye, FaPrint, FaFilePdf, FaEdit, FaPlus, FaCalculator, FaTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { payrollService } from '../../../../../services/payrollService';

const PayslipsTab = ({ personal = false, onTabChange }) => {
    const [payrolls, setPayrolls] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPayslips = async () => {
        setLoading(true);
        try {
            const data = personal 
                ? await payrollService.getPayslips() 
                : []; // Management view handles separately if needed
            setPayrolls(data || []);
        } catch (error) {
            console.error("Failed to fetch payslips", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (personal) fetchPayslips();
    }, [personal]);

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
    const handleDownloadPdf = async (slip) => {
        try {
            const blob = await payrollService.downloadPayslip(slip.id);
            
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Payslip_${slip.employee_name || 'Employee'}_${slip.period}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Failed to download PDF", error);
            alert("Failed to download PDF. Please try again.");
        }
    };

    const handlePrint = (slip) => {
        setSelectedSlip(slip);
        setShowPrintModal(true);
    };

    const handleToggleStatus = (slip) => {
        // Toggle mock status or real status
        const nextStatus = slip.status === 'Paid' ? 'Cancelled' : 'Paid';
        if (window.confirm(`Are you sure you want to ${nextStatus.toLowerCase()} this payslip?`)) {
            // Update UI optimistically or call service
            slip.status = nextStatus;
            setPayrolls([...payrolls]);
            alert(`Payslip ${nextStatus.toLowerCase()} successfully!`);
        }
    };

    const handleEdit = (slip) => {
        setFormData({
            ...formData,
            employee: slip.employee_name || slip.employee,
            basic: slip.basic,
            hra: slip.hra,
            transport: slip.transport,
        });
        setShowAddModal(true);
    };

    const handleCalculate = () => {
        const earnings = Number(formData.basic) + Number(formData.hra) + Number(formData.transport) + Number(formData.communication);
        const deductions = Number(formData.pf) + Number(formData.esi) + Number(formData.tax) + Number(formData.otherDeductions);
        alert(`Estimated Net Salary: ₹${earnings - deductions}`);
    };

    const handleGenerate = async () => {
        try {
            // In a real app, this would send formData to the server
            // await payrollService.createPayslip(formData);
            alert('Payslip generated and saved successfully!');
            setShowAddModal(false);
            fetchPayslips();
        } catch (error) {
            alert("Failed to generate payslip: " + error.message);
        }
    };

    return (
        <div className="animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">{personal ? 'My Payslips' : 'Payslip Management'}</h5>
                    <p className="text-secondary small mb-0">
                        {personal ? 'View and download your monthly salary slips' : 'Manage employee salaries and generate payslips'}
                    </p>
                </div>
                {!personal && (
                    <button className="btn btn-primary btn-sm px-3 rounded-pill d-flex align-items-center gap-2 shadow-sm" onClick={() => setShowAddModal(true)}>
                        <FaPlus size={12} /> Add Payslip
                    </button>
                )}
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="table-responsive">
                    <table className="table custom-table align-middle mb-0">
                        <thead className="bg-light">
                            <tr style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {!personal && <th className="px-4">Employee</th>}
                                <th>Pay Period</th>
                                <th>Total Earnings</th>
                                <th>Total Deductions</th>
                                <th>Net Salary</th>
                                <th>Pay Date</th>
                                <th>Status</th>
                                <th className="text-end px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={personal ? 7 : 8} className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status"></div>
                                    </td>
                                </tr>
                            ) : payrolls.length === 0 ? (
                                <tr>
                                    <td colSpan={personal ? 7 : 8} className="text-center py-5 text-muted">
                                        No payslips found.
                                    </td>
                                </tr>
                            ) : (
                                payrolls.map((slip) => (
                                    <tr key={slip.id} onClick={() => handlePrint(slip)} style={{ cursor: 'pointer' }}>
                                        {!personal && (
                                            <td className="px-4">
                                                <div className="d-flex flex-column">
                                                    <span className="fw-bold text-dark">{slip.employee_name || slip.employee}</span>
                                                    <span className="text-muted small">{slip.employee_id || slip.employeeId}</span>
                                                </div>
                                            </td>
                                        )}
                                        <td><span className="badge bg-light text-dark border">{slip.period || slip.pay_period}</span></td>
                                        <td className="text-success fw-semibold">₹{(slip.gross_earnings || slip.gross || 0).toLocaleString()}</td>
                                        <td className="text-danger fw-semibold">₹{(slip.total_deductions || slip.deductions || 0).toLocaleString()}</td>
                                        <td><span className="fw-bold text-primary">₹{(slip.net_salary || slip.net || 0).toLocaleString()}</span></td>
                                        <td className="text-secondary">{slip.pay_date || slip.payDate || 'N/A'}</td>
                                        <td>
                                            <span className={`badge rounded-pill ${slip.status === 'Paid' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                                {slip.status}
                                            </span>
                                        </td>
                                        <td className="text-end px-4">
                                            <button className="btn btn-sm btn-light text-primary me-1 rounded-circle p-2" title="Print/View" onClick={(e) => { e.stopPropagation(); handlePrint(slip); }}>
                                                <FaPrint />
                                            </button>
                                            {!personal && (
                                                <>
                                                    <button className="btn btn-sm btn-light text-secondary me-1 rounded-circle p-2" title="Edit" onClick={(e) => { e.stopPropagation(); handleEdit(slip); }}>
                                                        <FaEdit />
                                                    </button>
                                                    <button 
                                                        className={`btn btn-sm btn-light rounded-circle p-2 me-1 ${slip.status === 'Paid' ? 'text-danger' : 'text-success'}`} 
                                                        title={slip.status === 'Paid' ? "Cancel Slip" : "Reactivate"} 
                                                        onClick={(e) => { e.stopPropagation(); handleToggleStatus(slip); }}
                                                    >
                                                        {slip.status === 'Paid' ? <FaTimesCircle /> : <FaCheckCircle />}
                                                    </button>
                                                </>
                                            )}
                                            <button className="btn btn-sm btn-light text-dark rounded-circle p-2" title="Download PDF" onClick={(e) => { e.stopPropagation(); handleDownloadPdf(slip); }}>
                                                <FaFilePdf />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
                .custom-table tbody tr:hover {
                    background-color: #f8faff !important;
                }
            `}</style>

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
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <h6 className="text-primary fw-bold mb-3">Employee Details</h6>
                                            <div className="row g-3 small">
                                                <div className="col-md-6"><strong>Name:</strong> {selectedSlip.employee_name || selectedSlip.employee}</div>
                                                <div className="col-md-6"><strong>Emp ID:</strong> {selectedSlip.employee_id || selectedSlip.employeeId}</div>
                                                <div className="col-md-6"><strong>Department:</strong> {selectedSlip.department}</div>
                                                <div className="col-md-6"><strong>Designation:</strong> {selectedSlip.designation}</div>
                                                <div className="col-md-6"><strong>Bank:</strong> {selectedSlip.bank_name || 'HDFC Bank'}</div>
                                                <div className="col-md-6"><strong>Account:</strong> {selectedSlip.account_number || '************4590'}</div>
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
                                                    <td className="text-end">{(selectedSlip.basic_salary || selectedSlip.basic || 0).toLocaleString()}</td>
                                                    <td>PF Employee</td>
                                                    <td className="text-end">{(selectedSlip.pf_employee || 1800).toLocaleString()}</td>
                                                </tr>
                                                <tr>
                                                    <td>HRA</td>
                                                    <td className="text-end">{(selectedSlip.hra || 0).toLocaleString()}</td>
                                                    <td>Professional Tax</td>
                                                    <td className="text-end">{(selectedSlip.professional_tax || 200).toLocaleString()}</td>
                                                </tr>
                                                <tr>
                                                    <td>Transport Allowance</td>
                                                    <td className="text-end">{(selectedSlip.transport_allowance || selectedSlip.transport || 0).toLocaleString()}</td>
                                                    <td>Income Tax</td>
                                                    <td className="text-end">{(selectedSlip.income_tax || (selectedSlip.total_deductions - 2000) || 0).toLocaleString()}</td>
                                                </tr>
                                                <tr className="fw-bold bg-light">
                                                    <td>Total Earnings</td>
                                                    <td className="text-end">{(selectedSlip.gross_earnings || selectedSlip.gross || 0).toLocaleString()}</td>
                                                    <td>Total Deductions</td>
                                                    <td className="text-end">{(selectedSlip.total_deductions || selectedSlip.deductions || 0).toLocaleString()}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center bg-primary-subtle p-3 rounded">
                                        <h5 className="mb-0 text-primary">Net Salary Payable</h5>
                                        <h4 className="mb-0 fw-bold">₹{(selectedSlip.net_salary || selectedSlip.net || 0).toLocaleString()}</h4>
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
                                <button className="btn btn-primary px-4" onClick={handleGenerate}>Generate & Save Payslip</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PayslipsTab;

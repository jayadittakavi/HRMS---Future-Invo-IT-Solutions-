import React, { useState } from 'react';
import { FaPlus, FaCalculator, FaFileDownload, FaCheckCircle, FaClock } from 'react-icons/fa';

const FandFUI = () => {
    const [fandfRecords, setFandfRecords] = useState([
        {
            id: 1,
            employeeId: 'EMP005',
            name: 'David Wilson',
            relievingDate: '2026-02-28',
            lastWorkingDay: '2026-02-28',
            pendingSalary: 75000,
            gratuity: 125000,
            leaveEncashment: 45000,
            bonus: 30000,
            deductions: 15000,
            netAmount: 260000,
            status: 'Pending Approval'
        },
        {
            id: 2,
            employeeId: 'EMP012',
            name: 'Emma Brown',
            relievingDate: '2026-01-31',
            lastWorkingDay: '2026-01-31',
            pendingSalary: 65000,
            gratuity: 95000,
            leaveEncashment: 35000,
            bonus: 25000,
            deductions: 10000,
            netAmount: 210000,
            status: 'Processed'
        }
    ]);

    const [showModal, setShowModal] = useState(false);

    const stats = {
        total: fandfRecords.length,
        pending: fandfRecords.filter(r => r.status === 'Pending Approval').length,
        processed: fandfRecords.filter(r => r.status === 'Processed').length,
        totalAmount: fandfRecords.reduce((sum, r) => sum + r.netAmount, 0)
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Full & Final Settlement</h5>
                    <p className="text-muted small mb-0">Manage F&F settlements for exiting employees</p>
                </div>
                <button className="btn btn-primary btn-sm rounded-pill px-3" onClick={() => setShowModal(true)}>
                    <FaPlus className="me-2" />
                    Calculate F&F
                </button>
            </div>

            {/* Stats */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Total Cases</h6>
                            <h3 className="fw-bold mb-0">{stats.total}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Pending Approval</h6>
                            <h3 className="fw-bold mb-0">{stats.pending}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Processed</h6>
                            <h3 className="fw-bold mb-0">{stats.processed}</h3>
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

            {/* Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Employee</th>
                                    <th className="border-0 py-3">Relieving Date</th>
                                    <th className="border-0 py-3">Pending Salary</th>
                                    <th className="border-0 py-3">Gratuity</th>
                                    <th className="border-0 py-3">Leave Encashment</th>
                                    <th className="border-0 py-3">Deductions</th>
                                    <th className="border-0 py-3">Net Amount</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fandfRecords.map(record => (
                                    <tr key={record.id}>
                                        <td className="px-4">
                                            <div>
                                                <div className="fw-bold text-dark">{record.name}</div>
                                                <small className="text-muted">{record.employeeId}</small>
                                            </div>
                                        </td>
                                        <td className="text-secondary small">{record.relievingDate}</td>
                                        <td className="text-secondary">₹{record.pendingSalary.toLocaleString()}</td>
                                        <td className="text-primary">₹{record.gratuity.toLocaleString()}</td>
                                        <td className="text-info">₹{record.leaveEncashment.toLocaleString()}</td>
                                        <td className="text-danger">₹{record.deductions.toLocaleString()}</td>
                                        <td className="fw-bold text-success">₹{record.netAmount.toLocaleString()}</td>
                                        <td>
                                            <span className={`badge ${record.status === 'Processed' ? 'bg-success' : 'bg-warning text-dark'} bg-opacity-10`}>
                                                {record.status === 'Processed' ? <FaCheckCircle className="me-1" size={10} /> : <FaClock className="me-1" size={10} />}
                                                {record.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm btn-outline-primary rounded-circle" title="Download">
                                                    <FaFileDownload size={12} />
                                                </button>
                                                {record.status === 'Pending Approval' && (
                                                    <button className="btn btn-sm btn-outline-success rounded-circle" title="Approve">
                                                        <FaCheckCircle size={12} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Calculate Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">Calculate F&F Settlement</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">Employee ID</label>
                                        <input type="text" className="form-control" placeholder="EMP001" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">Relieving Date</label>
                                        <input type="date" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">Pending Salary</label>
                                        <input type="number" className="form-control" placeholder="75000" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">Gratuity</label>
                                        <input type="number" className="form-control" placeholder="125000" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">Leave Encashment</label>
                                        <input type="number" className="form-control" placeholder="45000" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">Bonus</label>
                                        <input type="number" className="form-control" placeholder="30000" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">Deductions</label>
                                        <input type="number" className="form-control" placeholder="15000" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">Notice Period Recovery</label>
                                        <input type="number" className="form-control" placeholder="0" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light rounded-pill px-4" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary rounded-pill px-4">
                                    <FaCalculator className="me-2" />
                                    Calculate & Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FandFUI;

import React, { useState } from 'react';
import { FaPlus, FaFileDownload, FaEnvelope, FaEye } from 'react-icons/fa';

const LetterUI = () => {
    const [letters, setLetters] = useState([
        {
            id: 1,
            employeeId: 'EMP001',
            name: 'Alice Johnson',
            letterType: 'Salary Increment',
            oldSalary: 70000,
            newSalary: 75000,
            effectiveDate: '2026-03-01',
            status: 'Generated',
            generatedDate: '2026-02-15'
        },
        {
            id: 2,
            employeeId: 'EMP003',
            name: 'Charlie Davis',
            letterType: 'Salary Revision',
            oldSalary: 50000,
            newSalary: 53500,
            effectiveDate: '2026-03-01',
            status: 'Sent',
            generatedDate: '2026-02-15'
        }
    ]);

    const [showModal, setShowModal] = useState(false);

    const stats = {
        total: letters.length,
        generated: letters.filter(l => l.status === 'Generated').length,
        sent: letters.filter(l => l.status === 'Sent').length
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Payroll Letters</h5>
                    <p className="text-muted small mb-0">Generate salary increment and revision letters</p>
                </div>
                <button className="btn btn-primary btn-sm rounded-pill px-3" onClick={() => setShowModal(true)}>
                    <FaPlus className="me-2" />
                    Generate Letter
                </button>
            </div>

            {/* Stats */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Total Letters</h6>
                            <h3 className="fw-bold mb-0">{stats.total}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Generated</h6>
                            <h3 className="fw-bold mb-0">{stats.generated}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Sent</h6>
                            <h3 className="fw-bold mb-0">{stats.sent}</h3>
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
                                    <th className="border-0 py-3">Letter Type</th>
                                    <th className="border-0 py-3">Old Salary</th>
                                    <th className="border-0 py-3">New Salary</th>
                                    <th className="border-0 py-3">Effective Date</th>
                                    <th className="border-0 py-3">Generated Date</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {letters.map(letter => (
                                    <tr key={letter.id}>
                                        <td className="px-4">
                                            <div>
                                                <div className="fw-bold text-dark">{letter.name}</div>
                                                <small className="text-muted">{letter.employeeId}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-primary bg-opacity-10 text-primary">
                                                {letter.letterType}
                                            </span>
                                        </td>
                                        <td className="text-secondary">₹{letter.oldSalary.toLocaleString()}</td>
                                        <td className="fw-bold text-success">₹{letter.newSalary.toLocaleString()}</td>
                                        <td className="text-secondary small">{letter.effectiveDate}</td>
                                        <td className="text-secondary small">{letter.generatedDate}</td>
                                        <td>
                                            <span className={`badge ${letter.status === 'Sent' ? 'bg-success' : 'bg-warning text-dark'} bg-opacity-10`}>
                                                {letter.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm btn-outline-secondary rounded-circle" title="Preview">
                                                    <FaEye size={12} />
                                                </button>
                                                <button className="btn btn-sm btn-outline-primary rounded-circle" title="Download">
                                                    <FaFileDownload size={12} />
                                                </button>
                                                <button className="btn btn-sm btn-outline-success rounded-circle" title="Send Email">
                                                    <FaEnvelope size={12} />
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

            {/* Generate Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">Generate Payroll Letter</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label small text-muted fw-bold">Employee ID</label>
                                        <input type="text" className="form-control" placeholder="EMP001" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small text-muted fw-bold">Letter Type</label>
                                        <select className="form-select">
                                            <option>Salary Increment</option>
                                            <option>Salary Revision</option>
                                            <option>Promotion with Increment</option>
                                            <option>Annual Increment</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">Old Salary</label>
                                        <input type="number" className="form-control" placeholder="70000" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted fw-bold">New Salary</label>
                                        <input type="number" className="form-control" placeholder="75000" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small text-muted fw-bold">Effective Date</label>
                                        <input type="date" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light rounded-pill px-4" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary rounded-pill px-4">
                                    Generate Letter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LetterUI;

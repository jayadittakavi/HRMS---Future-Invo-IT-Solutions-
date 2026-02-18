import React, { useState } from 'react';
import { FaPlus, FaFileDownload, FaEye, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const Form16UI = () => {
    const [form16Records, setForm16Records] = useState([
        {
            id: 1,
            employeeId: 'EMP001',
            name: 'Alice Johnson',
            financialYear: '2025-26',
            totalIncome: 960000,
            taxDeducted: 85000,
            taxPaid: 85000,
            status: 'Generated',
            generatedDate: '2026-02-15'
        },
        {
            id: 2,
            employeeId: 'EMP002',
            name: 'Bob Smith',
            financialYear: '2025-26',
            totalIncome: 900000,
            taxDeducted: 75000,
            taxPaid: 75000,
            status: 'Sent',
            generatedDate: '2026-02-15'
        }
    ]);

    const [selectedFY, setSelectedFY] = useState('2025-26');

    const stats = {
        total: form16Records.length,
        generated: form16Records.filter(r => r.status === 'Generated').length,
        sent: form16Records.filter(r => r.status === 'Sent').length,
        totalTax: form16Records.reduce((sum, r) => sum + r.taxDeducted, 0)
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Form-16 Management</h5>
                    <p className="text-muted small mb-0">Generate and distribute Form-16 for employees</p>
                </div>
                <div className="d-flex gap-2">
                    <select className="form-select form-select-sm" style={{ width: 'auto' }} value={selectedFY} onChange={e => setSelectedFY(e.target.value)}>
                        <option>2025-26</option>
                        <option>2024-25</option>
                        <option>2023-24</option>
                    </select>
                    <button className="btn btn-primary btn-sm rounded-pill px-3">
                        <FaPlus className="me-2" />
                        Generate Form-16
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Total Forms</h6>
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
                            <h6 className="small mb-2 opacity-75">Sent</h6>
                            <h3 className="fw-bold mb-0">{stats.sent}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                        <div className="card-body text-white">
                            <h6 className="small mb-2 opacity-75">Total Tax Deducted</h6>
                            <h3 className="fw-bold mb-0">₹{stats.totalTax.toLocaleString()}</h3>
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
                                    <th className="border-0 py-3">Financial Year</th>
                                    <th className="border-0 py-3">Total Income</th>
                                    <th className="border-0 py-3">Tax Deducted</th>
                                    <th className="border-0 py-3">Generated Date</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {form16Records.map(record => (
                                    <tr key={record.id}>
                                        <td className="px-4">
                                            <div>
                                                <div className="fw-bold text-dark">{record.name}</div>
                                                <small className="text-muted">{record.employeeId}</small>
                                            </div>
                                        </td>
                                        <td className="text-secondary">{record.financialYear}</td>
                                        <td className="fw-bold text-primary">₹{record.totalIncome.toLocaleString()}</td>
                                        <td className="fw-bold text-danger">₹{record.taxDeducted.toLocaleString()}</td>
                                        <td className="text-secondary small">{record.generatedDate}</td>
                                        <td>
                                            <span className={`badge ${record.status === 'Sent' ? 'bg-success' : 'bg-warning text-dark'} bg-opacity-10`}>
                                                <FaCheckCircle className="me-1" size={10} />
                                                {record.status}
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
        </div>
    );
};

export default Form16UI;

import React, { useState } from 'react';
import { FaShieldAlt, FaHistory, FaLock } from 'react-icons/fa';

const PolicyAudit = () => {
    const [retentionPeriod, setRetentionPeriod] = useState(5);

    const auditLogs = [
        { id: 1, action: 'Grace Time Changed', oldValue: '10 min', newValue: '15 min', changedBy: 'Super Admin', date: '2025-10-01' },
        { id: 2, action: 'Policy Override', oldValue: 'Allowed', newValue: 'Restricted', changedBy: 'System', date: '2025-09-28' },
        { id: 3, action: 'Shift Update', oldValue: '9-6', newValue: '9-5', changedBy: 'Super Admin', date: '2025-09-25' },
    ];

    return (
        <div className="container-fluid p-4">
            <h4 className="fw-bold mb-4">Audit & Compliance</h4>

            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white border-0 pt-4 px-4">
                            <h5 className="fw-bold d-flex align-items-center gap-2">
                                <FaShieldAlt className="text-danger" /> Policy Control
                            </h5>
                        </div>
                        <div className="card-body px-4">
                            <div className="mb-3">
                                <label className="form-label fw-bold small text-muted">Data Retention Period (Years)</label>
                                <input
                                    type="number"
                                    className="form-control bg-light border-0"
                                    value={retentionPeriod}
                                    onChange={(e) => setRetentionPeriod(e.target.value)}
                                />
                            </div>
                            <div className="form-check form-switch p-3 bg-light rounded-3 d-flex justify-content-between align-items-center mb-3">
                                <label className="form-check-label fw-bold" htmlFor="orgCustom">Allow Org-Level Customization</label>
                                <input className="form-check-input ms-0" type="checkbox" id="orgCustom" />
                            </div>
                            <div className="form-check form-switch p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                                <label className="form-check-label fw-bold d-flex align-items-center gap-2" htmlFor="lockRules">
                                    <FaLock className="text-secondary" /> Lock Core Rules
                                </label>
                                <input className="form-check-input ms-0" type="checkbox" id="lockRules" defaultChecked />
                            </div>

                            <hr className="my-4 text-muted opacity-25" />

                            <h6 className="fw-bold text-muted small text-uppercase mb-3">Edit Restrictions</h6>
                            <div className="form-check form-switch p-0 d-flex justify-content-between align-items-center mb-2">
                                <label className="form-check-label small fw-bold">Mandatory Reason for Edits</label>
                                <input className="form-check-input ms-0" type="checkbox" defaultChecked />
                            </div>
                            <div className="form-check form-switch p-0 d-flex justify-content-between align-items-center mb-2">
                                <label className="form-check-label small fw-bold">Allow Backdated Entries</label>
                                <input className="form-check-input ms-0" type="checkbox" />
                            </div>
                            <div className="form-check form-switch p-0 d-flex justify-content-between align-items-center">
                                <label className="form-check-label small fw-bold">Auto-Reject Unapproved OTs</label>
                                <input className="form-check-input ms-0" type="checkbox" defaultChecked />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100 bg-primary text-white">
                        <div className="card-body p-4 d-flex flex-column justify-content-center text-center">
                            <FaHistory size={40} className="mb-3 mx-auto opacity-75" />
                            <h3>Audit Trail Active</h3>
                            <p className="opacity-75">All changes to attendance policies are being logged securely.</p>
                            <button className="btn btn-light text-primary rounded-pill fw-bold mt-2 align-self-center px-4">Download Full Report</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-header bg-white border-0 pt-4 px-4">
                    <h5 className="fw-bold">Recent Output Logs</h5>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4 border-0 text-secondary small text-uppercase">Action</th>
                                    <th className="border-0 text-secondary small text-uppercase">Old Value</th>
                                    <th className="border-0 text-secondary small text-uppercase">New Value</th>
                                    <th className="border-0 text-secondary small text-uppercase">Changed By</th>
                                    <th className="border-0 text-secondary small text-uppercase">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditLogs.map(log => (
                                    <tr key={log.id}>
                                        <td className="ps-4 fw-bold">{log.action}</td>
                                        <td className="text-muted"><del>{log.oldValue}</del></td>
                                        <td className="text-success fw-bold">{log.newValue}</td>
                                        <td><span className="badge bg-light text-dark border">{log.changedBy}</span></td>
                                        <td className="text-muted small">{log.date}</td>
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

export default PolicyAudit;

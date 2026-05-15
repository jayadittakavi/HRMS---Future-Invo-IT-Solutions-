import React from 'react';

const VisitorApprovals = ({ visitors, onAction, getStatusBadge }) => {
    return (
        <div className="table-responsive">
            <table className="table border-0 mb-0 align-middle">
                <thead className="bg-light">
                    <tr className="small text-secondary fw-bold text-uppercase">
                        <th className="px-4 py-3 border-0">Visitor</th>
                        <th className="py-3 border-0">Purpose</th>
                        <th className="py-3 border-0">Host / Meeting With</th>
                        <th className="py-3 border-0">Time</th>
                        <th className="py-3 border-0">Status</th>
                        <th className="pe-4 py-3 border-0 text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map(v => (
                        <tr key={v.id} className="border-bottom-light">
                            <td className="px-4 py-3">
                                <div className="fw-bold">{v.name}</div>
                                <div className="text-muted small">{v.company}</div>
                            </td>
                            <td className="py-3 small fw-medium">{v.purpose}</td>
                            <td className="py-3">
                                <div className="fw-bold small">{v.host}</div>
                                <div className="text-muted" style={{ fontSize: '0.7rem' }}>{v.date}</div>
                            </td>
                            <td className="py-3 small">{v.time}</td>
                            <td className="py-3">{getStatusBadge(v.status)}</td>
                            <td className="pe-4 py-3 text-end">
                                <div className="d-flex justify-content-end gap-2">
                                    <button className="btn btn-sm btn-success rounded-pill px-3" onClick={() => onAction(v.id, 'Approved')}>Approve</button>
                                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => onAction(v.id, 'Rejected')}>Reject</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {visitors.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-5 text-muted small">No pending approvals found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VisitorApprovals;

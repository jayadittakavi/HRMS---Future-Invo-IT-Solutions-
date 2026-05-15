import React from 'react';
import { MdLogin, MdLogout, MdPrint } from 'react-icons/md';

const VisitorRequest = ({ visitors, onAction, onPrint, getStatusBadge }) => {
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
                                    {v.status === 'Approved' && (
                                        <button className="btn btn-sm btn-primary rounded-pill px-3 d-flex align-items-center gap-1" onClick={() => onAction(v.id, 'Checked-In')}>
                                            <MdLogin /> Check-In
                                        </button>
                                    )}
                                    {v.status === 'Checked-In' && (
                                        <button className="btn btn-sm btn-danger rounded-pill px-3 d-flex align-items-center gap-1" onClick={() => onAction(v.id, 'Checked-Out')}>
                                            <MdLogout /> Check-Out
                                        </button>
                                    )}
                                    <button className="btn btn-light btn-sm border-0 rounded-circle" title="Print Pass" onClick={() => onPrint(v.id)}><MdPrint /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {visitors.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-5 text-muted small">No visitor requests found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VisitorRequest;

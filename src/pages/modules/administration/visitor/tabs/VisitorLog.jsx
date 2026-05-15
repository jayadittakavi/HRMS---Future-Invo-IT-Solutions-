import React from 'react';
import { MdPrint } from 'react-icons/md';

const VisitorLog = ({ visitors, onPrint, getStatusBadge }) => {
    return (
        <div className="table-responsive">
            <table className="table border-0 mb-0 align-middle">
                <thead className="bg-light">
                    <tr className="small text-secondary fw-bold text-uppercase">
                        <th className="px-4 py-3 border-0">Visitor</th>
                        <th className="py-3 border-0">Purpose</th>
                        <th className="py-3 border-0">Host / Meeting With</th>
                        <th className="py-3 border-0">Check In/Out</th>
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
                            <td className="py-3 small">
                                <div>{v.check_in || v.time}</div>
                                <div className="text-muted">{v.check_out || '--'}</div>
                            </td>
                            <td className="py-3">{getStatusBadge(v.status)}</td>
                            <td className="pe-4 py-3 text-end">
                                <button className="btn btn-light btn-sm border-0 rounded-circle" title="Print Pass" onClick={() => onPrint(v.id)}><MdPrint /></button>
                            </td>
                        </tr>
                    ))}
                    {visitors.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-5 text-muted small">No visitor logs found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VisitorLog;

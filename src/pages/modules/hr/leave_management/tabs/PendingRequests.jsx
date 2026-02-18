import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PendingRequests = () => {
    // Mock Data
    const [requests, setRequests] = useState([
        { id: 1, name: 'John Doe', type: 'Sick Leave', from: '2025-02-20', to: '2025-02-21', reason: 'Fever' },
        { id: 2, name: 'Jane Smith', type: 'Casual Leave', from: '2025-02-25', to: '2025-02-25', reason: 'Personal work' },
    ]);

    const handleApprove = (id) => {
        alert(`Approved request ${id}`);
        setRequests(requests.filter(r => r.id !== id));
    };

    const handleReject = (id) => {
        const reason = prompt("Enter Rejection Reason:");
        if (reason) {
            alert(`Rejected request ${id} for reason: ${reason}`);
            setRequests(requests.filter(r => r.id !== id));
        }
    };

    return (
        <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0 fw-bold text-dark">Pending Approvals</h5>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th className="ps-4 text-secondary small fw-bold">Employee</th>
                            <th className="text-secondary small fw-bold">Leave Type</th>
                            <th className="text-secondary small fw-bold">Duration</th>
                            <th className="text-secondary small fw-bold">Reason</th>
                            <th className="text-secondary small fw-bold text-end pe-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 ? <tr><td colSpan="5" className="text-center p-4 text-muted">No pending requests.</td></tr> :
                            requests.map(req => (
                                <tr key={req.id}>
                                    <td className="ps-4 fw-medium">{req.name}</td>
                                    <td className="text-secondary">{req.type}</td>
                                    <td className="text-secondary small">{req.from} to {req.to}</td>
                                    <td className="text-secondary small text-truncate" style={{ maxWidth: '200px' }}>{req.reason}</td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-sm btn-success me-2" onClick={() => handleApprove(req.id)}><FaCheck /></button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleReject(req.id)}><FaTimes /></button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingRequests;

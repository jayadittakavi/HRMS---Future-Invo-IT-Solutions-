import React, { useState } from 'react';
import { MdCheckCircle, MdCancel } from 'react-icons/md';

const BulkApproval = () => {
    // Mock Data
    const requests = [
        { id: 1, name: 'John Doe', type: 'Sick Leave', reason: 'Viral Fever', date: '2025-02-20' },
        { id: 2, name: 'Alice Wonder', type: 'Sick Leave', reason: 'Viral Fever', date: '2025-02-20' },
        { id: 3, name: 'Bob Builder', type: 'Sick Leave', reason: 'Viral Fever', date: '2025-02-20' },
        { id: 4, name: 'Charlie', type: 'Casual Leave', reason: 'Family function', date: '2025-02-22' }
    ];

    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelect = (id) => {
        if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(sid => sid !== id));
        else setSelectedIds([...selectedIds, id]);
    };

    const handleBulkAction = (action) => {
        if (selectedIds.length === 0) return;
        const reason = action === 'Reject' ? prompt("Enter common rejection reason:") : '';
        if (action === 'Reject' && !reason) return;

        alert(`${action}ed ${selectedIds.length} requests${reason ? ` with reason: ${reason}` : ''}`);
        setSelectedIds([]);
    };

    return (
        <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold text-dark">Bulk Leave Approval</h5>
                <div className="btn-group">
                    <button className="btn btn-success btn-sm d-flex align-items-center gap-2" onClick={() => handleBulkAction('Approve')} disabled={selectedIds.length === 0}>
                        <MdCheckCircle /> Approve Selected
                    </button>
                    <button className="btn btn-danger btn-sm d-flex align-items-center gap-2" onClick={() => handleBulkAction('Reject')} disabled={selectedIds.length === 0}>
                        <MdCancel /> Reject Selected
                    </button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th className="ps-3" style={{ width: '50px' }}>
                                <input type="checkbox" className="form-check-input"
                                    checked={selectedIds.length === requests.length && requests.length > 0}
                                    onChange={() => setSelectedIds(selectedIds.length === requests.length ? [] : requests.map(r => r.id))}
                                />
                            </th>
                            <th className="text-secondary small fw-bold">Employee</th>
                            <th className="text-secondary small fw-bold">Type</th>
                            <th className="text-secondary small fw-bold">Date</th>
                            <th className="text-secondary small fw-bold">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req.id} className={selectedIds.includes(req.id) ? 'table-primary bg-opacity-10' : ''}>
                                <td className="ps-3">
                                    <input type="checkbox" className="form-check-input" checked={selectedIds.includes(req.id)} onChange={() => toggleSelect(req.id)} />
                                </td>
                                <td className="fw-medium">{req.name}</td>
                                <td className="text-secondary">{req.type}</td>
                                <td className="text-secondary small">{req.date}</td>
                                <td className="text-secondary small">{req.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BulkApproval;

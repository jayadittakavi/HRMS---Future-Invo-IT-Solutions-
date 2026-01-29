import React, { useState } from 'react';
import { FaCheck, FaTimes, FaCommentAlt } from 'react-icons/fa';

const Corrections = () => {
    const [requests, setRequests] = useState([
        { id: 1, name: 'Kiran Desai', type: 'Missed Punch', date: '2025-10-01', reason: 'Forgot ID card', status: 'Pending' },
        { id: 2, name: 'Rohit Mehta', type: 'Late Mark', date: '2025-10-02', reason: 'Traffic jam', status: 'Pending' },
    ]);

    const handleAction = (id, action) => {
        // Logic to approve/reject
        alert(`${action} request for ID ${id}`);
        setRequests(requests.filter(r => r.id !== id));
    };

    return (
        <div className="container-fluid p-4">
            <h4 className="fw-bold mb-4">Attendance Corrections</h4>

            <div className="row g-4">
                {requests.map(req => (
                    <div className="col-md-6" key={req.id}>
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between mb-3">
                                    <h5 className="fw-bold">{req.name}</h5>
                                    <span className="badge bg-warning text-dark">{req.status}</span>
                                </div>
                                <div className="mb-3">
                                    <p className="mb-1 text-muted small">Type: <strong className="text-dark">{req.type}</strong></p>
                                    <p className="mb-1 text-muted small">Date: <strong className="text-dark">{req.date}</strong></p>
                                    <div className="p-2 bg-light rounded mt-2 d-flex gap-2">
                                        <FaCommentAlt className="text-secondary mt-1" />
                                        <span className="small fst-italic">"{req.reason}"</span>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-success flex-grow-1 rounded-pill btn-sm d-flex justify-content-center align-items-center gap-2" onClick={() => handleAction(req.id, 'Approved')}>
                                        <FaCheck /> Approve
                                    </button>
                                    <button className="btn btn-danger flex-grow-1 rounded-pill btn-sm d-flex justify-content-center align-items-center gap-2" onClick={() => handleAction(req.id, 'Rejected')}>
                                        <FaTimes /> Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {requests.length === 0 && (
                    <div className="col-12 text-center text-muted py-5">
                        <p>No pending correction requests.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Corrections;

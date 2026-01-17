import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../components/DashboardLayout.css';

export const LeaveManagementContent = () => {
    // Mock Data
    const [leaveRequests, setLeaveRequests] = useState([
        { id: 1, employee: 'John Doe', type: 'Sick Leave', from: '2024-05-20', to: '2024-05-21', days: 2, status: 'Pending' },
        { id: 2, employee: 'Sarah Smith', type: 'Annual Leave', from: '2024-06-10', to: '2024-06-15', days: 5, status: 'Approved' },
        { id: 3, employee: 'Mike Ross', type: 'Casual Leave', from: '2024-05-01', to: '2024-05-01', days: 1, status: 'Rejected' },
    ]);

    // Modal States
    const [showApply, setShowApply] = useState(false);
    const [showApprove, setShowApprove] = useState(false);
    const [showReject, setShowReject] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Handlers
    const handleApprove = (req) => {
        setSelectedRequest(req);
        setShowApprove(true);
    };

    const handleReject = (req) => {
        setSelectedRequest(req);
        setShowReject(true);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Leave Management</h5>
                    <p className="text-secondary small mb-0">Review and manage employee leave requests</p>
                </div>
                <div>
                    <button className="btn btn-outline-primary btn-sm px-3 rounded-pill me-2">
                        Leave Policies
                    </button>
                    <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={() => setShowApply(true)}>
                        + Apply Leave
                    </button>
                </div>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Leave Type</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Days</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRequests.map((req) => (
                                <tr key={req.id}>
                                    <td><span className="fw-bold text-dark">{req.employee}</span></td>
                                    <td>{req.type}</td>
                                    <td>{req.from}</td>
                                    <td>{req.to}</td>
                                    <td>{req.days}</td>
                                    <td>
                                        <span className={`status-badge ${req.status === 'Approved' ? 'bg-success text-white' : req.status === 'Pending' ? 'bg-warning text-dark' : 'bg-danger text-white'}`} style={{ fontSize: '0.7rem' }}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn edit" onClick={() => handleApprove(req)}>Approve</button>
                                        <button className="action-btn delete" onClick={() => handleReject(req)}>Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Apply Leave Modal */}
            {showApply && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Apply for Leave</h5>
                                <button className="btn-close" onClick={() => setShowApply(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Leave Type</label>
                                        <select className="form-select">
                                            <option>Select Type</option>
                                            <option>Sick Leave</option>
                                            <option>Casual Leave</option>
                                            <option>Annual Leave</option>
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">From Date</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">To Date</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Reason</label>
                                        <textarea className="form-control" rows="2" placeholder="Enter reason"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowApply(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Submit Application</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Approve Confirmation Modal */}
            {showApprove && selectedRequest && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-success">Approve Leave</h5>
                                <button className="btn-close" onClick={() => setShowApprove(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to approve leave for <strong>{selectedRequest.employee}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowApprove(false)}>Cancel</button>
                                <button className="btn btn-success btn-sm">Approve</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Confirmation Modal */}
            {showReject && selectedRequest && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Reject Leave</h5>
                                <button className="btn-close" onClick={() => setShowReject(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to reject leave for <strong>{selectedRequest.employee}</strong>?</p>
                                <textarea className="form-control mt-2" placeholder="Reason for rejection (optional)"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowReject(false)}>Cancel</button>
                                <button className="btn btn-danger btn-sm">Reject</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const LeaveManagement = () => {
    return (
        <DashboardLayout title="">
            <LeaveManagementContent />
        </DashboardLayout>
    );
};

export default LeaveManagement;

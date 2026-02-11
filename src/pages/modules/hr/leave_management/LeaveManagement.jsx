import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";
import { useAuth } from '../../../../context/AuthContext';

export const LeaveManagementContent = ({ personal = false }) => {
    // Mock Data - Admin
    const { user } = useAuth();
    const [adminLeaveRequests] = useState([
        { id: 1, employee: 'John Doe', type: 'Sick Leave', from: '2024-05-20', to: '2024-05-21', days: 2, status: 'Pending' },
        { id: 2, employee: 'Sarah Smith', type: 'Annual Leave', from: '2024-06-10', to: '2024-06-15', days: 5, status: 'Approved' },
        { id: 3, employee: 'Mike Ross', type: 'Casual Leave', from: '2024-05-01', to: '2024-05-01', days: 1, status: 'Rejected' },
    ]);

    // Mock Data - Personal
    const [personalLeaveRequests] = useState([
        { id: 101, type: 'Annual Leave', from: '2024-06-20', to: '2024-06-25', days: 5, status: 'Approved' },
        { id: 102, type: 'Sick Leave', from: '2024-05-15', to: '2024-05-16', days: 2, status: 'Approved' },
        { id: 103, type: 'Casual Leave', from: '2024-04-10', to: '2024-04-10', days: 1, status: 'Rejected' },
    ]);

    const leaveRequests = personal ? personalLeaveRequests : adminLeaveRequests;

    // Modal States
    const [showApply, setShowApply] = useState(false);
    const [showApprove, setShowApprove] = useState(false);
    const [showReject, setShowReject] = useState(false);
    const [showPolicies, setShowPolicies] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');

    // Handlers
    const handleApprove = (req) => {
        setSelectedRequest(req);
        setShowApprove(true);
    };

    const handleReject = (req) => {
        setSelectedRequest(req);
        setRejectionReason('');
        setShowReject(true);
    };

    const confirmApproval = () => {
        console.log('Approving leave for:', selectedRequest.employee);
        // TODO: API call to approve leave
        // Send approval notification
        alert(`Leave approved for ${selectedRequest.employee}. Notification sent.`);
        setShowApprove(false);
        setSelectedRequest(null);
    };

    const confirmRejection = () => {
        if (!selectedRequest) return;

        console.log('Rejecting leave for:', selectedRequest.employee);
        console.log('Rejection reason:', rejectionReason);

        // TODO: API call to reject leave and send notification
        const notificationMessage = rejectionReason
            ? `Your leave request from ${selectedRequest.from} to ${selectedRequest.to} has been rejected. Reason: ${rejectionReason}`
            : `Your leave request from ${selectedRequest.from} to ${selectedRequest.to} has been rejected.`;

        // Simulate sending notification
        console.log('Sending notification to:', selectedRequest.employee);
        console.log('Notification message:', notificationMessage);

        alert(`Leave rejected for ${selectedRequest.employee}.\nRejection notification sent to employee.`);

        setShowReject(false);
        setSelectedRequest(null);
        setRejectionReason('');
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">{personal ? 'My Leaves' : 'Leave Management'}</h5>
                    <p className="text-secondary small mb-0">{personal ? 'View your leave history and application status' : 'Review and manage employee leave requests'}</p>
                </div>
                <div>
                    {!personal && (
                        <button className="btn btn-outline-primary btn-sm px-3 rounded-pill me-2" onClick={() => setShowPolicies(true)}>
                            Leave Policies
                        </button>
                    )}
                    {(!personal && user?.role !== 'superadmin') && (
                        <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={() => setShowApply(true)}>
                            + Apply Leave
                        </button>
                    )}
                </div>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                {!personal && <th>Employee</th>}
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
                                    {!personal && <td><span className="fw-bold text-dark">{req.employee}</span></td>}
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
                                        {!personal ? (
                                            <>
                                                <button className="action-btn edit" onClick={() => handleApprove(req)} style={{ fontSize: '0.8rem' }}>Approve</button>
                                                <button className="action-btn delete" onClick={() => handleReject(req)} style={{ fontSize: '0.8rem' }}>Reject</button>
                                            </>
                                        ) : (
                                            <button className="btn btn-link text-muted p-0" style={{ fontSize: '0.8rem', textDecoration: 'none' }}>View Details</button>
                                        )}
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
                                <button className="btn btn-success btn-sm" onClick={confirmApproval}>Approve</button>
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
                                <textarea
                                    className="form-control mt-2"
                                    placeholder="Reason for rejection (optional)"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowReject(false)}>Cancel</button>
                                <button className="btn btn-danger btn-sm" onClick={confirmRejection}>Reject</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Leave Policies Modal */}
            {showPolicies && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowPolicies(false)}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header bg-primary bg-opacity-10">
                                <h5 className="modal-title fw-bold text-primary">Company Leave Policies</h5>
                                <button className="btn-close" onClick={() => setShowPolicies(false)}></button>
                            </div>
                            <div className="modal-body">
                                {/* Leave Types Section */}
                                <div className="mb-4">
                                    <h6 className="fw-bold text-dark mb-3">Leave Types & Entitlements</h6>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-sm">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Leave Type</th>
                                                    <th>Annual Entitlement</th>
                                                    <th>Carry Forward</th>
                                                    <th>Notice Period</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><strong>Annual Leave</strong></td>
                                                    <td>20 days</td>
                                                    <td>5 days max</td>
                                                    <td>2 weeks</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Sick Leave</strong></td>
                                                    <td>12 days</td>
                                                    <td>Not allowed</td>
                                                    <td>Same day (with medical certificate)</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Casual Leave</strong></td>
                                                    <td>10 days</td>
                                                    <td>Not allowed</td>
                                                    <td>1 day</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Maternity Leave</strong></td>
                                                    <td>90 days</td>
                                                    <td>N/A</td>
                                                    <td>1 month</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Paternity Leave</strong></td>
                                                    <td>7 days</td>
                                                    <td>N/A</td>
                                                    <td>1 week</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* General Rules */}
                                <div className="mb-4">
                                    <h6 className="fw-bold text-dark mb-3">General Rules</h6>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <span className="badge bg-primary me-2">1</span>
                                            All leave requests must be submitted through the HRMS portal
                                        </li>
                                        <li className="mb-2">
                                            <span className="badge bg-primary me-2">2</span>
                                            Leave approval is subject to manager discretion and business needs
                                        </li>
                                        <li className="mb-2">
                                            <span className="badge bg-primary me-2">3</span>
                                            Medical certificate required for sick leave exceeding 2 consecutive days
                                        </li>
                                        <li className="mb-2">
                                            <span className="badge bg-primary me-2">4</span>
                                            Unused annual leave can be carried forward (max 5 days)
                                        </li>
                                        <li className="mb-2">
                                            <span className="badge bg-primary me-2">5</span>
                                            Emergency leave may be granted on a case-by-case basis
                                        </li>
                                    </ul>
                                </div>

                                {/* Application Process */}
                                <div className="mb-3">
                                    <h6 className="fw-bold text-dark mb-3">Application Process</h6>
                                    <div className="alert alert-info">
                                        <ol className="mb-0 ps-3">
                                            <li>Submit leave request through HRMS portal</li>
                                            <li>Manager reviews and approves/rejects request</li>
                                            <li>Employee receives notification of decision</li>
                                            <li>Approved leave is reflected in attendance records</li>
                                        </ol>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="alert alert-warning mb-0">
                                    <strong>Note:</strong> For special circumstances or questions about leave policies,
                                    please contact HR at <strong>hr@company.com</strong> or extension <strong>1234</strong>.
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary btn-sm" onClick={() => setShowPolicies(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const LeaveManagement = ({ personal = false }) => {
    return (
        <DashboardLayout title={personal ? "My Leaves" : "Leave Management"}>
            <LeaveManagementContent personal={personal} />
        </DashboardLayout>
    );
};

export default LeaveManagement;

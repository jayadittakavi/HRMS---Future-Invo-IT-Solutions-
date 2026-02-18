import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock, FaEye, FaDownload, FaFilter } from 'react-icons/fa';

const ApprovalUI = () => {
    const [approvals, setApprovals] = useState([
        {
            id: 1,
            letterType: 'Offer Letter',
            employeeName: 'Alice Johnson',
            employeeId: 'EMP001',
            requestedBy: 'HR Manager',
            requestDate: '2026-02-15',
            status: 'Pending',
            priority: 'High',
            department: 'Engineering'
        },
        {
            id: 2,
            letterType: 'Appointment Letter',
            employeeName: 'Bob Smith',
            employeeId: 'EMP002',
            requestedBy: 'Recruiter',
            requestDate: '2026-02-14',
            status: 'Approved',
            priority: 'Medium',
            department: 'Design',
            approvedBy: 'CEO',
            approvedDate: '2026-02-15'
        },
        {
            id: 3,
            letterType: 'Increment Letter',
            employeeName: 'Charlie Davis',
            employeeId: 'EMP003',
            requestedBy: 'Department Head',
            requestDate: '2026-02-13',
            status: 'Rejected',
            priority: 'Low',
            department: 'Marketing',
            rejectedBy: 'CFO',
            rejectedDate: '2026-02-14',
            rejectionReason: 'Budget constraints'
        },
        {
            id: 4,
            letterType: 'Relieving Letter',
            employeeName: 'Diana Prince',
            employeeId: 'EMP004',
            requestedBy: 'HR Executive',
            requestDate: '2026-02-16',
            status: 'Pending',
            priority: 'High',
            department: 'Operations'
        }
    ]);

    const [filterStatus, setFilterStatus] = useState('All');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedApproval, setSelectedApproval] = useState(null);

    const handleApprove = (id) => {
        setApprovals(approvals.map(a =>
            a.id === id ? {
                ...a,
                status: 'Approved',
                approvedBy: 'Current User',
                approvedDate: new Date().toISOString().split('T')[0]
            } : a
        ));
    };

    const handleReject = (id, reason) => {
        const rejectionReason = reason || prompt('Enter rejection reason:');
        if (rejectionReason) {
            setApprovals(approvals.map(a =>
                a.id === id ? {
                    ...a,
                    status: 'Rejected',
                    rejectedBy: 'Current User',
                    rejectedDate: new Date().toISOString().split('T')[0],
                    rejectionReason
                } : a
            ));
        }
    };

    const handleViewDetails = (approval) => {
        setSelectedApproval(approval);
        setShowDetailModal(true);
    };

    const filteredApprovals = filterStatus === 'All'
        ? approvals
        : approvals.filter(a => a.status === filterStatus);

    const stats = {
        total: approvals.length,
        pending: approvals.filter(a => a.status === 'Pending').length,
        approved: approvals.filter(a => a.status === 'Approved').length,
        rejected: approvals.filter(a => a.status === 'Rejected').length
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Letter Approval Workflow</h5>
                    <p className="text-muted small mb-0">Review and approve letter generation requests</p>
                </div>
                <div className="d-flex gap-2">
                    <select
                        className="form-select form-select-sm"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{ width: 'auto' }}
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                                    <FaClock size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Total Requests</h6>
                                    <h3 className="fw-bold mb-0">{stats.total}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-warning bg-opacity-10 text-warning rounded-circle p-3 me-3">
                                    <FaClock size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Pending Approval</h6>
                                    <h3 className="fw-bold mb-0">{stats.pending}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-success bg-opacity-10 text-success rounded-circle p-3 me-3">
                                    <FaCheckCircle size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Approved</h6>
                                    <h3 className="fw-bold mb-0">{stats.approved}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-danger bg-opacity-10 text-danger rounded-circle p-3 me-3">
                                    <FaTimesCircle size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Rejected</h6>
                                    <h3 className="fw-bold mb-0">{stats.rejected}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Approvals Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Letter Type</th>
                                    <th className="border-0 py-3">Employee</th>
                                    <th className="border-0 py-3">Department</th>
                                    <th className="border-0 py-3">Requested By</th>
                                    <th className="border-0 py-3">Request Date</th>
                                    <th className="border-0 py-3">Priority</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApprovals.map(approval => (
                                    <tr key={approval.id}>
                                        <td className="px-4">
                                            <span className="fw-bold text-dark">{approval.letterType}</span>
                                        </td>
                                        <td>
                                            <div>
                                                <div className="fw-bold text-dark">{approval.employeeName}</div>
                                                <small className="text-muted">{approval.employeeId}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                {approval.department}
                                            </span>
                                        </td>
                                        <td className="text-secondary small">{approval.requestedBy}</td>
                                        <td className="text-secondary small">{approval.requestDate}</td>
                                        <td>
                                            <span className={`badge ${approval.priority === 'High' ? 'bg-danger' :
                                                    approval.priority === 'Medium' ? 'bg-warning text-dark' :
                                                        'bg-secondary'
                                                }`}>
                                                {approval.priority}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${approval.status === 'Pending' ? 'bg-warning text-dark' :
                                                    approval.status === 'Approved' ? 'bg-success' :
                                                        'bg-danger'
                                                }`}>
                                                {approval.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary rounded-circle"
                                                    onClick={() => handleViewDetails(approval)}
                                                    title="View Details"
                                                >
                                                    <FaEye size={12} />
                                                </button>
                                                {approval.status === 'Pending' && (
                                                    <>
                                                        <button
                                                            className="btn btn-sm btn-outline-success rounded-circle"
                                                            onClick={() => handleApprove(approval.id)}
                                                            title="Approve"
                                                        >
                                                            <FaCheckCircle size={12} />
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger rounded-circle"
                                                            onClick={() => handleReject(approval.id)}
                                                            title="Reject"
                                                        >
                                                            <FaTimesCircle size={12} />
                                                        </button>
                                                    </>
                                                )}
                                                {approval.status === 'Approved' && (
                                                    <button
                                                        className="btn btn-sm btn-outline-primary rounded-circle"
                                                        title="Download"
                                                    >
                                                        <FaDownload size={12} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedApproval && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">Approval Request Details</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDetailModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Letter Type</label>
                                        <p className="fw-bold text-dark mb-0">{selectedApproval.letterType}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Status</label>
                                        <p className="mb-0">
                                            <span className={`badge ${selectedApproval.status === 'Pending' ? 'bg-warning text-dark' :
                                                    selectedApproval.status === 'Approved' ? 'bg-success' :
                                                        'bg-danger'
                                                }`}>
                                                {selectedApproval.status}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Employee Name</label>
                                        <p className="fw-bold text-dark mb-0">{selectedApproval.employeeName}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Employee ID</label>
                                        <p className="text-dark mb-0">{selectedApproval.employeeId}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Department</label>
                                        <p className="text-dark mb-0">{selectedApproval.department}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Priority</label>
                                        <p className="mb-0">
                                            <span className={`badge ${selectedApproval.priority === 'High' ? 'bg-danger' :
                                                    selectedApproval.priority === 'Medium' ? 'bg-warning text-dark' :
                                                        'bg-secondary'
                                                }`}>
                                                {selectedApproval.priority}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Requested By</label>
                                        <p className="text-dark mb-0">{selectedApproval.requestedBy}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Request Date</label>
                                        <p className="text-dark mb-0">{selectedApproval.requestDate}</p>
                                    </div>
                                    {selectedApproval.status === 'Approved' && (
                                        <>
                                            <div className="col-md-6">
                                                <label className="small text-muted fw-bold">Approved By</label>
                                                <p className="text-success fw-bold mb-0">{selectedApproval.approvedBy}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small text-muted fw-bold">Approved Date</label>
                                                <p className="text-dark mb-0">{selectedApproval.approvedDate}</p>
                                            </div>
                                        </>
                                    )}
                                    {selectedApproval.status === 'Rejected' && (
                                        <>
                                            <div className="col-md-6">
                                                <label className="small text-muted fw-bold">Rejected By</label>
                                                <p className="text-danger fw-bold mb-0">{selectedApproval.rejectedBy}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small text-muted fw-bold">Rejected Date</label>
                                                <p className="text-dark mb-0">{selectedApproval.rejectedDate}</p>
                                            </div>
                                            <div className="col-12">
                                                <label className="small text-muted fw-bold">Rejection Reason</label>
                                                <p className="text-dark mb-0">{selectedApproval.rejectionReason}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                {selectedApproval.status === 'Pending' && (
                                    <>
                                        <button
                                            className="btn btn-success rounded-pill px-4"
                                            onClick={() => {
                                                handleApprove(selectedApproval.id);
                                                setShowDetailModal(false);
                                            }}
                                        >
                                            <FaCheckCircle className="me-2" />
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-danger rounded-pill px-4"
                                            onClick={() => {
                                                handleReject(selectedApproval.id);
                                                setShowDetailModal(false);
                                            }}
                                        >
                                            <FaTimesCircle className="me-2" />
                                            Reject
                                        </button>
                                    </>
                                )}
                                <button
                                    className="btn btn-light rounded-pill px-4"
                                    onClick={() => setShowDetailModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApprovalUI;

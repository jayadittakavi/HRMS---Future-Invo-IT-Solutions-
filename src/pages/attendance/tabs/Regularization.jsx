import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaClock, FaCalendarAlt, FaUserClock, FaFileAlt } from 'react-icons/fa';

const Regularization = () => {
    const [requests, setRequests] = useState([
        {
            id: 1,
            employeeName: 'Rajesh Kumar',
            employeeId: 'EMP001',
            date: '2026-02-15',
            requestType: 'Missing Punch',
            punchType: 'Punch Out',
            requestedTime: '06:30 PM',
            actualTime: 'Not Punched',
            reason: 'Forgot to punch out due to emergency meeting',
            status: 'Pending',
            submittedOn: '2026-02-16 09:00 AM',
            approvedBy: null
        },
        {
            id: 2,
            employeeName: 'Priya Sharma',
            employeeId: 'EMP002',
            date: '2026-02-14',
            requestType: 'Wrong Punch',
            punchType: 'Punch In',
            requestedTime: '09:00 AM',
            actualTime: '11:00 AM',
            reason: 'System error - punched late by mistake',
            status: 'Approved',
            submittedOn: '2026-02-14 02:00 PM',
            approvedBy: 'Manager A'
        },
        {
            id: 3,
            employeeName: 'Amit Patel',
            employeeId: 'EMP003',
            date: '2026-02-13',
            requestType: 'Missing Punch',
            punchType: 'Both',
            requestedTime: '09:00 AM - 06:00 PM',
            actualTime: 'Not Punched',
            reason: 'Was on field visit, forgot device',
            status: 'Rejected',
            submittedOn: '2026-02-14 10:30 AM',
            approvedBy: 'Manager B'
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const [formData, setFormData] = useState({
        date: '',
        requestType: 'Missing Punch',
        punchType: 'Punch In',
        requestedTime: '',
        reason: ''
    });

    const handleNewRequest = () => {
        setFormData({
            date: '',
            requestType: 'Missing Punch',
            punchType: 'Punch In',
            requestedTime: '',
            reason: ''
        });
        setShowModal(true);
    };

    const handleSubmitRequest = (e) => {
        e.preventDefault();
        const newRequest = {
            id: Date.now(),
            employeeName: 'Current User',
            employeeId: 'EMP999',
            date: formData.date,
            requestType: formData.requestType,
            punchType: formData.punchType,
            requestedTime: formData.requestedTime,
            actualTime: 'Not Punched',
            reason: formData.reason,
            status: 'Pending',
            submittedOn: new Date().toLocaleString('en-IN'),
            approvedBy: null
        };
        setRequests([newRequest, ...requests]);
        setShowModal(false);
    };

    const handleApprove = (id) => {
        setRequests(requests.map(r =>
            r.id === id ? { ...r, status: 'Approved', approvedBy: 'Current Manager' } : r
        ));
    };

    const handleReject = (id) => {
        setRequests(requests.map(r =>
            r.id === id ? { ...r, status: 'Rejected', approvedBy: 'Current Manager' } : r
        ));
    };

    const filteredRequests = filterStatus === 'All'
        ? requests
        : requests.filter(r => r.status === filterStatus);

    const stats = {
        total: requests.length,
        pending: requests.filter(r => r.status === 'Pending').length,
        approved: requests.filter(r => r.status === 'Approved').length,
        rejected: requests.filter(r => r.status === 'Rejected').length
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Attendance Regularization</h5>
                    <p className="text-muted small mb-0">Manage attendance correction requests</p>
                </div>
                <button className="btn btn-primary rounded-pill px-4 shadow-sm" onClick={handleNewRequest}>
                    <FaFileAlt className="me-2" />
                    New Request
                </button>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                                    <FaFileAlt size={24} />
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
                                    <h6 className="text-muted small mb-0">Pending</h6>
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
                                    <FaExclamationTriangle size={24} />
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

            {/* Filter */}
            <div className="mb-4">
                <div className="btn-group" role="group">
                    <button
                        className={`btn btn-sm ${filterStatus === 'All' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFilterStatus('All')}
                    >
                        All ({requests.length})
                    </button>
                    <button
                        className={`btn btn-sm ${filterStatus === 'Pending' ? 'btn-warning text-dark' : 'btn-outline-warning'}`}
                        onClick={() => setFilterStatus('Pending')}
                    >
                        Pending ({stats.pending})
                    </button>
                    <button
                        className={`btn btn-sm ${filterStatus === 'Approved' ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => setFilterStatus('Approved')}
                    >
                        Approved ({stats.approved})
                    </button>
                    <button
                        className={`btn btn-sm ${filterStatus === 'Rejected' ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={() => setFilterStatus('Rejected')}
                    >
                        Rejected ({stats.rejected})
                    </button>
                </div>
            </div>

            {/* Requests Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Employee</th>
                                    <th className="border-0 py-3">Date</th>
                                    <th className="border-0 py-3">Request Type</th>
                                    <th className="border-0 py-3">Punch Type</th>
                                    <th className="border-0 py-3">Requested Time</th>
                                    <th className="border-0 py-3">Actual Time</th>
                                    <th className="border-0 py-3">Reason</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map(request => (
                                    <tr key={request.id}>
                                        <td className="px-4">
                                            <div>
                                                <div className="fw-bold text-dark">{request.employeeName}</div>
                                                <small className="text-muted">{request.employeeId}</small>
                                            </div>
                                        </td>
                                        <td className="text-secondary small">
                                            <FaCalendarAlt className="me-1" />
                                            {request.date}
                                        </td>
                                        <td>
                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                {request.requestType}
                                            </span>
                                        </td>
                                        <td className="text-secondary small">{request.punchType}</td>
                                        <td className="text-secondary small">
                                            <FaUserClock className="me-1" />
                                            {request.requestedTime}
                                        </td>
                                        <td className="text-secondary small">{request.actualTime}</td>
                                        <td className="text-secondary small" style={{ maxWidth: '200px' }}>
                                            <span className="text-truncate d-inline-block" style={{ maxWidth: '180px' }} title={request.reason}>
                                                {request.reason}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${request.status === 'Pending' ? 'bg-warning text-dark' :
                                                    request.status === 'Approved' ? 'bg-success' :
                                                        'bg-danger'
                                                }`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td>
                                            {request.status === 'Pending' && (
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-sm btn-success rounded-pill px-3"
                                                        onClick={() => handleApprove(request.id)}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger rounded-pill px-3"
                                                        onClick={() => handleReject(request.id)}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                            {request.status !== 'Pending' && (
                                                <small className="text-muted">
                                                    By: {request.approvedBy}
                                                </small>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* New Request Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">New Regularization Request</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmitRequest}>
                                <div className="modal-body">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={formData.date}
                                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Request Type</label>
                                            <select
                                                className="form-select"
                                                value={formData.requestType}
                                                onChange={e => setFormData({ ...formData, requestType: e.target.value })}
                                            >
                                                <option value="Missing Punch">Missing Punch</option>
                                                <option value="Wrong Punch">Wrong Punch Time</option>
                                                <option value="Forgot Device">Forgot to Punch</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Punch Type</label>
                                            <select
                                                className="form-select"
                                                value={formData.punchType}
                                                onChange={e => setFormData({ ...formData, punchType: e.target.value })}
                                            >
                                                <option value="Punch In">Punch In</option>
                                                <option value="Punch Out">Punch Out</option>
                                                <option value="Both">Both</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Requested Time</label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                value={formData.requestedTime}
                                                onChange={e => setFormData({ ...formData, requestedTime: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small text-muted fw-bold">Reason</label>
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                value={formData.reason}
                                                onChange={e => setFormData({ ...formData, reason: e.target.value })}
                                                placeholder="Explain why you need this regularization..."
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button
                                        type="button"
                                        className="btn btn-light rounded-pill px-4"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary rounded-pill px-4">
                                        Submit Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Regularization;

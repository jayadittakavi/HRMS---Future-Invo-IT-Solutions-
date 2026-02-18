import React, { useState } from 'react';
import { FaPenFancy, FaCheckCircle, FaClock, FaTimesCircle, FaEye, FaDownload, FaEnvelope, FaFileSignature } from 'react-icons/fa';

const ESignUI = () => {
    const [signatures, setSignatures] = useState([
        {
            id: 1,
            documentName: 'Offer Letter - Alice Johnson',
            documentType: 'Offer Letter',
            employeeName: 'Alice Johnson',
            employeeEmail: 'alice@example.com',
            sentDate: '2026-02-15',
            status: 'Pending',
            expiryDate: '2026-02-22',
            signerRole: 'Employee'
        },
        {
            id: 2,
            documentName: 'Appointment Letter - Bob Smith',
            documentType: 'Appointment Letter',
            employeeName: 'Bob Smith',
            employeeEmail: 'bob@example.com',
            sentDate: '2026-02-14',
            status: 'Signed',
            signedDate: '2026-02-15',
            signerRole: 'Employee',
            ipAddress: '192.168.1.100'
        },
        {
            id: 3,
            documentName: 'NDA Agreement - Charlie Davis',
            documentType: 'NDA',
            employeeName: 'Charlie Davis',
            employeeEmail: 'charlie@example.com',
            sentDate: '2026-02-13',
            status: 'Expired',
            expiryDate: '2026-02-16',
            signerRole: 'Employee'
        },
        {
            id: 4,
            documentName: 'Increment Letter - Diana Prince',
            documentType: 'Increment Letter',
            employeeName: 'Diana Prince',
            employeeEmail: 'diana@example.com',
            sentDate: '2026-02-16',
            status: 'Pending',
            expiryDate: '2026-02-23',
            signerRole: 'Employee'
        }
    ]);

    const [showSendModal, setShowSendModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedSignature, setSelectedSignature] = useState(null);
    const [formData, setFormData] = useState({
        documentName: '',
        documentType: 'Offer Letter',
        employeeName: '',
        employeeEmail: '',
        expiryDays: 7,
        message: ''
    });

    const handleSendForSignature = (e) => {
        e.preventDefault();
        const newSignature = {
            id: Date.now(),
            ...formData,
            sentDate: new Date().toISOString().split('T')[0],
            expiryDate: new Date(Date.now() + formData.expiryDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'Pending',
            signerRole: 'Employee'
        };
        setSignatures([newSignature, ...signatures]);
        setShowSendModal(false);
        setFormData({
            documentName: '',
            documentType: 'Offer Letter',
            employeeName: '',
            employeeEmail: '',
            expiryDays: 7,
            message: ''
        });
    };

    const handleResend = (id) => {
        setSignatures(signatures.map(s =>
            s.id === id ? {
                ...s,
                sentDate: new Date().toISOString().split('T')[0],
                expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: 'Pending'
            } : s
        ));
    };

    const handleViewDetails = (signature) => {
        setSelectedSignature(signature);
        setShowDetailModal(true);
    };

    const stats = {
        total: signatures.length,
        pending: signatures.filter(s => s.status === 'Pending').length,
        signed: signatures.filter(s => s.status === 'Signed').length,
        expired: signatures.filter(s => s.status === 'Expired').length
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Electronic Signature Management</h5>
                    <p className="text-muted small mb-0">Send and track documents for electronic signatures</p>
                </div>
                <button
                    className="btn btn-primary rounded-pill px-4 shadow-sm"
                    onClick={() => setShowSendModal(true)}
                >
                    <FaEnvelope className="me-2" />
                    Send for Signature
                </button>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                                    <FaFileSignature size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Total Documents</h6>
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
                                    <h6 className="text-muted small mb-0">Pending Signature</h6>
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
                                    <h6 className="text-muted small mb-0">Signed</h6>
                                    <h3 className="fw-bold mb-0">{stats.signed}</h3>
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
                                    <h6 className="text-muted small mb-0">Expired</h6>
                                    <h3 className="fw-bold mb-0">{stats.expired}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Signatures Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Document Name</th>
                                    <th className="border-0 py-3">Type</th>
                                    <th className="border-0 py-3">Signer</th>
                                    <th className="border-0 py-3">Sent Date</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Expiry/Signed Date</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {signatures.map(signature => (
                                    <tr key={signature.id}>
                                        <td className="px-4">
                                            <div className="d-flex align-items-center">
                                                <div className="icon-box bg-primary bg-opacity-10 text-primary rounded p-2 me-2">
                                                    <FaPenFancy size={14} />
                                                </div>
                                                <span className="fw-bold text-dark">{signature.documentName}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                {signature.documentType}
                                            </span>
                                        </td>
                                        <td>
                                            <div>
                                                <div className="fw-bold text-dark small">{signature.employeeName}</div>
                                                <small className="text-muted">{signature.employeeEmail}</small>
                                            </div>
                                        </td>
                                        <td className="text-secondary small">{signature.sentDate}</td>
                                        <td>
                                            <span className={`badge ${signature.status === 'Pending' ? 'bg-warning text-dark' :
                                                    signature.status === 'Signed' ? 'bg-success' :
                                                        'bg-danger'
                                                }`}>
                                                {signature.status === 'Pending' && <FaClock className="me-1" />}
                                                {signature.status === 'Signed' && <FaCheckCircle className="me-1" />}
                                                {signature.status === 'Expired' && <FaTimesCircle className="me-1" />}
                                                {signature.status}
                                            </span>
                                        </td>
                                        <td className="text-secondary small">
                                            {signature.status === 'Signed' ? (
                                                <span className="text-success fw-bold">{signature.signedDate}</span>
                                            ) : signature.status === 'Expired' ? (
                                                <span className="text-danger">{signature.expiryDate}</span>
                                            ) : (
                                                <span>{signature.expiryDate}</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary rounded-circle"
                                                    onClick={() => handleViewDetails(signature)}
                                                    title="View Details"
                                                >
                                                    <FaEye size={12} />
                                                </button>
                                                {signature.status === 'Signed' && (
                                                    <button
                                                        className="btn btn-sm btn-outline-primary rounded-circle"
                                                        title="Download"
                                                    >
                                                        <FaDownload size={12} />
                                                    </button>
                                                )}
                                                {(signature.status === 'Pending' || signature.status === 'Expired') && (
                                                    <button
                                                        className="btn btn-sm btn-outline-warning rounded-circle"
                                                        onClick={() => handleResend(signature.id)}
                                                        title="Resend"
                                                    >
                                                        <FaEnvelope size={12} />
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

            {/* Send for Signature Modal */}
            {showSendModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">Send Document for E-Signature</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowSendModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSendForSignature}>
                                <div className="modal-body">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label small text-muted fw-bold">Document Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.documentName}
                                                onChange={e => setFormData({ ...formData, documentName: e.target.value })}
                                                placeholder="e.g., Offer Letter - John Doe"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Document Type</label>
                                            <select
                                                className="form-select"
                                                value={formData.documentType}
                                                onChange={e => setFormData({ ...formData, documentType: e.target.value })}
                                            >
                                                <option value="Offer Letter">Offer Letter</option>
                                                <option value="Appointment Letter">Appointment Letter</option>
                                                <option value="NDA">NDA</option>
                                                <option value="Increment Letter">Increment Letter</option>
                                                <option value="Contract">Contract</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Expiry (Days)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.expiryDays}
                                                onChange={e => setFormData({ ...formData, expiryDays: parseInt(e.target.value) })}
                                                min="1"
                                                max="30"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Signer Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.employeeName}
                                                onChange={e => setFormData({ ...formData, employeeName: e.target.value })}
                                                placeholder="e.g., John Doe"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Signer Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={formData.employeeEmail}
                                                onChange={e => setFormData({ ...formData, employeeEmail: e.target.value })}
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small text-muted fw-bold">Message (Optional)</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={formData.message}
                                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Add a personal message to the signer..."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button
                                        type="button"
                                        className="btn btn-light rounded-pill px-4"
                                        onClick={() => setShowSendModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary rounded-pill px-4">
                                        <FaEnvelope className="me-2" />
                                        Send for Signature
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {showDetailModal && selectedSignature && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">Signature Request Details</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDetailModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="small text-muted fw-bold">Document Name</label>
                                        <p className="fw-bold text-dark mb-0">{selectedSignature.documentName}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Document Type</label>
                                        <p className="mb-0">
                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                {selectedSignature.documentType}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Status</label>
                                        <p className="mb-0">
                                            <span className={`badge ${selectedSignature.status === 'Pending' ? 'bg-warning text-dark' :
                                                    selectedSignature.status === 'Signed' ? 'bg-success' :
                                                        'bg-danger'
                                                }`}>
                                                {selectedSignature.status}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Signer Name</label>
                                        <p className="fw-bold text-dark mb-0">{selectedSignature.employeeName}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Signer Email</label>
                                        <p className="text-dark mb-0">{selectedSignature.employeeEmail}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">Sent Date</label>
                                        <p className="text-dark mb-0">{selectedSignature.sentDate}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted fw-bold">
                                            {selectedSignature.status === 'Signed' ? 'Signed Date' : 'Expiry Date'}
                                        </label>
                                        <p className="text-dark mb-0">
                                            {selectedSignature.status === 'Signed' ? selectedSignature.signedDate : selectedSignature.expiryDate}
                                        </p>
                                    </div>
                                    {selectedSignature.status === 'Signed' && selectedSignature.ipAddress && (
                                        <div className="col-12">
                                            <label className="small text-muted fw-bold">IP Address</label>
                                            <p className="text-dark mb-0">
                                                <code className="bg-light px-2 py-1 rounded">{selectedSignature.ipAddress}</code>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                {selectedSignature.status === 'Signed' && (
                                    <button className="btn btn-primary rounded-pill px-4">
                                        <FaDownload className="me-2" />
                                        Download Signed Document
                                    </button>
                                )}
                                {(selectedSignature.status === 'Pending' || selectedSignature.status === 'Expired') && (
                                    <button
                                        className="btn btn-warning rounded-pill px-4"
                                        onClick={() => {
                                            handleResend(selectedSignature.id);
                                            setShowDetailModal(false);
                                        }}
                                    >
                                        <FaEnvelope className="me-2" />
                                        Resend Request
                                    </button>
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

export default ESignUI;

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useSearch } from '../../../../context/SearchContext';
import { useAuth } from '../../../../context/AuthContext';
import { FaFilePdf, FaFileUpload, FaTrash, FaEye, FaSearch, FaDownload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import { documentService } from './service';

export const DocumentsContent = () => {
    const [activeTab, setActiveTab] = useState('policies');
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const { user } = useAuth();
    const [search, setSearch] = useState(globalSearchTerm);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [policies, setPolicies] = useState([]);
    const [employeeDocs, setEmployeeDocs] = useState([]);

    const isEmployee = user?.role?.toLowerCase() === 'employee';

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'policies') {
                const data = await documentService.getPolicies();
                setPolicies(Array.isArray(data) ? data : []);
            } else if (activeTab === 'employee') {
                const data = isEmployee 
                    ? await documentService.getMyDocuments()
                    : await documentService.getAdminList();
                setEmployeeDocs(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    useEffect(() => {
        setSearch(globalSearchTerm);
    }, [globalSearchTerm]);

    const handleView = (doc) => {
        setSelectedDoc(doc);
        setShowViewModal(true);
    };

    const handleDownload = async (doc) => {
        try {
            await documentService.downloadDocument(doc.id, doc.name);
        } catch (error) {
            alert("Download failed: " + error.message);
        }
    };

    const handleToggleArchive = (doc) => {
        alert(`Archive action for "${doc.name}" is restricted to development mode.`);
    };

    const handleUploadClick = () => {
        document.getElementById('employee-doc-upload').click();
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('document', file);
            formData.append('type', 'Personal');
            
            await documentService.uploadDocument(formData);
            alert(`File "${file.name}" uploaded successfully and sent for verification!`);
            fetchData();
        } catch (error) {
            alert("Upload failed: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleVerify = async (doc, action = 'APPROVE') => {
        try {
            await documentService.verifyDocument(doc.id, action);
            alert(`Document "${doc.name}" ${action.toLowerCase()}ed successfully.`);
            fetchData();
        } catch (error) {
            alert("Verification failed: " + error.message);
        }
    };

    return (
        <div className="documents-content p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Documents Center</h5>
                    <p className="text-secondary small mb-0">Manage organizational policies and employee files</p>
                </div>
            </div>

            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'policies' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('policies')}>Company Policies</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'employee' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('employee')}>Employee Documents</button>
                </li>
            </ul>

            {activeTab === 'policies' && (
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                            <h6 className="fw-bold mb-0">All Policies</h6>
                            <div className="input-group input-group-sm" style={{ width: '200px' }}>
                                <span className="input-group-text bg-light border-0"><FaSearch /></span>
                                <input
                                    type="text"
                                    className="form-control border-0 bg-light"
                                    placeholder="Search policies..."
                                    value={search}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setSearch(val);
                                        setGlobalSearchTerm(val);
                                    }}
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary btn-sm"><FaFileUpload className="me-2" /> Upload Policy</button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4">Document Name</th>
                                    <th>Type</th>
                                    <th>Size</th>
                                    <th>Upload Date</th>
                                    <th className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary"></div></td></tr>
                                ) : policies.filter(doc =>
                                    doc.name.toLowerCase().includes(search.toLowerCase())
                                ).map(doc => (
                                    <tr key={doc.id}>
                                        <td className="ps-4 fw-bold">
                                            <FaFilePdf className="text-danger me-2" /> {doc.name}
                                        </td>
                                        <td>{doc.type}</td>
                                        <td>{doc.size || 'N/A'}</td>
                                        <td>{doc.uploadDate || doc.created_at || 'N/A'}</td>
                                        <td className="text-end pe-4">
                                            <div className="d-flex justify-content-end gap-2 flex-nowrap">
                                                <button
                                                    className="btn btn-sm btn-outline-primary px-2 py-1"
                                                    onClick={() => handleView(doc)}
                                                    style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                                    title="View"
                                                >
                                                    <FaEye size={11} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-success px-2 py-1"
                                                    onClick={() => handleDownload(doc)}
                                                    style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                                    title="Download"
                                                >
                                                    <FaDownload size={11} />
                                                </button>
                                                {!isEmployee && (
                                                    <button
                                                        className="btn btn-sm btn-outline-warning px-2 py-1"
                                                        onClick={() => handleToggleArchive(doc)}
                                                        style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                                        title={doc.isArchived ? "Restore" : "Archive"}
                                                    >
                                                        {doc.isArchived ? <FaCheckCircle size={11} /> : <FaTimesCircle size={11} />}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {policies.length === 0 && !loading && (
                                    <tr><td colSpan="5" className="text-center py-5 text-muted">No policies found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'employee' && (
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center border-bottom-0">
                        <h6 className="mb-0 fw-bold">Submitted Documents</h6>
                        <div className="d-flex align-items-center gap-2">
                            <div className="input-group input-group-sm w-auto">
                                <span className="input-group-text bg-light border-0"><FaSearch /></span>
                                <input
                                    type="text"
                                    className="form-control border-0 bg-light"
                                    placeholder="Search employee..."
                                    value={search}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setSearch(val);
                                        setGlobalSearchTerm(val);
                                    }}
                                />
                            </div>
                            <input
                                type="file"
                                id="employee-doc-upload"
                                className="d-none"
                                onChange={handleFileUpload}
                                accept=".pdf,.doc,.docx,.jpg,.png"
                            />
                            <button 
                                className="btn btn-primary btn-sm d-flex align-items-center gap-2"
                                onClick={handleUploadClick}
                                disabled={uploading}
                            >
                                <FaFileUpload /> {uploading ? 'Uploading...' : 'Upload Document'}
                            </button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4">Employee</th>
                                    <th>Document</th>
                                    <th>Type</th>
                                    <th>Verification Status</th>
                                    <th className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary"></div></td></tr>
                                ) : employeeDocs.filter(doc =>
                                    (doc.employee || '').toLowerCase().includes(search.toLowerCase()) ||
                                    (doc.name || '').toLowerCase().includes(search.toLowerCase())
                                ).map(doc => (
                                    <tr key={doc.id}>
                                        <td className="ps-4 fw-bold">{doc.employee || user?.name || 'Venkateswara'}</td>
                                        <td>{doc.name}</td>
                                        <td><span className="badge bg-light text-secondary border fw-normal">{doc.type}</span></td>
                                        <td>
                                            <span className={`badge bg-opacity-10 text-dark border ${doc.status === 'Verified' ? 'bg-success text-success border-success' : 'bg-warning text-warning border-warning'
                                                }`}>
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="text-end pe-4">
                                            <div className="d-flex justify-content-end gap-2 flex-nowrap align-items-center">
                                                <button
                                                    className="btn btn-sm btn-outline-primary px-2 py-1"
                                                    onClick={() => handleView(doc)}
                                                    style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                                    title="View"
                                                >
                                                    <FaEye size={11} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-success px-2 py-1"
                                                    onClick={() => handleDownload(doc)}
                                                    style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                                    title="Download"
                                                >
                                                    <FaDownload size={11} />
                                                </button>
                                                {!isEmployee && doc.status !== 'Verified' && (
                                                    <div className="d-flex gap-1">
                                                        <button
                                                            className="btn btn-sm btn-success px-2 py-1"
                                                            onClick={() => handleVerify(doc, 'APPROVE')}
                                                            style={{ fontSize: '0.75rem' }}
                                                            title="Approve"
                                                        >
                                                            <FaCheckCircle size={11} />
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-danger px-2 py-1"
                                                            onClick={() => handleVerify(doc, 'REJECT')}
                                                            style={{ fontSize: '0.75rem' }}
                                                            title="Reject"
                                                        >
                                                            <FaTimesCircle size={11} />
                                                        </button>
                                                    </div>
                                                )}
                                                {!isEmployee && doc.status === 'Verified' && (
                                                    <span className="text-success small fw-bold px-2">✓ Verified</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {employeeDocs.length === 0 && !loading && (
                                    <tr><td colSpan="5" className="text-center py-5 text-muted">No documents found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* View Document Modal */}
            {showViewModal && selectedDoc && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowViewModal(false)}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold">
                                    <FaEye className="me-2 text-primary" />
                                    {selectedDoc.name}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <p className="mb-2"><strong>Document Name:</strong> {selectedDoc.name}</p>
                                        <p className="mb-2"><strong>Type:</strong> <span className="badge bg-primary">{selectedDoc.type}</span></p>
                                    </div>
                                    <div className="col-md-6">
                                        {selectedDoc.size && <p className="mb-2"><strong>Size:</strong> {selectedDoc.size}</p>}
                                        {selectedDoc.uploadDate && <p className="mb-2"><strong>Upload Date:</strong> {selectedDoc.uploadDate}</p>}
                                        {selectedDoc.employee && <p className="mb-2"><strong>Employee:</strong> {selectedDoc.employee}</p>}
                                        {selectedDoc.status && (
                                            <p className="mb-2">
                                                <strong>Status:</strong>
                                                <span className={`badge ms-2 ${selectedDoc.status === 'Verified' ? 'bg-success' : 'bg-warning'}`}>
                                                    {selectedDoc.status}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="border rounded p-4 bg-light text-center">
                                    <FaFilePdf size={64} className="text-danger mb-3" />
                                    <p className="text-muted">Document preview would appear here</p>
                                    <small className="text-secondary">In production, integrate a PDF viewer or image viewer</small>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-outline-secondary" onClick={() => setShowViewModal(false)}>Close</button>
                                <button className="btn btn-primary" onClick={() => handleDownload(selectedDoc)}>
                                    <FaDownload className="me-2" />Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

const Documents = () => (
    <DashboardLayout title="">
        <DocumentsContent />
    </DashboardLayout>
);

export default Documents;

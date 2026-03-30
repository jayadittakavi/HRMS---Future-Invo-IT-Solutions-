import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useSearch } from '../../../../context/SearchContext';
import { FaFilePdf, FaFileUpload, FaTrash, FaEye, FaSearch, FaDownload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const DocumentsContent = () => {
    const [activeTab, setActiveTab] = useState('policies');
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [search, setSearch] = useState(globalSearchTerm);

    useEffect(() => {
        setSearch(globalSearchTerm);
    }, [globalSearchTerm]);

    const policies = [
        { id: 1, name: 'Employee Handbook 2024', type: 'PDF', size: '2.4 MB', uploadDate: 'Jan 10, 2024', url: '#' },
        { id: 2, name: 'Remote Work Policy', type: 'DOCX', size: '1.2 MB', uploadDate: 'Jan 15, 2024', url: '#' },
        { id: 3, name: 'Leave Policy', type: 'PDF', size: '0.8 MB', uploadDate: 'Feb 01, 2024', url: '#' },
    ];

    const employeeDocs = [
        { id: 1, employee: 'John Doe', name: 'Offer Letter', type: 'PDF', status: 'Verified', url: '#' },
        { id: 2, employee: 'Jane Smith', name: 'Identity Proof', type: 'JPG', status: 'Pending Verification', url: '#' },
        { id: 3, employee: 'Mike Ross', name: 'Experience Letter', type: 'PDF', status: 'Verified', url: '#' },
    ];

    const handleView = (doc) => {
        setSelectedDoc(doc);
        setShowViewModal(true);
    };

    const handleDownload = (doc) => {
        // Simulate download
        const link = document.createElement('a');
        link.href = doc.url || '#';
        link.download = doc.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show success message
        alert(`Downloading: ${doc.name}`);
    };

    const handleToggleArchive = (doc) => {
        // Toggle mock status or archive
        doc.isArchived = !doc.isArchived;
        alert(`Document "${doc.name}" has been ${doc.isArchived ? 'archived' : 'restored'}.`);
        // Force refresh if needed
    };

    const handleVerify = (doc) => {
        if (doc.status === 'Verified') return;

        // Simulate verification
        console.log('Verifying document:', doc);
        alert(`Document "${doc.name}" for ${doc.employee} has been verified.`);
        // Add actual verify logic here
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
                                {policies.filter(doc =>
                                    doc.name.toLowerCase().includes(search.toLowerCase())
                                ).map(doc => (
                                    <tr key={doc.id}>
                                        <td className="ps-4 fw-bold">
                                            <FaFilePdf className="text-danger me-2" /> {doc.name}
                                        </td>
                                        <td>{doc.type}</td>
                                        <td>{doc.size}</td>
                                        <td>{doc.uploadDate}</td>
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
                                                <button
                                                    className="btn btn-sm btn-outline-warning px-2 py-1"
                                                    onClick={() => handleToggleArchive(doc)}
                                                    style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                                    title={doc.isArchived ? "Restore" : "Archive"}
                                                >
                                                    {doc.isArchived ? <FaCheckCircle size={11} /> : <FaTimesCircle size={11} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'employee' && (
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center border-bottom-0">
                        <h6 className="mb-0 fw-bold">Submitted Documents</h6>
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
                                {employeeDocs.filter(doc =>
                                    doc.employee.toLowerCase().includes(search.toLowerCase()) ||
                                    doc.name.toLowerCase().includes(search.toLowerCase())
                                ).map(doc => (
                                    <tr key={doc.id}>
                                        <td className="ps-4 fw-bold">{doc.employee}</td>
                                        <td>{doc.name}</td>
                                        <td>{doc.type}</td>
                                        <td>
                                            <span className={`badge bg-opacity-10 text-dark border ${doc.status === 'Verified' ? 'bg-success text-success border-success' : 'bg-warning text-warning border-warning'
                                                }`}>
                                                {doc.status}
                                            </span>
                                        </td>
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
                                                <button
                                                    className={`btn btn-sm px-2 py-1 ${doc.status === 'Verified' ? 'btn-outline-secondary' : 'btn-outline-warning'}`}
                                                    onClick={() => handleVerify(doc)}
                                                    style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                                    title="Verify"
                                                    disabled={doc.status === 'Verified'}
                                                >
                                                    <FaCheckCircle size={11} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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

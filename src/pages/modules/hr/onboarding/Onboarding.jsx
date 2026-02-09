import React, { useState } from 'react';
import {
    FaUserPlus, FaFileAlt, FaCertificate, FaLaptopHouse,
    FaCheckCircle, FaTimesCircle, FaDownload, FaEye, FaPrint, FaSearch
} from 'react-icons/fa';

export const OnboardingContent = () => {
    const [activeTab, setActiveTab] = useState('onboarding');
    const [showLetterModal, setShowLetterModal] = useState(false);
    const [showCertModal, setShowCertModal] = useState(false);
    const [showWFHModal, setShowWFHModal] = useState(false);
    const [selectedType, setSelectedType] = useState('');

    // --- MOCK DATA ---
    const candidates = [
        { id: 1, name: "Alice Johnson", role: "Frontend Dev", date: "2024-05-20", status: "In Progress", progress: 60 },
        { id: 2, name: "Bob Smith", role: "UI Designer", date: "2024-05-22", status: "Document Verification", progress: 80 },
        { id: 3, name: "Charlie Davis", role: "Backend Dev", date: "2024-05-25", status: "Completed", progress: 100 },
    ];

    const letterTemplates = [
        { id: 'offer', title: 'Offer Letter', desc: 'Send initial job offer to candidate.' },
        { id: 'appointment', title: 'Appointment Letter', desc: 'Confirm employment terms and conditions.' },
        { id: 'increment', title: 'Increment Letter', desc: 'Salary appraisal and role update.' },
        { id: 'relieving', title: 'Relieving Letter', desc: 'Formal exit documentation.' },
    ];

    const certificateTemplates = [
        { id: 'experience', title: 'Experience Certificate', desc: 'Proof of employment duration.' },
        { id: 'noc', title: 'NOC Letter', desc: 'No Objection Certificate for visa/loans.' },
        { id: 'internship', title: 'Internship Certificate', desc: 'Completion of internship program.' },
    ];

    const wfhRequests = [
        { id: 1, employee: "John Doe", startDate: "2024-06-01", endDate: "2024-06-05", reason: "Medical Emergency", status: "Pending" },
        { id: 2, employee: "Jane Smith", startDate: "2024-06-10", endDate: "2024-06-12", reason: "Home Renovation", status: "Approved" },
    ];

    // --- RENDER HELPERS ---

    const renderOnboarding = () => (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
                <h6 className="mb-0 fw-bold">New Hires Onboarding Status</h6>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th className="ps-4">Candidate</th>
                            <th>Role</th>
                            <th>Joining Date</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map(c => (
                            <tr key={c.id}>
                                <td className="ps-4 fw-bold">{c.name}</td>
                                <td className="text-secondary small">{c.role}</td>
                                <td className="text-secondary small">{c.date}</td>
                                <td>
                                    <span className={`badge ${c.status === 'Completed' ? 'bg-success' : 'bg-primary'} bg-opacity-10 ${c.status === 'Completed' ? 'text-success' : 'text-primary'}`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td style={{ width: '20%' }}>
                                    <div className="progress" style={{ height: '6px' }}>
                                        <div
                                            className={`progress-bar ${c.progress === 100 ? 'bg-success' : 'bg-primary'}`}
                                            role="progressbar"
                                            style={{ width: `${c.progress}%` }}
                                        ></div>
                                    </div>
                                    <small className="text-muted d-block mt-1">{c.progress}% Completed</small>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-outline-dark border-0"><FaEye /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderLetters = () => (
        <div>
            <div className="row g-4 mb-4">
                {letterTemplates.map(t => (
                    <div className="col-md-3" key={t.id}>
                        <div className="card h-100 hover-lift border-primary border-opacity-25" style={{ cursor: 'pointer' }} onClick={() => { setSelectedType(t.title); setShowLetterModal(true); }}>
                            <div className="card-body text-center p-4">
                                <div className="text-primary mb-3">
                                    <FaFileAlt size={32} />
                                </div>
                                <h6 className="fw-bold text-dark">{t.title}</h6>
                                <p className="text-secondary small mb-3">{t.desc}</p>
                                <button className="btn btn-sm btn-outline-primary w-100">Generate</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card border-0 shadow-sm mt-4">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-bold">Recent Generated Letters</h6>
                    <div className="input-group input-group-sm" style={{ width: '250px' }}>
                        <span className="input-group-text bg-white"><FaSearch /></span>
                        <input type="text" className="form-control" placeholder="Search..." />
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">Employee</th>
                                <th>Type</th>
                                <th>Generated On</th>
                                <th>Status</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="ps-4 fw-bold">Alice Johnson</td>
                                <td>Offer Letter</td>
                                <td className="text-secondary small">May 15, 2024</td>
                                <td><span className="badge bg-success">Sent</span></td>
                                <td className="text-end pe-4">
                                    <button className="btn btn-sm btn-light text-dark me-2"><FaPrint /></button>
                                    <button className="btn btn-sm btn-light text-primary"><FaDownload /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderCertificates = () => (
        <div>
            <div className="row g-4 mb-4">
                {certificateTemplates.map(t => (
                    <div className="col-md-4" key={t.id}>
                        <div className="card h-100 hover-lift border-warning border-opacity-25" style={{ cursor: 'pointer' }} onClick={() => { setSelectedType(t.title); setShowCertModal(true); }}>
                            <div className="card-body text-center p-4">
                                <div className="text-warning mb-3">
                                    <FaCertificate size={32} />
                                </div>
                                <h6 className="fw-bold text-dark">{t.title}</h6>
                                <p className="text-secondary small mb-3">{t.desc}</p>
                                <button className="btn btn-sm btn-outline-warning text-dark w-100">Issue Certificate</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card border-0 shadow-sm mt-4">
                <div className="card-header bg-white py-3">
                    <h6 className="mb-0 fw-bold">Issued Certificates History</h6>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">Recipient</th>
                                <th>Certificate Type</th>
                                <th>Issue Date</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="ps-4 fw-bold">Mark Wilson</td>
                                <td>Experience Certificate</td>
                                <td className="text-secondary small">Apr 10, 2024</td>
                                <td className="text-end pe-4">
                                    <button className="btn btn-sm btn-light text-primary"><FaDownload /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderWFH = () => (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h6 className="mb-0 fw-bold">Remote Work / WFH Requests</h6>
                <button className="btn btn-primary btn-sm" onClick={() => setShowWFHModal(true)}>+ New WFH Allocation</button>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th className="ps-4">Employee</th>
                            <th>Duration</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th className="text-end pe-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wfhRequests.map(r => (
                            <tr key={r.id}>
                                <td className="ps-4 fw-bold">{r.employee}</td>
                                <td className="text-secondary small">{r.startDate} to {r.endDate}</td>
                                <td className="text-secondary small">{r.reason}</td>
                                <td>
                                    <span className={`badge ${r.status === 'Approved' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td className="text-end pe-4">
                                    {r.status === 'Pending' && (
                                        <>
                                            <button className="btn btn-sm btn-success me-1 p-1"><FaCheckCircle /></button>
                                            <button className="btn btn-sm btn-danger p-1"><FaTimesCircle /></button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="onboarding-content p-4">
            <div className="d-flex align-items-center gap-3 mb-4">
                <h4 className="fw-bold text-dark m-0">Onboarding & HR Documents</h4>
            </div>

            {/* Navigation Tabs */}
            <ul className="nav nav-pills mb-4 bg-white p-2 rounded shadow-sm d-inline-flex">
                <li className="nav-item">
                    <button
                        className={`nav-link fw-bold ${activeTab === 'onboarding' ? 'active bg-primary' : 'text-secondary'}`}
                        onClick={() => setActiveTab('onboarding')}
                    >
                        <FaUserPlus className="me-2" /> Onboarding
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link fw-bold ${activeTab === 'letters' ? 'active bg-primary' : 'text-secondary'}`}
                        onClick={() => setActiveTab('letters')}
                    >
                        <FaFileAlt className="me-2" /> Letters
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link fw-bold ${activeTab === 'certificates' ? 'active bg-primary' : 'text-secondary'}`}
                        onClick={() => setActiveTab('certificates')}
                    >
                        <FaCertificate className="me-2" /> Certificates
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link fw-bold ${activeTab === 'wfh' ? 'active bg-primary' : 'text-secondary'}`}
                        onClick={() => setActiveTab('wfh')}
                    >
                        <FaLaptopHouse className="me-2" /> WFH UI
                    </button>
                </li>
            </ul>

            {/* Content Area */}
            <div className="tab-content">
                {activeTab === 'onboarding' && renderOnboarding()}
                {activeTab === 'letters' && renderLetters()}
                {activeTab === 'certificates' && renderCertificates()}
                {activeTab === 'wfh' && renderWFH()}
            </div>

            {/* --- MODALS --- */}

            {/* Letter Modal */}
            {showLetterModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Generate {selectedType}</h5>
                                <button className="btn-close" onClick={() => setShowLetterModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <FormLayout>
                                    <div className="mb-3">
                                        <label className="form-label">Employee Name</label>
                                        <input type="text" className="form-control" placeholder="Select Employee" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Date</label>
                                        <input type="date" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Template Options</label>
                                        <select className="form-select">
                                            <option>Standard Format</option>
                                            <option>Executive Format</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="emailCopy" />
                                        <label className="form-check-label" htmlFor="emailCopy">Send Email Copy to Employee</label>
                                    </div>
                                </FormLayout>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowLetterModal(false)}>Close</button>
                                <button className="btn btn-primary">Generate Letter</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Certificate Modal */}
            {showCertModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Issue {selectedType}</h5>
                                <button className="btn-close" onClick={() => setShowCertModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <FormLayout>
                                    <div className="mb-3">
                                        <label className="form-label">Employee</label>
                                        <input type="text" className="form-control" placeholder="Search Employee" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Purpose / Comments</label>
                                        <textarea className="form-control" rows="3"></textarea>
                                    </div>
                                </FormLayout>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowCertModal(false)}>Cancel</button>
                                <button className="btn btn-warning text-dark">Issue Certificate</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* WFH Modal */}
            {showWFHModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Allocate WFH</h5>
                                <button className="btn-close" onClick={() => setShowWFHModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <FormLayout>
                                    <div className="mb-3">
                                        <label className="form-label">Employee</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">From</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">To</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Reason / Project</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </FormLayout>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowWFHModal(false)}>Cancel</button>
                                <button className="btn btn-primary">Allocate</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Simple Wrapper for Forms
const FormLayout = ({ children }) => (
    <form onSubmit={(e) => e.preventDefault()}>
        {children}
    </form>
);

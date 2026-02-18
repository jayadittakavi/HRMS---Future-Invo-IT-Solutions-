import React, { useState } from 'react';
import {
    FaUserPlus, FaFileAlt, FaCertificate,
    FaCheckCircle, FaTimesCircle, FaDownload, FaEye, FaPrint, FaSearch, FaEnvelope,
    FaBriefcase, FaHandshake, FaMoneyBillWave, FaDoorOpen, FaChartLine,
    FaCode, FaPenFancy, FaGlobe
} from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import TemplateUI from './tabs/TemplateUI';
import VariableUI from './tabs/VariableUI';
import ApprovalUI from './tabs/ApprovalUI';
import ESignUI from './tabs/ESignUI';

export const OnboardingContent = () => {
    const [activeTab, setActiveTab] = useState('onboarding');
    const [letterSubTab, setLetterSubTab] = useState('templates');
    const [showLetterModal, setShowLetterModal] = useState(false);
    const [showCertModal, setShowCertModal] = useState(false);

    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [showLetterTemplateModal, setShowLetterTemplateModal] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

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
        { id: 'performance', title: 'Performance Review Letter', desc: 'Employee performance evaluation and feedback.' },
    ];

    const certificateTemplates = [
        { id: 'experience', title: 'Experience Certificate', desc: 'Proof of employment duration.' },
        { id: 'noc', title: 'NOC Letter', desc: 'No Objection Certificate for visa/loans.' },
        { id: 'internship', title: 'Internship Certificate', desc: 'Completion of internship program.' },
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
                                    <span className={`badge ${c.status === 'Completed' ? 'bg-success' :
                                        c.status === 'Document Verification' ? 'bg-info' :
                                            'bg-warning text-dark'
                                        }`}>
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
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-sm btn-outline-dark border-0"><FaEye /></button>
                                        <button
                                            className="btn btn-sm btn-outline-primary border-0"
                                            title="Send Letter"
                                            onClick={() => {
                                                setSelectedEmployee(c.name);
                                                setSelectedType('Offer Letter');
                                                setShowLetterModal(true);
                                            }}
                                        >
                                            <FaEnvelope />
                                        </button>
                                    </div>
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
            {/* Letter Sub-Tabs */}
            <ul className="nav nav-pills mb-4 bg-white p-2 rounded shadow-sm d-inline-flex" style={{ gap: '8px' }}>
                <li className="nav-item">
                    <button
                        className={`nav-link fw-bold ${letterSubTab === 'templates' ? 'active bg-primary' : 'text-secondary'}`}
                        onClick={() => setLetterSubTab('templates')}
                    >
                        <FaGlobe className="me-2" /> Templates
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link fw-bold ${letterSubTab === 'variables' ? 'active bg-success' : 'text-secondary'}`}
                        onClick={() => setLetterSubTab('variables')}
                    >
                        <FaCode className="me-2" /> Variables
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link fw-bold ${letterSubTab === 'approval' ? 'active bg-warning text-dark' : 'text-secondary'}`}
                        onClick={() => setLetterSubTab('approval')}
                    >
                        <FaCheckCircle className="me-2" /> Approval
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link fw-bold ${letterSubTab === 'esign' ? 'active bg-info' : 'text-secondary'}`}
                        onClick={() => setLetterSubTab('esign')}
                    >
                        <FaPenFancy className="me-2" /> E-sign
                    </button>
                </li>
            </ul>

            {/* Sub-Tab Content */}
            <div>
                {letterSubTab === 'templates' && <TemplateUI />}
                {letterSubTab === 'variables' && <VariableUI />}
                {letterSubTab === 'approval' && <ApprovalUI />}
                {letterSubTab === 'esign' && <ESignUI />}
            </div>
        </div>
    );

    const renderCertificates = () => (
        <div>
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-bold">Issued Certificates History</h6>
                    <button
                        className="btn btn-warning btn-sm text-dark px-3"
                        onClick={() => setShowTemplateModal(true)}
                    >
                        <FaCertificate className="me-2" />
                        Templates
                    </button>
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

            </ul>

            {/* Content Area */}
            <div className="tab-content">
                {activeTab === 'onboarding' && renderOnboarding()}
                {activeTab === 'letters' && renderLetters()}
                {activeTab === 'certificates' && renderCertificates()}

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
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Select Employee"
                                            defaultValue={selectedEmployee}
                                            key={selectedEmployee}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Employee Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter email address"
                                        />
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
                                <button className="btn btn-primary" onClick={() => { setShowLetterModal(false); alert('Letter Generated Successfully!'); }}>Generate Letter</button>
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
                                        <label className="form-label">Certificate Name</label>
                                        <input type="text" className="form-control" defaultValue={selectedType} placeholder="e.g. Experience Certificate" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Employee</label>
                                        <input type="text" className="form-control" placeholder="Search Employee" />
                                    </div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Employee ID</label>
                                            <input type="text" className="form-control" placeholder="E.g. EMP123" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Issue Date</label>
                                            <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} />
                                        </div>
                                    </div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Company Name</label>
                                            <input type="text" className="form-control" placeholder="Future Invo" defaultValue="Future Invo" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Company ID</label>
                                            <input type="text" className="form-control" placeholder="Company ID" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Designation</label>
                                        <input type="text" className="form-control" placeholder="E.g. Frontend Developer, Backend Developer" />
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



            {/* Certificate Templates Modal */}
            {showTemplateModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowTemplateModal(false)}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header bg-white border-bottom">
                                <h5 className="modal-title fw-bold text-dark">
                                    <FaCertificate className="me-2 text-warning" />
                                    Certificate Templates
                                </h5>
                                <button className="btn-close" onClick={() => setShowTemplateModal(false)}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="row g-4">
                                    {certificateTemplates.map(t => (
                                        <div className="col-md-4" key={t.id}>
                                            <div
                                                className="card h-100 border-warning border-2 shadow-sm"
                                                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                                onClick={() => {
                                                    setSelectedType(t.title);
                                                    setShowTemplateModal(false);
                                                    setShowCertModal(true);
                                                }}
                                            >
                                                <div className="card-body text-center p-4">
                                                    <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                                                        <FaCertificate size={40} className="text-warning" />
                                                    </div>
                                                    <h6 className="fw-bold text-dark mb-2">{t.title}</h6>
                                                    <p className="text-secondary small mb-3">{t.desc}</p>
                                                    <button className="btn btn-warning text-dark w-100 fw-bold">
                                                        ISSUE CERTIFICATE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-secondary" onClick={() => setShowTemplateModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Letter Templates Modal */}
            {showLetterTemplateModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowLetterTemplateModal(false)}>
                    <div className="modal-dialog modal-xl modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header bg-white border-bottom">
                                <h5 className="modal-title fw-bold text-dark">
                                    <FaFileAlt className="me-2 text-primary" />
                                    HR Letter Templates
                                </h5>
                                <button className="btn-close" onClick={() => setShowLetterTemplateModal(false)}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="row g-4 d-flex justify-content-center">
                                    {letterTemplates.map(t => (
                                        <div className="col-md-4" key={t.id}>
                                            <div
                                                className="card h-100 border-primary border-2 shadow-sm"
                                                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                                onClick={() => {
                                                    setSelectedType(t.title);
                                                    setShowLetterTemplateModal(false);
                                                    setShowLetterModal(true);
                                                }}
                                            >
                                                <div className="card-body text-center p-4">
                                                    <div className="mb-4 d-flex justify-content-center">
                                                        {t.id === 'offer' && <FaBriefcase size={64} className="text-primary" />}
                                                        {t.id === 'appointment' && <FaHandshake size={64} className="text-primary" />}
                                                        {t.id === 'increment' && <FaMoneyBillWave size={64} className="text-primary" />}
                                                        {t.id === 'relieving' && <FaDoorOpen size={64} className="text-primary" />}
                                                        {t.id === 'performance' && <FaChartLine size={64} className="text-primary" />}
                                                    </div>
                                                    <h6 className="fw-bold text-dark mb-2">{t.title}</h6>
                                                    <p className="text-secondary small mb-3">{t.desc}</p>
                                                    <button className="btn btn-primary w-100 fw-bold">
                                                        GENERATE LETTER
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-secondary" onClick={() => setShowLetterTemplateModal(false)}>Close</button>
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

const Onboarding = () => {
    return (
        <DashboardLayout title="">
            <OnboardingContent />
        </DashboardLayout>
    );
};

export default Onboarding;

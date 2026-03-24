import React, { useState } from 'react';
import { FaEnvelopeOpenText, FaTimes } from 'react-icons/fa';

const LettersTab = () => {
    const [modalConfig, setModalConfig] = useState(null); // { type, title }

    const handleOpenModal = (type, title) => setModalConfig({ type, title });
    const handleCloseModal = () => setModalConfig(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`${modalConfig.title} has been generated and queued for dispatch!`);
        handleCloseModal();
    };

    return (
        <div className="container-fluid p-0 position-relative">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Payroll Letters</h5>
                <button 
                    className="btn btn-primary btn-sm d-flex align-items-center gap-2"
                    onClick={() => handleOpenModal('new', 'Issue New Letter')}
                >
                    <FaEnvelopeOpenText size={12} /> Issue New Letter
                </button>
            </div>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center p-4">
                            <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-block mb-3">
                                <FaEnvelopeOpenText size={24} />
                            </div>
                            <h6 className="fw-bold">Increment Letter</h6>
                            <p className="text-muted small">Generate salary increment letters for employees.</p>
                            <button 
                                className="btn btn-outline-primary btn-sm w-100"
                                onClick={() => handleOpenModal('increment', 'Generate Increment Letter')}
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center p-4">
                            <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 d-inline-block mb-3">
                                <FaEnvelopeOpenText size={24} />
                            </div>
                            <h6 className="fw-bold">Promotion Letter</h6>
                            <p className="text-muted small">Generate promotion and role change letters.</p>
                            <button 
                                className="btn btn-outline-success btn-sm w-100"
                                onClick={() => handleOpenModal('promotion', 'Generate Promotion Letter')}
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Letter Generation Modal Overlay */}
            {modalConfig && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 1050, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
                    <div className="card border-0 shadow-lg" style={{ width: '100%', maxWidth: '500px', borderRadius: '12px' }}>
                        <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center pt-4 px-4 pb-0">
                            <h5 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                                <FaEnvelopeOpenText className="text-primary" /> {modalConfig.title}
                            </h5>
                            <button className="btn btn-sm btn-light rounded-circle" onClick={handleCloseModal}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold text-secondary">Select Employee <span className="text-danger">*</span></label>
                                    <select className="form-select" required>
                                        <option value="">Choose Employee...</option>
                                        <option value="1">John Doe (DEV-001)</option>
                                        <option value="2">Jane Smith (HR-002)</option>
                                        <option value="3">Mike Ross (MGR-004)</option>
                                    </select>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label small fw-bold text-secondary">Effective Date <span className="text-danger">*</span></label>
                                    <input type="date" className="form-control" required />
                                </div>

                                {modalConfig.type === 'increment' && (
                                    <div className="row g-3">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold text-secondary">Current Salary</label>
                                            <input type="text" className="form-control bg-light" value="$80,000" readOnly />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold text-primary">New Salary <span className="text-danger">*</span></label>
                                            <input type="number" className="form-control" placeholder="Enter new salary" required />
                                        </div>
                                    </div>
                                )}
                                
                                {modalConfig.type === 'promotion' && (
                                    <div className="row g-3">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold text-secondary">Current Role</label>
                                            <input type="text" className="form-control bg-light" value="Software Engineer" readOnly />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold text-success">New Designation <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" placeholder="e.g. Senior Engineer" required />
                                        </div>
                                    </div>
                                )}

                                {modalConfig.type === 'new' && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-secondary">Letter Type <span className="text-danger">*</span></label>
                                            <select className="form-select" required>
                                                <option value="">Select type...</option>
                                                <option value="warning">Warning Letter</option>
                                                <option value="experience">Experience Letter</option>
                                                <option value="noc">No Objection Certificate (NOC)</option>
                                                <option value="custom">Custom Letter</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-secondary">Message / Content</label>
                                            <textarea className="form-control" rows="4" placeholder="Additional details or custom message content to include in the letter." required></textarea>
                                        </div>
                                    </>
                                )}

                                <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                                    <button type="button" className="btn btn-light fw-bold px-4" onClick={handleCloseModal}>Cancel</button>
                                    <button type="submit" className={`btn fw-bold px-4 ${modalConfig.type === 'promotion' ? 'btn-success' : 'btn-primary'}`}>
                                        Generate Draft
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

export default LettersTab;

import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { MdAdd, MdSwapHoriz, MdCheckCircle, MdSchedule, MdHistory, MdPerson, MdMoreVert, MdDelete, MdEdit } from 'react-icons/md';

const Delegation = () => {
    const [view, setView] = useState('active'); // active, history
    const [showModal, setShowModal] = useState(false);

    const activeDelegations = [
        { id: 1, delegator: 'Rahul Sharma', delegatee: 'Sanjay Gupta', module: 'Leave Approvals', startDate: '2026-02-20', endDate: '2026-02-28', status: 'Active', reason: 'Annual Vacation' },
        { id: 2, delegator: 'Priya Verma', delegatee: 'Anita Roy', module: 'Expenses & Travel', startDate: '2026-02-22', endDate: '2026-03-05', status: 'Active', reason: 'Business Trip' },
    ];

    const delegationHistory = [
        { id: 3, delegator: 'Amit Singh', delegatee: 'Rahul Sharma', module: 'All Approvals', startDate: '2026-01-10', endDate: '2026-01-15', status: 'Expired', reason: 'Family Emergency' },
    ];

    const list = view === 'active' ? activeDelegations : delegationHistory;

    return (
        <DashboardLayout title="Work Delegation">
            <div className="container-fluid p-0 animate__animated animate__fadeIn">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="fw-bold mb-1 text-dark">Job Delegation</h4>
                        <p className="text-secondary small mb-0">Temporarily pass your approval authority and tasks to other team members.</p>
                    </div>
                    <button className="btn btn-primary d-flex align-items-center gap-2 px-4 rounded-pill shadow-sm" onClick={() => setShowModal(true)}>
                        <MdAdd size={20} />
                        <span className="fw-semibold">New Delegation</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="d-flex gap-3 mb-4">
                    <button
                        className={`btn btn-sm px-4 rounded-pill transition-all ${view === 'active' ? 'btn-primary shadow' : 'btn-light border text-secondary'}`}
                        onClick={() => setView('active')}
                    >
                        Active Delegations
                    </button>
                    <button
                        className={`btn btn-sm px-4 rounded-pill transition-all ${view === 'history' ? 'btn-primary shadow' : 'btn-light border text-secondary'}`}
                        onClick={() => setView('history')}
                    >
                        History
                    </button>
                </div>

                {/* Info Card */}
                <div className="alert border-0 shadow-sm rounded-4 mb-4 d-flex align-items-center gap-3" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', color: '#1e40af' }}>
                    <div className="bg-white p-2 rounded-circle shadow-sm">
                        <MdSwapHoriz size={24} className="text-primary" />
                    </div>
                    <div>
                        <span className="fw-bold">Why Delegate?</span>
                        <span className="small ms-2 d-block d-md-inline opacity-75">Delegation prevents work bottlenecks when you are on leave or traveling. Authority is automatically revoked after the end date.</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="row g-4">
                    {list.map((item) => (
                        <div key={item.id} className="col-lg-6 col-xl-4">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative h-100 transition-hover">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className={`badge rounded-pill px-3 py-1 ${item.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                                            {item.status}
                                        </div>
                                        <div className="dropdown">
                                            <button className="btn btn-link text-secondary p-0" type="button" data-bs-toggle="dropdown">
                                                <MdMoreVert size={20} />
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-3">
                                                <li><a className="dropdown-item d-flex align-items-center gap-2 py-2" href="#"><MdEdit size={16} /> Edit</a></li>
                                                <li><a className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger" href="#"><MdDelete size={16} /> Revoke</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-4">
                                        <div className="text-center me-3 position-relative">
                                            <div className="bg-light rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                                <MdPerson size={24} className="text-primary" />
                                            </div>
                                            <div className="position-absolute bottom-0 start-100 translate-middle badge rounded-circle bg-white p-1 shadow-sm border">
                                                <MdSwapHoriz size={12} className="text-secondary" />
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-0">{item.delegatee}</h6>
                                            <span className="text-muted small">Assigned by {item.delegator}</span>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-light rounded-4 mb-3 border border-white">
                                        <div className="d-flex align-items-center gap-2 mb-2 text-primary fw-bold small">
                                            <MdCheckCircle size={16} />
                                            <span>MAPPING: {item.module}</span>
                                        </div>
                                        <div className="text-secondary small mb-1">
                                            <MdSchedule size={14} className="me-1" />
                                            {item.startDate} to {item.endDate}
                                        </div>
                                    </div>

                                    <div className="text-muted small">
                                        <span className="fw-bold">Reason:</span> {item.reason}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {list.length === 0 && (
                        <div className="col-12 text-center py-5">
                            <div className="opacity-25 mb-3">
                                <MdSwapHoriz size={64} />
                            </div>
                            <h5 className="text-muted">No active delegations found</h5>
                            <p className="text-muted small">Currently there are no tasks passed to others.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Delegation Modal (Placeholder Logic) */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden animate__animated animate__zoomIn animate__faster">
                            <div className="modal-header border-0 bg-primary text-white p-4">
                                <h5 className="modal-title fw-bold">Delegate Your Tasks</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body p-4">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-secondary">DELEGATE TO</label>
                                        <select className="form-select border-0 bg-light rounded-3 py-2">
                                            <option>Select team member...</option>
                                            <option>Sanjay Gupta (Senior Manager)</option>
                                            <option>Anita Roy (Lead Designer)</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-secondary">MODULE / AUTHORITY</label>
                                        <select className="form-select border-0 bg-light rounded-3 py-2">
                                            <option>All Permissions</option>
                                            <option>Leave Approvals</option>
                                            <option>Expense Claims</option>
                                            <option>Interview Feedbacks</option>
                                        </select>
                                    </div>
                                    <div className="row g-3 mb-3">
                                        <div className="col">
                                            <label className="form-label small fw-bold text-secondary">START DATE</label>
                                            <input type="date" className="form-control border-0 bg-light rounded-3 py-2" />
                                        </div>
                                        <div className="col">
                                            <label className="form-label small fw-bold text-secondary">END DATE</label>
                                            <input type="date" className="form-control border-0 bg-light rounded-3 py-2" />
                                        </div>
                                    </div>
                                    <div className="mb-0">
                                        <label className="form-label small fw-bold text-secondary">REASON / NOTES</label>
                                        <textarea className="form-control border-0 bg-light rounded-3 py-2" rows="3" placeholder="Briefly explain why..."></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer border-0 p-4 pt-0">
                                <button type="button" className="btn btn-light px-4 rounded-pill fw-bold text-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-primary px-4 rounded-pill fw-bold shadow-sm" onClick={() => setShowModal(false)}>Confirm Delegation</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .transition-all { transition: all 0.3s ease; }
                .transition-hover:hover { transform: translateY(-5px); }
                .bg-success-subtle { background-color: #f0fdf4; color: #166534; }
                .bg-secondary-subtle { background-color: #f3f4f6; color: #374151; }
                .text-main { color: #1e3a8a; }
            `}</style>
        </DashboardLayout>
    );
};

export default Delegation;

import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { MdExitToApp, MdTrendingDown, MdAssignmentTurnedIn, MdInsertChart, MdAdd, MdSearch, MdMoreVert, MdPerson, MdTimer, MdCheckCircleOutline } from 'react-icons/md';

const ExitManagement = () => {
    const [view, setView] = useState('list'); // list, analytics
    const [searchTerm, setSearchTerm] = useState('');

    const exitCases = [
        { id: 1, name: 'Suresh Raina', empId: 'EMP045', dept: 'Digital Marketing', lastDay: '2026-03-15', status: 'Notice Period', reason: 'Career Growth', progress: 40, avatar: 'SR' },
        { id: 2, name: 'Neha Kakkar', empId: 'EMP089', dept: 'Human Resources', lastDay: '2026-02-28', status: 'Pending Approval', reason: 'Personal Reasons', progress: 10, avatar: 'NK' },
        { id: 3, name: 'Mithun C.', empId: 'EMP012', dept: 'Engineering', lastDay: '2026-01-20', status: 'Settled', reason: 'Relocation', progress: 100, avatar: 'MC' },
    ];

    const stats = [
        { label: 'Active Exit Cases', value: '8', icon: <MdTimer size={24} />, color: '#f59e0b' },
        { label: 'Avg. Retention', value: '4.2 yrs', icon: <MdTrendingDown size={24} />, color: '#10b981' },
        { label: 'Pending Clearances', value: '15', icon: <MdAssignmentTurnedIn size={24} />, color: '#3b82f6' },
        { label: 'Attrition Rate', value: '12%', icon: <MdInsertChart size={24} />, color: '#ef4444' },
    ];

    return (
        <DashboardLayout title="Offboarding & Exit">
            <div className="container-fluid p-0 animate__animated animate__fadeIn">
                {/* Header Sub-Module */}
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div>
                        <h4 className="fw-bold mb-1 text-dark">Exit & Offboarding Management</h4>
                        <p className="text-secondary small mb-0">Standardize the employee separation process including exit interviews and clearance checklists.</p>
                    </div>
                    <div className="d-flex gap-2">
                        <button
                            className={`btn rounded-pill px-4 fw-bold ${view === 'analytics' ? 'btn-primary shadow-sm' : 'btn-light border text-secondary'}`}
                            onClick={() => setView('analytics')}
                        >
                            <MdInsertChart size={18} className="me-2" />
                            Analytics
                        </button>
                        <button className="btn btn-primary d-flex align-items-center gap-2 px-4 rounded-pill shadow-sm" onClick={() => { }}>
                            <MdAdd size={20} />
                            <span className="fw-semibold">Initiate Separation</span>
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="row g-4 mb-4">
                    {stats.map((s, idx) => (
                        <div key={idx} className="col-sm-6 col-md-3">
                            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div className="p-2 rounded-3 bg-light" style={{ color: s.color }}>
                                        {s.icon}
                                    </div>
                                    <div className="badge bg-light text-secondary rounded-pill small">Today</div>
                                </div>
                                <h4 className="fw-bold mb-0 text-dark">{s.value}</h4>
                                <div className="text-secondary small fw-bold opacity-75 mt-1">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main List */}
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="card-header bg-white border-0 p-4">
                        <div className="row align-items-center">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <div className="input-group bg-light rounded-pill border-0 px-3" style={{ maxWidth: '400px' }}>
                                    <span className="input-group-text border-0 bg-transparent text-secondary"><MdSearch size={20} /></span>
                                    <input
                                        type="text"
                                        className="form-control border-0 bg-transparent py-2 ps-0 shadow-none"
                                        placeholder="Search by name or employee ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 d-flex justify-content-md-end gap-2">
                                <div className="btn-group rounded-pill overflow-hidden border">
                                    <button className="btn btn-sm btn-white px-3 active border-0">All</button>
                                    <button className="btn btn-sm btn-white px-3 border-0">Notice</button>
                                    <button className="btn btn-sm btn-white px-3 border-0">Settled</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light-blue" style={{ backgroundColor: '#f8faff' }}>
                                <tr className="text-secondary small fw-bold text-uppercase" style={{ letterSpacing: '0.05em' }}>
                                    <th className="border-0 px-4 py-3">Employee</th>
                                    <th className="border-0 py-3">Last Working Day</th>
                                    <th className="border-0 py-3">Primary Reason</th>
                                    <th className="border-0 py-3">Separation Step</th>
                                    <th className="border-0 pe-4 py-3 text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exitCases.map((e) => (
                                    <tr key={e.id} className="border-bottom-light">
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                                                    style={{ width: '40px', height: '40px', background: '#e2e8f0', color: '#1e3a8a', fontSize: '13px' }}>
                                                    {e.avatar}
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark">{e.name}</div>
                                                    <div className="text-muted small">{e.empId} &bull; {e.dept}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <div className="fw-semibold text-dark">{new Date(e.lastDay).toLocaleDateString()}</div>
                                            <div className="text-muted small">
                                                <MdTimer size={14} className="me-1" />
                                                {e.status}
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <span className="badge bg-light text-secondary border px-2 py-1">{e.reason}</span>
                                        </td>
                                        <td className="py-3" style={{ minWidth: '180px' }}>
                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                <div className="progress flex-grow-1" style={{ height: '6px', borderRadius: '10px' }}>
                                                    <div
                                                        className={`progress-bar ${e.progress === 100 ? 'bg-success' : 'bg-primary'}`}
                                                        style={{ width: `${e.progress}%` }}
                                                    ></div>
                                                </div>
                                                <span className="small fw-bold text-secondary">{e.progress}%</span>
                                            </div>
                                            <div className="small text-muted" style={{ fontSize: '11px' }}>
                                                {e.progress === 100 ? 'Completed' : 'Clearance in progress'}
                                            </div>
                                        </td>
                                        <td className="pe-4 py-3 text-end">
                                            <div className="d-flex justify-content-end gap-2">
                                                <button className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold" style={{ fontSize: '12px' }}>Track</button>
                                                <div className="dropdown">
                                                    <button className="btn btn-link text-secondary p-0" type="button" data-bs-toggle="dropdown">
                                                        <MdMoreVert size={20} />
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-3">
                                                        <li><a className="dropdown-item py-2" href="#">Exit Interview</a></li>
                                                        <li><a className="dropdown-item py-2" href="#">Manage Clearance</a></li>
                                                        <li><a className="dropdown-item py-2" href="#">Download Docs</a></li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li><a className="dropdown-item py-2 text-danger" href="#">Delete Case</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer bg-white p-4 border-0">
                        <div className="d-flex align-items-center gap-3 p-3 rounded-4 border" style={{ backgroundColor: '#fffbeb', color: '#854d0e' }}>
                            <div className="bg-white p-2 rounded-circle shadow-sm">
                                <MdCheckCircleOutline size={24} className="text-warning" />
                            </div>
                            <div className="small">
                                <span className="fw-bold">HR Tip:</span> Exit interviews provide valuable data for
                                <span className="fw-bold px-1">Predictive Attrition Modeling</span>. Ensure data is anonymized before sharing with leadership.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .border-bottom-light { border-bottom: 1px solid #f1f5f9; }
                .bg-light-blue { background-color: #f8faff; }
                .transition-hover:hover { background-color: #f8faff !important; }
            `}</style>
        </DashboardLayout>
    );
};

export default ExitManagement;

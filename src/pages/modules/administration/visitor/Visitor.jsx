import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { MdAdd, MdCardMembership, MdSchedule, MdLogin, MdLogout, MdSearch, MdFilterList, MdMoreVert, MdQrCodeScanner, MdShield } from 'react-icons/md';

const Visitor = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);

    const visitors = [
        { id: 1, name: 'John Doe', company: 'Global Tech', contact: '+91 98765 43210', host: 'Rahul Sharma', purpose: 'Business Meeting', status: 'Checked In', timeIn: '10:15 AM', timeOut: '--', avatar: 'JD', date: '21 Feb 2026' },
        { id: 2, name: 'Alice Smith', company: 'Self', contact: '+91 91234 56789', host: 'Priya Verma', purpose: 'Interview', status: 'Completed', timeIn: '02:00 PM', timeOut: '03:45 PM', avatar: 'AS', date: '20 Feb 2026' },
        { id: 3, name: 'Robert C.', company: 'Axis Logistics', contact: '+91 88888 77777', host: 'Front Desk', purpose: 'Delivery', status: 'Expected', timeIn: '--', timeOut: '--', avatar: 'RC', date: '22 Feb 2026' },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Checked In': return 'bg-success-subtle text-success border-success-subtle';
            case 'Completed': return 'bg-secondary-subtle text-secondary border-secondary-subtle';
            case 'Expected': return 'bg-primary-subtle text-primary border-primary-subtle';
            default: return 'bg-light text-dark';
        }
    };

    return (
        <DashboardLayout title="Visitor Log">
            <div className="container-fluid p-0 animate__animated animate__fadeIn">
                {/* Header and Quick Stats */}
                <div className="row g-4 mb-4">
                    <div className="col-12 d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h4 className="fw-bold mb-1 text-dark">Office Visitor Management</h4>
                            <p className="text-secondary small mb-0">Securely track guest entries, pre-register visitors, and manage meeting room access.</p>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-primary d-flex align-items-center gap-2 px-3 rounded-pill" onClick={() => { }}>
                                <MdQrCodeScanner size={18} />
                                <span className="small fw-bold">Scan QR</span>
                            </button>
                            <button className="btn btn-primary d-flex align-items-center gap-2 px-4 rounded-pill shadow-sm" onClick={() => setShowModal(true)}>
                                <MdAdd size={20} />
                                <span className="fw-semibold">New Guest</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mb-4">
                    {[
                        { label: 'Total Visits (Month)', value: '124', icon: <MdCardMembership size={24} />, color: '#3b82f6', bg: '#eff6ff' },
                        { label: 'Inside Premise', value: '12', icon: <MdLogin size={24} />, color: '#10b981', bg: '#f0fdf4' },
                        { label: 'Pre-registered', value: '8', icon: <MdSchedule size={24} />, color: '#f59e0b', bg: '#fffbeb' },
                        { label: 'Security Alerts', value: '0', icon: <MdShield size={24} />, color: '#ef4444', bg: '#fef2f2' },
                    ].map((stat, idx) => (
                        <div key={idx} className="col-sm-6 col-lg-3">
                            <div className="card border-0 shadow-sm rounded-4 h-100 p-3" style={{ borderLeft: `4px solid ${stat.color}` }}>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="p-2 rounded-3 shadow-sm" style={{ backgroundColor: stat.bg, color: stat.color }}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <div className="text-secondary small fw-bold opacity-75">{stat.label}</div>
                                        <h4 className="fw-bold mb-0" style={{ color: '#1e293b' }}>{stat.value}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters and Table */}
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                    <div className="card-header bg-white border-0 p-4">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="input-group bg-light rounded-pill border-0 px-3">
                                    <span className="input-group-text border-0 bg-transparent text-secondary"><MdSearch size={20} /></span>
                                    <input
                                        type="text"
                                        className="form-control border-0 bg-transparent py-2 ps-0 shadow-none"
                                        placeholder="Search by name, company or host..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 d-flex justify-content-md-end gap-2">
                                <button className="btn btn-light rounded-pill px-4 d-flex align-items-center gap-2 border text-secondary fw-semibold">
                                    <MdFilterList size={18} /> Filters
                                </button>
                                <button className="btn btn-light rounded-pill px-4 border text-secondary fw-semibold">Export Log</button>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table border-0 mb-0 align-middle">
                            <thead className="bg-light-blue" style={{ backgroundColor: '#f8faff' }}>
                                <tr className="text-secondary small fw-bold text-uppercase" style={{ letterSpacing: '0.05em' }}>
                                    <th className="border-0 px-4 py-3">Visitor Info</th>
                                    <th className="border-0 py-3">Host & Purpose</th>
                                    <th className="border-0 py-3 text-center">In / Out</th>
                                    <th className="border-0 py-3 text-center">Status</th>
                                    <th className="border-0 pe-4 py-3 text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visitors.map((v) => (
                                    <tr key={v.id} className="border-bottom-light transition-hover" style={{ backgroundColor: '#fff' }}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                                                    style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: '#fff', fontSize: '13px' }}>
                                                    {v.avatar}
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark">{v.name}</div>
                                                    <div className="text-muted small">{v.company} &bull; {v.contact}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <div className="fw-semibold" style={{ color: '#475569' }}>{v.host}</div>
                                            <div className="text-muted small">{v.purpose}</div>
                                        </td>
                                        <td className="py-3 text-center">
                                            <div className="small fw-bold">
                                                <span className="text-success">{v.timeIn}</span>
                                                <span className="text-muted mx-1">/</span>
                                                <span className="text-danger">{v.timeOut}</span>
                                            </div>
                                            <div className="text-muted" style={{ fontSize: '10px' }}>{v.date}</div>
                                        </td>
                                        <td className="py-3 text-center">
                                            <span className={`badge rounded-pill border px-3 py-1 ${getStatusStyle(v.status)}`}>
                                                {v.status}
                                            </span>
                                        </td>
                                        <td className="pe-4 py-3 text-end">
                                            <div className="dropdown">
                                                <button className="btn btn-link text-secondary p-0" type="button" data-bs-toggle="dropdown">
                                                    <MdMoreVert size={20} />
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-3">
                                                    <li><a className="dropdown-item py-2" href="#">Check Out</a></li>
                                                    <li><a className="dropdown-item py-2" href="#">Print Badge</a></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><a className="dropdown-item py-2 text-danger" href="#">Blacklist</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal - New Guest */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="modal-header border-0 bg-primary text-white p-4">
                                <h5 className="modal-title fw-bold">Pre-Register / Log Guest</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body p-4 bg-light">
                                <div className="row g-3">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label small fw-bold text-secondary">VISITOR NAME</label>
                                        <input type="text" className="form-control border-0 rounded-3 py-2 shadow-sm" placeholder="Enter full name" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label small fw-bold text-secondary">COMPANY / ORGANIZATION</label>
                                        <input type="text" className="form-control border-0 rounded-3 py-2 shadow-sm" placeholder="Self or Company name" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label small fw-bold text-secondary">PHONE NUMBER</label>
                                        <input type="text" className="form-control border-0 rounded-3 py-2 shadow-sm" placeholder="+91 XXXX XXXX" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label small fw-bold text-secondary">HOST (TEAM MEMBER)</label>
                                        <select className="form-select border-0 rounded-3 py-2 shadow-sm">
                                            <option>Search for employee...</option>
                                            <option>Rahul Sharma (Engineering)</option>
                                            <option>Priya Verma (HR)</option>
                                            <option>Anita Roy (Design)</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label small fw-bold text-secondary">FOR DATE</label>
                                        <input type="date" className="form-control border-0 rounded-3 py-2 shadow-sm" defaultValue={new Date().toISOString().split('T')[0]} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-bold text-secondary">PURPOSE OF VISIT</label>
                                        <textarea className="form-control border-0 rounded-3 py-2 shadow-sm" rows="2" placeholder="Interview, Sales meeting, Delivery etc..."></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0 p-4 bg-white">
                                <button type="button" className="btn btn-light px-4 rounded-pill fw-bold text-secondary shadow-sm" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary px-4 rounded-pill fw-bold shadow-sm" onClick={() => setShowModal(false)}>Register & Send Invite</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .transition-hover:hover { background-color: #f8faff !important; }
                .border-bottom-light { border-bottom: 1px solid #f1f5f9; }
                .bg-success-subtle { background-color: #f0fdf4; color: #166534; }
                .bg-secondary-subtle { background-color: #f3f4f6; color: #374151; }
                .bg-primary-subtle { background-color: #eff6ff; color: #1e40af; }
                .bg-light-blue { background-color: #f8faff; }
            `}</style>
        </DashboardLayout>
    );
};

export default Visitor;

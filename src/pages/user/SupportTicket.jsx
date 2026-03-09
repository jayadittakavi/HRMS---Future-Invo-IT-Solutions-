import React, { useState } from 'react';
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    FaPlus, FaSearch, FaFilter, FaTicketAlt, FaClock,
    FaCheckCircle, FaExclamationCircle, FaUserTag,
    FaArrowRight, FaEllipsisV, FaEnvelopeOpenText
} from 'react-icons/fa';

const SupportTicket = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [tickets, setTickets] = useState([
        { id: '#TKT-782', subject: 'Login issue on payroll module', category: 'Technical', status: 'Open', priority: 'High', date: '2026-03-09', description: 'Unable to login via the Android application since the last update. The screen just spins.' },
        { id: '#TKT-741', subject: 'Tax calculation query', category: 'Finance', status: 'In Progress', priority: 'Medium', date: '2026-03-07', description: 'The tax deduction for February seems higher than expected.' },
        { id: '#TKT-692', subject: 'Missing employee document', category: 'HR', status: 'Closed', priority: 'Low', date: '2026-03-01', description: 'Confirmed my degree certificate was uploaded.' },
    ]);

    const [newTicket, setNewTicket] = useState({ subject: '', category: 'Technical', priority: 'Medium', description: '' });

    const handleRaiseTicket = (e) => {
        e.preventDefault();
        const ticket = {
            id: `#TKT-${Math.floor(Math.random() * 900) + 100}`,
            ...newTicket,
            status: 'Open',
            date: new Date().toISOString().split('T')[0]
        };
        setTickets([ticket, ...tickets]);
        setShowModal(false);
        setNewTicket({ subject: '', category: 'Technical', priority: 'Medium', description: '' });
        alert("Support Ticket raised successfully!");
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Open': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
            case 'In Progress': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' };
            case 'Closed': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' };
            default: return { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' };
        }
    };

    const stats = [
        { label: 'Total Active', count: tickets.length, icon: <FaEnvelopeOpenText />, color: '#818cf8', bg: 'rgba(129, 140, 248, 0.1)' },
        { label: 'Pending Action', count: tickets.filter(t => t.status === 'Open').length, icon: <FaExclamationCircle />, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
        { label: 'Resolution Rate', count: '84%', icon: <FaCheckCircle />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    ];

    const filteredTickets = tickets.filter(t =>
        t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout title="Concierge & Support">
            <div style={{ padding: '0px', maxWidth: '100%', margin: '0 auto' }}>

                {/* Visual Stats Summary */}
                <div className="row g-4 mb-5">
                    {stats.map((stat, i) => (
                        <div key={i} className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm rounded-4"
                                style={{
                                    padding: '24px',
                                    background: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.5)'
                                }}>
                                <div className="d-flex align-items-center gap-4">
                                    <div style={{
                                        width: 58, height: 58, borderRadius: '18px',
                                        background: stat.bg, color: stat.color,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.4rem'
                                    }}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                                        <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>{stat.count}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Header Controls */}
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)'
                    }}>
                    <div className="card-header bg-transparent border-0 p-4">
                        <div className="row g-3 align-items-center">
                            <div className="col-md-6">
                                <div className="position-relative">
                                    <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted opacity-50" />
                                    <input
                                        type="text"
                                        className="form-control rounded-pill ps-5 border-0 shadow-sm"
                                        placeholder="Search by Ticket ID or Subject..."
                                        style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '12px 20px 12px 48px' }}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 text-end">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="btn rounded-pill px-4 d-flex align-items-center gap-2 shadow-lg border-0 ms-auto"
                                    style={{
                                        background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                                        color: 'white',
                                        padding: '12px 28px',
                                        fontWeight: 700
                                    }}>
                                    <FaPlus size={14} /> Raise New Ticket
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="card-body p-0 mt-2">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0 align-middle">
                                <thead style={{ background: 'rgba(129, 140, 248, 0.04)' }}>
                                    <tr>
                                        <th className="px-4 py-3 border-0 text-muted small fw-bold">REFERENCE</th>
                                        <th className="py-3 border-0 text-muted small fw-bold">ISSUE DETAILS</th>
                                        <th className="py-3 border-0 text-muted small fw-bold text-center">PRIORITY</th>
                                        <th className="py-3 border-0 text-muted small fw-bold text-center">STATUS</th>
                                        <th className="pe-4 py-3 border-0 text-muted small fw-bold text-end">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTickets.map((t, idx) => {
                                        const statusStyle = getStatusStyle(t.status);
                                        return (
                                            <tr key={idx} className="border-bottom border-light">
                                                <td className="px-4 py-4 fw-bold" style={{ color: '#818cf8', fontSize: '0.9rem' }}>{t.id}</td>
                                                <td className="py-4">
                                                    <div className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                                                        {t.subject}
                                                        <span className="badge bg-light text-muted fw-normal" style={{ fontSize: '0.65rem' }}>{t.category}</span>
                                                    </div>
                                                    <div className="text-muted small"><FaClock className="me-1 opacity-50" /> Raised on {t.date}</div>
                                                </td>
                                                <td className="py-4 text-center">
                                                    <span style={{
                                                        padding: '6px 14px', borderRadius: '50px',
                                                        fontSize: '0.72rem', fontWeight: 800,
                                                        background: t.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : t.priority === 'Medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                        color: t.priority === 'High' ? '#ef4444' : t.priority === 'Medium' ? '#f59e0b' : '#10b981',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        {t.priority}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-center">
                                                    <span style={{
                                                        padding: '6px 14px', borderRadius: '50px',
                                                        fontSize: '0.72rem', fontWeight: 800,
                                                        background: statusStyle.bg, color: statusStyle.color,
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        {t.status}
                                                    </span>
                                                </td>
                                                <td className="pe-4 py-4 text-end">
                                                    <button
                                                        onClick={() => setSelectedTicket(t)}
                                                        className="btn btn-sm rounded-pill px-3 border-0 shadow-sm"
                                                        style={{ background: 'rgba(129, 140, 248, 0.1)', color: '#818cf8', fontWeight: 700, fontSize: '0.8rem' }}>
                                                        View Thread <FaArrowRight size={10} className="ms-1" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Raise Ticket Modal */}
                {showModal && (
                    <div className="modal fade show d-block" style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content border-0 shadow-2xl rounded-4 overflow-hidden">
                                <div style={{ background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)', padding: '32px', color: 'white' }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="modal-title fw-bold fs-4 m-0">Raise Support Ticket</h5>
                                        <button onClick={() => setShowModal(false)} className="btn-close btn-close-white shadow-none"></button>
                                    </div>
                                    <p className="opacity-75 m-0 mt-2">Professional assistance for your workplace needs.</p>
                                </div>
                                <div className="modal-body p-4">
                                    <form onSubmit={handleRaiseTicket}>
                                        <div className="row g-4">
                                            <div className="col-12">
                                                <label className="form-label fw-bold small text-muted text-uppercase">Ticket Subject</label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded-3 p-3 bg-light border-0 shadow-none"
                                                    required
                                                    placeholder="Briefly describe the primary issue"
                                                    value={newTicket.subject}
                                                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold small text-muted text-uppercase">Service Category</label>
                                                <select
                                                    className="form-select rounded-3 p-3 bg-light border-0 shadow-none"
                                                    value={newTicket.category}
                                                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                                                >
                                                    <option>Technical</option>
                                                    <option>Finance</option>
                                                    <option>HR</option>
                                                    <option>Workspace</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold small text-muted text-uppercase">Priority Level</label>
                                                <select
                                                    className="form-select rounded-3 p-3 bg-light border-0 shadow-none"
                                                    value={newTicket.priority}
                                                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                                                >
                                                    <option>Low</option>
                                                    <option>Medium</option>
                                                    <option>High</option>
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-bold small text-muted text-uppercase">Detailed Description</label>
                                                <textarea
                                                    className="form-control rounded-3 p-3 bg-light border-0 shadow-none"
                                                    rows="4"
                                                    required
                                                    placeholder="Explain the situation in detail..."
                                                    value={newTicket.description}
                                                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="mt-5 d-flex gap-3">
                                            <button type="button" onClick={() => setShowModal(false)} className="btn btn-light rounded-pill px-4 py-3 fw-bold w-100 border-0">Discard</button>
                                            <button type="submit" className="btn btn-primary rounded-pill px-4 py-3 fw-bold w-100 border-0 shadow-lg" style={{ background: '#818cf8' }}>Submit Requets</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* View Details Modal */}
                {selectedTicket && (
                    <div className="modal fade show d-block" style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow-2xl rounded-4 overflow-hidden">
                                <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-light">
                                    <h5 className="modal-title fw-bold m-0" style={{ color: '#4c1d95' }}>Ticket Thread: {selectedTicket.id}</h5>
                                    <button onClick={() => setSelectedTicket(null)} className="btn-close shadow-none"></button>
                                </div>
                                <div className="modal-body p-4">
                                    <div className="mb-4">
                                        <label className="small fw-bold text-muted text-uppercase opacity-75">Subject & Intent</label>
                                        <div className="fs-5 fw-bold text-dark">{selectedTicket.subject}</div>
                                    </div>
                                    <div className="row g-4 mb-4">
                                        <div className="col-6">
                                            <label className="small fw-bold text-muted text-uppercase opacity-75">Current Status</label>
                                            <div className="mt-2">
                                                <span style={{
                                                    padding: '6px 16px', borderRadius: '50px',
                                                    fontSize: '0.7rem', fontWeight: 800,
                                                    background: getStatusStyle(selectedTicket.status).bg,
                                                    color: getStatusStyle(selectedTicket.status).color,
                                                    textTransform: 'uppercase'
                                                }}>{selectedTicket.status}</span>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <label className="small fw-bold text-muted text-uppercase opacity-75">Impact Level</label>
                                            <div className="mt-2">
                                                <span style={{
                                                    padding: '6px 16px', borderRadius: '50px',
                                                    fontSize: '0.7rem', fontWeight: 800,
                                                    background: selectedTicket.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                    color: selectedTicket.priority === 'High' ? '#ef4444' : '#10b981',
                                                    textTransform: 'uppercase'
                                                }}>{selectedTicket.priority}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-4 bg-light border-0 shadow-none">
                                        <label className="small fw-bold text-muted text-uppercase d-block mb-2 opacity-75">Message Content</label>
                                        <p className="text-dark m-0" style={{ lineHeight: 1.7, fontSize: '0.92rem' }}>{selectedTicket.description}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-white d-flex gap-2">
                                    <button onClick={() => setSelectedTicket(null)} className="btn btn-primary rounded-pill w-100 py-3 fw-bold border-0" style={{ background: '#818cf8', boxShadow: '0 4px 15px rgba(129, 140, 248, 0.3)' }}>Close View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default SupportTicket;

import React, { useState } from 'react';
import DashboardLayout from "../../components/layout/DashboardLayout";
import { FaPlus, FaSearch, FaFilter, FaTicketAlt, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const SupportTicket = () => {
    const [tickets, setTickets] = useState([
        { id: '#TKT-001', subject: 'Login issue on mobile', status: 'Open', priority: 'High', date: '2026-03-05' },
        { id: '#TKT-002', subject: 'Payroll calculation discrepancy', status: 'In Progress', priority: 'Medium', date: '2026-03-04' },
        { id: '#TKT-003', subject: 'Request for document upload', status: 'Closed', priority: 'Low', date: '2026-03-01' },
    ]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Open': return <span className="badge bg-danger">Open</span>;
            case 'In Progress': return <span className="badge bg-warning text-dark">In Progress</span>;
            case 'Closed': return <span className="badge bg-success">Closed</span>;
            default: return <span className="badge bg-secondary">{status}</span>;
        }
    };

    return (
        <DashboardLayout title="Support Tickets">
            <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 style={{ fontWeight: 800, color: '#1e293b' }}>Support Center</h2>
                        <p style={{ color: '#64748b' }}>Need help? Raise a ticket or track your existing requests.</p>
                    </div>
                    <button className="btn btn-primary d-flex align-items-center gap-2 px-4 rounded-pill shadow-sm py-2">
                        <FaPlus size={14} /> Raise New Ticket
                    </button>
                </div>

                {/* Stats Row */}
                <div className="row g-3 mb-4">
                    {[
                        { label: 'Total Tickets', count: 12, icon: <FaTicketAlt color="#3b82f6" />, bg: '#eff6ff' },
                        { label: 'Open', count: 3, icon: <FaExclamationCircle color="#ef4444" />, bg: '#fef2f2' },
                        { label: 'In Progress', count: 2, icon: <FaClock color="#f59e0b" />, bg: '#fffbeb' },
                        { label: 'Resolved', count: 7, icon: <FaCheckCircle color="#10b981" />, bg: '#f0fdf4' },
                    ].map((stat, i) => (
                        <div key={i} className="col-md-3">
                            <div className="card border-0 shadow-sm rounded-4" style={{ padding: '20px' }}>
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{ width: 48, height: 48, borderRadius: 12, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{stat.label}</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>{stat.count}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tickets Table Card */}
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-bold">Recent Tickets</h5>
                        <div className="d-flex gap-2">
                            <div className="position-relative">
                                <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={14} />
                                <input type="text" className="form-control form-control-sm rounded-pill ps-5" placeholder="Search ID, Subject..." style={{ width: '220px' }} />
                            </div>
                            <button className="btn btn-light btn-sm rounded-pill border px-3 d-flex align-items-center gap-2">
                                <FaFilter size={12} /> Filter
                            </button>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table custom-table mb-0" style={{ verticalAlign: 'middle' }}>
                                <thead style={{ background: '#f8fafc' }}>
                                    <tr>
                                        <th className="ps-4">Ticket ID</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th className="text-end pe-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((t, idx) => (
                                        <tr key={idx}>
                                            <td className="ps-4 fw-bold color-primary">{t.id}</td>
                                            <td>{t.subject}</td>
                                            <td>{t.date}</td>
                                            <td>
                                                <span className={`badge ${t.priority === 'High' ? 'bg-danger-soft' : t.priority === 'Medium' ? 'bg-warning-soft' : 'bg-success-soft'}`}
                                                    style={{ color: t.priority === 'High' ? '#ef4444' : t.priority === 'Medium' ? '#f59e0b' : '#10b981', fontWeight: 700 }}>
                                                    {t.priority}
                                                </span>
                                            </td>
                                            <td>{getStatusBadge(t.status)}</td>
                                            <td className="text-end pe-4">
                                                <button className="btn btn-sm btn-outline-primary rounded-pill px-3">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SupportTicket;

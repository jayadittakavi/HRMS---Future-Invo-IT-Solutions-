import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { useAutomation } from '../../../context/AutomationContext';
import {
    MdDashboard, MdAddCircle, MdList, MdPeople, MdHistory,
    MdMoreVert, MdSearch, MdFilterList, MdCheckCircle,
    MdPendingActions, MdErrorOutline, MdForum, MdAttachFile,
    MdAssignmentInd, MdOutlineConfirmationNumber, MdSupportAgent,
    MdSend, MdShield, MdArrowBack, MdClose, MdFlag
} from 'react-icons/md';

export const HelpdeskContent = () => {
    const { user } = useAuth();
    const { triggerEvent } = useAutomation();
    const role = user?.role?.toLowerCase() || 'employee';

    const [activeTab, setActiveTab] = useState('dashboard');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [ticketSearch, setTicketSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    // Mock Data for Tickets
    const [tickets, setTickets] = useState([
        {
            id: 'TKT-001',
            subject: 'Email login issue',
            category: 'IT Support',
            priority: 'High',
            status: 'Open',
            creator: 'John Doe',
            team: 'Engineering',
            assignedTo: 'Admin',
            date: '2026-02-24',
            description: 'Cannot access my outlook account after the recent password change.',
            comments: [
                { user: 'System', text: 'Ticket created successfully.', time: '10:00 AM' }
            ]
        },
        {
            id: 'TKT-002',
            subject: 'January Salary Slip missing',
            category: 'Payroll',
            priority: 'Medium',
            status: 'In Progress',
            creator: 'Alice Smith',
            team: 'HR',
            assignedTo: 'HR Manager',
            date: '2026-02-23',
            description: 'My salary slip for January 2026 is not visible in the dashboard.',
            comments: [
                { user: 'HR Manager', text: 'We are looking into it. Please wait.', time: '02:30 PM' }
            ]
        },
        {
            id: 'TKT-003',
            subject: 'WFH policy query',
            category: 'HR Query',
            priority: 'Low',
            status: 'Resolved',
            creator: 'Bob Wilson',
            team: 'Marketing',
            assignedTo: 'HR Admin',
            date: '2026-02-22',
            description: 'How many WFH days are allowed per month?',
            comments: [
                { user: 'HR Admin', text: 'You are allowed 4 days per month.', time: '11:15 AM' }
            ]
        }
    ]);

    const stats = {
        total: role === 'employee' ? tickets.filter(t => t.creator === user?.name).length : tickets.length,
        open: (role === 'employee' ? tickets.filter(t => t.creator === user?.name) : tickets).filter(t => t.status === 'Open').length,
        inProgress: (role === 'employee' ? tickets.filter(t => t.creator === user?.name) : tickets).filter(t => t.status === 'In Progress').length,
        resolved: (role === 'employee' ? tickets.filter(t => t.creator === user?.name) : tickets).filter(t => t.status === 'Resolved').length,
    };

    const handleAction = (action, data) => {
        console.log(`Action: ${action}`, data);
        alert(`${action} successful! (Mock Integration)`);
    };

    const getStatusStyle = (status) => {
        const styles = {
            'Open': 'bg-primary-subtle text-primary border-primary',
            'In Progress': 'bg-warning-subtle text-warning border-warning',
            'Resolved': 'bg-success-subtle text-success border-success',
            'Closed': 'bg-secondary-subtle text-secondary border-secondary',
            'Escalated': 'bg-danger-subtle text-danger border-danger',
        };
        return `badge rounded-pill border px-3 py-1 ${styles[status] || 'bg-light text-dark'}`;
    };

    const getPriorityStyle = (priority) => {
        const styles = {
            'Urgent': 'text-danger',
            'High': 'text-orange',
            'Medium': 'text-primary',
            'Low': 'text-secondary',
        };
        return `fw-bold ${styles[priority] || ''}`;
    };

    const filteredTickets = tickets.filter(t => {
        const matchesRole = role === 'superadmin' || role === 'admin'
            ? true
            : role === 'hr'
                ? (t.category === 'HR Query' || t.category === 'Payroll' || t.creator === user?.name)
                : role === 'manager'
                    ? (t.team === 'Engineering' || t.creator === user?.name) // Engineering is mock team for john doe manager
                    : t.creator === user?.name;

        const matchesSearch = t.id.toLowerCase().includes(ticketSearch.toLowerCase()) ||
            t.subject.toLowerCase().includes(ticketSearch.toLowerCase());

        const matchesCategory = filterCategory === 'All' || t.category === filterCategory;

        return matchesRole && matchesSearch && matchesCategory;
    });

    return (
        <div className="container-fluid p-0 animate__animated animate__fadeIn">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Support Helpdesk</h4>
                    <p className="text-secondary small mb-0">Raise and track your support requests.</p>
                </div>
                <button
                    className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm"
                    style={{ borderRadius: '12px' }}
                    onClick={() => setShowCreateModal(true)}
                >
                    <MdAddCircle size={20} /> Raise New Ticket
                </button>
            </div>

            {/* Dash Counters */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Total Tickets', value: stats.total, icon: <MdOutlineConfirmationNumber />, color: 'primary' },
                    { label: 'Open', value: stats.open, icon: <MdErrorOutline />, color: 'danger' },
                    { label: 'In Progress', value: stats.inProgress, icon: <MdPendingActions />, color: 'warning' },
                    { label: 'Resolved', value: stats.resolved, icon: <MdCheckCircle />, color: 'success' },
                ].map((stat, i) => (
                    <div className="col-md-3" key={i}>
                        <div className="card shadow-sm border-0 rounded-4 p-3 bg-white">
                            <div className="d-flex align-items-center gap-3">
                                <div className={`bg-${stat.color}-subtle p-3 rounded-4 text-${stat.color}`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="fw-bold mb-0">{stat.value}</h3>
                                    <p className="text-secondary small mb-0">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation & Filters */}
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white p-4">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                    <ul className="nav nav-pills bg-light p-1 rounded-3" style={{ gap: '4px' }}>
                        <li className="nav-item">
                            <button className={`nav-link rounded-3 py-2 px-3 ${activeTab === 'dashboard' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('dashboard')}>
                                <MdDashboard className="me-2" /> Overview
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link rounded-3 py-2 px-3 ${activeTab === 'tickets' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('tickets')}>
                                <MdList className="me-2" /> Tickets List
                            </button>
                        </li>
                        {(role === 'superadmin' || role === 'admin') && (
                            <li className="nav-item">
                                <button className={`nav-link rounded-3 py-2 px-3 ${activeTab === 'reports' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('reports')}>
                                    <MdHistory className="me-2" /> Audit & Reports
                                </button>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex gap-2">
                        <div className="input-group bg-light rounded-pill px-3 py-1 shadow-sm border" style={{ width: '250px' }}>
                            <span className="input-group-text bg-transparent border-0"><MdSearch /></span>
                            <input
                                type="text"
                                className="form-control bg-transparent border-0 small"
                                placeholder="Search ticket id or subject..."
                                value={ticketSearch}
                                onChange={(e) => setTicketSearch(e.target.value)}
                            />
                        </div>
                        <select
                            className="form-select rounded-pill border shadow-sm bg-light small"
                            style={{ width: '150px' }}
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="IT Support">IT Support</option>
                            <option value="Payroll">Payroll</option>
                            <option value="HR Query">HR Query</option>
                            <option value="Office Admin">Office Admin</option>
                        </select>
                    </div>
                </div>

                {/* Tickets Table */}
                <div className="table-responsive">
                    <table className="table border-0 mb-0 align-middle">
                        <thead className="bg-light">
                            <tr className="small text-secondary fw-bold text-uppercase">
                                <th className="px-4 py-3 border-0">Ticket ID</th>
                                <th className="py-3 border-0">Subject</th>
                                <th className="py-3 border-0">Category</th>
                                <th className="py-3 border-0">Priority</th>
                                <th className="py-3 border-0">Status</th>
                                <th className="py-3 border-0 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map(ticket => (
                                <tr key={ticket.id} className="border-bottom-light">
                                    <td className="px-4 py-3 fw-bold text-primary">{ticket.id}</td>
                                    <td className="py-3">
                                        <div className="fw-medium">{ticket.subject}</div>
                                        <div className="text-muted small">By: {ticket.creator} • {ticket.date}</div>
                                    </td>
                                    <td className="py-3 small fw-medium">{ticket.category}</td>
                                    <td className="py-3 small">
                                        <span className={getPriorityStyle(ticket.priority)}>
                                            <MdFlag className="me-1" /> {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <span className={getStatusStyle(ticket.status)}>{ticket.status}</span>
                                    </td>
                                    <td className="py-3 text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button
                                                className="btn btn-sm btn-light border-0 rounded-circle text-primary"
                                                title="View Details"
                                                onClick={() => setSelectedTicket(ticket)}
                                            >
                                                <MdForum size={18} />
                                            </button>
                                            {(role === 'admin' || role === 'superadmin') && (
                                                <button
                                                    className="btn btn-sm btn-light border-0 rounded-circle text-info"
                                                    title="Assign Staff"
                                                    onClick={() => handleAction('Assign', ticket.id)}
                                                >
                                                    <MdSupportAgent size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals Implementation */}
            {showCreateModal && (
                <div className="modal-overlay d-flex align-items-center justify-content-center">
                    <div className="card border-0 shadow-lg rounded-4 p-4 animate__animated animate__zoomIn" style={{ width: '500px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold text-primary mb-0">Raise New Ticket</h5>
                            <button className="btn btn-light rounded-circle p-1" onClick={() => setShowCreateModal(false)}><MdClose /></button>
                        </div>
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label small fw-bold text-secondary">Subject</label>
                                <input type="text" className="form-control border-0 bg-light shadow-sm" placeholder="Brief summary of issue..." />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-bold text-secondary">Category</label>
                                <select className="form-select border-0 bg-light shadow-sm">
                                    <option>IT Support</option>
                                    <option>Payroll</option>
                                    <option>HR Query</option>
                                    <option>Office Admin</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-bold text-secondary">Priority</label>
                                <select className="form-select border-0 bg-light shadow-sm">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Urgent</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label className="form-label small fw-bold text-secondary">Description</label>
                                <textarea className="form-control border-0 bg-light shadow-sm" rows="3" placeholder="Explain the problem in detail..."></textarea>
                            </div>
                            <div className="col-md-12">
                                <label className="form-label small fw-bold text-secondary">Attachments</label>
                                <div className="p-3 border-dashed rounded-3 text-center bg-light cursor-pointer" style={{ border: '2px dashed #cbd5e1' }}>
                                    <MdAttachFile className="fs-3 text-secondary" />
                                    <p className="mb-0 small text-secondary">Click to upload or drag files here</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex gap-2 mt-4">
                            <button className="btn btn-light w-100 rounded-pill" onClick={() => setShowCreateModal(false)}>Cancel</button>
                            <button className="btn btn-primary w-100 rounded-pill shadow-sm" onClick={() => {
                                handleAction('Create Ticket', {});
                                triggerEvent('onCreate', { module: 'Helpdesk', category: 'IT Support', creator: user?.name });
                                setShowCreateModal(false);
                            }}>Submit Ticket</button>
                        </div>
                    </div>
                </div>
            )}

            {selectedTicket && (
                <div className="modal-overlay d-flex align-items-center justify-content-center">
                    <div className="card border-0 shadow-lg rounded-4 p-0 animate__animated animate__zoomIn overflow-hidden" style={{ width: '800px', height: '600px' }}>
                        <div className="row h-100 g-0">
                            {/* Left: Chat/Comments */}
                            <div className="col-md-7 d-flex flex-column bg-white">
                                <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-2 text-primary fw-bold">
                                        <MdForum /> Conversation Thread
                                    </div>
                                    <button className="btn btn-sm btn-light rounded-circle" onClick={() => setSelectedTicket(null)}><MdClose /></button>
                                </div>
                                <div className="flex-grow-1 p-3 overflow-auto d-flex flex-column gap-3 bg-light">
                                    {selectedTicket.comments.map((c, i) => (
                                        <div key={i} className={`d-flex flex-column ${c.user === user?.name ? 'align-items-end' : 'align-items-start'}`}>
                                            <div className={`p-3 rounded-4 shadow-sm small ${c.user === user?.name ? 'bg-primary text-white' : 'bg-white border text-dark'}`} style={{ maxWidth: '80%' }}>
                                                {c.text}
                                            </div>
                                            <div className="text-muted" style={{ fontSize: '0.65rem', marginTop: '4px' }}>{c.user} • {c.time}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-top d-flex gap-2">
                                    <input type="text" className="form-control rounded-pill border-0 shadow-sm bg-light" placeholder="Type your message..." />
                                    <button className="btn btn-primary rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center" onClick={() => handleAction('Comment', selectedTicket.id)}>
                                        <MdSend size={20} />
                                    </button>
                                </div>
                            </div>
                            {/* Right: Info */}
                            <div className="col-md-5 bg-light p-4 border-start">
                                <div className="mb-4">
                                    <div className="text-secondary small fw-bold text-uppercase mb-1">Ticket Status</div>
                                    <div className="d-flex gap-2 align-items-center">
                                        <span className={getStatusStyle(selectedTicket.status)}>{selectedTicket.status}</span>
                                        <span className={`small ${getPriorityStyle(selectedTicket.priority)}`}>({selectedTicket.priority})</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h6 className="fw-bold text-dark">{selectedTicket.id}: {selectedTicket.subject}</h6>
                                    <p className="text-muted small mt-2">{selectedTicket.description}</p>
                                </div>
                                <div className="mb-4 p-3 bg-white rounded-3 shadow-sm border">
                                    <div className="small mb-2"><strong>Raised By:</strong> {selectedTicket.creator}</div>
                                    <div className="small mb-2"><strong>Team:</strong> {selectedTicket.team}</div>
                                    <div className="small mb-0"><strong>Assigned To:</strong> {selectedTicket.assignedTo}</div>
                                </div>

                                {role !== 'employee' && (
                                    <div className="d-grid gap-2">
                                        <label className="small fw-bold text-secondary px-1">Manage Status</label>
                                        <select className="form-select form-select-sm border-0 bg-white shadow-sm rounded-3 mb-2" defaultValue={selectedTicket.status} onChange={(e) => handleAction('Status Change', e.target.value)}>
                                            <option>Open</option>
                                            <option>In Progress</option>
                                            <option>Resolved</option>
                                            <option>Closed</option>
                                            <option>Escalated</option>
                                        </select>
                                        {(role === 'admin' || role === 'superadmin') && (
                                            <button className="btn btn-sm btn-outline-danger shadow-sm rounded-3" onClick={() => handleAction('Delete', selectedTicket.id)}>
                                                Delete Ticket
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; }
                .border-bottom-light { border-bottom: 1px solid #f1f5f9; }
                .nav-pills .nav-link { font-weight: 600; font-size: 0.9rem; transition: all 0.2s; white-space: nowrap; }
                .nav-pills .nav-link.active { background-color: var(--primary-color) !important; color: #fff !important; }
                .text-orange { color: #f97316; }
                .border-dashed { border-style: dashed !important; }
                .cursor-pointer { cursor: pointer; }
            `}</style>
        </div>
    );
};

const Helpdesk = () => {
    return (
        <DashboardLayout title="Support Helpdesk" activePath="/helpdesk">
            <HelpdeskContent />
        </DashboardLayout>
    );
};

export default Helpdesk;

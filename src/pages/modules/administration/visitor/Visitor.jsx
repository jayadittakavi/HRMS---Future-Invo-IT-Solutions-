import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import {
    MdPersonAdd, MdAssignment, MdHistory, MdBarChart,
    MdCheckCircle, MdCancel, MdLogin, MdLogout, MdPrint,
    MdSearch, MdFilterList, MdTimer, MdMeetingRoom
} from 'react-icons/md';

export const VisitorContent = () => {
    const { user } = useAuth();
    const role = user?.role?.toLowerCase() || 'employee';

    const [activeTab, setActiveTab] = useState('request');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({
        status: 'All',
        date: '',
        host: ''
    });

    // Mock Data reflecting the requested flow
    const [visitors, setVisitors] = useState([
        {
            id: 1,
            name: 'John Doe',
            company: 'Tech Corp',
            purpose: 'Software Demo',
            host: 'Rahul Sharma',
            host_id: 'emp123',
            manager: 'Suresh Kumar',
            date: '2026-02-24',
            time: '02:00 PM',
            status: 'Pending', // Flow: Pending -> Approved -> Checked-In -> Checked-Out
            requested_by: 'Rahul Sharma'
        },
        {
            id: 2,
            name: 'Alice Smith',
            company: 'Self',
            purpose: 'Interview',
            host: 'Priya HR',
            host_id: 'hr456',
            manager: 'Admin',
            date: '2026-02-24',
            time: '11:00 AM',
            status: 'Approved',
            requested_by: 'Priya HR'
        },
        {
            id: 3,
            name: 'Robert C.',
            company: 'Logistics Inc',
            purpose: 'Delivery',
            host: 'Front Desk',
            host_id: 'reception',
            manager: 'Suresh Kumar',
            date: '2026-02-23',
            time: '04:15 PM',
            status: 'Checked-Out',
            check_in: '04:15 PM',
            check_out: '04:45 PM',
            requested_by: 'Suresh Kumar'
        }
    ]);

    // Unified filtering logic based on Tab, Search, and Filters
    const filteredVisitors = visitors.filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.purpose.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        // Apply Advanced Filters
        if (filters.status !== 'All' && v.status !== filters.status) return false;
        if (filters.date && v.date !== filters.date) return false;
        if (filters.host && !v.host.toLowerCase().includes(filters.host.toLowerCase())) return false;

        // Tab-specific status filtering (acts as an additional constraint)
        if (activeTab === 'approvals') return v.status === 'Pending';
        if (activeTab === 'log') return ['Checked-In', 'Checked-Out'].includes(v.status);
        if (activeTab === 'request') return true;
        if (activeTab === 'reports') return true;

        return true;
    });

    const resetFilters = () => {
        setFilters({ status: 'All', date: '', host: '' });
        setSearchTerm('');
    };

    const getStatusBadge = (status) => {
        const styles = {
            'Pending': 'bg-warning-subtle text-warning border-warning',
            'Approved': 'bg-info-subtle text-info border-info',
            'Rejected': 'bg-danger-subtle text-danger border-danger',
            'Checked-In': 'bg-success-subtle text-success border-success',
            'Checked-Out': 'bg-secondary-subtle text-secondary border-secondary'
        };
        return <span className={`badge rounded-pill border px-3 py-1 ${styles[status] || 'bg-light text-dark'}`}>{status}</span>;
    };

    const handleAction = (id, newStatus) => {
        setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
    };

    return (
        <div className="container-fluid p-0 animate__animated animate__fadeIn">
            {/* Header Area */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Visitor Management</h4>
                    <p className="text-secondary small mb-0">Track office guests, approvals, and logs.</p>
                </div>
                <button className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm" style={{ borderRadius: '12px' }} onClick={() => setShowModal(true)}>
                    <MdPersonAdd size={20} /> New Request
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-4">
                <ul className="nav nav-pills bg-white p-2 rounded-4 shadow-sm" style={{ display: 'inline-flex', gap: '8px' }}>
                    <li className="nav-item">
                        <button className={`nav-link rounded-3 px-4 ${activeTab === 'request' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('request')}>
                            <MdAssignment className="me-2" /> Visitor Request
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link rounded-3 px-4 ${activeTab === 'approvals' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('approvals')}>
                            <MdCheckCircle className="me-2" /> Approvals
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link rounded-3 px-4 ${activeTab === 'log' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('log')}>
                            <MdHistory className="me-2" /> Visitor Log
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link rounded-3 px-4 ${activeTab === 'reports' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('reports')}>
                            <MdBarChart className="me-2" /> Reports
                        </button>
                    </li>
                </ul>
            </div>

            {/* Search & Statistics */}
            <div className="row g-4 mb-4">
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                        <div className="p-3 bg-white d-flex align-items-center">
                            <MdSearch size={22} className="text-secondary ms-2" />
                            <input
                                type="text"
                                className="form-control border-0 shadow-none bg-transparent ps-3"
                                placeholder="Search visitor by name or purpose..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                className={`btn ${showFilter ? 'btn-primary' : 'btn-light'} rounded-pill px-3 border ms-2 d-flex align-items-center gap-1`}
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                <MdFilterList /> Filter {(filters.status !== 'All' || filters.date || filters.host) && <span className="badge bg-white text-primary ms-1" style={{ fontSize: '0.6rem' }}>•</span>}
                            </button>
                        </div>

                        {/* Dropdown Filter Bar */}
                        {showFilter && (
                            <div className="px-3 pb-3 bg-white border-bottom animate__animated animate__fadeInDown">
                                <div className="row g-2 align-items-end">
                                    <div className="col-md-3">
                                        <label className="x-small fw-bold text-secondary mb-1">Status</label>
                                        <select
                                            className="form-select form-select-sm border-0 bg-light rounded-3"
                                            value={filters.status}
                                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                        >
                                            <option value="All">All Status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                            <option value="Checked-In">Checked-In</option>
                                            <option value="Checked-Out">Checked-Out</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="x-small fw-bold text-secondary mb-1">Visit Date</label>
                                        <input
                                            type="date"
                                            className="form-control form-control-sm border-0 bg-light rounded-3"
                                            value={filters.date}
                                            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="x-small fw-bold text-secondary mb-1">Host Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm border-0 bg-light rounded-3"
                                            placeholder="Enter host name..."
                                            value={filters.host}
                                            onChange={(e) => setFilters({ ...filters, host: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 d-flex gap-1">
                                        <button className="btn btn-sm btn-outline-secondary w-100 rounded-3 border-0" onClick={resetFilters}>Reset</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'reports' ? (
                            <div className="p-4 bg-white rounded-4">
                                <h6 className="fw-bold mb-4 text-primary">Operational Performance Report</h6>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="p-4 border rounded-4 bg-light text-center">
                                            <h2 className="fw-bold text-dark">85%</h2>
                                            <p className="text-secondary small mb-0">Check-in Efficiency</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="p-4 border rounded-4 bg-light text-center">
                                            <h2 className="fw-bold text-dark">18 mins</h2>
                                            <p className="text-secondary small mb-0">Avg. Meeting Duration</p>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="p-3 border-start border-primary border-4 rounded bg-primary-subtle mt-2">
                                            <small className="fw-bold d-block">Monthly Insight</small>
                                            <span className="small">Visitor traffic increased by 12% this week compared to last week.</span>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <div className="table-responsive mt-3">
                                    <h6 className="small fw-bold text-uppercase text-secondary mb-3">All Visitor Data Export View</h6>
                                    <table className="table table-sm border">
                                        <thead className="bg-light">
                                            <tr className="small">
                                                <th>Ref ID</th>
                                                <th>Visitor</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {visitors.map(v => (
                                                <tr key={v.id} className="small">
                                                    <td>#VST-00{v.id}</td>
                                                    <td>{v.name}</td>
                                                    <td>{v.date}</td>
                                                    <td>{v.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table border-0 mb-0 align-middle">
                                    <thead className="bg-light">
                                        <tr className="small text-secondary fw-bold text-uppercase">
                                            <th className="px-4 py-3 border-0">Visitor</th>
                                            <th className="py-3 border-0">Purpose</th>
                                            <th className="py-3 border-0">Host / Meeting With</th>
                                            <th className="py-3 border-0">Time</th>
                                            <th className="py-3 border-0">Status</th>
                                            <th className="pe-4 py-3 border-0 text-end">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredVisitors.map(v => (
                                            <tr key={v.id} className="border-bottom-light">
                                                <td className="px-4 py-3">
                                                    <div className="fw-bold">{v.name}</div>
                                                    <div className="text-muted small">{v.company}</div>
                                                </td>
                                                <td className="py-3 small fw-medium">{v.purpose}</td>
                                                <td className="py-3">
                                                    <div className="fw-bold small">{v.host}</div>
                                                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>{v.date}</div>
                                                </td>
                                                <td className="py-3 small">{v.time}</td>
                                                <td className="py-3">{getStatusBadge(v.status)}</td>
                                                <td className="pe-4 py-3 text-end">
                                                    <div className="d-flex justify-content-end gap-2">
                                                        {v.status === 'Pending' && (
                                                            <>
                                                                <button className="btn btn-sm btn-success rounded-pill px-3" onClick={() => handleAction(v.id, 'Approved')}>Approve</button>
                                                                <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => handleAction(v.id, 'Rejected')}>Reject</button>
                                                            </>
                                                        )}
                                                        {v.status === 'Approved' && (
                                                            <button className="btn btn-sm btn-primary rounded-pill px-3 d-flex align-items-center gap-1" onClick={() => handleAction(v.id, 'Checked-In')}>
                                                                <MdLogin /> Check-In
                                                            </button>
                                                        )}
                                                        {v.status === 'Checked-In' && (
                                                            <button className="btn btn-sm btn-danger rounded-pill px-3 d-flex align-items-center gap-1" onClick={() => handleAction(v.id, 'Checked-Out')}>
                                                                <MdLogout /> Check-Out
                                                            </button>
                                                        )}
                                                        <button className="btn btn-light btn-sm border-0 rounded-circle" title="Print Pass"><MdPrint /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredVisitors.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="text-center py-5 text-muted small">No visitor records found for this category.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Side Stats */}
                <div className="col-md-4">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm rounded-4 p-4" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: '#fff' }}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="fw-bold mb-0">Daily Summary</h6>
                                    <MdTimer size={24} className="opacity-50" />
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    <div className="d-flex justify-content-between">
                                        <span className="opacity-75 small">Total Expected</span>
                                        <span className="fw-bold h5 mb-0">12</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="opacity-75 small">Inside Premise</span>
                                        <span className="fw-bold h5 mb-0">4</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="opacity-75 small">Completed</span>
                                        <span className="fw-bold h5 mb-0">8</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                                <h6 className="fw-bold text-dark mb-4">Quick Alerts</h6>
                                <div className="d-flex flex-column gap-3">
                                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                                        <div className="bg-warning p-2 rounded-circle"></div>
                                        <div className="small"><strong>John Doe</strong> has been inside for over 4 hours.</div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                                        <div className="bg-info p-2 rounded-circle"></div>
                                        <div className="small">Interview scheduled in 15 mins for <strong>Alice</strong>.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Visitor Request Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1050, backdropFilter: 'blur(5px)'
                }}>
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden animate__animated animate__zoomIn" style={{ width: '600px' }}>
                        <div className="p-4 bg-primary text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">Visitor Entry Request</h5>
                            <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="p-4 bg-light">
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label className="form-label small fw-bold">Visitor Name</label>
                                    <input type="text" className="form-control border-0 shadow-sm" placeholder="Enter guest name" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">Organization / Company</label>
                                    <input type="text" className="form-control border-0 shadow-sm" placeholder="Self or Company" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">Phone No.</label>
                                    <input type="text" className="form-control border-0 shadow-sm" placeholder="+91" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">Date of Visit</label>
                                    <input type="date" className="form-control border-0 shadow-sm" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">Preferred Time</label>
                                    <input type="time" className="form-control border-0 shadow-sm" />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label small fw-bold">Meeting With (Employee)</label>
                                    <select className="form-select border-0 shadow-sm">
                                        <option>Select staff member...</option>
                                        <option>Rahul Sharma</option>
                                        <option>Priya HR</option>
                                        <option>Suresh Manager</option>
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label small fw-bold">Purpose of Visit</label>
                                    <textarea className="form-control border-0 shadow-sm" rows="3" placeholder="Meeting, Delivery, Technical Support..."></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-white d-flex gap-2">
                            <button className="btn btn-light border w-100 py-2 rounded-3" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary w-100 py-2 rounded-3" onClick={() => setShowModal(false)}>Submit Request</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .border-bottom-light { border-bottom: 1px solid #f1f5f9; }
                .nav-pills .nav-link { font-weight: 600; font-size: 0.9rem; transition: all 0.2s; }
                .nav-pills .nav-link.active { background-color: var(--primary-color) !important; color: #fff !important; }
                .bg-warning-subtle { background-color: #fff9db; color: #f08c00; }
                .bg-info-subtle { background-color: #e3fafc; color: #0c8599; }
                .bg-success-subtle { background-color: #ebfbee; color: #2b8a3e; }
                .bg-danger-subtle { background-color: #fff5f5; color: #c92a2a; }
                .bg-secondary-subtle { background-color: #f1f3f5; color: #495057; }
                .x-small { font-size: 0.7rem; }
            `}</style>
        </div>
    );
};

const Visitor = () => {
    return (
        <DashboardLayout title="Visitor Management" activePath="/visitors">
            <VisitorContent />
        </DashboardLayout>
    );
};

export default Visitor;

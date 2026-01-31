import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FaFilter, FaSearch, FaShieldAlt, FaDownload, FaHistory, FaUserShield } from 'react-icons/fa';

const AuditLogs = () => {
    const [filterRole, setFilterRole] = useState('All');
    const [filterAction, setFilterAction] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data for Super Admin (System-Wide)
    const auditData = [
        { id: 1, timestamp: '2026-01-30 14:30:22', user: 'Super Admin', role: 'Super Admin', action: 'Login', module: 'Auth', ip: '192.168.1.10', status: 'Success' },
        { id: 2, timestamp: '2026-01-30 14:15:00', user: 'John Doe', role: 'HR', action: 'Create Employee', module: 'Employee Mgmt', ip: '192.168.1.45', status: 'Success' },
        { id: 3, timestamp: '2026-01-30 13:50:11', user: 'Sarah Smith', role: 'Admin', action: 'Update Policy', module: 'Settings', ip: '192.168.1.22', status: 'Success' },
        { id: 4, timestamp: '2026-01-30 11:20:05', user: 'Mike Ross', role: 'Manager', action: 'Approve Leave', module: 'Leave Mgmt', ip: '192.168.1.30', status: 'Success' },
        { id: 5, timestamp: '2026-01-29 10:10:00', user: 'Unknown', role: 'N/A', action: 'Failed Login', module: 'Auth', ip: '45.33.22.11', status: 'Failed' },
        { id: 6, timestamp: '2026-01-29 09:05:45', user: 'Super Admin', role: 'Super Admin', action: 'Delete Role', module: 'Roles & Permissions', ip: '192.168.1.10', status: 'Success' },
    ];

    const getStatusBadge = (status) => {
        return status === 'Success'
            ? <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">Success</span>
            : <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3">Failed</span>;
    };

    return (
        <DashboardLayout title="System Audit Logs" onNavigate={() => { }}>
            <div className="container-fluid p-0">

                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="h4 fw-bold text-dark mb-1">
                            <FaShieldAlt className="me-2 text-primary" /> System Audit Logs
                        </h2>
                        <p className="text-muted small mb-0">Monitor system-wide activities, security events, and user actions.</p>
                    </div>
                    <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2">
                        <FaDownload /> Export CSV
                    </button>
                </div>

                {/* Filters Section */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                    <div className="card-body p-4">
                        <div className="row g-3">
                            <div className="col-md-3">
                                <label className="form-label small fw-bold text-secondary">Date Range</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-bold text-secondary">User / Role</label>
                                <select className="form-select" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                                    <option value="All">All Roles</option>
                                    <option value="Super Admin">Super Admin</option>
                                    <option value="Admin">Admin</option>
                                    <option value="HR">HR</option>
                                    <option value="Manager">Manager</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-bold text-secondary">Action Type</label>
                                <select className="form-select" value={filterAction} onChange={(e) => setFilterAction(e.target.value)}>
                                    <option value="All">All Actions</option>
                                    <option value="Login">Login</option>
                                    <option value="Create">Create</option>
                                    <option value="Update">Update</option>
                                    <option value="Delete">Delete</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-bold text-secondary">Search</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0"><FaSearch className="text-muted" /></span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0"
                                        placeholder="Search logs..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logs Table */}
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="card-header bg-white border-bottom p-3 d-flex justify-content-between align-items-center">
                        <h6 className="fw-bold m-0 d-flex align-items-center gap-2">
                            <FaHistory className="text-secondary" /> Recent Activities
                        </h6>
                        <span className="badge bg-light text-dark border">Total Records: {auditData.length}</span>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0 text-nowrap">
                            <thead className="bg-light">
                                <tr>
                                    <th className="small text-secondary ps-4 py-3 border-0">Timestamp</th>
                                    <th className="small text-secondary py-3 border-0">User</th>
                                    <th className="small text-secondary py-3 border-0">Role</th>
                                    <th className="small text-secondary py-3 border-0">Action</th>
                                    <th className="small text-secondary py-3 border-0">Module</th>
                                    <th className="small text-secondary py-3 border-0">IP Address</th>
                                    <th className="small text-secondary py-3 border-0">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditData.map((log) => (
                                    <tr key={log.id}>
                                        <td className="ps-4 small text-muted font-monospace">{log.timestamp}</td>
                                        <td className="fw-bold small text-dark d-flex align-items-center gap-2">
                                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold" style={{ width: '24px', height: '24px', fontSize: '10px' }}>
                                                {log.user.charAt(0)}
                                            </div>
                                            {log.user}
                                        </td>
                                        <td className="small">
                                            <span className={`badge ${log.role === 'Super Admin' ? 'bg-primary' : 'bg-secondary'} bg-opacity-10 text-dark`}>
                                                {log.role}
                                            </span>
                                        </td>
                                        <td className="small fw-semibold text-dark">{log.action}</td>
                                        <td className="small text-muted">{log.module}</td>
                                        <td className="small text-muted font-monospace">{log.ip}</td>
                                        <td>{getStatusBadge(log.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer bg-white text-center py-3">
                        <button className="btn btn-sm btn-link text-decoration-none">View All Logs</button>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default AuditLogs;

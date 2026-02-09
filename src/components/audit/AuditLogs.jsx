import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import AuditLogTable from './AuditLogTable';
import { FaSearch, FaSyncAlt, FaClipboardList, FaFilter } from 'react-icons/fa';
import { auditService } from './auditService';

// Default Mock Data (Fallback)
const mockAuditData = [
    { id: 1, action: 'Login', entity: 'System', entityId: 'SYS-LOG', performedBy: 'Super Admin', date: '2026-02-07 14:30', ipAddress: '192.168.1.10', details: 'Successful login to Super Admin Dashboard' },
    { id: 2, action: 'Create', entity: 'Company', entityId: 'COMP-005', performedBy: 'Super Admin', date: '2026-02-07 14:15', ipAddress: '192.168.1.10', details: 'Created new company workspace: Solar Tech' },
    { id: 3, action: 'Update', entity: 'Employee', entityId: 'EMP-102', performedBy: 'HR Manager', date: '2026-02-07 13:50', ipAddress: '192.168.1.22', details: 'Updated contact details for John Doe' },
    { id: 4, action: 'Delete', entity: 'Document', entityId: 'DOC-998', performedBy: 'Admin', date: '2026-02-07 11:20', ipAddress: '192.168.1.30', details: 'Deleted outdated policy document' },
    { id: 5, action: 'Process', entity: 'Payroll', entityId: 'PAY-FEB', performedBy: 'Accountant', date: '2026-02-06 16:40', ipAddress: '192.168.1.50', details: 'Processed payroll batch for Feb 2026' },
];

const AuditLogs = ({ role }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterModule, setFilterModule] = useState('');
    const [filterAction, setFilterAction] = useState('');
    const [showAll, setShowAll] = useState(false);

    // Fetch logs on mount and when filters change
    useEffect(() => {
        fetchLogs();
    }, [filterModule, filterAction, role]); // Search is usually debounced or on enter, but let's keep it simple for now and filter locally or on submit

    const fetchLogs = async () => {
        setLoading(true);
        setError(null);
        try {
            // Construct query params
            const params = {};
            if (filterModule) params.module = filterModule;
            if (filterAction) params.action = filterAction;

            let data;
            if (role === 'superadmin') {
                data = await auditService.getSuperAdminLogs(params);
            } else if (role === 'admin') {
                data = await auditService.getAdminLogs(params);
            } else {
                // Default or fallback
                data = await auditService.getAuditLogs(params);
            }

            setLogs(Array.isArray(data) ? data : []); // Ensure array
        } catch (err) {
            console.error("Failed to fetch audit logs:", err);
            // Fallback to mock data for demonstration if API fails (optional, remove for production)
            // setError("Failed to load audit logs. Please try again.");
            // Use mock data for now if API is not ready, as per request to have a "working" UI
            setLogs(mockAuditData);
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic (Client-side search for smoother UX on small datasets)
    const filteredLogs = logs.filter(log => {
        const query = searchQuery.toLowerCase();
        return (
            (log.performedBy && log.performedBy.toLowerCase().includes(query)) ||
            (log.entity && log.entity.toLowerCase().includes(query)) ||
            (log.action && log.action.toLowerCase().includes(query)) ||
            (log.details && log.details.toLowerCase().includes(query)) ||
            (log.ipAddress && log.ipAddress.toLowerCase().includes(query))
        );
    });

    const handleRefresh = () => {
        fetchLogs();
    };

    return (
        <div className="container-fluid p-0">

            {/* Header & Controls */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <div>
                    <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                        <FaClipboardList className="text-primary" /> System Audit Logs
                    </h4>
                    <p className="text-muted small mb-0">Monitor all system activities and user actions</p>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-2">
                    <button
                        className="btn btn-white border shadow-sm p-2 text-muted"
                        title="Refresh Logs"
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        <FaSyncAlt className={loading ? "fa-spin" : ""} />
                    </button>

                    <div className="input-group shadow-sm" style={{ maxWidth: '300px' }}>
                        <span className="input-group-text bg-white border-end-0 ps-3">
                            <FaSearch className="text-muted small" />
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0 ps-2"
                            placeholder="Search logs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <select
                        className="form-select shadow-sm border-0 bg-white"
                        style={{ maxWidth: '150px' }}
                        value={filterModule}
                        onChange={(e) => setFilterModule(e.target.value)}
                    >
                        <option value="">All Modules</option>
                        <option value="Auth">Auth</option>
                        <option value="Employee">Employee</option>
                        <option value="Finance">Finance</option>
                        <option value="Company">Company</option>
                        <option value="System">System</option>
                    </select>

                    <select
                        className="form-select shadow-sm border-0 bg-white"
                        style={{ maxWidth: '150px' }}
                        value={filterAction}
                        onChange={(e) => setFilterAction(e.target.value)}
                    >
                        <option value="">All Actions</option>
                        <option value="Create">Create</option>
                        <option value="Update">Update</option>
                        <option value="Delete">Delete</option>
                        <option value="Login">Login</option>
                        <option value="Logout">Logout</option>
                    </select>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {/* Logs Table Component */}
            <AuditLogTable logs={showAll ? filteredLogs : filteredLogs.slice(0, 5)} />

            {/* View More / Hide Toggle */}
            {!loading && filteredLogs.length > 5 && (
                <div className="text-center mt-3 mb-5">
                    <button
                        className="btn btn-outline-primary btn-sm rounded-pill px-4"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Hide (Show Less)" : "View All"}
                    </button>
                </div>
            )}

            {loading && (
                <div className="text-center py-5">
                    <span className="spinner-border text-primary" role="status"></span>
                    <p className="text-muted mt-2">Loading logs...</p>
                </div>
            )}

        </div>
    );
};


export default AuditLogs;

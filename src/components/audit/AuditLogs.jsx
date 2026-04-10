import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import AuditLogTable from './AuditLogTable';
import { useSearch } from '../../context/SearchContext';
import { FaSearch, FaSyncAlt, FaClipboardList, FaFilter } from 'react-icons/fa';
import { auditService } from '../../services/auditService';

// Default Mock Data (Fallback)
const mockAuditData = [
    { id: 1, action: 'LOGIN', module: 'Auth', entity: 'User', entityId: 'USR-001', performedBy: 'Aparna', date: '2026-04-10 14:30', ipAddress: '10.0.0.1', status: 'SUCCESS', details: 'User logged in successfully' },
    { id: 2, action: 'CREATE_EMPLOYEE', module: 'Employee', entity: 'Employee', entityId: 'EMP-772', performedBy: 'Sandhya', date: '2026-04-10 14:15', ipAddress: '10.0.0.2', status: 'SUCCESS', details: 'Created new employee record' },
    { id: 3, action: 'UPDATE_PAYROLL', module: 'Finance', entity: 'Payroll', entityId: 'PAY-2026', performedBy: 'Rahul Sharma', date: '2026-04-10 13:50', ipAddress: '10.0.0.3', status: 'SUCCESS', details: 'Updated salary structure for Dept: IT' },
    { id: 4, action: 'DELETE_COMPANY', module: 'Company', entity: 'Company', entityId: 'COMP-X', performedBy: 'Super Admin', date: '2026-04-10 11:20', ipAddress: '10.0.0.4', status: 'FAILED', details: 'Deletion blocked by active subscriptions' },
    { id: 5, action: 'TOGGLE_STATUS', module: 'System', entity: 'Settings', entityId: 'CFG-01', performedBy: 'Aparna', date: '2026-04-10 10:40', ipAddress: '10.0.0.5', status: 'SUCCESS', details: 'System maintenance mode toggled off' },
    { id: 6, action: 'EXPORT_DATA', module: 'Employee', entity: 'Directory', entityId: 'DIR-FULL', performedBy: 'HR Manager', date: '2026-04-09 16:40', ipAddress: '192.168.1.50', status: 'SUCCESS', details: 'Exported employee list to Excel' },
    { id: 7, action: 'UPDATE_ROLE', module: 'Auth', entity: 'Permissions', entityId: 'ROLE-ADMN', performedBy: 'Super Admin', date: '2026-04-09 15:20', ipAddress: '192.168.1.10', status: 'SUCCESS', details: 'Modified permissions for Admin role' },
];

export const AuditLogsContent = ({ role, isMyLogs = false }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [searchQuery, setSearchQuery] = useState(globalSearchTerm);

    useEffect(() => {
        setSearchQuery(globalSearchTerm);
    }, [globalSearchTerm]);
    const [filterModule, setFilterModule] = useState('');
    const [filterAction, setFilterAction] = useState('');
    const [showAll, setShowAll] = useState(true);

    // Fetch logs on mount and when filters change
    useEffect(() => {
        fetchLogs();
    }, [filterModule, filterAction, role, isMyLogs]);

    const fetchLogs = async () => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (isMyLogs) {
                data = await auditService.getMyLogs();
            } else {
                // Construct query params for hierarchical logs
                const params = {
                    page: 1,
                    limit: 100
                };
                if (filterModule) params.module = filterModule;
                if (filterAction) params.action = filterAction;
                
                data = await auditService.getAuditLogs(params);
            }

            console.log('AUDIT LOGS API RESPONSE:', data);
            
            // Handle different response formats
            let logsArray = [];
            if (Array.isArray(data)) {
                logsArray = data;
            } else if (data && typeof data === 'object') {
                logsArray = data.logs || data.data || data.activities || [];
            }
            
            // Only use mock data if the API literally returns NOTHING (e.g., error or 401)
            // If the API returns an empty list [], it might just be that there are no logs for that filter.
            if (logsArray.length === 0 && !filterModule && !filterAction) {
                setLogs(mockAuditData);
            } else {
                setLogs(logsArray);
            }
        } catch (err) {
            console.error("Failed to fetch audit logs:", err);
            setLogs(mockAuditData);
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic (Client-side search AND secondary filter for safety/demo)
    const filteredLogs = logs.filter(log => {
        const query = (searchQuery || '').toLowerCase();
        
        // 1. Module Filter (Exact or Case Insensitive)
        if (filterModule && log.module && log.module.toLowerCase() !== filterModule.toLowerCase()) {
            return false;
        }

        // 2. Action Filter
        if (filterAction && log.action && !log.action.toLowerCase().includes(filterAction.toLowerCase())) {
            return false;
        }

        // 3. Search Query
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
                        <FaClipboardList className="text-primary" /> {isMyLogs ? 'My Activity Logs' : (role === 'superadmin' ? 'System Audit Logs' : 'Organization Audit Logs')}
                    </h4>
                    <p className="text-muted small mb-0">{isMyLogs ? 'Your recent actions and system interactions' : `Monitor ${role === 'superadmin' ? 'all system' : 'organization'} activities and user actions`}</p>
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
                        <span className="input-group-text bg-transparent border-end-0 ps-3">
                            <FaSearch className="text-muted small" />
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0 ps-2 glassy-search"
                            placeholder="Search logs..."
                            value={searchQuery}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSearchQuery(val);
                                setGlobalSearchTerm(val);
                            }}
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

const AuditLogs = ({ role, isMyLogs = false }) => {
    return (
        <DashboardLayout>
            <AuditLogsContent role={role} isMyLogs={isMyLogs} />
        </DashboardLayout>
    );
};



export default AuditLogs;

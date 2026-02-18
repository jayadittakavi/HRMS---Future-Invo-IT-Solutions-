import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaDesktop, FaFilter, FaDownload } from 'react-icons/fa';

const SyncLogs = () => {
    const [logs, setLogs] = useState([
        {
            id: 1,
            timestamp: '2026-02-18 10:30:25 AM',
            deviceName: 'Main Office Biometric',
            deviceId: 'BIO-001',
            action: 'Auto Sync',
            status: 'Success',
            recordsSynced: 45,
            duration: '2.3s',
            message: 'Successfully synced 45 attendance records',
            syncedBy: 'System'
        },
        {
            id: 2,
            timestamp: '2026-02-18 09:15:42 AM',
            deviceName: 'Branch Office Scanner',
            deviceId: 'BIO-002',
            action: 'Manual Sync',
            status: 'Success',
            recordsSynced: 12,
            duration: '1.1s',
            message: 'Successfully synced 12 attendance records',
            syncedBy: 'Admin User'
        },
        {
            id: 3,
            timestamp: '2026-02-18 08:00:15 AM',
            deviceName: 'Warehouse Entry',
            deviceId: 'BIO-003',
            action: 'Auto Sync',
            status: 'Failed',
            recordsSynced: 0,
            duration: '5.0s',
            message: 'Connection timeout - Device not reachable',
            syncedBy: 'System'
        },
        {
            id: 4,
            timestamp: '2026-02-17 06:30:10 PM',
            deviceName: 'Main Office Biometric',
            deviceId: 'BIO-001',
            action: 'Manual Sync',
            status: 'Success',
            recordsSynced: 89,
            duration: '3.8s',
            message: 'Successfully synced 89 attendance records',
            syncedBy: 'HR Manager'
        },
        {
            id: 5,
            timestamp: '2026-02-17 05:00:33 PM',
            deviceName: 'Warehouse Entry',
            deviceId: 'BIO-003',
            action: 'Auto Sync',
            status: 'Warning',
            recordsSynced: 156,
            duration: '8.2s',
            message: 'Synced with warnings - 3 duplicate records skipped',
            syncedBy: 'System'
        },
        {
            id: 6,
            timestamp: '2026-02-17 03:15:20 PM',
            deviceName: 'Branch Office Scanner',
            deviceId: 'BIO-002',
            action: 'Manual Sync',
            status: 'Success',
            recordsSynced: 34,
            duration: '1.9s',
            message: 'Successfully synced 34 attendance records',
            syncedBy: 'Admin User'
        }
    ]);

    const [filterStatus, setFilterStatus] = useState('All');
    const [filterDevice, setFilterDevice] = useState('All');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });

    const devices = [...new Set(logs.map(log => log.deviceName))];

    const filteredLogs = logs.filter(log => {
        if (filterStatus !== 'All' && log.status !== filterStatus) return false;
        if (filterDevice !== 'All' && log.deviceName !== filterDevice) return false;
        return true;
    });

    const stats = {
        total: logs.length,
        success: logs.filter(l => l.status === 'Success').length,
        failed: logs.filter(l => l.status === 'Failed').length,
        warning: logs.filter(l => l.status === 'Warning').length,
        totalRecords: logs.reduce((sum, l) => sum + l.recordsSynced, 0)
    };

    const handleExport = () => {
        // Export logs to CSV
        const csvContent = [
            ['Timestamp', 'Device', 'Device ID', 'Action', 'Status', 'Records', 'Duration', 'Message', 'Synced By'],
            ...filteredLogs.map(log => [
                log.timestamp,
                log.deviceName,
                log.deviceId,
                log.action,
                log.status,
                log.recordsSynced,
                log.duration,
                log.message,
                log.syncedBy
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sync_logs_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Sync Logs</h5>
                    <p className="text-muted small mb-0">View synchronization history and logs</p>
                </div>
                <button className="btn btn-outline-primary rounded-pill px-4" onClick={handleExport}>
                    <FaDownload className="me-2" />
                    Export Logs
                </button>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                                    <FaInfoCircle size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Total Syncs</h6>
                                    <h3 className="fw-bold mb-0">{stats.total}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-success bg-opacity-10 text-success rounded-circle p-3 me-3">
                                    <FaCheckCircle size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Successful</h6>
                                    <h3 className="fw-bold mb-0">{stats.success}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-danger bg-opacity-10 text-danger rounded-circle p-3 me-3">
                                    <FaExclamationTriangle size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Failed</h6>
                                    <h3 className="fw-bold mb-0">{stats.failed}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-info bg-opacity-10 text-info rounded-circle p-3 me-3">
                                    <FaDesktop size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Total Records</h6>
                                    <h3 className="fw-bold mb-0">{stats.totalRecords}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-3">
                            <label className="form-label small text-muted fw-bold">
                                <FaFilter className="me-1" />
                                Filter by Status
                            </label>
                            <select
                                className="form-select"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Success">Success</option>
                                <option value="Failed">Failed</option>
                                <option value="Warning">Warning</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label small text-muted fw-bold">Filter by Device</label>
                            <select
                                className="form-select"
                                value={filterDevice}
                                onChange={(e) => setFilterDevice(e.target.value)}
                            >
                                <option value="All">All Devices</option>
                                {devices.map((device, idx) => (
                                    <option key={idx} value={device}>{device}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label small text-muted fw-bold">From Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={dateRange.from}
                                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label small text-muted fw-bold">To Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={dateRange.to}
                                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Logs Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Timestamp</th>
                                    <th className="border-0 py-3">Device</th>
                                    <th className="border-0 py-3">Action</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Records Synced</th>
                                    <th className="border-0 py-3">Duration</th>
                                    <th className="border-0 py-3">Message</th>
                                    <th className="border-0 py-3">Synced By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map(log => (
                                    <tr key={log.id}>
                                        <td className="px-4 text-secondary small font-monospace">
                                            {log.timestamp}
                                        </td>
                                        <td>
                                            <div>
                                                <div className="fw-bold text-dark small">{log.deviceName}</div>
                                                <small className="text-muted">{log.deviceId}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                {log.action}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${log.status === 'Success' ? 'bg-success' :
                                                    log.status === 'Failed' ? 'bg-danger' :
                                                        'bg-warning text-dark'
                                                }`}>
                                                {log.status === 'Success' && <FaCheckCircle className="me-1" />}
                                                {log.status === 'Failed' && <FaExclamationTriangle className="me-1" />}
                                                {log.status === 'Warning' && <FaInfoCircle className="me-1" />}
                                                {log.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge bg-primary bg-opacity-10 text-primary">
                                                {log.recordsSynced} records
                                            </span>
                                        </td>
                                        <td className="text-secondary small">{log.duration}</td>
                                        <td className="text-secondary small" style={{ maxWidth: '300px' }}>
                                            <span className="text-truncate d-inline-block" style={{ maxWidth: '280px' }} title={log.message}>
                                                {log.message}
                                            </span>
                                        </td>
                                        <td className="text-secondary small">{log.syncedBy}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {filteredLogs.length === 0 && (
                <div className="text-center py-5">
                    <FaInfoCircle size={48} className="text-muted mb-3" />
                    <h6 className="text-muted">No logs found matching the selected filters</h6>
                </div>
            )}
        </div>
    );
};

export default SyncLogs;

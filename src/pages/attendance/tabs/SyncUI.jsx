import React, { useState } from 'react';
import { FaSync, FaCheckCircle, FaExclamationCircle, FaClock, FaDesktop, FaPlay, FaStop } from 'react-icons/fa';

const SyncUI = () => {
    const [devices, setDevices] = useState([
        {
            id: 1,
            deviceName: 'Main Office Biometric',
            deviceId: 'BIO-001',
            location: 'Main Entrance',
            status: 'Connected',
            lastSync: '2026-02-18 10:30 AM',
            pendingRecords: 45,
            syncStatus: 'Idle'
        },
        {
            id: 2,
            deviceName: 'Branch Office Scanner',
            deviceId: 'BIO-002',
            location: 'Branch Office',
            status: 'Connected',
            lastSync: '2026-02-18 09:15 AM',
            pendingRecords: 12,
            syncStatus: 'Idle'
        },
        {
            id: 3,
            deviceName: 'Warehouse Entry',
            deviceId: 'BIO-003',
            location: 'Warehouse Gate',
            status: 'Disconnected',
            lastSync: '2026-02-17 05:00 PM',
            pendingRecords: 156,
            syncStatus: 'Error'
        }
    ]);

    const [autoSync, setAutoSync] = useState(true);
    const [syncInterval, setSyncInterval] = useState(30);
    const [syncing, setSyncing] = useState({});

    const handleSyncDevice = (deviceId) => {
        setSyncing({ ...syncing, [deviceId]: true });

        // Simulate sync process
        setTimeout(() => {
            setDevices(devices.map(d => {
                if (d.id === deviceId) {
                    return {
                        ...d,
                        lastSync: new Date().toLocaleString('en-IN', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        }),
                        pendingRecords: 0,
                        syncStatus: 'Success'
                    };
                }
                return d;
            }));
            setSyncing({ ...syncing, [deviceId]: false });
        }, 2000);
    };

    const handleSyncAll = () => {
        devices.forEach(device => {
            if (device.status === 'Connected') {
                handleSyncDevice(device.id);
            }
        });
    };

    const stats = {
        totalDevices: devices.length,
        connected: devices.filter(d => d.status === 'Connected').length,
        disconnected: devices.filter(d => d.status === 'Disconnected').length,
        pendingRecords: devices.reduce((sum, d) => sum + d.pendingRecords, 0)
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Device Synchronization</h5>
                    <p className="text-muted small mb-0">Sync attendance data from biometric devices</p>
                </div>
                <button
                    className="btn btn-primary rounded-pill px-4 shadow-sm"
                    onClick={handleSyncAll}
                    disabled={Object.values(syncing).some(s => s)}
                >
                    <FaSync className={`me-2 ${Object.values(syncing).some(s => s) ? 'fa-spin' : ''}`} />
                    Sync All Devices
                </button>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                                    <FaDesktop size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Total Devices</h6>
                                    <h3 className="fw-bold mb-0">{stats.totalDevices}</h3>
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
                                    <h6 className="text-muted small mb-0">Connected</h6>
                                    <h3 className="fw-bold mb-0">{stats.connected}</h3>
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
                                    <FaExclamationCircle size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Disconnected</h6>
                                    <h3 className="fw-bold mb-0">{stats.disconnected}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-warning bg-opacity-10 text-warning rounded-circle p-3 me-3">
                                    <FaClock size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Pending Records</h6>
                                    <h3 className="fw-bold mb-0">{stats.pendingRecords}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sync Settings */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <h6 className="fw-bold mb-3">Sync Settings</h6>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="mb-0">Auto Sync</h6>
                                    <small className="text-muted">Automatically sync devices at intervals</small>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={autoSync}
                                        onChange={(e) => setAutoSync(e.target.checked)}
                                        style={{ width: '50px', height: '25px' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small text-muted fw-bold">Sync Interval (minutes)</label>
                            <select
                                className="form-select"
                                value={syncInterval}
                                onChange={(e) => setSyncInterval(e.target.value)}
                                disabled={!autoSync}
                            >
                                <option value={15}>15 minutes</option>
                                <option value={30}>30 minutes</option>
                                <option value={60}>1 hour</option>
                                <option value={120}>2 hours</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Devices List */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Device</th>
                                    <th className="border-0 py-3">Device ID</th>
                                    <th className="border-0 py-3">Location</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Last Sync</th>
                                    <th className="border-0 py-3">Pending Records</th>
                                    <th className="border-0 py-3">Sync Status</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.map(device => (
                                    <tr key={device.id}>
                                        <td className="px-4">
                                            <div className="d-flex align-items-center">
                                                <div className={`icon-box ${device.status === 'Connected' ? 'bg-success' : 'bg-danger'} bg-opacity-10 ${device.status === 'Connected' ? 'text-success' : 'text-danger'} rounded p-2 me-2`}>
                                                    <FaDesktop size={16} />
                                                </div>
                                                <span className="fw-bold text-dark">{device.deviceName}</span>
                                            </div>
                                        </td>
                                        <td className="text-secondary small font-monospace">{device.deviceId}</td>
                                        <td className="text-secondary small">{device.location}</td>
                                        <td>
                                            <span className={`badge ${device.status === 'Connected' ? 'bg-success' : 'bg-danger'}`}>
                                                {device.status}
                                            </span>
                                        </td>
                                        <td className="text-secondary small">{device.lastSync}</td>
                                        <td>
                                            <span className={`badge ${device.pendingRecords > 0 ? 'bg-warning text-dark' : 'bg-success'}`}>
                                                {device.pendingRecords} records
                                            </span>
                                        </td>
                                        <td>
                                            {syncing[device.id] ? (
                                                <span className="badge bg-info">
                                                    <FaSync className="fa-spin me-1" />
                                                    Syncing...
                                                </span>
                                            ) : (
                                                <span className={`badge ${device.syncStatus === 'Success' ? 'bg-success' :
                                                        device.syncStatus === 'Error' ? 'bg-danger' :
                                                            'bg-secondary'
                                                    }`}>
                                                    {device.syncStatus}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary rounded-pill px-3"
                                                onClick={() => handleSyncDevice(device.id)}
                                                disabled={device.status === 'Disconnected' || syncing[device.id]}
                                            >
                                                {syncing[device.id] ? (
                                                    <>
                                                        <FaSync className="fa-spin me-1" />
                                                        Syncing
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaSync className="me-1" />
                                                        Sync Now
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Sync Progress Info */}
            {Object.values(syncing).some(s => s) && (
                <div className="alert alert-info mt-4 d-flex align-items-center">
                    <FaSync className="fa-spin me-2" size={20} />
                    <div>
                        <strong>Synchronization in progress...</strong>
                        <p className="mb-0 small">Please wait while we sync attendance data from the devices.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SyncUI;

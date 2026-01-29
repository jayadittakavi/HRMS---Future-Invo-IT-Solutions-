import React, { useState } from 'react';
import { FaSync, FaFileUpload, FaEdit, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const DailyProcessing = () => {
    const [logs, setLogs] = useState([
        { id: 1, name: 'Meera Joshi', checkIn: '09:45 AM', checkOut: '06:30 PM', status: 'Present', source: 'Biometric' },
        { id: 2, name: 'Sanjay Gupta', checkIn: '10:00 AM', checkOut: '-', status: 'Missing Checkout', source: 'QR Code' },
        { id: 3, name: 'Mohan Prasad', checkIn: '-', checkOut: '-', status: 'Absent', source: '-' },
    ]);

    const handleSync = () => {
        alert("Syncing with Biometric Devices...");
    };

    return (
        <div className="container p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold m-0 fs-5">Daily Attendance Processing</h4>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary rounded-pill btn-sm px-3 d-flex align-items-center gap-2" onClick={handleSync}>
                        <FaSync /> Sync Devices
                    </button>
                    <button className="btn btn-outline-secondary rounded-pill btn-sm px-3 d-flex align-items-center gap-2">
                        <FaFileUpload /> Import CSV
                    </button>
                    <button className="btn btn-primary rounded-pill btn-sm px-3 d-flex align-items-center gap-2">
                        <FaEdit /> Manual Entry
                    </button>
                </div>
            </div>

            {/* Status Cards */}
            <div className="row g-3 mb-3">
                <div className="col-md-3">
                    <div className="p-2 bg-white shadow-sm rounded-4 border-start border-4 border-success">
                        <small className="text-muted fw-bold" style={{ fontSize: '0.75rem' }}>Synced Successfully</small>
                        <h4 className="m-0 fw-bold">450</h4>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-2 bg-white shadow-sm rounded-4 border-start border-4 border-warning">
                        <small className="text-muted fw-bold" style={{ fontSize: '0.75rem' }}>Pending Sync</small>
                        <h4 className="m-0 fw-bold">12</h4>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-2 bg-white shadow-sm rounded-4 border-start border-4 border-danger">
                        <small className="text-muted fw-bold" style={{ fontSize: '0.75rem' }}>Errors / Missing</small>
                        <h4 className="m-0 fw-bold">5</h4>
                    </div>
                </div>
            </div>

            {/* Daily Logs Table */}
            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-header bg-white border-0 pt-3 px-3">
                    <h6 className="fw-bold m-0">Today's Logs ({new Date().toLocaleDateString()})</h6>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-sm align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 border-0 small text-uppercase text-secondary">Employee</th>
                                <th className="border-0 small text-uppercase text-secondary">Check In</th>
                                <th className="border-0 small text-uppercase text-secondary">Check Out</th>
                                <th className="border-0 small text-uppercase text-secondary">Source</th>
                                <th className="border-0 small text-uppercase text-secondary">Status</th>
                                <th className="border-0 small text-uppercase text-secondary">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id}>
                                    <td className="ps-4 fw-bold">{log.name}</td>
                                    <td>{log.checkIn}</td>
                                    <td>{log.checkOut}</td>
                                    <td><span className="badge bg-light text-dark border">{log.source}</span></td>
                                    <td>
                                        <span className={`badge ${log.status === 'Present' ? 'bg-success' : log.status === 'Absent' ? 'bg-danger' : 'bg-warning'}`}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-link text-primary p-0">Fix</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DailyProcessing;

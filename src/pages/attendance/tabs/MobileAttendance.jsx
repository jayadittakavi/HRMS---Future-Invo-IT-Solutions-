import React, { useState, useEffect } from 'react';
import { FaMobileAlt, FaMapMarkerAlt, FaClock, FaCheckCircle, FaTimesCircle, FaQrcode, FaCamera } from 'react-icons/fa';
import { attendanceService } from '../service/service';

const MobileAttendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterMethod, setFilterMethod] = useState('All');

    const fetchRecords = async () => {
        setLoading(true);
        try {
            const data = await attendanceService.getMobilePunches();
            setAttendanceRecords(data || []);
        } catch (err) {
            console.error("Fetch mobile punches failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleViewDetails = (record) => {
        setSelectedRecord(record);
        setShowDetailsModal(true);
    };

    const handleVerify = async (id) => {
        try {
            // Assuming verification uses a similar review endpoint or we update via mobilePunch
            // await attendanceService.verifyMobilePunch(id, { status: 'Verified' });
            setAttendanceRecords(attendanceRecords.map(r =>
                r.id === id ? { ...r, status: 'Verified' } : r
            ));
        } catch (err) {
            alert(`Failed: ${err.message}`);
        }
    };

    const handleFlag = async (id) => {
        try {
            setAttendanceRecords(attendanceRecords.map(r =>
                r.id === id ? { ...r, status: 'Flagged' } : r
            ));
        } catch (err) {
            alert(`Failed: ${err.message}`);
        }
    };


    const filteredRecords = attendanceRecords.filter(record => {
        if (filterStatus !== 'All' && record.status !== filterStatus) return false;
        if (filterMethod !== 'All' && !record.method.includes(filterMethod)) return false;
        return true;
    });

    const stats = {
        total: attendanceRecords.length,
        verified: attendanceRecords.filter(r => r.status === 'Verified').length,
        pending: attendanceRecords.filter(r => r.status === 'Pending Verification').length,
        flagged: attendanceRecords.filter(r => r.status === 'Flagged').length
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Mobile Attendance</h5>
                    <p className="text-muted small mb-0">Track attendance marked via mobile app</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                                    <FaMobileAlt size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Total Mobile Punches</h6>
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
                                    <h6 className="text-muted small mb-0">Verified</h6>
                                    <h3 className="fw-bold mb-0">{stats.verified}</h3>
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
                                    <h6 className="text-muted small mb-0">Pending</h6>
                                    <h3 className="fw-bold mb-0">{stats.pending}</h3>
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
                                    <FaTimesCircle size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Flagged</h6>
                                    <h3 className="fw-bold mb-0">{stats.flagged}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label small text-muted fw-bold">Filter by Status</label>
                            <select
                                className="form-select"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Verified">Verified</option>
                                <option value="Pending Verification">Pending Verification</option>
                                <option value="Flagged">Flagged</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small text-muted fw-bold">Filter by Method</label>
                            <select
                                className="form-select"
                                value={filterMethod}
                                onChange={(e) => setFilterMethod(e.target.value)}
                            >
                                <option value="All">All Methods</option>
                                <option value="GPS">GPS</option>
                                <option value="QR Code">QR Code</option>
                                <option value="Selfie">Selfie</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small text-muted fw-bold">Date</label>
                            <input type="date" className="form-control" defaultValue="2026-02-18" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance Records Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Employee</th>
                                    <th className="border-0 py-3">Date</th>
                                    <th className="border-0 py-3">Punch In</th>
                                    <th className="border-0 py-3">Punch Out</th>
                                    <th className="border-0 py-3">Location</th>
                                    <th className="border-0 py-3">Method</th>
                                    <th className="border-0 py-3">Working Hours</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.map(record => (
                                    <tr key={record.id}>
                                        <td className="px-4">
                                            <div>
                                                <div className="fw-bold text-dark">{record.employeeName}</div>
                                                <small className="text-muted">{record.employeeId}</small>
                                            </div>
                                        </td>
                                        <td className="text-secondary small">{record.date}</td>
                                        <td className="text-secondary small">
                                            <FaClock className="me-1 text-success" />
                                            {record.punchIn}
                                        </td>
                                        <td className="text-secondary small">
                                            {record.punchOut ? (
                                                <>
                                                    <FaClock className="me-1 text-danger" />
                                                    {record.punchOut}
                                                </>
                                            ) : (
                                                <span className="badge bg-info">In Progress</span>
                                            )}
                                        </td>
                                        <td className="text-secondary small">
                                            <FaMapMarkerAlt className="me-1 text-primary" />
                                            <span className="text-truncate d-inline-block" style={{ maxWidth: '150px' }} title={record.location}>
                                                {record.location}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                {record.method.includes('GPS') && <FaMapMarkerAlt className="me-1" />}
                                                {record.method.includes('QR') && <FaQrcode className="me-1" />}
                                                {record.method.includes('Selfie') && <FaCamera className="me-1" />}
                                                {record.method}
                                            </span>
                                        </td>
                                        <td className="text-secondary small fw-bold">{record.workingHours}</td>
                                        <td>
                                            <span className={`badge ${record.status === 'Verified' ? 'bg-success' :
                                                    record.status === 'Flagged' ? 'bg-danger' :
                                                        'bg-warning text-dark'
                                                }`}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-primary rounded-circle"
                                                    onClick={() => handleViewDetails(record)}
                                                    title="View Details"
                                                >
                                                    <FaMapMarkerAlt size={12} />
                                                </button>
                                                {record.status === 'Pending Verification' && (
                                                    <>
                                                        <button
                                                            className="btn btn-sm btn-outline-success rounded-circle"
                                                            onClick={() => handleVerify(record.id)}
                                                            title="Verify"
                                                        >
                                                            <FaCheckCircle size={12} />
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger rounded-circle"
                                                            onClick={() => handleFlag(record.id)}
                                                            title="Flag"
                                                        >
                                                            <FaTimesCircle size={12} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            {showDetailsModal && selectedRecord && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">Mobile Attendance Details</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDetailsModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <h6 className="text-muted small mb-1">Employee Name</h6>
                                        <p className="fw-bold mb-0">{selectedRecord.employeeName}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-muted small mb-1">Employee ID</h6>
                                        <p className="fw-bold mb-0">{selectedRecord.employeeId}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-muted small mb-1">Date</h6>
                                        <p className="fw-bold mb-0">{selectedRecord.date}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-muted small mb-1">Working Hours</h6>
                                        <p className="fw-bold mb-0">{selectedRecord.workingHours}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-muted small mb-1">Punch In</h6>
                                        <p className="fw-bold mb-0 text-success">{selectedRecord.punchIn}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-muted small mb-1">Punch Out</h6>
                                        <p className="fw-bold mb-0 text-danger">{selectedRecord.punchOut || 'In Progress'}</p>
                                    </div>
                                    <div className="col-12">
                                        <h6 className="text-muted small mb-1">Location</h6>
                                        <p className="fw-bold mb-0">{selectedRecord.location}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-muted small mb-1">Latitude</h6>
                                        <p className="fw-bold mb-0 font-monospace">{selectedRecord.latitude}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-muted small mb-1">Longitude</h6>
                                        <p className="fw-bold mb-0 font-monospace">{selectedRecord.longitude}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-muted small mb-1">Verification Method</h6>
                                        <p className="fw-bold mb-0">{selectedRecord.method}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-muted small mb-1">Device Info</h6>
                                        <p className="fw-bold mb-0">{selectedRecord.deviceInfo}</p>
                                    </div>
                                    <div className="col-12">
                                        <h6 className="text-muted small mb-1">Status</h6>
                                        <span className={`badge ${selectedRecord.status === 'Verified' ? 'bg-success' :
                                                selectedRecord.status === 'Flagged' ? 'bg-danger' :
                                                    'bg-warning text-dark'
                                            }`}>
                                            {selectedRecord.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button
                                    type="button"
                                    className="btn btn-light rounded-pill px-4"
                                    onClick={() => setShowDetailsModal(false)}
                                >
                                    Close
                                </button>
                                <a
                                    href={`https://www.google.com/maps?q=${selectedRecord.latitude},${selectedRecord.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary rounded-pill px-4"
                                >
                                    <FaMapMarkerAlt className="me-2" />
                                    View on Map
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileAttendance;

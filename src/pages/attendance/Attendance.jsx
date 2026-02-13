import React, { useState, useEffect } from 'react';
import { attendanceService } from "./service/service";
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import BulkAttendanceModal from './BulkAttendanceModal';

import {
    FaEdit,
    FaTrash,
    FaSearch,
    FaList,
    FaIdCard,
    FaUserCircle
} from 'react-icons/fa';

export const AttendanceContent = ({ personal = false }) => {
    const { user } = useAuth();

    // Filter States
    const [filterDateFrom, setFilterDateFrom] = useState('');
    const [filterDateTo, setFilterDateTo] = useState('');

    // View Mode State
    const [viewMode, setViewMode] = useState('table');

    // Modal States
    const [showManualModal, setShowManualModal] = useState(false);
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    // Import Logic State
    const [importFile, setImportFile] = useState(null);
    const [isImporting, setIsImporting] = useState(false);

    // Data State
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Data
    const fetchAttendance = async () => {
        setLoading(true);
        try {
            let response;
            if (personal) {
                response = await attendanceService.getMyAttendance();
            } else {
                const params = new URLSearchParams();
                if (filterDateFrom) params.append('startDate', filterDateFrom);
                if (filterDateTo) params.append('endDate', filterDateTo);

                response = await attendanceService.getAllAttendance(params.toString());
            }

            // Robust data extraction
            let dataList = [];
            if (Array.isArray(response)) {
                dataList = response;
            } else if (response && typeof response === 'object') {
                if (Array.isArray(response.data)) dataList = response.data;
                else if (Array.isArray(response.attendance)) dataList = response.attendance;
                else if (Array.isArray(response.records)) dataList = response.records;
                else if (Array.isArray(response.employees)) dataList = response.employees;
                else {
                    const keys = Object.keys(response);
                    for (const key of keys) {
                        if (Array.isArray(response[key])) {
                            dataList = response[key];
                            break;
                        }
                    }
                }
            }

            setAttendanceData(dataList);
            setError(null);
        } catch (err) {
            console.error("Error fetching attendance:", err);
            setError(err.message || "Failed to load attendance data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [personal]);

    // Handlers
    const handleManualAttendance = async (formData) => {
        try {
            const payload = {
                employee_id: formData.employeeId,
                date: formData.date,
                status: formData.status,
                punch_in: formData.punchIn,
                punch_out: formData.punchOut,
                shift: formData.shift
            };

            if (editingRecord) {
                await attendanceService.updateAttendance(editingRecord.id, payload);
                alert("Attendance updated successfully!");
            } else {
                await attendanceService.addManualAttendance(payload);
                alert("Attendance added successfully!");
            }
            setShowManualModal(false);
            setEditingRecord(null);
            fetchAttendance();
        } catch (err) {
            console.error("Manual attendance error", err);
            alert("Failed to save attendance: " + (err.message || "Unknown error"));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this attendance record?')) {
            try {
                await attendanceService.deleteAttendance(id);
                alert("Record deleted successfully");
                fetchAttendance();
            } catch (err) {
                console.error("Delete error", err);
                alert("Failed to delete record: " + err.message);
            }
        }
    };

    const handleEdit = (id) => {
        const recordToEdit = attendanceData.find(item => item.id === id);
        if (recordToEdit) {
            setEditingRecord(recordToEdit);
            setShowManualModal(true);
        }
    };

    const handleImportSubmit = async () => {
        if (!importFile) return;

        setIsImporting(true);
        try {
            const formData = new FormData();
            formData.append('file', importFile);

            await attendanceService.importAttendance(formData);

            alert("Attendance imported successfully!");
            setShowImportModal(false);
            setImportFile(null);
            fetchAttendance();
        } catch (err) {
            console.error("Import error", err);
            alert("Failed to import attendance: " + (err.message || "Unknown error"));
        } finally {
            setIsImporting(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImportFile(e.target.files[0]);
        }
    };

    // Helper for Time Formatting
    const formatTime = (timeStr) => {
        if (!timeStr) return '-';
        const date = new Date(timeStr);
        if (!isNaN(date.getTime())) {
            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            return `${hours}:${minutes} ${ampm}`;
        }
        if (timeStr.includes(' ')) {
            const parts = timeStr.split(' ');
            if (parts.length > 1) {
                const timePart = parts[1];
                if (timePart.includes(':')) {
                    const [h, m] = timePart.split(':');
                    let hours = parseInt(h);
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    return `${hours}:${m} ${ampm}`;
                }
                return timePart;
            }
        }
        return timeStr;
    };

    // Helper for Status Colors
    const getStatusBadge = (status) => {
        if (!status) return 'bg-secondary';
        const s = status.toLowerCase();
        if (s === 'present') return 'bg-success';
        if (s === 'absent') return 'bg-danger';
        if (s.includes('half')) return 'bg-warning text-dark';
        if (s === 'late') return 'bg-info text-dark';
        return 'bg-secondary';
    };

    return (
        <div className="attendance-content bg-light p-4" style={{ minHeight: '80vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div style={{ width: '150px' }}></div>
                <h4 className="fw-bold text-dark m-0">{personal ? 'My Attendance' : 'Attendance Details'}</h4>
                <div style={{ width: '150px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn btn-outline-primary btn-sm" onClick={fetchAttendance}>Refresh</button>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-3 rounded shadow-sm mb-4">
                {personal ? (
                    <div className="row g-3 align-items-end">
                        <div className="col-md-3">
                            <label className="small text-muted fw-bold mb-1">Select Month</label>
                            <select className="form-select text-secondary">
                                <option>Current Month</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-text bg-transparent border-end-0 text-muted"><FaSearch className="text-secondary" /></span>
                                <input type="text" className="form-control border-start-0 ps-0 text-secondary shadow-none glassy-search" placeholder="Search..." />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="row g-3 mb-3 align-items-center">
                            <div className="col-md-3">
                                <select className="form-select text-secondary">
                                    <option>Select Role/Department</option>
                                    <option>All</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="small text-muted text-nowrap">From</span>
                                    <input type="date" className="form-control text-secondary" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="small text-muted text-nowrap">To</span>
                                    <input type="date" className="form-control text-secondary" value={filterDateTo} onChange={(e) => setFilterDateTo(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 align-items-center mt-2">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <span className="input-group-text bg-transparent border-end-0 text-muted"><FaSearch className="text-secondary" /></span>
                                    <input type="text" className="form-control border-start-0 ps-0 text-secondary shadow-none glassy-search" placeholder="Search..." />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-outline-secondary w-100 fw-bold border-secondary text-secondary" onClick={() => { setEditingRecord(null); setShowManualModal(true); }}>
                                    <span className="small">Manual</span>
                                </button>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-outline-primary w-100 fw-bold border-primary text-primary" onClick={() => setShowBulkModal(true)}>
                                    <span className="small">Bulk Entry</span>
                                </button>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary w-100 fw-bold border-0" style={{ backgroundColor: '#0d6efd' }} onClick={() => setShowImportModal(true)}>
                                    <span className="small">Import CSV</span>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Table Section */}
            <div className="bg-white rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h6 className="m-0 fw-bold text-muted">Records</h6>
                    <div className="btn-group" role="group">
                        <button type="button" className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setViewMode('table')} title="List View">
                            <FaList />
                        </button>
                        <button type="button" className={`btn btn-sm ${viewMode === 'card' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setViewMode('card')} title="ID Card View">
                            <FaIdCard />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="p-5 text-center text-muted">Loading attendance records...</div>
                ) : error ? (
                    <div className="p-5 text-center text-danger">Error: {error}</div>
                ) : (
                    <>
                        {viewMode === 'table' ? (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="border-bottom-0 text-dark fw-bold small ps-4">Date</th>
                                            {!personal && <th className="border-bottom-0 text-dark fw-bold small">Name</th>}
                                            <th className="border-bottom-0 text-dark fw-bold small">Punch-In</th>
                                            <th className="border-bottom-0 text-dark fw-bold small">Punch-Out</th>
                                            <th className="border-bottom-0 text-dark fw-bold small">Shift</th>
                                            <th className="border-bottom-0 text-dark fw-bold small">Status</th>
                                            {!personal && <th className="border-bottom-0 text-dark fw-bold small">Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendanceData.length === 0 ? (
                                            <tr>
                                                <td colSpan={personal ? 5 : 7} className="text-center p-4 text-muted">No attendance records found.</td>
                                            </tr>
                                        ) : (
                                            attendanceData.map((row) => (
                                                <tr key={row.id}>
                                                    <td className="ps-4 fw-bold text-secondary">{row.date}</td>
                                                    {!personal && <td className="small text-dark fw-bold">{row.employee_name || row.name || row.employee_id || 'Unknown'}</td>}
                                                    <td className="small text-primary fw-bold">{formatTime(row.login_at || row.punch_in_time || row.punch_in)}</td>
                                                    <td className="small text-primary fw-bold">{formatTime(row.logout_at || row.punch_out_time || row.punch_out)}</td>
                                                    <td className="small text-secondary fw-bold">{row.shift || '-'}</td>
                                                    <td>
                                                        <span className={`badge ${getStatusBadge(row.status)}`}>
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                    {!personal && (
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <button className="btn btn-sm btn-outline-primary border-0 p-1" onClick={() => handleEdit(row.id)}><FaEdit size={16} /></button>
                                                                <button className="btn btn-sm btn-outline-danger border-0 p-1" onClick={() => handleDelete(row.id)}><FaTrash size={16} /></button>
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                {attendanceData.length === 0 ? (
                                    <div className="text-center p-4 text-muted">No attendance records found.</div>
                                ) : (
                                    <div className="row g-4">
                                        {attendanceData.map((row) => (
                                            <div className="col-md-4 col-lg-3" key={row.id}>
                                                <div className="card border-0 shadow-sm h-100 hover-lift text-center position-relative overflow-hidden">
                                                    <div className="position-absolute top-0 start-0 w-100" style={{ height: '6px', background: 'linear-gradient(90deg, #0d6efd, #0dcaf0)' }}></div>
                                                    <div className="card-body p-4 d-flex flex-column align-items-center">
                                                        <div className="mb-3 position-relative">
                                                            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-primary border border-2 border-white shadow-sm" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                                                                <FaUserCircle />
                                                            </div>
                                                            <span className={`position-absolute bottom-0 end-0 p-2 rounded-circle border border-2 border-white ${row.status === 'Present' ? 'bg-success' : 'bg-secondary'}`}></span>
                                                        </div>
                                                        <h6 className="fw-bold text-dark mb-1">{row.employee_name || row.name || 'Unknown'}</h6>
                                                        <div className="small text-muted mb-2">{row.employee_id || 'ID: --'}</div>
                                                        <div className="badge bg-light text-dark border mb-3">{row.shift || 'General Shift'}</div>
                                                        <div className="d-flex w-100 justify-content-between bg-light rounded p-2 mb-3">
                                                            <div className="text-center">
                                                                <div className="small text-muted fw-bold" style={{ fontSize: '0.7rem' }}>PUNCH IN</div>
                                                                <div className="fw-bold text-primary">{formatTime(row.login_at || row.punch_in_time || row.punch_in)}</div>
                                                            </div>
                                                            <div className="vr opacity-25"></div>
                                                            <div className="text-center">
                                                                <div className="small text-muted fw-bold" style={{ fontSize: '0.7rem' }}>PUNCH OUT</div>
                                                                <div className="fw-bold text-primary">{formatTime(row.logout_at || row.punch_out_time || row.punch_out)}</div>
                                                            </div>
                                                        </div>
                                                        {!personal && (
                                                            <div className="d-flex gap-2 w-100">
                                                                <button className="btn btn-sm btn-outline-primary flex-grow-1" onClick={() => handleEdit(row.id)}>Edit</button>
                                                                <button className="btn btn-sm btn-outline-danger flex-grow-1" onClick={() => handleDelete(row.id)}>Delete</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Manual Entry Modal */}
            {showManualModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editingRecord ? 'Edit Attendance' : 'Add Manual Attendance'}</h5>
                                <button className="btn-close" onClick={() => setShowManualModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <ManualAttendanceForm
                                    onSubmit={handleManualAttendance}
                                    onCancel={() => setShowManualModal(false)}
                                    initialData={editingRecord}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Entry Modal */}
            {showBulkModal && (
                <BulkAttendanceModal
                    onClose={() => setShowBulkModal(false)}
                    onRefresh={fetchAttendance}
                />
            )}

            {/* Import CSV Modal */}
            {showImportModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Import Attendance CSV</h5>
                                <button className="btn-close" onClick={() => setShowImportModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Select CSV File</label>
                                    <input type="file" className="form-control" accept=".csv" onChange={handleFileChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowImportModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleImportSubmit} disabled={isImporting}>
                                    {isImporting ? 'Importing...' : 'Upload'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Internal Form Component
const ManualAttendanceForm = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Unmarked',
        punchIn: '',
        punchOut: '',
        shift: 'General Shift (10:00 AM - 07:00 PM)'
    });

    const extractTimeForInput = (timeVal) => {
        if (!timeVal) return '';
        if (timeVal.includes(' ') && timeVal.includes(':')) {
            const timePart = timeVal.split(' ')[1];
            return timePart.substring(0, 5);
        }
        if (timeVal.includes('T')) {
            const date = new Date(timeVal);
            if (!isNaN(date.getTime())) {
                return date.toTimeString().substring(0, 5);
            }
        }
        if (timeVal.length === 5 && timeVal.includes(':')) return timeVal;
        return timeVal;
    };

    useEffect(() => {
        if (initialData) {
            setFormData({
                employeeId: initialData.employee_id || initialData.name || '',
                date: initialData.date || '',
                status: initialData.status || 'Unmarked',
                punchIn: extractTimeForInput(initialData.login_at || initialData.punch_in_time || initialData.punch_in),
                punchOut: extractTimeForInput(initialData.logout_at || initialData.punch_out_time || initialData.punch_out),
                shift: initialData.shift || 'General Shift (10:00 AM - 07:00 PM)'
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
            <div className="mb-3">
                <label className="form-label">Employee ID / Name</label>
                <input type="text" name="employeeId" className="form-control" value={formData.employeeId} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Date</label>
                <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Half Day">Half Day</option>
                    <option value="Late">Late</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Punch In Time</label>
                <input type="time" name="punchIn" className="form-control" value={formData.punchIn} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Punch Out Time</label>
                <input type="time" name="punchOut" className="form-control" value={formData.punchOut} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Shift Timing</label>
                <select name="shift" className="form-select" value={formData.shift} onChange={handleChange}>
                    <option value="General Shift (10:00 AM - 07:00 PM)">General Shift (10:00 AM - 07:00 PM)</option>
                    <option value="Morning Shift (06:00 AM - 03:00 PM)">Morning Shift (06:00 AM - 03:00 PM)</option>
                    <option value="Night Shift (06:00 PM - 03:00 AM)">Night Shift (06:00 PM - 03:00 AM)</option>
                    <option value="Flexible Shift">Flexible Shift</option>
                </select>
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>
    );
};

const Attendance = ({ personal = false }) => {
    return (
        <DashboardLayout title={personal ? "My Attendance" : "Attendance Management"}>
            <AttendanceContent personal={personal} />
        </DashboardLayout>
    );
};

export default Attendance;

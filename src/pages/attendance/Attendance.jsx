import React, { useState, useEffect } from 'react';
import { attendanceService } from "./server/server";
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

import {
    FaEdit,
    FaTrash,
    FaSearch
} from 'react-icons/fa';

export const AttendanceContent = ({ personal = false }) => {
    const { user } = useAuth();
    // Filter States
    const [filterDateFrom, setFilterDateFrom] = useState('2025-10-02');
    const [filterDateTo, setFilterDateTo] = useState('2025-10-02');
    const [filterDay, setFilterDay] = useState('All');
    const [filterMonth, setFilterMonth] = useState('');
    // const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [showManualModal, setShowManualModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    // Import Logic State
    const [importFile, setImportFile] = useState(null);
    const [isImporting, setIsImporting] = useState(false);

    // Handlers
    const handleManualAttendance = async (formData) => {
        try {
            if (editingRecord) {
                // Update existing record
                setAttendanceData(prev => prev.map(item => item.id === editingRecord.id ? {
                    ...item,
                    name: formData.employeeId,
                    attendance: formData.status,
                    loginAt: formData.checkIn,
                    logoutAt: formData.checkOut,
                    date: formData.date.split('-').reverse().join('/'), // Convert YYYY-MM-DD to DD/MM/YYYY
                    loggedTime: (formData.checkIn && formData.checkOut) ? calculateDuration(formData.checkIn, formData.checkOut) : item.loggedTime
                } : item));
                alert("Attendance updated successfully!");
            } else {
                // Add new record
                const newRecord = {
                    id: Date.now(),
                    name: formData.employeeId || 'Unknown',
                    attendance: formData.status,
                    loginAt: formData.checkIn || '-',
                    logoutAt: formData.checkOut || '-',
                    date: formData.date.split('-').reverse().join('/'),
                    loggedTime: (formData.checkIn && formData.checkOut) ? calculateDuration(formData.checkIn, formData.checkOut) : '',
                    device: 'Manual Entry'
                };
                setAttendanceData(prev => [newRecord, ...prev]);
                alert("Attendance added successfully!");
            }
            setShowManualModal(false);
            setEditingRecord(null);
        } catch (err) {
            console.error("Manual attendance error", err);
            alert("Failed to save attendance.");
        }
    };

    // Helper to calculate duration between two HH:mm times
    const calculateDuration = (start, end) => {
        const [startH, startM] = start.split(':').map(Number);
        const [endH, endM] = end.split(':').map(Number);
        let diffMins = (endH * 60 + endM) - (startH * 60 + startM);
        if (diffMins < 0) diffMins += 24 * 60; // Handle overnight
        const hrs = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        return `${hrs} hrs ${mins} mins`;
    };

    const handleImportSubmit = async () => {
        if (!importFile) return;
        setIsImporting(true);

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const rows = text.split('\n');
            const newRecords = [];

            // Assume format: Name,Status,LoggedTime,LoginAt,LogoutAt,Date,Device
            // Skipping header if exists (simple check: if first col is 'Name')
            rows.forEach((row, index) => {
                if (!row.trim()) return;
                const cols = row.split(',');
                if (cols.length < 5) return; // Basic validation

                // Skip header row
                if (index === 0 && (cols[0].toLowerCase().includes('name') || cols[0].toLowerCase().includes('employee'))) return;

                const record = {
                    id: Date.now() + index, // Generate temporary ID
                    name: cols[0]?.trim() || 'Unknown',
                    attendance: cols[1]?.trim() || 'Present',
                    loggedTime: cols[2]?.trim() || '',
                    loginAt: cols[3]?.trim() || '',
                    logoutAt: cols[4]?.trim() || '',
                    date: cols[5]?.trim() || new Date().toLocaleDateString('en-GB'), // Default to today/DD/MM/YYYY
                    device: cols[6]?.trim() || 'Imported'
                };
                newRecords.push(record);
            });

            if (newRecords.length > 0) {
                setAttendanceData(prev => [...prev, ...newRecords]);
                alert(`Successfully imported ${newRecords.length} records!`);
            } else {
                alert("No valid records found or empty file.");
            }

            setIsImporting(false);
            setShowImportModal(false);
            setImportFile(null);
        };

        reader.onerror = () => {
            alert("Failed to read file.");
            setIsImporting(false);
        };

        reader.readAsText(importFile);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImportFile(e.target.files[0]);
        }
    };

    /* Mock Data - Admin View (Matching image columns: Name, Attendance, Logged Time, Login At, Logout At, Date, Device, Action) */
    const [attendanceData, setAttendanceData] = useState([]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this attendance record?')) {
            setAttendanceData(attendanceData.filter(item => item.id !== id));
        }
    };

    const handleEdit = (id) => {
        const recordToEdit = attendanceData.find(item => item.id === id);
        if (recordToEdit) {
            setEditingRecord(recordToEdit);
            setShowManualModal(true);
        }
    };

    /* Mock Data - Personal View */
    const personalAttendanceData = [
        { date: 'Jan 28, 2026', day: 'Wednesday', in: '10:05 AM', out: '-', hours: '4h 12m', status: 'Present' },
        { date: 'Jan 27, 2026', day: 'Tuesday', in: '10:00 AM', out: '07:00 PM', hours: '9h 00m', status: 'Present' },
        { date: 'Jan 26, 2026', day: 'Monday', in: '10:15 AM', out: '07:15 PM', hours: '9h 00m', status: 'Late' },
        { date: 'Jan 23, 2026', day: 'Friday', in: '10:00 AM', out: '07:00 PM', hours: '9h 00m', status: 'Present' },
        { date: 'Jan 22, 2026', day: 'Thursday', in: '-', out: '-', hours: '-', status: 'Absent' },
    ];

    return (
        <div className="attendance-content bg-light p-4" style={{ minHeight: '80vh' }}>
            {/* Header */}
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div style={{ width: '150px' }}></div> {/* Spacer for centering */}
                <h4 className="fw-bold text-dark m-0">{personal ? 'My Attendance' : 'Attendance Details'}</h4>
                <div style={{ width: '150px', display: 'flex', justifyContent: 'flex-end' }}>
                    {null}
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-3 rounded shadow-sm mb-4">
                {personal ? (
                    /* Simplified Filters for Personal View */
                    <div className="row g-3 align-items-end">
                        <div className="col-md-3">
                            <label className="small text-muted fw-bold mb-1">Select Month</label>
                            <select className="form-select text-secondary">
                                <option>January 2026</option>
                                <option>December 2025</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary w-100 fw-bold border-0" style={{ backgroundColor: '#0d6efd' }}>SEARCH</button>
                        </div>
                    </div>
                ) : (
                    /* Admin Filters */
                    <>
                        <div className="row g-3 mb-3 align-items-center">
                            <div className="col-md-3">
                                <select className="form-select text-secondary">
                                    <option>Select Role/Department</option>
                                    {(!user?.role || user?.role === 'superadmin' || user?.role === 'admin') && <option>Admin</option>}
                                    <option>HR</option>
                                    <option>Manager</option>
                                    <option>Employee</option>
                                    {(!user?.role || user?.role === 'superadmin' || user?.role === 'admin') && <option>Accountant</option>}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0 text-muted" style={{ fontSize: '0.8rem' }}>Select Day</span>
                                    <select className="form-select border-start-0 ps-0 text-secondary" value={filterDay} onChange={(e) => setFilterDay(e.target.value)}>
                                        <option>All</option>
                                        <option>Today</option>
                                    </select>
                                </div>
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
                            <div className="col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0 text-muted" style={{ fontSize: '0.8rem' }}>Select Month</span>
                                    <select className="form-select border-start-0 ps-0 text-secondary" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                                        <option>October 2025</option>
                                        <option>September 2025</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0 text-muted"><FaSearch className="text-secondary" /></span>
                                    <input type="text" className="form-control border-start-0 ps-0 text-secondary shadow-none" placeholder="Search..." />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-outline-primary w-100 fw-bold border-primary text-primary" style={{ backgroundColor: 'transparent' }} onClick={() => { setEditingRecord(null); setShowManualModal(true); }}>MANUAL</button>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary w-100 fw-bold border-0" style={{ backgroundColor: '#0d6efd' }} onClick={() => setShowImportModal(true)}>IMPORT CSV</button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Table Section */}
            <div className="bg-white rounded shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                {personal ? (
                                    <>
                                        <th className="border-bottom-0 text-dark fw-bold small ps-4">Date</th>
                                        <th className="border-bottom-0 text-dark fw-bold small">Day</th>
                                        <th className="border-bottom-0 text-dark fw-bold small">Check-In</th>
                                        <th className="border-bottom-0 text-dark fw-bold small">Check-Out</th>
                                        <th className="border-bottom-0 text-dark fw-bold small">Working Hours</th>
                                        <th className="border-bottom-0 text-dark fw-bold small">Status</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="border-bottom-0 text-dark fw-bold small ps-4">Name</th>
                                        <th className="border-bottom-0 text-dark fw-bold small">Attendance</th>
                                        <th className="border-bottom-0 text-dark fw-bold small">Logged Time</th>
                                        <th className="border-bottom-0 text-dark fw-bold small">Login At</th>
                                        <th className="border-bottom-0 text-dark fw-bold small">Logout At</th>
                                        <th className="border-bottom-0 text-dark fw-bold small">Date</th>
                                        <th className="border-bottom-0 text-dark fw-bold small">Action</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {personal ? (
                                personalAttendanceData.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="ps-4 fw-bold text-secondary">{row.date}</td>
                                        <td className="small text-muted">{row.day}</td>
                                        <td className="small text-primary fw-bold">{row.in}</td>
                                        <td className="small text-primary fw-bold">{row.out}</td>
                                        <td className="small fw-bold">{row.hours}</td>
                                        <td>
                                            <span className={`badge ${row.status === 'Present' ? 'bg-success' : row.status === 'Absent' ? 'bg-danger' : 'bg-warning'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                attendanceData.map((row) => (
                                    <tr key={row.id}>
                                        <td className="ps-4">
                                            <span className="text-secondary">{row.name}</span>
                                        </td>
                                        <td>
                                            <span className={`small fw-bold ${row.attendance === 'Present' ? 'text-success' :
                                                row.attendance === 'Absent' ? 'text-danger' :
                                                    'text-warning'
                                                }`}>
                                                {row.attendance}
                                            </span>
                                        </td>
                                        <td className="small text-secondary">{row.loggedTime}</td>
                                        <td className="small text-secondary">{row.loginAt}</td>
                                        <td className="small text-secondary">{row.logoutAt}</td>
                                        <td className="small text-secondary">{row.date}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm btn-outline-primary border-0 p-1" onClick={() => handleEdit(row.id)}><FaEdit size={16} /></button>
                                                <button className="btn btn-sm btn-outline-danger border-0 p-1" onClick={() => handleDelete(row.id)}><FaTrash size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-end align-items-center p-3 border-top">
                    <span className="small text-muted me-3">Rows per page: 10</span>
                    <span className="small text-muted me-3">1-10 of {personal ? personalAttendanceData.length : attendanceData.length}</span>
                    <div className="btn-group">
                        <button className="btn btn-sm btn-link text-muted border-0">&lt;</button>
                        <button className="btn btn-sm btn-link text-muted border-0">&gt;</button>
                    </div>
                </div>
            </div>

            {/* Manual Entry Modal */}
            {
                showManualModal && (
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
                )
            }

            {/* Import CSV Modal */}
            {
                showImportModal && (
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
                )
            }
        </div >
    );
};

// Internal Form Component
const ManualAttendanceForm = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
        checkIn: '',
        checkOut: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                employeeId: initialData.name || '',
                date: initialData.date ? initialData.date.split('/').reverse().join('-') : '',
                status: initialData.attendance || 'Present',
                checkIn: initialData.loginAt || '',
                checkOut: initialData.logoutAt || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
            <div className="mb-3">
                <label className="form-label">Employee Name/ID</label>
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
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Check In</label>
                <input type="time" name="checkIn" className="form-control" value={formData.checkIn} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Check Out</label>
                <input type="time" name="checkOut" className="form-control" value={formData.checkOut} onChange={handleChange} />
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


import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useAuth } from '../../../../context/AuthContext';
import './Attendance.css';
import {
    FaCheckCircle,
    FaTimesCircle,
    FaCalendarAlt,
    FaExclamationCircle,
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
    const [filterRole, setFilterRole] = useState('Select Role/Department');
    const [searchTerm, setSearchTerm] = useState('');

    // Import Modal State
    const [showImportModal, setShowImportModal] = useState(false);

    const [importFile, setImportFile] = useState(null);

    // Manual Attendance Modal State
    const [showManualModal, setShowManualModal] = useState(false);
    // Mock Users for Manual Attendance
    const [manualUsers, setManualUsers] = useState([
        { id: 101, employeeId: 'EMP001', name: 'Amit Verma', role: 'Employee', shift: 'General Shift', status: 'Pending' },
        { id: 102, employeeId: 'EMP002', name: 'Sneha Patel', role: 'HR', shift: 'Morning Shift', status: 'Pending' },
        { id: 103, employeeId: 'EMP003', name: 'Rajesh Kumar', role: 'Manager', shift: 'General Shift', status: 'Pending' },
        { id: 104, employeeId: 'EMP004', name: 'Pooja Singh', role: 'Employee', shift: 'Night Shift', status: 'Pending' },
        { id: 105, employeeId: 'EMP005', name: 'Vikram Malhotra', role: 'Employee', shift: 'General Shift', status: 'Pending' },
    ]);

    const handleOpenManual = () => {
        setShowManualModal(true);
    };

    const handleCloseManual = () => {
        setShowManualModal(false);
    };

    const handleMarkAttendance = (id, status) => {
        setManualUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
    };

    const handleSaveManual = () => {
        const markedUsers = manualUsers.filter(u => u.status !== 'Pending');
        const newRecords = markedUsers.map(u => ({
            id: Date.now() + u.id, // Generate a unique ID
            employeeId: u.employeeId,
            name: u.name,
            shift: u.shift,
            attendance: u.status,
            loggedTime: u.status === 'Present' ? '9 hrs 00 mins' : '-', // Default for manual
            loginAt: u.status === 'Present' ? '09:00' : '-',
            logoutAt: u.status === 'Present' ? '18:00' : '-',
            date: new Date().toLocaleDateString('en-GB'), // 02/10/2025 format
            isManual: true
        }));

        setAttendanceData(prev => [...newRecords, ...prev]);
        setShowManualModal(false);
        // Reset manual users status if needed, or keep for session
        setManualUsers(prev => prev.map(u => ({ ...u, status: 'Pending' })));
        alert(`${newRecords.length} records saved successfully!`);
    };

    const getEligibleUsers = () => {
        const currentUserRole = user?.role || 'admin'; // Default to admin for dev
        if (currentUserRole === 'superadmin' || currentUserRole === 'admin') return manualUsers;
        if (currentUserRole === 'manager') return manualUsers.filter(u => u.role === 'HR' || u.role === 'Employee');
        if (currentUserRole === 'hr') return manualUsers.filter(u => u.role === 'Employee');
        return [];
    };

    const eligibleUsers = getEligibleUsers();

    // Stats for Manual Modal
    const manualStats = {
        total: eligibleUsers.length,
        present: eligibleUsers.filter(u => u.status === 'Present').length,
        absent: eligibleUsers.filter(u => u.status === 'Absent').length,
        pending: eligibleUsers.filter(u => u.status === 'Pending').length,
    };



    const handleImport = () => {
        setShowImportModal(true);
    };

    const handleCloseModal = () => {
        setShowImportModal(false);
        setImportFile(null);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImportFile(e.target.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setImportFile(null);
    };

    const handleSaveImport = () => {
        if (importFile) {
            alert(`Successfully imported: ${importFile.name}`);
            handleCloseModal();
        } else {
            alert("Please select a file to import.");
        }
    };

    /* Mock Data - Admin View (Matching image columns: Name, Employee ID, Shift, Attendance, Logged Time, Login At, Logout At, Date, Action) */
    const [attendanceData, setAttendanceData] = useState([
        { id: 1, employeeId: 'EMP101', name: 'Meera Joshi', shift: 'General Shift', attendance: 'Present', loggedTime: '8 hrs 49 mins', loginAt: '09:45', logoutAt: '19:34', date: '02/10/2025' },
        { id: 2, employeeId: 'EMP102', name: 'Sanjay Gupta', shift: 'Morning Shift', attendance: 'Present', loggedTime: '7 hrs 40 mins', loginAt: '10:29', logoutAt: '19:09', date: '02/10/2025' },
        { id: 3, employeeId: 'EMP103', name: 'Mohan Prasad', shift: 'General Shift', attendance: 'Absent', loggedTime: '', loginAt: '', logoutAt: '', date: '02/10/2025' },
        { id: 4, employeeId: 'EMP104', name: 'Kiran Desai', shift: 'Night Shift', attendance: 'Present', loggedTime: '9 hrs 24 mins', loginAt: '09:27', logoutAt: '19:51', date: '02/10/2025' },
        { id: 5, employeeId: 'EMP105', name: 'Priya Nair', shift: 'General Shift', attendance: 'Present', loggedTime: '8 hrs 28 mins', loginAt: '09:18', logoutAt: '18:46', date: '02/10/2025' },
        { id: 6, employeeId: 'EMP106', name: 'Rohit Mehta', shift: 'Morning Shift', attendance: 'Present', loggedTime: '8 hrs 48 mins', loginAt: '09:56', logoutAt: '19:44', date: '02/10/2025' },
        { id: 7, employeeId: 'EMP107', name: 'Shreya Iyer', shift: 'General Shift', attendance: 'Present', loggedTime: '8 hrs 59 mins', loginAt: '09:08', logoutAt: '19:07', date: '02/10/2025' },
        { id: 8, employeeId: 'EMP108', name: 'Arjun Singh', shift: 'Night Shift', attendance: 'Present', loggedTime: '9 hrs 29 mins', loginAt: '09:56', logoutAt: '20:25', date: '02/10/2025' },
        { id: 9, employeeId: 'EMP109', name: 'Deepika Sharma', shift: 'Morning Shift', attendance: 'Half Day', loggedTime: '4 hrs 16 mins', loginAt: '11:44', logoutAt: '16:00', date: '02/10/2025' },
        { id: 10, employeeId: 'EMP110', name: 'Manoj Tiwari', shift: 'General Shift', attendance: 'Present', loggedTime: '8 hrs 6 mins', loginAt: '09:12', logoutAt: '18:18', date: '02/10/2025' },
    ]);

    // Derived Data for Filters

    const filteredAttendanceData = attendanceData.filter(item => {
        const matchRole = filterRole === 'Select Role/Department' || true; // Mock data doesn't have role, so assuming true or future implementation
        const matchDay = filterDay === 'All' || true; // Basic mock filter
        // Simple date/month filtering logic would go here, simplified for mock:
        const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.attendance.toLowerCase().includes(searchTerm.toLowerCase());

        return matchRole && matchDay && matchSearch;
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this attendance record?')) {
            setAttendanceData(attendanceData.filter(item => item.id !== id));
        }
    };

    const handleEdit = (id) => {
        alert(`Edit functionality for ID ${id} will be implemented here.`);
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
                            <div className="position-relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="form-control border-0 rounded-pill ps-5 text-dark"
                                    style={{
                                        width: '100%',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.8)',
                                        boxShadow: '0 2px 15px rgba(236, 72, 153, 0.1), 0 2px 15px rgba(59, 130, 246, 0.1)',
                                        fontSize: '0.9rem',
                                        paddingRight: '1rem',
                                        color: '#1e293b'
                                    }}
                                />
                                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-75">
                                    <FaSearch />
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Admin Filters */
                    <>
                        <div className="row g-3 mb-3 align-items-center">
                            <div className="col-md-3">
                                <select className="form-select text-secondary" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
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
                        <div className="row g-3 align-items-center">
                            <div className="col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0 text-muted" style={{ fontSize: '0.8rem' }}>Select Month</span>
                                    <select className="form-select border-start-0 ps-0 text-secondary" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                                        <option>October 2025</option>
                                        <option>September 2025</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="form-control border-0 rounded-pill ps-5 text-dark"
                                        style={{
                                            width: '100%',
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            backdropFilter: 'blur(20px)',
                                            WebkitBackdropFilter: 'blur(20px)',
                                            border: '1px solid rgba(255, 255, 255, 0.8)',
                                            boxShadow: '0 2px 15px rgba(236, 72, 153, 0.1), 0 2px 15px rgba(59, 130, 246, 0.1)',
                                            fontSize: '0.9rem',
                                            paddingRight: '1rem',
                                            color: '#1e293b'
                                        }}
                                    />
                                    <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary opacity-75">
                                        <FaSearch />
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-outline-primary w-100 fw-bold border-1 text-nowrap rounded-pill" onClick={handleOpenManual}>
                                    MANUAL
                                </button>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary w-100 fw-bold border-0 text-nowrap rounded-pill" style={{ backgroundColor: '#0d6efd' }} onClick={handleImport}>IMPORT CSV</button>
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
                                        <th className="border-bottom-0 text-dark fw-bold small">Employee ID</th>
                                        <th className="border-bottom-0 text-dark fw-bold small">Shift</th>
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
                                filteredAttendanceData.map((row) => (
                                    <tr key={row.id}>
                                        <td className="ps-4">
                                            <span className="text-secondary">{row.name}</span>
                                        </td>
                                        <td className="small text-secondary">{row.employeeId}</td>
                                        <td><span className="badge bg-secondary bg-opacity-10 text-secondary border small">{row.shift}</span></td>
                                        <td>
                                            <span className={`small fw-bold ${row.attendance === 'Present' ? 'text-success' :
                                                row.attendance === 'Absent' ? 'text-danger' :
                                                    'text-warning'
                                                }`}>
                                                {row.attendance}
                                            </span>
                                            {row.isManual && (
                                                <span className="badge bg-success ms-2 rounded-circle p-1" style={{ width: '20px', height: '20px', fontSize: '0.65rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} title="Manual Entry">
                                                    M
                                                </span>
                                            )}
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
                    <span className="small text-muted me-3">1-10 of {personal ? personalAttendanceData.length : filteredAttendanceData.length}</span>
                    <div className="btn-group">
                        <button className="btn btn-sm btn-link text-muted border-0">&lt;</button>
                        <button className="btn btn-sm btn-link text-muted border-0">&gt;</button>
                    </div>
                </div>
            </div>


            {/* Import CSV Modal */}
            {
                showImportModal && (
                    <>
                        <div className="modal-backdrop fade show"></div>
                        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title fw-bold">Import Attendance CSV</h5>
                                        <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                                    </div>
                                    <div className="modal-body text-center p-4">
                                        {!importFile ? (
                                            <div className="border border-2 border-dashed rounded p-5 bg-light mb-3">
                                                <div className="text-secondary mb-3">
                                                    <i className="bi bi-cloud-upload fs-1"></i>
                                                </div>
                                                <label htmlFor="csvInput" className="btn btn-outline-primary">
                                                    Select CSV File
                                                </label>
                                                <input
                                                    type="file"
                                                    id="csvInput"
                                                    accept=".csv"
                                                    className="d-none"
                                                    onChange={handleFileChange}
                                                />
                                                <p className="small text-muted mt-2">Accepted formats: .csv</p>
                                            </div>
                                        ) : (
                                            <div className="card border-primary mb-3">
                                                <div className="card-body d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="bg-primary bg-opacity-10 p-2 rounded text-primary">
                                                            <span className="fw-bold">CSV</span>
                                                        </div>
                                                        <div className="text-start">
                                                            <h6 className="mb-0 text-truncate" style={{ maxWidth: '200px' }}>{importFile.name}</h6>
                                                            <small className="text-muted">{(importFile.size / 1024).toFixed(2)} KB</small>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-outline-danger btn-sm border-0" onClick={handleRemoveFile}>
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                        <button type="button" className="btn btn-primary" onClick={handleSaveImport} disabled={!importFile}>
                                            Save & Import
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

            {/* Manual Attendance Modal */}
            {showManualModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-xl modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-light">
                                    <h5 className="modal-title fw-bold">Manual Attendance Entry</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseManual}></button>
                                </div>
                                <div className="modal-body p-0">
                                    <div className="row g-0">
                                        {/* Left Side: Marking Interface */}
                                        <div className="col-md-8 p-4 border-end">
                                            <h6 className="fw-bold text-muted mb-3">Mark Attendance for {new Date().toLocaleDateString()}</h6>
                                            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="table table-hover align-middle">
                                                    <thead className="table-light sticky-top">
                                                        <tr>
                                                            <th>Employee Name</th>
                                                            <th>Employee ID</th>
                                                            <th>Shift</th>
                                                            <th>Role</th>
                                                            <th className="text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {eligibleUsers.map(u => (
                                                            <tr key={u.id}>
                                                                <td className="fw-bold text-secondary">{u.name}</td>
                                                                <td className="text-muted small">{u.employeeId}</td>
                                                                <td className="text-muted small">{u.shift}</td>
                                                                <td><span className="badge bg-secondary bg-opacity-10 text-secondary border">{u.role}</span></td>
                                                                <td>
                                                                    <div className="d-flex justify-content-center gap-2">
                                                                        <button
                                                                            className={`btn btn-sm ${u.status === 'Present' ? 'btn-success' : 'btn-outline-success'} rounded-pill px-3`}
                                                                            onClick={() => handleMarkAttendance(u.id, 'Present')}
                                                                        >
                                                                            Present
                                                                        </button>
                                                                        <button
                                                                            className={`btn btn-sm ${u.status === 'Absent' ? 'btn-danger' : 'btn-outline-danger'} rounded-pill px-3`}
                                                                            onClick={() => handleMarkAttendance(u.id, 'Absent')}
                                                                        >
                                                                            Absent
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {eligibleUsers.length === 0 && (
                                                            <tr>
                                                                <td colSpan="3" className="text-center text-muted py-4">No eligible employees found.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Right Side: Summary */}
                                        <div className="col-md-4 p-4 bg-light">
                                            <h6 className="fw-bold text-dark mb-4">Attendance Summary</h6>

                                            <div className="card border-0 shadow-sm mb-3">
                                                <div className="card-body d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <h3 className="fw-bold text-primary mb-0">{manualStats.total}</h3>
                                                        <small className="text-muted">Total Eligible</small>
                                                    </div>
                                                    <div className="p-3 bg-primary bg-opacity-10 rounded-circle text-primary">
                                                        <FaSearch size={20} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-2">
                                                <div className="col-6">
                                                    <div className="card border-0 shadow-sm text-center p-3">
                                                        <h4 className="fw-bold text-success mb-0">{manualStats.present}</h4>
                                                        <small className="text-muted">Present</small>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="card border-0 shadow-sm text-center p-3">
                                                        <h4 className="fw-bold text-danger mb-0">{manualStats.absent}</h4>
                                                        <small className="text-muted">Absent</small>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <div className="d-flex justify-content-between text-muted small mb-1">
                                                    <span>Progress ({manualStats.total - manualStats.pending}/{manualStats.total})</span>
                                                    <span>{Math.round(((manualStats.total - manualStats.pending) / (manualStats.total || 1)) * 100)}%</span>
                                                </div>
                                                <div className="progress" style={{ height: '8px' }}>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        style={{ width: `${Math.round(((manualStats.total - manualStats.pending) / (manualStats.total || 1)) * 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="mt-5 text-center">
                                                <button className="btn btn-dark w-100 py-2" onClick={handleSaveManual}>Done</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div >
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

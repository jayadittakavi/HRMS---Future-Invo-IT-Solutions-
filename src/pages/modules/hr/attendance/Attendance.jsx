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
    FaTrash
} from 'react-icons/fa';

export const AttendanceContent = ({ personal = false }) => {
    const { user } = useAuth();
    // Filter States
    const [filterDateFrom, setFilterDateFrom] = useState('2025-10-02');
    const [filterDateTo, setFilterDateTo] = useState('2025-10-02');
    const [filterDay, setFilterDay] = useState('All');
    const [filterMonth, setFilterMonth] = useState('');
    // const [searchTerm, setSearchTerm] = useState('');

    /* Mock Data - Admin View (Matching image columns: Name, Attendance, Logged Time, Login At, Logout At, Date, Device, Action) */
    const [attendanceData, setAttendanceData] = useState([
        { id: 1, name: 'Meera Joshi', attendance: 'Present', loggedTime: '8 hrs 49 mins', loginAt: '09:45', logoutAt: '19:34', date: '02/10/2025', device: 'Laptop' },
        { id: 2, name: 'Sanjay Gupta', attendance: 'Present', loggedTime: '7 hrs 40 mins', loginAt: '10:29', logoutAt: '19:09', date: '02/10/2025', device: 'Laptop' },
        { id: 3, name: 'Mohan Prasad', attendance: 'Absent', loggedTime: '', loginAt: '', logoutAt: '', date: '02/10/2025', device: 'Android Mobile' },
        { id: 4, name: 'Kiran Desai', attendance: 'Present', loggedTime: '9 hrs 24 mins', loginAt: '09:27', logoutAt: '19:51', date: '02/10/2025', device: 'Android Mobile' },
        { id: 5, name: 'Priya Nair', attendance: 'Present', loggedTime: '8 hrs 28 mins', loginAt: '09:18', logoutAt: '18:46', date: '02/10/2025', device: 'Desktop' },
        { id: 6, name: 'Rohit Mehta', attendance: 'Present', loggedTime: '8 hrs 48 mins', loginAt: '09:56', logoutAt: '19:44', date: '02/10/2025', device: 'Laptop' },
        { id: 7, name: 'Shreya Iyer', attendance: 'Present', loggedTime: '8 hrs 59 mins', loginAt: '09:08', logoutAt: '19:07', date: '02/10/2025', device: 'iPhone' },
        { id: 8, name: 'Arjun Singh', attendance: 'Present', loggedTime: '9 hrs 29 mins', loginAt: '09:56', logoutAt: '20:25', date: '02/10/2025', device: 'iPhone' },
        { id: 9, name: 'Deepika Sharma', attendance: 'Half Day', loggedTime: '4 hrs 16 mins', loginAt: '11:44', logoutAt: '16:00', date: '02/10/2025', device: 'Tablet' },
        { id: 10, name: 'Manoj Tiwari', attendance: 'Present', loggedTime: '8 hrs 6 mins', loginAt: '09:12', logoutAt: '18:18', date: '02/10/2025', device: 'iPhone' },
    ]);

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
                    {!personal && <button className="btn btn-primary fw-bold border-0" style={{ backgroundColor: '#0d6efd' }}>ADD</button>}
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
                        <div className="row g-3 align-items-center">
                            <div className="col-md-3">
                                <select className="form-select text-secondary">
                                    <option>By Username</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0 text-muted" style={{ fontSize: '0.8rem' }}>Select Month</span>
                                    <select className="form-select border-start-0 ps-0 text-secondary" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                                        <option>October 2025</option>
                                        <option>September 2025</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary w-100 fw-bold border-0" style={{ backgroundColor: '#0d6efd' }}>SEARCH</button>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary w-100 fw-bold border-0" style={{ backgroundColor: '#0d6efd' }}>EXPORT</button>
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
                                        <th className="border-bottom-0 text-dark fw-bold small">Device</th>
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
                                        <td className="small text-secondary">{row.device}</td>
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
        </div>
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

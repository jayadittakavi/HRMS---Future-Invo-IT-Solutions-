import React, { useState } from 'react';
import { MdFileDownload, MdCalendarToday } from 'react-icons/md';

const ManagerAttendance = () => {
    const [fromDate, setFromDate] = useState('2025-02-10');
    const [toDate, setToDate] = useState('2025-02-10');

    // Mock Data based on the screenshot
    const attendanceData = [
        { id: 1, name: 'Mohan Prasad', status: 'Absent', loggedTime: '0', loginAt: '', logoutAt: '', date: '27-09-2025', device: 'Android Mobile' },
        { id: 2, name: 'Kiran Desai', status: 'Present', loggedTime: '9.4', loginAt: '09:27', logoutAt: '19:51', date: '27-09-2025', device: 'Android Mobile' },
        { id: 3, name: 'Kavita Rao', status: 'Present', loggedTime: '7.3', loginAt: '10:14', logoutAt: '18:32', date: '27-09-2025', device: 'Laptop' },
        { id: 4, name: 'Suresh Reddy', status: 'Present', loggedTime: '8.97', loginAt: '10:08', logoutAt: '20:06', date: '27-09-2025', device: 'Tablet' },
        { id: 5, name: 'Nisha Jain', status: 'Present', loggedTime: '9.63', loginAt: '09:07', logoutAt: '19:45', date: '27-09-2025', device: 'Laptop' },
        { id: 6, name: 'Sneha Patel', status: 'Present', loggedTime: '7.27', loginAt: '10:19', logoutAt: '18:35', date: '27-09-2025', device: 'Desktop' },
        { id: 7, name: 'Amit Verma', status: 'Present', loggedTime: '8.97', loginAt: '10:05', logoutAt: '20:03', date: '27-09-2025', device: 'Tablet' },
        { id: 8, name: 'Pooja Singh', status: 'Present', loggedTime: '8.12', loginAt: '09:57', logoutAt: '19:04', date: '27-09-2025', device: 'iPhone' },
        { id: 9, name: 'Vikash Kumar', status: 'Absent', loggedTime: '0', loginAt: '', logoutAt: '', date: '27-09-2025', device: 'iPhone' },
        { id: 10, name: 'Anjali Gupta', status: 'Present', loggedTime: '8.95', loginAt: '10:16', logoutAt: '20:13', date: '27-09-2025', device: 'Desktop' },
    ];

    const getStatusStyle = (status) => {
        return status === 'Present' ? 'text-success' : 'text-danger';
    };

    return (
        <div className="container-fluid p-4 bg-light min-vh-100">
            {/* Header */}
            <div className="text-center mb-4">
                <h4 className="fw-bold text-dark">Attendance Details</h4>
            </div>

            {/* Filters */}
            <div className="bg-white p-3 rounded shadow-sm mb-4 d-flex align-items-end gap-3 flex-wrap">
                <div className="">
                    <label className="text-secondary small d-block mb-1">From</label>
                    <div className="input-group" style={{ width: '200px' }}>
                        <input
                            type="date"
                            className="form-control text-secondary bg-light border-0"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                        <span className="input-group-text bg-light border-0"><MdCalendarToday className="text-secondary" /></span>
                    </div>
                </div>

                <div className="">
                    <label className="text-secondary small d-block mb-1">To</label>
                    <div className="input-group" style={{ width: '200px' }}>
                        <input
                            type="date"
                            className="form-control text-secondary bg-light border-0"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                        <span className="input-group-text bg-light border-0"><MdCalendarToday className="text-secondary" /></span>
                    </div>
                </div>

                <div className="ms-auto">
                    <button className="btn btn-primary d-flex align-items-center gap-2 px-4" onClick={() => alert("Export function coming soon!")}>
                        EXPORT <MdFileDownload />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light border-bottom">
                            <tr>
                                <th className="py-3 ps-4 text-dark fw-bold small">Name</th>
                                <th className="py-3 text-dark fw-bold small">Attendance</th>
                                <th className="py-3 text-dark fw-bold small">Logged Time</th>
                                <th className="py-3 text-dark fw-bold small">Login At</th>
                                <th className="py-3 text-dark fw-bold small">Logout At</th>
                                <th className="py-3 text-dark fw-bold small">Date</th>
                                <th className="py-3 pe-4 text-dark fw-bold small">Device</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map(row => (
                                <tr key={row.id}>
                                    <td className="py-3 ps-4 text-secondary">{row.name}</td>
                                    <td className={`py-3 fw-bold ${getStatusStyle(row.status)}`}>{row.status}</td>
                                    <td className="py-3 text-secondary">{row.loggedTime}</td>
                                    <td className="py-3 text-secondary">{row.loginAt}</td>
                                    <td className="py-3 text-secondary">{row.logoutAt}</td>
                                    <td className="py-3 text-secondary">{row.date}</td>
                                    <td className="py-3 pe-4 text-secondary">{row.device}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination (Static Mock) */}
                <div className="d-flex justify-content-end align-items-center p-3 border-top text-secondary small">
                    <span className="me-3">Rows per page: 10</span>
                    <span>1-10 of 91</span>
                    <div className="btn-group ms-3">
                        <button className="btn btn-sm btn-link text-secondary text-decoration-none">&lt;</button>
                        <button className="btn btn-sm btn-link text-secondary text-decoration-none">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerAttendance;

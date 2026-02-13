import React, { useState } from 'react';

const ManagerMyAttendance = () => {
    // Mock Data based on the screenshot provided
    const attendanceData = [
        { id: 1, status: 'Present', loggedTime: '8.95', loginAt: '10:21', logoutAt: '20:18', date: '27-09-2025' },
        { id: 2, status: 'Present', loggedTime: '7.67', loginAt: '10:23', logoutAt: '19:03', date: '27-09-2025' },
        { id: 3, status: 'Present', loggedTime: '9.13', loginAt: '09:11', logoutAt: '19:19', date: '27-09-2025' },
        { id: 4, status: 'Present', loggedTime: '7.43', loginAt: '10:05', logoutAt: '18:31', date: '27-09-2025' },
        { id: 5, status: 'Present', loggedTime: '9.82', loginAt: '09:37', logoutAt: '20:26', date: '27-09-2025' },
        { id: 6, status: 'Half Day', loggedTime: '5.87', loginAt: '12:20', logoutAt: '18:12', date: '27-09-2025' },
        { id: 7, status: 'Present', loggedTime: '8.73', loginAt: '10:30', logoutAt: '20:14', date: '27-09-2025' },
    ];

    const getStatusStyle = (status) => {
        if (status === 'Present') return 'text-success';
        if (status === 'Absent') return 'text-danger';
        if (status === 'Half Day') return 'text-warning';
        return 'text-secondary';
    };

    return (
        <div className="container-fluid p-4 bg-light min-vh-100">
            {/* Header */}
            <div className="text-center mb-5">
                <h4 className="fw-bold text-dark">Attendance Details</h4>
            </div>

            {/* Table */}
            <div className="bg-white rounded shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-white border-bottom">
                            <tr>
                                <th className="py-3 ps-4 text-dark fw-bold small">Attendance</th>
                                <th className="py-3 text-dark fw-bold small">Logged Time</th>
                                <th className="py-3 text-dark fw-bold small">Login At</th>
                                <th className="py-3 text-dark fw-bold small">Logout At</th>
                                <th className="py-3 pe-4 text-dark fw-bold small">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map(row => (
                                <tr key={row.id}>
                                    <td className={`py-4 ps-4 fw-bold ${getStatusStyle(row.status)}`}>{row.status}</td>
                                    <td className="py-4 text-secondary">{row.loggedTime}</td>
                                    <td className="py-4 text-secondary">{row.loginAt}</td>
                                    <td className="py-4 text-secondary">{row.logoutAt}</td>
                                    <td className="py-4 pe-4 text-secondary">{row.date}</td>
                                </tr>
                            ))}
                            {/* Empty rows to match the look if needed, or just data */}
                        </tbody>
                    </table>
                </div>
                {/* Pagination (Static Mock) */}
                <div className="d-flex justify-content-end align-items-center p-3 border-top text-secondary small">
                    <span className="me-3">Rows per page: 10</span>
                    <span>1-7 of 7</span>
                    <div className="btn-group ms-3">
                        <button className="btn btn-sm btn-link text-secondary text-decoration-none" disabled>&lt;</button>
                        <button className="btn btn-sm btn-link text-secondary text-decoration-none" disabled>&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerMyAttendance;

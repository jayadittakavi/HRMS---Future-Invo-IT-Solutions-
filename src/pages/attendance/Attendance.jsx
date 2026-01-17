import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import './Attendance.css';
import {
    FaSearch,
    FaFileExport,
    FaCheckCircle,
    FaTimesCircle,
    FaCalendarAlt,
    FaExclamationCircle
} from 'react-icons/fa';

export const AttendanceContent = () => {
    // Filter States
    const [filterDate, setFilterDate] = useState('2024-05-31');
    const [filterDept, setFilterDept] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    /* Mock Data */
    const attendanceData = [
        { id: 'EMP001', name: 'Meera Krishnan', dept: 'HR', in: '09:00 AM', out: '06:00 PM', status: 'Present' },
        { id: 'EMP002', name: 'John Doe', dept: 'Engineering', in: '09:15 AM', out: '06:15 PM', status: 'Late' },
        { id: 'EMP003', name: 'Sarah Smith', dept: 'Sales', in: '-', out: '-', status: 'Absent' },
        { id: 'EMP004', name: 'Mike Ross', dept: 'Legal', in: '-', out: '-', status: 'On Leave' },
        { id: 'EMP005', name: 'Rachel Zane', dept: 'Legal', in: '08:55 AM', out: '05:55 PM', status: 'Present' },
    ];

    return (
        <div className="attendance-content">
            {/* Attendance Header */}
            <div className="attendance-header-section">
                <h2 className="attendance-title">Overview</h2>
                <p className="attendance-subtitle">Track employee attendance, check-in & check-out status for today.</p>
            </div>

            {/* Stats Cards */}
            <div className="attendance-stats">
                <div className="att-card present">
                    <div className="att-icon" style={{ color: '#166534' }}><FaCheckCircle /></div>
                    <div className="att-info">
                        <h4>Present Today</h4>
                        <span className="value">1,240</span>
                    </div>
                </div>
                <div className="att-card absent">
                    <div className="att-icon" style={{ color: '#991b1b' }}><FaTimesCircle /></div>
                    <div className="att-info">
                        <h4>Absent Today</h4>
                        <span className="value">45</span>
                    </div>
                </div>
                <div className="att-card leave">
                    <div className="att-icon" style={{ color: '#f59e0b' }}><FaCalendarAlt /></div>
                    <div className="att-info">
                        <h4>On Leave</h4>
                        <span className="value">12</span>
                    </div>
                </div>
                <div className="att-card late">
                    <div className="att-icon" style={{ color: '#a855f7' }}><FaExclamationCircle /></div>
                    <div className="att-info">
                        <h4>Late Check-ins</h4>
                        <span className="value">28</span>
                    </div>
                </div>
            </div>

            {/* Controls & Table */}
            <div className="table-container p-4">
                <div className="attendance-controls">
                    <div className="filter-group">
                        <input type="date" className="filter-input" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
                        <select className="filter-input" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
                            <option value="All">All Departments</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Sales">Sales</option>
                        </select>
                        <select className="filter-input">
                            <option value="All">All Status</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>

                    <div className="action-group">
                        <div className="search-box filter-input" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaSearch color="#94a3b8" />
                            <input type="text" placeholder="Search employee..." style={{ border: 'none', outline: 'none' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <button className="btn-outline"><FaFileExport /> Export</button>
                        <button className="btn-gradient">Mark Attendance</button>
                    </div>
                </div>

                <table className="att-table">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Department</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <div className="user-cell">
                                        <div className="user-avatar">{row.name.charAt(0)}</div>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{row.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{row.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{row.dept}</td>
                                <td>{row.in}</td>
                                <td>{row.out}</td>
                                <td>
                                    <span className={`status-badge status-${row.status.toLowerCase().replace(' ', '')}`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td>
                                    <button style={{ border: 'none', background: 'transparent', color: '#3b82f6', cursor: 'pointer', fontWeight: '600' }}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Attendance = () => {
    return (
        <DashboardLayout title="Attendance Management">
            <AttendanceContent />
        </DashboardLayout>
    );
};

export default Attendance;

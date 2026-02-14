import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FaUserCircle, FaClock, FaCalendarDay, FaHistory, FaUserFriends, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement
);

const MySpace = ({ role, onNavigate }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // --- Mock Data ---

    // 1. Leave Balance (Doughnut)
    const leaveData = {
        labels: ['Casual', 'Sick', 'Earned', 'Used'],
        datasets: [
            {
                label: 'Days',
                data: [5, 7, 12, 4],
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#e5e7eb'],
                borderWidth: 0,
            },
        ],
    };

    const leaveOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'right',
                labels: { usePointStyle: true, boxWidth: 8 },
            },
        },
    };

    // 2. Weekly Attendance (Bar with Axes)
    const weeklyAttendanceData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: 'Hours Worked',
                data: [8.5, 9, 8.2, 8.8, 7.5],
                backgroundColor: '#6366f1',
                borderRadius: 4,
            },
            {
                label: 'Break Time',
                data: [1, 0.5, 1, 0.8, 1],
                backgroundColor: '#cbd5e1',
                borderRadius: 4,
            },
        ],
    };

    const weeklyAttendanceOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Hours' },
                grid: { display: true, color: '#f3f4f6' },
            },
            x: {
                grid: { display: false },
            },
        },
        plugins: {
            legend: { display: true, position: 'top' },
        },
    };

    // 3. Performance/Stats (Line Chart)
    const performanceData = {
        labels: ['W1', 'W2', 'W3', 'W4'],
        datasets: [
            {
                label: 'Tasks Completed',
                data: [5, 8, 6, 10],
                borderColor: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const performanceOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { display: false },
            x: { display: false },
        },
        plugins: {
            legend: { display: false },
        },
        elements: {
            point: { radius: 0 }
        }
    };

    const recentActions = [
        { title: 'Leave Approved', desc: 'Your casual leave for 20th Feb approved.', date: '2 hrs ago', type: 'success', icon: <FaCheckCircle className="text-success" /> },
        { title: 'Task Assigned', desc: 'New task: Update Documentation', date: '5 hrs ago', type: 'info', icon: <FaExclamationCircle className="text-primary" /> },
        { title: 'Expense Rejected', desc: 'Reason: Missing Receipt', date: 'Yesterday', type: 'danger', icon: <FaExclamationCircle className="text-danger" /> }
    ];

    return (
        <div className="container-fluid p-0">

            {/* Top Row: Profile & Stats Cards with Gradients */}
            <div className="row g-4 mb-4">
                {/* Task Summary - Gradient Purple */}
                <div className="col-md-6">
                    <div className="dashboard-card bg-gradient-purple h-100 p-4 border-0">
                        <h6 className="dashboard-card-title text-white opacity-75 mb-3">Task Performance</h6>
                        <div className="d-flex justify-content-between align-items-end mb-2">
                            <h2 className="dashboard-value text-white mb-0">29 Tasks</h2>
                            <span className="badge bg-white text-primary bg-opacity-25">+12%</span>
                        </div>
                        <div style={{ height: '100px' }}>
                            <Line data={performanceData} options={performanceOptions} />
                        </div>
                        <p className="opacity-75 small mt-2 mb-0 text-white">Great job! You're ahead of schedule.</p>
                    </div>
                </div>

                {/* Leave Balance - Gradient Orange */}
                <div className="col-md-6">
                    <div className="dashboard-card bg-gradient-orange h-100 p-4 border-0">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="dashboard-card-title text-white opacity-75 mb-0"><FaCalendarDay className="me-2" />Leave Balance</h6>
                            <button className="btn btn-sm btn-white text-orange py-0 px-2 fw-bold small" onClick={() => onNavigate && onNavigate('leave-management')}>Apply</button>
                        </div>
                        <div className="row text-center mt-4">
                            <div className="col-4 border-end border-white border-opacity-25">
                                <h4 className="dashboard-value text-white mb-0">5</h4>
                                <small className="opacity-75 text-white">Casual</small>
                            </div>
                            <div className="col-4 border-end border-white border-opacity-25">
                                <h4 className="dashboard-value text-white mb-0">7</h4>
                                <small className="opacity-75 text-white">Sick</small>
                            </div>
                            <div className="col-4">
                                <h4 className="dashboard-value text-white mb-0">12</h4>
                                <small className="opacity-75 text-white">Earned</small>
                            </div>
                        </div>
                        <div className="mt-auto pt-4 text-center">
                            <small className="opacity-75 text-white">Next Holiday: Independence Day (15 Aug)</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Row: Charts with Axes and Values */}
            <div className="row g-4 mb-4">
                {/* Weekly Attendance Bar Chart */}
                <div className="col-md-8">
                    <div className="dashboard-card bg-white h-100 p-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold text-secondary mb-0"><FaClock className="me-2" />Weekly Work Hours</h6>
                            <select className="form-select form-select-sm w-auto border-0 bg-light">
                                <option>This Week</option>
                                <option>Last Week</option>
                            </select>
                        </div>
                        <div style={{ height: '300px' }}>
                            <Bar data={weeklyAttendanceData} options={weeklyAttendanceOptions} />
                        </div>
                    </div>
                </div>

                {/* Leave Usage Donut */}
                <div className="col-md-4">
                    <div className="dashboard-card bg-white h-100 p-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
                        <h6 className="fw-bold text-secondary mb-3">Leave Distribution</h6>
                        <div style={{ position: 'relative', height: '250px', display: 'flex', justifyContent: 'center' }}>
                            <Doughnut data={leaveData} options={leaveOptions} />
                        </div>
                        <div className="text-center mt-3">
                            <p className="text-muted small">Total 28 Days Available</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Recent Activity & Manager Team Link */}
            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    <div className="dashboard-card bg-white h-100 p-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
                        <h6 className="fw-bold text-secondary mb-3"><FaHistory className="me-2" />Recent Activity</h6>
                        <div className="list-group list-group-flush">
                            {recentActions.map((action, idx) => (
                                <div key={idx} className="list-group-item bg-transparent px-0 border-bottom">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h6 className="mb-1 small fw-bold d-flex align-items-center gap-2">
                                            {action.icon}
                                            {action.title}
                                        </h6>
                                        <small className="text-muted">{action.date}</small>
                                    </div>
                                    <p className="mb-1 small text-secondary ps-4">{action.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {(role === 'Administrator' || role === 'Manager' || role === 'HR') && (
                    <div className="col-md-6">
                        <div className="dashboard-card bg-gradient-blue h-100 p-4 text-white border-0">
                            <h6 className="fw-bold mb-4 text-white"><FaUserFriends className="me-2" />Quick Team Access</h6>
                            <p className="opacity-75 mb-4 text-white">View your team's real-time status and manage their attendance.</p>
                            <button className="btn btn-light text-primary fw-bold w-100 shadow-sm" onClick={() => onNavigate && onNavigate('attendance')}>Go to Team Attendance</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MySpace;

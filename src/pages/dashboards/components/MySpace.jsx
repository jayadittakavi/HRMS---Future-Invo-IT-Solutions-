import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
    FaUserCircle, FaClock, FaCalendarDay, FaHistory,
    FaCheckCircle, FaExclamationCircle, FaUmbrellaBeach,
    FaSignInAlt, FaSignOutAlt, FaMugHot
} from 'react-icons/fa';
import { MdEventBusy, MdFactCheck } from 'react-icons/md';
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
    Filler
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
    LineElement,
    Filler
);

const MySpace = ({ role, onNavigate }) => {
    const { user } = useAuth();
    const userRole = role || user?.role || '';
    const navigate = useNavigate();

    // --- MOCK DATA FOR ATTENDANCE ---
    const attendanceStats = {
        monthlyPercentage: 92,
        yearlyPercentage: 88,
        present: 22,
        absent: 1,
        wfh: 2,
        late: 1,
        halfDay: 0,
    };

    const monthlyAttendanceData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Present Days',
                data: [5, 4, 5, 5],
                backgroundColor: '#3b82f6',
                borderRadius: 4,
            },
            {
                label: 'Effective Hours',
                data: [42, 35, 43, 40],
                type: 'line',
                borderColor: '#10b981',
                yAxisID: 'y1',
                tension: 0.4,
            }
        ],
    };

    const annualAttendanceOption = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { display: false },
            x: { display: false },
            y1: { display: false, position: 'right' }
        }
    };

    const doughnutData = {
        labels: ['Present', 'Absent', 'Leave', 'Holiday'],
        datasets: [
            {
                data: [85, 5, 5, 5],
                backgroundColor: ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'],
                borderWidth: 0,
                cutout: '75%',
            },
        ],
    };

    // --- MOCK DATA FOR LEAVE ---
    const leaveBalance = [
        { type: 'Casual', total: 12, used: 5, color: 'bg-gradient-blue' },
        { type: 'Sick', total: 7, used: 2, color: 'bg-gradient-green' },
        { type: 'Earned', total: 15, used: 0, color: 'bg-gradient-orange' },
    ];

    const leaveTrendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Leaves Taken',
                data: [1, 0, 2, 1, 0, 1],
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                fill: true,
                tension: 0.4,
            }
        ],
    };

    const recentActivity = [
        { title: 'Leave Approved', date: '2 hours ago', status: 'Success', icon: <FaCheckCircle className="text-success" /> },
        { title: 'Marked Late', date: 'Yesterday', status: 'Warning', icon: <FaExclamationCircle className="text-warning" /> },
        { title: 'Payslip Generated', date: '1 day ago', status: 'Info', icon: <FaHistory className="text-primary" /> },
    ];

    // --- NAVIGATION HELPERS ---
    const goToSelfAttendance = () => {
        if (onNavigate) onNavigate('my-attendance');
        else navigate('/my-attendance');
    };

    const goToSelfLeaves = () => {
        if (onNavigate) onNavigate('my-leaves');
        else navigate('/my-leaves');
    };

    const goToRequestLeave = () => {
        if (onNavigate) onNavigate('request-leave');
        else navigate('/request-leave');
    };

    const goToLeaveHistory = () => {
        if (onNavigate) onNavigate('leave-history');
        else navigate('/leave-history');
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-0">My Space</h5>
                    <p className="text-secondary small mb-0">Your personal dashboard for Attendance & Leaves.</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary" onClick={goToSelfAttendance}>
                        <MdFactCheck className="me-1" /> My Attendance
                    </button>
                    <button className="btn btn-sm btn-outline-primary" onClick={goToSelfLeaves}>
                        <MdEventBusy className="me-1" /> My Leaves
                    </button>
                    <button className="btn btn-sm btn-primary shadow-sm" onClick={goToRequestLeave}>
                        + Request Leave
                    </button>
                </div>
            </div>

            {/* --- ATTENDANCE SECTION --- */}
            <div className="row g-4 mb-4">
                {/* 1. Monthly Attendance % (Circular Progress) */}
                <div className="col-md-3">
                    <div className="dashboard-card bg-white h-100 p-3 text-center position-relative">
                        <h6 className="text-secondary fw-bold small text-uppercase mb-3">Attendance (Month)</h6>
                        <div style={{ width: '140px', margin: '0 auto', position: 'relative' }}>
                            <Doughnut data={doughnutData} options={{ cutout: '80%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }} />
                            <div className="position-absolute top-50 start-50 translate-middle text-center">
                                <h3 className="fw-bold text-dark mb-0">{attendanceStats.monthlyPercentage}%</h3>
                                <small className="text-muted" style={{ fontSize: '0.65rem' }}>Present</small>
                            </div>
                        </div>
                        <div className="mt-3 d-flex justify-content-center gap-3">
                            <div className="text-center">
                                <h6 className="fw-bold text-success mb-0">{attendanceStats.present}</h6>
                                <small className="text-secondary" style={{ fontSize: '0.7rem' }}>Present</small>
                            </div>
                            <div className="text-center">
                                <h6 className="fw-bold text-danger mb-0">{attendanceStats.absent}</h6>
                                <small className="text-secondary" style={{ fontSize: '0.7rem' }}>Absent</small>
                            </div>
                            <div className="text-center">
                                <h6 className="fw-bold text-warning mb-0">{attendanceStats.late}</h6>
                                <small className="text-secondary" style={{ fontSize: '0.7rem' }}>Late</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Today's Status Card */}
                <div className="col-md-3">
                    <div className="dashboard-card bg-gradient-purple h-100 p-4 text-white">
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h6 className="fw-bold opacity-75 mb-1">Today's Status</h6>
                                <h2 className="mb-0">Present</h2>
                                <p className="small opacity-75 mt-1">Shift: 09:00 AM - 06:00 PM</p>
                            </div>
                            <div className="bg-white bg-opacity-25 p-2 rounded-circle">
                                <FaClock size={24} />
                            </div>
                        </div>
                        <div className="mt-4 pt-2 border-top border-white border-opacity-25 d-flex justify-content-between">
                            <div>
                                <small className="opacity-75 d-block">Check In</small>
                                <span className="fw-bold"><FaSignInAlt className="me-1" /> 09:05 AM</span>
                            </div>
                            <div>
                                <small className="opacity-75 d-block">Last Out</small>
                                <span className="fw-bold">--:--</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Monthly Trends (Combined Bar/Line) */}
                <div className="col-md-6">
                    <div className="dashboard-card bg-white h-100 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-dark fw-bold mb-0">Monthly Attendance Trend</h6>
                            <select className="form-select form-select-sm w-auto border-0 bg-light">
                                <option>May 2026</option>
                                <option>Apr 2026</option>
                            </select>
                        </div>
                        <div style={{ height: '160px' }}>
                            <Bar
                                data={monthlyAttendanceData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: { beginAtZero: true, display: false },
                                        x: { grid: { display: false } }
                                    },
                                    plugins: { legend: { display: false } }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- LEAVE SECTION --- */}
            <div className="row g-4 mb-4">
                <div className="col-12">
                    <h6 className="fw-bold text-dark mb-3">Leave Overview</h6>
                </div>
                {/* Leave Balance Cards */}
                {leaveBalance.map((leave, idx) => (
                    <div key={idx} className="col-md-3">
                        <div className={`dashboard-card ${leave.color} text-white p-3 h-100`}>
                            <div className="d-flex justify-content-between mb-2">
                                <h6 className="fw-bold mb-0">{leave.type} Leave</h6>
                                <FaUmbrellaBeach className="opacity-50" />
                            </div>
                            <h3 className="mb-1">{leave.total - leave.used}</h3>
                            <div className="progress bg-black bg-opacity-10 mt-2" style={{ height: '4px' }}>
                                <div
                                    className="progress-bar bg-white"
                                    style={{ width: `${(leave.used / leave.total) * 100}%` }}
                                ></div>
                            </div>
                            <small className="opacity-75 mt-2 d-block">{leave.used} Used / {leave.total} Total</small>
                        </div>
                    </div>
                ))}

                {/* Leave Trend & Request */}
                <div className="col-md-3">
                    <div className="dashboard-card bg-white h-100 p-3 d-flex flex-column justify-content-center text-center border-dashed">
                        <h6 className="text-secondary fw-bold small text-uppercase mb-3">Leave Trend (6M)</h6>
                        <div style={{ height: '80px', width: '100%' }}>
                            <Line data={leaveTrendData} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: { x: { display: false }, y: { display: false } },
                                elements: { point: { radius: 0 } }
                            }} />
                        </div>
                        <div className="mt-3">
                            <button className="btn btn-outline-primary w-100 fw-bold" onClick={goToLeaveHistory}>View History</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RECENT ACTIVITY TABLE --- */}
            <div className="row g-4">
                <div className="col-md-8">
                    <div className="dashboard-card bg-white p-4">
                        <h6 className="fw-bold text-dark mb-3">Recent Activity Log</h6>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="border-0 small text-secondary">Activity</th>
                                        <th className="border-0 small text-secondary">Date</th>
                                        <th className="border-0 small text-secondary">Description</th>
                                        <th className="border-0 small text-secondary">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span className="fw-bold text-dark">Check In</span></td>
                                        <td className="text-secondary small">Today, 9:05 AM</td>
                                        <td className="text-secondary small">Marked via Biometric</td>
                                        <td><span className="badge bg-success bg-opacity-10 text-success">On Time</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="fw-bold text-dark">Leave Application</span></td>
                                        <td className="text-secondary small">Yesterday</td>
                                        <td className="text-secondary small">Sick Leave (1 Day)</td>
                                        <td><span className="badge bg-warning bg-opacity-10 text-warning">Pending</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="fw-bold text-dark">Late Mark</span></td>
                                        <td className="text-secondary small">May 12, 2026</td>
                                        <td className="text-secondary small">Late by 15 mins</td>
                                        <td><span className="badge bg-danger bg-opacity-10 text-danger">Late</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="dashboard-card bg-white p-4 h-100">
                        <h6 className="fw-bold text-dark mb-3">Upcoming Holidays</h6>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item border-0 px-0 d-flex gap-3 align-items-center">
                                <div className="bg-light p-2 rounded text-center" style={{ width: '50px' }}>
                                    <span className="d-block small text-danger fw-bold">AUG</span>
                                    <span className="h5 fw-bold mb-0">15</span>
                                </div>
                                <div>
                                    <h6 className="mb-0 fw-bold">Independence Day</h6>
                                    <small className="text-muted">National Holiday</small>
                                </div>
                            </li>
                            <li className="list-group-item border-0 px-0 d-flex gap-3 align-items-center">
                                <div className="bg-light p-2 rounded text-center" style={{ width: '50px' }}>
                                    <span className="d-block small text-danger fw-bold">OCT</span>
                                    <span className="h5 fw-bold mb-0">02</span>
                                </div>
                                <div>
                                    <h6 className="mb-0 fw-bold">Gandhi Jayanti</h6>
                                    <small className="text-muted">National Holiday</small>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySpace;

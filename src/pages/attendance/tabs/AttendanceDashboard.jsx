import React from 'react';
import { FaUserCheck, FaUserTimes, FaHome, FaClock, FaCalendarDay } from 'react-icons/fa';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const AttendanceDashboard = () => {
    // Mock Data for Dashboard Cards
    const summaryCards = [
        { title: 'Present', value: 45, icon: <FaUserCheck />, color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
        { title: 'Absent', value: 3, icon: <FaUserTimes />, color: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
        { title: 'Half Day', value: 2, icon: <FaClock />, color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
        { title: 'Late', value: 5, icon: <FaCalendarDay />, color: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' },
        { title: 'WFH', value: 8, icon: <FaHome />, color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
    ];

    // Mock Data for Charts
    const shiftData = {
        labels: ['General Shift', 'Morning Shift', 'Night Shift'],
        datasets: [{
            label: 'Employees Present',
            data: [25, 12, 8],
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
            borderRadius: 8,
        }]
    };

    const dailyTrendData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: 'Present',
                data: [42, 44, 45, 43, 45],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Absent',
                data: [2, 1, 3, 2, 3],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    return (
        <div className="container-fluid p-0">
            {/* Summary Cards */}
            <div className="row g-4 mb-4">
                {summaryCards.map((card, index) => (
                    <div key={index} className="col-md-2 col-sm-4 col-6" style={{ minWidth: '160px' }}>
                        <div className="card border-0 shadow-sm text-white h-100" style={{ background: card.color, borderRadius: '15px' }}>
                            <div className="card-body p-3 d-flex flex-column align-items-center justify-content-center text-center">
                                <div className="fs-2 mb-2 opacity-75">{card.icon}</div>
                                <h3 className="fw-bold mb-0">{card.value}</h3>
                                <small className="text-white-50 fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>{card.title}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '15px' }}>
                        <h6 className="fw-bold text-secondary mb-3">Shift-wise Distribution</h6>
                        <div style={{ height: '300px' }}>
                            <Bar data={shiftData} options={{ ...options, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '15px' }}>
                        <h6 className="fw-bold text-secondary mb-3">Attendance Trend (This Week)</h6>
                        <div style={{ height: '300px' }}>
                            <Line data={dailyTrendData} options={{ ...options, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Attendance Table Placeholder */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <div className="card-header bg-white border-0 py-3">
                    <h6 className="mb-0 fw-bold text-secondary">Today's Attendance Overview</h6>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 border-0 text-secondary small text-uppercase">Employee</th>
                                <th className="border-0 text-secondary small text-uppercase">Status</th>
                                <th className="border-0 text-secondary small text-uppercase">Shift</th>
                                <th className="border-0 text-secondary small text-uppercase">Punch In</th>
                                <th className="border-0 text-secondary small text-uppercase">Punch Out</th>
                                <th className="pe-4 border-0 text-secondary small text-uppercase text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="ps-4 fw-medium text-dark">John Doe</td>
                                <td><span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">Present</span></td>
                                <td className="text-secondary small">General Shift</td>
                                <td className="text-secondary fw-bold small">09:00 AM</td>
                                <td className="text-secondary fw-bold small">06:00 PM</td>
                                <td className="pe-4 text-end"><button className="btn btn-sm btn-light text-primary fw-bold">View</button></td>
                            </tr>
                            <tr>
                                <td className="ps-4 fw-medium text-dark">Jane Smith</td>
                                <td><span className="badge bg-danger bg-opacity-10 text-danger px-3 py-2 rounded-pill">Absent</span></td>
                                <td className="text-secondary small">Morning Shift</td>
                                <td className="text-secondary fw-bold small">-</td>
                                <td className="text-secondary fw-bold small">-</td>
                                <td className="pe-4 text-end"><button className="btn btn-sm btn-light text-primary fw-bold">View</button></td>
                            </tr>
                            <tr>
                                <td className="ps-4 fw-medium text-dark">Mike Ross</td>
                                <td><span className="badge bg-warning bg-opacity-10 text-dark px-3 py-2 rounded-pill">Late</span></td>
                                <td className="text-secondary small">General Shift</td>
                                <td className="text-secondary fw-bold small">10:15 AM</td>
                                <td className="text-secondary fw-bold small">-</td>
                                <td className="pe-4 text-end"><button className="btn btn-sm btn-light text-primary fw-bold">View</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-footer bg-white border-0 py-3 text-center">
                    <button className="btn btn-link text-primary text-decoration-none small fw-bold">View All Records</button>
                </div>
            </div>
        </div>
    );
};

export default AttendanceDashboard;

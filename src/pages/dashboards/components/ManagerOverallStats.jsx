import React from 'react';
import { FaUsers, FaCalendarCheck, FaClipboardList, FaPlusCircle, FaChartLine } from 'react-icons/fa';
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
import { Bar, Doughnut, Line } from 'react-chartjs-2';

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

const ManagerOverallStats = ({ onNavigate }) => {

    const teamAttendance = {
        labels: ['Present', 'Absent', 'On Leave', 'WFH'],
        datasets: [
            {
                label: '# of Members',
                data: [8, 1, 2, 1],
                backgroundColor: [
                    '#10b981',
                    '#ef4444',
                    '#f59e0b',
                    '#3b82f6',
                ],
                borderWidth: 0,
            },
        ],
    };

    const teamAttendanceOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        let value = context.raw;
                        let total = context.chart._metasets[context.datasetIndex].total;
                        let percentage = Math.round(value / total * 100) + '%';
                        return label + value + ' (' + percentage + ')';
                    }
                }
            }
        },
        cutout: '60%'
    };

    const attendanceTrendData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: 'Present',
                data: [10, 11, 10, 9, 8],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Absent',
                data: [1, 0, 1, 2, 3],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                tension: 0.4,
                fill: true,
            }
        ],
    };

    const attendanceTrendOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { display: false }
            },
            y: {
                beginAtZero: true,
                grid: { color: '#f3f4f6' }
            },
        },
        plugins: {
            legend: { position: 'top', align: 'end' }
        },
        elements: {
            point: { radius: 3 }
        }
    };


    const pendingLeaves = [
        { name: 'John Doe', type: 'Sick Leave', duration: '2 Days', date: 'Feb 20-21' },
        { name: 'Jane Smith', type: 'Casual Leave', duration: '1 Day', date: 'Feb 22' },
        { name: 'Mike Ross', type: 'Privilege Leave', duration: '1 Week', date: 'Mar 1-7' }
    ];

    const upcomingHolidays = [
        { name: 'Republic Day', date: '26 Jan', day: 'Friday' },
        { name: 'Holi', date: '25 Mar', day: 'Monday' },
        { name: 'Good Friday', date: '29 Mar', day: 'Friday' }
    ];

    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-primary d-flex align-items-center gap-2 shadow-sm rounded-pill px-4"
                    onClick={() => onNavigate('task')}
                >
                    <FaPlusCircle /> Create New Task
                </button>
            </div>

            {/* Top Stats Row with Gradients */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Total Team', value: '12', icon: <FaUsers />, color: 'bg-gradient-purple', sub: 'Full Strength' },
                    { label: 'Present Today', value: '9', icon: <FaCalendarCheck />, color: 'bg-gradient-green', sub: '75% Attendance' },
                    { label: 'Pending Tasks', value: '5', icon: <FaClipboardList />, color: 'bg-gradient-orange', sub: 'Needs Review' },
                    { label: 'Avg. Efficiency', value: '85%', icon: <FaChartLine />, color: 'bg-gradient-blue', sub: 'Top Performance' },
                    { label: 'Clocked Hours', value: '42h', icon: <FaPlusCircle />, color: 'bg-gradient-cyan', sub: 'This Week' },
                    { label: 'Active Goals', value: '3', icon: <FaChartLine />, color: 'bg-gradient-pink', sub: 'On Track' },
                ].map((stat, index) => (
                    <div className="col-md-2 col-6" key={index}>
                        <div
                            className={`dashboard-card ${stat.color} hover-lift text-white p-3 h-100 shadow-sm border-0`}
                            style={{
                                borderRadius: '24px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <div className="d-flex align-items-center mb-3">
                                <div className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: '52px',
                                        height: '52px',
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        backdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                                    }}>
                                    <span style={{ fontSize: '1.4rem', color: '#ffffff' }}>{stat.icon}</span>
                                </div>
                            </div>
                            <h6 className="dashboard-card-title text-white mb-1 opacity-90 fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>{stat.label}</h6>
                            <h3 className="dashboard-value text-white mb-0 fw-bold" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em' }}>{stat.value}</h3>
                            <p className="small mb-0 opacity-75 mt-1" style={{ fontSize: '0.6rem' }}>{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4 mb-4">
                {/* Team Attendance Trends (Line Chart) */}
                <div className="col-md-8">
                    <div className="dashboard-card bg-white h-100 p-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="dashboard-card-title mb-0 fw-bold">Team Attendance Trends (This Week)</h6>
                            <select className="form-select form-select-sm w-auto border-0 bg-light">
                                <option>This Week</option>
                                <option>Last Week</option>
                            </select>
                        </div>
                        <div style={{ height: '300px' }}>
                            <Line data={attendanceTrendData} options={attendanceTrendOptions} />
                        </div>
                    </div>
                </div>

                {/* Team Attendance Breakdown (Donut) */}
                <div className="col-md-4">
                    <div className="dashboard-card bg-white h-100 p-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
                        <h6 className="dashboard-card-title mb-3 fw-bold">Today's Status</h6>
                        <div className="py-3 d-flex justify-content-center" style={{ height: '250px' }}>
                            <Doughnut data={teamAttendance} options={teamAttendanceOptions} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-4">
                {/* Pending Leave Requests */}
                <div className="col-md-6">
                    <div className="dashboard-card h-100 bg-white p-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="dashboard-card-title mb-0 fw-bold">Pending Leave Requests</h6>
                            <span className="badge bg-danger rounded-pill">3</span>
                        </div>
                        <div className="list-group list-group-flush">
                            {pendingLeaves.map((leave, idx) => (
                                <div key={idx} className="list-group-item bg-transparent px-0 border-bottom">
                                    <div className="d-flex justify-content-between mb-1">
                                        <h6 className="fw-bold fs-6 mb-0">{leave.name}</h6>
                                        <small className="text-muted">{leave.date}</small>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-secondary">{leave.type} ({leave.duration})</small>
                                        <div className="btn-group btn-group-sm">
                                            <button className="btn btn-outline-success py-0" title="Approve" onClick={() => onNavigate('leave-management')}>✓</button>
                                            <button className="btn btn-outline-danger py-0" title="Reject" onClick={() => onNavigate('leave-management')}>✕</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-link w-100 text-center text-primary small mt-2" onClick={() => onNavigate('leave-management')}>View All Requests</button>
                    </div>
                </div>

                {/* Upcoming Holidays */}
                <div className="col-md-6">
                    <div className="dashboard-card h-100 bg-white p-4 shadow-sm border-0" style={{ borderRadius: '16px' }}>
                        <h6 className="dashboard-card-title mb-3 fw-bold">Upcoming Holidays</h6>
                        <div className="list-group list-group-flush">
                            {upcomingHolidays.map((holiday, idx) => (
                                <div key={idx} className="list-group-item bg-transparent px-0 border-bottom d-flex align-items-center">
                                    <div className="bg-light text-primary rounded d-flex flex-column align-items-center justify-content-center p-2 me-3" style={{ width: '50px', height: '50px' }}>
                                        <small className="fw-bold lh-1" style={{ fontSize: '0.6rem' }}>{holiday.date.split(' ')[1].toUpperCase()}</small>
                                        <span className="fw-bold fs-5 lh-1">{holiday.date.split(' ')[0]}</span>
                                    </div>
                                    <div>
                                        <h6 className="fw-bold mb-0">{holiday.name}</h6>
                                        <small className="text-muted">{holiday.day}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-link w-100 text-center text-primary small mt-2" onClick={() => onNavigate('attendance')}>View Full Calendar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerOverallStats;

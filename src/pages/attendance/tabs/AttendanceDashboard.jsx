import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCheck, FaUserTimes, FaHome, FaClock, FaCalendarDay, FaEye } from 'react-icons/fa';
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

const AttendanceDashboard = ({ onTabChange }) => {
    const navigate = useNavigate();

    // Mock Data for Dashboard Cards
    const summaryCards = [
        { title: 'Present', value: 45, icon: <FaUserCheck />, color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', tab: 'bulk' },
        { title: 'Absent', value: 3, icon: <FaUserTimes />, color: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', tab: 'bulk' },
        { title: 'Half Day', value: 2, icon: <FaClock />, color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', tab: 'bulk' },
        { title: 'Late', value: 5, icon: <FaCalendarDay />, color: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', tab: 'bulk' },
        { title: 'WFH', value: 8, icon: <FaHome />, color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', tab: 'bulk' },
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
        },
        onClick: (e, elements) => {
            if (elements.length > 0) {
                if (onTabChange) onTabChange('bulk');
                else navigate('/attendance');
            }
        }
    };

    const handleViewDetails = (name) => {
        alert(`Redirecting to attendance logs for ${name}...`);
        // navigate('/attendance/logs'); // Real navigation would go here
    };

    return (
        <div className="container-fluid p-0 animate__animated animate__fadeIn">
            {/* Summary Cards */}
            <div className="row g-4 mb-4">
                {summaryCards.map((card, index) => (
                    <div key={index} className="col-md-2 col-sm-4 col-6" style={{ minWidth: '160px' }}>
                        <div
                            className="card border-0 shadow-sm text-white h-100 dash-card-hover"
                            style={{
                                background: card.color,
                                borderRadius: '15px',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease'
                            }}
                            onClick={() => onTabChange ? onTabChange(card.tab) : null}
                        >
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
                        <div style={{ height: '300px', cursor: 'pointer' }}>
                            <Bar data={shiftData} options={{ ...options, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '15px' }}>
                        <h6 className="fw-bold text-secondary mb-3">Attendance Trend (This Week)</h6>
                        <div style={{ height: '300px', cursor: 'pointer' }}>
                            <Line data={dailyTrendData} options={{ ...options, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Attendance Table */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-bold text-secondary">Today's Attendance Overview</h6>
                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => onTabChange ? onTabChange('mark') : null}>
                        Mark New
                    </button>
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
                            {[
                                { name: 'John Doe', status: 'Present', badge: 'success', shift: 'General Shift', in: '09:00 AM', out: '06:00 PM' },
                                { name: 'Jane Smith', status: 'Absent', badge: 'danger', shift: 'Morning Shift', in: '-', out: '-' },
                                { name: 'Mike Ross', status: 'Late', badge: 'warning', shift: 'General Shift', in: '10:15 AM', out: '-' },
                            ].map((row, i) => (
                                <tr key={i} onClick={() => handleViewDetails(row.name)} style={{ cursor: 'pointer' }}>
                                    <td className="ps-4">
                                        <div className="fw-bold text-dark">{row.name}</div>
                                        <div className="text-muted small">EMP-00{i + 1}</div>
                                    </td>
                                    <td><span className={`badge bg-${row.badge} bg-opacity-10 text-${row.badge === 'warning' ? 'dark' : row.badge} px-3 py-2 rounded-pill`}>{row.status}</span></td>
                                    <td className="text-secondary small">{row.shift}</td>
                                    <td className="text-secondary fw-bold small text-primary">{row.in}</td>
                                    <td className="text-secondary fw-bold small text-primary">{row.out}</td>
                                    <td className="pe-4 text-end">
                                        <button className="btn btn-sm btn-light text-primary fw-bold d-flex align-items-center gap-1 ms-auto" onClick={(e) => { e.stopPropagation(); handleViewDetails(row.name); }}>
                                            <FaEye /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer bg-white border-0 py-3 text-center border-top">
                    <button className="btn btn-link text-primary text-decoration-none small fw-bold" onClick={() => onTabChange ? onTabChange('bulk') : null}>
                        View All Records
                    </button>
                </div>
            </div>

            <style>{`
                .dash-card-hover:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                }
            `}</style>
        </div>
    );
};

export default AttendanceDashboard;

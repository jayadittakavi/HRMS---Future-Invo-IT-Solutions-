import React from 'react';
import { SimpleBarChart, SimpleDonutChart, SimpleLineChart } from '../../../components/charts/CustomCharts';
import { FaUsers, FaBuilding, FaClipboardList, FaMoneyBillWave, FaUserTie, FaUserCog, FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OverallStats = () => {
    const navigate = useNavigate();

    // Mock Data for Overall Stats
    const stats = [
        { label: 'Total Companies', value: 12, icon: <FaBuilding />, color: 'bg-gradient-purple', path: '/companies' },
        { label: 'Total Branches', value: 45, icon: <FaBuilding />, color: 'bg-gradient-blue', path: '/branches' },
        { label: 'Total Admins', value: 8, icon: <FaUserShield />, color: 'bg-gradient-green', path: '/users' },
        { label: 'Total HRs', value: 24, icon: <FaUserTie />, color: 'bg-gradient-orange', path: '/users' },
        { label: 'Total Managers', value: 56, icon: <FaUserCog />, color: 'bg-gradient-cyan', path: '/users' },
        { label: 'Total Employees', value: 1308, icon: <FaUsers />, color: 'bg-gradient-pink', path: '/employees' },
    ];

    const attendanceSummary = [
        { label: 'Present', value: 850, color: '#10b981' },
        { label: 'Absent', value: 45, color: '#ef4444' },
        { label: 'WFH', value: 120, color: '#3b82f6' },
        { label: 'Leave', value: 30, color: '#f59e0b' },
        { label: 'WeekOff', value: 263, color: '#6b7280' },
    ];

    const departmentData = [
        { label: 'IT', value: 450, color: '#3b82f6' },
        { label: 'HR', value: 50, color: '#ec4899' },
        { label: 'Finance', value: 80, color: '#10b981' },
        { label: 'Sales', value: 200, color: '#f59e0b' },
        { label: 'Support', value: 150, color: '#ef4444' },
    ];

    const revenueTrend = [120, 135, 125, 145, 160, 155, 170, 180, 190, 200, 210, 220];

    const handleAction = (type, data) => {
        console.log(`${type} Action:`, data);
        alert(`${type} successful!`);
    };

    return (
        <div>
            {/* Top Counters Row */}
            <div className="row g-4 mb-4">
                {stats.map((stat, index) => (
                    <div className="col-md-2 col-6" key={index}>
                        <div
                            className={`dashboard-card ${stat.color} hover-lift text-white p-3 h-100 shadow-sm`}
                            onClick={() => navigate(stat.path)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="d-flex align-items-center mb-2">
                                <div className="rounded-circle bg-white bg-opacity-25 p-2 me-2 fs-5 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                    {stat.icon}
                                </div>
                            </div>
                            <h6 className="dashboard-card-title text-white mb-1" style={{ fontSize: '0.7rem' }}>{stat.label}</h6>
                            <h3 className="dashboard-value text-white mb-0 fs-4">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Attendance & Pending Requests Row */}
            <div className="row g-4 mb-4">
                {/* Attendance Summary Donut */}
                <div className="col-md-4">
                    <div className="dashboard-card h-100 shadow-sm">
                        <h6 className="dashboard-card-title">Today's Attendance</h6>
                        <div className="py-3 d-flex justify-content-center">
                            <SimpleDonutChart segments={attendanceSummary} size="200px" centerText="Total" />
                        </div>
                        <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                            {attendanceSummary.map((item, idx) => (
                                <span key={idx} className="badge rounded-pill text-dark border bg-light small d-flex align-items-center">
                                    <span className="rounded-circle me-1" style={{ width: '8px', height: '8px', backgroundColor: item.color }}></span>
                                    {item.label}: {item.value}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pending Requests List */}
                <div className="col-md-4">
                    <div className="dashboard-card h-100 shadow-sm">
                        <h6 className="dashboard-card-title mb-3 d-flex justify-content-between align-items-center">
                            Pending Requests <span className="badge bg-danger rounded-pill">12</span>
                        </h6>
                        <div className="list-group list-group-flush small">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="list-group-item bg-transparent px-0 border-bottom d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>JD</div>
                                        <div>
                                            <div className="fw-bold text-dark">Employee {i}</div>
                                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Leave Request - {i} Day(s)</div>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-1">
                                        <button className="btn btn-sm btn-success py-0 px-2" style={{ fontSize: '0.7rem' }} onClick={() => handleAction('Approve', i)}>✓</button>
                                        <button className="btn btn-sm btn-danger py-0 px-2" style={{ fontSize: '0.7rem' }} onClick={() => handleAction('Reject', i)}>✕</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-link w-100 text-center text-primary fw-bold small mt-2" onClick={() => navigate('/leave-management')}>View All Requests</button>
                    </div>
                </div>

                {/* Company Growth / Trend */}
                <div className="col-md-4">
                    <div className="dashboard-card h-100 shadow-sm">
                        <h6 className="dashboard-card-title">Revenue / Growth Trend</h6>
                        <SimpleLineChart data={revenueTrend} height="200px" color="#3b82f6" />
                    </div>
                </div>
            </div>

            {/* Department Distribution Bar Chart */}
            <div className="row g-4 mb-4">
                <div className="col-md-8">
                    <div className="dashboard-card shadow-sm">
                        <h6 className="dashboard-card-title">Employees by Department</h6>
                        <SimpleBarChart data={departmentData} height="300px" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="dashboard-card bg-gradient-orange h-100 text-white shadow-sm border-0">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0 fw-bold">System Alerts</h6>
                            <FaClipboardList className="fs-4 opacity-50" />
                        </div>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-3 border-bottom border-white border-opacity-25 pb-2">
                                <span className="badge bg-danger mb-1">Critical</span>
                                <p className="mb-0 small">Server storage usage at 85%. Consider upgrading plan.</p>
                            </li>
                            <li className="mb-3 border-bottom border-white border-opacity-25 pb-2">
                                <span className="badge bg-warning text-dark mb-1">Warning</span>
                                <p className="mb-0 small">5 Employees missing attendance check-out yesterday.</p>
                            </li>
                            <li>
                                <span className="badge bg-info text-dark mb-1">Info</span>
                                <p className="mb-0 small">System maintenance scheduled for Sunday 2 AM.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverallStats;

import React, { useState, useEffect } from 'react';
import { FaUsers, FaCalendarCheck, FaClipboardList, FaPlusCircle, FaChartLine } from 'react-icons/fa';
import { dashboardService } from '../../../services/dashboardService';
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
import { MultiAreaChart, PremiumDonutChart } from '../../../components/charts/CustomCharts';

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
    const [loading, setLoading] = useState(true);
    const [statsData, setStatsData] = useState(null);

    const fetchData = async () => {
        try {
            const data = await dashboardService.getManagerStats();
            setStatsData(data);
        } catch (error) {
            console.error("Dashboard Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const summaryCards = [
        { label: 'TOTAL TEAM', value: statsData?.totalMembers || '12', icon: <FaUsers />, color: '#8b5cf6', sub: 'Full Strength' },
        { label: 'PRESENT TODAY', value: statsData?.presentToday || '9', icon: <FaCalendarCheck />, color: '#10b981', sub: '75% Attendance' },
        { label: 'PENDING TASKS', value: statsData?.pendingTasks || '5', icon: <FaClipboardList />, color: '#f59e0b', sub: 'Needs Review' },
        { label: 'AVG. EFFICIENCY', value: statsData?.avgEfficiency || '85%', icon: <FaChartLine />, color: '#3b82f6', sub: 'Top Performance' },
        { label: 'CLOCKED HOURS', value: statsData?.clockedHours || '42h', icon: <FaPlusCircle />, color: '#06b6d4', sub: 'This Week' },
        { label: 'ACTIVE GOALS', value: statsData?.activeGoals || '3', icon: <FaChartLine />, color: '#ec4899', sub: 'On Track' },
    ];

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

            {/* Top Stats Row */}
            <div className="row g-4 mb-5">
                {summaryCards.map((stat, index) => (
                    <div className="col-md-2 col-6" key={index}>
                        <div
                            className={`card hrms-card h-100 ${
                                stat.label === 'TOTAL TEAM' ? 'hrms-card-blue' :
                                stat.label === 'PRESENT TODAY' ? 'hrms-card-green' :
                                stat.label === 'PENDING TASKS' ? 'hrms-card-orange' :
                                stat.label === 'AVG. EFFICIENCY' ? 'hrms-card-indigo' :
                                stat.label === 'CLOCKED HOURS' ? 'hrms-card-blue' : 'hrms-card-purple'
                            }`}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body p-3 d-flex flex-column">
                                <div className="icon-box-solid mb-3" style={{ backgroundColor: `${stat.color}15`, color: stat.color, width: '40px', height: '40px', minHeight: '40px' }}>
                                    {React.cloneElement(stat.icon, { size: 18 })}
                                </div>
                                <div>
                                    <div className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '0.6rem', letterSpacing: '0.08em' }}>{stat.label}</div>
                                    <h3 className="fw-bold text-dark mb-1" style={{ fontSize: '1.4rem' }}>{stat.value}</h3>
                                    <div className="d-flex align-items-center gap-1">
                                        <span className="fw-bold" style={{ fontSize: '0.6rem', color: stat.color }}>●</span>
                                        <p className="text-muted small mb-0" style={{ fontSize: '0.65rem', fontWeight: 600 }}>{stat.sub}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4 mb-4">
                {/* Team Attendance Trends (Line Chart) */}
                <div className="col-md-8">
                    <div className="card hrms-card hrms-card-indigo h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h6 className="fw-bold text-dark mb-0">Team Attendance Trends (This Week)</h6>
                                <select className="form-select form-select-sm w-auto border-0 bg-light">
                                    <option>This Week</option>
                                    <option>Last Week</option>
                                </select>
                            </div>
                            <div style={{ height: '300px' }}>
                                <MultiAreaChart 
                                    datasets={[
                                        { label: 'Present', data: [10, 11, 10, 9, 8, 10, 11], color: '#6366f1' },
                                        { label: 'Absent', data: [1, 0, 1, 2, 3, 1, 0], color: '#10b981' }
                                    ]}
                                    labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                                    height="280px"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Attendance Breakdown (Donut) */}
                <div className="col-md-4">
                    <div className="card hrms-card hrms-card-green h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-dark mb-4">Today's Status</h6>
                            <div className="py-3">
                                <PremiumDonutChart 
                                    summaries={[
                                        { label: 'Active', value: '74' },
                                        { label: 'Pending', value: '05' },
                                        { label: 'Away', value: '10' }
                                    ]}
                                    segments={[
                                        { value: 65, color: '#10b981', label: 'Active' },
                                        { value: 15, color: '#f59e0b', label: 'Pending' },
                                        { value: 10, color: '#3b82f6', label: 'Away' },
                                        { value: 10, color: '#ef4444', label: 'Absent' }
                                    ]}
                                    size="200px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-4">
                {/* Pending Leave Requests */}
                <div className="col-md-6">
                    <div className="card hrms-card hrms-card-orange h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h6 className="fw-bold text-dark mb-0">Pending Leave Requests</h6>
                                <span className="badge bg-danger rounded-pill">3</span>
                            </div>
                            <div className="list-group list-group-flush">
                                {pendingLeaves.map((leave, idx) => (
                                    <div key={idx} className="list-group-item bg-transparent px-0 border-bottom">
                                        <div className="d-flex justify-content-between mb-1">
                                            <h6 className="fw-bold fs-6 mb-0 text-dark">{leave.name}</h6>
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
                            <button className="btn btn-link w-100 text-center text-primary small mt-3" onClick={() => onNavigate('leave-management')}>View All Requests</button>
                        </div>
                    </div>
                </div>

                {/* Upcoming Holidays */}
                <div className="col-md-6">
                    <div className="card hrms-card hrms-card-blue h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-dark mb-4">Upcoming Holidays</h6>
                            <div className="list-group list-group-flush">
                                {upcomingHolidays.map((holiday, idx) => (
                                    <div key={idx} className="list-group-item bg-transparent px-0 border-bottom d-flex align-items-center">
                                        <div className="bg-light text-primary rounded d-flex flex-column align-items-center justify-content-center p-2 me-3" style={{ width: '50px', height: '50px' }}>
                                            <small className="fw-bold lh-1" style={{ fontSize: '0.6rem' }}>{holiday.date.split(' ')[1].toUpperCase()}</small>
                                            <span className="fw-bold fs-5 lh-1">{holiday.date.split(' ')[0]}</span>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-0 text-dark">{holiday.name}</h6>
                                            <small className="text-muted">{holiday.day}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-link w-100 text-center text-primary small mt-3" onClick={() => onNavigate('attendance')}>View Full Calendar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerOverallStats;

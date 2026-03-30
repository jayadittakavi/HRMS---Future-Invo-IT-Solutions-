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
    ArcElement, Tooltip, Legend,
    CategoryScale, LinearScale, BarElement,
    Title, PointElement, LineElement, Filler
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { spaceService } from '../../../services/spaceService';

ChartJS.register(
    ArcElement, Tooltip, Legend,
    CategoryScale, LinearScale, BarElement,
    Title, PointElement, LineElement, Filler
);

const MySpace = ({ role, onNavigate }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await spaceService.getSummary();
                setData(res);
            } catch (err) {
                console.error("Failed to load space summary", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;

    const stats = data?.attendanceStats || { monthlyPercentage: 0, present: 0, absent: 0, late: 0, holiday: 0 };
    const leaveBalances = data?.leaveBalances || [
        { type: 'Casual', rem: 0, total: 12, color: 'primary' },
        { type: 'Sick', rem: 0, total: 7, color: 'success' },
        { type: 'Earned', rem: 0, total: 15, color: 'warning' },
    ];

    const attendanceTrendData = {
        labels: data?.trends?.attendance?.labels || ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Present Days',
            data: data?.trends?.attendance?.data || [0, 0, 0, 0],
            backgroundColor: '#3b82f6',
            borderRadius: 6,
            barThickness: 30
        }],
    };

    const attendancePieData = {
        labels: ['Present', 'Absent', 'Late', 'Holiday'],
        datasets: [{
            data: [stats.present, stats.absent, stats.late, stats.holiday],
            backgroundColor: ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'],
            borderWidth: 0,
            cutout: '80%',
        }],
    };

    const leaveTrendData = {
        labels: data?.trends?.leaves?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Leave Usage',
            data: data?.trends?.leaves?.data || [0, 0, 0, 0, 0, 0],
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#8b5cf6',
            pointBorderWidth: 2
        }],
    };

    const go = (path) => onNavigate ? onNavigate(path) : navigate(`/${path}`);

    return (
        <div className="container-fluid p-0">
            {/* Header with Quick Actions */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-0">My Space</h5>
                    <p className="text-secondary small mb-0">Overview of your attendance, leaves and activities.</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary px-3" onClick={() => go('my-attendance')}>
                        <MdFactCheck className="me-1" /> Attendance
                    </button>
                    <button className="btn btn-sm btn-outline-primary px-3" onClick={() => go('my-leaves')}>
                        <MdEventBusy className="me-1" /> Leave History
                    </button>
                    <button className="btn btn-sm btn-primary px-3 shadow-sm" onClick={() => go('request-leave')}>
                        + Apply Leave
                    </button>
                </div>
            </div>

            {/* Top Cards: Status & Stats */}
            <div className="row g-4 mb-4">
                {/* Today's Check-in Card */}
                <div className="col-md-4">
                    <div className="dashboard-card bg-gradient-purple text-white p-4 h-100"
                        onClick={() => go('my-attendance')}
                        style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
                        <div className="d-flex justify-content-between align-items-start mb-4">
                            <div>
                                <h6 className="fw-bold opacity-75 mb-1">Today's Status</h6>
                                <h2 className="mb-0">Logged In</h2>
                                <p className="small opacity-75 mt-1">Shift Time: 09:00 AM - 06:00 PM</p>
                            </div>
                            <div className="bg-white bg-opacity-25 p-3 rounded-circle">
                                <FaClock size={24} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between pt-3 border-top border-white border-opacity-25">
                            <div>
                                <small className="opacity-75 d-block">PUNCH IN</small>
                                <span className="fw-bold">09:12 AM</span>
                            </div>
                            <div>
                                <small className="opacity-75 d-block">WORK TIME</small>
                                <span className="fw-bold">5h 24m</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leave Balances Summary */}
                <div className="col-md-8">
                    <div className="dashboard-card bg-white p-4 h-100"
                        onClick={() => go('my-leaves')}
                        style={{ cursor: 'pointer' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold text-dark mb-0">Available Leave Balances</h6>
                            <button className="btn btn-sm btn-link text-primary text-decoration-none small fw-bold p-0">View Balance Details</button>
                        </div>
                        <div className="row g-3">
                            {leaveBalances.map((l, i) => (
                                <div key={i} className="col-md-4">
                                     <div className="p-3 bg-light rounded-3 border">
                                         <div className="text-secondary small fw-bold text-uppercase mb-1">{l.type}</div>
                                         <div className="d-flex align-items-end gap-2 mb-2">
                                             <h3 className="mb-0 fw-bold text-dark">{l.rem}</h3>
                                             <span className="text-muted small mb-1">/ {l.total} days</span>
                                         </div>
                                         <div className="progress" style={{ height: '5px' }}>
                                             <div className={`progress-bar bg-${l.color || 'primary'}`} style={{ width: `${(l.rem / l.total) * 100}%` }}></div>
                                         </div>
                                     </div>
                                 </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Simplified Charts: Bar, Pie, Line */}
            <div className="row g-4 mb-4">
                {/* Pie Chart: Attendance Monthly Distribution */}
                <div className="col-md-3">
                    <div className="dashboard-card bg-white h-100 p-4 text-center"
                        onClick={() => go('my-attendance')}
                        style={{ cursor: 'pointer' }}>
                        <h6 className="text-secondary fw-bold small text-uppercase mb-4">Status Breakdown</h6>
                        <div style={{ width: '150px', margin: '0 auto', position: 'relative' }}>
                            <Doughnut data={attendancePieData} options={{ cutout: '80%', plugins: { legend: { display: false } } }} />
                            <div className="position-absolute top-50 start-50 translate-middle">
                                <h4 className="fw-bold mb-0">{stats.monthlyPercentage}%</h4>
                                <small className="text-muted">Presence</small>
                            </div>
                        </div>
                        <div className="mt-4 d-flex justify-content-center flex-wrap gap-2">
                            <div className="px-2 border-end"><span className="dot bg-success"></span> <small className="silver-text fw-bold">Present ({stats.present})</small></div>
                            <div className="px-2"><span className="dot bg-danger"></span> <small className="silver-text fw-bold">Absent ({stats.absent})</small></div>
                        </div>
                    </div>
                </div>

                {/* Bar Chart: Attendance Trend */}
                <div className="col-md-5">
                    <div className="dashboard-card bg-white h-100 p-4"
                        onClick={() => go('my-attendance')}
                        style={{ cursor: 'pointer' }}>
                        <h6 className="text-dark fw-bold mb-4">Weekly Presence Trend</h6>
                        <div style={{ height: '200px' }}>
                            <Bar data={attendanceTrendData} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: { y: { display: false }, x: { grid: { display: false } } },
                                plugins: { legend: { display: false } }
                            }} />
                        </div>
                    </div>
                </div>

                {/* Line Chart: Leave Usage Trend */}
                <div className="col-md-4">
                    <div className="dashboard-card bg-white h-100 p-4"
                        onClick={() => go('my-leaves')}
                        style={{ cursor: 'pointer' }}>
                        <h6 className="text-dark fw-bold mb-4">Annual Leave Usage</h6>
                        <div style={{ height: '200px' }}>
                            <Line data={leaveTrendData} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: { x: { grid: { display: false } }, y: { beginAtZero: true, ticks: { stepSize: 1 } } }
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Clean Tables for Activity & Holidays */}
            <div className="row g-4">
                <div className="col-md-8">
                    <div className="dashboard-card bg-white p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="fw-bold text-dark mb-0">Personal Activity Log</h6>
                            <button className="btn btn-sm btn-link text-primary text-decoration-none small fw-bold p-0" onClick={() => go('my-attendance')}>View History</button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead>
                                    <tr className="bg-light">
                                        <th className="border-0 small text-secondary py-3 px-3">DATE</th>
                                        <th className="border-0 small text-secondary py-3 px-3">RECORD</th>
                                        <th className="border-0 small text-secondary py-3 px-3">TIME</th>
                                        <th className="border-0 small text-secondary py-3 px-3">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(data?.recentActivity || []).map((r, i) => (
                                        <tr key={i} onClick={() => go(r.link)} style={{ cursor: 'pointer' }}>
                                            <td className="text-secondary py-3 px-3">{r.date}</td>
                                            <td className="fw-bold text-dark silver-text py-3 px-3">{r.record}</td>
                                            <td className="text-secondary py-3 px-3">{r.time}</td>
                                            <td className="py-3 px-3">
                                                <span className={`badge bg-${r.badge} bg-opacity-10 text-${r.badge} border border-${r.badge}`} style={{ fontSize: '0.65rem', padding: '5px 12px' }}>
                                                    {r.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Holidays List */}
                <div className="col-md-4">
                    <div className="dashboard-card bg-white p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="fw-bold text-dark mb-0">Upcoming Holidays</h6>
                            <button className="btn btn-sm btn-link text-primary text-decoration-none small fw-bold p-0" onClick={() => navigate('/calendar')}>Calendar View</button>
                        </div>
                        <div className="d-flex flex-column gap-3">
                            {(data?.upcomingHolidays || []).map((h, i) => (
                                <div key={i}
                                    className="d-flex align-items-center gap-3 p-3 rounded-3 border-start border-4 border-danger bg-light border-top border-bottom border-end"
                                    onClick={() => navigate('/calendar')}
                                    style={{ cursor: 'pointer' }}>
                                    <div className="text-center" style={{ minWidth: '60px' }}>
                                        <div className="fw-bold text-danger h5 mb-0">{h.date.split(' ')[1]}</div>
                                        <div className="small text-muted fw-bold">{h.date.split(' ')[0]}</div>
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold text-dark">{h.name}</h6>
                                        <small className="text-muted">{h.sub}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySpace;

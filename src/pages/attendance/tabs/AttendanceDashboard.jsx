import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCheck, FaUserTimes, FaHome, FaClock, FaCalendarDay, FaClipboardList } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
} from 'chart.js';
import { attendanceService } from '../service/service';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

const AttendanceDashboard = ({ onTabChange }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [stats, setStats] = React.useState(null);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await attendanceService.getDashboardStats();
                console.log('ATTENDANCE DASHBOARD RAW DATA:', response);
                // Handle cases where data is nested in a 'data' property
                const data = response?.data || response;
                setStats(data);
            } catch (err) {
                console.error('Failed to fetch dashboard stats:', err);
                setStats(null);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Helper to map stats to summary cards
    const summaryCards = [
        { title: 'Present', value: stats?.summary?.PRESENT || 0, icon: <FaUserCheck />, color: '#10b981', tab: 'bulk' },
        { title: 'Absent', value: stats?.summary?.ABSENT || 0, icon: <FaUserTimes />, color: '#ef4444', tab: 'bulk' },
        { title: 'Half Day', value: stats?.summary?.['HALF DAY'] || 0, icon: <FaClock />, color: '#f59e0b', tab: 'bulk' },
        { title: 'Late', value: stats?.summary?.LATE || 0, icon: <FaCalendarDay />, color: '#6366f1', tab: 'bulk' },
        { title: 'WFH', value: stats?.summary?.WFH || 0, icon: <FaHome />, color: '#3b82f6', tab: 'bulk' },
    ];

    // Map shift distribution data
    const shiftData = {
        labels: stats?.shift_dist?.labels || ['General Shift', 'Morning Shift', 'Night Shift'],
        datasets: [{
            label: 'Employees Present',
            data: stats?.shift_dist?.data || [0, 0, 0],
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
            borderRadius: 8,
        }]
    };

    const dailyTrendData = {
        labels: stats?.trend?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: 'Present',
                data: stats?.trend?.present || [0, 0, 0, 0, 0],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Absent',
                data: stats?.trend?.absent || [0, 0, 0, 0, 0],
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
                if (onTabChange) onTabChange('my-attendance');
                else navigate('/attendance');
            }
        }
    };

    const [expanded, setExpanded] = React.useState(false);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const handleViewDetails = (name) => {
        alert(`Details for ${name}`);
    };

    const recentRecords = stats?.overview || [];
    const displayRecords = expanded ? recentRecords : recentRecords.slice(0, 5);

    const getStatusBadgeClass = (status) => {
        const s = (status || '').toString().toLowerCase();
        if (s.startsWith('p') || s === 'present') return 'success';
        if (s.startsWith('a') || s === 'absent') return 'danger';
        if (s.startsWith('h') || s === 'half') return 'warning';
        if (s.startsWith('l') || s === 'late') return 'info';
        return 'secondary';
    };

    return (
        <div className="container-fluid p-0 animate__animated animate__fadeIn">
            {/* API Connection Indicator (Optional debug info) */}
            {!stats && !loading && (
                <div className="alert alert-warning py-2 small mb-3">
                    Using mock data. Please check if the API at <code>{attendanceService.getDashboardStatsUrl ? attendanceService.getDashboardStatsUrl() : '/api/attendance/dashboard-stats'}</code> is active.
                </div>
            )}

            {/* Summary Cards */}
            <div className="row g-4 mb-4">
                {summaryCards.map((card, index) => {
                    const baseColor = card.color || '#7c3aed';
                    const Icon = card.icon;
                    
                    return (
                        <div key={index} className="col-md-4 col-lg-2" style={{ flex: '1 0 18%' }}>
                            <div 
                                className="card border-0 shadow-sm h-100 dash-card-hover"
                                style={{ 
                                    borderRadius: '20px', 
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    backgroundColor: '#ffffff',
                                    overflow: 'hidden'
                                }}
                                onClick={() => onTabChange ? onTabChange(card.tab) : null}
                            >
                                <div className="card-body p-3 d-flex flex-column">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div 
                                            className="p-2 rounded-3 d-flex align-items-center justify-content-center"
                                            style={{ backgroundColor: `${baseColor}15`, color: baseColor }}
                                        >
                                            {Icon && React.isValidElement(Icon) ? React.cloneElement(Icon, { size: 20 }) : null}
                                        </div>
                                        <div className="small fw-bold" style={{ color: baseColor, fontSize: '0.65rem' }}>
                                            Live
                                        </div>
                                    </div>
                                    <div className="mt-auto">
                                        <h3 className="fw-bold mb-0 text-dark" style={{ letterSpacing: '-0.5px' }}>{card.value}</h3>
                                        <p className="text-secondary smaller mb-0 fw-bold text-uppercase" style={{ fontSize: '0.6rem', opacity: 0.7 }}>
                                            {card.title}
                                        </p>
                                    </div>
                                    {/* Subtle progress bar at bottom */}
                                    <div 
                                        style={{ 
                                            position: 'absolute', 
                                            bottom: 0, 
                                            left: 0, 
                                            height: '4px', 
                                            width: '100%', 
                                            background: `linear-gradient(90deg, ${baseColor} 0%, ${baseColor}20 100%)` 
                                        }} 
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '20px' }}>
                        <h6 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                            <MdDashboard className="text-primary" /> Shift-wise Distribution
                        </h6>
                        <div style={{ height: '300px', cursor: 'pointer' }}>
                            <Bar data={shiftData} options={{ ...options, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '20px' }}>
                        <h6 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                            <FaCalendarDay className="text-primary" /> Attendance Trend (This Week)
                        </h6>
                        <div style={{ height: '300px', cursor: 'pointer' }}>
                            <Line data={dailyTrendData} options={{ ...options, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Attendance Table */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <div className="card-header bg-white border-0 py-4 px-4 d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                        <FaClipboardList className="text-primary" /> Today's Attendance Overview
                    </h6>
                    <button className="btn btn-sm btn-primary rounded-pill px-4 shadow-sm" onClick={() => onTabChange ? onTabChange('mark') : null}>
                        + Mark New
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
                            </tr>
                        </thead>
                        <tbody>
                            {displayRecords.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-muted small">
                                        No attendance activities recorded for today.
                                    </td>
                                </tr>
                            ) : (
                                displayRecords.map((row, i) => (
                                    <tr key={i} onClick={() => handleViewDetails(row.name)} style={{ cursor: 'pointer' }}>
                                        <td className="ps-4">
                                            <div className="fw-bold text-dark">{row.name || row.full_name}</div>
                                            <div className="text-muted small">EMP-00{i + 1}</div>
                                        </td>
                                        <td>
                                            <span className={`badge bg-${getStatusBadgeClass(row.status)} bg-opacity-10 text-${getStatusBadgeClass(row.status)} px-3 py-2 rounded-pill`}>
                                                {row.status === 'P' ? 'Present' : (row.status === 'A' ? 'Absent' : row.status)}
                                            </span>
                                        </td>                                        <td className="text-secondary small">{row.shift || row.shift_name || 'General Shift'}</td>
                                        <td className="text-secondary fw-bold small text-primary">{row.in || row.punch_in || row.in_time || '-'}</td>
                                        <td className="text-secondary fw-bold small text-primary pe-4">{row.out || row.punch_out || row.out_time || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer bg-white border-0 py-3 text-center border-top">
                    <button
                        className="btn btn-link text-primary text-decoration-none small fw-bold"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Show Less' : 'View All Records'}
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

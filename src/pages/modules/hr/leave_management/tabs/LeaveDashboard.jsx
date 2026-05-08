import React, { useEffect, useState } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
    CategoryScale, LinearScale, PointElement, LineElement, Filler, BarElement
} from 'chart.js';
import { FaCalendarPlus, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { MdDashboard, MdHistory, MdPlaylistAddCheck } from 'react-icons/md';
import { leaveService } from '../../../../../services/leaveService';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, BarElement);

/* ── shared card ── */
const card = { background: '#fff', borderRadius: 10, border: '1px solid #e8ecf0', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '12px 14px' };

const statusBadge = (s) => ({
    Pending: { bg: '#fef3c7', color: '#92400e' },
    Approved: { bg: '#d1fae5', color: '#065f46' },
    Rejected: { bg: '#fee2e2', color: '#991b1b' },
}[s] || { bg: '#f1f5f9', color: '#475569' });

const avatarColor = (i) => ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5];

const LeaveDashboard = ({ personal = false }) => {
    const [summary, setSummary] = useState(null);
    const [trends, setTrends] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Toggle between Personal and Management data suites
                const summaryData = personal 
                    ? await leaveService.getDashboardSummary() 
                    : await leaveService.getManagementSummary();
                
                const trendsData = personal 
                    ? await leaveService.getDashboardTrends() 
                    : await leaveService.getManagementTrends();
                
                if (summaryData) setSummary(summaryData);
                if (trendsData) setTrends(trendsData);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [personal]);

    if (loading) return <div className="p-4 text-center">Loading dashboard...</div>;

    const kpis = [
        { val: summary?.totalBalance || '0', label: 'Total Balance', icon: <FaCalendarPlus size={16} />, color: '#7c3aed', tab: 'dashboard' },
        { val: summary?.pending || '0', label: 'Pending', icon: <FaClock size={16} />, color: '#f59e0b', tab: 'pending' },
        { val: summary?.approved || '0', label: 'Approved', icon: <FaCheckCircle size={16} />, color: '#10b981', tab: 'history' },
        { val: summary?.rejected || '0', label: 'Rejected', icon: <FaTimesCircle size={16} />, color: '#ef4444', tab: 'history' },
    ];

    const leaveTypes = summary?.leaveTypes || [];
    const recentRequests = summary?.recentRequests || [];

    const doughnutData = {
        labels: summary?.doughnut?.labels || ['Sick', 'Casual', 'Privilege', 'Used'],
        datasets: [{ 
            data: summary?.doughnut?.data || [0, 0, 0, 0], 
            backgroundColor: summary?.doughnut?.colors || ['#ef4444', '#f59e0b', '#10b981', '#cbd5e1'], 
            borderWidth: 0, 
            cutout: '70%' 
        }],
    };

    const trendData = {
        labels: trends?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{ 
            label: 'Leaves Taken', 
            data: trends?.data || [2, 5, 3, 8, 4, 6, 2, 4, 7, 5, 8, 3], 
            backgroundColor: '#10b981', 
            borderRadius: 20,
            barThickness: 4,
        }],
    };

    return (
        <div>
            {/* ── KPI Row ── */}
            <div className="row g-3 mb-4">
                {kpis.map((k, i) => (
                    <div key={i} className="col-6 col-md-3">
                        <div 
                            className="card border-0 shadow-sm h-100 dash-card-hover"
                            style={{ 
                                borderRadius: '20px', 
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                backgroundColor: '#ffffff',
                                overflow: 'hidden',
                                position: 'relative'
                            }}
                        >
                            <div className="card-body p-3 d-flex flex-column">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div 
                                        className="p-2 rounded-3 d-flex align-items-center justify-content-center"
                                        style={{ backgroundColor: `${k.color}15`, color: k.color }}
                                    >
                                        {k.icon}
                                    </div>
                                    <div className="small fw-bold text-uppercase" style={{ color: k.color, fontSize: '0.6rem', opacity: 0.8 }}>
                                        {k.label === 'Total Balance' ? 'Available' : 'Status'}
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <h3 className="fw-bold mb-0 text-dark" style={{ letterSpacing: '-0.5px' }}>{k.val}</h3>
                                    <p className="text-secondary smaller mb-0 fw-bold text-uppercase" style={{ fontSize: '0.6rem', opacity: 0.7 }}>
                                        {k.label}
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
                                        background: `linear-gradient(90deg, ${k.color} 0%, ${k.color}20 100%)` 
                                    }} 
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Leave Balance Bar Cards ── */}
            <div className="row g-3 mb-4">
                {leaveTypes.map((lt, i) => (
                    <div key={i} className="col-md-4">
                        <div 
                            className="card border-0 shadow-sm p-3 h-100" 
                            style={{ borderRadius: '15px', backgroundColor: '#fff' }}
                        >
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="fw-bold text-dark" style={{ fontSize: '0.8rem' }}>{lt.label}</div>
                                <div 
                                    className="px-2 py-1 rounded-pill fw-bold" 
                                    style={{ fontSize: '0.65rem', backgroundColor: `${lt.color}15`, color: lt.color }}
                                >
                                    {lt.total - lt.used} Days Left
                                </div>
                            </div>
                            <div style={{ height: 6, background: '#f1f5f9', borderRadius: 10, margin: '8px 0' }}>
                                <div 
                                    style={{ 
                                        height: '100%', 
                                        width: lt.total > 0 ? `${(lt.used / lt.total) * 100}%` : '0%', 
                                        background: lt.color, 
                                        borderRadius: 10, 
                                        transition: 'width 0.8s ease-out' 
                                    }} 
                                />
                            </div>
                            <div className="d-flex justify-content-between mt-1">
                                <span className="text-muted" style={{ fontSize: '0.65rem' }}>{lt.used || 0} Days Used</span>
                                <span className="text-muted" style={{ fontSize: '0.65rem' }}>Total: {lt.total || 0}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Charts ── */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '20px' }}>
                        <div className="fw-bold mb-4 text-dark d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
                            <MdDashboard className="text-primary" /> Balance Distribution
                        </div>
                        <div style={{ height: 180, position: 'relative' }}>
                            <Doughnut data={doughnutData} options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10, weight: 'bold' } } },
                                }
                            }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '20px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="fw-bold text-dark d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
                                <MdHistory className="text-primary" /> Monthly Leave Trend
                            </div>
                            <select className="form-select form-select-sm border-0 bg-light w-auto" style={{ fontSize: '0.7rem' }}>
                                <option>2026</option><option>2025</option>
                            </select>
                        </div>
                        <div style={{ height: 140 }}>
                            <Bar data={trendData} options={{
                                maintainAspectRatio: false,
                                scales: {
                                    y: { 
                                        beginAtZero: true, 
                                        grid: { color: 'rgba(0,0,0,0.02)', drawBorder: false }, 
                                        ticks: { font: { size: 9 }, maxTicksLimit: 5 } 
                                    },
                                    x: { 
                                        grid: { display: false }, 
                                        ticks: { font: { size: 9 } } 
                                    }
                                },
                                plugins: { 
                                    legend: { display: false }, 
                                    tooltip: { 
                                        backgroundColor: '#1e293b',
                                        padding: 10,
                                        titleFont: { size: 11 },
                                        bodyFont: { size: 11 },
                                        displayColors: false
                                    } 
                                }
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Recent Requests Table ── */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <div className="card-header bg-white border-0 py-4 px-4 d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                        <MdPlaylistAddCheck className="text-primary" size={22} /> Recent Leave Requests
                    </h6>
                    <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 fw-bold" style={{ fontSize: '0.7rem' }}>
                        {recentRequests.length} Requests Total
                    </span>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.78rem' }}>
                        <thead className="bg-light">
                            <tr>
                            {['Employee', 'Type', 'Period', 'Days', 'Status'].map(h => (
                                <th key={h} style={{ padding: '5px 8px', fontSize: '0.63rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {recentRequests.map((r, i) => {
                            const badge = statusBadge(r.status);
                            return (
                                <tr key={i}>
                                    <td style={{ padding: '6px 8px' }}>
                                        <div className="d-flex align-items-center gap-2">
                                            <div style={{ width: 26, height: 26, borderRadius: '50%', background: avatarColor(i), color: '#fff', fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.avatar}</div>
                                            <span className="fw-bold">{r.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '6px 8px', color: '#64748b' }}>{r.type}</td>
                                    <td style={{ padding: '6px 8px', color: '#64748b' }}>{r.from} → {r.to}</td>
                                    <td style={{ padding: '6px 8px' }}><span style={{ fontWeight: 700 }}>{r.days}d</span></td>
                                    <td style={{ padding: '6px 8px' }}>
                                        <span style={{ background: badge.bg, color: badge.color, borderRadius: 20, padding: '2px 10px', fontSize: '0.63rem', fontWeight: 700 }}>{r.status}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
};

export default LeaveDashboard;

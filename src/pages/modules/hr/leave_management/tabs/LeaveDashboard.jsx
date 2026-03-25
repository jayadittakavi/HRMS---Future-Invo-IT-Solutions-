import React, { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
    CategoryScale, LinearScale, PointElement, LineElement, Filler
} from 'chart.js';
import { FaCalendarPlus, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { leaveService } from '../../../../../services/leaveService';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

/* ── shared card ── */
const card = { background: '#fff', borderRadius: 10, border: '1px solid #e8ecf0', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '12px 14px' };

const statusBadge = (s) => ({
    Pending: { bg: '#fef3c7', color: '#92400e' },
    Approved: { bg: '#d1fae5', color: '#065f46' },
    Rejected: { bg: '#fee2e2', color: '#991b1b' },
}[s] || { bg: '#f1f5f9', color: '#475569' });

const avatarColor = (i) => ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5];

const LeaveDashboard = () => {
    const [summary, setSummary] = useState(null);
    const [trends, setTrends] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const summaryRes = await leaveService.getDashboardSummary();
                const trendsRes = await leaveService.getDashboardTrends();
                
                if (summaryRes.ok) setSummary(await summaryRes.json());
                if (trendsRes.ok) setTrends(await trendsRes.json());
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <div className="p-4 text-center">Loading dashboard...</div>;

    const kpis = [
        { val: summary?.totalBalance || '0', label: 'Total Balance', icon: <FaCalendarPlus size={14} />, grad: 'linear-gradient(135deg,#7928ca,#ff0080)' },
        { val: summary?.pending || '0', label: 'Pending', icon: <FaClock size={14} />, grad: 'linear-gradient(135deg,#f97316,#ef4444)' },
        { val: summary?.approved || '0', label: 'Approved', icon: <FaCheckCircle size={14} />, grad: 'linear-gradient(135deg,#10b981,#059669)' },
        { val: summary?.rejected || '0', label: 'Rejected', icon: <FaTimesCircle size={14} />, grad: 'linear-gradient(135deg,#ef4444,#b91c1c)' },
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
        labels: trends?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{ 
            label: 'Leaves Taken', 
            data: trends?.data || [0, 0, 0, 0, 0, 0], 
            borderColor: '#4f46e5', 
            backgroundColor: 'rgba(79,70,229,0.08)', 
            fill: true, 
            tension: 0.4, 
            pointRadius: 3, 
            pointHoverRadius: 5 
        }],
    };

    return (
        <div>
            {/* ── KPI Row ── */}
            <div className="row g-2 mb-2">
                {kpis.map((k, i) => (
                    <div key={i} className="col-6 col-md-3">
                        <div style={{ background: k.grad, borderRadius: 10, padding: '10px 14px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '0.62rem', opacity: 0.85, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k.label}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.1 }}>{k.val}</div>
                            </div>
                            <div style={{ opacity: 0.55 }}>{k.icon}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Leave Balance Bar Cards ── */}
            <div className="row g-2 mb-2">
                {leaveTypes.map((lt, i) => (
                    <div key={i} className="col-md-4">
                        <div style={card}>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <div className="fw-bold" style={{ fontSize: '0.78rem' }}>{lt.label}</div>
                                <div style={{ fontSize: '0.68rem', color: lt.color, fontWeight: 700 }}>{lt.total - lt.used} left</div>
                            </div>
                            <div style={{ height: 5, background: '#f1f5f9', borderRadius: 3 }}>
                                <div style={{ height: '100%', width: `${(lt.used / lt.total) * 100}%`, background: lt.color, borderRadius: 3, transition: 'width 0.5s' }} />
                            </div>
                            <div className="d-flex justify-content-between mt-1">
                                <span style={{ fontSize: '0.62rem', color: '#94a3b8' }}>{lt.used} used</span>
                                <span style={{ fontSize: '0.62rem', color: '#94a3b8' }}>{lt.total} total</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Charts ── */}
            <div className="row g-2 mb-2">
                <div className="col-md-4">
                    <div style={{ ...card, textAlign: 'center' }}>
                        <div className="fw-bold mb-2" style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Balance Distribution</div>
                        <div style={{ height: 150, position: 'relative' }}>
                            <Doughnut data={doughnutData} options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } },
                                    tooltip: { bodyFont: { size: 10 }, titleFont: { size: 10 } }
                                }
                            }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div style={card}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="fw-bold" style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Monthly Leave Trend</div>
                            <select className="form-select form-select-sm border-0 bg-light w-auto" style={{ fontSize: '0.7rem' }}>
                                <option>2026</option><option>2025</option>
                            </select>
                        </div>
                        <div style={{ height: 130 }}>
                            <Line data={trendData} options={{
                                maintainAspectRatio: false,
                                scales: {
                                    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 9 }, maxTicksLimit: 4 } },
                                    x: { grid: { display: false }, ticks: { font: { size: 9 } } }
                                },
                                plugins: { legend: { display: false }, tooltip: { bodyFont: { size: 10 }, titleFont: { size: 10 } } }
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Recent Requests Table ── */}
            <div style={card}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="fw-bold" style={{ fontSize: '0.82rem' }}>Recent Leave Requests</div>
                    <span style={{ fontSize: '0.68rem', background: '#ede9fe', color: '#4f46e5', borderRadius: 20, padding: '2px 10px', fontWeight: 700 }}>
                        {recentRequests.length} total
                    </span>
                </div>
                <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.76rem' }}>
                    <thead>
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
    );
};

export default LeaveDashboard;

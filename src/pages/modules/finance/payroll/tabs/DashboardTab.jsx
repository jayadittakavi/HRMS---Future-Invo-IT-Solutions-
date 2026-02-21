import React from 'react';
import { FaMoneyBillWave, FaUserTie, FaChartLine, FaCalendarAlt, FaDownload, FaFileUpload, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { SimpleBarChart, SimpleDonutChart, SimpleLineChart } from '../../../../../components/charts/CustomCharts';

const DashboardTab = () => {
    // Mock Data
    const monthlyPayoutData = [4.2, 4.5, 4.8, 5.2, 5.4, 5.6]; // In Lakhs
    const deptPayoutData = [
        { label: 'Engineering', value: 2.8, color: '#4f46e5' },
        { label: 'Sales', value: 1.2, color: '#f59e0b' },
        { label: 'Marketing', value: 0.8, color: '#10b981' },
        { label: 'HR', value: 0.4, color: '#ef4444' },
        { label: 'Admin', value: 0.4, color: '#6366f1' },
    ];

    const recentPayouts = [
        { id: 'PAY-206', period: 'May 2026', total: '₹5.60L', count: 124, status: 'Completed', date: 'May 28' },
        { id: 'PAY-205', period: 'Apr 2026', total: '₹5.45L', count: 121, status: 'Completed', date: 'Apr 28' },
        { id: 'PAY-204', period: 'Mar 2026', total: '₹5.20L', count: 118, status: 'Completed', date: 'Mar 28' },
        { id: 'PAY-203', period: 'Feb 2026', total: '₹4.85L', count: 115, status: 'Completed', date: 'Feb 27' },
    ];

    const cardStyle = { background: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' };

    return (
        <div className="container-fluid p-0">
            {/* Header / Quick Actions */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-0">Payroll Executive Dashboard</h5>
                    <p className="text-secondary small mb-0">Summary of salary disbursements and compliance status.</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary px-3 shadow-sm border-0 bg-white" style={{ fontWeight: 600 }}>
                        <FaDownload className="me-2" /> Export Report
                    </button>
                    <button className="btn btn-sm btn-primary px-3 shadow-sm border-0" style={{ fontWeight: 600, background: '#4f46e5' }}>
                        Run Payroll
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Total Payout', val: '₹5.6L', icon: <FaMoneyBillWave size={22} />, bg: 'primary', trend: '+8.4%', trendUp: true },
                    { label: 'Processed', val: '124', icon: <FaUserTie size={22} />, bg: 'success', trend: '+3', trendUp: true },
                    { label: 'Avg Salary', val: '₹45k', icon: <FaChartLine size={22} />, bg: 'info', trend: '-1.2%', trendUp: false },
                    { label: 'Pending', val: '12', icon: <FaCalendarAlt size={22} />, bg: 'warning', trend: 'Monthly', trendUp: null },
                ].map((stat, i) => (
                    <div key={i} className="col-md-3">
                        <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div style={{ color: `var(--bs-${stat.bg})` }}>
                                        {stat.icon}
                                    </div>
                                    {stat.trendUp !== null && (
                                        <div className={`small fw-bold ${stat.trendUp ? 'text-success' : 'text-danger'} bg-light px-2 py-1 rounded`}>
                                            {stat.trendUp ? <FaArrowUp size={10} className="me-1" /> : <FaArrowDown size={10} className="me-1" />}
                                            {stat.trend}
                                        </div>
                                    )}
                                </div>
                                <h6 className="text-secondary small fw-bold text-uppercase mb-1" style={{ letterSpacing: '0.04em' }}>{stat.label}</h6>
                                <h3 className="fw-bold text-dark mb-0">{stat.val}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="row g-4 mb-4">
                {/* Component Breakdown: Earnings vs Deductions */}
                <div className="col-md-8">
                    <div className="card h-100 p-4" style={cardStyle}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="fw-bold mb-0">Payroll Component Analysis (May 2026)</h6>
                        </div>

                        <div className="row g-4">
                            {/* Earnings column */}
                            <div className="col-md-6 border-end">
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                                    <h6 className="small fw-bold text-dark mb-0 text-uppercase" style={{ letterSpacing: '0.05em' }}>Total Earnings</h6>
                                </div>
                                {[
                                    { label: 'Basic Salary', val: '₹3,20,000', per: '57%' },
                                    { label: 'HRA', val: '₹1,10,000', per: '20%' },
                                    { label: 'Special Allowance', val: '₹80,000', per: '14%' },
                                    { label: 'Performance Bonus', val: '₹50,000', per: '9%' },
                                ].map((e, i) => (
                                    <div key={i} className="mb-3">
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-secondary small">{e.label}</span>
                                            <span className="fw-bold small text-dark">{e.val}</span>
                                        </div>
                                        <div className="progress" style={{ height: '4px' }}>
                                            <div className="progress-bar bg-success" style={{ width: e.per }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Deductions column */}
                            <div className="col-md-6">
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }}></div>
                                    <h6 className="small fw-bold text-dark mb-0 text-uppercase" style={{ letterSpacing: '0.05em' }}>Total Deductions</h6>
                                </div>
                                {[
                                    { label: 'Income Tax (TDS)', val: '₹60,000', per: '75%' },
                                    { label: 'Provident Fund (PF)', val: '₹15,000', per: '19%' },
                                    { label: 'Professional Tax', val: '₹3,500', per: '4%' },
                                    { label: 'LWF & Other', val: '₹1,500', per: '2%' },
                                ].map((d, i) => (
                                    <div key={i} className="mb-3">
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-secondary small">{d.label}</span>
                                            <span className="fw-bold small text-dark">{d.val}</span>
                                        </div>
                                        <div className="progress" style={{ height: '4px' }}>
                                            <div className="progress-bar bg-danger" style={{ width: d.per }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center" style={{ marginTop: '20px !important' }}>
                            <div>
                                <small className="text-muted d-block">Est. Net Disbursement</small>
                                <h4 className="fw-bold text-primary mb-0">₹5,60,000.00</h4>
                            </div>
                            <button className="btn btn-sm btn-light border fw-bold text-dark px-3 mt-2">View Full Breakdown</button>
                        </div>
                    </div>
                </div>

                {/* Donut Chart: Dept Distribution */}
                <div className="col-md-4">
                    <div className="card h-100 p-4" style={cardStyle}>
                        <h6 className="fw-bold mb-4">Dept-wise Distribution</h6>
                        <div className="d-flex justify-content-center py-2">
                            <SimpleDonutChart segments={deptPayoutData} size="200px" centerText="100%" />
                        </div>
                        <div className="mt-4">
                            {deptPayoutData.map((d, i) => (
                                <div key={i} className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="small fw-bold text-secondary">
                                        <span style={{ color: d.color }}>●</span> {d.label}
                                    </div>
                                    <div className="small fw-bold">₹{d.value}L</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Recent Runs & Statutory */}
            <div className="row g-4">
                {/* Recent Payroll Runs */}
                <div className="col-md-8">
                    <div className="card p-4" style={cardStyle}>
                        <h6 className="fw-bold mb-4">Recent Payroll Runs</h6>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="border-0 small text-secondary py-3">RUN ID</th>
                                        <th className="border-0 small text-secondary py-3">PERIOD</th>
                                        <th className="border-0 small text-secondary py-3 text-center">EMPLOYEES</th>
                                        <th className="border-0 small text-secondary py-3">TOTAL PAYOUT</th>
                                        <th className="border-0 small text-secondary py-3">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentPayouts.map((p, i) => (
                                        <tr key={i}>
                                            <td className="fw-bold text-primary small py-3">{p.id}</td>
                                            <td className="fw-semibold text-dark py-3">{p.period}</td>
                                            <td className="text-secondary text-center py-3">{p.count}</td>
                                            <td className="fw-bold text-dark py-3">{p.total}</td>
                                            <td className="py-3">
                                                <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25" style={{ fontSize: '0.7rem' }}>
                                                    {p.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Statutory Compliance Summary */}
                <div className="col-md-4">
                    <div className="card p-4 h-100" style={cardStyle}>
                        <h6 className="fw-bold mb-4">Statutory Compliance Status</h6>
                        {[
                            { label: 'Provident Fund (PF)', status: 'On Track', color: 'success', date: 'Paid on May 15' },
                            { label: 'ESIC Contribution', status: 'On Track', color: 'success', date: 'Paid on May 15' },
                            { label: 'Professional Tax', status: 'On Track', color: 'success', date: 'Paid on May 12' },
                            { label: 'TDS Remittance', status: 'Pending', color: 'warning', date: 'Due May 31' },
                        ].map((item, i) => (
                            <div key={i} className="mb-4 last-mb-none">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <div className="small fw-bold text-dark">{item.label}</div>
                                    <span className={`badge bg-${item.color} bg-opacity-10 text-${item.color} small`}>{item.status}</span>
                                </div>
                                <div className="text-muted" style={{ fontSize: '0.7rem' }}>{item.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTab;

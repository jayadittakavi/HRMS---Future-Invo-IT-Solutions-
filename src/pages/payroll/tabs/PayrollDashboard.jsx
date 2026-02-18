import React, { useState } from 'react';
import {
    FaDollarSign, FaUsers, FaCheckCircle, FaClock,
    FaChartLine, FaExclamationTriangle, FaFileInvoiceDollar
} from 'react-icons/fa';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const PayrollDashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('February 2026');

    // Stats data
    const stats = {
        totalPayroll: '₹45,67,890',
        totalEmployees: 156,
        processed: 142,
        pending: 14,
        avgSalary: '₹29,281'
    };

    // Recent payroll runs
    const recentRuns = [
        { id: 1, month: 'February 2026', employees: 156, amount: '₹45,67,890', status: 'Completed', date: '2026-02-28' },
        { id: 2, month: 'January 2026', employees: 154, amount: '₹44,89,320', status: 'Completed', date: '2026-01-31' },
        { id: 3, month: 'December 2025', employees: 152, amount: '₹52,34,560', status: 'Completed', date: '2025-12-31' }
    ];

    // Pending actions
    const pendingActions = [
        { id: 1, action: 'Approve February Payroll', priority: 'High', dueDate: '2026-02-28' },
        { id: 2, action: 'Generate Form-16 for FY 2025-26', priority: 'Medium', dueDate: '2026-03-15' },
        { id: 3, action: 'Update PF/ESI contributions', priority: 'High', dueDate: '2026-03-05' }
    ];

    // Chart data - Payroll Trend
    const payrollTrendData = {
        labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        datasets: [
            {
                label: 'Total Payroll (₹ Lakhs)',
                data: [42, 43, 44, 45, 52, 45, 46],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    // Chart data - Department wise distribution
    const departmentData = {
        labels: ['Engineering', 'Sales', 'HR', 'Marketing', 'Operations'],
        datasets: [
            {
                data: [35, 25, 15, 15, 10],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ],
                borderWidth: 0
            }
        ]
    };

    // Chart data - Salary components
    const salaryComponentsData = {
        labels: ['Basic', 'HRA', 'Allowances', 'Bonus', 'Deductions'],
        datasets: [
            {
                label: 'Amount (₹ Lakhs)',
                data: [25, 10, 8, 5, 3],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ]
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    };

    return (
        <div className="container-fluid p-0">
            {/* Header with Month Selector */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Payroll Dashboard</h5>
                    <p className="text-muted small mb-0">Overview of payroll metrics and activities</p>
                </div>
                <select
                    className="form-select form-select-sm"
                    style={{ width: 'auto' }}
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option>February 2026</option>
                    <option>January 2026</option>
                    <option>December 2025</option>
                </select>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <div className="card-body text-white">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="icon-box bg-white bg-opacity-25 rounded-circle p-3">
                                    <FaDollarSign size={24} />
                                </div>
                                <div className="text-end">
                                    <h6 className="small mb-0 opacity-75">Total Payroll</h6>
                                    <h3 className="fw-bold mb-0">{stats.totalPayroll}</h3>
                                </div>
                            </div>
                            <div className="small opacity-75">
                                <FaChartLine className="me-1" />
                                +5.2% from last month
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <div className="card-body text-white">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="icon-box bg-white bg-opacity-25 rounded-circle p-3">
                                    <FaUsers size={24} />
                                </div>
                                <div className="text-end">
                                    <h6 className="small mb-0 opacity-75">Total Employees</h6>
                                    <h3 className="fw-bold mb-0">{stats.totalEmployees}</h3>
                                </div>
                            </div>
                            <div className="small opacity-75">
                                <FaChartLine className="me-1" />
                                +2 new joiners
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <div className="card-body text-white">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="icon-box bg-white bg-opacity-25 rounded-circle p-3">
                                    <FaCheckCircle size={24} />
                                </div>
                                <div className="text-end">
                                    <h6 className="small mb-0 opacity-75">Processed</h6>
                                    <h3 className="fw-bold mb-0">{stats.processed}</h3>
                                </div>
                            </div>
                            <div className="small opacity-75">
                                91% completion rate
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                        <div className="card-body text-white">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="icon-box bg-white bg-opacity-25 rounded-circle p-3">
                                    <FaClock size={24} />
                                </div>
                                <div className="text-end">
                                    <h6 className="small mb-0 opacity-75">Pending</h6>
                                    <h3 className="fw-bold mb-0">{stats.pending}</h3>
                                </div>
                            </div>
                            <div className="small opacity-75">
                                <FaExclamationTriangle className="me-1" />
                                Requires attention
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="row g-4 mb-4">
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="fw-bold mb-3">Payroll Trend (Last 7 Months)</h6>
                            <div style={{ height: '300px' }}>
                                <Line data={payrollTrendData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="fw-bold mb-3">Department Distribution</h6>
                            <div style={{ height: '300px' }}>
                                <Doughnut data={departmentData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Salary Components & Recent Runs */}
            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="fw-bold mb-3">Salary Components Breakdown</h6>
                            <div style={{ height: '300px' }}>
                                <Bar data={salaryComponentsData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="fw-bold mb-3">Recent Payroll Runs</h6>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="border-0 small">Month</th>
                                            <th className="border-0 small">Employees</th>
                                            <th className="border-0 small">Amount</th>
                                            <th className="border-0 small">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentRuns.map(run => (
                                            <tr key={run.id}>
                                                <td className="small">{run.month}</td>
                                                <td className="small">{run.employees}</td>
                                                <td className="small fw-bold text-primary">{run.amount}</td>
                                                <td>
                                                    <span className="badge bg-success bg-opacity-10 text-success small">
                                                        {run.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Actions */}
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <h6 className="fw-bold mb-3">Pending Actions</h6>
                    <div className="list-group list-group-flush">
                        {pendingActions.map(action => (
                            <div key={action.id} className="list-group-item border-0 d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <div className={`icon-box rounded-circle p-2 ${action.priority === 'High' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-warning bg-opacity-10 text-warning'
                                        }`}>
                                        <FaExclamationTriangle size={16} />
                                    </div>
                                    <div>
                                        <div className="fw-bold text-dark">{action.action}</div>
                                        <small className="text-muted">Due: {action.dueDate}</small>
                                    </div>
                                </div>
                                <span className={`badge ${action.priority === 'High' ? 'bg-danger' : 'bg-warning text-dark'
                                    }`}>
                                    {action.priority}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayrollDashboard;

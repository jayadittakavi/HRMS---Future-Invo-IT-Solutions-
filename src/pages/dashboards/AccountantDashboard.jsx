import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PayrollContent } from '../modules/finance/payroll/Payroll';
import { useAuth } from '../../context/AuthContext';
import { SimpleLineChart, SimpleBarChart, SimpleDonutChart } from '../../components/charts/CustomCharts';
import { FaMoneyCheckAlt, FaFileInvoiceDollar } from 'react-icons/fa';

const AccountantDashboard = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('dashboard');

    const handleNavigate = (path) => {
        const view = path.replace('/', '');
        setActiveView(view || 'dashboard');
    };

    const expenseTrend = [15, 20, 18, 25, 22, 30, 28, 35, 32, 40];
    const budgetData = [
        { label: 'Q1', value: 80, color: '#3b82f6' },
        { label: 'Q2', value: 65, color: '#10b981' },
        { label: 'Q3', value: 90, color: '#f59e0b' },
        { label: 'Q4', value: 45, color: '#ef4444' },
    ];

    const invoiceStatusData = [
        { label: 'Paid', value: 65, color: '#10b981' },
        { label: 'Pending', value: 25, color: '#f59e0b' },
        { label: 'Overdue', value: 10, color: '#ef4444' }
    ];

    return (
        <DashboardLayout title="" onNavigate={handleNavigate}>
            <div className="container-fluid p-0">
                {activeView === 'dashboard' && (
                    <>
                        {/* Accountant Dashboard Overview */}
                        <div className="mb-4">
                            <h2 className="h4 fw-bold text-dark mb-1">Welcome {user?.name || 'Accountant'}!</h2>
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-secondary fw-medium">Financial Overview:</span>
                                <span className="badge bg-success text-white fw-bold">HEALTHY</span>
                            </div>
                        </div>

                        <div className="row g-4 mb-4">
                            <div className="col-md-6">
                                <div className="dashboard-card bg-gradient-blue">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaMoneyCheckAlt /> Payroll Processed
                                    </h6>
                                    <h3 className="dashboard-value">95%</h3>
                                    <p className="small mb-0">Success rate</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="dashboard-card bg-gradient-orange">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaFileInvoiceDollar /> Pending Invoices
                                    </h6>
                                    <h3 className="dashboard-value">4</h3>
                                    <p className="small mb-0">Action required</p>
                                </div>
                            </div>
                        </div>

                        {/* Charts Row 1 */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-6">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Monthly Expenses Trend</h6>
                                    <div className="p-3">
                                        <SimpleLineChart data={expenseTrend} height="280px" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Budget Utilization</h6>
                                    <SimpleBarChart data={budgetData} height="280px" />
                                </div>
                            </div>
                        </div>

                        {/* Charts Row 2 & Transactions */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="dashboard-card h-100">
                                    <h6 className="dashboard-card-title">Invoice Status</h6>
                                    <div className="py-2 d-flex justify-content-center">
                                        <SimpleDonutChart segments={invoiceStatusData} size="180px" centerText="Total" />
                                    </div>
                                    <div className="text-center mt-2 small text-secondary">
                                        {invoiceStatusData.map((item, idx) => (
                                            <span key={idx} className="fw-bold me-2" style={{ color: item.color }}>● {item.label}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="dashboard-card h-100">
                                    <h6 className="dashboard-card-title d-flex justify-content-between align-items-center mb-3">
                                        Recent Transactions
                                        <button className="btn btn-sm btn-outline-primary py-0">View All</button>
                                    </h6>
                                    <div className="table-responsive">
                                        <table className="table table-hover table-sm align-middle mb-0">
                                            <thead>
                                                <tr className="bg-light">
                                                    <th className="small border-0 text-secondary">ID</th>
                                                    <th className="small border-0 text-secondary">Description</th>
                                                    <th className="small border-0 text-secondary">Date</th>
                                                    <th className="small border-0 text-secondary">Amount</th>
                                                    <th className="small border-0 text-secondary">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="small">#TX-101</td>
                                                    <td className="small fw-bold">Office Supplies</td>
                                                    <td className="small text-muted">May 21</td>
                                                    <td className="small fw-bold text-dark">$1,200</td>
                                                    <td><span className="badge bg-success bg-opacity-10 text-success" style={{ fontSize: '0.7rem' }}>Paid</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="small">#TX-102</td>
                                                    <td className="small fw-bold">Software License</td>
                                                    <td className="small text-muted">May 20</td>
                                                    <td className="small fw-bold text-dark">$450</td>
                                                    <td><span className="badge bg-warning bg-opacity-10 text-warning" style={{ fontSize: '0.7rem' }}>Pending</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="small">#TX-103</td>
                                                    <td className="small fw-bold">Travel Expenses</td>
                                                    <td className="small text-muted">May 19</td>
                                                    <td className="small fw-bold text-dark">$850</td>
                                                    <td><span className="badge bg-info bg-opacity-10 text-info" style={{ fontSize: '0.7rem' }}>Processing</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="small">#TX-104</td>
                                                    <td className="small fw-bold">Consulting Fees</td>
                                                    <td className="small text-muted">May 18</td>
                                                    <td className="small fw-bold text-dark">$2,000</td>
                                                    <td><span className="badge bg-success bg-opacity-10 text-success" style={{ fontSize: '0.7rem' }}>Paid</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeView === 'payroll' && <PayrollContent />}

                {activeView === 'invoices' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">Invoice Management</h3>
                        <p>Process and track company invoices.</p>
                    </div>
                )}
                {activeView === 'expenses' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">Expense Tracking</h3>
                        <p>Manage employee reimbursements and company expenses.</p>
                    </div>
                )}
                {activeView === 'reports' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">Financial Reports</h3>
                        <p>View profit/loss statements and payroll summaries.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AccountantDashboard;

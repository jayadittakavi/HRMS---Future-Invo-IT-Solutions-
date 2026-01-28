import React from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { SimpleLineChart } from '../../../../components/charts/CustomCharts';
import { FaPlaneDeparture, FaReceipt, FaWallet } from 'react-icons/fa';

export const TravelExpensesContent = () => {
    // Mock Data
    const expenses = [
        { id: 'EXP-001', employee: 'John Doe', project: 'Client Visit - NYC', amount: '$1,200', date: '2025-10-10', status: 'Approved' },
        { id: 'EXP-002', employee: 'Sarah Lee', project: 'Tech Conference', amount: '$850', date: '2025-10-12', status: 'Pending' },
        { id: 'EXP-003', employee: 'Mike Chen', project: 'Team Offsite', amount: '$300', date: '2025-10-15', status: 'Rejected' },
        { id: 'EXP-004', employee: 'Meera Joshi', project: 'Branch Audit', amount: '$550', date: '2025-10-18', status: 'Approved' },
    ];

    const expenseTrend = [650, 900, 1200, 850, 1500, 1100]; // Last 6 months

    return (
        <div className="container-fluid p-0">
            {/* Overview Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="bg-white p-3 rounded shadow-sm d-flex flex-column justify-content-between h-100 border-top border-4 border-info">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted small mb-1">Total Expenses (YTD)</p>
                                <h3 className="fw-bold text-dark">$45,200</h3>
                            </div>
                            <div className="bg-info bg-opacity-10 p-2 rounded text-info" style={{ height: 'fit-content' }}>
                                <FaWallet size={20} />
                            </div>
                        </div>
                        <div className="small text-success fw-bold mt-3">↑ 12% vs last year</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white p-3 rounded shadow-sm d-flex flex-column justify-content-between h-100 border-top border-4 border-primary">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted small mb-1">Pending Claims</p>
                                <h3 className="fw-bold text-dark">8</h3>
                            </div>
                            <div className="bg-primary bg-opacity-10 p-2 rounded text-primary" style={{ height: 'fit-content' }}>
                                <FaReceipt size={20} />
                            </div>
                        </div>
                        <div className="small text-muted mt-3">Requires approval</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white p-3 rounded shadow-sm d-flex flex-column justify-content-between h-100 border-top border-4 border-success">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted small mb-1">Approved Trips</p>
                                <h3 className="fw-bold text-dark">15</h3>
                            </div>
                            <div className="bg-success bg-opacity-10 p-2 rounded text-success" style={{ height: 'fit-content' }}>
                                <FaPlaneDeparture size={20} />
                            </div>
                        </div>
                        <div className="small text-muted mt-3">Upcoming this month</div>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="bg-white p-4 rounded shadow-sm">
                        <h6 className="fw-bold mb-4">Expense Trends (Last 6 Months)</h6>
                        <SimpleLineChart data={expenseTrend} height="300px" color="#0ea5e9" />
                    </div>
                </div>
            </div>

            {/* Expense Table */}
            <div className="bg-white rounded shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold m-0">Recent Expense Claims</h5>
                    <button className="btn btn-primary btn-sm" style={{ backgroundColor: '#0d6efd' }}>+ New Claim</button>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="border-0 small fw-bold text-secondary">Claim ID</th>
                                <th className="border-0 small fw-bold text-secondary">Employee</th>
                                <th className="border-0 small fw-bold text-secondary">Project / Purpose</th>
                                <th className="border-0 small fw-bold text-secondary">Date</th>
                                <th className="border-0 small fw-bold text-secondary">Amount</th>
                                <th className="border-0 small fw-bold text-secondary">Status</th>
                                <th className="border-0 small fw-bold text-secondary text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map(item => (
                                <tr key={item.id}>
                                    <td className="fw-bold small text-muted">{item.id}</td>
                                    <td className="fw-bold text-dark">{item.employee}</td>
                                    <td>{item.project}</td>
                                    <td className="text-muted small">{item.date}</td>
                                    <td className="fw-bold text-dark">{item.amount}</td>
                                    <td>
                                        <span className={`badge ${item.status === 'Approved' ? 'bg-success' :
                                            item.status === 'Rejected' ? 'bg-danger' :
                                                'bg-warning text-dark'
                                            }`}>{item.status}</span>
                                    </td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-link text-decoration-none">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const TravelExpenses = () => {
    return (
        <DashboardLayout title="Travel & Expenses">
            <TravelExpensesContent />
        </DashboardLayout>
    );
};

export default TravelExpenses;

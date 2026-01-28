import { SimpleBarChart, SimpleDonutChart } from '../../../../components/charts/CustomCharts'; // Assuming PieChart exists or using Donut
import { FaHandHoldingUsd, FaMoneyBillAlt, FaPercent } from 'react-icons/fa';

export const LoansContent = () => {
    // ... (keep data same)
    const loans = [
        { id: 101, employee: 'Rajesh Kumar', amount: '₹50,000', type: 'Personal', emi: '₹5,000', tenure: '10 Months', status: 'Active' },
        { id: 102, employee: 'Sneha Patel', amount: '₹2,00,000', type: 'Home Renovation', emi: '₹10,000', tenure: '20 Months', status: 'Approved' },
        { id: 103, employee: 'Amit Singh', amount: '₹20,000', type: 'Emergency', emi: '₹4,000', tenure: '5 Months', status: 'Paid' },
        { id: 104, employee: 'Priya Sharma', amount: '₹1,00,000', type: 'Personal', emi: '₹8,500', tenure: '12 Months', status: 'Pending' },
    ];

    const loanDistribution = [
        { label: 'Personal', value: 45, color: '#3b82f6' },
        { label: 'Home', value: 30, color: '#10b981' },
        { label: 'Emergency', value: 25, color: '#f59e0b' },
    ];

    const monthlyDisbursement = [
        { label: 'Jan', value: 120000, color: '#6366f1' },
        { label: 'Feb', value: 85000, color: '#6366f1' },
        { label: 'Mar', value: 150000, color: '#6366f1' },
        { label: 'Apr', value: 90000, color: '#6366f1' },
        { label: 'May', value: 200000, color: '#6366f1' },
    ];

    return (
        <div className="container-fluid p-0">
            {/* Key Metrics */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="bg-white p-4 rounded shadow-sm d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary"><FaHandHoldingUsd size={24} /></div>
                        <div>
                            <div className="text-secondary small fw-bold">Total Disbursed</div>
                            <h3 className="mb-0 fw-bold">₹12.5L</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white p-4 rounded shadow-sm d-flex align-items-center gap-3">
                        <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success"><FaMoneyBillAlt size={24} /></div>
                        <div>
                            <div className="text-secondary small fw-bold">Active Loans</div>
                            <h3 className="mb-0 fw-bold">24</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white p-4 rounded shadow-sm d-flex align-items-center gap-3">
                        <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning"><FaPercent size={24} /></div>
                        <div>
                            <div className="text-secondary small fw-bold">Avg. Interest Rate</div>
                            <h3 className="mb-0 fw-bold">8.5%</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-5">
                    <div className="bg-white p-4 rounded shadow-sm h-100">
                        <h6 className="fw-bold mb-4">Loan Type Distribution</h6>
                        <div className="d-flex justify-content-center">
                            <SimpleDonutChart segments={loanDistribution} size="220px" centerText="Types" />
                        </div>
                        <p className="text-center small text-muted mt-2">Distribution by Purpose</p>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="bg-white p-4 rounded shadow-sm h-100">
                        <h6 className="fw-bold mb-4">Monthly Disbursement Trend</h6>
                        <SimpleBarChart data={monthlyDisbursement} height="280px" />
                    </div>
                </div>
            </div>

            {/* Loan Requests Table */}
            <div className="bg-white rounded shadow-sm p-4">
                <h5 className="fw-bold mb-3">Recent Loan Requests</h5>
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="border-0 small fw-bold text-secondary">ID</th>
                                <th className="border-0 small fw-bold text-secondary">Employee</th>
                                <th className="border-0 small fw-bold text-secondary">Amount</th>
                                <th className="border-0 small fw-bold text-secondary">Type</th>
                                <th className="border-0 small fw-bold text-secondary">Status</th>
                                <th className="border-0 small fw-bold text-secondary">EMI</th>
                                <th className="border-0 small fw-bold text-secondary text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map(loan => (
                                <tr key={loan.id}>
                                    <td className="text-muted">#{loan.id}</td>
                                    <td className="fw-bold">{loan.employee}</td>
                                    <td>{loan.amount}</td>
                                    <td>{loan.type}</td>
                                    <td>
                                        <span className={`badge ${loan.status === 'Active' ? 'bg-primary' :
                                            loan.status === 'Approved' ? 'bg-success' :
                                                loan.status === 'Paid' ? 'bg-secondary' :
                                                    'bg-warning'
                                            }`}>{loan.status}</span>
                                    </td>
                                    <td>{loan.emi}</td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-outline-primary border-0 fw-bold">View</button>
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

const Loans = () => {
    return (
        <DashboardLayout title="Loan Management">
            <LoansContent />
        </DashboardLayout>
    );
};

export default Loans;

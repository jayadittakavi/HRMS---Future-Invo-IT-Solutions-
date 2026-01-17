import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../components/DashboardLayout.css';

export const PayrollContent = () => {
    // Mock Data
    const payrolls = [
        { id: 1, employee: 'Meera Krishnan', period: 'May 2024', gross: '₹85,000', deductions: '₹5,000', net: '₹80,000', status: 'Paid' },
        { id: 2, employee: 'John Doe', period: 'May 2024', gross: '₹92,000', deductions: '₹6,000', net: '₹86,000', status: 'Processed' },
        { id: 3, employee: 'Sarah Smith', period: 'May 2024', gross: '₹75,000', deductions: '₹4,500', net: '₹70,500', status: 'Pending' },
    ];

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Payroll Management</h5>
                    <p className="text-secondary small mb-0">Manage employee salaries and payslips</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill">
                    + Run Payroll
                </button>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Pay Period</th>
                                <th>Gross Pay</th>
                                <th>Deductions</th>
                                <th>Net Pay</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrolls.map((payroll) => (
                                <tr key={payroll.id}>
                                    <td>
                                        <span className="fw-bold text-dark">{payroll.employee}</span>
                                    </td>
                                    <td>{payroll.period}</td>
                                    <td>{payroll.gross}</td>
                                    <td>{payroll.deductions}</td>
                                    <td>
                                        <span className="fw-bold text-dark">{payroll.net}</span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${payroll.status === 'Paid' ? 'bg-success text-white' : payroll.status === 'Pending' ? 'bg-warning text-dark' : 'bg-info text-dark'}`} style={{ fontSize: '0.7rem' }}>
                                            {payroll.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn edit">View</button>
                                        <button className="action-btn delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

const Payroll = () => {
    return (
        <DashboardLayout title="">
            <PayrollContent />
        </DashboardLayout>
    );
};

export default Payroll;

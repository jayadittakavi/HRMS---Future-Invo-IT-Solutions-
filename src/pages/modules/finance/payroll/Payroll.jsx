import React from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { SimpleBarChart, SimpleDonutChart, SimpleLineChart } from '../../../../components/charts/CustomCharts';
import "../../../../components/layout/DashboardLayout.css";

export const PayrollContent = ({ personal = false }) => {
    // Mock Data - Admin
    const adminPayrolls = [
        { id: 1, employee: 'Meera Krishnan', period: 'May 2024', gross: '₹85,000', deductions: '₹5,000', net: '₹80,000', status: 'Paid' },
        { id: 2, employee: 'John Doe', period: 'May 2024', gross: '₹92,000', deductions: '₹6,000', net: '₹86,000', status: 'Processed' },
        { id: 3, employee: 'Sarah Smith', period: 'May 2024', gross: '₹75,000', deductions: '₹4,500', net: '₹70,500', status: 'Pending' },
    ];

    // Mock Data - Personal
    const personalPayrolls = [
        { id: 101, period: 'May 2024', gross: '₹45,000', deductions: '₹2,500', net: '₹42,500', status: 'Paid' },
        { id: 102, period: 'April 2024', gross: '₹45,000', deductions: '₹2,500', net: '₹42,500', status: 'Paid' },
        { id: 103, period: 'March 2024', gross: '₹42,000', deductions: '₹2,000', net: '₹40,000', status: 'Paid' },
    ];

    const payrolls = personal ? personalPayrolls : adminPayrolls;

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">{personal ? 'My Payslips' : 'Payroll Management'}</h5>
                    <p className="text-secondary small mb-0">{personal ? 'View and download your monthly payslips' : 'Manage employee salaries and payslips'}</p>
                </div>
                {!personal && (
                    <button className="btn btn-primary btn-sm px-3 rounded-pill">
                        + Run Payroll
                    </button>
                )}
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                {!personal && <th>Employee Name</th>}
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
                                    {!personal && (
                                        <td>
                                            <span className="fw-bold text-dark">{payroll.employee}</span>
                                        </td>
                                    )}
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
                                        {personal ? (
                                            <button className="btn btn-sm btn-outline-dark" style={{ fontSize: '0.8rem' }}>Download</button>
                                        ) : (
                                            <>
                                                <button className="action-btn edit" title="View"><FaEye /></button>
                                                <button className="action-btn delete" title="Delete"><FaTrash /></button>
                                            </>
                                        )}
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

const Payroll = ({ personal = false }) => {
    return (
        <DashboardLayout title={personal ? "My Payslips" : "Payroll Management"}>
            <PayrollContent personal={personal} />
        </DashboardLayout>
    );
};

export default Payroll;

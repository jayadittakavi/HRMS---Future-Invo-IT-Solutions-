import React, { useState } from 'react';
import { FaFileDownload, FaChartBar, FaFilter } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';

const ReportsUI = () => {
    const [selectedReport, setSelectedReport] = useState('salary');
    const [selectedMonth, setSelectedMonth] = useState('February 2026');

    // Department-wise salary data
    const departmentSalaryData = {
        labels: ['Engineering', 'Sales', 'HR', 'Marketing', 'Operations'],
        datasets: [
            {
                label: 'Total Salary (₹ Lakhs)',
                data: [25, 18, 12, 10, 8],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ]
            }
        ]
    };

    // Tax deduction data
    const taxData = {
        labels: ['Income Tax', 'PF', 'ESI', 'Professional Tax', 'Other'],
        datasets: [
            {
                data: [40, 25, 15, 10, 10],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
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

    const reports = [
        { id: 'salary', name: 'Salary Report', description: 'Department-wise salary breakdown' },
        { id: 'tax', name: 'Tax Deduction Report', description: 'Tax and deduction analysis' },
        { id: 'statutory', name: 'Statutory Report', description: 'PF, ESI compliance report' },
        { id: 'payslip', name: 'Payslip Summary', description: 'Monthly payslip summary' }
    ];

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Payroll Reports</h5>
                    <p className="text-muted small mb-0">Generate and download payroll reports</p>
                </div>
                <div className="d-flex gap-2">
                    <select className="form-select form-select-sm" style={{ width: 'auto' }} value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                        <option>February 2026</option>
                        <option>January 2026</option>
                        <option>December 2025</option>
                    </select>
                    <button className="btn btn-primary btn-sm rounded-pill px-3">
                        <FaFileDownload className="me-2" />
                        Export All
                    </button>
                </div>
            </div>

            {/* Report Types */}
            <div className="row g-4 mb-4">
                {reports.map(report => (
                    <div className="col-md-6" key={report.id}>
                        <div
                            className={`card border-0 shadow-sm h-100 ${selectedReport === report.id ? 'border-primary border-2' : ''}`}
                            style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                            onClick={() => setSelectedReport(report.id)}
                        >
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">{report.name}</h6>
                                        <p className="text-muted small mb-0">{report.description}</p>
                                    </div>
                                    <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-2">
                                        <FaChartBar size={20} />
                                    </div>
                                </div>
                                <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                                    <FaFileDownload className="me-2" size={12} />
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="row g-4">
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="fw-bold mb-0">Department-wise Salary Distribution</h6>
                                <button className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                                    <FaFilter className="me-2" size={12} />
                                    Filter
                                </button>
                            </div>
                            <div style={{ height: '350px' }}>
                                <Bar data={departmentSalaryData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="fw-bold mb-3">Tax & Deduction Breakdown</h6>
                            <div style={{ height: '350px' }}>
                                <Pie data={taxData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Table */}
            <div className="card border-0 shadow-sm mt-4">
                <div className="card-body">
                    <h6 className="fw-bold mb-3">Monthly Summary</h6>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Department</th>
                                    <th className="border-0 py-3">Employees</th>
                                    <th className="border-0 py-3">Total Salary</th>
                                    <th className="border-0 py-3">Total Deductions</th>
                                    <th className="border-0 py-3">Net Payable</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 fw-bold text-dark">Engineering</td>
                                    <td className="text-secondary">45</td>
                                    <td className="text-primary">₹25,00,000</td>
                                    <td className="text-danger">₹2,50,000</td>
                                    <td className="fw-bold text-success">₹22,50,000</td>
                                </tr>
                                <tr>
                                    <td className="px-4 fw-bold text-dark">Sales</td>
                                    <td className="text-secondary">35</td>
                                    <td className="text-primary">₹18,00,000</td>
                                    <td className="text-danger">₹1,80,000</td>
                                    <td className="fw-bold text-success">₹16,20,000</td>
                                </tr>
                                <tr>
                                    <td className="px-4 fw-bold text-dark">HR</td>
                                    <td className="text-secondary">20</td>
                                    <td className="text-primary">₹12,00,000</td>
                                    <td className="text-danger">₹1,20,000</td>
                                    <td className="fw-bold text-success">₹10,80,000</td>
                                </tr>
                                <tr>
                                    <td className="px-4 fw-bold text-dark">Marketing</td>
                                    <td className="text-secondary">25</td>
                                    <td className="text-primary">₹10,00,000</td>
                                    <td className="text-danger">₹1,00,000</td>
                                    <td className="fw-bold text-success">₹9,00,000</td>
                                </tr>
                                <tr className="bg-light">
                                    <td className="px-4 fw-bold text-dark">Total</td>
                                    <td className="fw-bold">125</td>
                                    <td className="fw-bold text-primary">₹65,00,000</td>
                                    <td className="fw-bold text-danger">₹6,50,000</td>
                                    <td className="fw-bold text-success">₹58,50,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsUI;

import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { FaChartBar, FaChartPie, FaUsers, FaUserPlus, FaUserMinus, FaChartLine } from 'react-icons/fa';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const HRReportsContent = () => {
    const [timePeriod, setTimePeriod] = useState('This Month');

    // Data for different time periods
    const reportData = {
        'This Month': {
            headcount: { value: 142, change: '+5% from last month', trend: 'success' },
            newHires: { value: 12, target: 'Target: 15' },
            attrition: { value: '2.4%', change: '-0.5% decrease', trend: 'success' },
            avgTenure: { value: '2.8 Yrs', status: 'Consistent' }
        },
        'Last Quarter': {
            headcount: { value: 138, change: '+8% from previous quarter', trend: 'success' },
            newHires: { value: 35, target: 'Target: 40' },
            attrition: { value: '3.1%', change: '+0.3% increase', trend: 'danger' },
            avgTenure: { value: '2.6 Yrs', status: 'Improving' }
        },
        'Yearly': {
            headcount: { value: 142, change: '+15% from last year', trend: 'success' },
            newHires: { value: 48, target: 'Target: 60' },
            attrition: { value: '2.8%', change: '-1.2% decrease', trend: 'success' },
            avgTenure: { value: '3.1 Yrs', status: 'Strong' }
        }
    };

    const currentData = reportData[timePeriod];

    // Chart data based on time period
    const getLineChartData = () => {
        const datasets = {
            'This Month': {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                hiring: [8, 12, 10, 15, 11, 12],
                attrition: [5, 3, 4, 2, 3, 4]
            },
            'Last Quarter': {
                labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'],
                hiring: [32, 38, 35, 35],
                attrition: [12, 10, 15, 11]
            },
            'Yearly': {
                labels: ['2022', '2023', '2024'],
                hiring: [120, 135, 148],
                attrition: [45, 38, 42]
            }
        };

        const data = datasets[timePeriod];

        return {
            labels: data.labels,
            datasets: [
                {
                    label: 'New Hires',
                    data: data.hiring,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Attrition',
                    data: data.attrition,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.4,
                    fill: true
                }
            ]
        };
    };

    const pieChartData = {
        labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Operations'],
        datasets: [
            {
                label: 'Employees',
                data: [45, 28, 18, 12, 39],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 2
            }
        ]
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            }
        }
    };

    const handlePeriodChange = (e) => {
        setTimePeriod(e.target.value);
    };

    return (
        <div className="reports-content p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">HR Reports & Analytics</h5>
                    <p className="text-secondary small mb-0">Key metrics and insights for HR</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm">Export PDF</button>
                    <select
                        className="form-select form-select-sm"
                        style={{ width: '140px' }}
                        value={timePeriod}
                        onChange={handlePeriodChange}
                    >
                        <option>This Month</option>
                        <option>Last Quarter</option>
                        <option>Yearly</option>
                    </select>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="text-secondary small fw-bold">Total Headcount</div>
                            <FaUsers className="text-primary" />
                        </div>
                        <h2 className="mb-0 fw-bold">{currentData.headcount.value}</h2>
                        <div className={`text-${currentData.headcount.trend} small mt-2`}>
                            {currentData.headcount.change}
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="text-secondary small fw-bold">New Hires</div>
                            <FaUserPlus className="text-success" />
                        </div>
                        <h2 className="mb-0 fw-bold">{currentData.newHires.value}</h2>
                        <div className="text-muted small mt-2">{currentData.newHires.target}</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="text-secondary small fw-bold">Attrition Rate</div>
                            <FaUserMinus className="text-danger" />
                        </div>
                        <h2 className="mb-0 fw-bold">{currentData.attrition.value}</h2>
                        <div className={`text-${currentData.attrition.trend} small mt-2`}>
                            {currentData.attrition.change}
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="text-secondary small fw-bold">Avg Tenure</div>
                            <FaChartBar className="text-warning" />
                        </div>
                        <h2 className="mb-0 fw-bold">{currentData.avgTenure.value}</h2>
                        <div className="text-muted small mt-2">{currentData.avgTenure.status}</div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white py-3">
                            <h6 className="fw-bold mb-0">
                                Hiring vs Attrition ({timePeriod === 'This Month' ? 'Last 6 Months' : timePeriod === 'Last Quarter' ? 'Last 4 Quarters' : 'Last 3 Years'})
                            </h6>
                        </div>
                        <div className="card-body" style={{ height: '300px', padding: '20px' }}>
                            <Line data={getLineChartData()} options={lineChartOptions} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white py-3">
                            <h6 className="fw-bold mb-0">Department Distribution</h6>
                        </div>
                        <div className="card-body" style={{ height: '300px', padding: '20px' }}>
                            <Pie data={pieChartData} options={pieChartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HRReports = () => (
    <DashboardLayout title="">
        <HRReportsContent />
    </DashboardLayout>
);

export default HRReports;

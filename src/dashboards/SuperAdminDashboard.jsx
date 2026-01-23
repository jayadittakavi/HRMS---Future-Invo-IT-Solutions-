import DashboardLayout from '../components/DashboardLayout';
import '../components/DashboardLayout.css';
import { CompaniesContent } from '../pages/companies/Companies';
import { BranchesContent } from '../pages/branches/Branches';
import { DepartmentsContent } from '../pages/departments/Departments';
import { AssetsContent } from '../pages/assets/Assets';
import { AssetCategoriesContent } from '../pages/assets/AssetCategories';
import { EmployeesContent } from '../pages/employees/Employees';
import { PayrollContent } from '../pages/payroll/Payroll';
import { FinancialYearContent } from '../pages/financial_year/FinancialYear';
import { LeaveManagementContent } from '../pages/leave_management/LeaveManagement';
import { UserManagementContent } from '../pages/user_management/UserManagement';
import { PayGradeContent } from '../pages/pay_grade/PayGrade';
import { SimpleBarChart, SimpleDonutChart, SimpleLineChart, SimpleAreaChart } from '../components/charts/CustomCharts';
import React, { useState } from 'react';
import superAdminBg from '../assets/images/superadmin_bg.jpg';
import { FaWallet, FaUsers, FaClipboardList, FaFileInvoiceDollar, FaChartLine, FaRegCalendarAlt } from 'react-icons/fa';

const SuperAdminDashboard = () => {
    const [activeView, setActiveView] = useState('dashboard');

    const handleNavigate = (path) => {
        const view = path.replace('/', '');
        setActiveView(view || 'dashboard');
    };
    // Custom Chart Data
    const chartData = [
        { label: 'Net Pay', value: 80, color: '#3b82f6' },
        { label: 'Taxes', value: 65, color: '#10b981' },
        { label: 'Statutories', value: 45, color: '#f59e0b' },
        { label: 'Deductions', value: 55, color: '#ef4444' },
        { label: 'Others', value: 30, color: '#8b5cf6' }
    ];

    const deductionData = [
        { label: 'EPF', value: 39, color: '#10b981' },
        { label: 'ESI', value: 15, color: '#f59e0b' },
        { label: 'TDS', value: 46, color: '#ef4444' }
    ];

    const revenueData = [120, 135, 125, 145, 160, 155, 170, 180];

    // Calendar Generation Helper
    const renderCalendarDays = () => {
        const days = [];
        // Just for Jan 2026 (Starting roughly on Thursday for example logic)
        // Let's assume Jan 1 2026 is Thursday.
        const startingEmpty = 4; // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu
        const totalDays = 31;

        // Empty slots
        for (let i = 0; i < startingEmpty; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Days
        for (let i = 1; i <= totalDays; i++) {
            const isActive = i === 17; // Highlight 17th as per image
            days.push(
                <div key={i} className={`calendar-day ${isActive ? 'active' : ''}`}>
                    {i}
                </div>
            );
        }
        return days;
    };

    return (
        <DashboardLayout title="" onNavigate={handleNavigate} bgImage={superAdminBg}>
            <div className="container-fluid p-0">
                {activeView === 'dashboard' && (
                    <>
                        {/* Welcome Section */}
                        <div className="d-flex justify-content-between align-items-end mb-4">
                            <div>
                                <h2 className="h4 fw-bold text-dark mb-1">Dashboard Overview</h2>
                                <p className="text-secondary small mb-0">Welcome back, Meera Krishnan</p>
                            </div>
                        </div>

                        {/* Top Stats Row - 4 Cards */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-3">
                                <div className="dashboard-card h-100 border-0 shadow-sm">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <p className="mb-0 text-muted small fw-bold text-uppercase tracking-wide">Total Workforce</p>
                                            <h3 className="mb-0 text-dark fw-bold mt-1">1,308</h3>
                                        </div>
                                        <div className="icon-container icon-blue">
                                            <FaUsers />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="badge badge-soft-success me-2">
                                            <span className="fw-bold">+12%</span>
                                        </span>
                                        <span className="text-secondary small">vs last month</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dashboard-card h-100 border-0 shadow-sm">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <p className="mb-0 text-muted small fw-bold text-uppercase tracking-wide">Total Payroll</p>
                                            <h3 className="mb-0 text-dark fw-bold mt-1">₹17.2 Cr</h3>
                                        </div>
                                        <div className="icon-container icon-purple">
                                            <FaWallet />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="badge badge-soft-info me-2">May 2024</span>
                                        <span className="text-secondary small">Processed</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dashboard-card h-100 border-0 shadow-sm">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <p className="mb-0 text-muted small fw-bold text-uppercase tracking-wide">Deductions</p>
                                            <h3 className="mb-0 text-dark fw-bold mt-1">₹1.55 Cr</h3>
                                        </div>
                                        <div className="icon-container icon-orange">
                                            <FaFileInvoiceDollar />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="badge badge-soft-warning me-2">Pending</span>
                                        <span className="text-secondary small">Review Needed</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dashboard-card h-100 border-0 shadow-sm">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <p className="mb-0 text-muted small fw-bold text-uppercase tracking-wide">Pending Actions</p>
                                            <h3 className="mb-0 text-dark fw-bold mt-1">24</h3>
                                        </div>
                                        <div className="icon-container icon-green">
                                            <FaClipboardList />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span className="badge badge-soft-danger me-2">3 Urgent</span>
                                        <span className="text-secondary small">Requires Attention</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area: Charts */}
                        <div className="row g-4 mb-4">
                            {/* Primary Chart */}
                            <div className="col-md-8">
                                <div className="dashboard-card h-100">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h6 className="dashboard-card-title mb-0">Payroll Trend (This Year)</h6>
                                        <select className="form-select form-select-sm w-auto border-0 bg-light">
                                            <option>2024</option>
                                            <option>2023</option>
                                        </select>
                                    </div>
                                    <SimpleBarChart data={chartData} height="300px" />
                                </div>
                            </div>

                            {/* Secondary Chart */}
                            <div className="col-md-4">
                                <div className="dashboard-card h-100">
                                    <h6 className="dashboard-card-title mb-4">Deductions Breakdown</h6>
                                    <div className="py-2 d-flex justify-content-center">
                                        <SimpleDonutChart segments={deductionData} size="220px" centerText="Total" />
                                    </div>
                                    <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                                        {deductionData.map((item, idx) => (
                                            <div key={idx} className="d-flex align-items-center gap-2">
                                                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }}></span>
                                                <span className="small text-secondary fw-medium">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Revenue & Calendar Row */}
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="dashboard-card h-100">
                                    <h6 className="dashboard-card-title mb-4">Revenue Growth</h6>
                                    <SimpleLineChart data={revenueData} height="250px" color="#10b981" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="dashboard-card h-100">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="fw-bold text-dark mb-0">January 2026</h6>
                                        <div className="d-flex gap-1">
                                            <button className="btn btn-sm btn-light border px-2 py-0">&lt;</button>
                                            <button className="btn btn-sm btn-light border px-2 py-0">&gt;</button>
                                        </div>
                                    </div>
                                    <div className="calendar-grid">
                                        <div className="calendar-header-day text-uppercase text-secondary small">S</div>
                                        <div className="calendar-header-day text-uppercase text-secondary small">M</div>
                                        <div className="calendar-header-day text-uppercase text-secondary small">T</div>
                                        <div className="calendar-header-day text-uppercase text-secondary small">W</div>
                                        <div className="calendar-header-day text-uppercase text-secondary small">T</div>
                                        <div className="calendar-header-day text-uppercase text-secondary small">F</div>
                                        <div className="calendar-header-day text-uppercase text-secondary small">S</div>
                                        {renderCalendarDays()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeView === 'companies' && <CompaniesContent />}
                {activeView === 'branches' && <BranchesContent />}
                {activeView === 'departments' && <DepartmentsContent />}
                {activeView === 'assets' && <AssetsContent />}
                {activeView === 'asset-categories' && <AssetCategoriesContent />}
                {activeView === 'employees' && <EmployeesContent />}
                {activeView === 'payroll' && <PayrollContent />}
                {activeView === 'financial-year' && <FinancialYearContent />}
                {activeView === 'leave-management' && <LeaveManagementContent />}
                {activeView === 'users' && <UserManagementContent />}
                {activeView === 'pay-grade' && <PayGradeContent />}
            </div>
        </DashboardLayout>
    );
};

export default SuperAdminDashboard;

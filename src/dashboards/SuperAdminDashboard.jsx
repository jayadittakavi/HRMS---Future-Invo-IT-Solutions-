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
import { FaWallet, FaUsers, FaClipboardList, FaFileInvoiceDollar, FaChartLine } from 'react-icons/fa';

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
        <DashboardLayout title="" onNavigate={handleNavigate}>
            <div className="container-fluid p-0">
                {activeView === 'dashboard' && (
                    <>
                        {/* Welcome & Status Section */}
                        <div className="mb-4">
                            <h2 className="h4 fw-bold text-dark mb-1">Welcome Meera Krishnan!</h2>
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-secondary fw-medium">Process Pay Run for May 2024</span>
                                <span className="badge bg-warning text-dark fw-bold px-3">APPROVED</span>
                            </div>
                        </div>

                        {/* Stats Row 1 */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="dashboard-card bg-gradient-purple">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="rounded-3 p-3 me-3">
                                            <FaWallet size={24} />
                                        </div>
                                        <div>
                                            <h6 className="dashboard-card-title mb-1">Employees Net Pay</h6>
                                            <h3 className="dashboard-value mb-0">₹17.25 Cr</h3>
                                        </div>
                                    </div>
                                    <p className="small mt-1 mb-0">Pay Date: <span className="fw-bold">31 May 2024</span></p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card bg-gradient-orange">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="rounded-3 p-3 me-3">
                                            <FaUsers size={24} />
                                        </div>
                                        <div>
                                            <h6 className="dashboard-card-title mb-1">No. of Employees</h6>
                                            <h3 className="dashboard-value mb-0">1308</h3>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="small fw-bold">↑ 12 New Joined</span>
                                        <button className="btn btn-sm btn-light text-primary rounded-pill px-3 fw-bold">View All</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card bg-gradient-green">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="rounded-3 p-3 me-3">
                                            <FaClipboardList size={24} />
                                        </div>
                                        <div>
                                            <h6 className="dashboard-card-title mb-1">Action Items</h6>
                                            <h3 className="dashboard-value mb-0">3 Pending</h3>
                                        </div>
                                    </div>
                                    <ul className="list-unstyled small mb-0">
                                        <li className="mb-1 d-flex align-items-center"><span className="badge bg-white text-success me-2 rounded-pill" style={{ width: '8px', height: '8px', padding: 0 }}> </span>136 Reimbursements</li>
                                        <li className="mb-0 d-flex align-items-center"><span className="badge bg-warning text-dark me-2 rounded-pill" style={{ width: '8px', height: '8px', padding: 0 }}> </span>55 Salary Revisions</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Stats Row 2 */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Deduction Summary</h6>
                                    <div className="text-secondary small">
                                        <div className="mb-1">EPF: ₹39,73,913</div>
                                        <div className="mb-1">ESI: ₹891,010</div>
                                        <div className="mb-0">TDS: ₹1,15,89,089</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Employee Summary</h6>
                                    <h3 className="dashboard-value">1308</h3>
                                    <p className="text-secondary small mb-0">Active Employees</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Payment Updates</h6>
                                    <ul className="list-unstyled text-secondary small mb-0">
                                        <li className="mb-1">✓ Salary Processed</li>
                                        <li className="mb-1">✓ Tax Calculated</li>
                                        <li>✓ Payslips Generated</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Charts Row 1 */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-8">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Payroll Cost Summary (This Year)</h6>
                                    <SimpleBarChart data={chartData} height="320px" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="dashboard-card-title mb-0">Deductions Breakdown</h6>
                                    </div>
                                    <div className="py-2 d-flex justify-content-center">
                                        <SimpleDonutChart segments={deductionData} size="200px" centerText="Total" />
                                    </div>
                                    <div className="text-center mt-3 small text-secondary">
                                        {deductionData.map((item, idx) => (
                                            <span key={idx} className="fw-bold me-2" style={{ color: item.color }}>● {item.label}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Charts Row 2 & Calendar */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-8">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Revenue Trend (2024)</h6>
                                    <div className="py-2">
                                        <SimpleLineChart data={revenueData} height="280px" color="#10b981" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="fw-bold text-dark mb-0">January 2026 Calendar</h6>
                                        <div>
                                            <button className="btn btn-sm btn-light border me-1 px-2 py-0">&lt;</button>
                                            <button className="btn btn-sm btn-primary px-2 py-0">&gt;</button>
                                        </div>
                                    </div>
                                    <div className="calendar-grid">
                                        <div className="calendar-header-day">Sun</div>
                                        <div className="calendar-header-day">Mon</div>
                                        <div className="calendar-header-day">Tue</div>
                                        <div className="calendar-header-day">Wed</div>
                                        <div className="calendar-header-day">Thu</div>
                                        <div className="calendar-header-day">Fri</div>
                                        <div className="calendar-header-day">Sat</div>
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

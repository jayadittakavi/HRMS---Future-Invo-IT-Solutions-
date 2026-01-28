import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { SimpleBarChart, SimpleDonutChart, SimpleLineChart } from '../components/charts/CustomCharts';
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
import { useAuth } from '../context/AuthContext';
import { FaUsers, FaMoneyBillWave, FaUserClock, FaTasks } from 'react-icons/fa';
import BranchMap from '../components/BranchMap';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('dashboard');

    const handleNavigate = (path) => {
        const view = path.replace('/', '');
        setActiveView(view || 'dashboard');
    };

    // Data for Charts
    const payrollData = [
        { label: 'Jan', value: 40, color: '#3b82f6' },
        { label: 'Feb', value: 45, color: '#10b981' },
        { label: 'Mar', value: 42, color: '#f59e0b' },
        { label: 'Apr', value: 48, color: '#ef4444' },
        { label: 'May', value: 47, color: '#8b5cf6' },
        { label: 'Jun', value: 60, color: '#06b6d4' },
    ];

    const employeeDistribution = [
        { label: 'Active', value: 350, color: '#10b981' },
        { label: 'Leave', value: 30, color: '#f59e0b' },
        { label: 'Remote', value: 120, color: '#3b82f6' }
    ];

    const revenueGrowthData = [65, 78, 72, 85, 90, 95];

    return (
        <DashboardLayout title="" onNavigate={handleNavigate}>
            <div className="container-fluid p-0">
                {activeView === 'dashboard' && (
                    <>
                        {/* Welcome Header */}
                        <div className="mb-4">
                            <h2 className="h4 fw-bold text-dark mb-1">Welcome {user?.name || 'Admin'}!</h2>
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-secondary fw-medium">System status:</span>
                                <span className="badge bg-success text-white fw-bold">OPERATIONAL</span>
                            </div>
                        </div>

                        {/* Top Cards Row */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-3">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaUsers /> Total Employees
                                    </h6>
                                    <h3 className="dashboard-value">500</h3>
                                    <p className="small mb-0 fw-bold">↑ 2.5% vs last month</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaMoneyBillWave /> Total Payroll
                                    </h6>
                                    <h3 className="dashboard-value">$280k</h3>
                                    <p className="small mb-0">Processed successfully</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaUserClock /> On Leave
                                    </h6>
                                    <h3 className="dashboard-value">12</h3>
                                    <p className="small mb-0">Approved requests</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaTasks /> Open Tasks
                                    </h6>
                                    <h3 className="dashboard-value">24</h3>
                                    <p className="small mb-0 fw-bold">Requires attention</p>
                                </div>
                            </div>
                        </div>

                        {/* Charts Row 1 */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-8">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Payroll Summary (6 Months)</h6>
                                    <SimpleBarChart data={payrollData} height="320px" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card h-100">
                                    <h6 className="dashboard-card-title">Employee Dist.</h6>
                                    <div className="py-3 d-flex justify-content-center">
                                        <SimpleDonutChart segments={employeeDistribution} size="200px" centerText="Total" />
                                    </div>
                                    <div className="text-center mt-3 small text-secondary">
                                        {employeeDistribution.map((item, idx) => (
                                            <span key={idx} className="fw-bold me-2" style={{ color: item.color }}>● {item.label}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Charts Row 2 */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-12">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Revenue Growth</h6>
                                    <div className="py-4">
                                        <SimpleLineChart data={revenueGrowthData} height="280px" color="#10b981" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Row */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-12">
                                <BranchMap />
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

export default AdminDashboard;

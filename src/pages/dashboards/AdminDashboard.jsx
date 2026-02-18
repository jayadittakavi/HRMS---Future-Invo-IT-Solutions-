import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { EmployeesContent } from '../modules/hr/employees/Employees';
import { AttendanceContent } from '../attendance/Attendance';
import { DailyTaskContent } from '../modules/operations/daily_task/DailyTask';
import { LoansContent } from '../modules/finance/loans/Loans';
import { TravelExpensesContent } from '../modules/finance/travel_expenses/TravelExpenses';

import { LeaveManagementContent } from '../modules/hr/leave_management/LeaveManagement';

import { PayrollContent } from '../modules/finance/payroll/Payroll';
import { FinancialYearContent } from '../modules/finance/financial_year/FinancialYear';
import { UserManagementContent } from '../modules/core/user_management/UserManagement';
import { PayGradeContent } from '../modules/finance/pay_grade/PayGrade';
import { ProfileContent } from '../modules/hr/profile/Profile';
import { CompaniesContent } from '../modules/core/companies/Companies';
import { BranchesContent } from '../modules/core/branches/Branches';
import { DepartmentsContent } from '../modules/core/departments/Departments';
import { AssetsContent } from '../modules/operations/assets/Assets';
import { AssetCategoriesContent } from '../modules/operations/assets/AssetCategories';
import '../../components/layout/DashboardLayout.css';
import OverallStats from './components/OverallStats';
import MySpace from './components/MySpace';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('dashboard');

    // Initialize dashboardType based on URL param 'tab'
    const tabParam = searchParams.get('tab');
    const [dashboardType, setDashboardType] = useState('overall');

    useEffect(() => {
        if (tabParam === 'myspace') {
            setDashboardType('myspace');
        } else {
            setDashboardType('overall');
        }
    }, [tabParam]);

    const handleNavigate = (path) => {
        const view = path.replace('/', '');
        setActiveView(view || 'dashboard');
    };

    return (
        <div className="container-fluid p-0">
            {activeView === 'dashboard' && (
                <>
                    {/* Welcome & Dashboard Toggle */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="h4 fw-bold text-main mb-1">Welcome {user?.name || 'Admin'}!</h2>
                            <p className="text-secondary small mb-0">Here's what's happening today.</p>
                        </div>
                        <div className="bg-light p-1 rounded-pill d-flex border">
                            <button
                                className={`btn btn-sm rounded-pill px-4 fw-bold ${dashboardType === 'overall' ? 'btn-white shadow-sm' : 'text-secondary border-0'}`}
                                onClick={() => navigate('/dashboard/admin')}
                            >
                                My Team
                            </button>
                            <button
                                className={`btn btn-sm rounded-pill px-4 fw-bold ${dashboardType === 'myspace' ? 'btn-white shadow-sm' : 'text-secondary border-0'}`}
                                onClick={() => navigate('/dashboard/admin?tab=myspace')}
                            >
                                My Space
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    {dashboardType === 'overall' ? <OverallStats /> : <MySpace role="Admin" onNavigate={handleNavigate} />}
                </>
            )}


            {activeView === 'daily-task' && <DailyTaskContent />}
            {activeView === 'loans' && <LoansContent />}
            {activeView === 'travel-expenses' && <TravelExpensesContent />}
            {activeView === 'attendance' && <AttendanceContent />}
            {activeView === 'companies' && <CompaniesContent />}
            {activeView === 'branches' && <BranchesContent />}
            {activeView === 'departments' && <DepartmentsContent />}
            {activeView === 'assets' && <AssetsContent />}
            {activeView === 'asset-categories' && <AssetCategoriesContent />}
            {activeView === 'employees' && <EmployeesContent />}
            {activeView === 'payroll' && <PayrollContent />}
            {activeView === 'financial-year' && <FinancialYearContent />}
            {activeView === 'leave-management' && <LeaveManagementContent />}
            {activeView === 'my-leaves' && <LeaveManagementContent personal={true} initialTab="dashboard" />}
            {activeView === 'request-leave' && <LeaveManagementContent personal={true} initialTab="apply" />}
            {activeView === 'leave-history' && <LeaveManagementContent personal={true} initialTab="history" />}
            {activeView === 'my-attendance' && <AttendanceContent personal={true} />}
            {activeView === 'users' && <UserManagementContent />}
            {activeView === 'pay-grade' && <PayGradeContent />}
            {activeView === 'profile' && <ProfileContent />}
        </div>
    );
};

export default AdminDashboard;

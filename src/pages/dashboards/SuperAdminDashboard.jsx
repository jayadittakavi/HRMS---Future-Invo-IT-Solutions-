import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { CompaniesContent } from '../modules/core/companies/Companies';
import { EmployeesContent } from '../modules/hr/employees/Employees';
import { DepartmentsContent } from '../modules/core/departments/Departments';
import { PayrollContent } from '../modules/finance/payroll/Payroll';
import { FinancialYearContent } from '../modules/finance/financial_year/FinancialYear';
import { LeaveManagementContent } from '../modules/hr/leave_management/LeaveManagement';
import { UserManagementContent } from '../modules/core/user_management/UserManagement';
import { AttendanceContent } from '../attendance/Attendance';
import { PayGradeContent } from '../modules/finance/pay_grade/PayGrade';
import { ProfileContent } from '../modules/hr/profile/Profile';
import { BranchesContent } from '../modules/core/branches/Branches';
import AuditLogs from '../superadmin/AuditLogs';
import '../../components/layout/DashboardLayout.css';
import OverallStats from './components/OverallStats';
import MySpace from './components/MySpace';
import { useSearchParams, useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('dashboard');

    // Initialize dashboardType based on URL param 'tab'
    // If ?tab=myspace, show My Space. Else show Overall.
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
                            <h2 className="h4 fw-bold text-main mb-1">Welcome {user?.name || 'Super Admin'}!</h2>
                            <p className="text-secondary small mb-0">Here's what's happening today.</p>
                        </div>
                        <div className="bg-light p-1 rounded-pill d-flex border">
                            <button
                                className={`btn btn-sm rounded-pill px-4 fw-bold ${dashboardType === 'overall' ? 'btn-white shadow-sm' : 'text-secondary border-0'}`}
                                onClick={() => navigate('/dashboard/super-admin')}
                            >
                                My Team
                            </button>
                            <button
                                className={`btn btn-sm rounded-pill px-4 fw-bold ${dashboardType === 'myspace' ? 'btn-white shadow-sm' : 'text-secondary border-0'}`}
                                onClick={() => navigate('/dashboard/super-admin?tab=myspace')}
                            >
                                My Space
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    {dashboardType === 'overall' ? <OverallStats /> : <MySpace role="Super Admin" onNavigate={handleNavigate} />}
                </>
            )}

            {activeView === 'companies' && <CompaniesContent />}
            {activeView === 'employees' && <EmployeesContent />}
            {activeView === 'departments' && <DepartmentsContent />}
            {activeView === 'branches' && <BranchesContent />}
            {activeView === 'payroll' && <PayrollContent />}
            {activeView === 'financial-year' && <FinancialYearContent />}
            {activeView === 'leave-management' && <LeaveManagementContent />}
            {activeView === 'users' && <UserManagementContent />}
            {activeView === 'attendance' && <AttendanceContent />}
            {activeView === 'pay-grade' && <PayGradeContent />}
            {activeView === 'profile' && <ProfileContent />}
            {activeView === 'audit-logs' && <AuditLogs role="superadmin" />}
        </div>
    );
};

export default SuperAdminDashboard;

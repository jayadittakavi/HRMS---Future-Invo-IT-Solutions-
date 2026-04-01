import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CompaniesContent } from '../modules/core/companies/Companies';
import { EmployeesContent } from '../modules/hr/employees/Employees';
import { DepartmentsContent } from '../modules/core/departments/Departments';
import { PayrollContent } from '../modules/finance/payroll/Payroll';
import { LeaveManagementContent } from '../modules/hr/leave_management/LeaveManagement';
import { UserManagementContent } from '../modules/core/user_management/UserManagement';
import { AttendanceContent } from '../attendance/Attendance';
import { ProfileContent } from '../modules/hr/profile/Profile';
import { BranchesContent } from '../modules/core/branches/Branches';
import { DelegationContent } from '../modules/administration/delegation/Delegation';
import { VisitorContent } from '../modules/administration/visitor/Visitor';
import { DeskManagementContent } from '../modules/administration/desk/DeskManagement';
import '../../components/layout/DashboardLayout.css';
import OverallStats from './components/OverallStats';
import MySpace from './components/MySpace';
import { AuditLogsContent } from '../../components/audit/AuditLogs'; // Corrected import
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
                    {/* Welcome & Dashboard Title */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="h4 fw-bold text-main mb-1">Welcome {user?.name || 'Super Admin'}!</h2>
                            <p className="text-secondary small mb-0">Here's what's happening today.</p>
                        </div>
                    </div>

                    {/* Dashboard Tabs */}
                    <div className="d-flex border-bottom mb-4 scroll-x-mobile">
                        <button
                            className={`btn border-0 py-2 px-4 rounded-0 fw-bold transition-all ${dashboardType === 'overall' ? 'text-primary border-bottom border-3 border-primary bg-light bg-opacity-50' : 'text-secondary'}`}
                            onClick={() => {
                                setDashboardType('overall');
                                navigate('/dashboard/super-admin?tab=overall');
                            }}
                        >
                            Overview
                        </button>
                        <button
                            className={`btn border-0 py-2 px-4 rounded-0 fw-bold transition-all ${dashboardType === 'myspace' ? 'text-primary border-bottom border-3 border-primary bg-light bg-opacity-50' : 'text-secondary'}`}
                            onClick={() => {
                                setDashboardType('myspace');
                                navigate('/dashboard/super-admin?tab=myspace');
                            }}
                        >
                            My Space
                        </button>
                    </div>

                    {dashboardType === 'overall' ? (
                        <OverallStats />
                    ) : (
                        <MySpace role="superadmin" onNavigate={handleNavigate} />
                    )}
                </>
            )}

            {activeView === 'companies' && <CompaniesContent />}
            {activeView === 'employees' && <EmployeesContent />}
            {activeView === 'departments' && <DepartmentsContent />}
            {activeView === 'branches' && <BranchesContent />}
            {activeView === 'payroll' && <PayrollContent />}
            {activeView === 'leave-management' && <LeaveManagementContent />}
            {activeView === 'users' && <UserManagementContent />}
            {activeView === 'attendance' && <AttendanceContent />}
            {activeView === 'profile' && <ProfileContent />}
            {activeView === 'audit-logs' && <AuditLogsContent role="superadmin" />}
            {activeView === 'delegation' && <DelegationContent />}
            {activeView === 'visitors' && <VisitorContent />}
            {activeView === 'desk-management' && <DeskManagementContent />}
            
            {/* My Space Sub-views */}
            {activeView === 'my-attendance' && <AttendanceContent personal={true} />}
            {activeView === 'my-leaves' && <LeaveManagementContent personal={true} initialTab="dashboard" />}
            {activeView === 'request-leave' && <LeaveManagementContent personal={true} initialTab="apply" />}
            {activeView === 'leave-history' && <LeaveManagementContent personal={true} initialTab="history" />}
            {activeView === 'my-payslips' && <PayrollContent personal={true} />}
        </div>
    );
};

export default SuperAdminDashboard;

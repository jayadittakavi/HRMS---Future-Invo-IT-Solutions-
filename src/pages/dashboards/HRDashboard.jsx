import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from "../../context/AuthContext";
import "../../components/layout/DashboardLayout.css";
import { EmployeesContent } from '../employees/Employees';
import { AttendanceContent } from '../attendance/Attendance';
import { ProfileContent } from '../modules/hr/profile/Profile';
import { OnboardingContent } from '../modules/hr/onboarding/Onboarding';
import { LeaveManagementContent } from '../modules/hr/leave_management/LeaveManagement';
import { RecruitmentContent } from '../modules/hr/recruitment/Recruitment';
import { DocumentsContent } from '../modules/hr/documents/Documents';
import { TrainingContent } from '../modules/hr/training/Training';
import { HRReportsContent } from '../modules/hr/reports/HRReports';
import HROverallStats from './components/HROverallStats';
import MySpace from './components/MySpace';
import { DelegationContent } from '../modules/administration/delegation/Delegation';
import { VisitorContent } from '../modules/administration/visitor/Visitor';
import { DeskManagementContent } from '../modules/administration/desk/DeskManagement';
import { useSearchParams, useNavigate } from 'react-router-dom';

const HRDashboard = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('dashboard');

    const handleNavigate = (path) => {
        const view = path.replace('/', '');
        setActiveView(view || 'dashboard');
    };

    return (
        <div className="container-fluid p-0">
            {activeView === 'dashboard' && (
                <>
                    {/* Welcome Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="h4 fw-bold text-dark mb-1">Welcome {user?.firstName} {user?.lastName}!</h2>
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-secondary fw-medium">Recruitment Status:</span>
                                <span className="badge bg-danger text-white fw-bold">URGENT HIRING</span>
                            </div>
                        </div>
                    </div>

                    {/* Combined Dashboard View */}
                    <HROverallStats />
                    <div className="mt-5 pb-4">
                        <MySpace role="hr" compact={true} onNavigate={handleNavigate} />
                    </div>
                </>
            )}

            {activeView === 'employees' && <EmployeesContent />}
            {activeView === 'employee-directory' && <EmployeesContent />}
            {activeView === 'attendance' && <AttendanceContent />}
            {activeView === 'recruitment' && <RecruitmentContent />}
            {activeView === 'documents' && <DocumentsContent />}
            {activeView === 'training' && <TrainingContent />}
            {activeView === 'hr-reports' && <HRReportsContent />}
            {/* Note: Leave Management has its own internal toggle for Personal vs Management, 
                    but here we likely want the Management view by default for HR dash unless specifically in "My Space" context.
                    However, Sidebar links to /leave-requests which triggers 'leave-requests' view.
                */}
            {activeView === 'leave-management' && <LeaveManagementContent personal={false} initialTab="dashboard" />}
            {activeView === 'leave-requests' && <LeaveManagementContent personal={false} initialTab="pending" />}
            {activeView === 'my-attendance' && <AttendanceContent personal={true} />}
            {activeView === 'my-leaves' && <LeaveManagementContent personal={true} initialTab="dashboard" />}
            {activeView === 'request-leave' && <LeaveManagementContent personal={true} initialTab="apply" />}
            {activeView === 'leave-history' && <LeaveManagementContent personal={true} initialTab="history" />}
            {activeView === 'my-payslips' && <PayrollContent personal={true} />}
            {activeView === 'onboarding' && <OnboardingContent />}
            {activeView === 'delegation' && <DelegationContent />}
            {activeView === 'visitors' && <VisitorContent />}
            {activeView === 'desk-management' && <DeskManagementContent />}
            {activeView === 'profile' && <ProfileContent />}
        </div>
    );
};

export default HRDashboard;

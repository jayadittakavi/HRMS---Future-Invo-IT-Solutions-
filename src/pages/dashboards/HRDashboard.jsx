import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from "../../context/AuthContext";
import "../../components/layout/DashboardLayout.css";
import { EmployeesContent } from "../modules/hr/employees/Employees";
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
import { useSearchParams, useNavigate } from 'react-router-dom';

const HRDashboard = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('dashboard');

    // Determine view type from URL query param `tab` (e.g. ?tab=myspace)
    const tabParam = searchParams.get('tab');
    const [dashboardType, setDashboardType] = useState('overall'); // 'overall' or 'myspace'

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
                    {/* Welcome Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="h4 fw-bold text-dark mb-1">Welcome {user?.name || 'HR Specialist'}!</h2>
                            {dashboardType === 'overall' && (
                                <div className="d-flex align-items-center gap-2">
                                    <span className="text-secondary fw-medium">Recruitment Status:</span>
                                    <span className="badge bg-danger text-white fw-bold">URGENT HIRING</span>
                                </div>
                            )}
                        </div>

                        {/* Toggle Buttons */}
                        <div className="bg-light p-1 rounded-pill d-flex border">
                            <button
                                className={`btn btn-sm rounded-pill px-4 fw-bold ${dashboardType === 'overall' ? 'btn-white shadow-sm' : 'text-secondary border-0'}`}
                                onClick={() => navigate('/dashboard/hr')}
                            >
                                My Team
                            </button>
                            <button
                                className={`btn btn-sm rounded-pill px-4 fw-bold ${dashboardType === 'myspace' ? 'btn-white shadow-sm' : 'text-secondary border-0'}`}
                                onClick={() => navigate('/dashboard/hr?tab=myspace')}
                            >
                                My Space
                            </button>
                        </div>
                    </div>

                    {dashboardType === 'overall' ? <HROverallStats /> : <MySpace role="HR" onNavigate={handleNavigate} />}
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
            {activeView === 'my-leaves' && <LeaveManagementContent personal={true} initialTab="dashboard" />}
            {activeView === 'request-leave' && <LeaveManagementContent personal={true} initialTab="apply" />}
            {activeView === 'leave-history' && <LeaveManagementContent personal={true} initialTab="history" />}
            {activeView === 'my-attendance' && <AttendanceContent personal={true} />}
            {activeView === 'onboarding' && <OnboardingContent />}
            {activeView === 'profile' && <ProfileContent />}
        </div>
    );
};

export default HRDashboard;

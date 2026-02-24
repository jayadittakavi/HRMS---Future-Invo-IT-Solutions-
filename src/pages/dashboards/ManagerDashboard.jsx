import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Added useSearchParams
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ManagerOverallStats from './components/ManagerOverallStats';
import MySpace from './components/MySpace';

// Manager specific components
import TeamMembers from '../modules/manager/components/TeamMembers';
import DailyTask from '../modules/manager/components/DailyTask';
import Task from '../modules/manager/components/Task';
import AssetAllocation from '../modules/manager/components/AssetAllocation';
import TravelExpenses from '../modules/manager/components/TravelExpenses';
import ManagerAttendance from '../modules/manager/components/ManagerAttendance';
import ManagerMyAttendance from '../modules/manager/components/ManagerMyAttendance';
import { LeaveManagementContent } from '../modules/hr/leave_management/LeaveManagement';
import { DelegationContent } from '../modules/administration/delegation/Delegation';
import { VisitorContent } from '../modules/administration/visitor/Visitor';
import { DeskManagementContent } from '../modules/administration/desk/DeskManagement';

const ManagerDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // Get query params
    const activeTab = searchParams.get('tab');

    const [activeView, setActiveView] = useState('dashboard');
    const [dashboardType, setDashboardType] = useState('overall'); // 'overall' or 'myspace'

    // Sync dashboardType with query param
    useEffect(() => {
        if (activeTab === 'myspace') {
            setDashboardType('myspace');
        } else {
            setDashboardType('overall');
        }
    }, [activeTab]);

    const handleNavigate = (path) => {
        // Handle external dashboard navigation (e.g., HR, Employee)
        if (path.startsWith('/dashboard/') && !path.startsWith('/dashboard/manager')) {
            navigate(path);
            return;
        }

        // Handle navigation to self (Manager Dashboard) with potential query params
        if (path.startsWith('/dashboard/manager')) {
            navigate(path); // Update URL to reflect query params like ?tab=myspace
            setActiveView('dashboard'); // Ensure we are on the main dashboard view
            return;
        }

        // Handle other full paths that should be treated as internal views or standard navigation
        // If it starts with / and doesn't match above, usually it's an internal view for this dashboard layout
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
                            <h2 className="h4 fw-bold text-main mb-1">Welcome {user?.name || 'Manager'}!</h2>
                            <p className="text-secondary small mb-0">Here's what's happening today.</p>
                        </div>
                    </div>

                    <ManagerOverallStats onNavigate={handleNavigate} />
                </>
            )}


            {/* Placeholders for Manager Views */}
            {activeView === 'team-members' && <TeamMembers />}

            {activeView === 'daily-task' && <DailyTask />}
            {activeView === 'task' && <Task />}
            {activeView === 'asset-allocation' && <AssetAllocation />}
            {activeView === 'travel-expenses' && <TravelExpenses />}
            {activeView === 'leave-management' && <LeaveManagementContent personal={false} initialTab="dashboard" />}
            {activeView === 'my-leaves' && <LeaveManagementContent personal={true} initialTab="dashboard" />}
            {activeView === 'request-leave' && <LeaveManagementContent personal={true} initialTab="apply" />}
            {activeView === 'leave-history' && <LeaveManagementContent personal={true} initialTab="history" />}
            {activeView === 'attendance' && <ManagerAttendance />}
            {activeView === 'my-attendance' && <ManagerMyAttendance />}
            {activeView === 'delegation' && <DelegationContent />}
            {activeView === 'visitors' && <VisitorContent />}
            {activeView === 'desk-management' && <DeskManagementContent />}

        </div>
    );
};

export default ManagerDashboard;

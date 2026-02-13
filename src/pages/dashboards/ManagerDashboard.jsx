import React, { useState } from 'react';
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

const ManagerDashboard = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('dashboard');
    const [dashboardType, setDashboardType] = useState('overall'); // 'overall' or 'myspace'

    const handleNavigate = (path) => {
        const view = path.replace('/', '');
        setActiveView(view || 'dashboard');
    };

    return (
        <DashboardLayout title="" onNavigate={handleNavigate} activePath={`/${activeView}`}>
            <div className="container-fluid p-0">
                {activeView === 'dashboard' && (
                    <>
                        {/* Welcome & Dashboard Toggle */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h2 className="h4 fw-bold text-main mb-1">Welcome {user?.name || 'Manager'}!</h2>
                                <p className="text-secondary small mb-0">Here's what's happening today.</p>
                            </div>
                            <div className="bg-light p-1 rounded-pill d-flex border">
                                <button
                                    className={`btn btn-sm rounded-pill px-4 fw-bold ${dashboardType === 'overall' ? 'btn-white shadow-sm' : 'text-secondary border-0'}`}
                                    onClick={() => setDashboardType('overall')}
                                >
                                    My Team Overview
                                </button>
                                <button
                                    className={`btn btn-sm rounded-pill px-4 fw-bold ${dashboardType === 'myspace' ? 'btn-white shadow-sm' : 'text-secondary border-0'}`}
                                    onClick={() => setDashboardType('myspace')}
                                >
                                    My Space
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        {dashboardType === 'overall' ? <ManagerOverallStats onNavigate={handleNavigate} /> : <MySpace role="Manager" onNavigate={handleNavigate} />}
                    </>
                )}


                {/* Placeholders for Manager Views */}
                {activeView === 'team-members' && <TeamMembers />}

                {activeView === 'daily-task' && <DailyTask />}
                {activeView === 'task' && <Task />}
                {activeView === 'asset-allocation' && <AssetAllocation />}
                {activeView === 'travel-expenses' && <TravelExpenses />}
                {activeView === 'leave-management' && <LeaveManagementContent personal={false} />}
                {activeView === 'attendance' && <ManagerAttendance />}
                {activeView === 'my-attendance' && <ManagerMyAttendance />}

            </div>
        </DashboardLayout>
    );
};

export default ManagerDashboard;

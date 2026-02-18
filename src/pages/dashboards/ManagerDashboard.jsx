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
                    {/* Welcome & Dashboard Toggle */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="h4 fw-bold text-main mb-1">Welcome {user?.name || 'Manager'}!</h2>
                            <p className="text-secondary small mb-0">Here's what's happening today.</p>
                        </div>
                        <div className="bg-light p-1 rounded-pill d-flex border">
                            <button
                                className={`btn btn-sm rounded-pill px-4 fw-bold ${dashboardType === 'overall' ? 'btn-white shadow-sm' : 'text-secondary border-0'}`}
                                onClick={() => navigate('/dashboard/manager')}
                            >
                                My Team Overview
                            </button>

                            {/* Role Switcher Split Area */}
                            <div className={`d-flex align-items-center rounded-pill ${dashboardType === 'myspace' ? 'btn-white shadow-sm' : ''}`}>
                                <button
                                    className={`btn btn-sm rounded-pill px-3 fw-bold ${dashboardType === 'myspace' ? 'text-dark' : 'text-secondary border-0'}`}
                                    onClick={() => {
                                        setDashboardType('myspace'); // Optimistic update for instant feedback
                                        navigate('/dashboard/manager?tab=myspace');
                                    }}
                                >
                                    My Space
                                </button>
                                <div className="dropdown">
                                    <button
                                        className={`btn btn-sm rounded-pill px-2 fw-bold dropdown-toggle dropdown-toggle-split ${dashboardType === 'myspace' ? 'text-dark' : 'text-secondary border-0'}`}
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <span className="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg">
                                        <li><h6 className="dropdown-header small text-muted text-uppercase my-1">Switch View</h6></li>
                                        <li><button className="dropdown-item small fw-medium" onClick={() => navigate('/dashboard/hr')}>HR Dashboard</button></li>
                                        <li><button className="dropdown-item small fw-medium" onClick={() => navigate('/dashboard/employee')}>Employee Dashboard</button></li>
                                    </ul>
                                </div>
                            </div>
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
            {activeView === 'leave-management' && <LeaveManagementContent personal={false} initialTab="dashboard" />}
            {activeView === 'my-leaves' && <LeaveManagementContent personal={true} initialTab="dashboard" />}
            {activeView === 'request-leave' && <LeaveManagementContent personal={true} initialTab="apply" />}
            {activeView === 'leave-history' && <LeaveManagementContent personal={true} initialTab="history" />}
            {activeView === 'attendance' && <ManagerAttendance />}
            {activeView === 'my-attendance' && <ManagerMyAttendance />}

        </div>
    );
};

export default ManagerDashboard;

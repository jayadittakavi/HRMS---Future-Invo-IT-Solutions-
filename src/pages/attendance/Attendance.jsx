import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import {
    MdDashboard,
    MdAddTask,
    MdPlaylistAddCheck,
    MdSchedule,
    MdBadge,
    MdPolicy
} from 'react-icons/md';
import { FaDesktop, FaFileAlt, FaSync, FaClipboardList, FaMobileAlt } from 'react-icons/fa';

import AttendanceDashboard from './tabs/AttendanceDashboard';
import MarkAttendance from './tabs/MarkAttendance';
import BulkAttendance from './tabs/BulkAttendance';
import MyAttendanceList from './tabs/MyAttendanceList';
import ShiftView from './tabs/ShiftView';
import IDCardView from './tabs/IDCardView';
import AddDevice from './tabs/AddDevice';
import Regularization from './tabs/Regularization';
import SyncUI from './tabs/SyncUI';
import SyncLogs from './tabs/SyncLogs';
import MobileAttendance from './tabs/MobileAttendance';
import AttendancePolicy from './tabs/AttendancePolicy';

export const AttendanceContent = ({ personal = false, initialTab = 'dashboard' }) => {
    const { user } = useAuth();
    const role = user?.role?.toLowerCase();

    // Default tab based on role or personal mode
    const [activeTab, setActiveTab] = useState(initialTab);

    const canManageAttendance = ['superadmin', 'admin', 'hr', 'manager'].includes(role);

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: <MdDashboard /> },
        ...(personal ? [
            { id: 'my-attendance', label: 'My Attendance Log', icon: <MdPlaylistAddCheck /> }
        ] : []),
        // Only show management tabs if authorized and not in personal mode
        ...(canManageAttendance && !personal ? [
            { id: 'mark', label: 'Mark Attendance', icon: <MdAddTask /> },
            { id: 'bulk', label: 'Bulk Attendance', icon: <MdPlaylistAddCheck /> },
            { id: 'shift', label: 'Shift View', icon: <MdSchedule /> },
            { id: 'idcard', label: 'ID Card View', icon: <MdBadge /> },
            { id: 'devices', label: 'Devices', icon: <FaDesktop /> },
            { id: 'regularization', label: 'Regularization', icon: <FaFileAlt /> },
            { id: 'sync', label: 'Sync', icon: <FaSync /> },
            { id: 'sync-logs', label: 'Sync Logs', icon: <FaClipboardList /> },
            { id: 'mobile', label: 'Mobile Attendance', icon: <FaMobileAlt /> },
            { id: 'policy', label: 'Attendance Policy', icon: <MdPolicy /> },
        ] : [])
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <AttendanceDashboard onTabChange={setActiveTab} />;
            case 'my-attendance': return <MyAttendanceList />;
            case 'mark': return <MarkAttendance />;
            case 'bulk': return <BulkAttendance />;
            case 'shift': return <ShiftView />;
            case 'idcard': return <IDCardView />;
            case 'devices': return <AddDevice />;
            case 'regularization': return <Regularization />;
            case 'sync': return <SyncUI />;
            case 'sync-logs': return <SyncLogs />;
            case 'mobile': return <MobileAttendance />;
            case 'policy': return <AttendancePolicy />;
            default: return <AttendanceDashboard />;
        }
    };

    return (
        <div className="attendance-container bg-light min-vh-100">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-3 p-3 pb-0" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div>
                    <h4 className="fw-bold text-dark m-0">{personal ? 'My Attendance' : 'Attendance Management'}</h4>
                    <p className="text-muted small mb-0">Manage and view attendance records.</p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-3 mb-3" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <ul className="nav nav-pills bg-white p-2 rounded shadow-sm" style={{ flexWrap: 'nowrap', overflowX: 'auto', gap: '8px' }}>
                    {tabs.map(tab => (
                        <li className="nav-item" key={tab.id} style={{ flex: '0 0 auto' }}>
                            <button
                                className={`nav-link d-flex align-items-center justify-content-center gap-1 px-2 py-1 ${activeTab === tab.id ? 'active fw-bold' : 'text-secondary'}`}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    borderRadius: '8px',
                                    transition: 'all 0.2s',
                                    fontSize: '0.8rem',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <span style={{ fontSize: '0.9rem' }}>{tab.icon}</span>
                                <span className="d-none d-lg-inline">{tab.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content Area */}
            <div className="px-3 pb-4" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {renderContent()}
            </div>
        </div>
    );
};

const Attendance = ({ personal = false }) => {
    return (
        <DashboardLayout title={personal ? "My Attendance" : "Attendance Management"}>
            <AttendanceContent personal={personal} />
        </DashboardLayout>
    );
};

export default Attendance;

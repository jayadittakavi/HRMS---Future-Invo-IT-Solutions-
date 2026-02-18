import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useAuth } from '../../../../context/AuthContext';
import {
    MdDashboard,
    MdAddCircleOutline,
    MdPendingActions,
    MdPlaylistAddCheck,
    MdHistory,
    MdPolicy
} from 'react-icons/md';

import LeaveDashboard from './tabs/LeaveDashboard';
import ApplyLeave from './tabs/ApplyLeave';
import PendingRequests from './tabs/PendingRequests';
import BulkApproval from './tabs/BulkApproval';
import LeaveHistory from './tabs/LeaveHistory';
import LeavePolicies from './tabs/LeavePolicies';

export const LeaveManagementContent = ({ personal = false, initialTab = 'dashboard' }) => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState(initialTab);
    const role = user?.role?.toLowerCase();

    // Determine Tabs
    const tabs = [];
    // If personal, show personal tabs
    if (personal) {
        tabs.push(
            { id: 'dashboard', label: 'Dashboard', icon: <MdDashboard /> },
            { id: 'apply', label: 'Apply Leave', icon: <MdAddCircleOutline /> },
            { id: 'history', label: 'History', icon: <MdHistory /> }
        );
    } else {
        // If not personal (Manager/HR view), show management tabs
        tabs.push(
            { id: 'dashboard', label: 'Overview', icon: <MdDashboard /> },
            { id: 'pending', label: 'Pending Requests', icon: <MdPendingActions /> },
            { id: 'bulk', label: 'Bulk Approval', icon: <MdPlaylistAddCheck /> },
            { id: 'policies', label: 'Leave Policies', icon: <MdPolicy /> },
            { id: 'history', label: 'History Log', icon: <MdHistory /> }
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <LeaveDashboard />;
            case 'apply': return <ApplyLeave />;
            case 'pending': return <PendingRequests />;
            case 'bulk': return <BulkApproval />;
            case 'policies': return <LeavePolicies />;
            case 'history': return <LeaveHistory />;
            default: return <LeaveDashboard />;
        }
    };

    return (
        <div className="bg-light min-vh-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold m-0 text-dark">{personal ? 'My Leaves' : 'Leave Management'}</h4>
                    <p className="text-muted small">{personal ? 'Track your leave balance and applications.' : 'Manage team leaves and approvals.'}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-4">
                <ul className="nav nav-pills nav-fill bg-white p-2 rounded shadow-sm">
                    {tabs.map(tab => (
                        <li className="nav-item" key={tab.id}>
                            <button
                                className={`nav-link d-flex align-items-center justify-content-center gap-2 ${activeTab === tab.id ? 'active fw-bold' : 'text-secondary'}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {renderContent()}
        </div>
    );
};

// Default export wraps with Layout for page routes
const LeaveManagement = ({ personal = false }) => {
    return (
        <DashboardLayout title={personal ? "My Leaves" : "Leave Management"}>
            <LeaveManagementContent personal={personal} />
        </DashboardLayout>
    );
};

export default LeaveManagement;

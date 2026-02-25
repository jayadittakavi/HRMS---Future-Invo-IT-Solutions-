import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import {
    MdDashboard, MdAddCircleOutline, MdPendingActions,
    MdPlaylistAddCheck, MdHistory, MdPolicy
} from 'react-icons/md';
import LeaveDashboard from './tabs/LeaveDashboard';
import ApplyLeave from './tabs/ApplyLeave';
import PendingRequests from './tabs/PendingRequests';
import BulkApproval from './tabs/BulkApproval';
import LeaveHistory from './tabs/LeaveHistory';
import LeavePolicies from './tabs/LeavePolicies';
import DashboardLayout from '../../../../components/layout/DashboardLayout';

export const LeaveManagementContent = ({ personal = false, initialTab = 'dashboard' }) => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState(initialTab);

    const personalTabs = [
        { id: 'dashboard', label: 'Overview', icon: <MdDashboard /> },
        { id: 'apply', label: 'Apply Leave', icon: <MdAddCircleOutline /> },
        { id: 'history', label: 'My History', icon: <MdHistory /> },
    ];

    const managementTabs = [
        { id: 'dashboard', label: 'Overview', icon: <MdDashboard /> },
        { id: 'pending', label: 'Pending', icon: <MdPendingActions /> },
        { id: 'bulk', label: 'Bulk Approval', icon: <MdPlaylistAddCheck /> },
        { id: 'policies', label: 'Leave Policies', icon: <MdPolicy /> },
        { id: 'history', label: 'History Log', icon: <MdHistory /> },
    ];

    const tabs = personal ? personalTabs : managementTabs;

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <LeaveDashboard personal={personal} />;
            case 'apply': return <ApplyLeave />;
            case 'pending': return <PendingRequests />;
            case 'bulk': return <BulkApproval />;
            case 'policies': return <LeavePolicies />;
            case 'history': return <LeaveHistory personal={personal} />;
            default: return <LeaveDashboard personal={personal} />;
        }
    };

    return (
        <div className="animate__animated animate__fadeIn">
            {/* ── Modern Header ── */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold text-dark mb-1">
                        {personal ? 'My Leaves & Time Off' : 'Leave Management Control'}
                    </h4>
                    <p className="text-secondary small mb-0">
                        {personal
                            ? 'Manage your personal time off requests and balances.'
                            : 'Review, approve, and manage team leave policies and requests.'}
                    </p>
                </div>
                <div className="d-flex gap-2">
                    <div className="badge-modern approved rounded-pill fw-bold px-3">
                        <div className="dot"></div> 8 Approved
                    </div>
                    <div className="badge-modern rejected rounded-pill fw-bold px-3" style={{ background: '#fee2e2', color: '#991b1b' }}>
                        <div className="dot"></div> 3 Pending
                    </div>
                </div>
            </div>

            {/* ── Modern Tab Bar ── */}
            <div className="glass-tab-container d-flex gap-2 mb-4 p-1 bg-light rounded-4 w-fit-content">
                {tabs.map(tab => {
                    const active = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`btn rounded-4 px-4 py-2 d-flex align-items-center gap-2 border-0 transition-all ${active ? 'bg-primary text-white shadow-sm fw-bold' : 'text-secondary hover-bg-white'
                                }`}
                            style={{ fontSize: '0.85rem' }}
                        >
                            <span className="fs-6">{tab.icon}</span>
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* ── Content ── */}
            <div className="mt-2">
                {renderContent()}
            </div>

            <style>{`
                .w-fit-content { width: fit-content; }
                .glass-tab-container { border: 1px solid rgba(0,0,0,0.05); }
                .hover-bg-white:hover { background-color: #fff !important; color: var(--primary-color) !important; }
                
                .badge-modern {
                    display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px;
                    border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
                }
                .approved { background: #dcfce7; color: #166534; }
                .badge-modern .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
                
                .transition-all { transition: all 0.2s ease; }
            `}</style>
        </div>
    );
};

const LeaveManagement = ({ personal = false }) => (
    <DashboardLayout title={personal ? 'My Leaves' : 'Leave Management'}>
        <LeaveManagementContent personal={personal} />
    </DashboardLayout>
);

export default LeaveManagement;

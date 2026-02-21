import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import {
    MdDashboard, MdAddCircleOutline, MdPendingActions,
    MdPlaylistAddCheck, MdHistory, MdPolicy
} from 'react-icons/md';
import { FaLaptopHouse } from 'react-icons/fa';
import LeaveDashboard from './tabs/LeaveDashboard';
import ApplyLeave from './tabs/ApplyLeave';
import PendingRequests from './tabs/PendingRequests';
import BulkApproval from './tabs/BulkApproval';
import LeaveHistory from './tabs/LeaveHistory';
import LeavePolicies from './tabs/LeavePolicies';
import DashboardLayout from '../../../../components/layout/DashboardLayout';

/* ────── colour token ────── */
const accent = '#4f46e5'; // indigo

export const LeaveManagementContent = ({ personal = false, initialTab = 'dashboard' }) => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState(initialTab);
    const role = user?.role?.toLowerCase();

    const personalTabs = [
        { id: 'dashboard', label: 'Overview', icon: <MdDashboard size={15} /> },
        { id: 'apply', label: 'Apply Leave', icon: <MdAddCircleOutline size={15} /> },
        { id: 'history', label: 'My History', icon: <MdHistory size={15} /> },
    ];

    const managementTabs = [
        { id: 'dashboard', label: 'Overview', icon: <MdDashboard size={15} /> },
        { id: 'pending', label: 'Pending', icon: <MdPendingActions size={15} /> },
        { id: 'bulk', label: 'Bulk Approval', icon: <MdPlaylistAddCheck size={15} /> },
        { id: 'policies', label: 'Leave Policies', icon: <MdPolicy size={15} /> },
        { id: 'history', label: 'History Log', icon: <MdHistory size={15} /> },
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
        <div style={{ fontSize: '0.83rem' }}>
            {/* ── Page Header ── */}
            <div
                className="d-flex justify-content-between align-items-center mb-3 px-1"
                style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 12 }}
            >
                <div>
                    <div className="fw-bold" style={{ fontSize: '1rem', color: '#1e293b' }}>
                        {personal ? '🏖️ My Leaves' : '📋 Leave Management'}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                        {personal
                            ? 'Track your leave balance, apply for leave, and view history.'
                            : 'Manage team leaves, approve requests, and configure policies.'}
                    </div>
                </div>
                {/* quick stat chips */}
                <div className="d-flex gap-2">
                    {[
                        { label: 'Pending', val: 3, color: '#f59e0b', bg: '#fef3c7' },
                        { label: 'Approved', val: 8, color: '#10b981', bg: '#d1fae5' },
                    ].map(c => (
                        <div key={c.label} style={{ background: c.bg, borderRadius: 20, padding: '3px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: c.color }}>{c.val}</span>
                            <span style={{ fontSize: '0.68rem', color: c.color, fontWeight: 600 }}>{c.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Tab Bar ── */}
            <div
                className="d-flex gap-1 mb-3"
                style={{
                    background: '#f1f5f9',
                    borderRadius: 10,
                    padding: '4px 6px',
                    overflowX: 'auto',
                }}
            >
                {tabs.map(tab => {
                    const active = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 5,
                                padding: '6px 14px',
                                borderRadius: 7,
                                border: 'none',
                                fontSize: '0.76rem',
                                fontWeight: active ? 700 : 500,
                                background: active ? '#fff' : 'transparent',
                                color: active ? accent : '#64748b',
                                boxShadow: active ? '0 1px 4px rgba(79,70,229,0.12)' : 'none',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.18s',
                            }}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* ── Content ── */}
            {renderContent()}
        </div>
    );
};

const LeaveManagement = ({ personal = false }) => (
    <DashboardLayout title={personal ? 'My Leaves' : 'Leave Management'}>
        <LeaveManagementContent personal={personal} />
    </DashboardLayout>
);

export default LeaveManagement;

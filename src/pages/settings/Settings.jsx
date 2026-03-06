import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FaHistory, FaThLarge, FaBell, FaShieldAlt, FaLock, FaPuzzlePiece, FaChevronRight } from 'react-icons/fa';
import { BsActivity } from 'react-icons/bs';

const Settings = () => {
    const settingsItems = [
        {
            title: 'Audit Logs',
            desc: 'Track user actions, changes, and security events across the workspace.',
            icon: <BsActivity />,
            iconBg: '#f8fafc',
            iconColor: '#1e293b',
            status: 'MONITORING',
            statusColor: '#64748b'
        },
        {
            title: 'Workspace Configuration',
            desc: 'Manage your branch details, timezones, and display preferences.',
            icon: <FaThLarge />,
            iconBg: '#eff6ff',
            iconColor: '#2563eb',
            status: 'SYNCED',
            statusColor: '#3b82f6'
        },
        {
            title: 'Notification Center',
            desc: 'Configure how you receive alerts via email, WhatsApp, and browser.',
            icon: <FaBell />,
            iconBg: '#fff1f2',
            iconColor: '#f43f5e',
            status: 'ACTIVE',
            statusColor: '#ef4444'
        },
        {
            title: 'Security & Privacy',
            desc: 'Update your passwords, two-factor auth, and data permissions.',
            icon: <FaShieldAlt />,
            iconBg: '#fff7ed',
            iconColor: '#ea580c',
            status: 'SECURE',
            statusColor: '#f97316'
        },
        {
            title: 'Roles & Permissions (RBAC)',
            desc: 'Define granular roles, access levels, and assign permissions to team members.',
            icon: <FaLock />,
            iconBg: '#f0fdf4',
            iconColor: '#16a34a',
            status: 'SECURITY',
            statusColor: '#22c55e'
        },
        {
            title: 'Apps & Integrations',
            desc: 'Connect your favorite tools like Slack, WhatsApp API, and Google.',
            icon: <FaPuzzlePiece />,
            iconBg: '#f5f3ff',
            iconColor: '#7c3aed',
            status: '8 CONNECTED',
            statusColor: '#8b5cf6'
        }
    ];

    return (
        <DashboardLayout title="Settings">
            <div style={{ padding: '0.5rem 1rem' }}>
                <div className="mb-4">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>Workspace settings</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        Customize and manage your workspace for <span style={{ fontWeight: 700, color: '#334155' }}>Hyderabad Branch</span>
                    </p>
                </div>

                <div className="settings-grid">
                    {settingsItems.map((item, idx) => (
                        <div key={idx} className="settings-card shadow-sm">
                            <div>
                                <div className="setting-icon" style={{ backgroundColor: item.iconBg, color: item.iconColor }}>
                                    {item.icon}
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                            <div className="settings-footer">
                                <span className="status-label" style={{ color: item.statusColor }}>{item.status}</span>
                                <a href="#" className="configure-link" onClick={(e) => e.preventDefault()}>
                                    Configure <FaChevronRight size={10} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;

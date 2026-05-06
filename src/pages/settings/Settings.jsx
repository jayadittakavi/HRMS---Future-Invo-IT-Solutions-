import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FaUserAstronaut, FaCalendarCheck, FaWalking, FaHistory, FaHeadset, FaUsers, FaMoneyBillWave, FaLaptop } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const role = user?.role?.toLowerCase().replace(/\s/g, '') || 'new_user';

    const settingsItems = [
        {
            title: 'Assigned Assets',
            desc: 'Track your assigned company hardware, laptops, and devices.',
            icon: <FaLaptop size={18} />,
            iconBg: '#fef3c7',
            iconColor: '#d97706',
            status: 'INVENTORY',
            statusColor: '#d97706',
            path: '/my-assets'
        },
        {
            title: 'Audit Logs',
            desc: 'Track system actions, changes, and security events across the workspace.',
            icon: <FaHistory size={18} />,
            iconBg: '#f1f5f9',
            iconColor: '#0f172a',
            status: 'SYSTEM LOGS',
            statusColor: '#64748b',
            path: '/admin/audit-logs'
        },
        {
            title: 'My Activity',
            desc: 'View your personal activity history, login sessions, and module interactions.',
            icon: <FaHistory size={18} />,
            iconBg: '#eff6ff',
            iconColor: '#2563eb',
            status: 'PERSONAL LOGS',
            statusColor: '#2563eb',
            path: '/my-activity'
        },
        {
            title: 'Help Desk',
            desc: 'Raise support tickets, view knowledge base, and get help from admin.',
            icon: <FaHeadset size={18} />,
            iconBg: '#f5f3ff',
            iconColor: '#8b5cf6',
            status: 'SUPPORT',
            statusColor: '#8b5cf6',
            path: '/helpdesk'
        },
        {
            title: 'User Management',
            desc: 'Manage team directory, roles, permissions, and user access control.',
            icon: <FaUsers size={18} />,
            iconBg: '#fff7ed',
            iconColor: '#f97316',
            status: 'DIRECTORY',
            statusColor: '#f97316',
            path: '/users'
        }
    ];

    // Role-based filtering and path adjustment
    const filteredItems = settingsItems
        .filter(item => {
            if (role === 'employee' || role === 'manager') {
                if (item.title === 'My Space Dashboard' && role === 'employee') return false;
                if (item.title === 'Audit Logs' && role === 'manager') {
                    // Only allow if admin/superadmin route is accessible or if we had a manager-specific audit log
                    return false; 
                }
                if (item.title === 'User Management') return false;
            }
            return true;
        })
        .map(item => {
            if (role === 'employee' && item.title === 'Payroll & Salary') {
                return { ...item, path: '/my-payslips' };
            }
            return item;
        });

    return (
        <DashboardLayout title="Settings">
            <div style={{ padding: '40px 40px 60px', maxWidth: '1200px', margin: '0 auto' }}>

                {/* ── Page Header ── */}
                <div style={{ marginBottom: '48px' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: '#1e293b',
                            marginBottom: '6px',
                            fontFamily: "'Inter', sans-serif"
                        }}>Workspace settings</h2>
                        <p style={{ color: '#64748b', fontSize: '1rem' }}>
                            Customize and manage your workspace for <span style={{ fontWeight: 700, color: '#475569' }}>Hyderabad Branch</span>
                        </p>
                    </div>
                </div>

                {/* ── Settings Grid ── */}
                <div className="settings-grid">
                    {filteredItems.map((item, idx) => (
                        <div key={idx} className="settings-card"
                            style={{ border: 'none', background: '#fff', cursor: 'pointer' }}
                            onClick={() => navigate(item.path)}
                        >
                            <div>
                                <div className="setting-icon" style={{ backgroundColor: item.iconBg, color: item.iconColor, borderRadius: '12px' }}>
                                    {item.icon}
                                </div>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                            <div className="settings-footer" style={{ borderTop: 'none', paddingTop: '20px' }}>
                                <span className="status-label" style={{
                                    color: '#0f172a',
                                    fontWeight: 800,
                                    fontSize: '0.75rem',
                                    letterSpacing: '0.05em'
                                }}>{item.status}</span>
                                <span className="configure-link" style={{ color: item.statusColor, fontWeight: 700 }}>
                                    Go to Page ↗
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;

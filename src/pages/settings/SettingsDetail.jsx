import React, { useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { 
    MdBusiness, 
    MdAdminPanelSettings, 
    MdAccessTime, 
    MdEventBusy, 
    MdAttachMoney, 
    MdNotifications, 
    MdSecurity, 
    MdDescription, 
    MdExtension, 
    MdHistory,
    MdSave,
    MdCheckCircle
} from 'react-icons/md';

const settingsConfig = {
    company: {
        title: 'Company Settings',
        desc: 'Manage basic organization details, logo, and core preferences.',
        sections: [
            {
                title: 'Basic Information',
                fields: [
                    { label: 'Company Name', type: 'text', placeholder: 'Enter company name', defaultValue: 'WorkSphrer' },
                    { label: 'Company Logo', type: 'file', accept: 'image/*' },
                    { label: 'Email Address', type: 'email', placeholder: 'contact@company.com', defaultValue: 'admin@worksphrer.com' },
                    { label: 'Phone Number', type: 'tel', placeholder: '+1 234 567 8900', defaultValue: '+91 98765 43210' },
                    { label: 'Registered Address', type: 'textarea', placeholder: 'Enter company address', defaultValue: 'WorkSphrer HQ\n123 Tech Park, Madhapur\nHyderabad, Telangana 500081' }
                ]
            },
            {
                title: 'Localization & Operations',
                fields: [
                    { label: 'Time Zone', type: 'select', options: ['Asia/Kolkata (IST)', 'US/Pacific (PST)', 'Europe/London (GMT)'], defaultValue: 'Asia/Kolkata (IST)' },
                    { label: 'Working Days', type: 'select', options: ['5 Days (Mon-Fri)', '6 Days (Mon-Sat)', 'Custom'], defaultValue: '5 Days (Mon-Fri)' }
                ]
            }
        ]
    },
    roles: {
        title: 'User Roles & Permissions',
        desc: 'Control who can access what in your organization.',
        sections: [
            {
                title: 'Role Management',
                fields: [
                    { label: 'Admin Access', type: 'toggle', defaultValue: true },
                    { label: 'HR Access', type: 'toggle', defaultValue: true },
                    { label: 'Manager Permissions Level', type: 'select', options: ['Strict', 'Moderate', 'Lenient'], defaultValue: 'Moderate' }
                ]
            }
        ]
    },
    attendance: {
        title: 'Attendance Settings',
        desc: 'Configure office timings, shifts, and grace periods.',
        sections: [
            {
                title: 'Timings',
                fields: [
                    { label: 'Office Start Time', type: 'time', defaultValue: '09:00' },
                    { label: 'Office End Time', type: 'time', defaultValue: '18:00' },
                    { label: 'Grace Time (Minutes)', type: 'number', defaultValue: '15' }
                ]
            },
            {
                title: 'Rules',
                fields: [
                    { label: 'Late Mark Deduction', type: 'toggle', defaultValue: true },
                    { label: 'Half Day After (Minutes Late)', type: 'number', defaultValue: '120' }
                ]
            }
        ]
    },
    leave: {
        title: 'Leave Settings',
        desc: 'Manage leave types, limits, and workflows.',
        sections: [
            {
                title: 'Leave Limits',
                fields: [
                    { label: 'Annual Casual Leaves', type: 'number', defaultValue: '12' },
                    { label: 'Annual Sick Leaves', type: 'number', defaultValue: '12' },
                    { label: 'Carry Forward Max Days', type: 'number', defaultValue: '5' }
                ]
            },
            {
                title: 'Approval Flow',
                fields: [
                    { label: 'Require Manager Approval', type: 'toggle', defaultValue: true },
                    { label: 'Require HR Approval', type: 'toggle', defaultValue: false }
                ]
            }
        ]
    },
    payroll: {
        title: 'Payroll Settings',
        desc: 'Configure salary components and payroll cycles.',
        sections: [
            {
                title: 'Cycle Configuration',
                fields: [
                    { label: 'Payroll Generation Day', type: 'number', defaultValue: '28' },
                    { label: 'Salary Credit Day', type: 'number', defaultValue: '1' }
                ]
            },
            {
                title: 'Deductions & Components',
                fields: [
                    { label: 'Enable Provident Fund (PF)', type: 'toggle', defaultValue: true },
                    { label: 'Enable Professional Tax (PT)', type: 'toggle', defaultValue: true }
                ]
            }
        ]
    },
    notifications: {
        title: 'Notification Settings',
        desc: 'Manage email notifications and system alerts.',
        sections: [
            {
                title: 'System Alerts',
                fields: [
                    { label: 'Leave Request Alerts', type: 'toggle', defaultValue: true },
                    { label: 'Attendance Anomaly Alerts', type: 'toggle', defaultValue: true },
                    { label: 'Payroll Processing Alerts', type: 'toggle', defaultValue: true }
                ]
            }
        ]
    },
    security: {
        title: 'Security Settings',
        desc: 'Configure password policies and session limits.',
        sections: [
            {
                title: 'Authentication',
                fields: [
                    { label: 'Require 2FA', type: 'toggle', defaultValue: false },
                    { label: 'Password Expiry (Days)', type: 'number', defaultValue: '90' }
                ]
            },
            {
                title: 'Sessions',
                fields: [
                    { label: 'Session Timeout (Minutes)', type: 'number', defaultValue: '30' }
                ]
            }
        ]
    },
    documents: {
        title: 'Document Templates',
        desc: 'Manage standard templates for official communications.',
        sections: [
            {
                title: 'Templates',
                fields: [
                    { label: 'Offer Letter Template', type: 'select', options: ['Standard', 'Executive', 'Contractor'], defaultValue: 'Standard' },
                    { label: 'Payslip Template', type: 'select', options: ['Minimal', 'Detailed', 'Modern'], defaultValue: 'Detailed' }
                ]
            }
        ]
    },
    integrations: {
        title: 'Integration Settings',
        desc: 'Configure external connections and APIs.',
        sections: [
            {
                title: 'External Systems',
                fields: [
                    { label: 'Biometric Integration Sync', type: 'toggle', defaultValue: true },
                    { label: 'Email SMTP Server', type: 'text', placeholder: 'smtp.office365.com', defaultValue: '' }
                ]
            }
        ]
    }
};

const SettingsDetail = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const role = user?.role?.toLowerCase().replace(/\s/g, '') || 'new_user';
    const [saved, setSaved] = useState(false);

    const navItems = [
        { id: 'company', label: 'Company Settings', icon: <MdBusiness size={20} /> },
        { id: 'roles', label: 'User Roles & Permissions', icon: <MdAdminPanelSettings size={20} /> },
        { id: 'attendance', label: 'Attendance Settings', icon: <MdAccessTime size={20} /> },
        { id: 'leave', label: 'Leave Settings', icon: <MdEventBusy size={20} /> },
        { id: 'payroll', label: 'Payroll Settings', icon: <MdAttachMoney size={20} /> },
        { id: 'notifications', label: 'Notification Settings', icon: <MdNotifications size={20} /> },
        { id: 'security', label: 'Security Settings', icon: <MdSecurity size={20} /> },
        { id: 'documents', label: 'Document Templates', icon: <MdDescription size={20} /> },
        { id: 'integrations', label: 'Integration Settings', icon: <MdExtension size={20} /> },
        { id: 'audit-logs', label: 'Audit Logs', icon: <MdHistory size={20} />, isExternal: true, path: '/admin/audit-logs' }
    ];

    const filteredNavItems = navItems.filter(item => {
        if (role === 'employee') {
            if (['audit-logs', 'roles', 'integrations'].includes(item.id)) return false;
        }
        if (role === 'manager') {
            if (['integrations', 'roles'].includes(item.id)) return false;
        }
        return true;
    });

    const config = settingsConfig[type];

    if (!config && type !== 'audit-logs') {
        return (
            <DashboardLayout title="Settings Not Found">
                <div className="p-5 text-center">
                    <h4>Settings module not found.</h4>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/settings/company')}>Go to Settings</button>
                </div>
            </DashboardLayout>
        );
    }

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <DashboardLayout title="System Settings">
            <div className="container-fluid p-0 d-flex h-100" style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 70px)' }}>
                {/* Modern Sidebar for Settings */}
                <div className="settings-sidebar bg-white border-end" style={{ width: '280px', flexShrink: 0, padding: '24px 16px', overflowY: 'auto' }}>
                    <div className="mb-4 px-2">
                        <h5 className="fw-bold text-dark mb-1">System Settings</h5>
                        <p className="text-muted small mb-0">Manage organization preferences</p>
                    </div>
                    <ul className="list-unstyled d-flex flex-column gap-1">
                        {filteredNavItems.map(item => (
                            <li key={item.id}>
                                {item.isExternal ? (
                                    <button
                                        onClick={() => navigate(item.path)}
                                        className="btn btn-light text-start w-100 d-flex align-items-center gap-3 px-3 py-2 text-secondary hover-bg-light rounded-3 transition-all"
                                        style={{ border: 'none', background: 'transparent' }}
                                    >
                                        {item.icon}
                                        <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>{item.label}</span>
                                    </button>
                                ) : (
                                    <NavLink
                                        to={`/settings/${item.id}`}
                                        className={({ isActive }) => 
                                            `d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none transition-all ${
                                                isActive 
                                                    ? 'fw-bold shadow-sm' 
                                                    : 'text-secondary hover-bg-light'
                                            }`
                                        }
                                        style={({ isActive }) => ({
                                            fontSize: '0.9rem',
                                            backgroundColor: isActive ? '#e0e7ff' : 'transparent',
                                            color: isActive ? '#4338ca' : '#64748b',
                                            borderLeft: isActive ? '4px solid #6366f1' : '4px solid transparent',
                                            borderRadius: isActive ? '0 8px 8px 0' : '8px'
                                        })}
                                    >
                                        <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Content Area */}
                <div className="flex-grow-1 p-4" style={{ overflowY: 'auto', backgroundColor: '#f8fafc', maxHeight: 'calc(100vh - 70px)' }}>
                    {config && (
                        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div>
                                    <h3 className="fw-bold text-dark mb-1" style={{ fontSize: '1.75rem' }}>{config.title}</h3>
                                    <p className="text-muted mb-0">{config.desc}</p>
                                </div>
                                <div>
                                    <button 
                                        className={`btn ${saved ? 'btn-success' : 'btn-primary'} px-4 d-flex align-items-center gap-2 rounded-pill shadow-sm`}
                                        onClick={handleSave}
                                        style={{ transition: 'all 0.3s' }}
                                    >
                                        {saved ? <MdCheckCircle size={18} /> : <MdSave size={18} />}
                                        {saved ? 'Saved Successfully' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>

                            <div className="d-flex flex-column gap-4">
                                {config.sections.map((section, sIdx) => (
                                    <div key={sIdx} className="card border-0 shadow-sm rounded-4 overflow-hidden">
                                        <div className="card-header bg-white border-bottom py-3 px-4">
                                            <h6 className="mb-0 fw-bold text-dark">{section.title}</h6>
                                        </div>
                                        <div className="card-body p-4 bg-white">
                                            <div className="row g-4">
                                                {section.fields.map((field, fIdx) => (
                                                    <div key={fIdx} className={field.type === 'toggle' ? 'col-12' : 'col-md-6'}>
                                                        {field.type === 'toggle' ? (
                                                            <div className="d-flex align-items-center justify-content-between bg-light bg-opacity-50 p-3 rounded-3 border-0">
                                                                <div>
                                                                    <span className="fw-semibold text-dark d-block mb-1">{field.label}</span>
                                                                    <small className="text-muted">Enable or disable this preference.</small>
                                                                </div>
                                                                <div className="form-check form-switch mb-0">
                                                                    <input className="form-check-input" type="checkbox" role="switch" defaultChecked={field.defaultValue} style={{ width: '2.5rem', height: '1.25rem', cursor: 'pointer' }} />
                                                                </div>
                                                            </div>
                                                        ) : field.type === 'select' ? (
                                                            <div>
                                                                <label className="form-label small fw-bold text-secondary mb-2">{field.label}</label>
                                                                <select className="form-select border-0 bg-light py-2 px-3 rounded-3" defaultValue={field.defaultValue}>
                                                                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                                </select>
                                                            </div>
                                                        ) : field.type === 'textarea' ? (
                                                            <div>
                                                                <label className="form-label small fw-bold text-secondary mb-2">{field.label}</label>
                                                                <textarea 
                                                                    className="form-control border-0 bg-light py-2 px-3 rounded-3" 
                                                                    placeholder={field.placeholder} 
                                                                    defaultValue={field.defaultValue}
                                                                    rows="3"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <label className="form-label small fw-bold text-secondary mb-2">{field.label}</label>
                                                                <input 
                                                                    type={field.type} 
                                                                    className="form-control border-0 bg-light py-2 px-3 rounded-3" 
                                                                    placeholder={field.placeholder} 
                                                                    defaultValue={field.defaultValue} 
                                                                    accept={field.accept}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                
                <style>{`
                    .hover-bg-light:hover { background-color: #f1f5f9; }
                    .transition-all { transition: all 0.2s ease-in-out; }
                `}</style>
            </div>
        </DashboardLayout>
    );
};

export default SettingsDetail;

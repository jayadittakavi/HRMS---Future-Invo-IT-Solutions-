import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useCompany } from '../../context/CompanyContext';
import {
    MdBusiness, MdAdminPanelSettings, MdAccessTime, MdEventBusy,
    MdAttachMoney, MdNotifications, MdSecurity, MdDescription,
    MdExtension, MdHistory, MdSave, MdCheckCircle
} from 'react-icons/md';
import * as svc from '../../services/settingsService';

/* ── API key map: settingsConfig field key → backend JSON key ── */
const API_KEY_MAP = {
    company: {
        'Company Name': 'company_name', 'Company Logo': 'logo_url',
        'Email Address': 'email', 'Phone Number': 'phone',
        'Registered Address': 'address', 'Time Zone': 'timezone',
        'Working Days': 'working_days'
    },
    roles: {
        'Admin Access': 'admin_access', 'HR Access': 'hr_access',
        'Manager Permissions Level': 'manager_permission_level'
    },
    attendance: {
        'Office Start Time': 'office_start_time', 'Office End Time': 'office_end_time',
        'Grace Time (Minutes)': 'grace_time_minutes',
        'Late Mark Deduction': 'late_mark_deduction',
        'Half Day After (Minutes Late)': 'half_day_after_minutes'
    },
    leave: {
        'Annual Casual Leaves': 'annual_casual_leaves',
        'Annual Sick Leaves': 'annual_sick_leaves',
        'Carry Forward Max Days': 'carry_forward_max_days',
        'Require Manager Approval': 'require_manager_approval',
        'Require HR Approval': 'require_hr_approval'
    },
    payroll: {
        'Payroll Generation Day': 'payroll_generation_day',
        'Salary Credit Day': 'salary_credit_day',
        'Enable Provident Fund (PF)': 'enable_provident_fund',
        'Enable Professional Tax (PT)': 'enable_professional_tax'
    },
    notifications: {
        'Leave Request Alerts': 'leave_request_alerts',
        'Attendance Anomaly Alerts': 'attendance_anomaly_alerts',
        'Payroll Processing Alerts': 'payroll_processing_alerts'
    },
    security: {
        'Require 2FA': 'require_2fa',
        'Password Expiry (Days)': 'password_expiry_days',
        'Session Timeout (Minutes)': 'session_timeout_minutes'
    },
    documents: {
        'Offer Letter Template': 'offer_letter_template',
        'Payslip Template': 'payslip_template'
    },
    integrations: {
        'Biometric Integration Sync': 'biometric_integration_sync',
        'Email SMTP Server': 'email_smtp_server'
    }
};

const FETCH_FN = {
    company: svc.getCompanySettings, roles: svc.getRolesSettings,
    attendance: svc.getAttendanceSettings, leave: svc.getLeaveSettings,
    payroll: svc.getPayrollSettings, notifications: svc.getNotificationSettings,
    security: svc.getSecuritySettings, documents: svc.getDocumentSettings,
    integrations: svc.getIntegrationSettings
};

const UPDATE_FN = {
    company: svc.updateCompanySettings, roles: svc.updateRolesSettings,
    attendance: svc.updateAttendanceSettings, leave: svc.updateLeaveSettings,
    payroll: svc.updatePayrollSettings, notifications: svc.updateNotificationSettings,
    security: svc.updateSecuritySettings, documents: svc.updateDocumentSettings,
    integrations: svc.updateIntegrationSettings
};

const settingsConfig = {
    company: {
        title: 'Company Settings',
        desc: 'Manage basic organization details, logo, and core preferences.',
        sections: [
            {
                title: 'Basic Information',
                fields: [
                    { label: 'Company Name', type: 'text', placeholder: 'Enter company name' },
                    { label: 'Company Logo', type: 'file', accept: 'image/*' },
                    { label: 'Email Address', type: 'email', placeholder: 'contact@company.com' },
                    { label: 'Phone Number', type: 'tel', placeholder: '+1 234 567 8900' },
                    { label: 'Registered Address', type: 'textarea', placeholder: 'Enter company address' }
                ]
            },
            {
                title: 'Localization & Operations',
                fields: [
                    { label: 'Time Zone', type: 'select', options: ['Asia/Kolkata (IST)', 'US/Pacific (PST)', 'Europe/London (GMT)'] },
                    { label: 'Working Days', type: 'select', options: ['5 Days (Mon-Fri)', '6 Days (Mon-Sat)', 'Custom'] }
                ]
            }
        ]
    },
    roles: {
        title: 'User Roles & Permissions',
        desc: 'Control who can access what in your organization.',
        sections: [{
            title: 'Role Management',
            fields: [
                { label: 'Admin Access', type: 'toggle' },
                { label: 'HR Access', type: 'toggle' },
                { label: 'Manager Permissions Level', type: 'select', options: ['Strict', 'Moderate', 'Lenient'] }
            ]
        }]
    },
    attendance: {
        title: 'Attendance Settings',
        desc: 'Configure office timings, shifts, and grace periods.',
        sections: [
            { title: 'Timings', fields: [
                { label: 'Office Start Time', type: 'time' },
                { label: 'Office End Time', type: 'time' },
                { label: 'Grace Time (Minutes)', type: 'number' }
            ]},
            { title: 'Rules', fields: [
                { label: 'Late Mark Deduction', type: 'toggle' },
                { label: 'Half Day After (Minutes Late)', type: 'number' }
            ]}
        ]
    },
    leave: {
        title: 'Leave Settings',
        desc: 'Manage leave types, limits, and workflows.',
        sections: [
            { title: 'Leave Limits', fields: [
                { label: 'Annual Casual Leaves', type: 'number' },
                { label: 'Annual Sick Leaves', type: 'number' },
                { label: 'Carry Forward Max Days', type: 'number' }
            ]},
            { title: 'Approval Flow', fields: [
                { label: 'Require Manager Approval', type: 'toggle' },
                { label: 'Require HR Approval', type: 'toggle' }
            ]}
        ]
    },
    payroll: {
        title: 'Payroll Settings',
        desc: 'Configure salary components and payroll cycles.',
        sections: [
            { title: 'Cycle Configuration', fields: [
                { label: 'Payroll Generation Day', type: 'number' },
                { label: 'Salary Credit Day', type: 'number' }
            ]},
            { title: 'Deductions & Components', fields: [
                { label: 'Enable Provident Fund (PF)', type: 'toggle' },
                { label: 'Enable Professional Tax (PT)', type: 'toggle' }
            ]}
        ]
    },
    notifications: {
        title: 'Notification Settings',
        desc: 'Manage email notifications and system alerts.',
        sections: [{
            title: 'System Alerts',
            fields: [
                { label: 'Leave Request Alerts', type: 'toggle' },
                { label: 'Attendance Anomaly Alerts', type: 'toggle' },
                { label: 'Payroll Processing Alerts', type: 'toggle' }
            ]
        }]
    },
    security: {
        title: 'Security Settings',
        desc: 'Configure password policies and session limits.',
        sections: [
            { title: 'Authentication', fields: [
                { label: 'Require 2FA', type: 'toggle' },
                { label: 'Password Expiry (Days)', type: 'number' }
            ]},
            { title: 'Sessions', fields: [
                { label: 'Session Timeout (Minutes)', type: 'number' }
            ]}
        ]
    },
    documents: {
        title: 'Document Templates',
        desc: 'Manage standard templates for official communications.',
        sections: [{
            title: 'Templates',
            fields: [
                { label: 'Offer Letter Template', type: 'select', options: ['Standard', 'Executive', 'Contractor'] },
                { label: 'Payslip Template', type: 'select', options: ['Minimal', 'Detailed', 'Modern'] }
            ]
        }]
    },
    integrations: {
        title: 'Integration Settings',
        desc: 'Configure external connections and APIs.',
        sections: [{
            title: 'External Systems',
            fields: [
                { label: 'Biometric Integration Sync', type: 'toggle' },
                { label: 'Email SMTP Server', type: 'text', placeholder: 'smtp.office365.com' }
            ]
        }]
    }
};

const SettingsDetail = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { updateCompanyState } = useCompany();
    const role = user?.role?.toLowerCase().replace(/\s/g, '') || 'new_user';

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);
    const logoInputRef = useRef(null);

    const showToast = (type, text) => {
        setToast({ type, text });
        setTimeout(() => setToast(null), 4000);
    };

    // ── Fetch data from API on tab change ──
    useEffect(() => {
        if (!type || !FETCH_FN[type]) return;
        setLoading(true);
        FETCH_FN[type]()
            .then(data => {
                setFormData(data || {});
            })
            .catch(err => {
                console.error(`Failed to load ${type}:`, err);
                showToast('error', err.message || `Failed to load ${type} settings`);
            })
            .finally(() => setLoading(false));
    }, [type]);

    // ── Get field value from formData ──
    const getVal = (fieldLabel) => {
        const keyMap = API_KEY_MAP[type];
        if (!keyMap) return '';
        const apiKey = keyMap[fieldLabel];
        if (!apiKey) return '';
        return formData[apiKey] ?? '';
    };

    // ── Set field value into formData ──
    const setVal = (fieldLabel, value) => {
        const keyMap = API_KEY_MAP[type];
        if (!keyMap) return;
        const apiKey = keyMap[fieldLabel];
        if (!apiKey) return;
        setFormData(prev => ({ ...prev, [apiKey]: value }));
    };

    // ── Save to API ──
    const handleSave = async () => {
        if (!UPDATE_FN[type]) return;
        setSaving(true);
        try {
            // Build payload: only send fields that the API expects
            const keyMap = API_KEY_MAP[type] || {};
            const payload = {};
            Object.values(keyMap).forEach(apiKey => {
                if (apiKey !== 'logo_url' && formData[apiKey] !== undefined) {
                    payload[apiKey] = formData[apiKey];
                }
            });
            console.log(`[Settings] Saving ${type}:`, JSON.stringify(payload, null, 2));
            await UPDATE_FN[type](payload);
            if (type === 'company') {
                updateCompanyState(payload);
            }
            showToast('success', 'Settings saved successfully!');
        } catch (err) {
            showToast('error', err.message || 'Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    // ── Logo upload handler ──
    const handleLogoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSaving(true);
        try {
            const data = await svc.uploadCompanyLogo(file);
            setFormData(prev => ({ ...prev, logo_url: data.logo_url }));
            if (type === 'company') {
                updateCompanyState({ logo_url: data.logo_url });
            }
            showToast('success', 'Logo uploaded successfully!');
        } catch (err) {
            showToast('error', err.message || 'Logo upload failed');
        } finally {
            setSaving(false);
        }
    };

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

    return (
        <DashboardLayout title="System Settings">
            {/* Toast */}
            {toast && (
                <div style={{
                    position: 'fixed', top: 20, right: 24, zIndex: 99999,
                    padding: '14px 22px', borderRadius: 12, maxWidth: 420,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
                    background: toast.type === 'success' ? '#dcfce7' : '#fee2e2',
                    borderLeft: `5px solid ${toast.type === 'success' ? '#16a34a' : '#dc2626'}`,
                    color: toast.type === 'success' ? '#15803d' : '#991b1b',
                    fontWeight: 600, fontSize: '0.9rem',
                    display: 'flex', alignItems: 'center', gap: 10,
                }}>
                    <span>{toast.type === 'success' ? '✅' : '⚠️'}</span>
                    <span>{toast.text}</span>
                </div>
            )}

            <div className="container-fluid p-0 d-flex h-100" style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 70px)' }}>
                {/* Settings Sidebar */}
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
                                                isActive ? 'fw-bold shadow-sm' : 'text-secondary hover-bg-light'
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
                                        className={`btn btn-primary px-4 d-flex align-items-center gap-2 rounded-pill shadow-sm`}
                                        onClick={handleSave}
                                        disabled={saving || loading}
                                        style={{ transition: 'all 0.3s', background: saving ? '#16a34a' : '' }}
                                    >
                                        {saving ? <><span className="spinner-border spinner-border-sm" /> Saving...</> :
                                         <><MdSave size={18} /> Save Changes</>}
                                    </button>
                                </div>
                            </div>

                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary mb-3" />
                                    <p className="text-muted">Loading settings...</p>
                                </div>
                            ) : (
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
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            role="switch"
                                                                            checked={!!getVal(field.label)}
                                                                            onChange={(e) => setVal(field.label, e.target.checked)}
                                                                            style={{ width: '2.5rem', height: '1.25rem', cursor: 'pointer' }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ) : field.type === 'select' ? (
                                                                <div>
                                                                    <label className="form-label small fw-bold text-secondary mb-2">{field.label}</label>
                                                                    <select
                                                                        className="form-select border-0 bg-light py-2 px-3 rounded-3"
                                                                        value={getVal(field.label) || ''}
                                                                        onChange={(e) => setVal(field.label, e.target.value)}
                                                                    >
                                                                        <option value="">Select...</option>
                                                                        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                                    </select>
                                                                </div>
                                                            ) : field.type === 'textarea' ? (
                                                                <div>
                                                                    <label className="form-label small fw-bold text-secondary mb-2">{field.label}</label>
                                                                    <textarea
                                                                        className="form-control border-0 bg-light py-2 px-3 rounded-3"
                                                                        placeholder={field.placeholder}
                                                                        value={getVal(field.label) || ''}
                                                                        onChange={(e) => setVal(field.label, e.target.value)}
                                                                        rows="3"
                                                                    />
                                                                </div>
                                                            ) : field.type === 'file' ? (
                                                                <div>
                                                                    <label className="form-label small fw-bold text-secondary mb-2">{field.label}</label>
                                                                    <div className="d-flex align-items-center gap-3">
                                                                        {formData.logo_url && (
                                                                            <img src={formData.logo_url} alt="Logo" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'contain', border: '1px solid #e2e8f0' }} />
                                                                        )}
                                                                        <input
                                                                            ref={logoInputRef}
                                                                            type="file"
                                                                            className="d-none"
                                                                            accept={field.accept}
                                                                            onChange={handleLogoUpload}
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-primary btn-sm rounded-pill px-3"
                                                                            onClick={() => logoInputRef.current?.click()}
                                                                            disabled={saving}
                                                                        >
                                                                            {saving ? 'Uploading...' : 'Upload Logo'}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <label className="form-label small fw-bold text-secondary mb-2">{field.label}</label>
                                                                    <input
                                                                        type={field.type}
                                                                        className="form-control border-0 bg-light py-2 px-3 rounded-3"
                                                                        placeholder={field.placeholder}
                                                                        value={getVal(field.label) ?? ''}
                                                                        onChange={(e) => setVal(field.label, field.type === 'number' ? Number(e.target.value) : e.target.value)}
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
                            )}
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

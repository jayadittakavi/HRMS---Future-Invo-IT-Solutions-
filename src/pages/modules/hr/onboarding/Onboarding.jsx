import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import TemplateUI from './tabs/TemplateUI';
import VariableUI from './tabs/VariableUI';
import ApprovalUI from './tabs/ApprovalUI';
import ESignUI from './tabs/ESignUI';

/* ── Icons (inline SVG) ─────────────────────────────────── */
const IconUser = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const IconFile = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
);
const IconAward = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
);
const IconTemplate = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
);
const IconCode = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);
const IconCheck = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);
const IconSign = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
);
const IconEye = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
);
const IconMail = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
);
const IconDownload = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
);

/* ── Onboarding Table ───────────────────────────────────── */
const candidates = [
    { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', dept: 'Engineering', date: '2026-02-20', status: 'In Progress', progress: 60, avatar: 'AJ' },
    { id: 2, name: 'Bob Smith', role: 'UI/UX Designer', dept: 'Design', date: '2026-02-22', status: 'Document Verification', progress: 80, avatar: 'BS' },
    { id: 3, name: 'Charlie Davis', role: 'Backend Developer', dept: 'Engineering', date: '2026-02-25', status: 'Completed', progress: 100, avatar: 'CD' },
    { id: 4, name: 'Diana Roy', role: 'HR Analyst', dept: 'HR', date: '2026-03-01', status: 'Pending', progress: 20, avatar: 'DR' },
];

const statusStyle = {
    'Completed': { bg: '#dcfce7', color: '#16a34a', dot: '#16a34a' },
    'Document Verification': { bg: '#dbeafe', color: '#1d4ed8', dot: '#1d4ed8' },
    'In Progress': { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
    'Pending': { bg: '#f1f5f9', color: '#64748b', dot: '#94a3b8' },
};

const AvatarCircle = ({ initials, color }) => (
    <div style={{
        width: 36, height: 36, borderRadius: '50%', background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.72rem', fontWeight: 700, color: '#fff', flexShrink: 0
    }}>{initials}</div>
);

const avatarColors = ['#2563eb', '#7c3aed', '#059669', '#dc2626'];

const renderOnboarding = (onSendLetter) => (
    <div>
        {/* Stats bar */}
        <div className="row g-3 mb-4">
            {[
                { label: 'Total Hires', value: candidates.length, color: '#2563eb', bg: '#eff6ff', icon: '👤' },
                { label: 'Completed', value: candidates.filter(c => c.status === 'Completed').length, color: '#16a34a', bg: '#dcfce7', icon: '✅' },
                { label: 'In Progress', value: candidates.filter(c => c.status !== 'Completed' && c.status !== 'Pending').length, color: '#d97706', bg: '#fef3c7', icon: '⏳' },
                { label: 'Pending', value: candidates.filter(c => c.status === 'Pending').length, color: '#6b7280', bg: '#f1f5f9', icon: '🕐' },
            ].map((s, i) => (
                <div key={i} className="col-md-3 col-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body p-3 d-flex align-items-center gap-3">
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{s.icon}</div>
                            <div>
                                <div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between" style={{ background: '#f8faff' }}>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111827' }}>New Hire Onboarding Status</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Track onboarding progress for all new joiners</div>
                </div>
                <button className="btn btn-sm rounded-3 px-3" style={{ background: '#2563eb', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>
                    + Add New Hire
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.82rem' }}>
                    <thead>
                        <tr style={{ background: '#f8faff', color: '#6b7280', fontSize: '0.73rem', fontWeight: 600 }}>
                            <th className="border-0 py-3 px-4">Candidate</th>
                            <th className="border-0 py-3">Department</th>
                            <th className="border-0 py-3">Joining Date</th>
                            <th className="border-0 py-3">Status</th>
                            <th className="border-0 py-3" style={{ width: '20%' }}>Progress</th>
                            <th className="border-0 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((c, i) => {
                            const st = statusStyle[c.status];
                            return (
                                <tr key={c.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <AvatarCircle initials={c.avatar} color={avatarColors[i % 4]} />
                                            <div>
                                                <div style={{ fontWeight: 700, color: '#111827' }}>{c.name}</div>
                                                <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{c.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <span style={{ fontSize: '0.75rem', color: '#374151', background: '#f3f4f6', borderRadius: 6, padding: '2px 8px', fontWeight: 500 }}>{c.dept}</span>
                                    </td>
                                    <td className="py-3" style={{ color: '#6b7280' }}>{c.date}</td>
                                    <td className="py-3">
                                        <span style={{ background: st.bg, color: st.color, borderRadius: 20, padding: '3px 10px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: st.dot, display: 'inline-block' }} />
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <div style={{ background: '#f1f5f9', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                                            <div style={{ width: `${c.progress}%`, height: '100%', borderRadius: 99, background: c.progress === 100 ? '#16a34a' : '#2563eb' }} />
                                        </div>
                                        <div style={{ fontSize: '0.68rem', color: '#9ca3af', marginTop: 3 }}>{c.progress}% Completed</div>
                                    </td>
                                    <td className="py-3">
                                        <div className="d-flex gap-2">
                                            <button title="View" style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280' }}>
                                                <IconEye />
                                            </button>
                                            <button title="Send Letter" onClick={() => onSendLetter(c.name)} style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2563eb' }}>
                                                <IconMail />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

/* ── Certificates Tab ───────────────────────────────────── */
const certTemplates = [
    { id: 'experience', title: 'Experience Certificate', desc: 'Proof of employment duration and role.', icon: '📄', color: '#2563eb', bg: '#eff6ff' },
    { id: 'noc', title: 'NOC Letter', desc: 'No Objection Certificate for visa/loans.', icon: '✅', color: '#059669', bg: '#ecfdf5' },
    { id: 'internship', title: 'Internship Certificate', desc: 'Completion of internship program.', icon: '🎓', color: '#7c3aed', bg: '#f5f3ff' },
    { id: 'appreciation', title: 'Appreciation Letter', desc: 'Formal recognition for outstanding work.', icon: '⭐', color: '#d97706', bg: '#fffbeb' },
];

const issuedCerts = [
    { name: 'Mark Wilson', type: 'Experience Certificate', date: 'Apr 10, 2024', id: 'EMP-101' },
    { name: 'Priya Nair', type: 'NOC Letter', date: 'Mar 22, 2024', id: 'EMP-087' },
    { name: 'Rohan Mehta', type: 'Internship Certificate', date: 'Feb 14, 2024', id: 'EMP-055' },
];

const CertificatesTab = () => {
    const [issueModal, setIssueModal] = useState(null);
    const [form, setForm] = useState({ employee: '', employeeId: '', designation: '', purpose: '', issueDate: new Date().toISOString().split('T')[0] });

    return (
        <div>
            {/* Templates Grid */}
            <div className="mb-4">
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827', marginBottom: 4 }}>Certificate Templates</div>
                <div style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: 16 }}>Click a template to issue a new certificate</div>
                <div className="row g-3">
                    {certTemplates.map(t => (
                        <div key={t.id} className="col-md-3 col-sm-6">
                            <div
                                className="card border-0 shadow-sm rounded-4 h-100"
                                style={{ cursor: 'pointer', transition: 'all 0.2s', border: `1.5px solid ${t.bg}` }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${t.color}22`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                                onClick={() => setIssueModal(t)}
                            >
                                <div style={{ height: 4, background: t.color, borderRadius: '16px 16px 0 0' }} />
                                <div className="card-body p-4 text-center">
                                    <div style={{ fontSize: '2rem', marginBottom: 10 }}>{t.icon}</div>
                                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111827', marginBottom: 4 }}>{t.title}</div>
                                    <div style={{ fontSize: '0.74rem', color: '#6b7280', lineHeight: 1.5 }}>{t.desc}</div>
                                    <div style={{ marginTop: 14, fontSize: '0.76rem', color: t.color, fontWeight: 700 }}>Issue Certificate →</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Issued History */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between" style={{ background: '#f8faff' }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111827' }}>Issued Certificates History</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{issuedCerts.length} certificates issued to date</div>
                    </div>
                    <button style={{ fontSize: '0.78rem', color: '#6b7280', background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '5px 12px', cursor: 'pointer' }}>
                        Export
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.82rem' }}>
                        <thead>
                            <tr style={{ background: '#f8faff', color: '#6b7280', fontSize: '0.73rem', fontWeight: 600 }}>
                                <th className="border-0 py-3 px-4">Recipient</th>
                                <th className="border-0 py-3">Employee ID</th>
                                <th className="border-0 py-3">Certificate Type</th>
                                <th className="border-0 py-3">Issue Date</th>
                                <th className="border-0 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issuedCerts.map((c, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td className="px-4 py-3 fw-semibold" style={{ color: '#111827' }}>{c.name}</td>
                                    <td className="py-3"><span style={{ background: '#f3f4f6', borderRadius: 6, padding: '2px 8px', fontSize: '0.73rem', color: '#374151' }}>{c.id}</span></td>
                                    <td className="py-3" style={{ color: '#374151' }}>{c.type}</td>
                                    <td className="py-3" style={{ color: '#6b7280' }}>{c.date}</td>
                                    <td className="py-3">
                                        <div className="d-flex gap-2">
                                            <button title="View" style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280' }}><IconEye /></button>
                                            <button title="Download" style={{ width: 30, height: 30, borderRadius: 8, background: '#eff6ff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2563eb' }}><IconDownload /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Issue Modal */}
            {issueModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.45)' }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 520 }}>
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: 20 }}>
                            <div style={{ height: 5, background: issueModal.color, borderRadius: '20px 20px 0 0' }} />
                            <div className="modal-header border-0 px-4 pt-4 pb-2">
                                <div>
                                    <div style={{ fontSize: '1.4rem' }}>{issueModal.icon}</div>
                                    <h5 className="fw-bold mb-0 mt-1" style={{ fontSize: '1rem' }}>Issue {issueModal.title}</h5>
                                    <div style={{ fontSize: '0.76rem', color: '#9ca3af' }}>Fill in the details to generate the certificate</div>
                                </div>
                                <button className="btn-close" onClick={() => setIssueModal(null)} />
                            </div>
                            <div className="modal-body px-4 pb-2 pt-2">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Employee Name *</label>
                                        <input className="form-control form-control-sm rounded-3" placeholder="e.g. Alice Johnson" value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Employee ID</label>
                                        <input className="form-control form-control-sm rounded-3" placeholder="e.g. EMP-112" value={form.employeeId} onChange={e => setForm({ ...form, employeeId: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Designation</label>
                                        <input className="form-control form-control-sm rounded-3" placeholder="e.g. Frontend Developer" value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Issue Date</label>
                                        <input type="date" className="form-control form-control-sm rounded-3" value={form.issueDate} onChange={e => setForm({ ...form, issueDate: e.target.value })} />
                                    </div>
                                    <div className="col-12">
                                        <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Purpose / Remarks</label>
                                        <textarea className="form-control form-control-sm rounded-3" rows={3} placeholder="Purpose of the certificate..." value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0 px-4 pt-2 pb-4 gap-2">
                                <button onClick={() => setIssueModal(null)} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#f1f5f9', border: 'none', color: '#374151', fontWeight: 600 }}>Cancel</button>
                                <button onClick={() => { setIssueModal(null); }} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: issueModal.color, border: 'none', color: '#fff', fontWeight: 700 }}>Issue Certificate</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ── Letters Sub-Tabs ───────────────────────────────────── */
const LETTER_SUB_TABS = [
    { id: 'templates', label: 'Templates', icon: <IconTemplate />, desc: 'Manage letter templates', color: '#2563eb' },
    { id: 'variables', label: 'Variables', icon: <IconCode />, desc: 'Dynamic placeholders', color: '#7c3aed' },
    { id: 'approval', label: 'Approval', icon: <IconCheck />, desc: 'Approval workflows', color: '#d97706' },
    { id: 'esign', label: 'E-Sign', icon: <IconSign />, desc: 'Digital signatures', color: '#059669' },
];

/* ── Main Component ─────────────────────────────────────── */
export const OnboardingContent = () => {
    const [activeTab, setActiveTab] = useState('onboarding');
    const [letterSubTab, setLetterSubTab] = useState('templates');
    const [sendLetterModal, setSendLetterModal] = useState(null);

    const MAIN_TABS = [
        { id: 'onboarding', label: 'Onboarding', icon: <IconUser />, desc: 'Track new hire progress' },
        { id: 'letters', label: 'Letters', icon: <IconFile />, desc: 'Manage HR letters' },
        { id: 'certificates', label: 'Certificates', icon: <IconAward />, desc: 'Issue certificates' },
    ];

    return (
        <div className="p-4" style={{ maxWidth: 1100 }}>
            {/* Page Header */}
            <div className="mb-4">
                <h4 className="fw-bold mb-0" style={{ color: '#111827' }}>Onboarding & HR Documents</h4>
                <p className="text-secondary small mb-0 mt-1">Manage new hire onboarding, generate letters, and issue certificates</p>
            </div>

            {/* Main Tabs */}
            <div className="d-flex gap-2 mb-4 flex-wrap">
                {MAIN_TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            borderRadius: 12, padding: '8px 20px', cursor: 'pointer', fontSize: '0.84rem', fontWeight: 600,
                            display: 'flex', alignItems: 'center', gap: 7, transition: 'all 0.18s',
                            border: activeTab === tab.id ? 'none' : '1.5px solid #e5e7eb',
                            background: activeTab === tab.id ? '#1e3a8a' : '#fff',
                            color: activeTab === tab.id ? '#fff' : '#6b7280',
                            boxShadow: activeTab === tab.id ? '0 4px 12px rgba(30,58,138,0.25)' : 'none',
                        }}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Onboarding Tab */}
            {activeTab === 'onboarding' && renderOnboarding((name) => setSendLetterModal(name))}

            {/* Letters Tab */}
            {activeTab === 'letters' && (
                <div>
                    {/* Letter Sub-Tabs */}
                    <div className="d-flex gap-2 mb-4 flex-wrap">
                        {LETTER_SUB_TABS.map(sub => (
                            <button
                                key={sub.id}
                                onClick={() => setLetterSubTab(sub.id)}
                                style={{
                                    borderRadius: 10, padding: '6px 16px', cursor: 'pointer', fontSize: '0.81rem', fontWeight: 600,
                                    display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.18s',
                                    border: letterSubTab === sub.id ? 'none' : '1.5px solid #e5e7eb',
                                    background: letterSubTab === sub.id ? sub.color : '#fff',
                                    color: letterSubTab === sub.id ? '#fff' : '#6b7280',
                                    boxShadow: letterSubTab === sub.id ? `0 4px 12px ${sub.color}40` : 'none',
                                }}
                            >
                                {sub.icon} {sub.label}
                            </button>
                        ))}
                    </div>
                    {/* Sub Tab Description Banner */}
                    <div className="rounded-3 px-4 py-3 mb-4 d-flex align-items-center gap-3" style={{ background: '#f8faff', border: '1px solid #e0e7ff' }}>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e3a8a' }}>
                                {LETTER_SUB_TABS.find(t => t.id === letterSubTab)?.label}
                            </div>
                            <div style={{ fontSize: '0.76rem', color: '#6b7280' }}>
                                {letterSubTab === 'templates' && 'Create and manage letter templates for all HR communications'}
                                {letterSubTab === 'variables' && 'Define dynamic variables like {{employee_name}} used inside letter templates'}
                                {letterSubTab === 'approval' && 'Set up multi-level approval workflows before letters are sent'}
                                {letterSubTab === 'esign' && 'Configure digital signature requirements and track signing status'}
                            </div>
                        </div>
                    </div>
                    {letterSubTab === 'templates' && <TemplateUI />}
                    {letterSubTab === 'variables' && <VariableUI />}
                    {letterSubTab === 'approval' && <ApprovalUI />}
                    {letterSubTab === 'esign' && <ESignUI />}
                </div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && <CertificatesTab />}

            {/* Send Letter Modal */}
            {sendLetterModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.45)' }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 480 }}>
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: 20 }}>
                            <div style={{ height: 4, background: '#2563eb', borderRadius: '20px 20px 0 0' }} />
                            <div className="modal-header border-0 px-4 pt-4 pb-2">
                                <div>
                                    <h5 className="fw-bold mb-0" style={{ fontSize: '1rem' }}>Generate Letter</h5>
                                    <div style={{ fontSize: '0.76rem', color: '#9ca3af' }}>For: <strong>{sendLetterModal}</strong></div>
                                </div>
                                <button className="btn-close" onClick={() => setSendLetterModal(null)} />
                            </div>
                            <div className="modal-body px-4 pt-2 pb-2">
                                <div className="mb-3">
                                    <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Letter Type</label>
                                    <select className="form-select form-select-sm rounded-3">
                                        <option>Offer Letter</option>
                                        <option>Appointment Letter</option>
                                        <option>Increment Letter</option>
                                        <option>Relieving Letter</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Date</label>
                                    <input type="date" className="form-control form-control-sm rounded-3" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div className="mb-3">
                                    <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Template</label>
                                    <select className="form-select form-select-sm rounded-3">
                                        <option>Standard Format</option>
                                        <option>Executive Format</option>
                                    </select>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="emailCopyCheck" />
                                    <label className="form-check-label" htmlFor="emailCopyCheck" style={{ fontSize: '0.78rem', color: '#374151' }}>Send email copy to employee</label>
                                </div>
                            </div>
                            <div className="modal-footer border-0 px-4 pb-4 pt-2 gap-2">
                                <button onClick={() => setSendLetterModal(null)} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#f1f5f9', border: 'none', color: '#374151', fontWeight: 600 }}>Cancel</button>
                                <button onClick={() => setSendLetterModal(null)} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#2563eb', border: 'none', color: '#fff', fontWeight: 700 }}>Generate Letter</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Onboarding = () => (
    <DashboardLayout title="">
        <OnboardingContent />
    </DashboardLayout>
);

export default Onboarding;

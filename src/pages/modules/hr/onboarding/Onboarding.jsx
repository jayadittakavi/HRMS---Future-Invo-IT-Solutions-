import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import TemplateUI from './tabs/TemplateUI';
import VariableUI from './tabs/VariableUI';
import ApprovalUI from './tabs/ApprovalUI';
import ESignUI from './tabs/ESignUI';
import { onboardingService } from './service';

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
// Candidates will be fetched from API or use local state
const initialCandidates = [];

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

const renderOnboarding = (candidates, stats, onViewDocs, onSendLetter, onAddHire) => {
    const handleStatClick = (label) => {
        alert(`Filtering candidates by: ${label}`);
    };

    return (
        <div className="animate__animated animate__fadeIn">
            {/* Stats bar */}
            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Hires', value: stats.total_hires || candidates.length, color: '#2563eb', bg: '#eff6ff', icon: '👤' },
                    { label: 'Documents Pending', value: stats.pending_docs || candidates.filter(c => c.status !== 'Completed').length, color: '#dc2626', bg: '#fef2f2', icon: '📁' },
                    { label: 'In Progress', value: stats.in_progress || candidates.filter(c => c.status !== 'Completed' && c.status !== 'Pending').length, color: '#d97706', bg: '#fef3c7', icon: '⏳' },
                    { label: 'Verified', value: stats.verified || candidates.filter(c => c.status === 'Completed').length, color: '#16a34a', bg: '#dcfce7', icon: '✅' },
                ].map((s, i) => (
                    <div key={i} className="col-md-3 col-6">
                        <div
                            className="card border-0 shadow-sm rounded-4 h-100 onboarding-stat-card"
                            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                            onClick={() => handleStatClick(s.label)}
                        >
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
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111827' }}>Document Submission & Tracking</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Manage educational certificates and ID proofs for joiners</div>
                    </div>
                    <button
                        className="btn btn-sm rounded-3 px-3 hover-scale"
                        style={{ background: '#2563eb', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}
                        onClick={onAddHire}
                    >
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
                                <th className="border-0 py-3">Submission</th>
                                <th className="border-0 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(candidates) && candidates.length > 0 ? candidates.map((c, i) => {
                                const st = statusStyle[c.status] || statusStyle['Pending'];
                                const displayName = c.full_name || c.name;
                                const displayRole = c.designation || c.role;
                                const displayDept = c.department || c.dept || 'General';
                                const displayDate = c.joining_date || c.date || 'TBD';
                                const displayAvatar = c.avatar || (displayName ? displayName.split(' ').map(n => n[0]).join('').toUpperCase() : '??');
                                const progress = Number(c.progress) || 0;

                                return (
                                    <tr key={c.id || i} style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }} onClick={() => onViewDocs(c)}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <AvatarCircle initials={displayAvatar || '??'} color={avatarColors[i % 4]} />
                                                <div>
                                                    <div style={{ fontWeight: 700, color: '#111827' }}>{displayName || 'Unknown Candidate'}</div>
                                                    <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{displayRole || 'Joiner'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <span style={{ fontSize: '0.75rem', color: '#374151', background: '#f3f4f6', borderRadius: 6, padding: '2px 8px', fontWeight: 500 }}>{displayDept}</span>
                                        </td>
                                        <td className="py-3" style={{ color: '#6b7280' }}>{displayDate}</td>
                                        <td className="py-3">
                                            <span style={{ background: st.bg, color: st.color, borderRadius: 20, padding: '3px 10px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: st.dot, display: 'inline-block' }} />
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="py-3">
                                            <div style={{ background: '#f1f5f9', borderRadius: 99, height: 6, overflow: 'hidden', width: '100px' }}>
                                                <div style={{ width: `${progress}%`, height: '100%', borderRadius: 99, background: progress === 100 ? '#16a34a' : '#2563eb' }} />
                                            </div>
                                            <div style={{ fontSize: '0.68rem', color: '#9ca3af', marginTop: 3 }}>{progress}% Docs Verified</div>
                                        </td>
                                        <td className="py-3">
                                            <div className="d-flex gap-2">
                                                <button
                                                    title="View Documents"
                                                    onClick={(e) => { e.stopPropagation(); onViewDocs(c); }}
                                                    style={{ padding: '4px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 5 }}
                                                    className="onboarding-action-btn"
                                                >
                                                    <IconFile /> Verify
                                                </button>
                                                <button
                                                    title="Send Letter"
                                                    onClick={(e) => { e.stopPropagation(); onSendLetter(displayName); }}
                                                    style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2563eb' }}
                                                    className="onboarding-action-btn"
                                                >
                                                    <IconMail />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted">No candidates found in onboarding pipeline</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <style>{`
            .onboarding-stat-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 16px rgba(0,0,0,0.08) !important;
            }
            .onboarding-action-btn:hover {
                background: #f1f5f9 !important;
                transform: scale(1.05);
            }
            .hover-scale { transition: all 0.2s; }
            .hover-scale:hover { transform: scale(1.03); }
        `}</style>
        </div>
    );
};

/* ── Certificates Tab ───────────────────────────────────── */
const certTemplates = [
    { id: 'experience', title: 'Experience Certificate', desc: 'Proof of employment duration and role.', icon: '📄', color: '#2563eb', bg: '#eff6ff' },
    { id: 'internship', title: 'Internship Certificate', desc: 'Completion of internship program.', icon: '🎓', color: '#7c3aed', bg: '#f5f3ff' },
    { id: 'appreciation', title: 'Appreciation Letter', desc: 'Formal recognition for outstanding work.', icon: '⭐', color: '#d97706', bg: '#fffbeb' },
];

const issuedCerts = [
    { name: 'Mark Wilson', type: 'Experience Certificate', date: 'Apr 10, 2024', id: 'EMP-101' },
    { name: 'Rohan Mehta', type: 'Internship Certificate', date: 'Feb 14, 2024', id: 'EMP-055' },
];

const CertificatesTab = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [issueModal, setIssueModal] = useState(null);
    const [form, setForm] = useState({ 
        recipient: '', 
        employee_id: '', 
        designation: '', 
        purpose: '', 
        issue_date: new Date().toISOString().split('T')[0] 
    });

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const data = await onboardingService.getCertificateHistory();
            if (Array.isArray(data)) setHistory(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleIssue = async () => {
        try {
            await onboardingService.issueCertificate({
                ...form,
                certificate_type: issueModal.title
            });
            setIssueModal(null);
            alert("Certificate issued successfully!");
            fetchHistory();
        } catch (err) {
            alert("Error issuing certificate: " + err.message);
        }
    };

    const handleView = async (cid) => {
        const cert = await onboardingService.viewCertificate(cid);
        if (cert) alert(`Viewing Certificate: ${cert.recipient} (${cert.certificate_type})`);
    };

    const handleDownload = async (cid) => {
        await onboardingService.downloadCertificate(cid);
    };

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
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{history.length} certificates issued to date</div>
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
                            {history.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-5 text-muted">No issued certificates found</td></tr>
                            ) : history.map((c, i) => (
                                <tr key={c.id || i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td className="px-4 py-3 fw-semibold" style={{ color: '#111827' }}>{c.recipient}</td>
                                    <td className="py-3"><span style={{ background: '#f3f4f6', borderRadius: 6, padding: '2px 8px', fontSize: '0.73rem', color: '#374151' }}>{c.employee_id}</span></td>
                                    <td className="py-3" style={{ color: '#374151' }}>{c.certificate_type}</td>
                                    <td className="py-3" style={{ color: '#6b7280' }}>{c.issue_date}</td>
                                    <td className="py-3">
                                        <div className="d-flex gap-2">
                                            <button 
                                                title="View" 
                                                onClick={() => handleView(c.id)}
                                                style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280' }}
                                            ><IconEye /></button>
                                            <button 
                                                title="Download" 
                                                onClick={() => handleDownload(c.id)}
                                                style={{ width: 30, height: 30, borderRadius: 8, background: '#eff6ff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2563eb' }}
                                            ><IconDownload /></button>
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
                                        <input className="form-control form-control-sm rounded-3" placeholder="e.g. Alice Johnson" value={form.recipient} onChange={e => setForm({ ...form, recipient: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Employee ID</label>
                                        <input className="form-control form-control-sm rounded-3" placeholder="e.g. EMP-112" value={form.employee_id} onChange={e => setForm({ ...form, employee_id: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Designation</label>
                                        <input className="form-control form-control-sm rounded-3" placeholder="e.g. Frontend Developer" value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} />
                                    </div>
                                    <div className="col-md-6">
                                        <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Issue Date</label>
                                        <input type="date" className="form-control form-control-sm rounded-3" value={form.issue_date} onChange={e => setForm({ ...form, issue_date: e.target.value })} />
                                    </div>
                                    <div className="col-12">
                                        <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Purpose / Remarks</label>
                                        <textarea className="form-control form-control-sm rounded-3" rows={3} placeholder="Purpose of the certificate..." value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0 px-4 pt-2 pb-4 gap-2">
                                <button onClick={() => setIssueModal(null)} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#f1f5f9', border: 'none', color: '#374151', fontWeight: 600 }}>Cancel</button>
                                <button onClick={handleIssue} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: issueModal.color, border: 'none', color: '#fff', fontWeight: 700 }}>Issue Certificate</button>
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
    const [viewDocsCandidate, setViewDocsCandidate] = useState(null);
    const [showAddHire, setShowAddHire] = useState(false);
    
    // API Data state
    const [candidates, setCandidates] = useState(initialCandidates);
    const [stats, setStats] = useState({ total_hires: 0, pending_docs: 0, in_progress: 0, verified: 0 });
    const [loading, setLoading] = useState(false);
    const [formOptions, setFormOptions] = useState({ departments: [], designations: [], employmentTypes: [] });
    const [letterOptions, setLetterOptions] = useState({ letter_types: [], templates: [] });
    const [letterForm, setLetterForm] = useState({
        letter_type: 'Offer Letter',
        date: new Date().toISOString().split('T')[0],
        template_option: 'Standard Format',
        send_email_copy: true
    });

    const [hireForm, setHireForm] = useState({
        full_name: '', personal_email: '', phone_number: '',
        department: 'Engineering', designation: '', joining_date: new Date().toISOString().split('T')[0],
        employment_type: 'Fulltime'
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [sData, cData, oData] = await Promise.all([
                onboardingService.getStats(),
                onboardingService.getCandidates(),
                onboardingService.getFormOptions()
            ]);
            setStats(sData || stats);
            if (Array.isArray(cData)) setCandidates(cData);
            if (oData) setFormOptions(oData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddHire = async () => {
        try {
            await onboardingService.addCandidate(hireForm);
            alert(`Candidate ${hireForm.full_name} added to onboarding pipeline!`);
            setShowAddHire(false);
            fetchData();
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const handleVerifyDoc = async (candId, docId) => {
        try {
            await onboardingService.verifyDocument(candId, docId);
            const checklist = await onboardingService.getChecklist(candId);
            setViewDocsCandidate(prev => ({ ...prev, docs: checklist }));
            fetchData();
        } catch (err) {
            alert("Error verifying document: " + err.message);
        }
    };

    const handleVerifyAll = async (candId) => {
        try {
            await onboardingService.verifyAll(candId);
            setViewDocsCandidate(null);
            fetchData();
            alert("Onboarding completed for this candidate.");
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const MAIN_TABS = [
        { id: 'onboarding', label: 'Onboarding', icon: <IconUser />, desc: 'Track new hire progress' },
        { id: 'letters', label: 'Letters', icon: <IconFile />, desc: 'Manage HR letters' },
        { id: 'certificates', label: 'Certificates', icon: <IconAward />, desc: 'Issue certificates' },
    ];

    const handleViewDocs = async (cand) => {
        try {
            const checklist = await onboardingService.getChecklist(cand.id);
            setViewDocsCandidate({ ...cand, name: cand.full_name || cand.name, docs: checklist });
        } catch (err) {
            alert("Failed to load candidate documents");
            console.error(err);
        }
    };

    const handleSendLetter = async (cand) => {
        try {
            const opts = await onboardingService.getLetterOptions(cand.id);
            setLetterOptions(opts);
            setSendLetterModal(cand);
            if (opts.letter_types?.length > 0) setLetterForm(prev => ({ ...prev, letter_type: opts.letter_types[0] }));
            if (opts.templates?.length > 0) setLetterForm(prev => ({ ...prev, template_option: opts.templates[0] }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleGenerateLetter = async () => {
        try {
            await onboardingService.generateLetter(sendLetterModal.id, letterForm);
            alert("Letter generated and sent successfully!");
            setSendLetterModal(null);
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

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
            {activeTab === 'onboarding' && renderOnboarding(
                candidates,
                stats,
                handleViewDocs, 
                (cand) => handleSendLetter(cand),
                () => setShowAddHire(true)
            )}

            {/* Document Verification Modal */}
            {viewDocsCandidate && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="modal-header border-0 bg-primary bg-opacity-10 py-4 px-4">
                                <div className="d-flex align-items-center gap-3">
                                    <AvatarCircle initials={viewDocsCandidate.avatar} color="#2563eb" />
                                    <div>
                                        <h5 className="fw-bold mb-0 text-dark">Document Checklist: {viewDocsCandidate.name}</h5>
                                        <p className="small text-secondary mb-0">Verify educational certificates and identity documents</p>
                                    </div>
                                </div>
                                <button className="btn-close" onClick={() => setViewDocsCandidate(null)}></button>
                            </div>
                            <div className="modal-body p-4 bg-light bg-opacity-25">
                                <div className="row g-4">
                                    {/* Educational Section */}
                                    <div className="col-md-6">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                                            <h6 className="fw-bold d-flex align-items-center gap-2 mb-4">
                                                <span style={{ fontSize: '1.2rem' }}>🎓</span> Educational Certificates
                                            </h6>
                                            {viewDocsCandidate.docs?.educational?.map((doc, idx) => (
                                                <div key={idx} className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom last-border-none">
                                                    <div>
                                                        <div className="small fw-bold text-dark">{doc.label}</div>
                                                        <div className="text-muted" style={{ fontSize: '0.65rem' }}>Updated: {doc.date}</div>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className={`badge rounded-pill ${doc.status === 'Verified' ? 'bg-success' : doc.status === 'Pending' ? 'bg-warning' : 'bg-light text-secondary'} small`} style={{ fontSize: '0.65rem' }}>{doc.status}</span>
                                                        {doc.status !== 'Verified' && doc.status !== 'Not Required' && (
                                                            <button 
                                                                className="btn btn-sm btn-primary py-1 px-2 border-0" 
                                                                style={{ fontSize: '0.65rem' }}
                                                                onClick={(e) => { e.stopPropagation(); handleVerifyDoc(viewDocsCandidate.id, doc.id); }}
                                                            >
                                                                Verify Now
                                                            </button>
                                                        )}
                                                        <button className="btn btn-sm btn-light py-1 px-2 border" style={{ fontSize: '0.65rem' }}>View</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Identity Section */}
                                    <div className="col-md-6">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                                            <h6 className="fw-bold d-flex align-items-center gap-2 mb-4">
                                                <span style={{ fontSize: '1.2rem' }}>🆔</span> ID Proofs
                                            </h6>
                                            {viewDocsCandidate.docs?.identity?.map((doc, idx) => (
                                                <div key={idx} className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom last-border-none">
                                                    <div>
                                                        <div className="small fw-bold text-dark">{doc.label}</div>
                                                        <div className="text-muted" style={{ fontSize: '0.65rem' }}>Updated: {doc.date}</div>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className={`badge rounded-pill ${doc.status === 'Verified' ? 'bg-success' : doc.status === 'Pending' ? 'bg-warning' : 'bg-light text-secondary'} small`} style={{ fontSize: '0.65rem' }}>{doc.status}</span>
                                                        {doc.status !== 'Verified' && doc.status !== 'Not Required' && (
                                                            <button 
                                                                className="btn btn-sm btn-primary py-1 px-2 border-0" 
                                                                style={{ fontSize: '0.65rem' }}
                                                                onClick={(e) => { e.stopPropagation(); handleVerifyDoc(viewDocsCandidate.id, doc.id); }}
                                                            >
                                                                Verify Now
                                                            </button>
                                                        )}
                                                        <button className="btn btn-sm btn-light py-1 px-2 border" style={{ fontSize: '0.65rem' }}>View</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0 p-4 pt-1 d-flex justify-content-between">
                                <div className="text-muted small">Checked by: <strong>Admin</strong></div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-light rounded-3 px-4 fw-bold small" onClick={() => setViewDocsCandidate(null)}>Close</button>
                                    <button className="btn btn-primary rounded-3 px-4 fw-bold small" style={{ background: '#2563eb' }} onClick={() => handleVerifyAll(viewDocsCandidate.id)}>Verify All Documents</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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

            {/* Add New Hire Modal */}
            {showAddHire && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 650 }}>
                        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="modal-header border-0 bg-primary text-white py-4 px-4 d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>✨</div>
                                    <div>
                                        <h5 className="fw-bold mb-0">Onboard New Candidate</h5>
                                        <div className="small opacity-75">Start the document verification process</div>
                                    </div>
                                </div>
                                <button className="btn-close btn-close-white" onClick={() => setShowAddHire(false)} />
                            </div>
                            <div className="modal-body p-4 bg-light bg-opacity-50">
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Full Name *</label>
                                        <input className="form-control rounded-3 border-0 bg-white py-2 shadow-sm" placeholder="e.g. Alice Johnson" value={hireForm.full_name} onChange={e => setHireForm({...hireForm, full_name: e.target.value})} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Email Address *</label>
                                        <input className="form-control rounded-3 border-0 bg-white py-2 shadow-sm" placeholder="e.g. alice@example.com" value={hireForm.personal_email} onChange={e => setHireForm({...hireForm, personal_email: e.target.value})} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Phone Number</label>
                                        <input className="form-control rounded-3 border-0 bg-white py-2 shadow-sm" placeholder="+91 00000 00000" value={hireForm.phone_number} onChange={e => setHireForm({...hireForm, phone_number: e.target.value})} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Joining Date</label>
                                        <input type="date" className="form-control rounded-3 border-0 bg-white py-2 shadow-sm" value={hireForm.joining_date} onChange={e => setHireForm({...hireForm, joining_date: e.target.value})} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Department</label>
                                        <select className="form-select rounded-3 border-0 bg-white py-2 shadow-sm" value={hireForm.department} onChange={e => setHireForm({...hireForm, department: e.target.value})}>
                                            {formOptions.departments.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Role / Designation</label>
                                        <select className="form-select rounded-3 border-0 bg-white py-2 shadow-sm" value={hireForm.designation} onChange={e => setHireForm({...hireForm, designation: e.target.value})}>
                                            <option value="">Select Designation</option>
                                            {formOptions.designations.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold small text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Employment Type</label>
                                        <select className="form-select rounded-3 border-0 bg-white py-2 shadow-sm" value={hireForm.employment_type} onChange={e => setHireForm({...hireForm, employment_type: e.target.value})}>
                                            {formOptions.employmentTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 rounded-3" style={{ background: '#fef3c7', border: '1px solid #fde68a' }}>
                                    <div className="d-flex gap-2">
                                        <div style={{ fontSize: '1.2rem' }}>💡</div>
                                        <div>
                                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#92400e' }}>Next Step: Background Verification</div>
                                            <div style={{ fontSize: '0.72rem', color: '#b45309', opacity: 0.9 }}>Once created, the candidate will receive an invitation email to upload their documents.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div className="modal-footer border-0 p-4 pt-1 gap-2">
                                <button className="btn btn-light rounded-3 px-4 fw-bold small" onClick={() => setShowAddHire(false)}>Cancel</button>
                                <button className="btn btn-primary rounded-3 px-4 fw-bold small" style={{ background: '#2563eb', border: 'none' }} onClick={handleAddHire}>
                                    Start Onboarding
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                    <select className="form-select form-select-sm rounded-3" value={letterForm.letter_type} onChange={e => setLetterForm({...letterForm, letter_type: e.target.value})}>
                                        {letterOptions.letter_types.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Date</label>
                                    <input type="date" className="form-control form-control-sm rounded-3" value={letterForm.date} onChange={e => setLetterForm({...letterForm, date: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Template</label>
                                    <select className="form-select form-select-sm rounded-3" value={letterForm.template_option} onChange={e => setLetterForm({...letterForm, template_option: e.target.value})}>
                                        {letterOptions.templates.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="emailCopyCheck" checked={letterForm.send_email_copy} onChange={e => setLetterForm({...letterForm, send_email_copy: e.target.checked})} />
                                    <label className="form-check-label" htmlFor="emailCopyCheck" style={{ fontSize: '0.78rem', color: '#374151' }}>Send email copy to employee</label>
                                </div>
                            </div>
                            <div className="modal-footer border-0 px-4 pb-4 pt-2 gap-2">
                                <button onClick={() => setSendLetterModal(null)} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#f1f5f9', border: 'none', color: '#374151', fontWeight: 600 }}>Cancel</button>
                                <button onClick={handleGenerateLetter} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#2563eb', border: 'none', color: '#fff', fontWeight: 700 }}>Generate Letter</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Onboarding = () => (
    <DashboardLayout title="Onboarding" activePath="/onboarding">
        <OnboardingContent />
    </DashboardLayout>
);

export default Onboarding;

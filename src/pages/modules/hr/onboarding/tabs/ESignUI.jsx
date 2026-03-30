import React, { useState, useEffect } from 'react';
import { onboardingService } from '../service';

/* ── Mock Data ─────────────────────────────────────────── */
const SIGN_REQUESTS_INITIAL = [];
const SIGN_SETTINGS_INITIAL = [];

const statusStyle = {
    Signed: { bg: '#dcfce7', color: '#16a34a', icon: '✅', dot: '#16a34a' },
    Pending: { bg: '#fef3c7', color: '#b45309', icon: '⏳', dot: '#f59e0b' },
    Overdue: { bg: '#fee2e2', color: '#dc2626', icon: '🔴', dot: '#dc2626' },
    Declined: { bg: '#f5f3ff', color: '#6d28d9', icon: '🚫', dot: '#7c3aed' },
};

const Toggle = ({ enabled, onChange }) => (
    <div
        onClick={onChange}
        style={{
            width: 42, height: 22, borderRadius: 99, cursor: 'pointer', transition: 'all 0.25s',
            background: enabled ? '#2563eb' : '#d1d5db', position: 'relative', flexShrink: 0,
        }}
    >
        <div style={{
            position: 'absolute', top: 3, transition: 'all 0.25s',
            left: enabled ? 22 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }} />
    </div>
);

const ESignUI = () => {
    const [stats, setStats] = useState({ total_sent: 0, signed: 0, pending: 0, overdue: 0 });
    const [requests, setRequests] = useState(SIGN_REQUESTS_INITIAL);
    const [settings, setSettings] = useState(SIGN_SETTINGS_INITIAL);
    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState('tracking');
    const [showSendModal, setShowSendModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('All');
    const [viewRequest, setViewRequest] = useState(null);
    const [requestForm, setRequestForm] = useState({ employee: '', letter_type: 'Offer Letter', deadline: '' });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [sData, rData, setts] = await Promise.all([
                onboardingService.getESignSummary(),
                onboardingService.getESignRequests(),
                onboardingService.getESignSettings()
            ]);
            setStats(sData);
            setRequests(rData);
            setSettings(setts);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleSetting = (id) => setSettings(ss => ss.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));

    const handleSaveSettings = async () => {
        try {
            await onboardingService.updateESignSettings(settings);
            alert("Settings updated successfully!");
        } catch (err) {
            alert("Error updating settings: " + err.message);
        }
    };

    const handleSendRequest = async () => {
        try {
            await onboardingService.sendESignRequest(requestForm);
            setShowSendModal(false);
            fetchData();
            alert("E-Sign request sent!");
        } catch (err) {
            alert("Error sending request: " + err.message);
        }
    };

    const filtered = requests.filter(r => filterStatus === 'All' || r.status === filterStatus);

    const statCards = [
        { label: 'Total Sent', value: stats.total_sent, icon: '📨', color: '#2563eb', bg: '#eff6ff' },
        { label: 'Signed', value: stats.signed, icon: '✅', color: '#16a34a', bg: '#dcfce7' },
        { label: 'Pending', value: stats.pending, icon: '⏳', color: '#d97706', bg: '#fef3c7' },
        { label: 'Overdue', value: stats.overdue, icon: '🔴', color: '#dc2626', bg: '#fee2e2' },
    ];

    return (
        <div>
            {/* What is E-Sign Banner */}
            <div className="rounded-4 p-4 mb-4 d-flex align-items-start gap-3" style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', color: '#fff' }}>
                <div style={{ fontSize: '1.8rem', lineHeight: 1, flexShrink: 0 }}>✍️</div>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>What is Digital E-Signing?</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.88, lineHeight: 1.65 }}>
                        E-Sign enables employees to digitally sign HR letters (offer letters, appointment letters, etc.) without physical paperwork.
                        Once a letter is approved, an e-sign link is sent to the employee's email. They sign digitally and the signed document is stored securely.
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="row g-3 mb-4">
                {statCards.map((s, i) => (
                    <div key={i} className="col-md-3 col-6">
                        <div
                            className="card border-0 shadow-sm rounded-4"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setFilterStatus(active => active === s.label.split(' ')[0] && s.label !== 'Total Sent' ? 'All' : s.label === 'Total Sent' ? 'All' : s.label)}
                        >
                            <div className="card-body p-3 d-flex align-items-center gap-3">
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{s.icon}</div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Section Tabs */}
            <div className="d-flex gap-2 mb-4">
                {[{ id: 'tracking', label: '📋 Signing Requests' }, { id: 'settings', label: '⚙️ E-Sign Settings' }].map(t => (
                    <button key={t.id} onClick={() => setActiveSection(t.id)} style={{
                        borderRadius: 10, padding: '6px 18px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s',
                        border: activeSection === t.id ? 'none' : '1.5px solid #e5e7eb',
                        background: activeSection === t.id ? '#059669' : '#fff',
                        color: activeSection === t.id ? '#fff' : '#6b7280',
                    }}>{t.label}</button>
                ))}
                <button onClick={() => setShowSendModal(true)} style={{
                    marginLeft: 'auto', borderRadius: 10, padding: '6px 18px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
                    background: '#1e3a8a', border: 'none', color: '#fff',
                }}>+ Send for Signing</button>
            </div>

            {/* Tracking Tab */}
            {activeSection === 'tracking' && (
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2" style={{ background: '#f0fdf4' }}>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111827' }}>E-Sign Request Tracker</div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Monitor the signing status of all sent letters</div>
                        </div>
                        <select style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: '5px 10px', fontSize: '0.8rem', color: '#374151' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                            <option value="All">All Status</option>
                            <option>Signed</option><option>Pending</option><option>Overdue</option><option>Declined</option>
                        </select>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.81rem' }}>
                            <thead>
                                <tr style={{ background: '#f8faff', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <th className="border-0 py-3 px-4">ID</th>
                                    <th className="border-0 py-3">Employee</th>
                                    <th className="border-0 py-3">Letter Type</th>
                                    <th className="border-0 py-3">Sent Date</th>
                                    <th className="border-0 py-3">Due Date</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(r => {
                                    const s = statusStyle[r.status];
                                    return (
                                        <tr key={r.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                            <td className="px-4 py-3">
                                                <span style={{ fontFamily: 'monospace', background: '#f8faff', borderRadius: 6, padding: '2px 8px', border: '1px solid #e5e7eb', fontSize: '0.76rem', color: '#374151' }}>{r.id || r.RequestId}</span>
                                            </td>
                                            <td className="py-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: r.avatarColor || '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{r.avatar || (r.employee ? r.employee[0] : 'U')}</div>
                                                    <span style={{ fontWeight: 600, color: '#111827' }}>{r.employee}</span>
                                                </div>
                                            </td>
                                            <td className="py-3">
                                                <span style={{ background: '#eff6ff', color: '#2563eb', borderRadius: 20, padding: '2px 10px', fontSize: '0.71rem', fontWeight: 700 }}>{r.letterType || r.letter_type}</span>
                                            </td>
                                            <td className="py-3" style={{ color: '#6b7280' }}>{r.sentDate || r.sent_date}</td>
                                            <td className="py-3" style={{ color: r.status === 'Overdue' ? '#dc2626' : '#6b7280', fontWeight: r.status === 'Overdue' ? 700 : 400 }}>{r.dueDate || r.due_date || r.deadline}</td>
                                            <td className="py-3">
                                                <span style={{ background: s.bg, color: s.color, borderRadius: 20, padding: '3px 10px', fontSize: '0.71rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
                                                    {r.status}
                                                </span>
                                            </td>
                                            <td className="py-3">
                                                <div className="d-flex gap-2">
                                                    <button onClick={() => setViewRequest(r)} title="View Details" style={{ padding: '4px 10px', borderRadius: 8, background: '#f1f5f9', color: '#374151', border: 'none', fontSize: '0.73rem', fontWeight: 600, cursor: 'pointer' }}>👁 View</button>
                                                    {(r.status === 'Pending' || r.status === 'Overdue') && (
                                                        <button title="Resend" style={{ padding: '4px 10px', borderRadius: 8, background: '#eff6ff', color: '#2563eb', border: 'none', fontSize: '0.73rem', fontWeight: 600, cursor: 'pointer' }}>🔄 Resend</button>
                                                    )}
                                                    {r.status === 'Signed' && (
                                                        <button title="Download" style={{ padding: '4px 10px', borderRadius: 8, background: '#dcfce7', color: '#16a34a', border: 'none', fontSize: '0.73rem', fontWeight: 600, cursor: 'pointer' }}>⬇ Download</button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Settings Tab */}
            {activeSection === 'settings' && (
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="px-4 py-3 border-bottom" style={{ background: '#f0fdf4' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111827' }}>E-Sign Configuration</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Configure authentication method and signing preferences</div>
                    </div>
                    <div className="p-4">
                        <div className="d-flex flex-column gap-3">
                            {settings.map(setting => (
                                <div key={setting.id} className="d-flex align-items-center gap-4 p-3 rounded-3" style={{ border: '1px solid #e5e7eb', background: setting.enabled ? '#f0fdf4' : '#f8faff' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#111827' }}>{setting.label}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: 2 }}>{setting.desc}</div>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <span style={{ fontSize: '0.72rem', color: setting.enabled ? '#16a34a' : '#9ca3af', fontWeight: 600 }}>{setting.enabled ? 'Enabled' : 'Disabled'}</span>
                                        <Toggle enabled={setting.enabled} onChange={() => toggleSetting(setting.id)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 d-flex justify-content-end">
                            <button onClick={handleSaveSettings} style={{ background: '#059669', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 24px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Request Modal */}
            {viewRequest && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.45)' }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 460 }}>
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: 20 }}>
                            <div style={{ height: 4, background: statusStyle[viewRequest.status].dot, borderRadius: '20px 20px 0 0' }} />
                            <div className="modal-header border-0 px-4 pt-4 pb-2">
                                <div>
                                    <h5 className="fw-bold mb-0" style={{ fontSize: '1rem' }}>E-Sign Request Details</h5>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>ID: {viewRequest.id}</div>
                                </div>
                                <button className="btn-close" onClick={() => setViewRequest(null)} />
                            </div>
                            <div className="modal-body px-4 py-3">
                                <div className="d-flex flex-column gap-3">
                                    {[
                                        ['Employee', viewRequest.employee],
                                        ['Letter Type', viewRequest.letterType],
                                        ['Sent Date', viewRequest.sentDate],
                                        ['Due Date', viewRequest.dueDate],
                                        ['Status', viewRequest.status],
                                        ...(viewRequest.signedDate ? [['Signed On', viewRequest.signedDate], ['Signed By', viewRequest.signedBy]] : []),
                                    ].map(([label, val], i) => (
                                        <div key={i} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                            <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600 }}>{label}</span>
                                            <span style={{ fontSize: '0.82rem', color: '#111827', fontWeight: 700 }}>
                                                {label === 'Status' ? (
                                                    <span style={{ background: statusStyle[val].bg, color: statusStyle[val].color, borderRadius: 20, padding: '2px 10px', fontSize: '0.73rem' }}>{val}</span>
                                                ) : val}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer border-0 px-4 pb-4 pt-2">
                                <button onClick={() => setViewRequest(null)} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#f1f5f9', border: 'none', color: '#374151', fontWeight: 600 }}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Send for Signing Modal */}
            {showSendModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.45)' }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 480 }}>
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: 20 }}>
                            <div style={{ height: 4, background: '#059669', borderRadius: '20px 20px 0 0' }} />
                            <div className="modal-header border-0 px-4 pt-4 pb-2">
                                <div>
                                    <h5 className="fw-bold mb-0" style={{ fontSize: '1rem' }}>✍️ Send Letter for E-Signing</h5>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>An e-sign request will be sent to the employee's registered email</div>
                                </div>
                                <button className="btn-close" onClick={() => setShowSendModal(false)} />
                            </div>
                            <div className="modal-body px-4 pt-2 pb-2">
                                <div className="mb-3">
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Employee *</label>
                                    <input className="form-control form-control-sm rounded-3" placeholder="Search employee name or ID..." value={requestForm.employee} onChange={e => setRequestForm({...requestForm, employee: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Letter Type *</label>
                                    <select className="form-select form-select-sm rounded-3" value={requestForm.letter_type} onChange={e => setRequestForm({...requestForm, letter_type: e.target.value})}>
                                        <option>Offer Letter</option><option>Appointment Letter</option><option>Relieving Letter</option><option>Increment Letter</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Signing Deadline</label>
                                    <input type="date" className="form-control form-control-sm rounded-3" value={requestForm.deadline} onChange={e => setRequestForm({...requestForm, deadline: e.target.value})} />
                                </div>
                                <div style={{ background: '#f0fdf4', borderRadius: 10, padding: 12, border: '1px solid #bbf7d0', fontSize: '0.75rem', color: '#374151' }}>
                                    <strong>ℹ️ Note:</strong> The employee will receive an email with a secure signing link. The link will expire on the set deadline date.
                                </div>
                            </div>
                            <div className="modal-footer border-0 px-4 pb-4 pt-2 gap-2">
                                <button onClick={() => setShowSendModal(false)} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#f1f5f9', border: 'none', color: '#374151', fontWeight: 600 }}>Cancel</button>
                                <button onClick={handleSendRequest} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#059669', border: 'none', color: '#fff', fontWeight: 700 }}>Send E-Sign Request</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ESignUI;

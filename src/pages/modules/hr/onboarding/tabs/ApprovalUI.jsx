import React, { useState, useEffect } from 'react';
import { onboardingService } from '../service';

/* ── Data ──────────────────────────────────────────────── */
const WORKFLOWS = [
    {
        id: 1, name: 'Offer Letter Approval', letterType: 'Offer Letter', status: 'Active',
        steps: [
            { level: 1, role: 'HR Manager', approver: 'Ramesh Kumar', status: 'Approved', date: '2026-02-18' },
            { level: 2, role: 'Department Head', approver: 'Neha Joshi', status: 'Approved', date: '2026-02-19' },
            { level: 3, role: 'MD / CEO', approver: 'Arjun Mehta', status: 'Pending', date: '' },
        ]
    },
    {
        id: 2, name: 'Relieving Letter Approval', letterType: 'Relieving Letter', status: 'Active',
        steps: [
            { level: 1, role: 'HR Executive', approver: 'Swati Rao', status: 'Approved', date: '2026-02-17' },
            { level: 2, role: 'HR Manager', approver: 'Ramesh Kumar', status: 'Rejected', date: '2026-02-18' },
        ]
    },
    {
        id: 3, name: 'Increment Letter Approval', letterType: 'Increment Letter', status: 'Draft',
        steps: [
            { level: 1, role: 'Manager', approver: 'Priya Nair', status: 'Pending', date: '' },
            { level: 2, role: 'Finance Head', approver: 'Vivek Shah', status: 'Pending', date: '' },
        ]
    },
];

const PENDING_LETTERS_INITIAL = [];
const WORKFLOWS_INITIAL = [];

const stepStatus = {
    Approved: { bg: '#dcfce7', color: '#16a34a', icon: '✅' },
    Pending: { bg: '#fef3c7', color: '#b45309', icon: '⏳' },
    Rejected: { bg: '#fee2e2', color: '#dc2626', icon: '❌' },
};

/* ── Approval Flow Visualizer ────────────────────────── */
const FlowVisualizer = ({ steps }) => (
    <div className="d-flex align-items-center flex-wrap gap-0 mt-2">
        {steps.map((step, i) => {
            const s = stepStatus[step.status];
            return (
                <div key={i} className="d-flex align-items-center">
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: '50%', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.85rem', border: `2px solid ${s.color}40`, margin: '0 auto'
                        }}>{s.icon}</div>
                        <div style={{ fontSize: '0.65rem', color: '#374151', fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap' }}>L{step.level}: {step.role}</div>
                        <div style={{ fontSize: '0.62rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>{step.approver}</div>
                    </div>
                    {i < steps.length - 1 && (
                        <div style={{ width: 28, height: 2, background: '#e5e7eb', margin: '0 4px', marginBottom: 20 }} />
                    )}
                </div>
            );
        })}
    </div>
);

/* ── Main ApprovalUI ───────────────────────────────────── */
const ApprovalUI = () => {
    const [stats, setStats] = useState({ pending_approvals: 0, active_workflows: 0, approved_this_month: 0, rejected: 0 });
    const [pendingLetters, setPendingLetters] = useState(PENDING_LETTERS_INITIAL);
    const [workflows, setWorkflows] = useState(WORKFLOWS_INITIAL);
    const [loading, setLoading] = useState(false);
    const [workflowForm, setWorkflowForm] = useState({ name: '', letter_type: 'Offer Letter' });
    const [activeSection, setActiveSection] = useState('pending');
    const [expandedWorkflow, setExpandedWorkflow] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [sData, pData, wData] = await Promise.all([
                onboardingService.getApprovalSummary(),
                onboardingService.getPendingApprovals(),
                onboardingService.getWorkflows()
            ]);
            setStats(sData);
            setPendingLetters(pData);
            setWorkflows(wData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAction = async (stepId, action) => {
        try {
            const success = await onboardingService.processApprovalAction(stepId, action);
            if (success) {
                fetchData();
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const handleSaveWorkflow = async () => {
        try {
            await onboardingService.saveWorkflow(workflowForm);
            setShowModal(false);
            fetchData();
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
        <div>
            {/* Header Stats */}
            <div className="row g-3 mb-4">
                {[
                    { label: 'Pending Approvals', value: stats.pending_approvals, icon: '⏳', color: '#d97706', bg: '#fef3c7' },
                    { label: 'Active Workflows', value: stats.active_workflows, icon: '🔄', color: '#2563eb', bg: '#eff6ff' },
                    { label: 'Approved This Month', value: stats.approved_this_month, icon: '✅', color: '#16a34a', bg: '#dcfce7' },
                    { label: 'Rejected', value: stats.rejected, icon: '❌', color: '#dc2626', bg: '#fee2e2' },
                ].map((s, i) => (
                    <div key={i} className="col-md-3 col-6">
                        <div className="card border-0 shadow-sm rounded-4">
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
                {[{ id: 'pending', label: '⏳ Pending Approvals' }, { id: 'workflows', label: '🔄 Approval Workflows' }].map(t => (
                    <button key={t.id} onClick={() => setActiveSection(t.id)} style={{
                        borderRadius: 10, padding: '6px 18px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s',
                        border: activeSection === t.id ? 'none' : '1.5px solid #e5e7eb',
                        background: activeSection === t.id ? '#d97706' : '#fff',
                        color: activeSection === t.id ? '#fff' : '#6b7280',
                    }}>{t.label}</button>
                ))}
                <button onClick={() => setShowModal(true)} style={{
                    marginLeft: 'auto', borderRadius: 10, padding: '6px 18px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
                    background: '#1e3a8a', border: 'none', color: '#fff',
                }}>+ New Workflow</button>
            </div>

            {/* Pending Approvals */}
            {activeSection === 'pending' && (
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="px-4 py-3 border-bottom" style={{ background: '#fffbeb' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111827' }}>Letters Awaiting Your Approval</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Review and approve or reject pending letter requests</div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.81rem' }}>
                            <thead>
                                <tr style={{ background: '#f8faff', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <th className="border-0 py-3 px-4">Letter ID</th>
                                    <th className="border-0 py-3">Employee</th>
                                    <th className="border-0 py-3">Letter Type</th>
                                    <th className="border-0 py-3">Requested By</th>
                                    <th className="border-0 py-3">Date</th>
                                    <th className="border-0 py-3">Approval Level</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingLetters.map(letter => (
                                    <tr key={letter.id || letter.RequestId} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td className="px-4 py-3">
                                            <span style={{ fontFamily: 'monospace', background: '#f8faff', borderRadius: 6, padding: '2px 8px', border: '1px solid #e5e7eb', fontSize: '0.78rem', color: '#374151' }}>{letter.id || letter.RequestId}</span>
                                        </td>
                                        <td className="py-3 fw-semibold" style={{ color: '#111827' }}>{letter.employee}</td>
                                        <td className="py-3">
                                            <span style={{ background: '#eff6ff', color: '#2563eb', borderRadius: 20, padding: '2px 10px', fontSize: '0.71rem', fontWeight: 700 }}>{letter.letter_type || letter.type}</span>
                                        </td>
                                        <td className="py-3" style={{ color: '#6b7280', fontSize: '0.78rem' }}>{letter.requested_by || letter.requestedBy}</td>
                                        <td className="py-3" style={{ color: '#6b7280' }}>{letter.date || letter.requestDate}</td>
                                        <td className="py-3">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ flex: 1, height: 5, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden', maxWidth: 70 }}>
                                                    <div style={{ width: `${((letter.currentLevel || letter.approval_level) / (letter.totalLevels || 3)) * 100}%`, height: '100%', background: '#d97706', borderRadius: 99 }} />
                                                </div>
                                                <span style={{ fontSize: '0.73rem', color: '#6b7280' }}>Level {letter.currentLevel || letter.approval_level}/{letter.totalLevels || 3}</span>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <div className="d-flex gap-2">
                                                <button onClick={() => handleAction(letter.id || letter.RequestId, 'APPROVE')} style={{ padding: '4px 10px', borderRadius: 8, background: '#dcfce7', color: '#16a34a', border: 'none', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}>✅ Approve</button>
                                                <button onClick={() => handleAction(letter.id || letter.RequestId, 'REJECT')} style={{ padding: '4px 10px', borderRadius: 8, background: '#fee2e2', color: '#dc2626', border: 'none', fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer' }}>❌ Reject</button>
                                                <button style={{ padding: '4px 10px', borderRadius: 8, background: '#f1f5f9', color: '#374151', border: 'none', fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer' }}>👁 View</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Approval Workflows */}
            {activeSection === 'workflows' && (
                <div className="d-flex flex-column gap-3">
                    {workflows.map(wf => (
                        <div key={wf.id} className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div
                                className="px-4 py-3 d-flex align-items-center justify-content-between"
                                style={{ background: '#f8faff', cursor: 'pointer' }}
                                onClick={() => setExpandedWorkflow(expandedWorkflow === wf.id ? null : wf.id)}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🔄</div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111827' }}>{wf.name}</div>
                                        <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Applied to: <strong style={{ color: '#2563eb' }}>{wf.letterType}</strong> · {wf.steps.length} approval levels</div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <span style={{ background: wf.status === 'Active' ? '#dcfce7' : '#fef3c7', color: wf.status === 'Active' ? '#16a34a' : '#b45309', borderRadius: 20, padding: '2px 10px', fontSize: '0.71rem', fontWeight: 700 }}>{wf.status}</span>
                                    <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{expandedWorkflow === wf.id ? '▲' : '▼'}</span>
                                </div>
                            </div>
                            {expandedWorkflow === wf.id && (
                                <div className="px-4 py-4 border-top" style={{ background: '#fff' }}>
                                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: 12 }}>Approval Flow</div>
                                    <FlowVisualizer steps={wf.steps} />
                                    <div className="mt-4 pt-3 border-top d-flex gap-2">
                                        <button style={{ padding: '5px 14px', borderRadius: 8, background: '#eff6ff', color: '#2563eb', border: 'none', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>✏️ Edit Workflow</button>
                                        <button style={{ padding: '5px 14px', borderRadius: 8, background: '#f1f5f9', color: '#374151', border: 'none', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>+ Add Level</button>
                                        <button style={{ padding: '5px 14px', borderRadius: 8, background: '#fff1f2', color: '#dc2626', border: 'none', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>🗑 Delete</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* New Workflow Modal */}
            {showModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.45)' }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 500 }}>
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: 20 }}>
                            <div style={{ height: 4, background: '#d97706', borderRadius: '20px 20px 0 0' }} />
                            <div className="modal-header border-0 px-4 pt-4 pb-2">
                                <div>
                                    <h5 className="fw-bold mb-0" style={{ fontSize: '1rem' }}>🔄 Create Approval Workflow</h5>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Define multi-level approval steps for a letter type</div>
                                </div>
                                <button className="btn-close" onClick={() => setShowModal(false)} />
                            </div>
                            <div className="modal-body px-4 py-3">
                                <div className="mb-3">
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Workflow Name *</label>
                                    <input className="form-control form-control-sm rounded-3" placeholder="e.g. Offer Letter Approval" value={workflowForm.name} onChange={e => setWorkflowForm({...workflowForm, name: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Letter Type</label>
                                    <select className="form-select form-select-sm rounded-3" value={workflowForm.letter_type} onChange={e => setWorkflowForm({...workflowForm, letter_type: e.target.value})}>
                                        <option>Offer Letter</option><option>Appointment Letter</option><option>Relieving Letter</option><option>Increment Letter</option>
                                    </select>
                                </div>
                                <div style={{ background: '#f8faff', borderRadius: 12, padding: 14, border: '1px solid #e0e7ff', fontSize: '0.78rem', color: '#374151' }}>
                                    <div style={{ fontWeight: 600, marginBottom: 6 }}>ℹ️ How it works</div>
                                    After creating the workflow, add approval levels (Level 1 → Level 2 → ...) and assign approvers for each level. Letters will move to the next level only after the current level approves.
                                </div>
                            </div>
                            <div className="modal-footer border-0 px-4 pb-4 pt-2 gap-2">
                                <button onClick={() => setShowModal(false)} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#f1f5f9', border: 'none', color: '#374151', fontWeight: 600 }}>Cancel</button>
                                <button onClick={handleSaveWorkflow} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#d97706', border: 'none', color: '#fff', fontWeight: 700 }}>Create Workflow</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApprovalUI;

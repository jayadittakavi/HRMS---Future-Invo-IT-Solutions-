import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import { MdPendingActions } from 'react-icons/md';

const card = { background: '#fff', borderRadius: 10, border: '1px solid #e8ecf0', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '14px 16px' };

const initRequests = [
    { id: 1, name: 'John Doe', dept: 'Engineering', type: 'Sick Leave', from: 'Feb 20', to: 'Feb 21', days: 2, reason: 'Viral Fever', avatar: 'JD', applied: '2 days ago' },
    { id: 2, name: 'Jane Smith', dept: 'Sales', type: 'Casual Leave', from: 'Feb 25', to: 'Feb 25', days: 1, reason: 'Personal work', avatar: 'JS', applied: '1 day ago' },
    { id: 3, name: 'Riya Gupta', dept: 'HR', type: 'Privilege', from: 'Mar 02', to: 'Mar 04', days: 3, reason: 'Family function', avatar: 'RG', applied: '5 hrs ago' },
    { id: 4, name: 'Arjun Mehta', dept: 'Marketing', type: 'Sick Leave', from: 'Feb 19', to: 'Feb 20', days: 2, reason: 'Dengue treatment', avatar: 'AM', applied: '3 days ago' },
];

const avatarColor = (i) => ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5];

const PendingRequests = () => {
    const [requests, setRequests] = useState(initRequests);
    const [search, setSearch] = useState('');
    const [viewId, setViewId] = useState(null);
    const [rejectModal, setRejectModal] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [actionMsg, setActionMsg] = useState('');

    const filtered = requests.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase())
    );

    const notify = (msg) => { setActionMsg(msg); setTimeout(() => setActionMsg(''), 3000); };

    const approve = (id) => {
        setRequests(prev => prev.filter(r => r.id !== id));
        notify('✅ Leave approved successfully.');
    };

    const rejectConfirm = () => {
        if (!rejectReason.trim()) return;
        setRequests(prev => prev.filter(r => r.id !== rejectModal));
        setRejectModal(null);
        setRejectReason('');
        notify('❌ Leave rejected.');
    };

    const viewing = requests.find(r => r.id === viewId);

    return (
        <div>
            {/* Notification */}
            {actionMsg && (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '8px 14px', marginBottom: 10, fontSize: '0.78rem', fontWeight: 600, color: '#166534' }}>
                    {actionMsg}
                </div>
            )}

            <div style={card}>
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                        <MdPendingActions size={16} style={{ color: '#f59e0b' }} />
                        <span className="fw-bold" style={{ fontSize: '0.88rem' }}>Pending Approvals</span>
                        <span style={{ background: '#fef3c7', color: '#92400e', borderRadius: 20, padding: '1px 8px', fontSize: '0.65rem', fontWeight: 700 }}>{filtered.length}</span>
                    </div>
                    {/* Search */}
                    <div style={{ position: 'relative' }}>
                        <FaSearch size={11} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{ paddingLeft: 28, paddingRight: 10, height: 30, fontSize: '0.75rem', border: '1px solid #e2e8f0', borderRadius: 8, outline: 'none', width: 180 }}
                        />
                    </div>
                </div>

                {/* Table */}
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px 0', color: '#94a3b8', fontSize: '0.82rem' }}>
                        🎉 No pending leave requests
                    </div>
                ) : (
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.76rem' }}>
                        <thead>
                            <tr>
                                {['Employee', 'Dept', 'Type', 'Duration', 'Applied', 'Actions'].map(h => (
                                    <th key={h} style={{ padding: '5px 8px', fontSize: '0.62rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((r, i) => (
                                <tr key={r.id}>
                                    <td style={{ padding: '7px 8px' }}>
                                        <div className="d-flex align-items-center gap-2">
                                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: avatarColor(i), color: '#fff', fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.avatar}</div>
                                            <div>
                                                <div className="fw-bold" style={{ lineHeight: 1.2 }}>{r.name}</div>
                                                <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>{r.reason}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '7px 8px', color: '#64748b' }}>{r.dept}</td>
                                    <td style={{ padding: '7px 8px' }}>
                                        <span style={{ background: '#ede9fe', color: '#4f46e5', borderRadius: 20, padding: '2px 8px', fontSize: '0.63rem', fontWeight: 700 }}>{r.type}</span>
                                    </td>
                                    <td style={{ padding: '7px 8px', color: '#64748b' }}>
                                        {r.from} → {r.to}
                                        <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>{r.days}d</div>
                                    </td>
                                    <td style={{ padding: '7px 8px', color: '#94a3b8', fontSize: '0.68rem' }}>{r.applied}</td>
                                    <td style={{ padding: '7px 8px' }}>
                                        <div className="d-flex align-items-center gap-1">
                                            <button
                                                title="View Details"
                                                onClick={() => setViewId(r.id)}
                                                style={{ background: '#f1f5f9', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', color: '#4f46e5' }}>
                                                <FaEye size={11} />
                                            </button>
                                            <button
                                                title="Approve"
                                                onClick={() => approve(r.id)}
                                                style={{ background: '#d1fae5', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', color: '#065f46', fontWeight: 700, fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 3 }}>
                                                <FaCheck size={10} /> OK
                                            </button>
                                            <button
                                                title="Reject"
                                                onClick={() => setRejectModal(r.id)}
                                                style={{ background: '#fee2e2', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', color: '#991b1b', fontWeight: 700, fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 3 }}>
                                                <FaTimes size={10} /> No
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* View Modal */}
            {viewId && viewing && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#fff', borderRadius: 14, padding: '24px', width: 420, maxWidth: '95vw', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="fw-bold" style={{ fontSize: '0.92rem' }}>Leave Request Details</div>
                            <button onClick={() => setViewId(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1.1rem' }}>✕</button>
                        </div>
                        {[
                            ['Employee', viewing.name], ['Department', viewing.dept], ['Leave Type', viewing.type],
                            ['From', viewing.from], ['To', viewing.to], ['Duration', `${viewing.days} day(s)`],
                            ['Reason', viewing.reason], ['Applied', viewing.applied]
                        ].map(([k, v]) => (
                            <div key={k} className="d-flex justify-content-between py-1" style={{ borderBottom: '1px solid #f1f5f9', fontSize: '0.78rem' }}>
                                <span style={{ color: '#64748b', fontWeight: 600 }}>{k}</span>
                                <span style={{ fontWeight: 700 }}>{v}</span>
                            </div>
                        ))}
                        <div className="d-flex gap-2 mt-3">
                            <button onClick={() => { approve(viewId); setViewId(null); }} style={{ flex: 1, background: '#d1fae5', border: 'none', borderRadius: 8, padding: '8px', color: '#065f46', fontWeight: 700, cursor: 'pointer', fontSize: '0.78rem' }}>✓ Approve</button>
                            <button onClick={() => { setRejectModal(viewId); setViewId(null); }} style={{ flex: 1, background: '#fee2e2', border: 'none', borderRadius: 8, padding: '8px', color: '#991b1b', fontWeight: 700, cursor: 'pointer', fontSize: '0.78rem' }}>✕ Reject</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {rejectModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#fff', borderRadius: 14, padding: '24px', width: 380, maxWidth: '95vw', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                        <div className="fw-bold mb-1" style={{ fontSize: '0.92rem' }}>Reject Leave Request</div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: 14 }}>Please provide a reason for rejection.</div>
                        <textarea
                            rows="3"
                            placeholder="Rejection reason..."
                            value={rejectReason}
                            onChange={e => setRejectReason(e.target.value)}
                            style={{ width: '100%', borderRadius: 8, border: '1px solid #e2e8f0', padding: '8px 10px', fontSize: '0.8rem', resize: 'none', outline: 'none' }}
                        />
                        <div className="d-flex gap-2 mt-3">
                            <button onClick={() => { setRejectModal(null); setRejectReason(''); }} style={{ flex: 1, background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '8px', color: '#475569', fontWeight: 600, cursor: 'pointer', fontSize: '0.78rem' }}>Cancel</button>
                            <button onClick={rejectConfirm} style={{ flex: 1, background: '#ef4444', border: 'none', borderRadius: 8, padding: '8px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.78rem' }}>Confirm Rejection</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingRequests;

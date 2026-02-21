import React, { useState } from 'react';
import { FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import { MdPlaylistAddCheck, MdCheckCircle, MdCancel } from 'react-icons/md';

const card = { background: '#fff', borderRadius: 10, border: '1px solid #e8ecf0', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '14px 16px' };

const initRequests = [
    { id: 1, name: 'John Doe', dept: 'Engineering', type: 'Sick Leave', from: 'Feb 20', to: 'Feb 21', days: 2, reason: 'Viral Fever', avatar: 'JD' },
    { id: 2, name: 'Alice Wonder', dept: 'Marketing', type: 'Sick Leave', from: 'Feb 20', to: 'Feb 20', days: 1, reason: 'Viral Fever', avatar: 'AW' },
    { id: 3, name: 'Bob Builder', dept: 'Sales', type: 'Sick Leave', from: 'Feb 20', to: 'Feb 20', days: 1, reason: 'Viral Fever', avatar: 'BB' },
    { id: 4, name: 'Charlie Ray', dept: 'Engineering', type: 'Casual Leave', from: 'Feb 22', to: 'Feb 22', days: 1, reason: 'Family function', avatar: 'CR' },
];

const avatarColor = (i) => ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'][i % 4];

const BulkApproval = () => {
    const [requests, setRequests] = useState(initRequests);
    const [selectedIds, setSelectedIds] = useState([]);
    const [search, setSearch] = useState('');
    const [rejectModal, setRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [toast, setToast] = useState('');

    const notify = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

    const filtered = requests.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase())
    );

    const toggle = (id) => setSelectedIds(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);
    const toggleAll = () => setSelectedIds(p => p.length === filtered.length ? [] : filtered.map(r => r.id));

    const bulkApprove = () => {
        setRequests(p => p.filter(r => !selectedIds.includes(r.id)));
        notify(`✅ ${selectedIds.length} request(s) approved.`);
        setSelectedIds([]);
    };

    const bulkReject = () => {
        if (!rejectReason.trim()) return;
        setRequests(p => p.filter(r => !selectedIds.includes(r.id)));
        notify(`❌ ${selectedIds.length} request(s) rejected.`);
        setSelectedIds([]);
        setRejectModal(false);
        setRejectReason('');
    };

    return (
        <div>
            {toast && (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '8px 14px', marginBottom: 10, fontSize: '0.78rem', fontWeight: 600, color: '#166534' }}>
                    {toast}
                </div>
            )}

            <div style={card}>
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                    <div className="d-flex align-items-center gap-2">
                        <MdPlaylistAddCheck size={17} style={{ color: '#4f46e5' }} />
                        <span className="fw-bold" style={{ fontSize: '0.88rem' }}>Bulk Leave Approval</span>
                        {selectedIds.length > 0 && (
                            <span style={{ background: '#ede9fe', color: '#4f46e5', borderRadius: 20, padding: '1px 8px', fontSize: '0.65rem', fontWeight: 700 }}>
                                {selectedIds.length} selected
                            </span>
                        )}
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        {/* Search */}
                        <div style={{ position: 'relative' }}>
                            <FaSearch size={11} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ paddingLeft: 26, paddingRight: 8, height: 30, fontSize: '0.74rem', border: '1px solid #e2e8f0', borderRadius: 7, outline: 'none', width: 160 }}
                            />
                        </div>

                        {/* Bulk Actions */}
                        <button
                            disabled={selectedIds.length === 0}
                            onClick={bulkApprove}
                            style={{
                                background: selectedIds.length ? '#d1fae5' : '#f8fafc', border: 'none', borderRadius: 7,
                                padding: '5px 12px', fontSize: '0.72rem', fontWeight: 700, color: selectedIds.length ? '#065f46' : '#cbd5e1',
                                cursor: selectedIds.length ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 4
                            }}>
                            <MdCheckCircle size={13} /> Approve
                        </button>
                        <button
                            disabled={selectedIds.length === 0}
                            onClick={() => setRejectModal(true)}
                            style={{
                                background: selectedIds.length ? '#fee2e2' : '#f8fafc', border: 'none', borderRadius: 7,
                                padding: '5px 12px', fontSize: '0.72rem', fontWeight: 700, color: selectedIds.length ? '#991b1b' : '#cbd5e1',
                                cursor: selectedIds.length ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 4
                            }}>
                            <MdCancel size={13} /> Reject
                        </button>
                    </div>
                </div>

                {/* Table */}
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px 0', color: '#94a3b8', fontSize: '0.82rem' }}>
                        🎉 All leaves processed
                    </div>
                ) : (
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.76rem' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '5px 8px', width: 36 }}>
                                    <input type="checkbox" className="form-check-input" style={{ cursor: 'pointer' }}
                                        checked={selectedIds.length === filtered.length && filtered.length > 0}
                                        onChange={toggleAll} />
                                </th>
                                {['Employee', 'Dept', 'Type', 'Date', 'Days', 'Reason'].map(h => (
                                    <th key={h} style={{ padding: '5px 8px', fontSize: '0.62rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((r, i) => (
                                <tr key={r.id} style={{ background: selectedIds.includes(r.id) ? '#f5f3ff' : 'transparent' }}>
                                    <td style={{ padding: '6px 8px' }}>
                                        <input type="checkbox" className="form-check-input" style={{ cursor: 'pointer' }}
                                            checked={selectedIds.includes(r.id)}
                                            onChange={() => toggle(r.id)} />
                                    </td>
                                    <td style={{ padding: '6px 8px' }}>
                                        <div className="d-flex align-items-center gap-2">
                                            <div style={{ width: 26, height: 26, borderRadius: '50%', background: avatarColor(i), color: '#fff', fontSize: '0.58rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.avatar}</div>
                                            <span className="fw-bold">{r.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '6px 8px', color: '#64748b' }}>{r.dept}</td>
                                    <td style={{ padding: '6px 8px' }}>
                                        <span style={{ background: '#ede9fe', color: '#4f46e5', borderRadius: 20, padding: '2px 8px', fontSize: '0.63rem', fontWeight: 700 }}>{r.type}</span>
                                    </td>
                                    <td style={{ padding: '6px 8px', color: '#64748b', fontSize: '0.72rem' }}>{r.from}</td>
                                    <td style={{ padding: '6px 8px', fontWeight: 700 }}>{r.days}d</td>
                                    <td style={{ padding: '6px 8px', color: '#64748b', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Reject Modal */}
            {rejectModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#fff', borderRadius: 14, padding: '24px', width: 380, maxWidth: '95vw', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                        <div className="fw-bold mb-1" style={{ fontSize: '0.92rem' }}>Reject {selectedIds.length} Request(s)</div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: 14 }}>Provide a common rejection reason for all selected leaves.</div>
                        <textarea rows="3" placeholder="Reason for rejection..."
                            value={rejectReason} onChange={e => setRejectReason(e.target.value)}
                            style={{ width: '100%', borderRadius: 8, border: '1px solid #e2e8f0', padding: '8px 10px', fontSize: '0.8rem', resize: 'none', outline: 'none' }} />
                        <div className="d-flex gap-2 mt-3">
                            <button onClick={() => { setRejectModal(false); setRejectReason(''); }}
                                style={{ flex: 1, background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '8px', color: '#475569', fontWeight: 600, cursor: 'pointer', fontSize: '0.78rem' }}>Cancel</button>
                            <button onClick={bulkReject}
                                style={{ flex: 1, background: '#ef4444', border: 'none', borderRadius: 8, padding: '8px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.78rem' }}>Confirm Rejection</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulkApproval;

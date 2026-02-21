import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { FaLaptopHouse, FaCheckCircle, FaTimesCircle, FaSearch, FaPlus, FaTimes, FaDownload } from 'react-icons/fa';
import { MdPendingActions } from 'react-icons/md';
import { useAuth } from '../../../../context/AuthContext';

/* ─── shared style tokens ─── */
const card = {
    background: '#fff',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    padding: '14px 16px',
};

const statusMeta = {
    Pending: { bg: '#fef9ec', color: '#92400e', border: '#fde68a' },
    Approved: { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
    Rejected: { bg: '#fef2f2', color: '#991b1b', border: '#fecaca' },
};

const avatarColors = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#7c3aed'];
const avatarBg = (i) => avatarColors[i % avatarColors.length];

const kpis = [
    { label: 'Total WFH', val: '12', borderColor: '#4f46e5', icon: <FaLaptopHouse size={16} color="#4f46e5" /> },
    { label: 'Pending', val: '2', borderColor: '#d97706', icon: <MdPendingActions size={17} color="#d97706" /> },
    { label: 'Approved', val: '8', borderColor: '#059669', icon: <FaCheckCircle size={15} color="#059669" /> },
    { label: 'Rejected', val: '2', borderColor: '#dc2626', icon: <FaTimesCircle size={15} color="#dc2626" /> },
];

const initRequests = [
    { id: 1, employee: 'John Doe', dept: 'Engineering', startDate: '2026-06-01', endDate: '2026-06-05', days: 5, reason: 'Medical Emergency', status: 'Pending', avatar: 'JD' },
    { id: 2, employee: 'Jane Smith', dept: 'Sales', startDate: '2026-06-10', endDate: '2026-06-12', days: 3, reason: 'Home Renovation', status: 'Approved', avatar: 'JS' },
    { id: 3, employee: 'Riya Gupta', dept: 'HR', startDate: '2026-06-15', endDate: '2026-06-15', days: 1, reason: 'Internet Works', status: 'Pending', avatar: 'RG' },
    { id: 4, employee: 'Arjun Sen', dept: 'Marketing', startDate: '2026-05-28', endDate: '2026-05-30', days: 3, reason: 'Project Deadline', status: 'Rejected', avatar: 'AS' },
];

const WFHRequests = () => {
    const { user } = useAuth();
    const isManager = ['superadmin', 'admin', 'hr', 'manager'].includes(user?.role?.toLowerCase());

    const [requests, setRequests] = useState(initRequests);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatus] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState('');
    const [form, setForm] = useState({ employee: '', startDate: '', endDate: '', reason: '' });

    const notify = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

    const filtered = requests.filter(r => {
        const matchSearch = r.employee.toLowerCase().includes(search.toLowerCase()) || r.dept.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All' || r.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const approve = (id) => {
        setRequests(p => p.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
        notify('Request approved successfully.');
    };

    const reject = (id) => {
        setRequests(p => p.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
        notify('Request rejected.');
    };

    const addRequest = (e) => {
        e.preventDefault();
        const initials = (form.employee || user?.name || 'ME').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
        setRequests(p => [...p, {
            id: Date.now(),
            employee: form.employee || user?.name || 'Me',
            dept: user?.department || 'General',
            startDate: form.startDate,
            endDate: form.endDate,
            days: 1,
            reason: form.reason,
            status: 'Pending',
            avatar: initials,
        }]);
        setShowModal(false);
        setForm({ employee: '', startDate: '', endDate: '', reason: '' });
        notify('WFH request submitted successfully.');
    };

    return (
        <DashboardLayout title="WFH Requests">
            <div style={{ fontSize: '0.83rem' }}>

                {/* Toast */}
                {toast && (
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6, padding: '8px 14px', marginBottom: 10, fontSize: '0.77rem', fontWeight: 600, color: '#166534', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FaCheckCircle size={12} color="#16a34a" /> {toast}
                    </div>
                )}

                {/* ── Page Header ── */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <div className="fw-bold" style={{ fontSize: '0.95rem', color: '#0f172a' }}>Remote Work / WFH Requests</div>
                        <div style={{ fontSize: '0.73rem', color: '#64748b', marginTop: 2 }}>
                            {isManager
                                ? 'Review, approve, and manage remote work allocations for your team.'
                                : 'Submit and track your work-from-home requests.'}
                        </div>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            background: '#1e293b', color: '#fff', border: 'none', borderRadius: 7,
                            padding: '7px 16px', fontSize: '0.76rem', fontWeight: 600,
                            display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                            letterSpacing: '0.02em',
                        }}>
                        <FaPlus size={10} />
                        {isManager ? 'Allocate WFH' : 'Request WFH'}
                    </button>
                </div>

                {/* ── KPI Cards ── */}
                <div className="row g-2 mb-3">
                    {kpis.map((k, i) => (
                        <div key={i} className="col-6 col-md-3">
                            <div style={{ ...card, borderLeft: `3px solid ${k.borderColor}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ flexShrink: 0 }}>{k.icon}</div>
                                <div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{k.val}</div>
                                    <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>{k.label}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Main Table ── */}
                <div style={card}>
                    {/* Table Header / Filters */}
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                        <div className="d-flex align-items-center gap-2">
                            <FaLaptopHouse size={13} color="#475569" />
                            <span className="fw-semibold" style={{ fontSize: '0.84rem', color: '#1e293b' }}>WFH Request Log</span>
                            <span style={{ background: '#f1f5f9', color: '#475569', borderRadius: 20, padding: '1px 9px', fontSize: '0.65rem', fontWeight: 700 }}>
                                {filtered.length}
                            </span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            {/* Search */}
                            <div style={{ position: 'relative' }}>
                                <FaSearch size={10} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    placeholder="Search employee or dept..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    style={{ paddingLeft: 27, paddingRight: 10, height: 30, fontSize: '0.74rem', border: '1px solid #e2e8f0', borderRadius: 6, width: 200, outline: 'none', color: '#1e293b' }}
                                />
                            </div>
                            {/* Status filter */}
                            <select
                                value={statusFilter}
                                onChange={e => setStatus(e.target.value)}
                                style={{ height: 30, fontSize: '0.74rem', border: '1px solid #e2e8f0', borderRadius: 6, padding: '0 10px', outline: 'none', color: '#1e293b' }}>
                                {['All', 'Pending', 'Approved', 'Rejected'].map(s => <option key={s}>{s}</option>)}
                            </select>
                            {/* Export */}
                            <button style={{ height: 30, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: '0 12px', fontSize: '0.72rem', fontWeight: 600, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                                <FaDownload size={10} /> Export
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.76rem' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc' }}>
                                {['Employee', 'Department', 'Period', 'Days', 'Reason', 'Status', ...(isManager ? ['Actions'] : [])].map(h => (
                                    <th key={h} style={{ padding: '7px 10px', fontSize: '0.63rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', border: 'none', borderBottom: '1px solid #e2e8f0' }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={isManager ? 7 : 6} style={{ textAlign: 'center', padding: '32px 0', color: '#94a3b8', fontSize: '0.8rem' }}>
                                        No WFH requests match your filters.
                                    </td>
                                </tr>
                            ) : filtered.map((r, i) => {
                                const sty = statusMeta[r.status] || {};
                                return (
                                    <tr key={r.id}>
                                        {/* Employee */}
                                        <td style={{ padding: '8px 10px' }}>
                                            <div className="d-flex align-items-center gap-2">
                                                <div style={{
                                                    width: 28, height: 28, borderRadius: '50%',
                                                    background: avatarBg(i), color: '#fff',
                                                    fontSize: '0.6rem', fontWeight: 700,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                                }}>
                                                    {r.avatar}
                                                </div>
                                                <span className="fw-semibold" style={{ color: '#0f172a' }}>{r.employee}</span>
                                            </div>
                                        </td>
                                        {/* Dept */}
                                        <td style={{ padding: '8px 10px', color: '#475569' }}>{r.dept}</td>
                                        {/* Period */}
                                        <td style={{ padding: '8px 10px', color: '#475569' }}>
                                            {r.startDate} &mdash; {r.endDate}
                                        </td>
                                        {/* Days */}
                                        <td style={{ padding: '8px 10px', fontWeight: 700, color: '#0f172a' }}>{r.days}d</td>
                                        {/* Reason */}
                                        <td style={{ padding: '8px 10px', color: '#64748b', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {r.reason}
                                        </td>
                                        {/* Status */}
                                        <td style={{ padding: '8px 10px' }}>
                                            <span style={{
                                                background: sty.bg, color: sty.color,
                                                border: `1px solid ${sty.border}`,
                                                borderRadius: 4, padding: '2px 9px',
                                                fontSize: '0.65rem', fontWeight: 700,
                                                textTransform: 'uppercase', letterSpacing: '0.04em'
                                            }}>
                                                {r.status}
                                            </span>
                                        </td>
                                        {/* Actions */}
                                        {isManager && (
                                            <td style={{ padding: '8px 10px' }}>
                                                {r.status === 'Pending' ? (
                                                    <div className="d-flex gap-1">
                                                        <button
                                                            onClick={() => approve(r.id)}
                                                            title="Approve"
                                                            style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 5, padding: '3px 10px', cursor: 'pointer', color: '#166534', fontWeight: 600, fontSize: '0.7rem' }}>
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => reject(r.id)}
                                                            title="Reject"
                                                            style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 5, padding: '3px 10px', cursor: 'pointer', color: '#991b1b', fontWeight: 600, fontSize: '0.7rem' }}>
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Processed</span>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* ── Add / Request Modal ── */}
                {showModal && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ background: '#fff', borderRadius: 10, padding: '24px', width: 440, maxWidth: '95vw', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}>
                            {/* Modal Header */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#0f172a' }}>
                                        {isManager ? 'Allocate WFH' : 'Request Work From Home'}
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 2 }}>
                                        {isManager ? 'Assign remote work days to an employee.' : 'Submit a WFH request for approval.'}
                                    </div>
                                </div>
                                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4 }}>
                                    <FaTimes size={14} />
                                </button>
                            </div>

                            <form onSubmit={addRequest}>
                                {/* Employee (managers only) */}
                                {isManager && (
                                    <div className="mb-3">
                                        <label style={{ fontSize: '0.71rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                            Employee Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. John Doe"
                                            value={form.employee}
                                            onChange={e => setForm({ ...form, employee: e.target.value })}
                                            style={{ width: '100%', borderRadius: 6, border: '1px solid #d1d5db', padding: '8px 10px', fontSize: '0.82rem', outline: 'none', color: '#0f172a' }}
                                        />
                                    </div>
                                )}

                                {/* Dates */}
                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <label style={{ fontSize: '0.71rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>From Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={form.startDate}
                                            onChange={e => setForm({ ...form, startDate: e.target.value })}
                                            style={{ width: '100%', borderRadius: 6, border: '1px solid #d1d5db', padding: '8px 10px', fontSize: '0.82rem', outline: 'none', color: '#0f172a' }}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label style={{ fontSize: '0.71rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>To Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={form.endDate}
                                            onChange={e => setForm({ ...form, endDate: e.target.value })}
                                            style={{ width: '100%', borderRadius: 6, border: '1px solid #d1d5db', padding: '8px 10px', fontSize: '0.82rem', outline: 'none', color: '#0f172a' }}
                                        />
                                    </div>
                                </div>

                                {/* Reason */}
                                <div className="mb-4">
                                    <label style={{ fontSize: '0.71rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                        Reason / Project Description
                                    </label>
                                    <textarea
                                        required
                                        rows="3"
                                        placeholder="Briefly describe the reason or active project..."
                                        value={form.reason}
                                        onChange={e => setForm({ ...form, reason: e.target.value })}
                                        style={{ width: '100%', borderRadius: 6, border: '1px solid #d1d5db', padding: '8px 10px', fontSize: '0.82rem', resize: 'none', outline: 'none', color: '#0f172a' }}
                                    />
                                </div>

                                {/* Footer buttons */}
                                <div className="d-flex gap-2 justify-content-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: '7px 18px', color: '#475569', fontWeight: 600, cursor: 'pointer', fontSize: '0.77rem' }}>
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        style={{ background: '#1e293b', border: 'none', borderRadius: 6, padding: '7px 18px', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.77rem' }}>
                                        {isManager ? 'Allocate' : 'Submit Request'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default WFHRequests;

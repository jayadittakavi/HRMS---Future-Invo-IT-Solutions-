import React, { useState, useEffect } from 'react';
import { FaSearch, FaDownload } from 'react-icons/fa';
import { MdHistory } from 'react-icons/md';
import { leaveService } from '../../../../../services/leaveService';

const card = { background: '#fff', borderRadius: 10, border: '1px solid #e8ecf0', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '14px 16px' };

const statusStyle = (s) => ({
    Approved: { bg: '#d1fae5', color: '#065f46' },
    Rejected: { bg: '#fee2e2', color: '#991b1b' },
    Pending: { bg: '#fef3c7', color: '#92400e' },
}[s] || { bg: '#f1f5f9', color: '#475569' });

const avatarBg = (i) => ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6', '#ec4899'][i % 7];

const LeaveHistory = ({ personal = false }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');

    useEffect(() => {
        fetchHistory();
    }, [statusFilter, typeFilter, personal]);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const filters = {
                status: statusFilter !== 'All' ? statusFilter : undefined,
                type: typeFilter !== 'All' ? typeFilter : undefined,
                personal: personal || undefined
            };
            
            // If it's personal, use the optimized personal history endpoint
            const data = personal 
                ? await leaveService.getAllMine() 
                : await leaveService.getHistory(filters);
                
            if (Array.isArray(data)) {
                setHistory(data);
            }
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setLoading(false);
        }
    };

    const filtered = history.filter(h => 
        (h.name && h.name.toLowerCase().includes(search.toLowerCase())) || 
        (h.type && h.type.toLowerCase().includes(search.toLowerCase()))
    );

    const types = ['All', ...Array.from(new Set(history.map(h => h.type)))];

    if (loading) return <div className="p-4 text-center">Loading history...</div>;

    return (
        <div style={card}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <div className="d-flex align-items-center gap-2">
                    <MdHistory size={16} style={{ color: '#4f46e5' }} />
                    <span className="fw-bold" style={{ fontSize: '0.88rem' }}>{personal ? 'My Leave History' : 'Leave History Log'}</span>
                    <span style={{ background: '#ede9fe', color: '#4f46e5', borderRadius: 20, padding: '1px 8px', fontSize: '0.65rem', fontWeight: 700 }}>{filtered.length}</span>
                </div>

                {/* Controls */}
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    {/* Search */}
                    <div style={{ position: 'relative' }}>
                        <FaSearch size={10} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                            style={{ paddingLeft: 26, height: 30, fontSize: '0.74rem', border: '1px solid #e2e8f0', borderRadius: 7, width: 150, outline: 'none' }} />
                    </div>
                    {/* Status filter */}
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                        style={{ height: 30, fontSize: '0.74rem', border: '1px solid #e2e8f0', borderRadius: 7, padding: '0 10px', outline: 'none' }}>
                        {['All', 'Approved', 'Rejected', 'Pending'].map(s => <option key={s}>{s}</option>)}
                    </select>
                    {/* Type filter */}
                    <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                        style={{ height: 30, fontSize: '0.74rem', border: '1px solid #e2e8f0', borderRadius: 7, padding: '0 10px', outline: 'none' }}>
                        {types.map(t => <option key={t}>{t}</option>)}
                    </select>
                    {/* Export */}
                    <button style={{ height: 30, background: '#f1f5f9', border: 'none', borderRadius: 7, padding: '0 12px', fontSize: '0.72rem', fontWeight: 600, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <FaDownload size={10} /> Export
                    </button>
                </div>
            </div>

            {/* Table */}
            {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 0', color: '#94a3b8', fontSize: '0.82rem' }}>No records found.</div>
            ) : (
                <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.76rem' }}>
                    <thead>
                        <tr>
                            {[personal ? 'Leave Type' : 'Employee', 'Type', 'Period', 'Days', 'Status', 'Approved By', 'Applied On'].map(h => (
                                <th key={h} style={{ padding: '5px 8px', fontSize: '0.62rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((r, i) => {
                            const sty = statusStyle(r.status);
                            return (
                                <tr key={r.id}>
                                    <td style={{ padding: '7px 8px' }}>
                                        {personal ? (
                                            <span style={{ background: '#ede9fe', color: '#4f46e5', borderRadius: 20, padding: '2px 8px', fontSize: '0.63rem', fontWeight: 700 }}>{r.type}</span>
                                        ) : (
                                            <div className="d-flex align-items-center gap-2">
                                                <div style={{ width: 26, height: 26, borderRadius: '50%', background: avatarBg(i), color: '#fff', fontSize: '0.58rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.avatar}</div>
                                                <span className="fw-bold">{r.name}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: '7px 8px', color: '#64748b' }}>{r.type}</td>
                                    <td style={{ padding: '7px 8px', color: '#64748b' }}>{r.from} → {r.to}</td>
                                    <td style={{ padding: '7px 8px', fontWeight: 700 }}>{r.days}d</td>
                                    <td style={{ padding: '7px 8px' }}>
                                        <span style={{ background: sty.bg, color: sty.color, borderRadius: 20, padding: '2px 10px', fontSize: '0.63rem', fontWeight: 700 }}>{r.status}</span>
                                    </td>
                                    <td style={{ padding: '7px 8px', color: '#64748b', fontSize: '0.72rem' }}>{r.approver}</td>
                                    <td style={{ padding: '7px 8px', color: '#94a3b8', fontSize: '0.68rem' }}>{r.applied}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LeaveHistory;

import React, { useState } from 'react';

/* ── Variable Data ─────────────────────────────────────── */
const INITIAL_VARS = [
    { id: 1, name: '{{employee_name}}', description: 'Full name of the employee', example: 'Alice Johnson', category: 'Employee', usedIn: ['Offer Letter', 'Appointment Letter', 'Relieving Letter'] },
    { id: 2, name: '{{employee_id}}', description: 'Unique employee identifier', example: 'EMP-0042', category: 'Employee', usedIn: ['Appointment Letter'] },
    { id: 3, name: '{{designation}}', description: 'Employee job title / designation', example: 'Frontend Developer', category: 'Employee', usedIn: ['Offer Letter', 'Appointment Letter'] },
    { id: 4, name: '{{department}}', description: 'Department the employee belongs to', example: 'Engineering', category: 'Employee', usedIn: ['Appointment Letter'] },
    { id: 5, name: '{{joining_date}}', description: 'Date employee officially joins', example: '01 March 2026', category: 'Date', usedIn: ['Offer Letter', 'Appointment Letter'] },
    { id: 6, name: '{{last_working_day}}', description: 'Last date of employment', example: '28 February 2026', category: 'Date', usedIn: ['Relieving Letter'] },
    { id: 7, name: '{{ctc_annual}}', description: 'Annual Cost to Company (salary)', example: '₹ 8,40,000', category: 'Finance', usedIn: ['Offer Letter'] },
    { id: 8, name: '{{basic_salary}}', description: 'Monthly basic salary component', example: '₹ 35,000', category: 'Finance', usedIn: ['Appointment Letter', 'Increment Letter'] },
    { id: 9, name: '{{company_name}}', description: 'Name of the organization', example: 'Future Invo IT Solutions', category: 'Company', usedIn: ['Offer Letter', 'Appointment Letter', 'Relieving Letter'] },
    { id: 10, name: '{{signatory_name}}', description: 'Name of the authorizing signatory', example: 'Rahul Gupta', category: 'Company', usedIn: ['Offer Letter', 'Appointment Letter'] },
    { id: 11, name: '{{notice_period}}', description: 'Notice period required per policy', example: '30 days', category: 'Policy', usedIn: ['Offer Letter', 'Relieving Letter'] },
    { id: 12, name: '{{increment_percent}}', description: 'Percentage of salary increment', example: '15%', category: 'Finance', usedIn: ['Increment Letter'] },
];

const CAT_STYLE = {
    Employee: { bg: '#eff6ff', color: '#1d4ed8', icon: '👤' },
    Date: { bg: '#dcfce7', color: '#15803d', icon: '📅' },
    Finance: { bg: '#fef3c7', color: '#b45309', icon: '💰' },
    Company: { bg: '#f5f3ff', color: '#6d28d9', icon: '🏢' },
    Policy: { bg: '#fff1f2', color: '#be123c', icon: '📋' },
};

const EMPTY = { name: '', description: '', example: '', category: 'Employee' };

const VariableUI = () => {
    const [vars, setVars] = useState(INITIAL_VARS);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [search, setSearch] = useState('');
    const [filterCat, setFilterCat] = useState('All');
    const [copied, setCopied] = useState(null);

    const openAdd = () => { setForm(EMPTY); setEditingId(null); setShowModal(true); };
    const openEdit = (v) => { setForm(v); setEditingId(v.id); setShowModal(true); };
    const handleDelete = (id) => { if (window.confirm('Delete this variable?')) setVars(vs => vs.filter(v => v.id !== id)); };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setVars(vs => vs.map(v => v.id === editingId ? { ...form, id: editingId, usedIn: v.usedIn } : v));
        } else {
            setVars(vs => [...vs, { ...form, id: Date.now(), usedIn: [] }]);
        }
        setShowModal(false);
    };
    const handleCopy = (name) => {
        navigator.clipboard.writeText(name).catch(() => { });
        setCopied(name);
        setTimeout(() => setCopied(null), 1500);
    };

    const filtered = vars.filter(v =>
        (filterCat === 'All' || v.category === filterCat) &&
        (v.name.toLowerCase().includes(search.toLowerCase()) || v.description.toLowerCase().includes(search.toLowerCase()))
    );

    const categories = [...new Set(vars.map(v => v.category))];

    return (
        <div>
            {/* How Variables Work Banner */}
            <div className="rounded-4 p-4 mb-4 d-flex align-items-start gap-3" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', color: '#fff' }}>
                <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>🧩</div>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>How Dynamic Variables Work</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.85, lineHeight: 1.6 }}>
                        Variables are placeholders inside letter templates that are automatically replaced with real employee data when a letter is generated.
                        For example, <code style={{ background: 'rgba(255,255,255,0.15)', padding: '1px 6px', borderRadius: 4 }}>{'{{employee_name}}'}</code> becomes <strong>Alice Johnson</strong> in the final letter.
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="row g-3 mb-4">
                {categories.map((cat, i) => {
                    const s = CAT_STYLE[cat] || { bg: '#f3f4f6', color: '#374151', icon: '📌' };
                    return (
                        <div key={i} className="col">
                            <div className="card border-0 shadow-sm rounded-4 p-3 text-center" style={{ cursor: 'pointer', minWidth: 100 }} onClick={() => setFilterCat(filterCat === cat ? 'All' : cat)}>
                                <div style={{ fontSize: '1.2rem' }}>{s.icon}</div>
                                <div style={{ fontSize: '0.68rem', color: '#9ca3af', marginTop: 2 }}>{cat}</div>
                                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: s.color }}>{vars.filter(v => v.category === cat).length}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Table Card */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2" style={{ background: '#f8faff' }}>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                        <div style={{ position: 'relative' }}>
                            <input style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: '5px 12px 5px 30px', fontSize: '0.8rem', outline: 'none', width: 200 }} placeholder="Search variables…" value={search} onChange={e => setSearch(e.target.value)} />
                            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: '#9ca3af' }}>🔍</span>
                        </div>
                        <select style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: '5px 10px', fontSize: '0.8rem', color: '#374151' }} value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                            <option value="All">All Categories</option>
                            {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <button onClick={openAdd} style={{ background: '#7c3aed', color: '#fff', borderRadius: 10, border: 'none', padding: '7px 18px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
                        + Add Variable
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.81rem' }}>
                        <thead>
                            <tr style={{ background: '#f8faff', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <th className="border-0 py-3 px-4">Variable Name</th>
                                <th className="border-0 py-3">Category</th>
                                <th className="border-0 py-3">Description</th>
                                <th className="border-0 py-3">Example Value</th>
                                <th className="border-0 py-3">Used In Templates</th>
                                <th className="border-0 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-5 text-muted" style={{ fontSize: '0.85rem' }}>No variables found</td></tr>
                            ) : filtered.map(v => {
                                const cs = CAT_STYLE[v.category] || { bg: '#f3f4f6', color: '#374151', icon: '📌' };
                                return (
                                    <tr key={v.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <code style={{ background: '#f0f9ff', color: '#0369a1', borderRadius: 6, padding: '3px 8px', fontSize: '0.78rem', fontFamily: 'monospace', border: '1px solid #e0f2fe', whiteSpace: 'nowrap' }}>{v.name}</code>
                                                <button
                                                    onClick={() => handleCopy(v.name)}
                                                    title="Copy to clipboard"
                                                    style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.75rem', color: copied === v.name ? '#16a34a' : '#9ca3af', padding: 0 }}
                                                >{copied === v.name ? '✅' : '📋'}</button>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <span style={{ background: cs.bg, color: cs.color, borderRadius: 20, padding: '2px 10px', fontSize: '0.71rem', fontWeight: 700 }}>{cs.icon} {v.category}</span>
                                        </td>
                                        <td className="py-3" style={{ color: '#374151', maxWidth: 200 }}>{v.description}</td>
                                        <td className="py-3">
                                            <span style={{ background: '#f8faff', color: '#374151', borderRadius: 6, padding: '2px 8px', fontSize: '0.76rem', fontStyle: 'italic', border: '1px solid #e5e7eb' }}>{v.example}</span>
                                        </td>
                                        <td className="py-3">
                                            <div className="d-flex flex-wrap gap-1">
                                                {v.usedIn.length === 0 ? (
                                                    <span style={{ color: '#9ca3af', fontSize: '0.72rem' }}>Not used yet</span>
                                                ) : v.usedIn.map((t, i) => (
                                                    <span key={i} style={{ background: '#eff6ff', color: '#2563eb', borderRadius: 6, padding: '1px 6px', fontSize: '0.68rem', fontWeight: 600 }}>{t}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <div className="d-flex gap-2">
                                                <button title="Edit" onClick={() => openEdit(v)} style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed', cursor: 'pointer', fontSize: '0.75rem' }}>✏️</button>
                                                <button title="Delete" onClick={() => handleDelete(v.id)} style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', cursor: 'pointer', fontSize: '0.75rem' }}>🗑</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.45)' }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 500 }}>
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: 20 }}>
                            <div style={{ height: 4, background: '#7c3aed', borderRadius: '20px 20px 0 0' }} />
                            <div className="modal-header border-0 px-4 pt-4 pb-2">
                                <div>
                                    <h5 className="fw-bold mb-0" style={{ fontSize: '1rem' }}>{editingId ? '✏️ Edit Variable' : '➕ Add New Variable'}</h5>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Define a reusable placeholder for letter templates</div>
                                </div>
                                <button className="btn-close" onClick={() => setShowModal(false)} />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body px-4 pt-2 pb-2">
                                    <div className="mb-3">
                                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Variable Name * <span style={{ color: '#9ca3af', fontWeight: 400 }}>(e.g. {'{{employee_name}}'})</span></label>
                                        <input required className="form-control form-control-sm rounded-3" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="{{variable_name}}" style={{ fontFamily: 'monospace' }} />
                                    </div>
                                    <div className="mb-3">
                                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Category</label>
                                        <select className="form-select form-select-sm rounded-3" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                            <option>Employee</option><option>Date</option><option>Finance</option><option>Company</option><option>Policy</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Description *</label>
                                        <input required className="form-control form-control-sm rounded-3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What does this variable represent?" />
                                    </div>
                                    <div className="mb-2">
                                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 }}>Example Value</label>
                                        <input className="form-control form-control-sm rounded-3" value={form.example} onChange={e => setForm({ ...form, example: e.target.value })} placeholder="e.g. Alice Johnson" />
                                    </div>
                                </div>
                                <div className="modal-footer border-0 px-4 pb-4 pt-2 gap-2">
                                    <button type="button" onClick={() => setShowModal(false)} style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#f1f5f9', border: 'none', color: '#374151', fontWeight: 600 }}>Cancel</button>
                                    <button type="submit" style={{ borderRadius: 10, padding: '7px 20px', fontSize: '0.82rem', background: '#7c3aed', border: 'none', color: '#fff', fontWeight: 700 }}>{editingId ? 'Update' : 'Add Variable'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VariableUI;

import React, { useState, useEffect } from 'react';
import { useSearch } from '../../../../../context/SearchContext';
import { payrollService } from '../payrollService';

const EmptyState = ({ onAdd, loading }) => (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 mt-3" style={{ minHeight: 340 }}>
        {loading ? (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        ) : (
            <>
                <div className="mb-3" style={{ opacity: 0.35 }}>
                    <svg width="58" height="72" viewBox="0 0 58 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="46" height="60" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                        <rect x="9" y="15" width="28" height="3" rx="1.5" fill="#f59e0b" />
                        <rect x="9" y="23" width="22" height="3" rx="1.5" fill="#f59e0b" />
                        <rect x="9" y="31" width="25" height="3" rx="1.5" fill="#f59e0b" />
                    </svg>
                </div>
                <p className="text-secondary mb-1" style={{ fontSize: '0.9rem' }}>
                    You haven't created a <strong>Salary Structure</strong> yet
                </p>
                <button
                    className="btn btn-link text-warning p-0 fw-semibold"
                    style={{ fontSize: '0.875rem', textDecoration: 'none' }}
                    onClick={onAdd}
                >
                    Create your first Salary Structure
                </button>
            </>
        )}
    </div>
);

const AddStructureModal = ({ show, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: '',
        baseSalary: '',
        frequency: 'Monthly'
    });
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!form.name) return alert('Name is required');
        setSaving(true);
        try {
            await payrollService.createSalaryStructure(form);
            onSave();
            setForm({ name: '', baseSalary: '', frequency: 'Monthly' });
            onClose();
        } catch (err) {
            alert('Failed: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 520 }}>
                <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                    <div className="modal-header border-0 px-4 pt-4 pb-2" style={{ background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)' }}>
                        <div>
                            <h5 className="modal-title fw-bold text-white mb-0">New Salary Structure</h5>
                            <p className="text-white-50 small mb-0">Define a new structure template</p>
                        </div>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose} />
                    </div>
                    <div className="modal-body px-4 py-4">
                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-secondary mb-1">Structure Name <span className="text-danger">*</span></label>
                            <input className="form-control form-control-sm" placeholder="e.g. Standard Tier 1" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-secondary mb-1">Base Salary / CTC</label>
                            <input type="number" className="form-control form-control-sm" placeholder="e.g. 50000" value={form.baseSalary} onChange={e => setForm({...form, baseSalary: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-secondary mb-1">Frequency</label>
                            <select className="form-select form-select-sm" value={form.frequency} onChange={e => setForm({...form, frequency: e.target.value})}>
                                <option value="Monthly">Monthly</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                        <button className="btn btn-light rounded-3 px-4 fw-semibold" onClick={onClose} disabled={saving}>Cancel</button>
                        <button className="btn rounded-3 px-4 fw-bold text-white d-flex align-items-center gap-2" style={{ background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)' }} onClick={handleSave} disabled={saving}>
                            {saving ? 'Saving...' : 'Save Structure'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SalaryStructure = ({ onBack }) => {
    const [structures, setStructures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [search, setSearch] = useState(globalSearchTerm);

    useEffect(() => { setSearch(globalSearchTerm); }, [globalSearchTerm]);

    const fetchStructures = async () => {
        setLoading(true);
        try {
            const data = await payrollService.getSalaryStructures();
            setStructures(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchStructures(); }, []);

    const filtered = (structures || []).filter(s => 
        (s.name || '').toLowerCase().includes((search || '').toLowerCase())
    );

    return (
        <div className="container-fluid p-0">
            <AddStructureModal show={showModal} onClose={() => setShowModal(false)} onSave={fetchStructures} />
            <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-sm btn-light rounded-3 px-3 d-flex align-items-center gap-1" onClick={onBack} style={{ fontSize: '0.82rem', color: '#555' }}>
                        <span>←</span> <span>Salary</span>
                    </button>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>/</span>
                    <span className="fw-semibold" style={{ fontSize: '0.92rem' }}>Salary Structure</span>
                </div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    <div className="input-group input-group-sm" style={{ width: 200 }}>
                        <span className="input-group-text bg-white border-end-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </span>
                        <input type="text" className="form-control border-start-0 ps-0" placeholder="Search structures..." value={search} onChange={e => { setSearch(e.target.value); setGlobalSearchTerm(e.target.value); }} />
                    </div>
                    <button className="btn btn-sm fw-bold rounded-3 text-white d-flex align-items-center gap-1 px-3" style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', fontSize: '0.82rem' }} onClick={() => setShowModal(true)}>
                        <span style={{ fontSize: '1rem', lineHeight: 1 }}>+</span> New Structure
                    </button>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                <div className="d-flex align-items-center border-bottom px-3 py-2" style={{ background: '#fffbeb', fontSize: '0.78rem', fontWeight: 600, color: '#92400e', gap: 0 }}>
                    <div style={{ flex: 1, paddingRight: 12 }}>ID</div>
                    <div style={{ flex: 3, paddingRight: 12 }}>Structure Name</div>
                    <div style={{ flex: 2, paddingRight: 12 }}>Frequency</div>
                    <div style={{ flex: 2, paddingRight: 12 }}>Components</div>
                    <div style={{ flex: 1, textAlign: 'right', paddingRight: 8 }}>Actions</div>
                </div>

                {loading || filtered.length === 0 ? (
                    <EmptyState onAdd={() => setShowModal(true)} loading={loading} />
                ) : (
                    <div>
                        {filtered.map((s, i) => (
                            <div key={s.id || i} className="d-flex align-items-center px-3 py-3 border-bottom" style={{ fontSize: '0.82rem', background: '#fff', transition: 'background 0.15s' }}>
                                <div style={{ flex: 1 }}><span className="badge rounded-pill bg-warning bg-opacity-10 text-warning">{s.id || i+1}</span></div>
                                <div style={{ flex: 3, fontWeight: 500, color: '#111827' }}>{s.name || s}</div>
                                <div style={{ flex: 2, color: '#6b7280' }}>{s.frequency || 'Monthly'}</div>
                                <div style={{ flex: 2 }}>
                                    <span className="badge rounded-pill bg-light border text-secondary">View Config</span>
                                </div>
                                <div style={{ flex: 1, textAlign: 'right' }}>
                                    <button className="btn btn-sm btn-light border rounded-2 px-2 py-1" style={{ fontSize: '0.75rem' }}>Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalaryStructure;

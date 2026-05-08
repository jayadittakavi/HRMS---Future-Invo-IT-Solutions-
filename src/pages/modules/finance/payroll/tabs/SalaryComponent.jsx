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
                        <rect x="1" y="1" width="46" height="60" rx="4" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                        <circle cx="24" cy="30" r="12" fill="#4f46e5" />
                    </svg>
                </div>
                <p className="text-secondary mb-1" style={{ fontSize: '0.9rem' }}>
                    You haven't defined any <strong>Salary Components</strong> yet
                </p>
                <button
                    className="btn btn-link text-primary p-0 fw-semibold"
                    style={{ fontSize: '0.875rem', textDecoration: 'none' }}
                    onClick={onAdd}
                >
                    Create your first Component
                </button>
            </>
        )}
    </div>
);

const AddComponentModal = ({ show, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: '',
        type: 'Earning',
        calcType: 'Fixed',
        frequency: 'Monthly'
    });
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!form.name) return alert('Name is required');
        setSaving(true);
        try {
            await payrollService.createSalaryComponent(form);
            onSave();
            setForm({ name: '', type: 'Earning', calcType: 'Fixed', frequency: 'Monthly' });
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
                    <div className="modal-header border-0 px-4 pt-4 pb-2" style={{ background: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 100%)' }}>
                        <div>
                            <h5 className="modal-title fw-bold text-white mb-0">New Salary Component</h5>
                            <p className="text-white-50 small mb-0">Earnings, Deductions & Allowances</p>
                        </div>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose} />
                    </div>
                    <div className="modal-body px-4 py-4">
                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-secondary mb-1">Component Name <span className="text-danger">*</span></label>
                            <input className="form-control form-control-sm" placeholder="e.g. Basic Salary" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                        </div>
                        <div className="row g-2 mb-3">
                            <div className="col-6">
                                <label className="form-label fw-semibold small text-secondary mb-1">Type</label>
                                <select className="form-select form-select-sm" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                                    <option value="Earning">Earning</option>
                                    <option value="Deduction">Deduction</option>
                                    <option value="Allowance">Allowance</option>
                                    <option value="Reimbursement">Reimbursement</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-semibold small text-secondary mb-1">Calculation Type</label>
                                <select className="form-select form-select-sm" value={form.calcType} onChange={e => setForm({...form, calcType: e.target.value})}>
                                    <option value="Fixed">Fixed Amount</option>
                                    <option value="Percentage">Percentage</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                        <button className="btn btn-light rounded-3 px-4 fw-semibold" onClick={onClose} disabled={saving}>Cancel</button>
                        <button className="btn rounded-3 px-4 fw-bold text-white d-flex align-items-center gap-2" style={{ background: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 100%)' }} onClick={handleSave} disabled={saving}>
                            {saving ? 'Saving...' : 'Save Component'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SalaryComponent = ({ onBack }) => {
    const [components, setComponents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [search, setSearch] = useState(globalSearchTerm);

    useEffect(() => { setSearch(globalSearchTerm); }, [globalSearchTerm]);

    const fetchComponents = async () => {
        setLoading(true);
        try {
            const data = await payrollService.getSalaryComponents();
            setComponents(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchComponents(); }, []);

    const filtered = (components || []).filter(c => 
        (c.name || c.component_name || '').toLowerCase().includes((search || '').toLowerCase())
    );

    return (
        <div className="container-fluid p-0">
            <AddComponentModal show={showModal} onClose={() => setShowModal(false)} onSave={fetchComponents} />
            <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-sm btn-light rounded-3 px-3 d-flex align-items-center gap-1" onClick={onBack} style={{ fontSize: '0.82rem', color: '#555' }}>
                        <span>←</span> <span>Salary</span>
                    </button>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>/</span>
                    <span className="fw-semibold" style={{ fontSize: '0.92rem' }}>Salary Component</span>
                </div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    <div className="input-group input-group-sm" style={{ width: 200 }}>
                        <span className="input-group-text bg-white border-end-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </span>
                        <input type="text" className="form-control border-start-0 ps-0" placeholder="Search components..." value={search} onChange={e => { setSearch(e.target.value); setGlobalSearchTerm(e.target.value); }} />
                    </div>
                    <button className="btn btn-sm fw-bold rounded-3 text-white d-flex align-items-center gap-1 px-3" style={{ background: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 100%)', fontSize: '0.82rem' }} onClick={() => setShowModal(true)}>
                        <span style={{ fontSize: '1rem', lineHeight: 1 }}>+</span> New Component
                    </button>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                <div className="d-flex align-items-center border-bottom px-3 py-2" style={{ background: '#f8faff', fontSize: '0.78rem', fontWeight: 600, color: '#3730a3', gap: 0 }}>
                    <div style={{ flex: 3, paddingRight: 12 }}>Component Name</div>
                    <div style={{ flex: 2, paddingRight: 12 }}>Type</div>
                    <div style={{ flex: 2, paddingRight: 12 }}>Calc Type</div>
                    <div style={{ flex: 1, paddingRight: 12 }}>Frequency</div>
                    <div style={{ flex: 1, textAlign: 'right', paddingRight: 8 }}>Actions</div>
                </div>

                {loading || filtered.length === 0 ? (
                    <EmptyState onAdd={() => setShowModal(true)} loading={loading} />
                ) : (
                    <div>
                        {filtered.map((c, i) => (
                            <div key={i} className="d-flex align-items-center px-3 py-3 border-bottom" style={{ fontSize: '0.82rem', background: '#fff', transition: 'background 0.15s' }}>
                                <div style={{ flex: 3, fontWeight: 500, color: '#111827' }}>{c.name || c.component_name}</div>
                                <div style={{ flex: 2 }}>
                                    <span className={`badge rounded-pill ${c.type === 'Earning' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>{c.type || 'Fixed'}</span>
                                </div>
                                <div style={{ flex: 2, color: '#6b7280' }}>{c.calculation_type || c.calc || 'Fixed'}</div>
                                <div style={{ flex: 1, color: '#6b7280' }}>{c.frequency || 'Monthly'}</div>
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

export default SalaryComponent;

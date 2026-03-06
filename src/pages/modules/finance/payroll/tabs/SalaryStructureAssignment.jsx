import React, { useState, useEffect } from 'react';
import { useSearch } from '../../../../../context/SearchContext';
import { payrollService } from '../payrollService';

/* ─── Mock Data for Employees (Should also be fetched from API in future) ───────────────── */
const MOCK_EMPLOYEES = [
    { id: 'EMP001', name: 'Ravi Kumar', department: 'Engineering', designation: 'Software Engineer' },
    { id: 'EMP002', name: 'Priya Sharma', department: 'HR', designation: 'HR Manager' },
    { id: 'EMP003', name: 'Amit Singh', department: 'Finance', designation: 'Accountant' },
    { id: 'EMP004', name: 'Neha Gupta', department: 'Marketing', designation: 'Marketing Lead' },
    { id: 'EMP005', name: 'Suresh Patel', department: 'Operations', designation: 'Operations Manager' },
];

const SALARY_STRUCTURES = [
    'Grade A - Senior Level',
    'Grade B - Mid Level',
    'Grade C - Junior Level',
    'Executive Pay Structure',
    'Intern Stipend Structure',
    'Contract Pay Structure',
];

/* ─── Empty State ─────────────────────────────────────────────── */
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
                        <rect x="1" y="1" width="46" height="60" rx="4" fill="#f0f4ff" stroke="#c7d2fe" strokeWidth="2" />
                        <rect x="9" y="15" width="28" height="3" rx="1.5" fill="#c7d2fe" />
                        <rect x="9" y="23" width="22" height="3" rx="1.5" fill="#c7d2fe" />
                        <rect x="9" y="31" width="25" height="3" rx="1.5" fill="#c7d2fe" />
                        <rect x="9" y="39" width="18" height="3" rx="1.5" fill="#c7d2fe" />
                    </svg>
                </div>
                <p className="text-secondary mb-1" style={{ fontSize: '0.9rem' }}>
                    You haven't created a <strong>Salary Structure Assignment</strong> yet
                </p>
                <button
                    className="btn btn-link text-primary p-0 fw-semibold"
                    style={{ fontSize: '0.875rem', textDecoration: 'none' }}
                    onClick={onAdd}
                >
                    Create your first Salary Structure Assignment
                </button>
            </>
        )}
    </div>
);

/* ─── Add Assignment Modal ────────────────────────────────────── */
const AddAssignmentModal = ({ show, onClose, onSave }) => {
    const [form, setForm] = useState({
        employeeId: '',
        salaryStructure: '',
        fromDate: '',
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.employeeId) e.employeeId = 'Please select an employee';
        if (!form.salaryStructure) e.salaryStructure = 'Please select a salary structure';
        if (!form.fromDate) e.fromDate = 'Please select a from date';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;
        setSaving(true);
        try {
            const emp = MOCK_EMPLOYEES.find(e => e.id === form.employeeId);

            // Explicitly map fields to match backend requirements
            const assignmentData = {
                employee_id: form.employeeId, // Use form value directly
                employee_name: emp ? emp.name : "Unknown",
                department: emp ? emp.department : "N/A",
                designation: emp ? emp.designation : "N/A",
                salary_structure: form.salaryStructure,
                from_date: form.fromDate, // YYYY-MM-DD from HTML5 date picker
                created_on: new Date().toISOString()
            };

            console.log("SENDING SALARY ASSIGNMENT DATA 👉", assignmentData);

            await payrollService.createSalaryAssignment(assignmentData);
            onSave(); // Refresh list
            setForm({ employeeId: '', salaryStructure: '', fromDate: '' });
            setErrors({});
            onClose();
            alert("Salary structure assigned successfully!");
        } catch (err) {
            console.error("Save Error:", err);
            // Better error display for debugging
            let msg = err.message;
            if (msg.startsWith('{')) {
                try {
                    const parsed = JSON.parse(msg);
                    msg = parsed.message || msg;
                } catch (e) { }
            }
            alert("Failed to save assignment: " + msg);
        } finally {
            setSaving(false);
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 520 }}>
                <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                    {/* Header */}
                    <div className="modal-header border-0 px-4 pt-4 pb-2" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)' }}>
                        <div>
                            <h5 className="modal-title fw-bold text-white mb-0">New Salary Structure Assignment</h5>
                            <p className="text-white-50 small mb-0">Assign a salary structure to an employee</p>
                        </div>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose} />
                    </div>

                    <div className="modal-body px-4 py-4">
                        {/* Employee */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-secondary mb-1">Employee <span className="text-danger">*</span></label>
                            <select
                                className={`form-select form-select-sm ${errors.employeeId ? 'is-invalid' : ''}`}
                                value={form.employeeId}
                                onChange={e => setForm({ ...form, employeeId: e.target.value })}
                                disabled={saving}
                            >
                                <option value="">Select Employee</option>
                                {MOCK_EMPLOYEES.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.id} – {emp.name}</option>
                                ))}
                            </select>
                            {errors.employeeId && <div className="invalid-feedback">{errors.employeeId}</div>}
                        </div>

                        {/* Show auto-filled fields when employee selected */}
                        {form.employeeId && (() => {
                            const emp = MOCK_EMPLOYEES.find(e => e.id === form.employeeId);
                            return (
                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <label className="form-label fw-semibold small text-secondary mb-1">Department</label>
                                        <input className="form-control form-control-sm bg-light" readOnly value={emp.department} />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-semibold small text-secondary mb-1">Designation</label>
                                        <input className="form-control form-control-sm bg-light" readOnly value={emp.designation} />
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Salary Structure */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-secondary mb-1">Salary Structure <span className="text-danger">*</span></label>
                            <select
                                className={`form-select form-select-sm ${errors.salaryStructure ? 'is-invalid' : ''}`}
                                value={form.salaryStructure}
                                onChange={e => setForm({ ...form, salaryStructure: e.target.value })}
                                disabled={saving}
                            >
                                <option value="">Select Salary Structure</option>
                                {SALARY_STRUCTURES.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            {errors.salaryStructure && <div className="invalid-feedback">{errors.salaryStructure}</div>}
                        </div>

                        {/* From Date */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold small text-secondary mb-1">From Date <span className="text-danger">*</span></label>
                            <input
                                type="date"
                                className={`form-control form-control-sm ${errors.fromDate ? 'is-invalid' : ''}`}
                                value={form.fromDate}
                                onChange={e => setForm({ ...form, fromDate: e.target.value })}
                                disabled={saving}
                            />
                            {errors.fromDate && <div className="invalid-feedback">{errors.fromDate}</div>}
                        </div>
                    </div>

                    <div className="modal-footer border-0 px-4 pb-4 pt-0 gap-2">
                        <button className="btn btn-light rounded-3 px-4 fw-semibold" onClick={onClose} disabled={saving}>Cancel</button>
                        <button
                            className="btn rounded-3 px-4 fw-bold text-white d-flex align-items-center gap-2"
                            style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)' }}
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Saving...
                                </>
                            ) : 'Save Assignment'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─── Main Component ──────────────────────────────────────────── */
const SalaryStructureAssignment = ({ onBack }) => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [search, setSearch] = useState(globalSearchTerm);
    const [filterDept, setFilterDept] = useState('');

    useEffect(() => {
        setSearch(globalSearchTerm);
    }, [globalSearchTerm]);
    const [sortField, setSortField] = useState('createdOn');
    const [sortDir, setSortDir] = useState('desc');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const fetchAssignments = async () => {
        setLoading(true);
        try {
            const data = await payrollService.getSalaryAssignments();
            setAssignments(data);
        } catch (err) {
            console.error("Fetch Assignments Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    const handleAdd = () => {
        fetchAssignments();
    };

    const handleDelete = (id) => {
        setAssignments(prev => prev.filter(a => a.id !== id));
        setDeleteConfirm(null);
    };

    const toggleSort = (field) => {
        if (sortField === field) setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
        else { setSortField(field); setSortDir('asc'); }
    };

    const SortIcon = ({ field }) => (
        <span className="ms-1 text-muted" style={{ fontSize: '0.65rem' }}>
            {sortField === field ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}
        </span>
    );

    const filtered = assignments
        .filter(a => {
            const q = search.toLowerCase();
            const empId = a.employee_id || a.employeeId || '';
            const empName = a.employee_name || a.employeeName || '';
            const salStruct = a.salary_structure || a.salaryStructure || '';
            const dept = a.department || '';

            const matchSearch = !q ||
                String(a.id).toLowerCase().includes(q) ||
                empId.toLowerCase().includes(q) ||
                empName.toLowerCase().includes(q) ||
                salStruct.toLowerCase().includes(q) ||
                dept.toLowerCase().includes(q);

            const matchDept = !filterDept || dept === filterDept;
            return matchSearch && matchDept;
        })
        .sort((a, b) => {
            const dir = sortDir === 'asc' ? 1 : -1;
            const field = sortField;

            // Map sort fields to handle alternatives
            let valA, valB;
            if (field === 'employeeId') { valA = a.employee_id || a.employeeId; valB = b.employee_id || b.employeeId; }
            else if (field === 'employeeName') { valA = a.employee_name || a.employeeName; valB = b.employee_name || b.employeeName; }
            else if (field === 'salaryStructure') { valA = a.salary_structure || a.salaryStructure; valB = b.salary_structure || b.salaryStructure; }
            else if (field === 'createdOn') { valA = new Date(a.created_on || a.createdOn); valB = new Date(b.created_on || b.createdOn); }
            else { valA = a[field]; valB = b[field]; }

            if (field === 'createdOn') return dir * (valA - valB);
            return dir * String(valA || '').localeCompare(String(valB || ''));
        });

    const departments = [...new Set(MOCK_EMPLOYEES.map(e => e.department))];

    return (
        <div className="container-fluid p-0">
            <AddAssignmentModal show={showModal} onClose={() => setShowModal(false)} onSave={handleAdd} />

            {/* Delete Confirm */}
            {deleteConfirm && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 380 }}>
                        <div className="modal-content border-0 shadow rounded-4 p-4">
                            <h6 className="fw-bold mb-2">Delete Assignment?</h6>
                            <p className="text-secondary small mb-4">This will permanently remove the assignment <strong>{deleteConfirm}</strong>. This action cannot be undone.</p>
                            <div className="d-flex gap-2 justify-content-end">
                                <button className="btn btn-light px-4" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                                <button className="btn btn-danger px-4" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Header Bar ─────────────────────────────────── */}
            <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <div className="d-flex align-items-center gap-2">
                    {/* Breadcrumb back */}
                    <button
                        className="btn btn-sm btn-light rounded-3 px-3 d-flex align-items-center gap-1"
                        onClick={onBack}
                        style={{ fontSize: '0.82rem', color: '#555' }}
                    >
                        <span>←</span> <span>Salary</span>
                    </button>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>/</span>
                    <span className="fw-semibold" style={{ fontSize: '0.92rem' }}>Salary Structure Assignment</span>
                </div>

                <div className="d-flex align-items-center gap-2 flex-wrap">
                    {/* Search */}
                    <div className="input-group input-group-sm" style={{ width: 200 }}>
                        <span className="input-group-text bg-white border-end-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0 ps-0"
                            placeholder="Search..."
                            value={search}
                            onChange={e => {
                                const val = e.target.value;
                                setSearch(val);
                                setGlobalSearchTerm(val);
                            }}
                        />
                    </div>

                    {/* Dept Filter */}
                    <select
                        className="form-select form-select-sm"
                        style={{ width: 150 }}
                        value={filterDept}
                        onChange={e => setFilterDept(e.target.value)}
                    >
                        <option value="">All Departments</option>
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>

                    {/* Saved Filters badge */}
                    <button className="btn btn-sm btn-outline-secondary rounded-3 d-flex align-items-center gap-1" style={{ fontSize: '0.8rem' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                        Saved Filters
                    </button>

                    {/* Sort */}
                    <button
                        className="btn btn-sm btn-outline-secondary rounded-3 d-flex align-items-center gap-1"
                        style={{ fontSize: '0.8rem' }}
                        onClick={() => toggleSort('createdOn')}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="9" y1="18" x2="15" y2="18" /></svg>
                        Created On {sortField === 'createdOn' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </button>

                    {/* Add Button */}
                    <button
                        className="btn btn-sm fw-bold rounded-3 text-white d-flex align-items-center gap-1 px-3"
                        style={{ background: 'linear-gradient(135deg, #111827 0%, #374151 100%)', fontSize: '0.82rem' }}
                        onClick={() => setShowModal(true)}
                    >
                        <span style={{ fontSize: '1rem', lineHeight: 1 }}>+</span> Add Salary Structure Assignment
                    </button>
                </div>
            </div>

            {/* ── Table / Empty State ──────────────────────── */}
            <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                {/* Column Headers */}
                <div
                    className="d-flex align-items-center border-bottom px-3 py-2"
                    style={{ background: '#f8faff', fontSize: '0.78rem', fontWeight: 600, color: '#6b7280', gap: 0 }}
                >
                    {[
                        { key: 'id', label: 'ID', flex: 1 },
                        { key: 'employeeId', label: 'Employee', flex: 1 },
                        { key: 'employeeName', label: 'Employee Name', flex: 2 },
                        { key: 'department', label: 'Department', flex: 1.5 },
                        { key: 'designation', label: 'Designation', flex: 1.5 },
                        { key: 'salaryStructure', label: 'Salary Structure', flex: 2 },
                    ].map(col => (
                        <div
                            key={col.key}
                            className="d-flex align-items-center cursor-pointer user-select-none"
                            style={{ flex: col.flex, paddingRight: 12 }}
                            onClick={() => toggleSort(col.key)}
                        >
                            {col.label}
                            <SortIcon field={col.key} />
                        </div>
                    ))}
                    <div style={{ flex: 0.5, textAlign: 'right', paddingRight: 8 }}>Actions</div>
                </div>

                {loading || filtered.length === 0 ? (
                    <EmptyState onAdd={() => setShowModal(true)} loading={loading} />
                ) : (
                    <div>
                        {filtered.map((a, i) => (
                            <div
                                key={a.id}
                                className="d-flex align-items-center px-3 py-3 border-bottom"
                                style={{
                                    fontSize: '0.82rem',
                                    background: i % 2 === 0 ? '#fff' : '#fafbff',
                                    transition: 'background 0.15s',
                                    cursor: 'default',
                                    gap: 0,
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
                                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafbff'}
                            >
                                <div style={{ flex: 1, paddingRight: 12 }}>
                                    <span className="badge rounded-pill" style={{ background: '#e0e7ff', color: '#3730a3', fontSize: '0.73rem' }}>{a.id}</span>
                                </div>
                                <div style={{ flex: 1, paddingRight: 12, color: '#6b7280' }}>{a.employee_id || a.employeeId}</div>
                                <div style={{ flex: 2, paddingRight: 12, fontWeight: 500, color: '#111827' }}>{a.employee_name || a.employeeName}</div>
                                <div style={{ flex: 1.5, paddingRight: 12 }}>
                                    <span className="badge rounded-pill bg-light text-secondary border" style={{ fontSize: '0.72rem' }}>{a.department}</span>
                                </div>
                                <div style={{ flex: 1.5, paddingRight: 12, color: '#374151' }}>{a.designation}</div>
                                <div style={{ flex: 2, paddingRight: 12 }}>
                                    <span style={{ color: '#1d4ed8', fontWeight: 500 }}>{a.salary_structure || a.salaryStructure}</span>
                                </div>
                                <div style={{ flex: 0.5, textAlign: 'right', paddingRight: 8 }}>
                                    <button
                                        className="btn btn-sm btn-light border rounded-2 px-2 py-1"
                                        style={{ fontSize: '0.75rem' }}
                                        title="Delete"
                                        onClick={() => setDeleteConfirm(a.id)}
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Record count */}
            {filtered.length > 0 && (
                <div className="mt-2 text-secondary" style={{ fontSize: '0.78rem' }}>
                    Showing {filtered.length} of {assignments.length} record{assignments.length !== 1 ? 's' : ''}
                </div>
            )}
        </div>
    );
};

export default SalaryStructureAssignment;

import React, { useState, useEffect } from 'react';
import { useSearch } from '../../../../../context/SearchContext';
import SalaryStructureAssignment from './SalaryStructureAssignment';
import SalarySlip from './SalarySlip';

/* ─── Sub-navigation items in the Salary UI ─────────── */
const SALARY_SECTIONS = [
    {
        id: 'salary-structure-assignment',
        label: 'Salary Structure Assignment',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
        ),
        description: 'Assign salary structures to employees',
        badge: null,
    },
    {
        id: 'salary-structure',
        label: 'Salary Structure',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
            </svg>
        ),
        description: 'Define and manage salary structures',
        badge: '3',
    },
    {
        id: 'salary-component',
        label: 'Salary Component',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
        ),
        description: 'Configure earnings, deductions & allowances',
        badge: '5',
    },
    {
        id: 'salary-slip',
        label: 'Salary Slip',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v2H4zM4 10h16v2H4zM4 16h10v2H4z" />
            </svg>
        ),
        description: 'View and export employee salary slips',
        badge: null,
    },
];

/* ─── Placeholder content for other sections ─────────── */
const PlaceholderSection = ({ title, description, onBack }) => (
    <div className="container-fluid p-0">
        <div className="d-flex align-items-center gap-2 mb-4">
            <button
                className="btn btn-sm btn-light rounded-3 px-3 d-flex align-items-center gap-1"
                onClick={onBack}
                style={{ fontSize: '0.82rem', color: '#555' }}
            >
                <span>←</span> <span>Salary</span>
            </button>
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>/</span>
            <span className="fw-semibold" style={{ fontSize: '0.92rem' }}>{title}</span>
        </div>
        <div className="card border-0 shadow-sm rounded-3 p-5 text-center">
            <div className="text-muted mb-2" style={{ fontSize: '2.5rem' }}>🚧</div>
            <h6 className="fw-bold text-secondary">{title}</h6>
            <p className="text-muted small mb-0">{description}</p>
        </div>
    </div>
);

/* ─── Main SalaryTab Component ────────────────────────── */
const SalaryTab = ({ onTabChange }) => {
    const [activeSection, setActiveSection] = useState(null);
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [search, setSearch] = useState(globalSearchTerm);

    useEffect(() => {
        setSearch(globalSearchTerm);
    }, [globalSearchTerm]);

    /* ── If a sub-section is selected, render it ──── */
    if (activeSection === 'salary-structure-assignment') {
        return <SalaryStructureAssignment onBack={() => setActiveSection(null)} />;
    }

    if (activeSection === 'salary-slip') {
        return <SalarySlip onBack={() => setActiveSection(null)} />;
    }

    if (activeSection && !['salary-structure-assignment', 'salary-slip'].includes(activeSection)) {
        const section = SALARY_SECTIONS.find(s => s.id === activeSection);
        return (
            <PlaceholderSection
                title={section?.label}
                description={section?.description}
                onBack={() => setActiveSection(null)}
            />
        );
    }

    const handleEditComponent = (name) => {
        alert(`Opening Edit Modal for Salary Component: ${name}`);
    };

    const handleCreateAssignment = () => {
        setActiveSection('salary-structure-assignment');
    };

    /* ── Default: Show Salary UI grid ───────────────── */
    return (
        <div className="container-fluid p-0 animate__animated animate__fadeIn">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h5 className="fw-bold mb-0" style={{ color: '#111827' }}>Salary Management</h5>
                    <p className="text-secondary small mb-0 mt-1">
                        Manage salary structures, components, and assignments
                    </p>
                </div>
                <button
                    className="btn btn-primary btn-sm px-3 rounded-3 shadow-sm d-flex align-items-center gap-2"
                    onClick={handleCreateAssignment}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Assignment
                </button>
            </div>

            {/* Salary Sections Grid */}
            <div className="row g-3">
                {SALARY_SECTIONS.map((section) => (
                    <div key={section.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div
                            className="card border-0 shadow-sm rounded-4 h-100 position-relative overflow-hidden section-card"
                            style={{
                                cursor: 'pointer',
                                transition: 'all 0.22s ease',
                                borderLeft: '4px solid transparent',
                            }}
                            onClick={() => setActiveSection(section.id)}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 32px rgba(37,99,235,0.13)';
                                e.currentTarget.style.borderLeft = '4px solid #2563eb';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '';
                                e.currentTarget.style.borderLeft = '4px solid transparent';
                            }}
                        >
                            {/* Gradient accent top bar */}
                            <div style={{
                                height: 4,
                                background: 'linear-gradient(90deg, #2563eb 0%, #818cf8 100%)',
                                borderRadius: '16px 16px 0 0',
                            }} />

                            <div className="card-body p-4">
                                {/* Icon + Badge */}
                                <div className="d-flex align-items-start justify-content-between mb-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3"
                                        style={{
                                            width: 44,
                                            height: 44,
                                            background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
                                            color: '#2563eb',
                                        }}
                                    >
                                        {section.icon}
                                    </div>
                                    {section.badge && (
                                        <span
                                            className="badge rounded-pill"
                                            style={{ background: '#e0e7ff', color: '#3730a3', fontSize: '0.73rem', fontWeight: 700 }}
                                        >
                                            {section.badge}
                                        </span>
                                    )}
                                </div>

                                {/* Label & Description */}
                                <h6 className="fw-bold mb-1" style={{ color: '#111827', fontSize: '0.9rem' }}>
                                    {section.label}
                                </h6>
                                <p className="text-secondary mb-3" style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>
                                    {section.description}
                                </p>

                                {/* Open button */}
                                <div className="d-flex align-items-center gap-1" style={{ color: '#2563eb', fontSize: '0.78rem', fontWeight: 600 }}>
                                    <span>Open</span>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legacy Salary Components Table */}
            <div className="card border-0 shadow-sm rounded-4 mt-4">
                <div className="card-header bg-white border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="fw-bold mb-0" style={{ color: '#111827' }}>Salary Components Summary</h6>
                        <p className="text-secondary small mb-0 mt-1">Active components across all salary structures</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="input-group input-group-sm" style={{ width: '220px' }}>
                            <span className="input-group-text bg-white border-end-0">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0 ps-0"
                                placeholder="Search components..."
                                value={search}
                                onChange={e => {
                                    const val = e.target.value;
                                    setSearch(val);
                                    setGlobalSearchTerm(val);
                                }}
                            />
                        </div>
                        <button className="btn btn-sm btn-outline-primary rounded-3 px-3" onClick={() => alert('Opening Bulk Update tool...')}>Bulk Update</button>
                    </div>
                </div>
                <div className="card-body px-4 pb-4 pt-3">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.83rem' }}>
                            <thead>
                                <tr style={{ background: '#f8faff', color: '#6b7280', fontSize: '0.76rem', fontWeight: 600 }}>
                                    <th className="border-0 py-2 px-3">Component Name</th>
                                    <th className="border-0 py-2 px-3">Type</th>
                                    <th className="border-0 py-2 px-3">Calculation Type</th>
                                    <th className="border-0 py-2 px-3">Frequency</th>
                                    <th className="border-0 py-2 px-3">Status</th>
                                    <th className="border-0 py-2 px-3 text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [
                                        { name: 'Basic Salary', type: 'Earning', calc: 'Fixed', freq: 'Monthly', status: 'Active' },
                                        { name: 'HRA', type: 'Earning', calc: '% of Basic', freq: 'Monthly', status: 'Active' },
                                        { name: 'Special Allowance', type: 'Earning', calc: '% of CTC', freq: 'Monthly', status: 'Active' },
                                        { name: 'PF (Employee)', type: 'Deduction', calc: '% of Basic', freq: 'Monthly', status: 'Active' },
                                        { name: 'Professional Tax', type: 'Deduction', calc: 'Fixed Slab', freq: 'Monthly', status: 'Active' },
                                    ].filter(row =>
                                        row.name.toLowerCase().includes(search.toLowerCase()) ||
                                        row.type.toLowerCase().includes(search.toLowerCase())
                                    ).map((row, i) => (
                                        <tr key={i} style={{ cursor: 'pointer' }} onClick={() => handleEditComponent(row.name)}>
                                            <td className="px-3 fw-semibold" style={{ color: '#111827' }}>{row.name}</td>
                                            <td className="px-3">
                                                <span className={`badge rounded-pill ${row.type === 'Earning' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`} style={{ fontSize: '0.72rem' }}>
                                                    {row.type}
                                                </span>
                                            </td>
                                            <td className="px-3 text-secondary">{row.calc}</td>
                                            <td className="px-3 text-secondary">{row.freq}</td>
                                            <td className="px-3">
                                                <span className="badge rounded-pill bg-success bg-opacity-10 text-success" style={{ fontSize: '0.72rem' }}>● {row.status}</span>
                                            </td>
                                            <td className="px-3 text-end">
                                                <button
                                                    className="btn btn-sm btn-light rounded-2 px-3 hover-primary-light"
                                                    style={{ fontSize: '0.75rem' }}
                                                    onClick={(e) => { e.stopPropagation(); handleEditComponent(row.name); }}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style>{`
                .hover-primary-light:hover {
                    background: #eff6ff !important;
                    color: #2563eb !important;
                }
            `}</style>
        </div>
    );
};

export default SalaryTab;

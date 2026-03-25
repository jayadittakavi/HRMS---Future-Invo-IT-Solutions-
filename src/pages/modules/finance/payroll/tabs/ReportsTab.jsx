import React, { useState, useEffect } from 'react';
import { payrollService } from '../payrollService';

/* ─── Report Definitions ───────────────────────────────────────────── */
const REPORTS = [
    {
        id: 'salary-register',
        label: 'Salary Register',
        description: 'Monthly salary register with all earnings, deductions, and net pay for every employee.',
        icon: '💰',
        color: '#2563eb',
        bg: '#eff6ff',
        border: '#bfdbfe',
        columns: ['Employee ID', 'Employee Name', 'Department', 'Basic', 'HRA', 'Allowances', 'Gross', 'Deductions', 'Net Pay'],
    },
    {
        id: 'income-tax-deductions',
        label: 'Income Tax Deductions',
        description: 'Detailed TDS deductions per employee including declarations and Form 16 summary.',
        icon: '📊',
        color: '#7c3aed',
        bg: '#f5f3ff',
        border: '#ddd6fe',
        columns: ['Employee ID', 'Employee Name', 'PAN', 'Taxable Income', 'TDS This Month', 'TDS YTD', 'Tax Regime'],
    },
    {
        id: 'professional-tax-deductions',
        label: 'Professional Tax Deductions',
        description: 'State-wise Professional Tax (PT) deductions report for compliance and remittance.',
        icon: '🏛️',
        color: '#0891b2',
        bg: '#ecfeff',
        border: '#a5f3fc',
        columns: ['Employee ID', 'Employee Name', 'State', 'Gross Salary', 'PT Slab', 'PT Amount', 'Status'],
    },
    {
        id: 'general-ledger',
        label: 'General Ledger',
        description: 'Complete payroll general ledger entries for accounting and audit reconciliation.',
        icon: '📒',
        color: '#059669',
        bg: '#ecfdf5',
        border: '#a7f3d0',
        columns: ['Date', 'Ledger Account', 'Description', 'Debit (₹)', 'Credit (₹)', 'Balance (₹)'],
    },
    {
        id: 'accounts-payable',
        label: 'Accounts Payable',
        description: 'Outstanding payroll liabilities including unpaid salaries, PF, PT, and TDS payables.',
        icon: '📋',
        color: '#d97706',
        bg: '#fffbeb',
        border: '#fde68a',
        columns: ['Payable Head', 'Due Date', 'Amount (₹)', 'Paid (₹)', 'Outstanding (₹)', 'Status'],
    },
];

/* ─── Status Badge ─────────────────────────────────────────── */
const StatusBadge = ({ value }) => {
    const map = {
        Remitted: { bg: '#dcfce7', color: '#166534' },
        Pending: { bg: '#fef9c3', color: '#854d0e' },
        NA: { bg: '#f3f4f6', color: '#6b7280' },
        Paid: { bg: '#dcfce7', color: '#166534' },
        Partial: { bg: '#ffedd5', color: '#9a3412' },
    };
    const style = map[value] || { bg: '#f3f4f6', color: '#374151' };
    return (
        <span className="badge rounded-pill px-2" style={{ background: style.bg, color: style.color, fontSize: '0.72rem', fontWeight: 600 }}>
            {value}
        </span>
    );
};

/* ─── Report Detail View ───────────────────────────────────── */
const ReportDetail = ({ report, month, onBack }) => {
    const [search, setSearch] = useState('');
    const [exported, setExported] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            try {
                let result = [];
                switch (report.id) {
                    case 'salary-register':
                        result = await payrollService.getSalaryRegister();
                        break;
                    case 'income-tax-deductions':
                        result = await payrollService.getIncomeTaxReport();
                        break;
                    case 'professional-tax-deductions':
                        result = await payrollService.getProfessionalTaxReport();
                        break;
                    case 'general-ledger':
                        result = await payrollService.getGeneralLedger();
                        break;
                    case 'accounts-payable':
                        result = await payrollService.getAccountsPayable();
                        break;
                    default:
                        result = [];
                }
                setData(result || []);
            } catch (error) {
                console.error(`Failed to fetch ${report.id} data`, error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchReportData();
    }, [report.id, month]);

    const handleExport = (type) => {
        setExported(type);
        setTimeout(() => setExported(null), 2500);
    };

    return (
        <div className="container-fluid p-0">
            {/* Breadcrumb */}
            <div className="d-flex align-items-center gap-2 mb-4">
                <button
                    className="btn btn-sm btn-light rounded-3 px-3 d-flex align-items-center gap-1"
                    onClick={onBack}
                    style={{ fontSize: '0.82rem', color: '#555' }}
                >
                    <span>←</span> <span>Reports</span>
                </button>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>/</span>
                <span className="fw-semibold" style={{ fontSize: '0.92rem' }}>{report.label}</span>
            </div>

            {/* Report Header Card */}
            <div
                className="card border-0 rounded-4 mb-4 p-4"
                style={{ background: `linear-gradient(135deg, ${report.color}18 0%, ${report.color}08 100%)`, border: `1px solid ${report.border}` }}
            >
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                        <div
                            className="d-flex align-items-center justify-content-center rounded-3"
                            style={{ width: 52, height: 52, background: report.bg, fontSize: '1.5rem', border: `1px solid ${report.border}` }}
                        >
                            {report.icon}
                        </div>
                        <div>
                            <h5 className="fw-bold mb-1" style={{ color: '#111827' }}>{report.label}</h5>
                            <p className="text-secondary small mb-0" style={{ maxWidth: 480 }}>{report.description}</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        {/* Month Picker */}
                        <select className="form-select form-select-sm rounded-3" style={{ width: 150, fontSize: '0.82rem' }}>
                            <option>{month}</option>
                            <option>February 2026</option>
                            <option>January 2026</option>
                            <option>December 2025</option>
                        </select>
                        {/* Export Buttons */}
                        <button
                            className="btn btn-sm rounded-3 fw-semibold d-flex align-items-center gap-1 px-3"
                            style={{ background: '#16a34a', color: '#fff', fontSize: '0.8rem' }}
                            onClick={() => handleExport('Excel')}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                            Excel
                        </button>
                        <button
                            className="btn btn-sm rounded-3 fw-semibold d-flex align-items-center gap-1 px-3"
                            style={{ background: '#dc2626', color: '#fff', fontSize: '0.8rem' }}
                            onClick={() => handleExport('PDF')}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                            PDF
                        </button>
                    </div>
                </div>

                {/* Export success toast */}
                {exported && (
                    <div
                        className="mt-3 rounded-3 px-3 py-2 d-flex align-items-center gap-2"
                        style={{ background: '#dcfce7', color: '#166534', fontSize: '0.8rem', width: 'fit-content' }}
                    >
                        <span>✓</span> {report.label} exported as {exported} successfully!
                    </div>
                )}
            </div>

            {/* Search + Table */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom" style={{ background: '#f8faff' }}>
                    <span className="fw-semibold small text-secondary">Report Data — {month}</span>
                    <div className="input-group input-group-sm" style={{ width: 200 }}>
                        <span className="input-group-text bg-white border-end-0">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0 ps-0"
                            placeholder="Search..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.81rem' }}>
                        <thead>
                            <tr style={{ background: '#f8faff', fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>
                                {report.columns.map(col => (
                                    <th key={col} className="border-0 py-3 px-4">{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={report.columns.length} className="text-center py-5">
                                        <div className="spinner-border text-primary spinner-border-sm" role="status"></div>
                                        <span className="ms-2 text-muted">Loading reports...</span>
                                    </td>
                                </tr>
                            ) : data.length === 0 ? (
                                <tr>
                                    <td colSpan={report.columns.length} className="text-center py-5 text-muted small italic">
                                        No data available for this period.
                                    </td>
                                </tr>
                            ) : (
                                data
                                    .filter(row => JSON.stringify(row).toLowerCase().includes(search.toLowerCase()))
                                    .map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                            {report.columns.map((col, j) => {
                                                const val = row[col.toLowerCase().replace(/ /g, '_')] || Object.values(row)[j] || '-';
                                                return (
                                                    <td key={j} className="px-4 py-3">
                                                        {['Remitted', 'Pending', 'NA', 'Paid', 'Partial'].includes(val)
                                                            ? <StatusBadge value={val} />
                                                            : <span style={{ color: j === 0 ? '#6b7280' : j === 1 ? '#111827' : '#374151', fontWeight: j === 1 ? 500 : 400 }}>
                                                                {val}
                                                            </span>
                                                        }
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))
                            )}
                        </tbody>
                    </table>
                </div>
                {!loading && data.length > 0 && (
                    <div className="px-4 py-2 border-top bg-white">
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Showing {data.length} records for {month}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ─── Main ReportsTab Component ───────────────────────────── */
const ReportsTab = () => {
    const [activeReport, setActiveReport] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState('February 2026');

    const report = REPORTS.find(r => r.id === activeReport);

    if (activeReport && report) {
        return <ReportDetail report={report} month={selectedMonth} onBack={() => setActiveReport(null)} />;
    }

    return (
        <div className="container-fluid p-0" style={{ maxWidth: 900 }}>
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                <div>
                    <h5 className="fw-bold mb-0" style={{ color: '#111827' }}>Payroll Reports</h5>
                    <p className="text-secondary small mb-0 mt-1">Generate and export payroll reports for compliance and accounting</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <select
                        className="form-select form-select-sm rounded-3"
                        style={{ width: 160, fontSize: '0.82rem' }}
                        value={selectedMonth}
                        onChange={e => setSelectedMonth(e.target.value)}
                    >
                        <option>February 2026</option>
                        <option>January 2026</option>
                        <option>December 2025</option>
                        <option>November 2025</option>
                    </select>
                </div>
            </div>

            {/* Report Cards Grid */}
            <div className="row g-3">
                {REPORTS.map((rep) => (
                    <div key={rep.id} className="col-md-6 col-12">
                        <div
                            className="card border-0 shadow-sm rounded-4 h-100 position-relative overflow-hidden"
                            style={{ cursor: 'pointer', transition: 'all 0.22s ease', border: `1px solid #e5e7eb` }}
                            onClick={() => setActiveReport(rep.id)}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = `0 12px 32px ${rep.color}22`;
                                e.currentTarget.style.border = `1px solid ${rep.border}`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '';
                                e.currentTarget.style.border = '1px solid #e5e7eb';
                            }}
                        >
                            {/* Top Color Bar */}
                            <div style={{ height: 4, background: rep.color, borderRadius: '16px 16px 0 0' }} />

                            <div className="card-body p-4">
                                {/* Icon */}
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                                    style={{ width: 48, height: 48, background: rep.bg, fontSize: '1.4rem', border: `1px solid ${rep.border}` }}
                                >
                                    {rep.icon}
                                </div>

                                {/* Label */}
                                <h6 className="fw-bold mb-1" style={{ color: '#111827', fontSize: '0.92rem' }}>
                                    {rep.label}
                                </h6>
                                <p className="text-secondary mb-4" style={{ fontSize: '0.78rem', lineHeight: 1.55 }}>
                                    {rep.description}
                                </p>

                                {/* Footer */}
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-1" style={{ color: rep.color, fontSize: '0.78rem', fontWeight: 600 }}>
                                        <span>View Report</span>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </div>
                                    <div className="d-flex gap-1">
                                        <button
                                            className="btn btn-sm rounded-2 px-2 py-1"
                                            style={{ background: '#dcfce7', color: '#166534', fontSize: '0.7rem', fontWeight: 600 }}
                                            onClick={e => { e.stopPropagation(); }}
                                            title="Export Excel"
                                        >
                                            XLS
                                        </button>
                                        <button
                                            className="btn btn-sm rounded-2 px-2 py-1"
                                            style={{ background: '#fee2e2', color: '#991b1b', fontSize: '0.7rem', fontWeight: 600 }}
                                            onClick={e => { e.stopPropagation(); }}
                                            title="Export PDF"
                                        >
                                            PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Summary Table (all reports in one view) */}
            <div className="card border-0 shadow-sm rounded-4 mt-4">
                <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                    <h6 className="fw-bold mb-0" style={{ color: '#111827' }}>Quick Access — All Reports</h6>
                    <p className="text-secondary small mt-1 mb-0">Click any report to open it in detail view</p>
                </div>
                <div className="card-body px-4 pb-3 pt-3">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.82rem' }}>
                            <thead>
                                <tr style={{ background: '#f8faff', fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>
                                    <th className="border-0 py-2 px-3">Report Name</th>
                                    <th className="border-0 py-2 px-3">Description</th>
                                    <th className="border-0 py-2 px-3">Period</th>
                                    <th className="border-0 py-2 px-3 text-end">Export</th>
                                </tr>
                            </thead>
                            <tbody>
                                {REPORTS.map((rep) => (
                                    <tr
                                        key={rep.id}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setActiveReport(rep.id)}
                                    >
                                        <td className="px-3 py-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <span style={{ fontSize: '1rem' }}>{rep.icon}</span>
                                                <span className="fw-semibold" style={{ color: rep.color }}>{rep.label}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 text-secondary" style={{ maxWidth: 280 }}>{rep.description}</td>
                                        <td className="px-3">
                                            <span className="badge rounded-pill bg-light text-secondary border" style={{ fontSize: '0.72rem' }}>
                                                {selectedMonth}
                                            </span>
                                        </td>
                                        <td className="px-3 text-end">
                                            <div className="d-flex gap-1 justify-content-end">
                                                <button
                                                    className="btn btn-sm rounded-2 px-2 py-1"
                                                    style={{ background: '#dcfce7', color: '#166534', fontSize: '0.72rem', fontWeight: 600 }}
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    XLS
                                                </button>
                                                <button
                                                    className="btn btn-sm rounded-2 px-2 py-1"
                                                    style={{ background: '#fee2e2', color: '#991b1b', fontSize: '0.72rem', fontWeight: 600 }}
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    PDF
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsTab;

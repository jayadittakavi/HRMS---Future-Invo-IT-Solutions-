import React, { useState, useEffect } from 'react';
import { payrollService } from '../payrollService';
import { employeeSuperAdminService } from '../../../hr/employees/superadmin-service';
import { FaUserTimes, FaCheckCircle, FaExclamationTriangle, FaDownload } from 'react-icons/fa';


/* ─── Mock F&F Data ───────────────────────────────────────── */
const FNF_EMPLOYEES = [
    {
        id: 'FNF001',
        empId: 'EMP008',
        name: 'Vikram Singh',
        designation: 'Senior Developer',
        department: 'Engineering',
        joinDate: '15 Mar 2020',
        resignDate: '01 Jun 2025',
        lastWorkingDay: '30 Jun 2025',
        yearsOfService: 5.3,
        noticePeriodRequired: 60,   // days
        noticePeriodServed: 60,     // days
        noticePeriodShortfall: 0,   // days
        noticeStatus: 'Served',
        status: 'Processing',
        avatar: 'VS',
        color: '#7c3aed',
        salary: {
            lastDrawnBasic: 48000,
            lastDrawnGross: 80000,
            perDay: 2667,
        },
        settlement: {
            // Earnings
            salaryForLastMonth: 52000,      // Prorated salary for days worked
            leaveEncashment: 24000,         // Pending leaves × per day salary
            pendingLeaves: 9,
            gratuity: 138462,               // Formula: (last basic × 15 × years) / 26
            noticePeriodPayIn: 0,           // Compensation if employer waives notice
            bonusDues: 15000,               // Pro-rated annual bonus
            expenseReimbursement: 5500,     // Pending expense claims

            // Deductions
            noticePeriodRecovery: 0,        // If notice not served
            loanRecovery: 12000,            // Outstanding salary advance/loan
            pfEmployee: 57600,              // PF corpus - employee share (accum.)
            pfEmployer: 57600,              // PF corpus - employer share
            pfTotal: 115200,
            gratuityTaxExempt: 138462,
            tdsOnSettlement: 4500,
            assetRecovery: 0,               // Laptop / equipment pending
        },
    },
    {
        id: 'FNF002',
        empId: 'EMP014',
        name: 'Ananya Rao',
        designation: 'HR Generalist',
        department: 'Human Resources',
        joinDate: '10 Aug 2021',
        resignDate: '15 Jan 2026',
        lastWorkingDay: '14 Feb 2026',
        yearsOfService: 4.5,
        noticePeriodRequired: 30,
        noticePeriodServed: 20,
        noticePeriodShortfall: 10,
        noticeStatus: 'Short',
        status: 'Pending',
        avatar: 'AR',
        color: '#0891b2',
        salary: {
            lastDrawnBasic: 36000,
            lastDrawnGross: 58000,
            perDay: 1933,
        },
        settlement: {
            salaryForLastMonth: 38667,
            leaveEncashment: 11600,
            pendingLeaves: 6,
            gratuity: 103846,
            noticePeriodPayIn: 0,
            bonusDues: 8000,
            expenseReimbursement: 2000,
            noticePeriodRecovery: 19330,     // 10 days × per day rate
            loanRecovery: 0,
            pfEmployee: 43200,
            pfEmployer: 43200,
            pfTotal: 86400,
            gratuityTaxExempt: 103846,
            tdsOnSettlement: 1200,
            assetRecovery: 0,
        },
    },
    {
        id: 'FNF003',
        empId: 'EMP021',
        name: 'Deepak Nair',
        designation: 'Operations Manager',
        department: 'Operations',
        joinDate: '01 Apr 2017',
        resignDate: '01 Dec 2025',
        lastWorkingDay: '31 Jan 2026',
        yearsOfService: 8.8,
        noticePeriodRequired: 90,
        noticePeriodServed: 90,
        noticePeriodShortfall: 0,
        noticeStatus: 'Served',
        status: 'Settled',
        avatar: 'DN',
        color: '#059669',
        salary: {
            lastDrawnBasic: 60000,
            lastDrawnGross: 98000,
            perDay: 3267,
        },
        settlement: {
            salaryForLastMonth: 98000,
            leaveEncashment: 52267,
            pendingLeaves: 16,
            gratuity: 304615,
            noticePeriodPayIn: 0,
            bonusDues: 25000,
            expenseReimbursement: 8700,
            noticePeriodRecovery: 0,
            loanRecovery: 0,
            pfEmployee: 72000,
            pfEmployer: 72000,
            pfTotal: 144000,
            gratuityTaxExempt: 200000,
            tdsOnSettlement: 18000,
            assetRecovery: 0,
        },
    },
];

const fmt = (n) => '₹' + Number(n).toLocaleString('en-IN');

const STATUS_STYLES = {
    Settled: { bg: '#dcfce7', color: '#166534' },
    Processing: { bg: '#fef9c3', color: '#854d0e' },
    Pending: { bg: '#fee2e2', color: '#991b1b' },
};

const NOTICE_STYLES = {
    Served: { bg: '#dcfce7', color: '#166534', icon: '✓' },
    Short: { bg: '#fff3cd', color: '#856404', icon: '⚠' },
    Waived: { bg: '#dbeafe', color: '#1e40af', icon: '✦' },
};

/* ─── Notice Period Card ──────────────────────────────────── */
const NoticePeriodCard = ({ emp }) => {
    const ns = NOTICE_STYLES[emp.noticeStatus] || NOTICE_STYLES.Served;
    return (
        <div className="card border-0 rounded-4 h-100" style={{ background: `${ns.bg}33`, border: `1.5px solid ${ns.color}44` }}>
            <div className="card-body p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                        style={{ width: 32, height: 32, background: ns.bg, color: ns.color, fontSize: '0.85rem' }}>
                        {ns.icon}
                    </div>
                    <h6 className="fw-bold mb-0" style={{ fontSize: '0.88rem', color: '#111827' }}>Notice Period</h6>
                </div>
                <div className="row g-2">
                    {[
                        { label: 'Required', value: `${emp.noticePeriodRequired} days` },
                        { label: 'Served', value: `${emp.noticePeriodServed} days` },
                        { label: 'Shortfall', value: emp.noticePeriodShortfall > 0 ? `${emp.noticePeriodShortfall} days` : '—' },
                        { label: 'Status', value: emp.noticeStatus },
                    ].map(item => (
                        <div key={item.label} className="col-6">
                            <div style={{ fontSize: '0.68rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: item.label === 'Status' ? ns.color : '#111827', marginTop: 2 }}>{item.value}</div>
                        </div>
                    ))}
                </div>
                {emp.noticePeriodShortfall > 0 && (
                    <div className="mt-3 rounded-3 p-2" style={{ background: '#fff3cd', fontSize: '0.73rem', color: '#856404' }}>
                        ⚠ Notice recovery of {fmt(emp.noticePeriodShortfall * emp.salary.perDay)} applicable
                    </div>
                )}
            </div>
        </div>
    );
};

/* ─── PF Card ─────────────────────────────────────────────── */
const PFCard = ({ emp }) => (
    <div className="card border-0 rounded-4 h-100" style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0' }}>
        <div className="card-body p-4">
            <div className="d-flex align-items-center gap-2 mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{ width: 32, height: 32, background: '#059669', fontSize: '0.7rem' }}>
                    PF
                </div>
                <h6 className="fw-bold mb-0" style={{ fontSize: '0.88rem', color: '#111827' }}>Provident Fund</h6>
            </div>
            <div className="row g-2">
                {[
                    { label: 'Employee Share (12%)', value: fmt(emp.settlement.pfEmployee) },
                    { label: 'Employer Share (12%)', value: fmt(emp.settlement.pfEmployer) },
                    { label: 'Total PF Corpus', value: fmt(emp.settlement.pfTotal), bold: true },
                    { label: 'Years of Service', value: `${emp.yearsOfService} yrs` },
                ].map(item => (
                    <div key={item.label} className="col-6">
                        <div style={{ fontSize: '0.68rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: item.bold ? 700 : 600, color: item.bold ? '#059669' : '#111827', marginTop: 2 }}>{item.value}</div>
                    </div>
                ))}
            </div>
            <div className="mt-3 rounded-3 p-2" style={{ background: '#dcfce7', fontSize: '0.73rem', color: '#166534' }}>
                ✓ PF withdrawal / transfer applicable — UAN linked
            </div>
        </div>
    </div>
);

/* ─── Gratuity Card ───────────────────────────────────────── */
const GratuityCard = ({ emp }) => {
    const eligible = emp.yearsOfService >= 5;
    return (
        <div className="card border-0 rounded-4 h-100" style={{ background: '#fffbeb', border: '1.5px solid #fde68a' }}>
            <div className="card-body p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ width: 32, height: 32, background: '#d97706', fontSize: '0.7rem' }}>
                        G
                    </div>
                    <h6 className="fw-bold mb-0" style={{ fontSize: '0.88rem', color: '#111827' }}>Gratuity</h6>
                    <span className="badge rounded-pill ms-auto" style={{ background: eligible ? '#dcfce7' : '#fee2e2', color: eligible ? '#166534' : '#991b1b', fontSize: '0.68rem' }}>
                        {eligible ? 'Eligible' : 'Not Eligible'}
                    </span>
                </div>
                <div className="row g-2">
                    {[
                        { label: 'Last Basic Salary', value: fmt(emp.salary.lastDrawnBasic) },
                        { label: 'Years of Service', value: `${emp.yearsOfService} yrs` },
                        { label: 'Formula', value: '(Basic × 15 × Yrs) / 26' },
                        { label: 'Gratuity Amount', value: fmt(emp.settlement.gratuity), bold: true },
                    ].map(item => (
                        <div key={item.label} className="col-6">
                            <div style={{ fontSize: '0.68rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                            <div style={{ fontSize: item.label === 'Formula' ? '0.7rem' : '0.82rem', fontWeight: item.bold ? 700 : 600, color: item.bold ? '#d97706' : '#111827', marginTop: 2 }}>{item.value}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-3 rounded-3 p-2" style={{ background: '#fef9c3', fontSize: '0.73rem', color: '#854d0e' }}>
                    ★ Tax exempt up to {fmt(Math.min(emp.settlement.gratuity, 2000000))} u/s 10(10)
                </div>
            </div>
        </div>
    );
};

/* ─── Leave Encashment Card ───────────────────────────────── */
const LeaveCard = ({ emp }) => (
    <div className="card border-0 rounded-4 h-100" style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe' }}>
        <div className="card-body p-4">
            <div className="d-flex align-items-center gap-2 mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{ width: 32, height: 32, background: '#2563eb', fontSize: '0.65rem' }}>
                    EL
                </div>
                <h6 className="fw-bold mb-0" style={{ fontSize: '0.88rem', color: '#111827' }}>Leave Encashment</h6>
            </div>
            <div className="row g-2">
                {[
                    { label: 'Earned Leaves Pending', value: `${emp.settlement.pendingLeaves} days` },
                    { label: 'Per Day Salary', value: fmt(emp.salary.perDay) },
                    { label: 'Encashment Amount', value: fmt(emp.settlement.leaveEncashment), bold: true },
                    { label: 'Taxability', value: 'Partially Exempt' },
                ].map(item => (
                    <div key={item.label} className="col-6">
                        <div style={{ fontSize: '0.68rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: item.bold ? 700 : 600, color: item.bold ? '#2563eb' : '#111827', marginTop: 2 }}>{item.value}</div>
                    </div>
                ))}
            </div>
            <div className="mt-3 rounded-3 p-2" style={{ background: '#dbeafe', fontSize: '0.73rem', color: '#1e40af' }}>
                ℹ Leave encashment exempt up to ₹25 Lakh u/s 10(10AA)
            </div>
        </div>
    </div>
);

/* ─── Full Settlement Statement ───────────────────────────── */
const SettlementStatement = ({ emp }) => {
    const s = emp.settlement;

    const earnings = [
        { label: 'Salary for Last Month (pro-rated)', amount: s.salaryForLastMonth },
        { label: 'Leave Encashment (Earned Leaves)', amount: s.leaveEncashment, note: `${s.pendingLeaves} days` },
        { label: 'Gratuity Payable', amount: s.gratuity, note: `${emp.yearsOfService} yrs service` },
        { label: 'Pro-rated Annual Bonus', amount: s.bonusDues },
        { label: 'Notice Period Pay-in (Waiver)', amount: s.noticePeriodPayIn },
        { label: 'Expense Reimbursement (Pending)', amount: s.expenseReimbursement },
    ];

    const deductions = [
        { label: 'Notice Period Recovery', amount: s.noticePeriodRecovery, note: emp.noticePeriodShortfall > 0 ? `${emp.noticePeriodShortfall} days short` : '' },
        { label: 'Salary Advance / Loan Recovery', amount: s.loanRecovery },
        { label: 'Asset / Equipment Recovery', amount: s.assetRecovery },
        { label: 'TDS on Settlement Components', amount: s.tdsOnSettlement },
    ];

    const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
    const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
    const netPayable = totalEarnings - totalDeductions;

    return (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mt-4">
            {/* Header */}
            <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)' }}>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h6 className="fw-bold text-white mb-0" style={{ fontSize: '0.9rem' }}>Full & Final Settlement Statement</h6>
                        <div className="text-white-50" style={{ fontSize: '0.72rem', marginTop: 2 }}>
                            {emp.name} &nbsp;·&nbsp; {emp.empId} &nbsp;·&nbsp; Last Working Day: {emp.lastWorkingDay}
                        </div>
                    </div>
                    <div className="text-end">
                        <div className="text-white-50" style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Net F&F Payable</div>
                        <div className="fw-bold text-white" style={{ fontSize: '1.3rem' }}>{fmt(netPayable)}</div>
                    </div>
                </div>
            </div>

            <div className="row g-0">
                {/* Earnings */}
                <div className="col-md-6 border-end">
                    <div className="px-4 py-3 border-bottom" style={{ background: '#f0fdf4' }}>
                        <div className="fw-bold" style={{ fontSize: '0.78rem', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            + Earnings & Entitlements
                        </div>
                    </div>
                    <table className="table mb-0">
                        <tbody>
                            {earnings.map((e, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td className="px-4 py-3" style={{ fontSize: '0.8rem', color: '#374151' }}>
                                        {e.label}
                                        {e.note && <div style={{ fontSize: '0.68rem', color: '#9ca3af', marginTop: 2 }}>{e.note}</div>}
                                    </td>
                                    <td className="px-4 py-3 text-end fw-semibold" style={{ fontSize: '0.8rem', color: e.amount > 0 ? '#059669' : '#9ca3af' }}>
                                        {e.amount > 0 ? fmt(e.amount) : '—'}
                                    </td>
                                </tr>
                            ))}
                            <tr style={{ background: '#f0fdf4' }}>
                                <td className="px-4 py-3 fw-bold" style={{ fontSize: '0.82rem', color: '#111827' }}>Total Earnings (A)</td>
                                <td className="px-4 py-3 text-end fw-bold" style={{ fontSize: '0.85rem', color: '#059669' }}>{fmt(totalEarnings)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Deductions */}
                <div className="col-md-6">
                    <div className="px-4 py-3 border-bottom" style={{ background: '#fff5f5' }}>
                        <div className="fw-bold" style={{ fontSize: '0.78rem', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            − Deductions & Recoveries
                        </div>
                    </div>
                    <table className="table mb-0">
                        <tbody>
                            {deductions.map((d, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td className="px-4 py-3" style={{ fontSize: '0.8rem', color: '#374151' }}>
                                        {d.label}
                                        {d.note && <div style={{ fontSize: '0.68rem', color: '#ef4444', marginTop: 2 }}>{d.note}</div>}
                                    </td>
                                    <td className="px-4 py-3 text-end fw-semibold" style={{ fontSize: '0.8rem', color: d.amount > 0 ? '#dc2626' : '#9ca3af' }}>
                                        {d.amount > 0 ? `(${fmt(d.amount)})` : '—'}
                                    </td>
                                </tr>
                            ))}
                            <tr style={{ background: '#fff5f5' }}>
                                <td className="px-4 py-3 fw-bold" style={{ fontSize: '0.82rem', color: '#111827' }}>Total Deductions (B)</td>
                                <td className="px-4 py-3 text-end fw-bold" style={{ fontSize: '0.85rem', color: '#dc2626' }}>{fmt(totalDeductions)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Net Payable Footer */}
            <div className="border-top">
                <div className="d-flex align-items-center justify-content-between px-4 py-4">
                    <div>
                        <div className="fw-bold" style={{ fontSize: '0.88rem', color: '#111827' }}>Net F&F Amount Payable (A − B)</div>
                        <div className="text-secondary" style={{ fontSize: '0.73rem', marginTop: 4 }}>
                            + PF Corpus {fmt(s.pfTotal)} will be settled separately via EPFO withdrawal/transfer
                        </div>
                    </div>
                    <div className="text-end">
                        <div
                            className="fw-bold rounded-3 px-4 py-2"
                            style={{
                                fontSize: '1.2rem',
                                background: 'linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)',
                                color: '#166534',
                                border: '2px solid #86efac',
                            }}
                        >
                            {fmt(netPayable)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─── Employee Detail View ────────────────────────────────── */
const EmployeeDetail = ({ emp, onBack }) => {
    const s = emp.settlement;
    const ns = NOTICE_STYLES[emp.noticeStatus] || NOTICE_STYLES.Served;

    return (
        <div className="container-fluid p-0">
            {/* Breadcrumb */}
            <div className="d-flex align-items-center gap-2 mb-4">
                <button className="btn btn-sm btn-light rounded-3 px-3 d-flex align-items-center gap-1"
                    onClick={onBack} style={{ fontSize: '0.82rem', color: '#555' }}>
                    <span>←</span> <span>F&F Settlement</span>
                </button>
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>/</span>
                <span className="fw-semibold" style={{ fontSize: '0.92rem' }}>{emp.name}</span>
            </div>

            {/* Employee Banner */}
            <div className="card border-0 rounded-4 mb-4 overflow-hidden">
                <div style={{ height: 6, background: 'linear-gradient(90deg, #1e3a8a 0%, #7c3aed 50%, #059669 100%)' }} />
                <div className="p-4">
                    <div className="d-flex align-items-center gap-4 flex-wrap">
                        <div className="d-flex align-items-center justify-content-center rounded-3 text-white fw-bold flex-shrink-0"
                            style={{ width: 60, height: 60, fontSize: '1.2rem', background: `linear-gradient(135deg, ${emp.color}, ${emp.color}99)` }}>
                            {emp.avatar}
                        </div>
                        <div className="flex-grow-1">
                            <h5 className="fw-bold mb-0" style={{ color: '#111827' }}>{emp.name}</h5>
                            <div style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: 2 }}>
                                {emp.designation} &nbsp;·&nbsp; {emp.department} &nbsp;·&nbsp; {emp.empId}
                            </div>
                            <div className="d-flex flex-wrap gap-3 mt-2">
                                {[
                                    { label: 'Joined', value: emp.joinDate },
                                    { label: 'Resigned', value: emp.resignDate },
                                    { label: 'Last Day', value: emp.lastWorkingDay },
                                    { label: 'Service', value: `${emp.yearsOfService} years` },
                                ].map(item => (
                                    <div key={item.label} style={{ fontSize: '0.75rem' }}>
                                        <span style={{ color: '#9ca3af' }}>{item.label}: </span>
                                        <span style={{ fontWeight: 600, color: '#374151' }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-end gap-2">
                            <span className="badge rounded-pill px-3 py-2" style={{
                                background: STATUS_STYLES[emp.status]?.bg,
                                color: STATUS_STYLES[emp.status]?.color,
                                fontSize: '0.75rem', fontWeight: 700,
                            }}>
                                {emp.status}
                            </span>
                            <button className="btn btn-sm fw-bold rounded-3 px-4 text-white"
                                style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', fontSize: '0.8rem' }}>
                                Approve & Settle
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4 Summary Cards */}
            <div className="row g-3 mb-2">
                <div className="col-lg-3 col-md-6"><NoticePeriodCard emp={emp} /></div>
                <div className="col-lg-3 col-md-6"><PFCard emp={emp} /></div>
                <div className="col-lg-3 col-md-6"><GratuityCard emp={emp} /></div>
                <div className="col-lg-3 col-md-6"><LeaveCard emp={emp} /></div>
            </div>

            {/* Full Settlement Statement */}
            <SettlementStatement emp={emp} />

            {/* Clearance Checklist */}
            <div className="card border-0 shadow-sm rounded-4 mt-4">
                <div className="card-header border-0 bg-white pt-4 px-4 pb-0">
                    <h6 className="fw-bold mb-0" style={{ color: '#111827', fontSize: '0.88rem' }}>Exit Clearance Checklist</h6>
                    <p className="text-secondary small mb-0 mt-1">All clearances must be obtained before settlement is processed</p>
                </div>
                <div className="card-body px-4 pb-4 pt-3">
                    <div className="row g-2">
                        {[
                            { dept: 'IT Department', item: 'Laptop, accessories & access cards returned', done: true },
                            { dept: 'HR Department', item: 'Exit interview conducted & form signed', done: true },
                            { dept: 'Finance', item: 'All outstanding duties cleared', done: emp.settlement.loanRecovery === 0 },
                            { dept: 'Manager', item: 'Knowledge transfer completed & NOC given', done: emp.noticeStatus === 'Served' },
                            { dept: 'Admin', item: 'ID card & parking tag surrendered', done: true },
                            { dept: 'Legal', item: 'NDA reminder and non-compete signed', done: false },
                        ].map((c, i) => (
                            <div key={i} className="col-md-6">
                                <div className="d-flex align-items-start gap-3 p-3 rounded-3 border"
                                    style={{ background: c.done ? '#f0fdf4' : '#fff5f5', borderColor: c.done ? '#86efac' : '#fca5a5' }}>
                                    <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{ width: 24, height: 24, background: c.done ? '#dcfce7' : '#fee2e2', color: c.done ? '#166534' : '#dc2626', fontSize: '0.7rem', fontWeight: 700 }}>
                                        {c.done ? '✓' : '✗'}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.dept}</div>
                                        <div style={{ fontSize: '0.78rem', color: '#374151', marginTop: 2 }}>{c.item}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─── Main FullAndFinalTab ────────────────────────────────── */
const FullAndFinalTab = ({ personal = false }) => {
    const [selected, setSelected] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [settlements, setSettlements] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInitiateModal, setShowInitiateModal] = useState(false);
    const [newInitiate, setNewInitiate] = useState({
        employee_id: '',
        resignation_date: '',
        last_working_day: '',
        reason: ''
    });

    useEffect(() => {
        fetchSettlements();
        if (!personal) {
            fetchEmployees();
        }
    }, [personal]);

    const fetchSettlements = async () => {
        setLoading(true);
        try {
            // For personal mode, we might fetch from a specific endpoint or filter
            // Here we assume getSettlements handles access or we filter.
            const data = await payrollService.getSettlements();
            setSettlements(data || []);
            
            // If personal, automatically select the user's settlement if found
            if (personal && data && data.length > 0) {
                // In a real app, we'd match the user ID from context
                // For now, if personal mode, show the first available (usually only one for user)
                setSelected(data[0].id);
            }
        } catch (error) {
            console.error("Failed to fetch settlements", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchEmployees = async () => {
        try {
            const data = await employeeSuperAdminService.getAllEmployees();
            setEmployees(data || []);
        } catch (error) {
            console.error("Failed to fetch employees", error);
        }
    };

    const handleInitiate = async (e) => {
        e.preventDefault();
        try {
            await payrollService.initiateSettlement(newInitiate);
            alert("Settlement initiated successfully!");
            setShowInitiateModal(false);
            fetchSettlements();
        } catch (error) {
            alert("Failed to initiate: " + error.message);
        }
    };

    const emp = settlements.find(e => e.id === selected);

    if (personal && (!selected || !emp)) {
        if (loading) return <div className="p-4 text-center">Loading your settlement...</div>;
        return (
            <div className="text-center py-5">
                <FaExclamationTriangle size={40} className="text-warning mb-3" />
                <h5>No Settlement Found</h5>
                <p className="text-secondary">You do not have a Full & Final settlement process active at this time.</p>
            </div>
        );
    }

    if (selected && emp) {
        return <EmployeeDetail emp={emp} onBack={personal ? null : () => setSelected(null)} />;
    }

    const filtered = settlements.filter(e => !filterStatus || e.status === filterStatus);

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                <div>
                    <h5 className="fw-bold mb-0" style={{ color: '#111827' }}>Full & Final Settlement</h5>
                    <p className="text-secondary small mb-0 mt-1">
                        Process goodbye pay — notice period, PF, gratuity, leave encashment & all dues for departing employees
                    </p>
                </div>
                <div className="d-flex gap-2">
                    <select className="form-select form-select-sm rounded-3" style={{ width: 150, fontSize: '0.82rem' }}
                        value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                        <option value="">All Status</option>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Settled</option>
                    </select>
                    <button className="btn btn-sm fw-semibold rounded-3 px-3 text-white"
                        style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', fontSize: '0.82rem' }}
                        onClick={() => setShowInitiateModal(true)}
                    >
                        + Initiate F&F
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Cases', value: settlements.length, color: '#2563eb', bg: '#eff6ff' },
                    { label: 'Pending', value: settlements.filter(e => e.status === 'Pending').length, color: '#dc2626', bg: '#fff5f5' },
                    { label: 'Processing', value: settlements.filter(e => e.status === 'Processing').length, color: '#d97706', bg: '#fffbeb' },
                    { label: 'Settled', value: settlements.filter(e => e.status === 'Settled').length, color: '#059669', bg: '#f0fdf4' },
                ].map(stat => (
                    <div key={stat.label} className="col-lg-3 col-6">
                        <div className="card border-0 rounded-4 p-3 text-center" style={{ background: stat.bg, border: `1px solid ${stat.color}22` }}>
                            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: 2 }}>{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* F&F Cases Table */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="px-4 py-3 border-bottom" style={{ background: '#f8faff' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Departing Employees — F&F Cases
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.81rem' }}>
                        <thead>
                            <tr style={{ background: '#f8faff', fontSize: '0.74rem', color: '#6b7280', fontWeight: 600 }}>
                                <th className="border-0 py-3 px-4">Employee</th>
                                <th className="border-0 py-3 px-4">Resignation</th>
                                <th className="border-0 py-3 px-4">Last Working Day</th>
                                <th className="border-0 py-3 px-4">Notice Period</th>
                                <th className="border-0 py-3 px-4">Gratuity</th>
                                <th className="border-0 py-3 px-4">PF Corpus</th>
                                <th className="border-0 py-3 px-4">Est. F&F Amount</th>
                                <th className="border-0 py-3 px-4">Status</th>
                                <th className="border-0 py-3 px-4 text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((e) => {
                                const s = e.settlement;
                                const totalEarnings = s.salaryForLastMonth + s.leaveEncashment + s.gratuity + s.bonusDues + s.noticePeriodPayIn + s.expenseReimbursement;
                                const totalDed = s.noticePeriodRecovery + s.loanRecovery + s.assetRecovery + s.tdsOnSettlement;
                                const net = totalEarnings - totalDed;
                                const ns = NOTICE_STYLES[e.noticeStatus] || NOTICE_STYLES.Served;

                                return (
                                    <tr key={e.id} style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}
                                        onClick={() => setSelected(e.id)}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0"
                                                    style={{ width: 36, height: 36, fontSize: '0.78rem', background: `linear-gradient(135deg, ${e.color}, ${e.color}99)` }}>
                                                    {e.avatar}
                                                </div>
                                                <div>
                                                    <div className="fw-semibold" style={{ color: '#111827' }}>{e.name}</div>
                                                    <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>{e.designation}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-secondary">{e.resignDate}</td>
                                        <td className="px-4 py-3 text-secondary">{e.lastWorkingDay}</td>
                                        <td className="px-4 py-3">
                                            <span className="badge rounded-pill px-2" style={{ background: ns.bg, color: ns.color, fontSize: '0.7rem' }}>
                                                {ns.icon} {e.noticeStatus} ({e.noticePeriodServed}/{e.noticePeriodRequired}d)
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 fw-semibold" style={{ color: '#d97706' }}>{fmt(s?.gratuity || 0)}</td>
                                        <td className="px-4 py-3 fw-semibold" style={{ color: '#059669' }}>{fmt(s?.pfTotal || 0)}</td>
                                        <td className="px-4 py-3 fw-bold" style={{ color: '#1e3a8a' }}>{fmt(net)}</td>
                                        <td className="px-4 py-3">
                                            <span className="badge rounded-pill px-3" style={{
                                                background: STATUS_STYLES[e.status]?.bg,
                                                color: STATUS_STYLES[e.status]?.color,
                                                fontSize: '0.72rem', fontWeight: 700,
                                            }}>
                                                {e.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-end">
                                            <button
                                                className="btn btn-sm rounded-3 fw-semibold px-3"
                                                style={{
                                                    background: e.status === 'Settled'
                                                        ? '#f3f4f6' : 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                                                    color: e.status === 'Settled' ? '#6b7280' : '#fff',
                                                    fontSize: '0.75rem',
                                                }}
                                                onClick={ev => { ev.stopPropagation(); setSelected(e.id); }}
                                            >
                                                {e.status === 'Settled' ? 'View' : 'Process F&F'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Initiate Modal */}
            {showInitiateModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1055 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                            <form onSubmit={handleInitiate}>
                                <div className="modal-header border-0 pb-0 pt-4 px-4">
                                    <h5 className="modal-title fw-bold">Initiate F&F Settlement</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowInitiateModal(false)}></button>
                                </div>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-secondary">SELECT EMPLOYEE</label>
                                        <select 
                                            className="form-select border-0 bg-light rounded-3" 
                                            required
                                            style={{ fontSize: '0.85rem', padding: '10px 15px' }}
                                            value={newInitiate.employee_id}
                                            onChange={e => setNewInitiate({...newInitiate, employee_id: e.target.value})}
                                        >
                                            <option value="">Choose Employee...</option>
                                            {employees.map(emp => (
                                                <option key={emp.id} value={emp.id}>{emp.full_name} ({emp.employee_id})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-secondary">RESIGNATION DATE</label>
                                            <input 
                                                type="date" 
                                                className="form-control border-0 bg-light rounded-3" 
                                                required
                                                style={{ fontSize: '0.85rem', padding: '10px 15px' }}
                                                value={newInitiate.resignation_date}
                                                onChange={e => setNewInitiate({...newInitiate, resignation_date: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-secondary">LAST WORKING DAY</label>
                                            <input 
                                                type="date" 
                                                className="form-control border-0 bg-light rounded-3" 
                                                required
                                                style={{ fontSize: '0.85rem', padding: '10px 15px' }}
                                                value={newInitiate.last_working_day}
                                                onChange={e => setNewInitiate({...newInitiate, last_working_day: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-0">
                                        <label className="form-label small fw-bold text-secondary">REASON FOR DEPARTURE</label>
                                        <textarea 
                                            className="form-control border-0 bg-light rounded-3" 
                                            rows="3"
                                            style={{ fontSize: '0.85rem', padding: '10px 15px' }}
                                            placeholder="e.g. Resignation, Retirement, etc."
                                            value={newInitiate.reason}
                                            onChange={e => setNewInitiate({...newInitiate, reason: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer border-0 pb-4 px-4 pt-0">
                                    <button type="button" className="btn btn-light rounded-3 fw-semibold px-4" onClick={() => setShowInitiateModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary rounded-3 px-4 shadow-sm fw-bold">
                                        Initiate Process
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FullAndFinalTab;

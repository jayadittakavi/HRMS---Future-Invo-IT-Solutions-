import React, { useState } from 'react';

/* ─── Mock Employee Form-16 Data ──────────────────────────── */
const FORM16_DATA = [
    {
        id: 'EMP001',
        name: 'Ravi Kumar',
        designation: 'Software Engineer',
        department: 'Engineering',
        pan: 'ABCDE1234F',
        tan: 'BLRK01234A',
        fy: '2024-2025',
        ay: '2025-2026',
        employeeNo: 'FI-001',
        address: '12, 3rd Cross, Indiranagar, Bengaluru - 560038',
        employer: 'Future Invo IT Solutions Pvt. Ltd.',
        employerAddress: '#42, Tech Park Road, Whitefield, Bengaluru - 560066',
        employerPAN: 'AAACF1234Z',
        partA: {
            grossSalary: 768000,
            tdsQ1: 14820,
            tdsQ2: 14820,
            tdsQ3: 14820,
            tdsQ4: 14820,
            totalTDS: 59280,
        },
        partB: {
            basicSalary: 480000,
            hra: 192000,
            specialAllowance: 96000,
            grossSalary: 768000,
            hra_exempt: 112000,
            ltaExempt: 15000,
            totalExemption: 127000,
            netSalary: 641000,
            pfDeduction: 57600,
            npsDeduction: 0,
            otherDeduction: 0,
            total80C: 57600,
            total80D: 25000,
            total80CCD: 0,
            totalVIDeductions: 82600,
            grossTotalIncome: 641000,
            totalDeductions: 82600,
            totalTaxableIncome: 558400,
            taxOnIncome: 26760,
            surcharge: 0,
            healthEducationCess: 1070,
            totalTax: 27830,
            taxRelief87A: 0,
            netTaxPayable: 27830,
            advanceTax: 0,
            tdsSelf: 59280,
            tdsPrevEmployer: 0,
            totalTDS: 59280,
            refund: 31450,
        },
    },
    {
        id: 'EMP002',
        name: 'Priya Sharma',
        designation: 'HR Manager',
        department: 'Human Resources',
        pan: 'PQRST5678G',
        tan: 'BLRK01234A',
        fy: '2024-2025',
        ay: '2025-2026',
        employeeNo: 'FI-002',
        address: '7, Koramangala 4th Block, Bengaluru - 560034',
        employer: 'Future Invo IT Solutions Pvt. Ltd.',
        employerAddress: '#42, Tech Park Road, Whitefield, Bengaluru - 560066',
        employerPAN: 'AAACF1234Z',
        partA: {
            grossSalary: 666000,
            tdsQ1: 11280,
            tdsQ2: 11280,
            tdsQ3: 11280,
            tdsQ4: 11280,
            totalTDS: 45120,
        },
        partB: {
            basicSalary: 420000,
            hra: 168000,
            specialAllowance: 78000,
            grossSalary: 666000,
            hra_exempt: 98000,
            ltaExempt: 12000,
            totalExemption: 110000,
            netSalary: 556000,
            pfDeduction: 50400,
            npsDeduction: 20000,
            otherDeduction: 0,
            total80C: 70400,
            total80D: 25000,
            total80CCD: 20000,
            totalVIDeductions: 115400,
            grossTotalIncome: 556000,
            totalDeductions: 115400,
            totalTaxableIncome: 440600,
            taxOnIncome: 9560,
            surcharge: 0,
            healthEducationCess: 382,
            totalTax: 9942,
            taxRelief87A: 9942,
            netTaxPayable: 0,
            advanceTax: 0,
            tdsSelf: 45120,
            tdsPrevEmployer: 0,
            totalTDS: 45120,
            refund: 45120,
        },
    },
    {
        id: 'EMP003',
        name: 'Amit Singh',
        designation: 'Senior Accountant',
        department: 'Finance',
        pan: 'LMNOP9012H',
        tan: 'BLRK01234A',
        fy: '2024-2025',
        ay: '2025-2026',
        employeeNo: 'FI-003',
        address: '23, HSR Layout Sector 2, Bengaluru - 560102',
        employer: 'Future Invo IT Solutions Pvt. Ltd.',
        employerAddress: '#42, Tech Park Road, Whitefield, Bengaluru - 560066',
        employerPAN: 'AAACF1234Z',
        partA: {
            grossSalary: 813600,
            tdsQ1: 16092,
            tdsQ2: 16092,
            tdsQ3: 16092,
            tdsQ4: 16092,
            totalTDS: 64368,
        },
        partB: {
            basicSalary: 504000,
            hra: 201600,
            specialAllowance: 108000,
            grossSalary: 813600,
            hra_exempt: 120000,
            ltaExempt: 15000,
            totalExemption: 135000,
            netSalary: 678600,
            pfDeduction: 60480,
            npsDeduction: 50000,
            otherDeduction: 0,
            total80C: 110480,
            total80D: 25000,
            total80CCD: 50000,
            totalVIDeductions: 185480,
            grossTotalIncome: 678600,
            totalDeductions: 185480,
            totalTaxableIncome: 493120,
            taxOnIncome: 12406,
            surcharge: 0,
            healthEducationCess: 496,
            totalTax: 12902,
            taxRelief87A: 12500,
            netTaxPayable: 402,
            advanceTax: 0,
            tdsSelf: 64368,
            tdsPrevEmployer: 0,
            totalTDS: 64368,
            refund: 63966,
        },
    },
];

const fmt = (n) => '₹' + Number(n).toLocaleString('en-IN');

/* ─── Row helper ─────────────────────────────────────────── */
const Row = ({ label, value, bold, indent, highlight, separator }) => (
    <tr style={{
        background: highlight ? '#fffbeb' : 'transparent',
        borderTop: separator ? '2px solid #1e3a8a' : undefined,
    }}>
        <td
            className="py-2 px-3"
            style={{
                fontSize: '0.8rem',
                paddingLeft: indent ? '2rem' : undefined,
                fontWeight: bold ? 700 : 400,
                color: bold ? '#111827' : '#374151',
                width: '65%',
            }}
        >
            {label}
        </td>
        <td
            className="py-2 px-3 text-end"
            style={{
                fontSize: '0.8rem',
                fontWeight: bold ? 700 : 400,
                color: bold ? '#111827' : '#374151',
            }}
        >
            {value}
        </td>
    </tr>
);

/* ─── Section Header ─────────────────────────────────────── */
const SectionHeader = ({ title }) => (
    <tr>
        <td
            colSpan={2}
            className="px-3 py-2"
            style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#1e3a8a',
                background: '#eff6ff',
                borderTop: '1px solid #bfdbfe',
                borderBottom: '1px solid #bfdbfe',
            }}
        >
            {title}
        </td>
    </tr>
);

/* ─── Form 16 Document ───────────────────────────────────── */
const Form16Document = ({ data, activeTab }) => {
    const { partA, partB } = data;

    /* ── PART A ─── */
    const PartA = () => (
        <div>
            {/* Certificate Intro */}
            <div
                className="p-4 mb-0"
                style={{
                    background: '#1e3a8a',
                    color: '#fff',
                    borderRadius: '12px 12px 0 0',
                }}
            >
                <div className="text-center mb-2">
                    <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.75 }}>GOVERNMENT OF INDIA — INCOME TAX DEPARTMENT</div>
                    <h5 className="fw-bold mb-0 mt-1">FORM 16</h5>
                    <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Certificate under Section 203 of the Income‑tax Act, 1961</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.7, marginTop: 4 }}>
                        PART A — Certificate of Tax Deducted at Source
                    </div>
                </div>
            </div>

            {/* Employer / Employee Grid */}
            <div className="p-4 border-start border-end border-bottom" style={{ background: '#f8faff' }}>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="p-3 rounded-3 bg-white border h-100">
                            <div style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>
                                Deductor (Employer)
                            </div>
                            <div className="fw-bold" style={{ fontSize: '0.85rem', color: '#111827' }}>{data.employer}</div>
                            <div className="text-secondary mt-1" style={{ fontSize: '0.78rem' }}>{data.employerAddress}</div>
                            <div className="mt-2 d-flex gap-3">
                                <div>
                                    <div style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase' }}>TAN</div>
                                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1e3a8a' }}>{data.tan}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase' }}>PAN</div>
                                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1e3a8a' }}>{data.employerPAN}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="p-3 rounded-3 bg-white border h-100">
                            <div style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>
                                Deductee (Employee)
                            </div>
                            <div className="fw-bold" style={{ fontSize: '0.85rem', color: '#111827' }}>{data.name}</div>
                            <div className="text-secondary mt-1" style={{ fontSize: '0.78rem' }}>{data.address}</div>
                            <div className="mt-2 d-flex gap-3">
                                <div>
                                    <div style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase' }}>Employee No.</div>
                                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1e3a8a' }}>{data.employeeNo}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase' }}>PAN</div>
                                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1e3a8a' }}>{data.pan}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FY / AY */}
                <div className="row g-3 mt-1">
                    {[
                        { label: 'Financial Year', value: data.fy },
                        { label: 'Assessment Year', value: data.ay },
                        { label: 'Designation', value: data.designation },
                        { label: 'Department', value: data.department },
                    ].map(item => (
                        <div key={item.label} className="col-md-3 col-6">
                            <div className="p-3 rounded-3 bg-white border text-center">
                                <div style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
                                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827', marginTop: 4 }}>{item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TDS Quarterly Table */}
            <div className="border-start border-end border-bottom" style={{ borderRadius: '0 0 12px 12px', overflow: 'hidden' }}>
                <div className="px-4 py-3" style={{ background: '#f0f4ff', borderBottom: '1px solid #dbeafe' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        TDS Deducted and Deposited — Quarterly Summary
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered mb-0" style={{ fontSize: '0.79rem' }}>
                        <thead style={{ background: '#eff6ff' }}>
                            <tr>
                                <th className="px-4 py-2 fw-semibold border" style={{ color: '#374151', fontSize: '0.75rem' }}>Quarter</th>
                                <th className="px-4 py-2 fw-semibold border" style={{ color: '#374151', fontSize: '0.75rem' }}>Period</th>
                                <th className="px-4 py-2 fw-semibold border text-end" style={{ color: '#374151', fontSize: '0.75rem' }}>Gross Salary Paid</th>
                                <th className="px-4 py-2 fw-semibold border text-end" style={{ color: '#374151', fontSize: '0.75rem' }}>TDS Deducted</th>
                                <th className="px-4 py-2 fw-semibold border text-end" style={{ color: '#374151', fontSize: '0.75rem' }}>TDS Deposited</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { q: 'Q1', period: 'Apr – Jun 2024', tds: partA.tdsQ1 },
                                { q: 'Q2', period: 'Jul – Sep 2024', tds: partA.tdsQ2 },
                                { q: 'Q3', period: 'Oct – Dec 2024', tds: partA.tdsQ3 },
                                { q: 'Q4', period: 'Jan – Mar 2025', tds: partA.tdsQ4 },
                            ].map(q => (
                                <tr key={q.q}>
                                    <td className="px-4 py-2 border fw-semibold" style={{ color: '#1e3a8a' }}>{q.q}</td>
                                    <td className="px-4 py-2 border text-secondary">{q.period}</td>
                                    <td className="px-4 py-2 border text-end">{fmt(partA.grossSalary / 4)}</td>
                                    <td className="px-4 py-2 border text-end fw-semibold">{fmt(q.tds)}</td>
                                    <td className="px-4 py-2 border text-end">
                                        <span className="badge rounded-pill" style={{ background: '#dcfce7', color: '#166534', fontSize: '0.7rem' }}>
                                            {fmt(q.tds)} ✓
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            <tr style={{ background: '#eff6ff' }}>
                                <td className="px-4 py-2 border fw-bold" colSpan={2} style={{ color: '#1e3a8a' }}>TOTAL</td>
                                <td className="px-4 py-2 border text-end fw-bold" style={{ color: '#1e3a8a' }}>{fmt(partA.grossSalary)}</td>
                                <td className="px-4 py-2 border text-end fw-bold" style={{ color: '#1e3a8a' }}>{fmt(partA.totalTDS)}</td>
                                <td className="px-4 py-2 border text-end fw-bold" style={{ color: '#166534' }}>{fmt(partA.totalTDS)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    /* ── PART B ─── */
    const PartB = () => (
        <div>
            {/* Part B Header */}
            <div className="p-4" style={{ background: '#1e3a8a', color: '#fff', borderRadius: '12px 12px 0 0' }}>
                <div className="text-center">
                    <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.75 }}>{data.employer}</div>
                    <h5 className="fw-bold mb-0 mt-1">FORM 16 — PART B</h5>
                    <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Details of Salary Paid and Tax Deducted</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.7, marginTop: 4 }}>FY {data.fy} &nbsp;|&nbsp; AY {data.ay} &nbsp;|&nbsp; Employee: {data.name} &nbsp;|&nbsp; PAN: {data.pan}</div>
                </div>
            </div>

            {/* Tax Paper Table */}
            <div className="border-start border-end border-bottom" style={{ borderRadius: '0 0 12px 12px', overflow: 'hidden' }}>
                <table className="table mb-0" style={{ fontSize: '0.8rem' }}>
                    <tbody>
                        {/* GROSS SALARY */}
                        <SectionHeader title="A. Gross Salary" />
                        <Row indent label="(i)  Basic Salary" value={fmt(partB.basicSalary)} />
                        <Row indent label="(ii) House Rent Allowance (HRA)" value={fmt(partB.hra)} />
                        <Row indent label="(iii) Special Allowance" value={fmt(partB.specialAllowance)} />
                        <Row bold label="Total Gross Salary (A)" value={fmt(partB.grossSalary)} />

                        {/* EXEMPTIONS */}
                        <SectionHeader title="B. Allowances Exempt under Section 10" />
                        <Row indent label="(i)  HRA Exempt u/s 10(13A)" value={fmt(partB.hra_exempt)} />
                        <Row indent label="(ii) LTA Exempt u/s 10(5)" value={fmt(partB.ltaExempt)} />
                        <Row bold label="Total Exemptions (B)" value={fmt(partB.totalExemption)} />

                        {/* NET SALARY */}
                        <SectionHeader title="C. Net Salary" />
                        <Row bold highlight label="Balance (A – B) — Net Salary (C)" value={fmt(partB.netSalary)} />

                        {/* STANDARD DEDUCTION */}
                        <SectionHeader title="D. Standard Deduction under Section 16" />
                        <Row indent label="Standard Deduction u/s 16(ia)" value="₹50,000" />
                        <Row bold label="Taxable Salary after Standard Deduction" value={fmt(partB.netSalary - 50000)} />

                        {/* CHAPTER VI-A DEDUCTIONS */}
                        <SectionHeader title="E. Deductions under Chapter VI-A" />
                        <Row indent label="Section 80C (PF, PPF, LIC, ELSS etc.)" value={fmt(partB.total80C)} />
                        <Row indent label="Section 80D (Medical Insurance Premium)" value={fmt(partB.total80D)} />
                        <Row indent label="Section 80CCD(1B) — NPS Contribution" value={fmt(partB.total80CCD)} />
                        <Row bold label="Total Chapter VI-A Deductions (E)" value={fmt(partB.totalVIDeductions)} />

                        {/* TAXABLE INCOME */}
                        <SectionHeader title="F. Computation of Total Taxable Income" />
                        <Row indent label="Gross Total Income (C)" value={fmt(partB.netSalary)} />
                        <Row indent label="Less: Standard Deduction" value="(₹50,000)" />
                        <Row indent label="Less: Chapter VI-A Deductions" value={`(${fmt(partB.totalVIDeductions)})`} />
                        <Row bold highlight separator label="Total Taxable Income (F)" value={fmt(partB.totalTaxableIncome)} />

                        {/* TAX COMPUTATION */}
                        <SectionHeader title="G. Tax Computation on Total Income" />
                        <Row indent label="Tax on Total Income (as per slab rates)" value={fmt(partB.taxOnIncome)} />
                        <Row indent label="Surcharge (if applicable)" value={fmt(partB.surcharge)} />
                        <Row indent label="Health & Education Cess @ 4%" value={fmt(partB.healthEducationCess)} />
                        <Row bold label="Gross Tax Liability" value={fmt(partB.totalTax)} />
                        <Row indent label="Less: Tax Relief u/s 87A" value={`(${fmt(partB.taxRelief87A)})`} />
                        <Row bold highlight label="Net Tax Payable" value={fmt(partB.netTaxPayable)} />

                        {/* TDS SUMMARY */}
                        <SectionHeader title="H. Tax Deducted at Source (TDS) Summary" />
                        <Row indent label="TDS deducted by current employer" value={fmt(partB.tdsSelf)} />
                        <Row indent label="TDS deducted by previous employer" value={fmt(partB.tdsPrevEmployer)} />
                        <Row bold label="Total TDS Deducted (H)" value={fmt(partB.totalTDS)} />

                        {/* REFUND */}
                        <SectionHeader title="I. Refund / Balance Tax" />
                        {partB.refund > 0 ? (
                            <Row bold highlight label="Refund due (H – G)" value={`+ ${fmt(partB.refund)}`} />
                        ) : (
                            <Row bold highlight label="Balance Tax Payable (G – H)" value={fmt(Math.abs(partB.netTaxPayable - partB.totalTDS))} />
                        )}
                    </tbody>
                </table>

                {/* Certification Note */}
                <div className="px-4 py-4" style={{ background: '#f8faff', borderTop: '1px solid #e5e7eb' }}>
                    <p style={{ fontSize: '0.72rem', color: '#6b7280', marginBottom: 8, lineHeight: 1.6 }}>
                        <strong style={{ color: '#374151' }}>Certified that:</strong> The information given above is true, correct and complete and is based on the books of account, documents, TDS statements,
                        TDS deposited and other available records. I/We lend herewith the details of tax deducted and deposited to the government account.
                    </p>
                    <div className="row g-4 mt-2">
                        <div className="col-md-4 text-center">
                            <div style={{ borderTop: '1px solid #9ca3af', paddingTop: 8 }}>
                                <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>Signature of Employer / Authorised Person</div>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div style={{ borderTop: '1px solid #9ca3af', paddingTop: 8 }}>
                                <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>Name & Designation</div>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div style={{ borderTop: '1px solid #9ca3af', paddingTop: 8 }}>
                                <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>Date & Place</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return activeTab === 'partA' ? <PartA /> : <PartB />;
};

/* ─── Main Form16Tab ─────────────────────────────────────── */
const Form16Tab = () => {
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [activeTab, setActiveTab] = useState('partA');
    const [fy, setFy] = useState('2024-2025');
    const [downloaded, setDownloaded] = useState(null);

    const emp = FORM16_DATA.find(e => e.id === selectedEmp);

    const handleDownload = (type) => {
        setDownloaded(type);
        setTimeout(() => setDownloaded(null), 2500);
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                <div>
                    <h5 className="fw-bold mb-0" style={{ color: '#111827' }}>Form-16 — Tax Certificate</h5>
                    <p className="text-secondary small mb-0 mt-1">
                        Certificate of Tax Deducted at Source u/s 203 of Income‑tax Act, 1961
                    </p>
                </div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    {/* FY Selector */}
                    <select
                        className="form-select form-select-sm rounded-3"
                        style={{ width: 140, fontSize: '0.82rem' }}
                        value={fy}
                        onChange={e => setFy(e.target.value)}
                    >
                        <option value="2024-2025">FY 2024-2025</option>
                        <option value="2023-2024">FY 2023-2024</option>
                        <option value="2022-2023">FY 2022-2023</option>
                    </select>
                </div>
            </div>

            {/* Employee Selector Cards */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                    <h6 className="fw-bold mb-0" style={{ color: '#111827', fontSize: '0.88rem' }}>Select Employee</h6>
                    <p className="text-secondary small mb-0 mt-1">Choose an employee to view their Form-16</p>
                </div>
                <div className="card-body px-4 pb-4 pt-3">
                    <div className="row g-3">
                        {FORM16_DATA.map(emp => (
                            <div key={emp.id} className="col-lg-4 col-md-6">
                                <div
                                    className="p-3 rounded-3 border d-flex align-items-center gap-3"
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'all 0.18s',
                                        background: selectedEmp === emp.id ? '#eff6ff' : '#fff',
                                        border: selectedEmp === emp.id ? '2px solid #2563eb !important' : '1px solid #e5e7eb',
                                        outline: selectedEmp === emp.id ? '2px solid #2563eb' : 'none',
                                    }}
                                    onClick={() => { setSelectedEmp(emp.id); setActiveTab('partA'); }}
                                >
                                    {/* Avatar */}
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-circle fw-bold text-white flex-shrink-0"
                                        style={{
                                            width: 42, height: 42, fontSize: '0.9rem',
                                            background: selectedEmp === emp.id
                                                ? 'linear-gradient(135deg, #1e3a8a, #2563eb)'
                                                : 'linear-gradient(135deg, #6b7280, #9ca3af)',
                                        }}
                                    >
                                        {emp.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div className="flex-grow-1 min-w-0">
                                        <div className="fw-semibold text-truncate" style={{ fontSize: '0.82rem', color: '#111827' }}>{emp.name}</div>
                                        <div className="text-truncate" style={{ fontSize: '0.73rem', color: '#6b7280' }}>{emp.designation}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#2563eb', marginTop: 2 }}>PAN: {emp.pan}</div>
                                    </div>
                                    {selectedEmp === emp.id && (
                                        <div style={{ color: '#2563eb', flexShrink: 0 }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form-16 Document Viewer */}
            {emp ? (
                <div>
                    {/* Part A / Part B Switcher + Actions */}
                    <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                        {/* Tab Switcher */}
                        <div className="d-flex rounded-3 overflow-hidden border" style={{ background: '#f3f4f6' }}>
                            {[
                                { id: 'partA', label: 'Part A — TDS Certificate' },
                                { id: 'partB', label: 'Part B — Salary & Tax Details' },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    className="btn border-0 px-4 py-2 fw-semibold"
                                    style={{
                                        fontSize: '0.8rem',
                                        background: activeTab === tab.id ? '#1e3a8a' : 'transparent',
                                        color: activeTab === tab.id ? '#fff' : '#6b7280',
                                        transition: 'all 0.18s',
                                        borderRadius: 0,
                                    }}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Download Buttons */}
                        <div className="d-flex gap-2 align-items-center flex-wrap">
                            {downloaded && (
                                <span style={{ fontSize: '0.78rem', color: '#166534', background: '#dcfce7', padding: '4px 10px', borderRadius: 20 }}>
                                    ✓ Downloaded as {downloaded}
                                </span>
                            )}
                            <button
                                className="btn btn-sm rounded-3 fw-semibold px-3 d-flex align-items-center gap-2"
                                style={{ background: '#16a34a', color: '#fff', fontSize: '0.8rem' }}
                                onClick={() => handleDownload('Excel')}
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download Excel
                            </button>
                            <button
                                className="btn btn-sm rounded-3 fw-semibold px-3 d-flex align-items-center gap-2"
                                style={{ background: '#dc2626', color: '#fff', fontSize: '0.8rem' }}
                                onClick={() => handleDownload('PDF')}
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download PDF
                            </button>
                            <button
                                className="btn btn-sm btn-outline-secondary rounded-3 fw-semibold px-3 d-flex align-items-center gap-2"
                                style={{ fontSize: '0.8rem' }}
                                onClick={() => window.print()}
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 6 2 18 2 18 9" />
                                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                                    <rect x="6" y="14" width="12" height="8" />
                                </svg>
                                Print
                            </button>
                        </div>
                    </div>

                    {/* The actual Form-16 Document */}
                    <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                        <Form16Document data={emp} activeTab={activeTab} />
                    </div>
                </div>
            ) : (
                /* No Employee Selected State */
                <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                    <div style={{ fontSize: '3rem', marginBottom: 12 }}>📄</div>
                    <h6 className="fw-bold text-secondary">Select an Employee</h6>
                    <p className="text-muted small mb-0">Choose an employee above to view their Form-16 tax certificate</p>
                </div>
            )}
        </div>
    );
};

export default Form16Tab;

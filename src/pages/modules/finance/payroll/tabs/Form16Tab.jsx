import React, { useState, useEffect } from 'react';
import { payrollService } from '../../../../../services/payrollService';

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
const Form16Tab = ({ personal = false }) => {
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [activeTab, setActiveTab] = useState('partA');
    const [fy, setFy] = useState('2024-2025');
    const [downloaded, setDownloaded] = useState(null);
    const [formList, setFormList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        if (!personal) return; // Admin view handled separately or kept as mock if requested
        setLoading(true);
        try {
            const data = await payrollService.getForm16();
            setFormList(Array.isArray(data) ? data : []);
            if (data?.length > 0) setSelectedEmp(data[0].id);
        } catch (error) {
            console.error("Failed to fetch Form-16 list", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [personal]);

    const emp = formList.find(e => e.id === selectedEmp);

    const handleDownload = async (type) => {
        if (type === 'PDF' && emp?.id) {
            try {
                const blob = await payrollService.downloadForm16(emp.id);
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Form16_${emp.name || 'Employee'}_${emp.fy || 'FY'}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                setDownloaded(type);
                setTimeout(() => setDownloaded(null), 2500);
            } catch (err) {
                alert("Failed to download PDF");
            }
        } else {
            setDownloaded(type);
            setTimeout(() => setDownloaded(null), 2500);
        }
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
            {!personal && (
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                    <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                        <h6 className="fw-bold mb-0" style={{ color: '#111827', fontSize: '0.88rem' }}>Select Employee</h6>
                        <p className="text-secondary small mb-0 mt-1">Choose an employee to view their Form-16</p>
                    </div>
                    <div className="card-body px-4 pb-4 pt-3">
                        {/* ... mapping FORM16_DATA (Admin view kept static for now or can be linked to service) */}
                    </div>
                </div>
            )}

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary"></div>
                    <p className="mt-2 text-muted">Loading Tax Certificates...</p>
                </div>
            ) : emp ? (
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

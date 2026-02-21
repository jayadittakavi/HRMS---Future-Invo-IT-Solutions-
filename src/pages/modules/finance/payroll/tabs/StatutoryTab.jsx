import React, { useState } from 'react';

/* ─── Statutory Acts Data ──────────────────────────────────── */
const STATUTORY_ACTS = [
    {
        id: 'pf',
        label: 'Provident Fund (PF)',
        shortName: 'EPF Act, 1952',
        icon: '🏦',
        color: '#2563eb',
        bg: '#eff6ff',
        border: '#bfdbfe',
        authority: 'Employees Provident Fund Organisation (EPFO)',
        applicability: 'Establishments with 20+ employees; Salary ≤ ₹15,000/month mandatory',
        lastUpdated: 'FY 2024-25',
        rules: [
            { label: 'Employee PF Contribution', value: '12% of Basic + DA', tag: 'Mandatory', tagColor: '#dc2626' },
            { label: 'Employer PF Contribution', value: '3.67% to EPF + 8.33% to EPS', tag: 'Mandatory', tagColor: '#dc2626' },
            { label: 'Employer EDLI Contribution', value: '0.5% of Basic (max ₹75/month)', tag: 'Mandatory', tagColor: '#dc2626' },
            { label: 'Salary Threshold (Mandatory)', value: 'Basic + DA ≤ ₹15,000/month', tag: 'Limit', tagColor: '#d97706' },
            { label: 'EPS Wage Ceiling', value: '₹15,000/month', tag: 'Ceiling', tagColor: '#7c3aed' },
            { label: 'Interest Rate (FY 2024-25)', value: '8.25% per annum', tag: 'Rate', tagColor: '#059669' },
            { label: 'UAN Linking', value: 'Universal Account Number mandatory for all', tag: 'Required', tagColor: '#dc2626' },
            { label: 'Filing Deadline', value: '15th of every following month', tag: 'Due Date', tagColor: '#0891b2' },
        ],
        keyFacts: [
            'Employee contribution is fully tax-exempt u/s 80C up to ₹1.5 Lakh',
            'Employer contribution exempt up to 12% of salary',
            'Withdrawal after 5 years of service is tax-free',
            'Partial withdrawal allowed for housing, marriage, medical',
        ],
    },
    {
        id: 'esi',
        label: 'Employees State Insurance (ESI)',
        shortName: 'ESI Act, 1948',
        icon: '🏥',
        color: '#059669',
        bg: '#ecfdf5',
        border: '#a7f3d0',
        authority: 'Employees State Insurance Corporation (ESIC)',
        applicability: 'Establishments with 10+ employees; Salary ≤ ₹21,000/month',
        lastUpdated: 'FY 2024-25',
        rules: [
            { label: 'Employee ESI Contribution', value: '0.75% of Gross Salary', tag: 'Mandatory', tagColor: '#dc2626' },
            { label: 'Employer ESI Contribution', value: '3.25% of Gross Salary', tag: 'Mandatory', tagColor: '#dc2626' },
            { label: 'Salary Ceiling', value: '₹21,000/month gross (₹25,000 for disabled)', tag: 'Ceiling', tagColor: '#7c3aed' },
            { label: 'Benefit: Medical Cover', value: 'Entire family covered, no limit', tag: 'Benefit', tagColor: '#059669' },
            { label: 'Benefit: Maternity', value: '26 weeks paid leave (wages covered)', tag: 'Benefit', tagColor: '#059669' },
            { label: 'Benefit: Disability', value: '90% of wages for permanent disability', tag: 'Benefit', tagColor: '#059669' },
            { label: 'Filing Deadline', value: '15th of following month (monthly challan)', tag: 'Due Date', tagColor: '#0891b2' },
            { label: 'Return Filing', value: 'Half-yearly return — April & October', tag: 'Compliance', tagColor: '#7c3aed' },
        ],
        keyFacts: [
            'Both employer and employee must register with ESIC',
            'ESI benefits include sickness, maternity, disablement & dependants',
            'Employees above ₹21,000 gross are exempt from ESI',
            'ESI card issued to all enrolled employees',
        ],
    },
    {
        id: 'pt',
        label: 'Professional Tax (PT)',
        shortName: 'State PT Acts',
        icon: '🏛️',
        color: '#0891b2',
        bg: '#ecfeff',
        border: '#a5f3fc',
        authority: 'Respective State Government / Commercial Taxes Dept.',
        applicability: 'Applicable in specific states; varies by state law',
        lastUpdated: 'FY 2024-25',
        rules: [
            { label: 'Karnataka (≤ ₹14,999/mo)', value: 'NIL', tag: 'State', tagColor: '#7c3aed' },
            { label: 'Karnataka (₹15,000 & above)', value: '₹200/month (₹2,400/year)', tag: 'State', tagColor: '#7c3aed' },
            { label: 'Maharashtra (₹10,001–₹15,000)', value: '₹150/month', tag: 'State', tagColor: '#7c3aed' },
            { label: 'Maharashtra (above ₹15,000)', value: '₹200/month (₹2,500 in Feb)', tag: 'State', tagColor: '#7c3aed' },
            { label: 'West Bengal (₹10,001–₹15,000)', value: '₹110/month', tag: 'State', tagColor: '#7c3aed' },
            { label: 'West Bengal (above ₹40,000)', value: '₹200/month', tag: 'State', tagColor: '#7c3aed' },
            { label: 'Delhi, UP, SP, Rajasthan', value: 'Not Applicable', tag: 'Exempt', tagColor: '#6b7280' },
            { label: 'PT Deduction Tax Exemption', value: 'Deductible u/s 16(iii) of ITA', tag: 'Tax', tagColor: '#059669' },
        ],
        keyFacts: [
            'PT is a state-level tax — not applicable uniformly across India',
            'Maximum PT is capped at ₹2,500 per year nationally',
            'Employer must also pay PT registration fee separately',
            'PT is deductible from taxable income u/s 16(iii)',
        ],
    },
    {
        id: 'gratuity',
        label: 'Gratuity',
        shortName: 'Payment of Gratuity Act, 1972',
        icon: '⭐',
        color: '#d97706',
        bg: '#fffbeb',
        border: '#fde68a',
        authority: 'Ministry of Labour & Employment, Govt. of India',
        applicability: 'Employees with 5+ years of continuous service',
        lastUpdated: 'FY 2024-25',
        rules: [
            { label: 'Eligibility', value: 'Min. 5 years continuous service', tag: 'Rule', tagColor: '#dc2626' },
            { label: 'Calculation Formula', value: '(Last Basic + DA × 15 × Years) ÷ 26', tag: 'Formula', tagColor: '#2563eb' },
            { label: 'Daily Wage Basis', value: '26 working days per month (not 30)', tag: 'Note', tagColor: '#7c3aed' },
            { label: 'Tax Exemption Limit', value: 'Up to ₹20 Lakh exempt u/s 10(10)', tag: 'Tax', tagColor: '#059669' },
            { label: 'Payment Timeline', value: 'Within 30 days of employee becoming eligible', tag: 'Due Date', tagColor: '#0891b2' },
            { label: 'Death / Disability', value: '5-year rule waived — payable immediately', tag: 'Exception', tagColor: '#dc2626' },
            { label: 'Forfeiture', value: 'Only on willful damage / misconduct proven', tag: 'Rule', tagColor: '#d97706' },
            { label: 'Covered for 4.5 years?', value: '5+ yrs needed; 4y 240d may qualify per courts', tag: 'Note', tagColor: '#6b7280' },
        ],
        keyFacts: [
            'Gratuity is a statutory right — not a bonus at employer discretion',
            '15 days salary per completed year of service',
            'Gratuity up to ₹20 Lakh is fully tax-exempt at retirement',
            'Employer must maintain a Gratuity Trust or insure via LIC Group Gratuity',
        ],
    },
    {
        id: 'income-tax',
        label: 'Income Tax & TDS',
        shortName: 'Income Tax Act, 1961',
        icon: '📊',
        color: '#7c3aed',
        bg: '#f5f3ff',
        border: '#ddd6fe',
        authority: 'Central Board of Direct Taxes (CBDT)',
        applicability: 'All employed individuals with taxable income above basic exemption limit',
        lastUpdated: 'Budget FY 2024-25',
        rules: [
            { label: 'New Regime — Up to ₹3 Lakh', value: 'NIL', tag: 'New', tagColor: '#059669' },
            { label: 'New Regime — ₹3L to ₹6L', value: '5%', tag: 'New', tagColor: '#059669' },
            { label: 'New Regime — ₹6L to ₹9L', value: '10%', tag: 'New', tagColor: '#059669' },
            { label: 'New Regime — ₹9L to ₹12L', value: '15%', tag: 'New', tagColor: '#059669' },
            { label: 'New Regime — ₹12L to ₹15L', value: '20%', tag: 'New', tagColor: '#059669' },
            { label: 'New Regime — Above ₹15L', value: '30%', tag: 'New', tagColor: '#059669' },
            { label: 'Old Regime — Up to ₹2.5 Lakh', value: 'NIL', tag: 'Old', tagColor: '#6b7280' },
            { label: 'Old Regime — ₹2.5L to ₹5L', value: '5%', tag: 'Old', tagColor: '#6b7280' },
            { label: 'Old Regime — ₹5L to ₹10L', value: '20%', tag: 'Old', tagColor: '#6b7280' },
            { label: 'Old Regime — Above ₹10L', value: '30%', tag: 'Old', tagColor: '#6b7280' },
        ],
        keyFacts: [
            'Standard Deduction of ₹50,000 available in both regimes',
            'Section 87A rebate: Tax rebate up to ₹12,500 if income ≤ ₹5L (Old) / ₹25,000 if ≤ ₹7L (New)',
            'TDS must be deposited by 7th of following month (March: 30th April)',
            'Annual TDS return (Form 24Q) to be filed quarterly',
        ],
        highlight: true,
    },
    {
        id: 'tds-deductions',
        label: 'Key Tax Deductions (Old Regime)',
        shortName: 'Chapter VI-A Deductions',
        icon: '📋',
        color: '#dc2626',
        bg: '#fff5f5',
        border: '#fecaca',
        authority: 'Income Tax Act, 1961 — Chapter VI-A',
        applicability: 'Applicable only under Old Tax Regime',
        lastUpdated: 'FY 2024-25',
        rules: [
            { label: 'Section 80C', value: 'Up to ₹1,50,000 (PF, PPF, ELSS, LIC, etc.)', tag: 'Deduction', tagColor: '#2563eb' },
            { label: 'Section 80D', value: '₹25,000 (self) + ₹50,000 (senior parents)', tag: 'Deduction', tagColor: '#2563eb' },
            { label: 'Section 80CCD(1B)', value: 'Additional ₹50,000 for NPS contribution', tag: 'Deduction', tagColor: '#2563eb' },
            { label: 'Section 80E', value: 'Full interest deduction on education loan', tag: 'Deduction', tagColor: '#2563eb' },
            { label: 'Section 80G', value: 'Donations to approved charities (50–100%)', tag: 'Deduction', tagColor: '#2563eb' },
            { label: 'Section 24(b)', value: 'Home loan interest up to ₹2 Lakh', tag: 'Deduction', tagColor: '#2563eb' },
            { label: 'HRA Exemption u/s 10(13A)', value: 'Min of actual HRA / 50% basic / rent−10% basic', tag: 'Exemption', tagColor: '#059669' },
            { label: 'LTA u/s 10(5)', value: 'Leave Travel Allowance — 2 trips in 4 years', tag: 'Exemption', tagColor: '#059639' },
        ],
        keyFacts: [
            'These deductions are NOT available under New Tax Regime',
            'HRA exemption requires rent receipts and landlord PAN if rent > ₹1L/year',
            '80C limit of ₹1.5L includes PF, PPF, ELSS, NSC, home loan principal, LIC',
            'Employees must submit investment proof by January each year',
        ],
    },
    {
        id: 'lwf',
        label: 'Labour Welfare Fund (LWF)',
        shortName: 'State LWF Acts',
        icon: '👷',
        color: '#be185d',
        bg: '#fdf2f8',
        border: '#fbcfe8',
        authority: 'State Labour Welfare Boards',
        applicability: 'Applicable in specific states — varies by employee category and salary',
        lastUpdated: 'FY 2024-25',
        rules: [
            { label: 'Karnataka — Employee', value: '₹20/month', tag: 'State', tagColor: '#7c3aed' },
            { label: 'Karnataka — Employer', value: '₹40/month (2× employee)', tag: 'State', tagColor: '#7c3aed' },
            { label: 'Maharashtra — Employee', value: '₹12 per half year', tag: 'State', tagColor: '#7c3aed' },
            { label: 'Maharashtra — Employer', value: '₹36 per half year', tag: 'State', tagColor: '#7c3aed' },
            { label: 'Gujarat — Employee', value: '₹6/month', tag: 'State', tagColor: '#7c3aed' },
            { label: 'Gujarat — Employer', value: '₹12/month', tag: 'State', tagColor: '#7c3aed' },
            { label: 'Filing Frequency', value: 'Half-yearly or Annual (state-wise)', tag: 'Compliance', tagColor: '#0891b2' },
            { label: 'Exemption', value: 'Managerial / Supervisory staff in some states', tag: 'Exempt', tagColor: '#6b7280' },
        ],
        keyFacts: [
            'LWF funds social welfare schemes for workers',
            'Not applicable in all states — check your state legislation',
            'Contribution frequency varies: monthly, half-yearly, or annual',
            'Both employer and employee contribute to the welfare fund',
        ],
    },
    {
        id: 'minimum-wages',
        label: 'Minimum Wages & Compliance',
        shortName: 'Minimum Wages Act, 1948',
        icon: '⚖️',
        color: '#0f766e',
        bg: '#f0fdfa',
        border: '#99f6e4',
        authority: 'Ministry of Labour & Employment / State Govts.',
        applicability: 'All scheduled employments; rates vary by state, category & skill level',
        lastUpdated: 'Oct 2024 revision',
        rules: [
            { label: 'Central Sphere — Unskilled', value: '₹783/day (approx. ₹20,358/month)', tag: 'Central', tagColor: '#2563eb' },
            { label: 'Central Sphere — Semi-skilled', value: '₹902/day (approx. ₹23,452/month)', tag: 'Central', tagColor: '#2563eb' },
            { label: 'Central Sphere — Skilled', value: '₹1,035/day (approx. ₹26,910/month)', tag: 'Central', tagColor: '#2563eb' },
            { label: 'Revision Frequency', value: 'Every 6 months (Apr & Oct) — VDA linked', tag: 'Rule', tagColor: '#d97706' },
            { label: 'Non-Compliance Penalty', value: 'Up to ₹10,000 fine + imprisonment', tag: 'Penalty', tagColor: '#dc2626' },
            { label: 'Equal Remuneration Act', value: 'Equal pay for men & women for same work', tag: 'Rule', tagColor: '#059669' },
            { label: 'Payment of Wages Act', value: 'Wages must be paid by 7th (< 1000 emp) or 10th', tag: 'Rule', tagColor: '#7c3aed' },
            { label: 'Bonus (Payment of Bonus Act)', value: '8.33% min — 20% max of annual wages', tag: 'Rule', tagColor: '#d97706' },
        ],
        keyFacts: [
            'Minimum wages differ by state, occupation, and skill category',
            'Variable Dearness Allowance (VDA) is revised every 6 months',
            'Employers must display minimum wages at the workplace',
            'Annual bonus applicable to employees earning ≤ ₹21,000/month',
        ],
    },
];

/* ─── Key Compliance Calendar ─────────────────────────────── */
const COMPLIANCE_CALENDAR = [
    { task: 'PF Monthly Challan', due: '15th of every month', act: 'EPF Act', icon: '🏦', color: '#2563eb' },
    { task: 'ESI Monthly Challan', due: '15th of every month', act: 'ESI Act', icon: '🏥', color: '#059669' },
    { task: 'TDS Deposit (Salary)', due: '7th of every month (Mar: 30 Apr)', act: 'IT Act', icon: '📊', color: '#7c3aed' },
    { task: 'Professional Tax (Karnataka)', due: '20th of every month', act: 'State PT Act', icon: '🏛️', color: '#0891b2' },
    { task: 'PF Annual Return (Form 3A)', due: '30th April every year', act: 'EPF Act', icon: '🏦', color: '#2563eb' },
    { task: 'ESI Half-yearly Return', due: '11th November & 11th May', act: 'ESI Act', icon: '🏥', color: '#059669' },
    { task: 'TDS Quarterly Return (24Q)', due: '31 Jul, 31 Oct, 31 Jan, 31 May', act: 'IT Act', icon: '📊', color: '#7c3aed' },
    { task: 'Form 16 Issuance (Salary TDS)', due: '15th June (after FY ends)', act: 'IT Act', icon: '📄', color: '#dc2626' },
    { task: 'Annual Bonus Payment', due: 'Within 8 months of FY end', act: 'Bonus Act', icon: '⭐', color: '#d97706' },
    { task: 'Gratuity Payment', due: 'Within 30 days of becoming eligible', act: 'Gratuity Act', icon: '⭐', color: '#d97706' },
];

/* ─── Tag Badge ────────────────────────────────────────────── */
const Tag = ({ label, color }) => (
    <span className="badge rounded-pill px-2 py-1 ms-2 flex-shrink-0"
        style={{ background: `${color}18`, color, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.03em', border: `1px solid ${color}33` }}>
        {label}
    </span>
);

/* ─── Act Detail View ─────────────────────────────────────── */
const ActDetail = ({ act, onBack }) => (
    <div className="container-fluid p-0" style={{ maxWidth: 960 }}>
        {/* Breadcrumb */}
        <div className="d-flex align-items-center gap-2 mb-4">
            <button className="btn btn-sm btn-light rounded-3 px-3 d-flex align-items-center gap-1"
                onClick={onBack} style={{ fontSize: '0.82rem', color: '#555' }}>
                <span>←</span> <span>Statutory UI</span>
            </button>
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>/</span>
            <span className="fw-semibold" style={{ fontSize: '0.92rem' }}>{act.label}</span>
        </div>

        {/* Act Header */}
        <div className="card border-0 rounded-4 mb-4 overflow-hidden">
            <div style={{ height: 5, background: act.color }} />
            <div className="p-4" style={{ background: act.bg }}>
                <div className="d-flex align-items-start gap-4 flex-wrap">
                    <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                        style={{ width: 60, height: 60, background: '#fff', fontSize: '1.8rem', border: `1.5px solid ${act.border}`, boxShadow: `0 2px 12px ${act.color}18` }}>
                        {act.icon}
                    </div>
                    <div className="flex-grow-1">
                        <h5 className="fw-bold mb-1" style={{ color: '#111827' }}>{act.label}</h5>
                        <div style={{ fontSize: '0.78rem', color: act.color, fontWeight: 600 }}>{act.shortName}</div>
                        <div className="mt-2" style={{ fontSize: '0.78rem', color: '#374151' }}>
                            <span className="fw-semibold">Authority:</span> {act.authority}
                        </div>
                        <div className="mt-1" style={{ fontSize: '0.78rem', color: '#374151' }}>
                            <span className="fw-semibold">Applicability:</span> {act.applicability}
                        </div>
                    </div>
                    <div className="text-end">
                        <div style={{ fontSize: '0.68rem', color: '#9ca3af', textTransform: 'uppercase' }}>Last Updated</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>{act.lastUpdated}</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row g-4">
            {/* Rules Table */}
            <div className="col-lg-7">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                    <div className="px-4 py-3 border-bottom" style={{ background: '#f8faff' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Rates, Rules & Limits
                        </div>
                    </div>
                    <table className="table mb-0" style={{ fontSize: '0.8rem' }}>
                        <tbody>
                            {act.rules.map((rule, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td className="px-4 py-3" style={{ color: '#374151', verticalAlign: 'middle', width: '55%' }}>
                                        <div className="d-flex align-items-center flex-wrap gap-1">
                                            <span>{rule.label}</span>
                                            <Tag label={rule.tag} color={rule.tagColor} />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 fw-semibold" style={{ color: '#111827', verticalAlign: 'middle' }}>
                                        {rule.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Key Facts */}
            <div className="col-lg-5">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                    <div className="px-4 py-3 border-bottom" style={{ background: '#f8faff' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Key Facts & Employer Notes
                        </div>
                    </div>
                    <div className="p-4">
                        {act.keyFacts.map((fact, i) => (
                            <div key={i} className="d-flex align-items-start gap-3 mb-3">
                                <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white fw-bold"
                                    style={{ width: 22, height: 22, background: act.color, fontSize: '0.65rem', marginTop: 1 }}>
                                    {i + 1}
                                </div>
                                <div style={{ fontSize: '0.79rem', color: '#374151', lineHeight: 1.55 }}>{fact}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

/* ─── Main StatutoryTab ───────────────────────────────────── */
const StatutoryTab = () => {
    const [activeAct, setActiveAct] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [showCalendar, setShowCalendar] = useState(false);

    const act = STATUTORY_ACTS.find(a => a.id === activeAct);

    if (activeAct && act) {
        return <ActDetail act={act} onBack={() => setActiveAct(null)} />;
    }

    return (
        <div className="container-fluid p-0" style={{ maxWidth: 960 }}>
            {/* Header */}
            <div className="d-flex align-items-start justify-content-between mb-4 flex-wrap gap-2">
                <div>
                    <h5 className="fw-bold mb-0" style={{ color: '#111827' }}>Statutory Compliance</h5>
                    <p className="text-secondary small mb-0 mt-1">
                        Government rules & regulations governing payroll — PF, ESI, PT, Gratuity, Income Tax, LWF & more
                    </p>
                </div>
                <button
                    className="btn btn-sm fw-semibold rounded-3 px-3 d-flex align-items-center gap-2"
                    style={{ background: showCalendar ? '#1e3a8a' : '#eff6ff', color: showCalendar ? '#fff' : '#1e3a8a', fontSize: '0.82rem', border: '1px solid #bfdbfe' }}
                    onClick={() => setShowCalendar(v => !v)}
                >
                    <span>📅</span> Compliance Calendar
                </button>
            </div>

            {/* Compliance Calendar (collapsible) */}
            {showCalendar && (
                <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
                    <div className="px-4 py-3 border-bottom" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            📅 Statutory Compliance Calendar — Due Dates
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.79rem' }}>
                            <thead>
                                <tr style={{ background: '#f8faff', color: '#6b7280', fontSize: '0.73rem', fontWeight: 600 }}>
                                    <th className="border-0 py-2 px-4">Task</th>
                                    <th className="border-0 py-2 px-4">Act</th>
                                    <th className="border-0 py-2 px-4">Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPLIANCE_CALENDAR.map((c, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <span style={{ fontSize: '1rem' }}>{c.icon}</span>
                                                <span style={{ fontWeight: 500, color: '#111827' }}>{c.task}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="badge rounded-pill px-2"
                                                style={{ background: `${c.color}18`, color: c.color, fontSize: '0.7rem', fontWeight: 700, border: `1px solid ${c.color}30` }}>
                                                {c.act}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 fw-semibold" style={{ color: '#dc2626', fontSize: '0.78rem' }}>
                                            {c.due}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Disclaimer Banner */}
            <div className="rounded-3 px-4 py-3 mb-4 d-flex align-items-start gap-3"
                style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                <span style={{ fontSize: '1rem', marginTop: 1 }}>⚠️</span>
                <div style={{ fontSize: '0.78rem', color: '#854d0e', lineHeight: 1.55 }}>
                    <strong>Important:</strong> Statutory rates and rules are subject to periodic revision by the Government of India / State Governments.
                    Always verify with the latest circulars from <strong>EPFO, ESIC, CBDT</strong>, and your respective State Labour Dept. before processing payroll.
                    Figures shown are as per <strong>Budget FY 2024-25</strong>.
                </div>
            </div>

            {/* Act Cards Grid */}
            <div className="row g-3">
                {STATUTORY_ACTS.map((act) => (
                    <div key={act.id} className="col-lg-4 col-md-6 col-12">
                        <div
                            className="card border-0 shadow-sm rounded-4 h-100 position-relative overflow-hidden"
                            style={{ cursor: 'pointer', transition: 'all 0.22s ease', border: '1px solid #e5e7eb' }}
                            onClick={() => setActiveAct(act.id)}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = `0 12px 32px ${act.color}22`;
                                e.currentTarget.style.border = `1px solid ${act.border}`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '';
                                e.currentTarget.style.border = '1px solid #e5e7eb';
                            }}
                        >
                            {/* Color top bar */}
                            <div style={{ height: 4, background: act.color, borderRadius: '16px 16px 0 0' }} />

                            <div className="card-body p-4">
                                {/* Icon */}
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="d-flex align-items-center justify-content-center rounded-3"
                                        style={{ width: 44, height: 44, background: act.bg, fontSize: '1.3rem', border: `1px solid ${act.border}` }}>
                                        {act.icon}
                                    </div>
                                    <span className="badge rounded-pill px-2"
                                        style={{ background: act.bg, color: act.color, fontSize: '0.67rem', fontWeight: 700, border: `1px solid ${act.border}` }}>
                                        {act.rules.length} rules
                                    </span>
                                </div>

                                <h6 className="fw-bold mb-1" style={{ color: '#111827', fontSize: '0.88rem' }}>{act.label}</h6>
                                <div style={{ fontSize: '0.7rem', color: act.color, fontWeight: 600, marginBottom: 6 }}>{act.shortName}</div>
                                <p className="text-secondary mb-3" style={{ fontSize: '0.76rem', lineHeight: 1.5 }}>
                                    {act.applicability}
                                </p>

                                {/* Authority */}
                                <div className="d-flex align-items-center gap-1 mb-3"
                                    style={{ fontSize: '0.68rem', color: '#9ca3af', lineHeight: 1.4 }}>
                                    <span>🏛</span> {act.authority}
                                </div>

                                {/* View Rules link */}
                                <div className="d-flex align-items-center gap-1" style={{ color: act.color, fontSize: '0.78rem', fontWeight: 600 }}>
                                    <span>View Rules</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Reference Summary Table */}
            <div className="card border-0 shadow-sm rounded-4 mt-4">
                <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                    <h6 className="fw-bold mb-0" style={{ color: '#111827' }}>Quick Reference — Key Contribution Rates</h6>
                    <p className="text-secondary small mt-1 mb-0">At-a-glance rates for all statutory components (FY 2024-25)</p>
                </div>
                <div className="card-body px-4 pb-3 pt-3">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.8rem' }}>
                            <thead>
                                <tr style={{ background: '#f8faff', fontSize: '0.73rem', color: '#6b7280', fontWeight: 600 }}>
                                    <th className="border-0 py-2 px-3">Component</th>
                                    <th className="border-0 py-2 px-3">Act</th>
                                    <th className="border-0 py-2 px-3">Employee %</th>
                                    <th className="border-0 py-2 px-3">Employer %</th>
                                    <th className="border-0 py-2 px-3">Salary Cap</th>
                                    <th className="border-0 py-2 px-3">Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 'pf', comp: 'Provident Fund (EPF)', icon: '🏦', act: 'EPF Act 1952', emp: '12%', employer: '12%', cap: '₹15,000 Basic', due: '15th of month', color: '#2563eb' },
                                    { id: 'esi', comp: 'Employee State Insurance', icon: '🏥', act: 'ESI Act 1948', emp: '0.75%', employer: '3.25%', cap: '₹21,000 Gross', due: '15th of month', color: '#059669' },
                                    { id: 'pt', comp: 'Professional Tax (KA)', icon: '🏛️', act: 'State Act', emp: '₹200/mo', employer: 'Nil', cap: 'Above ₹15,000', due: '20th of month', color: '#0891b2' },
                                    { id: 'gratuity', comp: 'Gratuity', icon: '⭐', act: 'Gratuity Act', emp: 'Nil', employer: 'Funded by Employer', cap: 'After 5 yrs service', due: '30 days of eligibility', color: '#d97706' },
                                    { id: 'income-tax', comp: 'Income Tax (TDS)', icon: '📊', act: 'IT Act 1961', emp: 'As per slab', employer: 'Deductor', cap: 'Above exemption limit', due: '7th of month', color: '#7c3aed' },
                                    { id: 'lwf', comp: 'Labour Welfare Fund', icon: '👷', act: 'State LWF Acts', emp: '₹20/mo (KA)', employer: '₹40/mo (KA)', cap: 'State-wise', due: 'Monthly/Half-yearly', color: '#be185d' },
                                ].map((row, i) => (
                                    <tr
                                        key={i}
                                        style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}
                                        onClick={() => setActiveAct(row.id)}
                                        className="statutory-row"
                                    >
                                        <td className="px-3 py-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <span style={{ fontSize: '1rem' }}>{row.icon}</span>
                                                <span className="fw-semibold" style={{ color: row.color }}>{row.comp}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className="badge rounded-pill px-2"
                                                style={{ background: `${row.color}15`, color: row.color, fontSize: '0.68rem', fontWeight: 700 }}>
                                                {row.act}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 fw-semibold" style={{ color: '#374151' }}>{row.emp}</td>
                                        <td className="px-3 py-3 fw-semibold" style={{ color: '#374151' }}>{row.employer}</td>
                                        <td className="px-3 py-3 text-secondary">{row.cap}</td>
                                        <td className="px-3 py-3 fw-semibold" style={{ color: '#dc2626', fontSize: '0.75rem' }}>{row.due}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <style>{`
                .statutory-row:hover {
                    background-color: #f8faff !important;
                }
            `}</style>
        </div>
    );
};

export default StatutoryTab;

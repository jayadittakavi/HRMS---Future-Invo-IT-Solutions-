import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { useAutomation } from '../../../../../context/AutomationContext';
import { leaveService } from '../../../../../services/leaveService';

const leaveTypes = ['Sick Leave', 'Casual Leave', 'Privilege Leave', 'Maternity Leave', 'Paternity Leave', 'Compensatory Leave'];
const card = { background: '#fff', borderRadius: 10, border: '1px solid #e8ecf0', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '14px 16px' };

const ApplyLeave = () => {
    const { triggerEvent } = useAutomation();
    const [formData, setFormData] = useState({ type: 'Sick Leave', startDate: '', endDate: '', halfDay: false, halfDayType: 'Morning', reason: '', attachment: null });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [balances, setBalances] = useState({});
    const [calculatedDays, setCalculatedDays] = useState(0);

    // Fetch initial balances
    useEffect(() => {
        const fetchBalances = async () => {
            try {
                const data = await leaveService.getBalance();
                // Handle both object { "Sick Leave": { avail: 5 } } and array [{ leave_type: "Sick Leave", remaining: 5 }] formats
                if (Array.isArray(data)) {
                    const balanceObj = {};
                    data.forEach(item => {
                        const typeName = item.leave_type || item.type || item.label;
                        balanceObj[typeName] = {
                            avail: item.remaining ?? item.avail ?? item.count ?? 0,
                            total: item.total || 0,
                            color: item.color || '#4f46e5'
                        };
                    });
                    setBalances(balanceObj);
                } else if (data && typeof data === 'object') {
                    // Try to find if data contains a nested 'data' or 'balances' array
                    const actualData = data.data || data.balances || data;
                    if (Array.isArray(actualData)) {
                        // Recurse or handle here
                        const balanceObj = {};
                        actualData.forEach(item => {
                             const typeName = item.leave_type || item.type || item.label;
                             balanceObj[typeName] = {
                                 avail: item.remaining ?? item.avail ?? item.count ?? 0,
                                 total: item.total || 0,
                                 color: item.color || '#4f46e5'
                             };
                        });
                        setBalances(balanceObj);
                    } else {
                        setBalances(actualData);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch leave balances", err);
            }
        };
        fetchBalances();
    }, []);

    // Calculate days when dates change
    useEffect(() => {
        const calculate = async () => {
            if (formData.startDate && formData.endDate) {
                try {
                    const result = await leaveService.calculateDays({
                        leave_type: formData.type,
                        from_date: formData.startDate,
                        to_date: formData.endDate,
                        is_half_day: formData.halfDay
                    });
                    const days = result.days || result.count || 0;
                    setCalculatedDays(days);
                } catch (err) {
                    console.error("Failed to calculate days", err);
                    // Fallback to manual if API fails
                    const d = Math.max(0, Math.round((new Date(formData.endDate) - new Date(formData.startDate)) / 86400000) + 1);
                    setCalculatedDays(formData.halfDay ? 0.5 : d);
                }
            } else {
                setCalculatedDays(0);
            }
        };
        calculate();
    }, [formData.startDate, formData.endDate, formData.halfDay, formData.type]);

    const handle = (e) => setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mapping fields to align with backend expectations
            const payload = {
                leave_type: formData.type,
                from_date: formData.startDate,
                to_date: formData.endDate,
                reason: formData.reason,
                count: formData.halfDay ? 0.5 : calculatedDays,
                is_half_day: formData.halfDay,
                half_day_type: formData.halfDay ? formData.halfDayType : null
            };

            const result = await leaveService.applyLeave(payload);

            if (result) {
                setSubmitted(true);
                // Trigger Automation Event
                triggerEvent('onApply', {
                    module: 'Leave',
                    employeeName: 'Self',
                    leaveType: formData.type,
                    duration: calculatedDays
                });
                setTimeout(() => setSubmitted(false), 3000);
            }
        } catch (err) {
            console.error("Failed to apply leave", err);
            alert("Failed to submit leave application. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const balance = balances[formData.type];

    return (
        <div className="row g-2">
            {/* ── Form ── */}
            <div className="col-md-8">
                <div style={card}>
                    <div className="fw-bold mb-3" style={{ fontSize: '0.88rem', color: '#1e293b' }}>
                        <FaCalendarAlt className="me-2" style={{ color: '#4f46e5' }} />
                        Apply For Leave
                    </div>

                    {submitted && (
                        <div style={{ background: '#d1fae5', color: '#065f46', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                            ✅ Leave application submitted successfully!
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Leave Type */}
                        <div className="mb-3">
                            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Leave Type</label>
                            <select
                                className="form-select"
                                name="type"
                                value={formData.type}
                                onChange={handle}
                                style={{ fontSize: '0.82rem', borderRadius: 8, borderColor: '#e2e8f0' }}
                            >
                                {leaveTypes.map(t => <option key={t}>{t}</option>)}
                            </select>
                        </div>

                        {/* Date Row */}
                        <div className="row g-2 mb-3">
                            <div className="col-6">
                                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>From Date</label>
                                <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handle} required style={{ fontSize: '0.82rem', borderRadius: 8, borderColor: '#e2e8f0' }} />
                            </div>
                            <div className="col-6">
                                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>To Date</label>
                                <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handle} required style={{ fontSize: '0.82rem', borderRadius: 8, borderColor: '#e2e8f0' }} />
                            </div>
                        </div>

                        {/* Half Day toggle */}
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="form-check form-switch m-0" style={{ fontSize: '0.78rem' }}>
                                <input className="form-check-input" type="checkbox" name="halfDay" id="halfDay" checked={formData.halfDay} onChange={handle} />
                                <label className="form-check-label fw-semibold" htmlFor="halfDay" style={{ color: '#475569' }}>Half Day</label>
                            </div>
                            {formData.halfDay && (
                                <select name="halfDayType" value={formData.halfDayType} onChange={handle} className="form-select form-select-sm w-auto" style={{ fontSize: '0.78rem', borderRadius: 7 }}>
                                    <option>Morning</option><option>Afternoon</option>
                                </select>
                            )}
                        </div>

                        {/* Reason */}
                        <div className="mb-3">
                            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Reason <span style={{ color: '#ef4444' }}>*</span></label>
                            <textarea
                                className="form-control"
                                rows="3"
                                name="reason"
                                value={formData.reason}
                                onChange={handle}
                                placeholder="Briefly describe your reason for leave..."
                                required
                                style={{ fontSize: '0.82rem', borderRadius: 8, borderColor: '#e2e8f0', resize: 'none' }}
                            />
                        </div>

                        {/* Attachment */}
                        <div className="mb-4">
                            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Attachment (optional)</label>
                            <input type="file" className="form-control" accept="image/*,.pdf" style={{ fontSize: '0.78rem', borderRadius: 8, borderColor: '#e2e8f0' }} />
                            <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: 4 }}>Medical certificate, etc. (Max 5MB)</div>
                        </div>

                        {/* Actions */}
                        <div className="d-flex justify-content-end gap-2">
                            <button type="button" className="btn btn-light fw-semibold" style={{ fontSize: '0.78rem', borderRadius: 8 }}>
                                Clear Form
                            </button>
                            <button type="submit" style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 20px', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <FaPaperPlane size={12} /> Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* ── Sidebar Info ── */}
            <div className="col-md-4">
                {/* Days Calculator */}
                <div style={{ ...card, marginBottom: 8, textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                        <MdDateRange className="me-1" /> Days Calculated
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#4f46e5', lineHeight: 1 }}>
                        {formData.halfDay ? '0.5' : calculatedDays || '—'}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{calculatedDays && !formData.halfDay ? 'working day(s)' : ''}</div>
                </div>

                {/* Balance for selected type */}
                <div style={{ ...card, marginBottom: 8 }}>
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                        <FaInfoCircle className="me-1" /> {formData.type} Balance
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: balance?.color }}>{balance?.avail}</div>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>days remaining</div>
                    {calculatedDays > 0 && balance && (
                        <div style={{ marginTop: 6, padding: '5px 8px', borderRadius: 7, background: calculatedDays > balance.avail ? '#fee2e2' : '#d1fae5', fontSize: '0.68rem', fontWeight: 600, color: calculatedDays > balance.avail ? '#991b1b' : '#065f46' }}>
                            {calculatedDays > balance.avail ? `⚠ Insufficient balance (need ${calculatedDays - balance.avail} more days)` : `✓ Balance sufficient`}
                        </div>
                    )}
                </div>

                {/* Tips */}
                <div style={{ ...card, background: '#f8faff' }}>
                    <div style={{ fontSize: '0.65rem', color: '#4f46e5', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>💡 Tips</div>
                    {[
                        'Sick leave requires a medical certificate for 3+ days.',
                        'Apply at least 3 days in advance for planned leaves.',
                        'WFH requests should be submitted separately.',
                    ].map((tip, i) => (
                        <div key={i} style={{ fontSize: '0.68rem', color: '#475569', marginBottom: 4, display: 'flex', gap: 5 }}>
                            <span style={{ color: '#4f46e5', fontWeight: 800, flexShrink: 0 }}>→</span> {tip}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ApplyLeave;

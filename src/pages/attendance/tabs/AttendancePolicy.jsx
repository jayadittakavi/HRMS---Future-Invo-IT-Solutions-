import React, { useState, useEffect } from 'react';
import {
    MdPolicy, MdSave, MdAccessTime, MdRestaurant,
    MdCoffee, MdWarning, MdSettings, MdHistory
} from 'react-icons/md';
import { attendanceService } from '../service/service';

const AttendancePolicy = () => {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [policy, setPolicy] = useState({
        workingHours: {
            startTime: '09:00',
            endTime: '18:00',
            totalHours: 9,
            graceTime: 15 // minutes
        },
        lunchBreak: {
            startTime: '13:00',
            endTime: '14:00',
            duration: 60 // minutes
        },
        teaBreak: {
            startTime: '16:00',
            endTime: '16:15',
            duration: 15 // minutes
        },
        lateRules: {
            lateThreshold: 3, // days in a month
            deductionType: 'Half Day',
            autoAbsentAfter: '11:00'
        },
        overtimeRules: {
            isEnabled: true,
            minMinutes: 60,
            rateMultiplier: 1.5
        }
    });

    // Mock fetch - can be replaced with real API later
    const fetchPolicy = async () => {
        setLoading(true);
        try {
            const data = await attendanceService.getAttendancePolicy();
            if (data) setPolicy(data);
        } catch (err) {
            console.error('Fetch policy failed:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPolicy();
    }, []);

    const handleChange = (section, field, value) => {
        setPolicy(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await attendanceService.updateAttendancePolicy(policy);
            alert('Attendance Policy updated successfully!');
        } catch (err) {
            console.error('Save policy failed:', err);
            alert('Failed to save policy: ' + err.message);
        } finally {
            setSaving(false);
        }
    };


    return (
        <div className="policy-container animate__animated animate__fadeIn">
            <div className="row g-4">
                {/* Working Hours & Grace Time */}
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white border-0 py-3 d-flex align-items-center gap-2">
                            <MdAccessTime className="text-primary fs-4" />
                            <h5 className="mb-0 fw-bold">Working Timings</h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-secondary">Work Start Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={policy.workingHours.startTime}
                                        onChange={(e) => handleChange('workingHours', 'startTime', e.target.value)}
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-bold text-secondary">Work End Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={policy.workingHours.endTime}
                                        onChange={(e) => handleChange('workingHours', 'endTime', e.target.value)}
                                    />
                                </div>
                                <div className="col-12 mt-3">
                                    <label className="form-label small fw-bold text-secondary">Grace Period (Minutes)</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={policy.workingHours.graceTime}
                                            onChange={(e) => handleChange('workingHours', 'graceTime', e.target.value)}
                                        />
                                        <span className="input-group-text bg-light text-muted small">mins</span>
                                    </div>
                                    <p className="text-muted extra-small mt-1">Allowed delay from start time without being marked late.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Breaks Configuration */}
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white border-0 py-3 d-flex align-items-center gap-2">
                            <MdRestaurant className="text-success fs-4" />
                            <h5 className="mb-0 fw-bold">Break Timings</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <h6 className="small fw-bold text-dark border-start border-4 border-success ps-2 mb-3">Lunch Break</h6>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <input
                                            type="time"
                                            className="form-control form-control-sm"
                                            value={policy.lunchBreak.startTime}
                                            onChange={(e) => handleChange('lunchBreak', 'startTime', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="time"
                                            className="form-control form-control-sm"
                                            value={policy.lunchBreak.endTime}
                                            onChange={(e) => handleChange('lunchBreak', 'endTime', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h6 className="small fw-bold text-dark border-start border-4 border-warning ps-2 mb-3">Tea/Short Break</h6>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <input
                                            type="time"
                                            className="form-control form-control-sm"
                                            value={policy.teaBreak.startTime}
                                            onChange={(e) => handleChange('teaBreak', 'startTime', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input
                                            type="time"
                                            className="form-control form-control-sm"
                                            value={policy.teaBreak.endTime}
                                            onChange={(e) => handleChange('teaBreak', 'endTime', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Late Coming & Absent Rules */}
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white border-0 py-3 d-flex align-items-center gap-2">
                            <MdWarning className="text-danger fs-4" />
                            <h5 className="mb-0 fw-bold">Late & Absent Rules</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">Max Late Entries Allowed (Monthly)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={policy.lateRules.lateThreshold}
                                    onChange={(e) => handleChange('lateRules', 'lateThreshold', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">Deduction After Limit</label>
                                <select
                                    className="form-select"
                                    value={policy.lateRules.deductionType}
                                    onChange={(e) => handleChange('lateRules', 'deductionType', e.target.value)}
                                >
                                    <option>Half Day</option>
                                    <option>Full Day</option>
                                    <option>One Day Salary</option>
                                    <option>No Deduction</option>
                                </select>
                            </div>
                            <div>
                                <label className="form-label small fw-bold text-secondary">Auto-Absent Time</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    value={policy.lateRules.autoAbsentAfter}
                                    onChange={(e) => handleChange('lateRules', 'autoAbsentAfter', e.target.value)}
                                />
                                <p className="text-muted extra-small mt-1">Mark absent if employee punches in after this time.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overtime Policy */}
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white border-0 py-3 d-flex align-items-center gap-2">
                            <MdSettings className="text-info fs-4" />
                            <h5 className="mb-0 fw-bold">Overtime Policy</h5>
                        </div>
                        <div className="card-body">
                            <div className="form-check form-switch mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    checked={policy.overtimeRules.isEnabled}
                                    onChange={(e) => handleChange('overtimeRules', 'isEnabled', e.target.checked)}
                                />
                                <label className="form-check-label small fw-bold">Enable Overtime Tracking</label>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">Minimum OT Minutes</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={policy.overtimeRules.minMinutes}
                                        onChange={(e) => handleChange('overtimeRules', 'minMinutes', e.target.value)}
                                    />
                                    <span className="input-group-text bg-light text-muted small">mins</span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">OT Rate Multiplier</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light text-muted small">x</span>
                                    <input
                                        type="number"
                                        step="0.1"
                                        className="form-control"
                                        value={policy.overtimeRules.rateMultiplier}
                                        onChange={(e) => handleChange('overtimeRules', 'rateMultiplier', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="col-12 text-end mt-4">
                    <button
                        className="btn btn-primary px-5 py-2 fw-bold rounded-pill shadow-lg d-inline-flex align-items-center gap-2"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? (
                            <div className="spinner-border spinner-border-sm" role="status"></div>
                        ) : <MdSave className="fs-5" />}
                        {saving ? 'Updating Policy...' : 'Save Policy Changes'}
                    </button>
                </div>
            </div>

            <style>{`
                .extra-small { font-size: 0.7rem; }
                .policy-container .card { transition: transform 0.2s ease; border: 1px solid #f1f5f9 !important; }
                .policy-container .card:hover { transform: translateY(-3px); }
                .form-control:focus, .form-select:focus { box-shadow: none; border-color: #2563eb; }
                .form-check-input:checked { background-color: #0ea5e9; border-color: #0ea5e9; }
            `}</style>
        </div>
    );
};

export default AttendancePolicy;

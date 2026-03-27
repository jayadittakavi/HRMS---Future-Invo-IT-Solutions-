import React, { useState, useEffect } from 'react';
import { MdSave } from 'react-icons/md';
import { useAutomation } from '../../../context/AutomationContext';
import { attendanceService } from '../service/service';

const MarkAttendance = () => {
    const { triggerEvent } = useAutomation();
    const [shifts, setShifts] = useState([]);

    useEffect(() => {
        const loadShifts = async () => {
            try {
                const data = await attendanceService.getShifts();
                setShifts(data || []);
                if (data && data.length > 0) {
                    setFormData(prev => ({ ...prev, shiftId: data[0].id }));
                }
            } catch (err) {
                console.error("Shifts fetch failed:", err);
            }
        };
        loadShifts();
    }, []);

    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
        shiftId: '',
        punchIn: '',
        punchOut: '',
        reason: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-fetch if employeeId changes and reaches a reasonable length (e.g. 3 chars)
        if (name === 'employeeId' && value.length >= 3) {
            fetchEmployeeDetails(value);
        }
    };

    const fetchEmployeeDetails = async (id) => {
        setLoadingDetails(true);
        try {
            const result = await attendanceService.getEmployeeDetails(id);
            if (result) {
                setFormData(prev => ({
                    ...prev,
                    name: result.full_name || result.name || '',
                    shiftId: result.current_shift ? result.current_shift.id : prev.shiftId
                }));
            }
        } catch (err) {
            console.error("Employee details fetch failed:", err);
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Map to Backend Payload
        const payload = {
            employee_id: formData.employeeId,
            date: formData.date,
            status: formData.status,
            shift_id: formData.shiftId,
            in_time: formData.punchIn,
            out_time: formData.punchOut,
            reason: formData.reason
        };

        try {
            await attendanceService.addManualAttendance(payload);

            triggerEvent('onMark', {
                module: 'Attendance',
                employeeName: formData.name || 'Unknown',
                status: formData.status
            });

            alert('Attendance Marked Successfully!');
            setFormData(prev => ({
                ...prev,
                employeeId: '',
                name: '',
                punchIn: '',
                punchOut: '',
                reason: ''
            }));
        } catch (err) {
            console.error("Submit failed:", err);
            alert(`Failed to mark attendance: ${err.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0 fw-bold text-dark">Mark Attendance (Single Entry)</h5>
            </div>
            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label text-secondary small fw-bold">Employee ID / Name</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    placeholder="Enter Employee ID"
                                    required
                                />
                                {loadingDetails && (
                                    <span className="input-group-text bg-white">
                                        <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-secondary small fw-bold">Employee Name</label>
                            <input
                                type="text"
                                className="form-control bg-light"
                                name="name"
                                value={formData.name}
                                readOnly
                                placeholder="Auto-populated"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label text-secondary small fw-bold">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label text-secondary small fw-bold">Status</label>
                            <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                                <option value="Half Day">Half Day</option>
                                <option value="Late">Late</option>
                                <option value="WFH">WFH</option>
                                <option value="WeekOff">WeekOff</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label text-secondary small fw-bold">Shift</label>
                            <select 
                                className="form-select" 
                                name="shiftId" 
                                value={formData.shiftId} 
                                onChange={handleChange}
                                required
                            >
                                {shifts.map(s => (
                                    <option key={s.id} value={s.id}>{s.shift_name} ({s.start_time} - {s.end_time})</option>
                                ))}
                                {shifts.length === 0 && <option value="">No shifts available</option>}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-secondary small fw-bold">Punch In Time</label>
                            <input
                                type="time"
                                className="form-control"
                                name="punchIn"
                                value={formData.punchIn}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-secondary small fw-bold">Punch Out Time</label>
                            <input
                                type="time"
                                className="form-control"
                                name="punchOut"
                                value={formData.punchOut}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label text-secondary small fw-bold">Reason (Optional)</label>
                            <textarea
                                className="form-control"
                                name="reason"
                                rows="3"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Enter reason for late entry, absence, or half day..."
                            ></textarea>
                        </div>

                        <div className="col-12 text-end mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary px-5 fw-bold d-inline-flex align-items-center gap-2"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <div className="spinner-border spinner-border-sm" role="status"></div>
                                ) : <MdSave />}
                                {submitting ? 'Saving...' : 'Save Attendance'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MarkAttendance;

import React, { useState } from 'react';
import { MdSave } from 'react-icons/md';

const MarkAttendance = () => {
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '', // Auto-populate this based on API fetch ideally
        date: new Date().toISOString().split('T')[0],
        status: 'Head', // Default or select
        shift: 'General Shift',
        punchIn: '',
        punchOut: '',
        reason: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Attendance Marked Successfully (Mock)!');
        // Implement save logic via props or service
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
                            <input
                                type="text"
                                className="form-control"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={(e) => {
                                    handleChange(e);
                                    // Simulate auto-populate name
                                    if (e.target.value === '123') setFormData(prev => ({ ...prev, name: 'John Doe' }));
                                }}
                                placeholder="Enter Employee ID"
                                required
                            />
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
                            <select className="form-select" name="shift" value={formData.shift} onChange={handleChange}>
                                <option>General Shift (09:00 - 18:00)</option>
                                <option>Morning Shift (06:00 - 15:00)</option>
                                <option>Night Shift (20:00 - 05:00)</option>
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
                            <button type="submit" className="btn btn-primary px-5 fw-bold d-inline-flex align-items-center gap-2">
                                <MdSave /> Save Attendance
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MarkAttendance;

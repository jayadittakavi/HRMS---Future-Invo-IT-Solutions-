import React, { useState } from 'react';

const ApplyLeave = () => {
    const [formData, setFormData] = useState({
        type: 'Sick Leave',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Leave Applied Successfully (Mock)!");
    };

    return (
        <div className="card border-0 shadow-sm mx-auto" style={{ borderRadius: '15px', maxWidth: '800px' }}>
            <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0 fw-bold text-dark">Apply For Leave</h5>
            </div>
            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-secondary small fw-bold">Leave Type</label>
                        <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
                            <option>Sick Leave</option>
                            <option>Casual Leave</option>
                            <option>Privilege Leave</option>
                            <option>Maternity/Paternity Leave</option>
                        </select>
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label className="form-label text-secondary small fw-bold">From Date</label>
                            <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-secondary small fw-bold">To Date</label>
                            <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-secondary small fw-bold">Reason</label>
                        <textarea className="form-control" rows="4" name="reason" value={formData.reason} onChange={handleChange} placeholder="Please provide a valid reason..." required></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-light me-2 text-secondary fw-bold">Cancel</button>
                        <button type="submit" className="btn btn-primary px-4 fw-bold">Submit Application</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyLeave;

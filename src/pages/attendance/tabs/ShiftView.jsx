import React from 'react';
import { FaIdCard, FaQrcode } from 'react-icons/fa';

const ShiftView = () => {
    const shifts = [
        { id: 1, name: 'General Shift', time: '09:00 AM - 06:00 PM', count: 25 },
        { id: 2, name: 'Morning Shift', time: '06:00 AM - 03:00 PM', count: 12 },
        { id: 3, name: 'Night Shift', time: '08:00 PM - 05:00 AM', count: 8 },
    ];

    return (
        <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0 fw-bold text-dark">Shift Details</h5>
            </div>
            <div className="card-body p-4">
                <div className="row g-4">
                    {shifts.map(shift => (
                        <div key={shift.id} className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm bg-light">
                                <div className="card-body text-center p-4">
                                    <div className="mb-3 text-primary fs-1">
                                        <FaIdCard />
                                    </div>
                                    <h5 className="fw-bold text-dark">{shift.name}</h5>
                                    <p className="text-secondary mb-3">{shift.time}</p>
                                    <span className="badge bg-primary px-3 py-2 rounded-pill fs-6">{shift.count} Employees</span>
                                </div>
                                <div className="card-footer bg-white border-0 text-center py-3">
                                    <button className="btn btn-outline-primary btn-sm rounded-pill px-4">View Employees</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShiftView;

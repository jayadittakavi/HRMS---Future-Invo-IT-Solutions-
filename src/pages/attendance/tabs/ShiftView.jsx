import React, { useState, useEffect } from 'react';
import { FaIdCard } from 'react-icons/fa';
import { attendanceService } from '../service/service';

const ShiftView = () => {
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const data = await attendanceService.getShifts();
                // Ensure data is an array
                const shiftsData = Array.isArray(data) ? data : (data.data || []);
                if (shiftsData.length > 0) {
                    setShifts(shiftsData);
                } else {
                    // Fallback to demo data if nothing is on backend, so it's not totally empty
                    setShifts([
                        { id: 1, name: 'General Shift', time: '09:00 AM - 06:00 PM', count: 0 },
                        { id: 2, name: 'Morning Shift', time: '06:00 AM - 03:00 PM', count: 0 },
                        { id: 3, name: 'Night Shift', time: '08:00 PM - 05:00 AM', count: 0 },
                    ]);
                }
            } catch (err) {
                console.error("Error fetching shifts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchShifts();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

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
                                    <h5 className="fw-bold text-dark">{shift.name || shift.shift_name}</h5>
                                    <p className="text-secondary mb-3">{shift.time || shift.shift_time || (shift.start_time && shift.end_time ? `${shift.start_time} - ${shift.end_time}` : 'TBD')}</p>
                                    <span className="badge bg-primary px-3 py-2 rounded-pill fs-6">{shift.count || shift.employee_count || 0} Employees</span>
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

import React, { useState } from 'react';
import { FaCalendarAlt, FaMoon, FaSun, FaSync } from 'react-icons/fa';

const ShiftFramework = () => {
    const [shifts, setShifts] = useState([
        { id: 1, name: 'General Shift', type: 'Fixed', time: '09:00 AM - 06:00 PM', days: 'Mon-Fri', icon: <FaSun /> },
        { id: 2, name: 'Night Shift', type: 'Fixed', time: '10:00 PM - 07:00 AM', days: 'Mon-Fri', icon: <FaMoon /> },
        { id: 3, name: 'Support Rotation', type: 'Rotational', time: 'Various', days: '24/7', icon: <FaSync /> },
    ]);

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">Shift & Roster Framework</h4>
                <button className="btn btn-primary rounded-pill btn-sm px-3">Define New Shift</button>
            </div>

            <div className="row g-4 mb-5">
                {shifts.map(shift => (
                    <div className="col-md-4" key={shift.id}>
                        <div className="card h-100 border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="p-3 bg-light rounded-circle text-primary fs-4">
                                        {shift.icon}
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-0">{shift.name}</h5>
                                        <span className="badge bg-secondary bg-opacity-10 text-secondary">{shift.type}</span>
                                    </div>
                                </div>
                                <div className="text-muted small mb-3">
                                    <p className="mb-1"><strong>Timings:</strong> {shift.time}</p>
                                    <p className="mb-0"><strong>Working Days:</strong> {shift.days}</p>
                                </div>
                                <button className="btn btn-outline-primary w-100 rounded-pill btn-sm">Configure Parameters</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h5 className="fw-bold mb-3">Weekly Off Templates</h5>
            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-0">
                    <div className="list-group list-group-flush rounded-4">
                        <div className="list-group-item p-4 d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fw-bold mb-1">5-Day Week (Sat-Sun Off)</h6>
                                <p className="text-muted small mb-0">Standard corporate week structure</p>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" defaultChecked />
                            </div>
                        </div>
                        <div className="list-group-item p-4 d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fw-bold mb-1">6-Day Week (Sun Off)</h6>
                                <p className="text-muted small mb-0">Industrial / Retail standard</p>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" />
                            </div>
                        </div>
                        <div className="list-group-item p-4 d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fw-bold mb-1">Alternate Saturdays Off</h6>
                                <p className="text-muted small mb-0">1st & 3rd working, 2nd & 4th off</p>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShiftFramework;

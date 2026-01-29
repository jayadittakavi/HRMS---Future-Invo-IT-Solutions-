import React, { useState } from 'react';
import { FaClock, FaCalendarCheck, FaHourglassHalf, FaPlus, FaTrash } from 'react-icons/fa';

const RulesTemplates = () => {
    const [templates, setTemplates] = useState([
        { id: 1, name: 'Standard Day Shift', startTime: '09:00', endTime: '18:00', graceTime: 15, halfDayThreshold: 240, minHours: 9 },
        { id: 2, name: 'Strict Timing', startTime: '08:00', endTime: '17:00', graceTime: 0, halfDayThreshold: 240, minHours: 9 },
    ]);

    const handleDelete = (id) => {
        if (window.confirm("Delete this template?")) {
            setTemplates(templates.filter(t => t.id !== id));
        }
    };

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">Attendance Rules Templates</h4>
                <button className="btn btn-primary rounded-pill btn-sm px-3 d-flex align-items-center gap-2">
                    <FaPlus /> Create Template
                </button>
            </div>

            <div className="row g-4">
                {templates.map(template => (
                    <div className="col-md-6 col-lg-4" key={template.id}>
                        <div className="card border-0 shadow-sm rounded-4 h-100 position-relative attendance-card hover-lift">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="p-2 bg-primary bg-opacity-10 text-primary rounded-3">
                                        <FaClock size={24} />
                                    </div>
                                    <button className="btn btn-link text-danger p-0" onClick={() => handleDelete(template.id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                                <h5 className="fw-bold mb-3">{template.name}</h5>

                                <div className="d-flex flex-column gap-2 border-top pt-3">
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Working Hours:</span>
                                        <span className="fw-bold text-dark">{template.startTime} - {template.endTime}</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Grace Time:</span>
                                        <span className="fw-bold text-dark">{template.graceTime} mins</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Half-day Threshold:</span>
                                        <span className="fw-bold text-dark">{template.halfDayThreshold} mins late</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Min Hours/Day:</span>
                                        <span className="fw-bold text-dark">{template.minHours} hrs</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Overtime Rule:</span>
                                        <span className="fw-bold text-dark">Count after {template.minHours} hrs</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>Late Check Rule:</span>
                                        <span className="fw-bold text-dark">3 Late = 1 Half Day</span>
                                    </div>
                                </div>

                                <button className="btn btn-light w-100 mt-3 rounded-pill text-primary fw-bold small">Edit Template</button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder */}
                <div className="col-md-6 col-lg-4">
                    <div className="card border-2 border-dashed border-secondary border-opacity-25 rounded-4 h-100 d-flex align-items-center justify-content-center bg-transparent cursor-pointer" style={{ minHeight: '250px' }}>
                        <div className="text-center text-muted">
                            <FaPlus className="mb-2" size={24} />
                            <p className="fw-bold mb-0">New Rule Template</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RulesTemplates;

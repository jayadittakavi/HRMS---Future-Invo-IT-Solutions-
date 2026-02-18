import React, { useState } from 'react';
import { MdCloudUpload, MdDownload, MdTableChart } from 'react-icons/md';

const BulkAttendance = () => {
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    // Mock Employee List
    const employees = [
        { id: 1, name: 'John Doe', dept: 'IT' },
        { id: 2, name: 'Jane Smith', dept: 'HR' },
        { id: 3, name: 'Mike Ross', dept: 'Sales' },
        { id: 4, name: 'Rachel Green', dept: 'Marketing' },
        { id: 5, name: 'Harvey Specter', dept: 'Legal' },
    ];

    const toggleEmployee = (id) => {
        if (selectedEmployees.includes(id)) {
            setSelectedEmployees(selectedEmployees.filter(empId => empId !== id));
        } else {
            setSelectedEmployees([...selectedEmployees, id]);
        }
    };

    const toggleAll = () => {
        if (selectedEmployees.length === employees.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(employees.map(e => e.id));
        }
    };

    return (
        <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold text-dark">Bulk Attendance Management</h5>
                <div className="btn-group">
                    <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2">
                        <MdDownload /> Download Template
                    </button>
                    <button className="btn btn-primary btn-sm d-flex align-items-center gap-2">
                        <MdCloudUpload /> Import CSV
                    </button>
                </div>
            </div>
            <div className="card-body p-4">
                {/* Filters / Global Settings for Bulk */}
                <div className="row g-3 mb-4 bg-light p-3 rounded">
                    <div className="col-md-3">
                        <label className="form-label small fw-bold">Select Date</label>
                        <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label small fw-bold">Select Shift</label>
                        <select className="form-select">
                            <option>General Shift</option>
                            <option>Morning Shift</option>
                            <option>Night Shift</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label small fw-bold">Set Status For All</label>
                        <select className="form-select">
                            <option>Present</option>
                            <option>Absent</option>
                            <option>WFH</option>
                            <option>WeekOff</option>
                        </select>
                    </div>
                    <div className="col-md-3 d-flex align-items-end">
                        <button className="btn btn-warning w-100 fw-bold text-dark">Apply to Selected</button>
                    </div>
                </div>

                {/* Employee Selection Table */}
                <div className="table-responsive border rounded">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-3" style={{ width: '50px' }}>
                                    <input type="checkbox" className="form-check-input" checked={selectedEmployees.length === employees.length} onChange={toggleAll} />
                                </th>
                                <th className="fw-bold text-secondary small">Employee Name</th>
                                <th className="fw-bold text-secondary small">Department</th>
                                <th className="fw-bold text-secondary small">Current Status</th>
                                <th className="fw-bold text-secondary small">Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.id} className={selectedEmployees.includes(emp.id) ? 'table-primary bg-opacity-10' : ''}>
                                    <td className="ps-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={selectedEmployees.includes(emp.id)}
                                            onChange={() => toggleEmployee(emp.id)}
                                        />
                                    </td>
                                    <td className="fw-medium">{emp.name}</td>
                                    <td className="text-secondary small">{emp.dept}</td>
                                    <td>
                                        <select className="form-select form-select-sm border-0 bg-transparent fw-bold text-primary" disabled={!selectedEmployees.includes(emp.id)}>
                                            <option>Present</option>
                                            <option>Absent</option>
                                            <option>WFH</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" className="form-control form-control-sm border-0 bg-transparent" placeholder="Add reason..." disabled={!selectedEmployees.includes(emp.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button className="btn btn-secondary me-2">Cancel</button>
                    <button className="btn btn-success px-4 fw-bold">Save All Changes</button>
                </div>
            </div>
        </div>
    );
};

export default BulkAttendance;

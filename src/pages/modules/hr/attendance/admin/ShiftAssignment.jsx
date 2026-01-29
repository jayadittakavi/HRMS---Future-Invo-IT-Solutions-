import React, { useState } from 'react';
import { FaUserClock, FaExchangeAlt } from 'react-icons/fa';

const ShiftAssignment = () => {
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Meera Joshi', department: 'Development', currentShift: 'General (9-6)', nextShift: 'General (9-6)' },
        { id: 2, name: 'Sanjay Gupta', department: 'Support', currentShift: 'Night (10-7)', nextShift: 'General (9-6)' },
    ]);

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">Shift & Roster Assignment</h4>
                <button className="btn btn-primary rounded-pill btn-sm px-3 d-flex align-items-center gap-2">
                    <FaExchangeAlt /> Bulk Update Roster
                </button>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-0">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 border-0 small text-uppercase text-secondary">Employee</th>
                                <th className="border-0 small text-uppercase text-secondary">Department</th>
                                <th className="border-0 small text-uppercase text-secondary">Current Shift</th>
                                <th className="border-0 small text-uppercase text-secondary">Upcoming Match</th>
                                <th className="border-0 small text-uppercase text-secondary">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.id}>
                                    <td className="ps-4 fw-bold">{emp.name}</td>
                                    <td className="text-muted">{emp.department}</td>
                                    <td><span className="badge bg-primary bg-opacity-10 text-primary">{emp.currentShift}</span></td>
                                    <td>
                                        {emp.currentShift !== emp.nextShift ?
                                            <span className="badge bg-warning text-dark">{emp.nextShift}</span> :
                                            <span className="text-muted">-</span>
                                        }
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary rounded-pill px-3">Change</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShiftAssignment;

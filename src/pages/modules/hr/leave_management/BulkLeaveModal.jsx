import React, { useState, useEffect } from 'react';
import { attendanceService } from '../../../attendance/service/service';
import { FaUserPlus, FaUsers, FaSearch, FaCalendarAlt } from 'react-icons/fa';

const BulkLeaveModal = ({ onClose }) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form Data
    const [leaveType, setLeaveType] = useState('Casual Leave');
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
    const [reason, setReason] = useState('');

    // Filter
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await attendanceService.getAllEmployees();
                const list = Array.isArray(data) ? data : (data.data || data.employees || []);
                setEmployees(list);
            } catch (err) {
                console.error("Failed to load employees", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const toggleEmployee = (id) => {
        setSelectedEmployeeIds(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        const filtered = filteredEmployees.map(e => e.id);
        if (selectedEmployeeIds.length === filtered.length && filtered.length > 0) {
            setSelectedEmployeeIds([]);
        } else {
            setSelectedEmployeeIds(filtered);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedEmployeeIds.length === 0) {
            alert("Please select at least one employee.");
            return;
        }

        setSubmitting(true);
        try {
            // Simulate Bulk API call
            console.log("Submitting bulk leave:", {
                employees: selectedEmployeeIds,
                leaveType,
                fromDate,
                toDate,
                reason
            });

            // Artificial delay to simulate network request
            await new Promise(resolve => setTimeout(resolve, 1000));

            alert(`Leave request submitted successfully for ${selectedEmployeeIds.length} employees!`);
            onClose();
        } catch (err) {
            console.error("Bulk leave error", err);
            alert("Failed to submit leave: " + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredEmployees = employees.filter(emp =>
        (emp.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (emp.employee_id || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title d-flex align-items-center gap-2">
                            <FaUsers className="text-primary" /> Bulk Leave Allocation
                        </h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {/* Employee Selection Column */}
                            <div className="col-md-5 border-end">
                                <h6 className="fw-bold mb-3">1. Select Employees</h6>
                                <div className="input-group mb-2">
                                    <span className="input-group-text bg-white"><FaSearch className="text-muted" /></span>
                                    <input
                                        type="text"
                                        className="form-control shadow-none border-start-0"
                                        placeholder="Search by name or ID..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="form-check mb-2 bg-light p-2 rounded">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={filteredEmployees.length > 0 && selectedEmployeeIds.length === filteredEmployees.length}
                                        onChange={toggleAll}
                                        id="selectAllLeave"
                                    />
                                    <label className="form-check-label fw-bold small ms-1" htmlFor="selectAllLeave">
                                        Select All ({filteredEmployees.length})
                                    </label>
                                </div>

                                <div className="list-group overflow-auto custom-scroll" style={{ maxHeight: '300px' }}>
                                    {loading ? (
                                        <div className="text-center p-3 text-muted">Loading...</div>
                                    ) : filteredEmployees.length === 0 ? (
                                        <div className="text-center p-3 text-muted">No employees found.</div>
                                    ) : (
                                        filteredEmployees.map(emp => (
                                            <label key={emp.id} className="list-group-item list-group-item-action d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                                                <input
                                                    className="form-check-input mt-0"
                                                    type="checkbox"
                                                    checked={selectedEmployeeIds.includes(emp.id)}
                                                    onChange={() => toggleEmployee(emp.id)}
                                                />
                                                <div className="small">
                                                    <div className="fw-bold">{emp.name}</div>
                                                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>{emp.employee_id} • {emp.designation || 'Employee'}</div>
                                                </div>
                                            </label>
                                        ))
                                    )}
                                </div>
                                <div className="mt-2 text-end text-primary small fw-bold">
                                    Selected: {selectedEmployeeIds.length}
                                </div>
                            </div>

                            {/* Leave Details Column */}
                            <div className="col-md-7 ps-4">
                                <h6 className="fw-bold mb-3">2. Leave Details</h6>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-secondary">Leave Type</label>
                                        <select className="form-select" value={leaveType} onChange={e => setLeaveType(e.target.value)}>
                                            <option>Casual Leave</option>
                                            <option>Sick Leave</option>
                                            <option>Annual Leave</option>
                                            <option>Unpaid Leave</option>
                                            <option>Maternity Leave</option>
                                            <option>Paternity Leave</option>
                                        </select>
                                    </div>

                                    <div className="row g-2 mb-3">
                                        <div className="col-6">
                                            <label className="form-label small fw-bold text-secondary">From Date</label>
                                            <input type="date" className="form-control" value={fromDate} onChange={e => setFromDate(e.target.value)} required />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label small fw-bold text-secondary">To Date</label>
                                            <input type="date" className="form-control" value={toDate} onChange={e => setToDate(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label small fw-bold text-secondary">Reason</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={reason}
                                            onChange={e => setReason(e.target.value)}
                                            placeholder="Enter reason for bulk allocation..."
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                                        <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
                                        <button type="submit" className="btn btn-primary d-flex align-items-center gap-2" disabled={submitting}>
                                            <FaCalendarAlt /> {submitting ? 'Allocating...' : 'Allocate Leave'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkLeaveModal;

import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";

export const FinancialYearContent = () => {
    // Mock Data
    const [years] = useState([
        { id: 1, name: 'FY 2024-2025', start: '01 Apr 2024', end: '31 Mar 2025', status: 'Active' },
        { id: 2, name: 'FY 2023-2024', start: '01 Apr 2023', end: '31 Mar 2024', status: 'Closed' },
        { id: 3, name: 'FY 2022-2023', start: '01 Apr 2022', end: '31 Mar 2023', status: 'Closed' },
    ]);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedYear, setSelectedYear] = useState(null);

    // Handlers
    const handleEdit = (fy) => {
        setSelectedYear(fy);
        setShowEdit(true);
    };

    const handleDelete = (fy) => {
        setSelectedYear(fy);
        setShowDelete(true);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Financial Year Settings</h5>
                    <p className="text-secondary small mb-0">Manage financial years</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={() => setShowAdd(true)}>
                    + Add Financial Year
                </button>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Financial Year</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {years.map((fy) => (
                                <tr key={fy.id}>
                                    <td><span className="fw-bold text-dark">{fy.name}</span></td>
                                    <td>{fy.start}</td>
                                    <td>{fy.end}</td>
                                    <td>
                                        <span className={`status-badge ${fy.status === 'Active' ? 'bg-success text-white' : 'bg-secondary text-white'}`} style={{ fontSize: '0.7rem' }}>
                                            {fy.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn edit" onClick={() => handleEdit(fy)}><FaEdit /></button>
                                        <button className="action-btn delete" onClick={() => handleDelete(fy)}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            {showAdd && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Financial Year</h5>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Name</label>
                                        <input type="text" className="form-control" placeholder="e.g. FY 2025-2026" />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Start Date</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">End Date</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEdit && selectedYear && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Financial Year</h5>
                                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Name</label>
                                        <input type="text" className="form-control" defaultValue={selectedYear.name} />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Start Date</label>
                                            <input type="text" className="form-control" defaultValue={selectedYear.start} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">End Date</label>
                                            <input type="text" className="form-control" defaultValue={selectedYear.end} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Status</label>
                                        <select className="form-select" defaultValue={selectedYear.status}>
                                            <option>Active</option>
                                            <option>Closed</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDelete && selectedYear && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Delete Financial Year</h5>
                                <button className="btn-close" onClick={() => setShowDelete(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete <strong>{selectedYear.name}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowDelete(false)}>Cancel</button>
                                <button className="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const FinancialYear = () => {
    return (
        <DashboardLayout title="">
            <FinancialYearContent />
        </DashboardLayout>
    );
};

export default FinancialYear;

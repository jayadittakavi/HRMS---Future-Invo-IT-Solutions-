import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";

export const PayGradeContent = () => {
    // Mock Data for Table
    const [payGrades] = useState([
        { id: 1, name: 'Grade A', min: '₹30,000', max: '₹50,000', currency: 'INR', employeeCount: 15 },
        { id: 2, name: 'Grade B', min: '₹50,001', max: '₹80,000', currency: 'INR', employeeCount: 25 },
        { id: 3, name: 'Grade C', min: '₹80,001', max: '₹1,20,000', currency: 'INR', employeeCount: 10 },
        { id: 4, name: 'Executive', min: '₹1,20,001', max: '₹2,00,000', currency: 'INR', employeeCount: 5 },
    ]);

    // Simple Data for CSS Charts
    const salaryRanges = [
        { label: 'Gr A', height: '40%', color: '#6366f1' },
        { label: 'Gr B', height: '60%', color: '#8b5cf6' },
        { label: 'Gr C', height: '80%', color: '#ec4899' },
        { label: 'Exec', height: '100%', color: '#10b981' },
    ];

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState(null);

    // Handlers
    const handleEdit = (grade) => {
        setSelectedGrade(grade);
        setShowEdit(true);
    };

    const handleDelete = (grade) => {
        setSelectedGrade(grade);
        setShowDelete(true);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Pay Grade Management</h5>
                    <p className="text-secondary small mb-0">Configure salary structures and grades</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={() => setShowAdd(true)}>
                    + Add New Grade
                </button>
            </div>

            <div className="row g-4 mb-4">
                {/* Visual Representation: Salary Range Steps */}
                <div className="col-md-7">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title">Salary Grade Structure</h6>
                        <div className="d-flex align-items-end justify-content-around h-75 pt-3" style={{ minHeight: '150px' }}>
                            {salaryRanges.map((item, index) => (
                                <div key={index} className="d-flex flex-column align-items-center" style={{ height: '100%', justifyContent: 'flex-end', width: '40px' }}>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: item.height,
                                            backgroundColor: item.color,
                                            borderRadius: '6px 6px 0 0',
                                            transition: 'height 0.5s ease'
                                        }}
                                        title={item.label}
                                    ></div>
                                    <span className="small text-secondary fw-bold mt-2" style={{ fontSize: '0.75rem' }}>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Visual Representation: Distribution Donut (Simulated) */}
                <div className="col-md-5">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title">Grade Distribution</h6>
                        <div className="d-flex align-items-center justify-content-center h-75">
                            <div style={{
                                width: '140px',
                                height: '140px',
                                borderRadius: '50%',
                                background: 'conic-gradient(#6366f1 0% 27%, #8b5cf6 27% 72%, #ec4899 72% 90%, #10b981 90% 100%)',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    backgroundColor: '#fff'
                                }}></div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center gap-3 mt-2">
                            <div className="d-flex align-items-center gap-1"><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }}></span><small style={{ fontSize: '0.7rem' }}>A</small></div>
                            <div className="d-flex align-items-center gap-1"><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6' }}></span><small style={{ fontSize: '0.7rem' }}>B</small></div>
                            <div className="d-flex align-items-center gap-1"><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ec4899' }}></span><small style={{ fontSize: '0.7rem' }}>C</small></div>
                            <div className="d-flex align-items-center gap-1"><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span><small style={{ fontSize: '0.7rem' }}>Ex</small></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Grade Name</th>
                                <th>Currency</th>
                                <th>Min Salary</th>
                                <th>Max Salary</th>
                                <th>Employees</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payGrades.map((grade) => (
                                <tr key={grade.id}>
                                    <td><span className="fw-bold text-dark">{grade.name}</span></td>
                                    <td>{grade.currency}</td>
                                    <td>{grade.min}</td>
                                    <td>{grade.max}</td>
                                    <td>
                                        <span className="badge bg-light text-dark border">
                                            {grade.employeeCount} Users
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn edit" onClick={() => handleEdit(grade)}><FaEdit /></button>
                                        <button className="action-btn delete" onClick={() => handleDelete(grade)}><FaTrash /></button>
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
                                <h5 className="modal-title">Add Pay Grade</h5>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Grade Name</label>
                                        <input type="text" className="form-control" placeholder="e.g. Grade A" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Currency</label>
                                        <select className="form-select">
                                            <option>INR</option>
                                            <option>USD</option>
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Min Salary</label>
                                            <input type="number" className="form-control" placeholder="0" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Max Salary</label>
                                            <input type="number" className="form-control" placeholder="0" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Save Grade</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEdit && selectedGrade && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Pay Grade</h5>
                                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Grade Name</label>
                                        <input type="text" className="form-control" defaultValue={selectedGrade.name} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Currency</label>
                                        <select className="form-select" defaultValue={selectedGrade.currency}>
                                            <option>INR</option>
                                            <option>USD</option>
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Min Salary</label>
                                            <input type="text" className="form-control" defaultValue={selectedGrade.min} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Max Salary</label>
                                            <input type="text" className="form-control" defaultValue={selectedGrade.max} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Update Grade</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDelete && selectedGrade && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Delete Pay Grade</h5>
                                <button className="btn-close" onClick={() => setShowDelete(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete <strong>{selectedGrade.name}</strong>?</p>
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

const PayGrade = () => {
    return (
        <DashboardLayout title="">
            <PayGradeContent />
        </DashboardLayout>
    );
};

export default PayGrade;

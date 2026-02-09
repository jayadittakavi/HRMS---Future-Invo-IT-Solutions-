import React, { useState } from 'react';
import { FaEdit, FaTrash, FaFilePdf } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";

export const PayGradeContent = () => {
    // Mock Data for Table
    const [payGrades, setPayGrades] = useState([
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
    const [showPdf, setShowPdf] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState(null);

    // Form States
    const [formData, setFormData] = useState({ name: '', currency: 'INR', min: '', max: '' });

    // Handlers
    const handleEdit = (grade) => {
        setSelectedGrade(grade);
        setFormData({ name: grade.name, currency: grade.currency, min: grade.min.replace(/[^0-9]/g, ''), max: grade.max.replace(/[^0-9]/g, '') });
        setShowEdit(true);
    };

    const handleDelete = (grade) => {
        setSelectedGrade(grade);
        setShowDelete(true);
    };

    const handleDownloadPdf = (grade) => {
        setSelectedGrade(grade);
        setShowPdf(true);
    };

    const handleSave = () => {
        const newId = payGrades.length + 1;
        const newGrade = {
            id: newId,
            name: formData.name,
            min: `₹${Number(formData.min).toLocaleString()}`,
            max: `₹${Number(formData.max).toLocaleString()}`,
            currency: formData.currency,
            employeeCount: 0
        };

        setPayGrades([...payGrades, newGrade]);
        setShowAdd(false);
        setFormData({ name: '', currency: 'INR', min: '', max: '' });
        alert("Pay Grade Created Successfully!");
    };

    const handleUpdate = () => {
        const updatedGrades = payGrades.map(grade => {
            if (grade.id === selectedGrade.id) {
                return {
                    ...grade,
                    name: formData.name,
                    currency: formData.currency,
                    min: `₹${Number(formData.min).toLocaleString()}`,
                    max: `₹${Number(formData.max).toLocaleString()}`
                };
            }
            return grade;
        });

        setPayGrades(updatedGrades);
        setShowEdit(false);
        alert("Pay Grade Updated Successfully!");
    };

    const handleConfirmDelete = () => {
        const updatedGrades = payGrades.filter(g => g.id !== selectedGrade.id);
        setPayGrades(updatedGrades);
        setShowDelete(false);
        alert(`Deleted ${selectedGrade.name} successfully!`);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Pay Grade Management</h5>
                    <p className="text-secondary small mb-0">Configure salary structures and grades</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={() => { setFormData({ name: '', currency: 'INR', min: '', max: '' }); setShowAdd(true); }}>
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
                                        <button className="action-btn view me-1" title="Download PDF" onClick={() => handleDownloadPdf(grade)}><FaFilePdf /></button>
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
                                        <input type="text" className="form-control" placeholder="e.g. Grade A" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Currency</label>
                                        <select className="form-select" value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })}>
                                            <option value="INR">INR</option>
                                            <option value="USD">USD</option>
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Min Salary</label>
                                            <input type="number" className="form-control" placeholder="0" value={formData.min} onChange={(e) => setFormData({ ...formData, min: e.target.value })} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Max Salary</label>
                                            <input type="number" className="form-control" placeholder="0" value={formData.max} onChange={(e) => setFormData({ ...formData, max: e.target.value })} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Close</button>
                                <button className="btn btn-primary btn-sm" onClick={handleSave}>Save Grade</button>
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
                                        <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Currency</label>
                                        <select className="form-select" value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })}>
                                            <option value="INR">INR</option>
                                            <option value="USD">USD</option>
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Min Salary</label>
                                            <input type="number" className="form-control" value={formData.min} onChange={(e) => setFormData({ ...formData, min: e.target.value })} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Max Salary</label>
                                            <input type="number" className="form-control" value={formData.max} onChange={(e) => setFormData({ ...formData, max: e.target.value })} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Close</button>
                                <button className="btn btn-primary btn-sm" onClick={handleUpdate}>Update Grade</button>
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
                                <button className="btn btn-danger btn-sm" onClick={handleConfirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* PDF View Modal */}
            {showPdf && selectedGrade && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Pay Grade Details - {selectedGrade.name}</h5>
                                <button className="btn-close" onClick={() => setShowPdf(false)}></button>
                            </div>
                            <div className="modal-body p-5 bg-white">
                                <div className="border p-4">
                                    <div className="text-center mb-4">
                                        <h3 className="fw-bold">Future Invo Solutions</h3>
                                        <p className="text-muted">Pay Grade Structure Document</p>
                                        <hr />
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-6">
                                            <h6 className="fw-bold">Grade Information:</h6>
                                            <p className="mb-1"><strong>Name:</strong> {selectedGrade.name}</p>
                                            <p className="mb-1"><strong>Code:</strong> GR-{selectedGrade.id}00X</p>
                                            <p className="mb-1"><strong>Currency:</strong> {selectedGrade.currency}</p>
                                        </div>
                                        <div className="col-6 text-end">
                                            <h6 className="fw-bold">Generated On:</h6>
                                            <p>{new Date().toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="table-responsive mb-4">
                                        <table className="table table-bordered">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Description</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Minimum Salary Slab</td>
                                                    <td>{selectedGrade.min}</td>
                                                </tr>
                                                <tr>
                                                    <td>Maximum Salary Slab</td>
                                                    <td>{selectedGrade.max}</td>
                                                </tr>
                                                <tr>
                                                    <td>Active Employees</td>
                                                    <td>{selectedGrade.employeeCount}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="text-center mt-5">
                                        <p className="small text-muted">This document is confidential and for internal use only.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowPdf(false)}>Close</button>
                                <button className="btn btn-primary" onClick={() => window.print()}>Download / Print PDF</button>
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

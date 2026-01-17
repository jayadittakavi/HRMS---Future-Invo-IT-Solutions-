import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../components/DashboardLayout.css';

export const BranchesContent = () => {
    // Mock Data
    const [branches, setBranches] = useState([
        { id: 1, name: 'Bangalore Main Branch', company: 'TrickuWeb Technologies', address: 'Tech Park, Bangalore', location: '12.97, 77.59' },
        { id: 2, name: 'Hyderabad Main Branch', company: 'InnovateSoft Solutions', address: 'HITEC City, Hyderabad', location: '17.38, 78.48' },
        { id: 3, name: 'Pune Main Branch', company: 'TechForward India', address: 'Hinjewadi, Pune', location: '18.59, 73.72' },
    ]);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);

    // Handlers
    const handleEdit = (branch) => {
        setSelectedBranch(branch);
        setShowEdit(true);
    };

    const handleDelete = (branch) => {
        setSelectedBranch(branch);
        setShowDelete(true);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Branch Management</h5>
                    <p className="text-secondary small mb-0">Manage company branches</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={() => setShowAdd(true)}>
                    + Add Branch
                </button>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Branch Name</th>
                                <th>Company</th>
                                <th>Address</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branches.map((branch) => (
                                <tr key={branch.id}>
                                    <td><span className="fw-bold text-dark">{branch.name}</span></td>
                                    <td>{branch.company}</td>
                                    <td>{branch.address}</td>
                                    <td>{branch.location}</td>
                                    <td>
                                        <button className="action-btn edit" onClick={() => handleEdit(branch)}>Edit</button>
                                        <button className="action-btn delete" onClick={() => handleDelete(branch)}>Delete</button>
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
                                <h5 className="modal-title">Add Branch</h5>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Branch Name</label>
                                        <input type="text" className="form-control" placeholder="Enter branch name" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Company</label>
                                        <select className="form-select">
                                            <option>Select Company</option>
                                            <option>TrickuWeb Technologies</option>
                                            <option>InnovateSoft Solutions</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Address</label>
                                        <textarea className="form-control" rows="2" placeholder="Enter address"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Save Branch</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEdit && selectedBranch && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Branch</h5>
                                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Branch Name</label>
                                        <input type="text" className="form-control" defaultValue={selectedBranch.name} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Company</label>
                                        <select className="form-select" defaultValue={selectedBranch.company}>
                                            <option>TrickuWeb Technologies</option>
                                            <option>InnovateSoft Solutions</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Address</label>
                                        <textarea className="form-control" rows="2" defaultValue={selectedBranch.address}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Update Branch</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDelete && selectedBranch && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Delete Branch</h5>
                                <button className="btn-close" onClick={() => setShowDelete(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete <strong>{selectedBranch.name}</strong>?</p>
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

const Branches = () => {
    return (
        <DashboardLayout title="">
            <BranchesContent />
        </DashboardLayout>
    );
};

export default Branches;

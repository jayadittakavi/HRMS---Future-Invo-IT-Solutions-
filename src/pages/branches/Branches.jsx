import React, { useState } from 'react';
import { FaEdit, FaTrash, FaBan, FaCheckCircle } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../components/DashboardLayout.css';
import BranchMap from '../../components/BranchMap';

export const BranchesContent = () => {
    // Mock Data
    const [branches, setBranches] = useState([
        { id: 1, name: 'Bangalore Main Branch', company: 'TrickuWeb Technologies', address: 'Tech Park, Bangalore', location: '12.9716, 77.5946', status: 'Active' },
        { id: 2, name: 'Hyderabad Main Branch', company: 'InnovateSoft Solutions', address: 'HITEC City, Hyderabad', location: '17.3850, 78.4867', status: 'Active' },
        { id: 3, name: 'Pune Main Branch', company: 'TechForward India', address: 'Hinjewadi, Pune', location: '18.5204, 73.8567', status: 'Active' },
        { id: 4, name: 'Mumbai Corporate Office', company: 'Alpha Corp', address: 'Bandra Kurla Complex, Mumbai', location: '19.0760, 72.8777', status: 'Active' },
        { id: 5, name: 'Chennai Tech Hub', company: 'Beta Industries', address: 'Tidel Park, Chennai', location: '13.0827, 80.2707', status: 'Active' },
        { id: 6, name: 'Delhi NCR Office', company: 'Gamma Enterprises', address: 'Cyber City, Gurgaon', location: '28.4595, 77.0266', status: 'Inactive' },
        { id: 7, name: 'Kolkata Center', company: 'Epsilon Tech', address: 'Sector V, Salt Lake, Kolkata', location: '22.5726, 88.3639', status: 'Active' },
    ]);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);

    // Handlers
    const handleEdit = (branch) => {
        setSelectedBranch(branch);
        setShowEdit(true);
    };

    const toggleStatus = (id) => {
        const updatedBranches = branches.map(branch => {
            if (branch.id === id) {
                return { ...branch, status: branch.status === 'Active' ? 'Inactive' : 'Active' };
            }
            return branch;
        });
        setBranches(updatedBranches);
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
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branches.map((branch) => (
                                <tr key={branch.id} className={branch.status === 'Inactive' ? 'opacity-50' : ''}>
                                    <td><span className="fw-bold text-dark">{branch.name}</span></td>
                                    <td>{branch.company}</td>
                                    <td>{branch.address}</td>
                                    <td>{branch.location}</td>
                                    <td>
                                        <span className={`badge ${branch.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {branch.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn edit" onClick={() => handleEdit(branch)}><FaEdit /></button>
                                        <button
                                            className={`action-btn ${branch.status === 'Active' ? 'delete' : 'edit'}`}
                                            title={branch.status === 'Active' ? "Deactivate Branch" : "Activate Branch"}
                                            onClick={() => toggleStatus(branch.id)}
                                        >
                                            {branch.status === 'Active' ? <FaBan /> : <FaCheckCircle className="text-success" />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Map Section */}
            <div className="mt-4">
                <BranchMap branches={branches} />
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

            {/* Modal for Delete Removed */}
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

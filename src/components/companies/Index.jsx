import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../components/DashboardLayout.css';

export const CompaniesContent = () => {
    // Mock Data
    const [companies] = useState([
        { id: 1, name: 'TrickuWeb Technologies', email: 'support@trickuweb.com', address: 'Tech Park, Bangalore', status: 'Active' },
        { id: 2, name: 'InnovateSoft Solutions', email: 'support@innovatesoft.com', address: 'IT Hub, Hyderabad', status: 'Active' },
        { id: 3, name: 'NextGen Systems', email: 'info@nextgensys.com', address: 'Tech Valley, Noida', status: 'Active' },
    ]);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    // Handlers
    const handleEdit = (company) => {
        setSelectedCompany(company);
        setShowEdit(true);
    };

    const handleDelete = (company) => {
        setSelectedCompany(company);
        setShowDelete(true);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Company Management</h5>
                    <p className="text-secondary small mb-0">Manage companies in your system</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={() => setShowAdd(true)}>
                    + Add Company
                </button>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Support Email</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company) => (
                                <tr key={company.id}>
                                    <td><span className="fw-bold text-dark">{company.name}</span></td>
                                    <td>{company.email}</td>
                                    <td>{company.address}</td>
                                    <td><span className="status-badge">Active</span></td>
                                    <td>
                                        <button className="action-btn edit" onClick={() => handleEdit(company)} title="Edit"><FaEdit /></button>
                                        <button className="action-btn delete" onClick={() => handleDelete(company)} title="Delete"><FaTrash /></button>
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
                                <h5 className="modal-title">Add Company</h5>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Company Name</label>
                                        <input type="text" className="form-control" placeholder="Enter name" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Support Email</label>
                                        <input type="email" className="form-control" placeholder="Enter email" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Address</label>
                                        <textarea className="form-control" rows="2" placeholder="Enter address"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Save Company</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEdit && selectedCompany && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Company</h5>
                                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Company Name</label>
                                        <input type="text" className="form-control" defaultValue={selectedCompany.name} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Support Email</label>
                                        <input type="email" className="form-control" defaultValue={selectedCompany.email} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Address</label>
                                        <textarea className="form-control" rows="2" defaultValue={selectedCompany.address}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Update Company</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDelete && selectedCompany && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Delete Company</h5>
                                <button className="btn-close" onClick={() => setShowDelete(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete <strong>{selectedCompany.name}</strong>? This action cannot be undone.</p>
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

const Companies = () => {
    return (
        <DashboardLayout title="">
            <CompaniesContent />
        </DashboardLayout>
    );
};

export default Companies;

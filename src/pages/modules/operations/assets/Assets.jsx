import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";

export const AssetsContent = () => {
    // Mock Data
    const [assets] = useState([
        { id: 1, name: 'MacBook Pro M2', category: 'IT Equipment', serial: 'MBP2023001', assignedTo: 'Praveen Kumar', status: 'Assigned' },
        { id: 2, name: 'Dell XPS 15', category: 'IT Equipment', serial: 'DXPS15002', assignedTo: 'Nitin Patel', status: 'Assigned' },
        { id: 3, name: 'Office Chair', category: 'Office Furniture', serial: 'OCE005', assignedTo: 'Priyanka Sharma', status: 'Assigned' },
    ]);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);

    // Handlers
    const handleEdit = (asset) => {
        setSelectedAsset(asset);
        setShowEdit(true);
    };

    const handleDelete = (asset) => {
        setSelectedAsset(asset);
        setShowDelete(true);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Asset Management</h5>
                    <p className="text-secondary small mb-0">Manage company assets</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={() => setShowAdd(true)}>
                    + Add Asset
                </button>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Asset Name</th>
                                <th>Category</th>
                                <th>Serial Number</th>
                                <th>Assigned To</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map((asset) => (
                                <tr key={asset.id}>
                                    <td><span className="fw-bold text-dark">{asset.name}</span></td>
                                    <td>{asset.category}</td>
                                    <td>{asset.serial}</td>
                                    <td>{asset.assignedTo}</td>
                                    <td>
                                        <span className={`status-badge ${asset.status === 'Available' ? 'bg-success text-white' : 'bg-light text-dark'}`} style={{ fontSize: '0.7rem' }}>
                                            {asset.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn edit" onClick={() => handleEdit(asset)}><FaEdit /></button>
                                        <button className="action-btn delete" onClick={() => handleDelete(asset)}><FaTrash /></button>
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
                                <h5 className="modal-title">Add Asset</h5>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Asset Name</label>
                                        <input type="text" className="form-control" placeholder="Enter asset name" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Category</label>
                                        <select className="form-select">
                                            <option>Select Category</option>
                                            <option>IT Equipment</option>
                                            <option>Office Furniture</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Serial Number</label>
                                        <input type="text" className="form-control" placeholder="Enter serial number" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Save Asset</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEdit && selectedAsset && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Asset</h5>
                                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Asset Name</label>
                                        <input type="text" className="form-control" defaultValue={selectedAsset.name} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Category</label>
                                        <select className="form-select" defaultValue={selectedAsset.category}>
                                            <option>IT Equipment</option>
                                            <option>Office Furniture</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Status</label>
                                        <select className="form-select" defaultValue={selectedAsset.status}>
                                            <option>Assigned</option>
                                            <option>Available</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Update Asset</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDelete && selectedAsset && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Delete Asset</h5>
                                <button className="btn-close" onClick={() => setShowDelete(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete <strong>{selectedAsset.name}</strong>?</p>
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

const Assets = () => {
    return (
        <DashboardLayout title="">
            <AssetsContent />
        </DashboardLayout>
    );
};

export default Assets;

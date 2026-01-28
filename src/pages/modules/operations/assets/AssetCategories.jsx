import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";

export const AssetCategoriesContent = () => {
    // Mock Data
    const [categories] = useState([
        { id: 1, name: 'IT Equipment', description: 'Computers, laptops, servers', created: '27/09/2025' },
        { id: 2, name: 'Office Furniture', description: 'Desks, chairs, tables', created: '27/09/2025' },
        { id: 3, name: 'Software Licenses', description: 'Licenses and subscriptions', created: '27/09/2025' },
    ]);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Handlers
    const handleEdit = (cat) => {
        setSelectedCategory(cat);
        setShowEdit(true);
    };

    const handleDelete = (cat) => {
        setSelectedCategory(cat);
        setShowDelete(true);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Asset Category Management</h5>
                    <p className="text-secondary small mb-0">Manage asset categories</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={() => setShowAdd(true)}>
                    + Add Asset Category
                </button>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Description</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td><span className="fw-bold text-dark">{cat.name}</span></td>
                                    <td>{cat.description}</td>
                                    <td>{cat.created}</td>
                                    <td>
                                        <button className="action-btn edit" onClick={() => handleEdit(cat)}><FaEdit /></button>
                                        <button className="action-btn delete" onClick={() => handleDelete(cat)}><FaTrash /></button>
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
                                <h5 className="modal-title">Add Category</h5>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Category Name</label>
                                        <input type="text" className="form-control" placeholder="Enter category name" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Description</label>
                                        <textarea className="form-control" rows="2" placeholder="Enter description"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Save Category</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEdit && selectedCategory && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Category</h5>
                                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Category Name</label>
                                        <input type="text" className="form-control" defaultValue={selectedCategory.name} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Description</label>
                                        <textarea className="form-control" rows="2" defaultValue={selectedCategory.description}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Close</button>
                                <button className="btn btn-primary btn-sm">Update Category</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDelete && selectedCategory && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Delete Category</h5>
                                <button className="btn-close" onClick={() => setShowDelete(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete <strong>{selectedCategory.name}</strong>?</p>
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

const AssetCategories = () => {
    return (
        <DashboardLayout title="">
            <AssetCategoriesContent />
        </DashboardLayout>
    );
};

export default AssetCategories;

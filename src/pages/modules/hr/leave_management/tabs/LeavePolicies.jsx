import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const LeavePolicies = () => {
    const [policies, setPolicies] = useState([
        {
            id: 1,
            name: 'Sick Leave',
            days: 12,
            carryForward: true,
            maxCarryForward: 5,
            description: 'For medical emergencies and health issues'
        },
        {
            id: 2,
            name: 'Casual Leave',
            days: 10,
            carryForward: false,
            maxCarryForward: 0,
            description: 'For personal matters and short breaks'
        },
        {
            id: 3,
            name: 'Privilege Leave',
            days: 15,
            carryForward: true,
            maxCarryForward: 10,
            description: 'Earned leave for long service'
        },
        {
            id: 4,
            name: 'Maternity Leave',
            days: 180,
            carryForward: false,
            maxCarryForward: 0,
            description: 'For expecting mothers'
        },
        {
            id: 5,
            name: 'Paternity Leave',
            days: 15,
            carryForward: false,
            maxCarryForward: 0,
            description: 'For new fathers'
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingPolicy, setEditingPolicy] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        days: '',
        carryForward: false,
        maxCarryForward: 0,
        description: ''
    });

    const handleAdd = () => {
        setFormData({
            name: '',
            days: '',
            carryForward: false,
            maxCarryForward: 0,
            description: ''
        });
        setEditingPolicy(null);
        setShowModal(true);
    };

    const handleEdit = (policy) => {
        setFormData(policy);
        setEditingPolicy(policy.id);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this leave policy?')) {
            setPolicies(policies.filter(p => p.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPolicy) {
            setPolicies(policies.map(p => p.id === editingPolicy ? { ...formData, id: editingPolicy } : p));
        } else {
            setPolicies([...policies, { ...formData, id: Date.now() }]);
        }
        setShowModal(false);
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Leave Policies</h5>
                    <p className="text-muted small mb-0">Manage leave types and their configurations</p>
                </div>
                <button className="btn btn-primary rounded-pill px-4 shadow-sm" onClick={handleAdd}>
                    <FaPlus className="me-2" />
                    Add Policy
                </button>
            </div>

            {/* Policies Grid */}
            <div className="row g-4">
                {policies.map(policy => (
                    <div key={policy.id} className="col-md-6 col-lg-4">
                        <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">{policy.name}</h6>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-light rounded-circle"
                                            onClick={() => handleEdit(policy)}
                                            title="Edit"
                                        >
                                            <FaEdit className="text-primary" />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-light rounded-circle"
                                            onClick={() => handleDelete(policy.id)}
                                            title="Delete"
                                        >
                                            <FaTrash className="text-danger" />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-muted small mb-3">{policy.description}</p>

                                <div className="border-top pt-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="small text-secondary">Carry Forward</span>
                                        <span className={`badge ${policy.carryForward ? 'bg-success' : 'bg-secondary'} bg-opacity-10 ${policy.carryForward ? 'text-success' : 'text-secondary'}`}>
                                            {policy.carryForward ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </div>
                                    {policy.carryForward && (
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="small text-secondary">Max Carry Forward</span>
                                            <span className="fw-bold text-dark">{policy.maxCarryForward} days</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">
                                    {editingPolicy ? 'Edit Leave Policy' : 'Add New Leave Policy'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label small text-muted fw-bold">Policy Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g., Sick Leave"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small text-muted fw-bold">Days Per Year</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.days}
                                            onChange={e => setFormData({ ...formData, days: parseInt(e.target.value) })}
                                            placeholder="e.g., 12"
                                            min="1"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small text-muted fw-bold">Description</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Brief description of this leave policy"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="carryForward"
                                                checked={formData.carryForward}
                                                onChange={e => setFormData({ ...formData, carryForward: e.target.checked, maxCarryForward: e.target.checked ? formData.maxCarryForward : 0 })}
                                            />
                                            <label className="form-check-label small text-muted fw-bold" htmlFor="carryForward">
                                                Allow Carry Forward
                                            </label>
                                        </div>
                                    </div>

                                    {formData.carryForward && (
                                        <div className="mb-3">
                                            <label className="form-label small text-muted fw-bold">Max Carry Forward Days</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.maxCarryForward}
                                                onChange={e => setFormData({ ...formData, maxCarryForward: parseInt(e.target.value) })}
                                                placeholder="e.g., 5"
                                                min="0"
                                                max={formData.days}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer border-0">
                                    <button
                                        type="button"
                                        className="btn btn-light rounded-pill px-4"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <FaTimes className="me-2" />
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary rounded-pill px-4">
                                        <FaSave className="me-2" />
                                        Save Policy
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeavePolicies;

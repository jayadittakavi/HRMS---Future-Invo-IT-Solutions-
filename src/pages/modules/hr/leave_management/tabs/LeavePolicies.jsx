import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaSave, FaTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { leaveService } from '../../../../../services/leaveService';

const LeavePolicies = () => {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPolicy, setEditingPolicy] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        days: '',
        carryForward: false,
        maxCarryForward: 0,
        description: ''
    });

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            setLoading(true);
            const data = await leaveService.getUiPolicies();
            if (Array.isArray(data)) {
                setPolicies(data);
            }
        } catch (error) {
            console.error("Error fetching policies:", error);
        } finally {
            setLoading(false);
        }
    };

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

    const handleToggleStatus = async (policy) => {
        const action = policy.status === 'Inactive' ? 'activate' : 'deactivate';
        if (window.confirm(`Are you sure you want to ${action} this leave policy?`)) {
            try {
                const updatedPolicy = { ...policy, status: policy.status === 'Inactive' ? 'Active' : 'Inactive' };
                await leaveService.updateUiPolicy(policy.id, updatedPolicy);
                fetchPolicies();
            } catch (error) {
                console.error("Error updating policy status:", error);
                alert("Failed to update policy status");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPolicy) {
                await leaveService.updateUiPolicy(editingPolicy, formData);
            } else {
                await leaveService.createUiPolicy(formData);
            }
            setShowModal(false);
            fetchPolicies();
        } catch (error) {
            console.error("Error saving policy:", error);
            alert("Failed to save policy");
        }
    };

    if (loading) return <div className="p-4 text-center">Loading policies...</div>;

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
                                            onClick={() => handleToggleStatus(policy)}
                                            title={policy.status === 'Inactive' ? "Activate" : "Deactivate"}
                                        >
                                            {policy.status === 'Inactive' ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}
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

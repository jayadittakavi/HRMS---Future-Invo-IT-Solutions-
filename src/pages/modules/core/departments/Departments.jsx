import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";

export const DepartmentsContent = () => {
    // Mock Data
    const initialDepartments = [
        { id: 1, name: 'Administration', head: 'Praveen Kumar', location: 'Bangalore', employees: 12, status: 'Active' },
        { id: 2, name: 'HR', head: 'Priyanka Sharma', location: 'Bangalore', employees: 5, status: 'Active' },
        { id: 3, name: 'Engineering', head: 'Rajesh Gupta', location: 'Hyderabad', employees: 40, status: 'Active' },
        { id: 4, name: 'Sales', head: 'Vikram Singh', location: 'Pune', employees: 25, status: 'Exited' },
        { id: 5, name: 'Marketing', head: 'Ananya Roy', location: 'Mumbai', employees: 15, status: 'Active' },
    ];

    const [departments, setDepartments] = useState(initialDepartments);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedDept, setSelectedDept] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        head: '',
        location: '',
        employees: '', // Usually calculated, but editable for mock
        status: 'Active'
    });

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddClick = () => {
        setFormData({ name: '', head: '', location: '', employees: '', status: 'Active' });
        setShowAdd(true);
    };

    const handleEditClick = (dept) => {
        setSelectedDept(dept);
        setFormData(dept);
        setShowEdit(true);
    };

    const handleSaveDept = () => {
        if (!formData.name) return;
        const newDept = {
            id: departments.length + 1,
            ...formData,
            employees: Number(formData.employees) || 0
        };
        setDepartments([...departments, newDept]);
        setShowAdd(false);
    };

    const handleUpdateDept = () => {
        if (!selectedDept) return;
        const updatedList = departments.map(d =>
            d.id === selectedDept.id ? { ...formData, id: selectedDept.id } : d
        );
        setDepartments(updatedList);
        setShowEdit(false);
    };

    const toggleStatus = (id) => {
        const updatedList = departments.map(d => {
            if (d.id === id) {
                return { ...d, status: d.status === 'Active' ? 'Inactive' : 'Active' };
            }
            return d;
        });
        setDepartments(updatedList);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Department Management</h5>
                    <p className="text-secondary small mb-0">Manage company departments</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={handleAddClick}>
                    + Add Department
                </button>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table align-middle">
                        <thead>
                            <tr>
                                <th>Department Name</th>
                                <th>Department Head</th>
                                <th>Location</th>
                                <th>Employees</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((dept) => (
                                <tr key={dept.id} className={dept.status === 'Inactive' ? 'opacity-50' : ''}>
                                    <td>
                                        <span className="fw-bold text-dark">{dept.name}</span>
                                    </td>
                                    <td>{dept.head}</td>
                                    <td>{dept.location}</td>
                                    <td>{dept.employees}</td>
                                    <td>
                                        <span className={`badge ${dept.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {dept.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button className="action-btn edit" onClick={() => handleEditClick(dept)}>
                                                <FaEdit />
                                            </button>
                                            <button
                                                className={`action-btn ${dept.status === 'Active' ? 'delete' : 'edit'}`}
                                                onClick={() => toggleStatus(dept.id)}
                                                title={dept.status === 'Active' ? "Deactivate" : "Activate"}
                                            >
                                                {dept.status === 'Active' ? <FaTrash /> : <FaCheckCircle className="text-success" />}
                                                {/* Note: Using FaTrash for deactivate to match user request "all access", usually FaBan, but sticking to existing icon or user preference */}
                                            </button>
                                        </div>
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
                                <h5 className="modal-title">Add Department</h5>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Department Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Engineering"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Department Head</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="head"
                                            value={formData.head}
                                            onChange={handleInputChange}
                                            placeholder="e.g. John Doe"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Bangalore"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Employee Count (Mock)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="employees"
                                            value={formData.employees}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Cancel</button>
                                <button className="btn btn-primary btn-sm" onClick={handleSaveDept}>Create Department</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEdit && selectedDept && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Department</h5>
                                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Department Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Department Head</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="head"
                                            value={formData.head}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Status</label>
                                        <select
                                            className="form-select"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Cancel</button>
                                <button className="btn btn-primary btn-sm" onClick={handleUpdateDept}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const Departments = () => {
    return (
        <DashboardLayout title="">
            <DepartmentsContent />
        </DashboardLayout>
    );
};

export default Departments;

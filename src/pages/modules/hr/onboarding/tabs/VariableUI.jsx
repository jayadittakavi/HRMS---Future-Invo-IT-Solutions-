import React, { useState } from 'react';
import { FaCode, FaPlus, FaEdit, FaTrash, FaCopy, FaCheck } from 'react-icons/fa';

const VariableUI = () => {
    const [variables, setVariables] = useState([
        {
            id: 1,
            name: 'employee_name',
            displayName: 'Employee Name',
            dataType: 'String',
            defaultValue: 'John Doe',
            description: 'Full name of the employee',
            category: 'Employee Info',
            usageCount: 156
        },
        {
            id: 2,
            name: 'employee_id',
            displayName: 'Employee ID',
            dataType: 'String',
            defaultValue: 'EMP001',
            description: 'Unique employee identifier',
            category: 'Employee Info',
            usageCount: 142
        },
        {
            id: 3,
            name: 'joining_date',
            displayName: 'Joining Date',
            dataType: 'Date',
            defaultValue: '2026-01-01',
            description: 'Employee joining date',
            category: 'Employment',
            usageCount: 98
        },
        {
            id: 4,
            name: 'designation',
            displayName: 'Designation',
            dataType: 'String',
            defaultValue: 'Software Engineer',
            description: 'Job title or designation',
            category: 'Employment',
            usageCount: 134
        },
        {
            id: 5,
            name: 'salary',
            displayName: 'Salary',
            dataType: 'Number',
            defaultValue: '50000',
            description: 'Monthly salary amount',
            category: 'Compensation',
            usageCount: 87
        },
        {
            id: 6,
            name: 'company_name',
            displayName: 'Company Name',
            dataType: 'String',
            defaultValue: 'Future Invo IT Solutions',
            description: 'Organization name',
            category: 'Company Info',
            usageCount: 203
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingVariable, setEditingVariable] = useState(null);
    const [copiedId, setCopiedId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        displayName: '',
        dataType: 'String',
        defaultValue: '',
        description: '',
        category: 'Employee Info'
    });

    const handleAdd = () => {
        setFormData({
            name: '',
            displayName: '',
            dataType: 'String',
            defaultValue: '',
            description: '',
            category: 'Employee Info'
        });
        setEditingVariable(null);
        setShowModal(true);
    };

    const handleEdit = (variable) => {
        setFormData(variable);
        setEditingVariable(variable.id);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this variable?')) {
            setVariables(variables.filter(v => v.id !== id));
        }
    };

    const handleCopy = (variableName) => {
        navigator.clipboard.writeText(`{{${variableName}}}`);
        setCopiedId(variableName);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingVariable) {
            setVariables(variables.map(v => v.id === editingVariable ? { ...formData, id: editingVariable } : v));
        } else {
            setVariables([...variables, {
                ...formData,
                id: Date.now(),
                usageCount: 0
            }]);
        }
        setShowModal(false);
    };

    const categories = [...new Set(variables.map(v => v.category))];

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Template Variables</h5>
                    <p className="text-muted small mb-0">Manage dynamic variables for letter templates</p>
                </div>
                <button className="btn btn-success rounded-pill px-4 shadow-sm" onClick={handleAdd}>
                    <FaPlus className="me-2" />
                    Add Variable
                </button>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-success bg-opacity-10 text-success rounded-circle p-3 me-3">
                                    <FaCode size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Total Variables</h6>
                                    <h3 className="fw-bold mb-0">{variables.length}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                                    <FaCode size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Categories</h6>
                                    <h3 className="fw-bold mb-0">{categories.length}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-info bg-opacity-10 text-info rounded-circle p-3 me-3">
                                    <FaCopy size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Total Usage</h6>
                                    <h3 className="fw-bold mb-0">{variables.reduce((sum, v) => sum + v.usageCount, 0)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-warning bg-opacity-10 text-warning rounded-circle p-3 me-3">
                                    <FaCode size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Most Used</h6>
                                    <h3 className="fw-bold mb-0" style={{ fontSize: '1rem' }}>
                                        {variables.reduce((max, v) => v.usageCount > max.usageCount ? v : max, variables[0])?.displayName}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Variables Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Variable Name</th>
                                    <th className="border-0 py-3">Display Name</th>
                                    <th className="border-0 py-3">Data Type</th>
                                    <th className="border-0 py-3">Default Value</th>
                                    <th className="border-0 py-3">Category</th>
                                    <th className="border-0 py-3">Usage</th>
                                    <th className="border-0 py-3">Description</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {variables.map(variable => (
                                    <tr key={variable.id}>
                                        <td className="px-4">
                                            <div className="d-flex align-items-center gap-2">
                                                <code className="bg-light px-2 py-1 rounded text-success fw-bold" style={{ fontSize: '0.85rem' }}>
                                                    {`{{${variable.name}}}`}
                                                </code>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary rounded-circle p-1"
                                                    style={{ width: '24px', height: '24px' }}
                                                    onClick={() => handleCopy(variable.name)}
                                                    title="Copy variable"
                                                >
                                                    {copiedId === variable.name ? (
                                                        <FaCheck size={10} className="text-success" />
                                                    ) : (
                                                        <FaCopy size={10} />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="fw-bold text-dark">{variable.displayName}</td>
                                        <td>
                                            <span className={`badge ${variable.dataType === 'String' ? 'bg-primary' :
                                                    variable.dataType === 'Number' ? 'bg-success' :
                                                        variable.dataType === 'Date' ? 'bg-info' :
                                                            'bg-secondary'
                                                } bg-opacity-10 text-${variable.dataType === 'String' ? 'primary' :
                                                    variable.dataType === 'Number' ? 'success' :
                                                        variable.dataType === 'Date' ? 'info' :
                                                            'secondary'
                                                }`}>
                                                {variable.dataType}
                                            </span>
                                        </td>
                                        <td className="text-secondary small">
                                            <code className="bg-light px-2 py-1 rounded">{variable.defaultValue}</code>
                                        </td>
                                        <td>
                                            <span className="badge bg-warning bg-opacity-10 text-warning">
                                                {variable.category}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                {variable.usageCount} times
                                            </span>
                                        </td>
                                        <td className="text-secondary small" style={{ maxWidth: '200px' }}>
                                            {variable.description}
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-primary rounded-circle"
                                                    onClick={() => handleEdit(variable)}
                                                    title="Edit"
                                                >
                                                    <FaEdit size={12} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger rounded-circle"
                                                    onClick={() => handleDelete(variable.id)}
                                                    title="Delete"
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Variable Usage Guide */}
            <div className="card border-0 shadow-sm mt-4">
                <div className="card-body">
                    <h6 className="fw-bold mb-3">How to Use Variables</h6>
                    <div className="bg-light p-3 rounded">
                        <p className="small mb-2">To use a variable in your template, simply copy the variable code and paste it in your template content:</p>
                        <code className="d-block bg-white p-2 rounded mb-2">
                            Dear {`{{employee_name}}`}, <br />
                            Your Employee ID is {`{{employee_id}}`}. <br />
                            You will be joining us on {`{{joining_date}}`} as {`{{designation}}`}.
                        </code>
                        <p className="small text-muted mb-0">Variables will be automatically replaced with actual values when generating letters.</p>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">
                                    {editingVariable ? 'Edit Variable' : 'Add New Variable'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Variable Name (Code)</label>
                                            <input
                                                type="text"
                                                className="form-control font-monospace"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                                                placeholder="e.g., employee_name"
                                                required
                                            />
                                            <small className="text-muted">Use lowercase with underscores</small>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Display Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.displayName}
                                                onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                                                placeholder="e.g., Employee Name"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Data Type</label>
                                            <select
                                                className="form-select"
                                                value={formData.dataType}
                                                onChange={e => setFormData({ ...formData, dataType: e.target.value })}
                                            >
                                                <option value="String">String</option>
                                                <option value="Number">Number</option>
                                                <option value="Date">Date</option>
                                                <option value="Boolean">Boolean</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Category</label>
                                            <select
                                                className="form-select"
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="Employee Info">Employee Info</option>
                                                <option value="Employment">Employment</option>
                                                <option value="Compensation">Compensation</option>
                                                <option value="Company Info">Company Info</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small text-muted fw-bold">Default Value</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.defaultValue}
                                                onChange={e => setFormData({ ...formData, defaultValue: e.target.value })}
                                                placeholder="e.g., John Doe"
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small text-muted fw-bold">Description</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={formData.description}
                                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Brief description of this variable"
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button
                                        type="button"
                                        className="btn btn-light rounded-pill px-4"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-success rounded-pill px-4">
                                        {editingVariable ? 'Update Variable' : 'Add Variable'}
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

export default VariableUI;

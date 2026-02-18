import React, { useState } from 'react';
import { FaFileAlt, FaEdit, FaTrash, FaPlus, FaGlobe, FaBlog, FaEye, FaCopy } from 'react-icons/fa';

const TemplateUI = () => {
    const [templates, setTemplates] = useState([
        {
            id: 1,
            name: 'Offer Letter Template',
            category: 'Recruitment',
            lastModified: '2026-02-15',
            status: 'Active',
            usageCount: 45,
            websiteResource: 'https://example.com/offer-template',
            blogPost: 'How to write effective offer letters'
        },
        {
            id: 2,
            name: 'Appointment Letter Template',
            category: 'Onboarding',
            lastModified: '2026-02-10',
            status: 'Active',
            usageCount: 32,
            websiteResource: 'https://example.com/appointment-template',
            blogPost: 'Best practices for appointment letters'
        },
        {
            id: 3,
            name: 'Relieving Letter Template',
            category: 'Exit',
            lastModified: '2026-02-08',
            status: 'Draft',
            usageCount: 12,
            websiteResource: 'https://example.com/relieving-template',
            blogPost: 'Creating professional relieving letters'
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Recruitment',
        websiteResource: '',
        blogPost: '',
        content: ''
    });

    const handleAdd = () => {
        setFormData({
            name: '',
            category: 'Recruitment',
            websiteResource: '',
            blogPost: '',
            content: ''
        });
        setEditingTemplate(null);
        setShowModal(true);
    };

    const handleEdit = (template) => {
        setFormData(template);
        setEditingTemplate(template.id);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this template?')) {
            setTemplates(templates.filter(t => t.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTemplate) {
            setTemplates(templates.map(t => t.id === editingTemplate ? { ...formData, id: editingTemplate } : t));
        } else {
            setTemplates([...templates, {
                ...formData,
                id: Date.now(),
                lastModified: new Date().toISOString().split('T')[0],
                status: 'Active',
                usageCount: 0
            }]);
        }
        setShowModal(false);
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Letter Templates</h5>
                    <p className="text-muted small mb-0">Manage letter templates with website resources and blog links</p>
                </div>
                <button className="btn btn-primary rounded-pill px-4 shadow-sm" onClick={handleAdd}>
                    <FaPlus className="me-2" />
                    Add Template
                </button>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3">
                                    <FaFileAlt size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Total Templates</h6>
                                    <h3 className="fw-bold mb-0">{templates.length}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-success bg-opacity-10 text-success rounded-circle p-3 me-3">
                                    <FaGlobe size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Active Templates</h6>
                                    <h3 className="fw-bold mb-0">{templates.filter(t => t.status === 'Active').length}</h3>
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
                                    <FaBlog size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">With Blog Posts</h6>
                                    <h3 className="fw-bold mb-0">{templates.filter(t => t.blogPost).length}</h3>
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
                                    <FaCopy size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Total Usage</h6>
                                    <h3 className="fw-bold mb-0">{templates.reduce((sum, t) => sum + t.usageCount, 0)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Templates Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Template Name</th>
                                    <th className="border-0 py-3">Category</th>
                                    <th className="border-0 py-3">Last Modified</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Usage Count</th>
                                    <th className="border-0 py-3">Website Resource</th>
                                    <th className="border-0 py-3">Blog</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {templates.map(template => (
                                    <tr key={template.id}>
                                        <td className="px-4">
                                            <div className="d-flex align-items-center">
                                                <div className="icon-box bg-primary bg-opacity-10 text-primary rounded p-2 me-2">
                                                    <FaFileAlt size={16} />
                                                </div>
                                                <span className="fw-bold text-dark">{template.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                {template.category}
                                            </span>
                                        </td>
                                        <td className="text-secondary small">{template.lastModified}</td>
                                        <td>
                                            <span className={`badge ${template.status === 'Active' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                {template.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge bg-primary bg-opacity-10 text-primary">
                                                {template.usageCount} times
                                            </span>
                                        </td>
                                        <td>
                                            {template.websiteResource && (
                                                <a
                                                    href={template.websiteResource}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-sm btn-outline-primary rounded-pill px-3"
                                                >
                                                    <FaGlobe className="me-1" />
                                                    View Resource
                                                </a>
                                            )}
                                        </td>
                                        <td>
                                            {template.blogPost && (
                                                <button className="btn btn-sm btn-outline-info rounded-pill px-3" title={template.blogPost}>
                                                    <FaBlog className="me-1" />
                                                    Blog
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary rounded-circle"
                                                    title="Preview"
                                                >
                                                    <FaEye size={12} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-primary rounded-circle"
                                                    onClick={() => handleEdit(template)}
                                                    title="Edit"
                                                >
                                                    <FaEdit size={12} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger rounded-circle"
                                                    onClick={() => handleDelete(template.id)}
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

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">
                                    {editingTemplate ? 'Edit Template' : 'Add New Template'}
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
                                            <label className="form-label small text-muted fw-bold">Template Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g., Offer Letter Template"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Category</label>
                                            <select
                                                className="form-select"
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="Recruitment">Recruitment</option>
                                                <option value="Onboarding">Onboarding</option>
                                                <option value="Performance">Performance</option>
                                                <option value="Exit">Exit</option>
                                                <option value="General">General</option>
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small text-muted fw-bold">
                                                <FaGlobe className="me-1" />
                                                Website Resource URL
                                            </label>
                                            <input
                                                type="url"
                                                className="form-control"
                                                value={formData.websiteResource}
                                                onChange={e => setFormData({ ...formData, websiteResource: e.target.value })}
                                                placeholder="https://example.com/template-resource"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small text-muted fw-bold">
                                                <FaBlog className="me-1" />
                                                Blog Post Title/Link
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.blogPost}
                                                onChange={e => setFormData({ ...formData, blogPost: e.target.value })}
                                                placeholder="e.g., How to write effective offer letters"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small text-muted fw-bold">Template Content</label>
                                            <textarea
                                                className="form-control"
                                                rows="6"
                                                value={formData.content}
                                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                                placeholder="Enter template content here..."
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
                                    <button type="submit" className="btn btn-primary rounded-pill px-4">
                                        {editingTemplate ? 'Update Template' : 'Add Template'}
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

export default TemplateUI;

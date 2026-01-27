import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaBan, FaCheckCircle, FaPlus } from 'react-icons/fa';
import DashboardLayout from '../../components/DashboardLayout';
import '../../components/DashboardLayout.css';

export const CompaniesContent = () => {
    // Initial Mock Data
    const initialCompanies = [
        { id: 1, name: 'TrickuWeb Technologies', email: 'support@trickuweb.com', address: 'Tech Park, Bangalore', status: 'Active', startDate: '2025-01-01', endDate: '2026-01-01' },
        { id: 2, name: 'InnovateSoft Solutions', email: 'support@innovatesoft.com', address: 'IT Hub, Hyderabad', status: 'Active', startDate: '2025-02-15', endDate: '2026-02-15' },
        { id: 3, name: 'NextGen Systems', email: 'info@nextgensys.com', address: 'Tech Valley, Noida', status: 'Inactive', startDate: '2024-06-01', endDate: '2025-06-01' },
        { id: 4, name: 'Alpha Corp', email: 'admin@alphacorp.com', address: 'Business Bay, Mumbai', status: 'Active', startDate: '2024-01-01', endDate: '2025-12-31' },
        { id: 5, name: 'Beta Industries', email: 'hr@betaindustries.com', address: 'Industrial Area, Chennai', status: 'Active', startDate: '2023-05-20', endDate: '2026-05-20' },
        { id: 6, name: 'Gamma Enterprises', email: 'contact@gammaent.com', address: 'Sector 62, Gurgaon', status: 'Inactive', startDate: '2024-03-10', endDate: '2025-03-10' },
        { id: 7, name: 'Delta Solutions', email: 'support@deltasol.com', address: 'Hinjewadi, Pune', status: 'Active', startDate: '2025-07-01', endDate: '2027-07-01' },
        { id: 8, name: 'Epsilon Tech', email: 'info@epsilon.com', address: 'Salt Lake, Kolkata', status: 'Active', startDate: '2025-04-15', endDate: '2026-04-15' },
    ];

    // State
    const [companies, setCompanies] = useState(initialCompanies);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false); // Can be used for "Delete" or "Block" confirmation if needed, but simple toggle is faster
    const [selectedCompany, setSelectedCompany] = useState(null);

    // Form States
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        status: 'Active',
        startDate: '',
        endDate: ''
    });

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddClick = () => {
        setFormData({ name: '', email: '', address: '', status: 'Active', startDate: '', endDate: '' });
        setShowAdd(true);
    };

    const handleEditClick = (company) => {
        setSelectedCompany(company);
        setFormData(company);
        setShowEdit(true);
    };

    const handleSaveCompany = () => {
        if (!formData.name || !formData.email) return; // Basic validation
        const newCompany = {
            ...formData,
            id: companies.length + 1,
            status: 'Active' // Default active on create
        };
        setCompanies([...companies, newCompany]);
        setShowAdd(false);
    };

    const handleUpdateCompany = () => {
        if (!selectedCompany) return;
        const updatedList = companies.map(comp =>
            comp.id === selectedCompany.id ? { ...formData, id: selectedCompany.id } : comp
        );
        setCompanies(updatedList);
        setShowEdit(false);
    };

    const toggleStatus = (id) => {
        const updatedList = companies.map(comp => {
            if (comp.id === id) {
                return { ...comp, status: comp.status === 'Active' ? 'Inactive' : 'Active' };
            }
            return comp;
        });
        setCompanies(updatedList);
    };

    // Calculate subscription status
    const getSubscriptionStatus = (endDate) => {
        if (!endDate) return 'Unknown';
        const today = new Date();
        const end = new Date(endDate);
        return end < today ? 'Expired' : 'Valid';
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Company Management</h5>
                    <p className="text-secondary small mb-0">Create, edit, and manage company subscriptions</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill d-flex align-items-center gap-2" onClick={handleAddClick}>
                    <FaPlus size={12} /> Add Company
                </button>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table align-middle">
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Email</th>
                                <th>Valid From</th>
                                <th>Valid To</th>
                                <th>Platform Access</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company) => {
                                const subStatus = getSubscriptionStatus(company.endDate);
                                const isExpired = subStatus === 'Expired';

                                return (
                                    <tr key={company.id} className={company.status === 'Inactive' ? 'opacity-50' : ''}>
                                        <td>
                                            <div className="d-flex flex-column">
                                                <span className="fw-bold text-dark">{company.name}</span>
                                                <span className="small text-muted">{company.address}</span>
                                            </div>
                                        </td>
                                        <td>{company.email}</td>
                                        <td>{company.startDate || '-'}</td>
                                        <td>
                                            <span className={isExpired ? 'text-danger fw-bold' : ''}>
                                                {company.endDate || '-'}
                                            </span>
                                            {isExpired && <span className="badge bg-danger ms-2" style={{ fontSize: '0.65rem' }}>Expired</span>}
                                        </td>
                                        <td>
                                            <span className={`badge ${company.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                                {company.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button className="action-btn edit" title="Edit" onClick={() => handleEditClick(company)}>
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className={`action-btn ${company.status === 'Active' ? 'delete' : 'edit'}`}
                                                    title={company.status === 'Active' ? "Block Access" : "Activate Access"}
                                                    onClick={() => toggleStatus(company.id)}
                                                >
                                                    {company.status === 'Active' ? <FaBan /> : <FaCheckCircle className="text-success" />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
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
                                <h5 className="modal-title">Create New Company</h5>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Company Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Acme Corp"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Support Email <span className="text-danger">*</span></label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="admin@acme.com"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Subscription Start</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Subscription End</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="endDate"
                                                value={formData.endDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Address</label>
                                        <textarea
                                            className="form-control"
                                            rows="2"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Registered office address"
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Cancel</button>
                                <button className="btn btn-primary btn-sm" onClick={handleSaveCompany}>Create Company</button>
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
                                <h5 className="modal-title">Edit Company Details</h5>
                                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Company Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Support Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Subscription Start</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Subscription End</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="endDate"
                                                value={formData.endDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
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
                                            <option value="Inactive">Inactive (Blocked)</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Address</label>
                                        <textarea
                                            className="form-control"
                                            rows="2"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Cancel</button>
                                <button className="btn btn-primary btn-sm" onClick={handleUpdateCompany}>Save Changes</button>
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

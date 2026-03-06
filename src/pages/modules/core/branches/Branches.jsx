import React, { useState } from 'react';
import { FaEdit, FaTrash, FaBan, FaCheckCircle, FaSearch } from 'react-icons/fa';
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import { useSearch } from "../../../../context/SearchContext";
import "../../../../components/layout/DashboardLayout.css";
import BranchMap from "../../../../components/BranchMap";

export const BranchesContent = () => {
    const [branches, setBranches] = useState([]);
    const [companiesList, setCompaniesList] = useState([]);
    const [reload, setReload] = useState(false);
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);

    React.useEffect(() => {
        setSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);

    const SUPERADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzI3ODU3NzB9.v_BgdU5Xi4p6imxFD75VeEj33b5sx4curQSxbFGXknA";
    const API_BASE = "/api/superadmin";

    React.useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await fetch(`${API_BASE}/branches`, {
                    headers: { 'Authorization': `Bearer ${SUPERADMIN_TOKEN}` }
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.success && result.data) {
                        const cleanText = (val) => (val || '').replace(/^string:/, '').replace(/\s*,\s*/g, ', ').trim();
                        const mappedData = result.data.map(b => ({
                            id: b.id,
                            company_id: b.company_id || null,
                            name: cleanText(b.branch_name),
                            company: cleanText(b.company_name),
                            address: cleanText(b.address),
                            state: cleanText(b.state),
                            location: b.latitude && b.longitude ? `${b.latitude}, ${b.longitude}` : '',
                            lat: b.latitude,
                            lng: b.longitude,
                            status: b.status || 'Active'
                        }));
                        setBranches(mappedData);
                    }
                }
            } catch (error) {
                console.error("Error fetching branches:", error);
            }
        };

        const fetchCompanies = async () => {
            try {
                const response = await fetch(`${API_BASE}/companies`, {
                    headers: { 'Authorization': `Bearer ${SUPERADMIN_TOKEN}` }
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.success && result.data) {
                        setCompaniesList(result.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchBranches();
        fetchCompanies();
    }, [reload]);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        address: '',
        location: '',
        status: 'Active'
    });

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddClick = () => {
        setFormData({ name: '', company: '', address: '', location: '', status: 'Active' });
        setShowAdd(true);
    };

    const handleEdit = (branch) => {
        setSelectedBranch(branch);
        setFormData({
            ...branch,
            company: branch.company_id || ''
        });
        setShowEdit(true);
    };

    const handleSaveBranch = async () => {
        if (!formData.name || !formData.company) return; // Need both for API

        let lat = null, lng = null;
        if (formData.location) {
            const parts = formData.location.split(',');
            if (parts.length === 2) {
                lat = parts[0].trim();
                lng = parts[1].trim();
            }
        }

        try {
            const response = await fetch(`${API_BASE}/branches`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${SUPERADMIN_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    company_id: formData.company, // Storing ID in formData.company from select
                    branch_name: formData.name,
                    address: formData.address,
                    latitude: lat,
                    longitude: lng,
                    status: formData.status
                })
            });

            if (response.ok) {
                setReload(!reload); // Refetch
                setShowAdd(false);
            } else {
                console.error("Failed to save branch");
            }
        } catch (error) {
            console.error("Error saving branch:", error);
        }
    };

    const handleUpdateBranch = async () => {
        if (!selectedBranch) return;

        let lat = null, lng = null;
        if (formData.location) {
            const parts = formData.location.split(',');
            if (parts.length === 2) {
                lat = parts[0].trim();
                lng = parts[1].trim();
            }
        }

        try {
            const response = await fetch(`${API_BASE}/branches/${selectedBranch.id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${SUPERADMIN_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    branch_name: formData.name,
                    address: formData.address,
                    latitude: lat,
                    longitude: lng,
                    status: formData.status
                })
            });

            if (response.ok) {
                setReload(!reload);
                setShowEdit(false);
            }
        } catch (error) {
            console.error("Error updating branch:", error);
        }
    };

    const toggleStatus = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/branches/${id}/toggle-status`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${SUPERADMIN_TOKEN}`,
                }
            });

            if (response.ok) {
                setReload(!reload); // Refetch list
            }
        } catch (error) {
            console.error("Error toggling branch status:", error);
        }
    };

    const filteredBranches = branches.filter(branch => {
        const query = searchTerm.toLowerCase();
        return (
            (branch.name || '').toLowerCase().includes(query) ||
            (branch.company || '').toLowerCase().includes(query) ||
            (branch.address || '').toLowerCase().includes(query) ||
            (branch.state || '').toLowerCase().includes(query)
        );
    });

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Branch Management</h5>
                    <p className="text-secondary small mb-0">Manage company branches</p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <div className="position-relative">
                        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                        <input
                            type="text"
                            placeholder="Search branches..."
                            className="form-control form-control-sm rounded-pill ps-5"
                            style={{ width: '250px' }}
                            value={searchTerm}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSearchTerm(val);
                                setGlobalSearchTerm(val);
                            }}
                        />
                    </div>
                    <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={handleAddClick}>
                        + Add Branch
                    </button>
                </div>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Branch Name</th>
                                <th>Company</th>
                                <th>Address</th>
                                <th>State</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBranches.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-4 text-muted">No branches found.</td></tr>
                            ) : (
                                filteredBranches.map((branch) => (
                                    <tr key={branch.id} className={branch.status === 'Inactive' ? 'opacity-50' : ''}>
                                        <td><span className="fw-bold text-dark">{branch.name}</span></td>
                                        <td>{branch.company}</td>
                                        <td>{branch.address}</td>
                                        <td>{branch.state}</td>
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Map Section */}
            <div className="mt-4">
                <BranchMap branches={filteredBranches} />
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter branch name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Company</label>
                                        <select
                                            className="form-select"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Company</option>
                                            {companiesList.map((comp, idx) => (
                                                <option key={idx} value={comp.id}>{comp.company_name || comp.name}</option>
                                            ))}
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
                                            placeholder="Enter address"
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Location (Lat, Lng)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 12.9716, 77.5946"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Close</button>
                                <button className="btn btn-primary btn-sm" onClick={handleSaveBranch}>Save Branch</button>
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Company</label>
                                        <select
                                            className="form-select"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Company</option>
                                            {companiesList.map((comp, idx) => (
                                                <option key={idx} value={comp.id}>{comp.company_name || comp.name}</option>
                                            ))}
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
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Close</button>
                                <button className="btn btn-primary btn-sm" onClick={handleUpdateBranch}>Update Branch</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
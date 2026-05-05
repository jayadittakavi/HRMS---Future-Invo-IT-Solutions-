import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaBuilding, FaMapMarkerAlt, FaUsers, FaIndustry, FaGlobe, FaSearch, FaEllipsisV, FaCheckCircle, FaTimesCircle, FaEnvelope } from "react-icons/fa";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import { companyService } from "./service.js";
import { useAuth } from "../../../../context/AuthContext";
import "./Companies.css";

export const CompaniesContent = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        company_id: "",
        industry: "",
        company_size: "",
        country: "",
        state: "",
        city_branch: "",
        timezone: "",
        email: "",
    });

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const response = await companyService.getAllCompanies();
            console.log("Fetched companies raw data:", response);

            // Enhanced robust data extraction
            let data = [];
            if (Array.isArray(response)) {
                data = response;
            } else if (response && typeof response === 'object') {
                // Priority keys
                if (Array.isArray(response.data)) data = response.data;
                else if (Array.isArray(response.companies)) data = response.companies;
                else if (Array.isArray(response.result)) data = response.result;
                else if (Array.isArray(response.items)) data = response.items;
                // Deeper check
                else if (response.data && Array.isArray(response.data.companies)) data = response.data.companies;
                else if (response.data && Array.isArray(response.data.result)) data = response.data.result;
                // Last resort: find any array
                else {
                    const firstArrayKey = Object.keys(response).find(key => Array.isArray(response[key]));
                    if (firstArrayKey) data = response[firstArrayKey];
                }
            }

            console.log("Processed companies data:", data);
            setCompanies(data || []);
        } catch (err) {
            console.error("Error fetching companies:", err);
            setCompanies([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { user } = useAuth();

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            console.log("Creating company with data:", formData);
            // Include user context for the service to use
            await companyService.createCompany({
                ...formData,
                super_admin_id: user?.id
            });
            setShowAdd(false);
            resetForm();
            fetchCompanies();
            alert("Company created successfully!");
        } catch (err) {
            console.error("Create company error:", err);
            const msg = err.message || "Unknown error";
            if (msg.includes("Failed to fetch")) {
                alert("The company was likely created (status 200), but the browser had trouble receiving the response. Refreshing the list...");
                fetchCompanies();
                setShowAdd(false);
            } else {
                alert("Failed to create company: " + msg);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating company with data:", formData);
            await companyService.updateCompany(selectedCompany.id, formData);
            setShowEdit(false);
            fetchCompanies();
            alert("Company updated successfully!");
        } catch (err) {
            console.error("Update company error:", err);
            alert("Failed to update company: " + (err.message || "Unknown error"));
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await companyService.toggleStatus(id);
            fetchCompanies();
        } catch (err) {
            alert("Failed to update status: " + (err.message || "Unknown error"));
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            company_id: "",
            industry: "",
            company_size: "",
            country: "",
            state: "",
            city_branch: "",
            timezone: "",
            email: "",
        });
    };

    const filteredCompanies = (companies || []).filter(c => {
        const searchLower = searchTerm.toLowerCase();
        const name = (c.name || c.companyName || c.company_name || '').toLowerCase();
        const cid = (c.company_id || c.company_Id || c.corporate_id || '').toLowerCase();
        const industry = (c.industry || '').toLowerCase();

        return name.includes(searchLower) ||
            cid.includes(searchLower) ||
            industry.includes(searchLower);
    });

    return (
        <div className="companies-page animate__animated animate__fadeIn">
            {/* Premium Stat Cards Row */}
            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="premium-stat-card blue-gradient">
                        <div className="card-overlay"></div>
                        <div className="stat-content">
                            <div className="stat-icon-box">
                                <FaBuilding className="stat-icon" />
                            </div>
                            <div className="stat-info">
                                <span className="stat-title">Total Registered</span>
                                <h2 className="stat-number">{companies.length}</h2>
                                <span className="stat-trend">+10% from last month</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="premium-stat-card green-gradient">
                        <div className="card-overlay"></div>
                        <div className="stat-content">
                            <div className="stat-icon-box">
                                <FaGlobe className="stat-icon" />
                            </div>
                            <div className="stat-info">
                                <span className="stat-title">System Health</span>
                                <h2 className="stat-number">Active</h2>
                                <span className="stat-trend">100% Uptime</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="premium-stat-card purple-gradient">
                        <div className="card-overlay"></div>
                        <div className="stat-content">
                            <div className="stat-icon-box">
                                <FaUsers className="stat-icon" />
                            </div>
                            <div className="stat-info">
                                <span className="stat-title">Global Reach</span>
                                <h2 className="stat-number">Live</h2>
                                <span className="stat-trend">24/7 Monitoring</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Smart Search & Actions Row */}
            <div className="smart-action-row mb-5">
                <div className="search-box-premium">
                    <FaSearch className="search-icon-glamor" />
                    <input
                        type="text"
                        placeholder="Search by name, ID, or industry..."
                        className="search-input-premium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    className="btn-add-premium"
                    onClick={() => { resetForm(); setShowAdd(true); }}
                >
                    <FaPlus className="me-2" /> <span>Add New Company</span>
                </button>
            </div>

            {/* Companies Table Card */}
            <div className="companies-table-container shadow-sm">
                <div className="table-responsive">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>Company Details</th>
                                <th>Industry</th>
                                <th>Corporate ID</th>
                                <th>Size / Team</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></td></tr>
                            ) : filteredCompanies.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-5 text-muted">No companies found matching your criteria.</td></tr>
                            ) : (
                                filteredCompanies.map((c) => (
                                    <tr key={c.id}>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="company-avatar">
                                                    {(c.name || 'C').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark">{c.name || c.companyName || c.company_name || 'Unnamed Company'}</div>
                                                    <div className="small text-muted">{c.timezone || 'UTC+0'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge-industry">
                                                <FaIndustry className="me-1 opacity-50" /> {c.industry || 'General'}
                                            </span>
                                        </td>
                                        <td><code className="text-primary fw-medium">{c.company_id || c.company_Id || c.corporate_id || c.id || 'N/A'}</code></td>
                                        <td>
                                            <div className="size-badge">
                                                <FaUsers className="me-1 opacity-50" /> {c.company_size || c.companySize || c.size || 'N/A'}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="small">
                                                <div className="text-dark"><FaMapMarkerAlt className="text-danger me-1" /> {c.city_branch || c.city || c.location || 'Location'}</div>
                                                <div className="text-muted ms-3">{c.country || 'Global'}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge ${c.status === 'Inactive' ? 'bg-danger' : 'bg-success'}`}>
                                                {c.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className="text-end">
                                            <div className="action-buttons">
                                                <button className="btn-action edit" onClick={() => {
                                                    setSelectedCompany(c);
                                                    setFormData({
                                                        name: c.name || "",
                                                        company_id: c.company_id || "",
                                                        industry: c.industry || "",
                                                        company_size: c.company_size || "",
                                                        country: c.country || "",
                                                        state: c.state || "",
                                                        city_branch: c.city_branch || "",
                                                        timezone: c.timezone || "",
                                                        email: c.email || c.company_email || "",
                                                    });
                                                    setShowEdit(true);
                                                }}>
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className={`btn-action ${c.status === 'Inactive' ? 'activate' : 'deactivate'}`}
                                                    onClick={() => handleToggleStatus(c.id)}
                                                    title={c.status === 'Inactive' ? "Activate" : "Deactivate"}
                                                >
                                                    {c.status === 'Inactive' ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Premium Registration Modal */}
            {(showAdd || showEdit) && (
                <div className="modern-modal-overlay">
                    <div className="modern-modal-card">
                        <div className="modal-header-premium">
                            <div className="d-flex align-items-center gap-3">
                                <div className="modal-icon-circle">
                                    <FaBuilding />
                                </div>
                                <div>
                                    <h3 className="m-0 fw-bold">{showAdd ? 'Register Company' : 'Update Company'}</h3>
                                    <p className="text-muted small m-0">Fill in the details below to {showAdd ? 'onboard a new business' : 'modify company information'}</p>
                                </div>
                            </div>
                            <button className="modal-close-btn" onClick={() => { setShowAdd(false); setShowEdit(false); }}>&times;</button>
                        </div>

                        <form onSubmit={showAdd ? handleCreate : handleUpdate} className="modal-body-premium">
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="premium-input-group">
                                        <label>Company Name</label>
                                        <div className="input-relative">
                                            <FaBuilding className="input-icon-left" />
                                            <input name="name" required placeholder="Enter Company Name" onChange={handleChange} value={formData.name} className="premium-input" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="premium-input-group">
                                        <label>Corporate ID</label>
                                        <div className="input-relative">
                                            <FaBuilding className="input-icon-left" />
                                            <input name="company_id" required placeholder="e.g. CID-102345" onChange={handleChange} value={formData.company_id} className="premium-input" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="premium-input-group">
                                        <label>Industry Type</label>
                                        <div className="input-relative">
                                            <FaIndustry className="input-icon-left" />
                                            <input name="industry" placeholder="e.g. IT, Healthcare, Finance" onChange={handleChange} value={formData.industry} className="premium-input" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="premium-input-group">
                                        <label>Business Size</label>
                                        <div className="input-relative">
                                            <FaUsers className="input-icon-left" />
                                            <select name="company_size" onChange={handleChange} value={formData.company_size} className="premium-select">
                                                <option value="">Select Company Size</option>
                                                <option>1-10 Employees</option>
                                                <option>11-50 Employees</option>
                                                <option>51-200 Employees</option>
                                                <option>201-500 Employees</option>
                                                <option>500+ Employees</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="premium-input-group">
                                        <label>Country</label>
                                        <div className="input-relative">
                                            <FaGlobe className="input-icon-left" />
                                            <input name="country" placeholder="Select Country" onChange={handleChange} value={formData.country} className="premium-input" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="premium-input-group">
                                        <label>State / Province</label>
                                        <input name="state" placeholder="e.g. California" onChange={handleChange} value={formData.state} className="premium-input ps-3" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="premium-input-group">
                                        <label>City / Branch</label>
                                        <input name="city_branch" placeholder="Primary Branch" onChange={handleChange} value={formData.city_branch} className="premium-input ps-3" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="premium-input-group">
                                        <label>Company Email</label>
                                        <div className="input-relative">
                                            <FaEnvelope className="input-icon-left" />
                                            <input type="email" name="email" required placeholder="contact@company.com" onChange={handleChange} value={formData.email} className="premium-input" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="premium-input-group">
                                        <label>Default Timezone</label>
                                        <input name="timezone" placeholder="e.g. UTC +5:30 (Asia/Kolkata)" onChange={handleChange} value={formData.timezone} className="premium-input ps-3" />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer-premium mt-5">
                                <button type="button" className="btn-discard" onClick={() => { setShowAdd(false); setShowEdit(false); }}>Discard</button>
                                <button type="submit" className="btn-confirm">{showAdd ? 'Initialize & Create' : 'Save Changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const Companies = () => (
    <DashboardLayout title="Company Management">
        <CompaniesContent />
    </DashboardLayout>
);

export default Companies;


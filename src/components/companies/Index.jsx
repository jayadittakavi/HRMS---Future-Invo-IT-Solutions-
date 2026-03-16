import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaBuilding, FaMapMarkerAlt, FaUsers, FaIndustry, FaGlobe, FaSearch } from "react-icons/fa";
import DashboardLayout from "../layout/DashboardLayout";
import { useSearch } from "../../context/SearchContext";
import "./Companies.css";

export const CompaniesContent = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);

    // Sync local search with global search
    useEffect(() => {
        setSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);

    const [posts, setPosts] = useState([
        { id: 1, title: "System Maintenance", content: "Our systems will undergo maintenance this Sunday at 2 AM UTC.", date: "Oct 24, 2024" },
        { id: 2, title: "New Policy Update", content: "Please review the updated remote work policy in the documents section.", date: "Oct 22, 2024" }
    ]);

    const [postData, setPostData] = useState({ title: "", content: "" });
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [branches, setBranches] = useState([]); // Added branches state
    const [formData, setFormData] = useState({
        name: "",
        company_id: "",
        industry: "",
        company_size: "",
        country: "",
        state: "",
        city_branch: "",
        timezone: "",
    });

    const tokens = {
        superadmin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJjb21wYW55X2lkIjpudWxsLCJleHAiOjE3NzMyMDk1Mzl9.oUwenpQMpiEZjblb_4f4yN4Olnl9d4918X1TjY-fVU4",
        admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJyb2xlIjoiQURNSU4iLCJjb21wYW55X2lkIjoxLCJleHAiOjE3NzMyMDk1Nzh9.3KPXmEizQSI1qxuRVivDYCy2daOC4GBTBzLM17bdHco",
        hr: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJyb2xlIjoiSFIiLCJjb21wYW55X2lkIjoxLCJleHAiOjE3NzMyMDk3Mzd9.rDhv3BMq4UtQXZe-K5YRcchCRo-aMvnK2e_SHREpyxI"
    };

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token") || localStorage.getItem("authToken") || tokens.superadmin;

        return {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
        };
    };

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            // Using relative path for proxy support and GET for listing
            const response = await fetch(`/api/superadmin/create-company`, {
                method: "GET",
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                if (response.status === 404) {
                    setCompanies([]);
                    return;
                }
                const errorText = await response.text();
                console.error("Fetch companies failed:", errorText);
                throw new Error(errorText || `Server returned ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched companies raw data:", data);

            // Handle multiple possible response structures
            let companiesData = [];
            if (Array.isArray(data)) {
                companiesData = data;
            } else if (data && typeof data === 'object') {
                if (Array.isArray(data.data)) companiesData = data.data;
                else if (Array.isArray(data.companies)) companiesData = data.companies;
                else if (Array.isArray(data.result)) companiesData = data.result;
                else if (Array.isArray(data.items)) companiesData = data.items;
                // Deeper check
                else if (data.data && Array.isArray(data.data.companies)) companiesData = data.data.companies;
                else if (data.data && Array.isArray(data.data.result)) companiesData = data.data.result;
                // Last resort: find any array
                else {
                    const firstArrayKey = Object.keys(data).find(key => Array.isArray(data[key]));
                    if (firstArrayKey) companiesData = data[firstArrayKey];
                }
            }

            console.log("Processed companies data:", companiesData);
            setCompanies(companiesData);
        } catch (err) {
            console.error("Error fetching companies:", err);
            setCompanies([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchBranches = async () => {
        try {
            const token = localStorage.getItem("token") || localStorage.getItem("authToken") || tokens.superadmin;
            let response = await fetch(`/api/superadmin/branches`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                response = await fetch(`/api/superadmin/create-branch`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
            }

            if (response.ok) {
                const data = await response.json();
                let branchData = Array.isArray(data) ? data : (data.data || data.branches || []);
                setBranches(branchData);
            }
        } catch (err) {
            console.error("Error fetching branches:", err);
        }
    };

    useEffect(() => {
        fetchCompanies();
        fetchBranches();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            console.log("Creating company with data:", formData);
            const response = await fetch(`/api/superadmin/create-company`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error("Server error response:", errorData);
                throw new Error(errorData || `Server returned ${response.status}`);
            }

            // Automate Branch Creation when Company is Created
            if (formData.name && formData.city_branch) {
                try {
                    console.log("Automatically creating branch for new company...");
                    const token = localStorage.getItem("token") || localStorage.getItem("authToken") || tokens.superadmin;

                    await fetch('/api/superadmin/branches', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: `${formData.name} - Head Office`,
                            company: formData.name,
                            address: `${formData.city_branch}, ${formData.state || ''}, ${formData.country || ''}`,
                            location: formData.city_branch,
                            status: 'Active'
                        })
                    });
                } catch (branchErr) {
                    console.error("Auto-branch creation failed:", branchErr);
                }
            }

            setShowAdd(false);
            resetForm();
            fetchCompanies();
            alert("Company and Initial Branch created successfully!");
        } catch (err) {
            console.error("Create company error:", err);
            alert("Failed to create company: " + (err.message || "Unknown error"));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating company with data:", formData);
            // Updated to relative path for proxy support
            const response = await fetch(`/api/superadmin/create-company`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({ ...formData, id: selectedCompany.id, action: "update" })
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error("Server error response:", errorData);
                throw new Error(errorData || `Server returned ${response.status}`);
            }

            setShowEdit(false);
            fetchCompanies();
            alert("Company updated successfully!");
        } catch (err) {
            console.error("Update company error:", err);
            alert("Failed to update company: " + (err.message || "Unknown error"));
        }
    };

    const handleDelete = async () => {
        try {
            // Using relative path for proxy support
            const response = await fetch(`/api/superadmin/create-company`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({ id: selectedCompany.id, action: "delete" })
            });

            if (!response.ok) throw new Error(await response.text());

            setShowDelete(false);
            fetchCompanies();
        } catch (err) {
            alert("Failed to delete company: " + (err.message || "Unknown error"));
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
        });
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            id: Date.now(),
            ...postData,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        setPosts([newPost, ...posts]);
        setPostData({ title: "", content: "" });
        setShowPostModal(false);
    };

    const filteredCompanies = companies.filter(c => {
        const query = searchTerm.toLowerCase();
        return (
            (c.name || '').toLowerCase().includes(query) ||
            (c.company_name || '').toLowerCase().includes(query) ||
            (c.company_id || '').toLowerCase().includes(query) ||
            (c.industry || '').toLowerCase().includes(query)
        );
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
                        onChange={(e) => {
                            const val = e.target.value;
                            setSearchTerm(val);
                            setGlobalSearchTerm(val);
                        }}
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
                                <th>Company ID</th>
                                <th>Size</th>
                                <th>Branches & Locations</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></td></tr>
                            ) : filteredCompanies.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-5 text-muted">No companies found.</td></tr>
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
                                                    <div className="small text-muted">{c.timezone || 'UTC'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge-industry">
                                                <FaIndustry className="me-1 opacity-50" /> {c.industry || 'General'}
                                            </span>
                                        </td>
                                        <td><code className="text-primary fw-medium">{c.company_id || c.companyId || c.registration_id || c.corporate_id || c.reg_no || c.company_code || c.code || (isNaN(c.id) ? c.id : '') || 'N/A'}</code></td>
                                        <td>
                                            <div className="size-badge">
                                                <FaUsers className="me-1 opacity-50" /> {c.company_size || 'N/A'}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="branches-display">
                                                {/* Primary Branch from Company Profile */}
                                                {(() => {
                                                    const cleanText = (val) => (val || '').replace(/^string:/, '').replace(/\s*,\s*/g, ', ').trim();

                                                    // Filter branches for this specific company
                                                    const companyBranches = branches.filter(b => {
                                                        const cleanCName = (c.name || c.companyName || c.company_name || '').toLowerCase().trim().replace(/^string:/, '');
                                                        const bComp = (b.company || b.company_name || '').toLowerCase().trim().replace(/^string:/, '');
                                                        return bComp && cleanCName && bComp === cleanCName;
                                                    });

                                                    if (companyBranches.length > 0) {
                                                        // Priority 1: Show mapped branches from Branches module
                                                        return companyBranches.map(b => (
                                                            <div key={b.id} className="branch-item secondary flex-column align-items-start animate__animated animate__fadeIn">
                                                                <div className="d-flex align-items-center">
                                                                    <FaMapMarkerAlt className="text-danger me-1" title="Branch Office" />
                                                                    <span className="text-dark fw-medium small" title={cleanText(b.name || b.branch_name)}>
                                                                        {cleanText(b.name || b.branch_name)}
                                                                    </span>
                                                                </div>
                                                                {(b.location || b.address) && (
                                                                    <div className="text-muted ms-3 extra-small" title={cleanText(b.location || b.address)}>
                                                                        {cleanText(b.location || b.address)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ));
                                                    } else if (c.city_branch) {
                                                        // Priority 2: Fallback to Primary Branch from Company Profile if no mapped branches
                                                        return (
                                                            <div className="branch-item main">
                                                                <FaMapMarkerAlt className="text-primary me-1" title="Primary Branch" />
                                                                <span className="fw-medium text-dark" title={cleanText(c.city_branch)}>
                                                                    {cleanText(c.city_branch)}
                                                                </span>
                                                                {c.country && (
                                                                    <span className="text-muted ms-1 small">({cleanText(c.country)})</span>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })()}

                                                {branches.filter(b => {
                                                    const cleanCName = (c.name || c.companyName || c.company_name || '').toLowerCase().trim().replace(/^string:/, '');
                                                    const bComp = (b.company || b.company_name || '').toLowerCase().trim().replace(/^string:/, '');
                                                    return bComp === cleanCName;
                                                }).length === 0 && !c.city_branch && (
                                                        <span className="text-muted small italic">No branches mapped</span>
                                                    )}
                                            </div>
                                        </td>
                                        <td className="text-end">
                                            <div className="action-buttons">
                                                <button className="btn-action edit me-3" onClick={() => {
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
                                                    });
                                                    setShowEdit(true);
                                                }}>
                                                    <FaEdit />
                                                </button>
                                                <button className="btn-action delete" onClick={() => {
                                                    setSelectedCompany(c);
                                                    setShowDelete(true);
                                                }}>
                                                    <FaTrash />
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

            {/* Company Announcements / Post Section */}
            <div className="announcements-section mt-5 mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="section-title mb-0">Company Announcements</h3>
                    <button className="btn-post-update" onClick={() => setShowPostModal(true)}>
                        <FaPlus className="me-2" /> Post Announcement
                    </button>
                </div>
                <div className="row g-4">
                    {posts.map(post => (
                        <div className="col-md-6" key={post.id}>
                            <div className="announcement-glass-card">
                                <span className="post-date text-primary small fw-bold">{post.date}</span>
                                <h5 className="mt-2 fw-bold text-dark">{post.title}</h5>
                                <p className="text-muted mb-0">{post.content}</p>
                            </div>
                        </div>
                    ))}
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
                                        <label>Company ID</label>
                                        <div className="input-relative">
                                            <FaBuilding className="input-icon-left" />
                                            <input name="company_id" required placeholder="e.g. COMP-101" onChange={handleChange} value={formData.company_id} className="premium-input" />
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

            {showDelete && (
                <div className="modern-modal-overlay">
                    <div className="modern-modal-card delete-card">
                        <div className="text-center p-4">
                            <div className="delete-icon-circle mb-3"><FaTrash /></div>
                            <h3>Remove Company?</h3>
                            <p className="text-muted">Deleting <strong>{selectedCompany?.name}</strong> is permanent.</p>
                            <div className="d-flex gap-3 mt-4">
                                <button className="btn-cancel flex-grow-1" onClick={() => setShowDelete(false)}>Cancel</button>
                                <button className="btn-danger-modern flex-grow-1" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showPostModal && (
                <div className="modern-modal-overlay">
                    <div className="modern-modal-card">
                        <div className="modal-top-bar">
                            <h4 className="m-0">Create Company Post</h4>
                            <button className="modal-close-btn" onClick={() => setShowPostModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handlePostSubmit} className="modal-body-content">
                            <div className="row g-4">
                                <div className="col-12">
                                    <div className="input-field-group">
                                        <label>Announcement Title</label>
                                        <input required placeholder="Enter Title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} className="ps-3" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="input-field-group">
                                        <label>Content</label>
                                        <textarea required placeholder="Write your announcement here..." value={postData.content} onChange={(e) => setPostData({ ...postData, content: e.target.value })} className="ps-3 pt-3" style={{ height: '150px', borderRadius: '12px', border: '2px solid #f1f5f9' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer-actions mt-5">
                                <button type="button" className="btn-cancel" onClick={() => setShowPostModal(false)}>Discard</button>
                                <button type="submit" className="btn-submit">Post Now</button>
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

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import { companyService } from "./service.js";

export const CompaniesContent = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        company_Id: "",
        industry: "",
        company_size: "",
        country: "",
        state: "",
        city_branch: "",
        timezone: "",
    });

    // 🔹 Fetch companies
    // 🔹 Fetch companies
    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const response = await companyService.getAllCompanies();
            console.log("Fetched companies response:", response);

            let data = [];
            if (Array.isArray(response)) {
                data = response;
            } else if (response && typeof response === 'object') {
                if (Array.isArray(response.data)) data = response.data;
                else if (Array.isArray(response.companies)) data = response.companies;
                else if (Array.isArray(response.result)) data = response.result;
            }

            setCompanies(data);
        } catch (err) {
            console.error("Error fetching companies:", err);
            // Optional: setCompanies([]) on error is already implicit since it initializes as [] and we don't clear it on error here, 
            // but normally we might want to clear or keep old data. 
            // Let's keep existing behavior or just ensure we don't break.
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

    // 🔹 Create
    const handleCreate = async () => {
        try {
            await companyService.createCompany(formData);

            alert("Company created successfully");
            setShowAdd(false);
            setFormData({
                name: "",
                company_Id: "",
                industry: "",
                company_size: "",
                country: "",
                state: "",
                city_branch: "",
                timezone: "",
            });
            fetchCompanies();
        } catch (err) {
            console.error(err);
            alert("Failed to create company: " + (err.message || "Unknown error"));
        }
    }


    // 🔹 Update
    const handleUpdate = async () => {
        try {
            await companyService.updateCompany(selectedCompany.id, formData);
            alert("Company updated successfully");
            setShowEdit(false);
            fetchCompanies();
        } catch (err) {
            console.error(err);
            alert("Failed to update company: " + (err.message || "Unknown error"));
        }
    };

    // 🔹 Delete
    const handleDelete = async () => {
        try {
            await companyService.deleteCompany(selectedCompany.id);
            alert("Company deleted successfully");
            setShowDelete(false);
            fetchCompanies();
        } catch (err) {
            console.error(err);
            alert("Failed to delete company: " + (err.message || "Unknown error"));
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <h5>Company Management</h5>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                        setFormData({
                            name: "",
                            company_Id: "",
                            industry: "",
                            company_size: "",
                            country: "",
                            state: "",
                            city_branch: "",
                            timezone: "",
                        });
                        setShowAdd(true);
                    }}
                >
                    + Add Company
                </button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Company ID</th>
                        <th>Industry</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4">Loading...</td>
                        </tr>
                    ) : companies.length === 0 ? (
                        <tr>
                            <td colSpan="4">No companies found</td>
                        </tr>
                    ) : (
                        companies.map((c) => (
                            <tr key={c.id}>
                                <td>{c.name || c.companyName || c.company_name}</td>
                                <td>{c.company_Id || c.company_id || c.companyId || c.companyCode || c.id}</td>
                                <td>{c.industry || c.industryType}</td>
                                <td>{`${c.city_branch || c.city || c.branch || c.location || ''}, ${c.country || c.countryName || ''}`}</td>
                                <td>
                                    <FaEdit
                                        className="me-3 text-primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setSelectedCompany(c);
                                            setFormData({
                                                name: c.name || "",
                                                company_Id: c.company_Id || "",
                                                industry: c.industry || "",
                                                company_size: c.company_size || "",
                                                country: c.country || "",
                                                state: c.state || "",
                                                city_branch: c.city_branch || "",
                                                timezone: c.timezone || "",
                                            });
                                            setShowEdit(true);
                                        }}
                                    />
                                    <FaTrash
                                        className="text-danger"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setSelectedCompany(c);
                                            setShowDelete(true);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Add Modal */}
            {showAdd && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content p-3">
                            <div className="modal-header border-0">
                                <h5 className="modal-title">Add Company</h5>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Company Name</label>
                                        <input name="name" className="form-control" onChange={handleChange} value={formData.name} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Company ID</label>
                                        <input name="company_Id" className="form-control" onChange={handleChange} value={formData.company_Id} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Industry</label>
                                        <input name="industry" className="form-control" onChange={handleChange} value={formData.industry} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Company Size</label>
                                        <select name="company_size" className="form-select" onChange={handleChange} value={formData.company_size}>
                                            <option value="">Select Size</option>
                                            <option>1-10</option>
                                            <option>11-50</option>
                                            <option>51-200</option>
                                            <option>201-500</option>
                                            <option>500+</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold">Country</label>
                                        <input name="country" className="form-control" onChange={handleChange} value={formData.country} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold">State</label>
                                        <input name="state" className="form-control" onChange={handleChange} value={formData.state} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold">City/Branch</label>
                                        <input name="city_branch" className="form-control" onChange={handleChange} value={formData.city_branch} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Timezone</label>
                                        <input name="timezone" className="form-control" onChange={handleChange} value={formData.timezone} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Cancel</button>
                                <button className="btn btn-primary btn-sm" onClick={handleCreate}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEdit && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content p-3">
                            <div className="modal-header border-0">
                                <h5 className="modal-title">Edit Company</h5>
                                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Company Name</label>
                                        <input name="name" className="form-control" onChange={handleChange} value={formData.name} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Company ID</label>
                                        <input name="company_Id" className="form-control" onChange={handleChange} value={formData.company_Id} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Industry</label>
                                        <input name="industry" className="form-control" onChange={handleChange} value={formData.industry} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Company Size</label>
                                        <select name="company_size" className="form-select" onChange={handleChange} value={formData.company_size}>
                                            <option value="">Select Size</option>
                                            <option>1-10</option>
                                            <option>11-50</option>
                                            <option>51-200</option>
                                            <option>201-500</option>
                                            <option>500+</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold">Country</label>
                                        <input name="country" className="form-control" onChange={handleChange} value={formData.country} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold">State</label>
                                        <input name="state" className="form-control" onChange={handleChange} value={formData.state} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold">City/Branch</label>
                                        <input name="city_branch" className="form-control" onChange={handleChange} value={formData.city_branch} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Timezone</label>
                                        <input name="timezone" className="form-control" onChange={handleChange} value={formData.timezone} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Cancel</button>
                                <button className="btn btn-primary btn-sm" onClick={handleUpdate}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDelete && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <p>Are you sure?</p>
                            <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const Companies = () => (
    <DashboardLayout>
        <CompaniesContent />
    </DashboardLayout>
);

export default Companies;

import React, { useState, useEffect } from 'react';
import {
    FaEdit, FaTrash, FaBan, FaCheckCircle, FaSearch,
    FaMapMarkerAlt, FaBuilding, FaPlus, FaFilter, FaLayerGroup
} from 'react-icons/fa';
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import { useSearch } from "../../../../context/SearchContext";
import { coreService } from "../../../../services/coreService";
import BranchMap from "../../../../components/BranchMap";
import "../../../../components/layout/DashboardLayout.css";

export const BranchesContent = () => {
    const [branches, setBranches] = useState([]);
    const [companiesList, setCompaniesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);

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

    const fetchData = async () => {
        setLoading(true);
        try {
            const [branchData, compData] = await Promise.all([
                coreService.getBranches(),
                coreService.getCompanies()
            ]);

            const cleanText = (val) => (val || '').replace(/^string:/, '').replace(/\s*,\s*/g, ', ').trim();
            const mappedData = branchData.map(b => ({
                id: b.id,
                company_id: b.company_id || null,
                name: cleanText(b.branch_name || b.name),
                company: cleanText(b.company_name || b.company),
                address: cleanText(b.address),
                state: cleanText(b.state),
                location: b.latitude && b.longitude ? `${b.latitude}, ${b.longitude}` : (b.location || ''),
                lat: b.latitude,
                lng: b.longitude,
                status: b.status || 'Active'
            }));
            setBranches(mappedData);
            setCompaniesList(compData);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const [branchStats, setBranchStats] = useState({ total_active: 0, pending_action: 0 });

    const fetchStats = async () => {
        try {
            const data = await coreService.getBranchStats();
            setBranchStats(data);
        } catch (err) {
            console.error("Error fetching branch stats:", err);
        }
    };

    useEffect(() => {
        fetchData();
        fetchStats();
    }, [reload]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveBranch = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                company_id: formData.company,
                branch_name: formData.name,
                address: formData.address,
                latitude: formData.location?.split(',')[0]?.trim() || "0",
                longitude: formData.location?.split(',')[1]?.trim() || "0",
                status: formData.status || "Active"
            };
            await coreService.createBranch(payload);
            setReload(!reload);
            setShowAdd(false);
            alert("Branch added successfully!");
        } catch (error) {
            console.error("Error saving branch:", error);
            alert("Failed to save branch: " + error.message);
        }
    };

    const handleUpdateBranch = async (e) => {
        e.preventDefault();
        try {
            await coreService.updateBranch(selectedBranch.id, {
                branch_name: formData.name,
                address: formData.address,
                latitude: formData.location?.split(',')[0]?.trim() || "0",
                longitude: formData.location?.split(',')[1]?.trim() || "0",
                status: formData.status
            });
            setReload(!reload);
            setShowEdit(false);
            alert("Branch updated successfully!");
        } catch (error) {
            console.error("Error updating branch:", error);
            alert("Failed to update branch: " + error.message);
        }
    };

    const handleDeleteBranch = async (id) => {
        if (!window.confirm("Are you sure you want to delete this branch?")) return;
        try {
            await coreService.deleteBranch(id);
            setReload(!reload);
            alert("Branch deleted successfully!");
        } catch (error) {
            console.error("Error deleting branch:", error);
            alert("Failed to delete branch: " + error.message);
        }
    };

    const toggleStatus = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/branches/${id}/toggle-status`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                }
            });
            if (response.ok) setReload(!reload);
        } catch (error) {
            console.error("Error toggling status:", error);
        }
    };

    const filteredBranches = Array.isArray(branches) ? branches.filter(branch => {
        const query = searchTerm.toLowerCase();
        return (
            (branch.branch_name || '').toLowerCase().includes(query) ||
            (branch.state || '').toLowerCase().includes(query) || // Changed from branch.city to branch.state based on data structure
            (branch.company_name || '').toLowerCase().includes(query)
        );
    }) : [];

    const stats = [
        { label: 'Total Branches', count: branches.length, icon: <FaMapMarkerAlt />, color: '#818cf8', bg: 'rgba(129, 140, 248, 0.1)' },
        { label: 'Active Locations', count: branches.filter(b => b.status === 'Active').length, icon: <FaCheckCircle />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
        { label: 'Involved Companies', count: companiesList.length, icon: <FaBuilding />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    ];

    return (
        <div style={{ padding: '0px', maxWidth: '100%', margin: '0 auto' }}>
            {/* Stats Summary */}
            <div className="row g-4 mb-5">
                {stats.map((stat, i) => (
                    <div key={i} className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm rounded-4"
                            style={{
                                padding: '24px',
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.5)'
                            }}>
                            <div className="d-flex align-items-center gap-4">
                                <div style={{
                                    width: 60, height: 60, borderRadius: '18px',
                                    background: stat.bg, color: stat.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem'
                                }}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                                    <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0f172a' }}>{stat.count}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Card */}
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5"
                style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.6)'
                }}>
                <div className="card-header bg-transparent border-0 p-4">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                            <div className="position-relative">
                                <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted opacity-50" />
                                <input
                                    type="text"
                                    className="form-control rounded-pill ps-5 border-0 shadow-sm"
                                    placeholder="Search branches by name, city, or company..."
                                    style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '12px 20px 12px 48px' }}
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setGlobalSearchTerm(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 text-end d-flex gap-3 justify-content-end">
                            <button className="btn rounded-pill px-4 d-flex align-items-center gap-2 shadow-sm border-0"
                                style={{ background: 'white', color: '#64748b', fontWeight: 700 }}>
                                <FaFilter /> Filters
                            </button>
                            <button className="btn rounded-pill px-4 d-flex align-items-center gap-2 shadow-lg border-0"
                                onClick={() => {
                                    setFormData({ name: '', company: '', address: '', location: '', status: 'Active' });
                                    setShowAdd(true);
                                }}
                                style={{ background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)', color: 'white', fontWeight: 700 }}>
                                <FaPlus /> Add New Branch
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead style={{ background: 'rgba(129, 140, 248, 0.05)' }}>
                                <tr>
                                    <th className="px-4 py-3 border-0 text-muted small fw-bold">BRANCH NAME</th>
                                    <th className="py-3 border-0 text-muted small fw-bold">LOCATION & ADDRESS</th>
                                    <th className="py-3 border-0 text-muted small fw-bold">PARENT COMPANY</th>
                                    <th className="py-3 border-0 text-muted small fw-bold">STATUS</th>
                                    <th className="pe-4 py-3 border-0 text-muted small fw-bold text-end">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border text-primary border-0" style={{ '--bs-spinner-color': '#818cf8' }}></div></td></tr>
                                ) : filteredBranches.length === 0 ? (
                                    <tr><td colSpan="5" className="text-center py-5 text-muted">No branches matching your criteria.</td></tr>
                                ) : (
                                    filteredBranches.map((branch, i) => (
                                        <tr key={i} className="border-bottom border-light">
                                            <td className="px-4 py-4">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
                                                        style={{ width: 42, height: 42, background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)', fontSize: '0.9rem' }}>
                                                        <FaBuilding />
                                                    </div>
                                                    <div className="fw-bold text-dark">{branch.name}</div>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="small text-dark fw-600 mb-1"><FaMapMarkerAlt className="text-muted me-2" />{branch.state || 'Main Office'}</div>
                                                <div className="small text-muted" style={{ maxWidth: '250px' }}>{branch.address}</div>
                                            </td>
                                            <td className="py-4">
                                                <span className="badge bg-light text-dark border rounded-pill px-3 py-2 fw-600">
                                                    {branch.company || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <span className={`badge rounded-pill px-3 py-2 ${branch.status === 'Inactive' ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`} style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                                                    {branch.status}
                                                </span>
                                            </td>
                                            <td className="pe-4 py-4 text-end">
                                                <div className="d-flex gap-2 justify-content-end">
                                                    <button className="btn btn-sm rounded-circle p-2 border-0 shadow-sm"
                                                        onClick={() => {
                                                            setSelectedBranch(branch);
                                                            setFormData({ ...branch, company: branch.company_id || '' });
                                                            setShowEdit(true);
                                                        }}
                                                        style={{ background: 'rgba(129, 140, 248, 0.1)', color: '#818cf8' }}>
                                                        <FaEdit size={14} />
                                                    </button>
                                                    <button className="btn btn-sm rounded-circle p-2 border-0 shadow-sm"
                                                        onClick={() => toggleStatus(branch.id)}
                                                        style={{ background: branch.status === 'Active' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: branch.status === 'Active' ? '#ef4444' : '#10b981' }}>
                                                        {branch.status === 'Active' ? <FaBan size={14} /> : <FaCheckCircle size={14} />}
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
            </div>

            {/* Map View Section */}
            {!loading && filteredBranches.length > 0 && (
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)'
                    }}>
                    <div className="card-header bg-transparent border-0 p-4">
                        <h5 className="fw-bold m-0 d-flex align-items-center gap-2">
                            <FaLayerGroup className="text-primary-soft" /> Global Presence Matrix
                        </h5>
                    </div>
                    <div className="card-body p-0" style={{ height: '400px' }}>
                        <BranchMap branches={filteredBranches} />
                    </div>
                </div>
            )}

            {/* Modals Implementation */}
            {(showAdd || showEdit) && (
                <div className="modal fade show d-block" style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-2xl rounded-4 overflow-hidden">
                            <div style={{ background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)', padding: '32px', color: 'white' }}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="modal-title fw-bold fs-4 m-0">{showAdd ? 'Establish New Branch' : 'Modify Branch Location'}</h5>
                                    <button onClick={() => { setShowAdd(false); setShowEdit(false); }} className="btn-close btn-close-white shadow-none"></button>
                                </div>
                                <p className="opacity-75 m-0 mt-2">Configure operational hubs and geographical data.</p>
                            </div>
                            <div className="modal-body p-4">
                                <form onSubmit={showAdd ? handleSaveBranch : handleUpdateBranch}>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Branch Name</label>
                                            <input type="text" name="name" className="form-control rounded-3 p-3 bg-light border-0" required value={formData.name} onChange={handleInputChange} placeholder="e.g. Hyderabad Hitech City" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Associated Company</label>
                                            <select name="company" className="form-select rounded-3 p-3 bg-light border-0 shadow-none" required value={formData.company} onChange={handleInputChange}>
                                                <option value="">Select Company</option>
                                                {companiesList.map((c, idx) => (
                                                    <option key={idx} value={c.id}>{c.company_name || c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Physical Address</label>
                                            <textarea name="address" className="form-control rounded-3 p-3 bg-light border-0" rows="3" required value={formData.address} onChange={handleInputChange} placeholder="Full street address and city details..."></textarea>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Geographic Location (Lat, Lng)</label>
                                            <input type="text" name="location" className="form-control rounded-3 p-3 bg-light border-0" value={formData.location} onChange={handleInputChange} placeholder="17.4483, 78.3915" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Initial Status</label>
                                            <select name="status" className="form-select rounded-3 p-3 bg-light border-0 shadow-none" value={formData.status} onChange={handleInputChange}>
                                                <option value="Active">Operational (Active)</option>
                                                <option value="Inactive">Paused (Inactive)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-5 d-flex gap-3">
                                        <button type="button" onClick={() => { setShowAdd(false); setShowEdit(false); }} className="btn btn-light rounded-pill px-4 py-3 fw-bold w-100 border-0">Cancel</button>
                                        <button type="submit" className="btn btn-primary rounded-pill px-4 py-3 fw-bold w-100 border-0 shadow-lg" style={{ background: '#818cf8' }}>
                                            {showAdd ? 'Add Hub' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Branches = () => {
    return (
        <DashboardLayout title="Presence Matrix">
            <BranchesContent />
        </DashboardLayout>
    );
};

export default Branches;

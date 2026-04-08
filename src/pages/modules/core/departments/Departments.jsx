import React, { useState, useEffect } from 'react';
import { FaEdit, FaTimesCircle, FaCheckCircle, FaBuilding, FaSearch } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useSearch } from '../../../../context/SearchContext';
import { useAuth } from '../../../../context/AuthContext';
import "../../../../components/layout/DashboardLayout.css";
import { departmentService } from './departmentService';

export const DepartmentsContent = () => {
    const { user } = useAuth();
    const role = user?.role?.toLowerCase() || 'superadmin';

    const [departments, setDepartments] = useState([]);
    const [companiesList, setCompaniesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);

    // Sync local search with global search
    useEffect(() => {
        setSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedDept, setSelectedDept] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        head: '',
        location: '',
        employees: '',
        company_id: '',
        status: 'Active'
    });

    const cleanText = (val) => (val || '').replace(/^string:/, '').replace(/\s*,\s*/g, ', ').trim();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [deptRes, compRes] = await Promise.all([
                    departmentService.getDepartments(role),
                    departmentService.getCompanies(role)
                ]);

                if (deptRes) {
                    setDepartments(Array.isArray(deptRes) ? deptRes : (deptRes.data || []));
                }
                if (compRes) {
                    setCompaniesList(Array.isArray(compRes) ? compRes : (compRes.data || []));
                }
            } catch (error) {
                console.error("Error fetching departments/companies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [reload, role]);

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddClick = () => {
        setFormData({ name: '', head: '', location: '', employees: '', company_id: '', status: 'Active' });
        setShowAdd(true);
    };

    const handleEditClick = (dept) => {
        setSelectedDept(dept);
        setFormData({
            ...dept,
            name: cleanText(dept.name || dept.department_name),
            head: cleanText(dept.head || dept.dept_head),
            location: cleanText(dept.location),
            company_id: dept.company_id || ''
        });
        setShowEdit(true);
    };

    const handleSaveDept = async () => {
        if (!formData.name || !formData.company_id) return;
        try {
            await departmentService.createDepartment({
                department_name: formData.name,
                dept_head: formData.head,
                location: formData.location,
                company_id: formData.company_id,
                status: formData.status
            }, role);
            setShowAdd(false);
            setReload(!reload);
        } catch (error) {
            console.error("Failed to save department:", error);
        }
    };

    const handleUpdateDept = async () => {
        if (!selectedDept) return;
        try {
            await departmentService.updateDepartment(selectedDept.id, {
                department_name: formData.name,
                dept_head: formData.head,
                location: formData.location,
                status: formData.status
            }, role);
            setShowEdit(false);
            setReload(!reload);
        } catch (error) {
            console.error("Failed to update department:", error);
        }
    };

    const toggleStatus = async (id) => {
        try {
            await departmentService.toggleStatus(id, role);
            setReload(!reload);
        } catch (error) {
            console.error("Failed to toggle status:", error);
        }
    };

    const filteredDepartments = departments.filter(dept => {
        const query = searchTerm.toLowerCase();
        return (
            cleanText(dept.department_name || dept.name).toLowerCase().includes(query) ||
            cleanText(dept.dept_head || dept.head).toLowerCase().includes(query) ||
            cleanText(dept.location).toLowerCase().includes(query) ||
            cleanText(dept.company_name).toLowerCase().includes(query)
        );
    });

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Department Management</h5>
                    <p className="text-secondary small mb-0">Manage departments across all companies</p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <div className="position-relative">
                        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                        <input
                            type="text"
                            placeholder="Search departments..."
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
                        + Add Department
                    </button>
                </div>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table align-middle">
                        <thead>
                            <tr>
                                <th>Department Name</th>
                                <th>Company</th>
                                <th>Department Head</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center py-4">Loading departments...</td></tr>
                            ) : filteredDepartments.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-4">No departments found.</td></tr>
                            ) : (
                                filteredDepartments.map((dept) => (
                                    <tr key={dept.id} className={dept.status === 'Inactive' ? 'opacity-50' : ''}>
                                        <td>
                                            <span className="fw-bold text-dark">{cleanText(dept.department_name || dept.name)}</span>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-1">
                                                <FaBuilding className="text-muted small" />
                                                <span>{cleanText(dept.company_name || dept.company)}</span>
                                            </div>
                                        </td>
                                        <td>{cleanText(dept.dept_head || dept.head)}</td>
                                        <td>{cleanText(dept.location)}</td>
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
                                                    {dept.status === 'Active' ? <FaTimesCircle className="text-danger" /> : <FaCheckCircle className="text-success" />}
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
                                        <label className="form-label small fw-bold">Company</label>
                                        <select
                                            className="form-select"
                                            name="company_id"
                                            value={formData.company_id}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Company</option>
                                            {companiesList.map(c => (
                                                <option key={c.id} value={c.id}>{cleanText(c.company_name || c.name)}</option>
                                            ))}
                                        </select>
                                    </div>
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

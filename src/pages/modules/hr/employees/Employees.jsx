import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaEdit, FaTrash, FaCheckCircle, FaBan, FaPlus,
    FaFileCsv, FaSearch, FaUsers, FaUserPlus,
    FaBuilding, FaFilter, FaEllipsisV, FaEnvelope, FaPhone
} from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useSearch } from '../../../../context/SearchContext';
import { useAuth } from '../../../../context/AuthContext';
import { employeeSuperAdminService } from './superadmin-service';
import { companyService } from '../../core/companies/service';
import "../../../../components/layout/DashboardLayout.css";

export const EmployeesContent = () => {
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();

    const [employees, setEmployees] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Form Data
    const [formData, setFormData] = useState({
        user_account: '',
        name: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        department: '',
        designation: '',
        role: 'employee',
        joining_date: '',
        company_id: '',
        branch: ''
    });

    const isSuperAdmin = currentUser?.role?.toLowerCase() === 'superadmin' || currentUser?.role?.toUpperCase() === 'SUPER_ADMIN';
    const isAdmin = currentUser?.role?.toLowerCase() === 'admin';
    const isHR = currentUser?.role?.toLowerCase() === 'hr';
    const isEmployee = currentUser?.role?.toLowerCase() === 'employee';

    // Permissions
    const canManageAll = isSuperAdmin;
    const canManageCompany = isAdmin || isHR; // Admin and HR can manage their company
    const canAddEmployee = isSuperAdmin || isAdmin || isHR;

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch all for SuperAdmin/Admin/HR to allow filtering
            // Note: If backend supports restricted listing, we should use that
            // For now, we fetch and filter in frontend to meet UI requirements
            const empRes = await employeeSuperAdminService.getAllEmployees();
            let empData = Array.isArray(empRes) ? empRes : (empRes.data || empRes.employees || []);

            // Apply role-based filtering
            if (isSuperAdmin) {
                setEmployees(empData);
            } else if (isAdmin || isHR) {
                // Admin and HR see employees of their own company
                const filtered = empData.filter(e => e.company_id === currentUser?.company_id || e.company_name === currentUser?.company_name);
                setEmployees(filtered);
            } else if (isEmployee) {
                // Employee only sees themselves
                const self = empData.filter(e => e.id === currentUser?.user_id || e.id === currentUser?.id || e.email === currentUser?.email);
                setEmployees(self.length > 0 ? self : [currentUser]); // Fallback to current user context
            }

            // Fetch companies for dropdown if allowed to manage
            if (canAddEmployee) {
                const compRes = await companyService.getAllCompanies();
                const compData = Array.isArray(compRes) ? compRes : (compRes.data || compRes.companies || []);
                setCompanies(compData);
            }
        } catch (error) {
            console.error("Error fetching employee data:", error);
            // If API fails (e.g. Employee unauthorized for admin endpoint), fallback for Employee
            if (isEmployee) {
                setEmployees([currentUser]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchData();
        }
    }, [currentUser]);

    useEffect(() => {
        setSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            if (canAddEmployee) {
                // If not SuperAdmin, force company_id to current user's company
                const payload = isSuperAdmin ? formData : { ...formData, company_id: currentUser.company_id };
                await employeeSuperAdminService.createEmployee(payload);
                setShowAdd(false);
                fetchData();
                alert("Employee created successfully!");
            }
        } catch (error) {
            alert("Failed to create employee: " + (error.message || "Unknown error"));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            if ((isSuperAdmin || isAdmin || isHR) && selectedEmployee) {
                await employeeSuperAdminService.updateEmployee(selectedEmployee.id, formData);
                setShowEdit(false);
                fetchData();
                alert("Employee updated successfully!");
            }
        } catch (error) {
            alert("Failed to update employee: " + (error.message || "Unknown error"));
        }
    };

    const handleDelete = async () => {
        try {
            if ((isSuperAdmin || isAdmin) && selectedEmployee) {
                await employeeSuperAdminService.deleteEmployee(selectedEmployee.id);
                setShowDelete(false);
                fetchData();
                alert("Employee deleted successfully!");
            }
        } catch (error) {
            alert("Failed to delete employee: " + (error.message || "Unknown error"));
        }
    };

    const filteredEmployees = employees.filter(emp => {
        const query = searchTerm.toLowerCase();
        return (
            (emp.name || emp.first_name || '').toLowerCase().includes(query) ||
            (emp.email || '').toLowerCase().includes(query) ||
            (emp.designation || '').toLowerCase().includes(query) ||
            (emp.company_name || '').toLowerCase().includes(query)
        );
    });

    const stats = [
        { label: 'Total Employees', count: employees.length, icon: <FaUsers />, color: '#818cf8', bg: 'rgba(129, 140, 248, 0.1)' },
        { label: 'Active Now', count: employees.filter(e => e.status === 'Active' || !e.status).length, icon: <FaCheckCircle />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
        { label: isEmployee ? 'Performance' : 'New This Month', count: isEmployee ? '95%' : 5, icon: <FaUserPlus />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    ];

    return (
        <div style={{ padding: '0px', maxWidth: '100%', margin: '0 auto' }}>
            {/* Stats Row */}
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

            {/* Smart Action Bar */}
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
                                    placeholder="Search by name, email, or role..."
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
                            {canAddEmployee && (
                                <button className="btn rounded-pill px-4 d-flex align-items-center gap-2 shadow-lg border-0"
                                    onClick={() => {
                                        setFormData({
                                            user_account: '', name: '', email: '', phone: '',
                                            username: '', password: '',
                                            department: '', designation: '',
                                            role: 'employee', joining_date: '',
                                            company_id: currentUser?.company_id || '', branch: ''
                                        });
                                        setShowAdd(true);
                                    }}
                                    style={{ background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)', color: 'white', fontWeight: 700 }}>
                                    <FaPlus /> Add Employee
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead style={{ background: 'rgba(129, 140, 248, 0.05)' }}>
                                <tr>
                                    <th className="px-4 py-3 border-0 text-muted small fw-bold">EMPLOYEE</th>
                                    <th className="py-3 border-0 text-muted small fw-bold">CONTACT</th>
                                    <th className="py-3 border-0 text-muted small fw-bold">ROLE & DEPT</th>
                                    <th className="py-3 border-0 text-muted small fw-bold">COMPANY</th>
                                    <th className="py-3 border-0 text-muted small fw-bold">STATUS</th>
                                    {!isEmployee && <th className="pe-4 py-3 border-0 text-muted small fw-bold text-end">ACTIONS</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="6" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                                ) : filteredEmployees.length === 0 ? (
                                    <tr><td colSpan="6" className="text-center py-5 text-muted">No employees found.</td></tr>
                                ) : (
                                    filteredEmployees.map((emp, i) => (
                                        <tr key={i} className="border-bottom border-light" style={{ transition: 'all 0.2s' }}>
                                            <td className="px-4 py-4">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
                                                        style={{ width: 42, height: 42, background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)', fontSize: '0.9rem' }}>
                                                        {(emp.name || 'E').charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="fw-bold text-dark">{emp.name}</div>
                                                        <div className="small text-muted">ID: #{emp.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="d-flex flex-column gap-1">
                                                    <div className="small text-dark d-flex align-items-center gap-2"><FaEnvelope className="text-muted" size={12} /> {emp.email}</div>
                                                    <div className="small text-muted d-flex align-items-center gap-2"><FaPhone className="text-muted" size={12} /> {emp.phone || 'No phone'}</div>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="fw-bold text-dark">{emp.designation || emp.role}</div>
                                                <div className="small text-muted">{emp.department || 'N/A'}</div>
                                            </td>
                                            <td className="py-4">
                                                <span className="badge bg-light text-dark border rounded-pill px-3 py-2 fw-600">
                                                    <FaBuilding className="me-2 opacity-50" /> {emp.company_name || emp.company || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <span className={`badge rounded-pill px-3 py-2 ${emp.status === 'Inactive' ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`} style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                                                    {emp.status || 'Active'}
                                                </span>
                                            </td>
                                            {!isEmployee && (
                                                <td className="pe-4 py-4 text-end">
                                                    <div className="d-flex gap-2 justify-content-end">
                                                        <button className="btn btn-sm rounded-circle p-2 border-0 shadow-sm"
                                                            onClick={() => {
                                                                setSelectedEmployee(emp);
                                                                setFormData({ ...emp, company_id: emp.company_id || '' });
                                                                setShowEdit(true);
                                                            }}
                                                            style={{ background: 'rgba(129, 140, 248, 0.1)', color: '#818cf8' }}>
                                                            <FaEdit size={14} />
                                                        </button>
                                                        {(isSuperAdmin || isAdmin) && (
                                                            <button className="btn btn-sm rounded-circle p-2 border-0 shadow-sm"
                                                                onClick={() => {
                                                                    setSelectedEmployee(emp);
                                                                    setShowDelete(true);
                                                                }}
                                                                style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                                                                <FaTrash size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals Implementation */}
            {(showAdd || showEdit) && (
                <div className="modal fade show d-block" style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden" style={{ background: '#fff' }}>
                            <div className="p-4 border-bottom border-light d-flex justify-content-between align-items-start">
                                <div>
                                    <h4 className="fw-bold mb-1" style={{ color: '#0f172a' }}>Add New Employee</h4>
                                    <p className="text-muted small mb-0">Enter employee information to add to the system</p>
                                </div>
                                <button onClick={() => { setShowAdd(false); setShowEdit(false); }} className="btn-close shadow-none"></button>
                            </div>
                            <div className="modal-body p-4">
                                <form onSubmit={showAdd ? handleAdd : handleUpdate}>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Select User Account</label>
                                            <select name="user_account" className="form-select rounded-3 p-3 bg-light border-0 shadow-none" value={formData.user_account} onChange={handleInputChange}>
                                                <option value="">Select a user account</option>
                                                <option value="1">Account 1</option>
                                                <option value="2">Account 2</option>
                                            </select>
                                            <div className="small text-muted mt-1" style={{ fontSize: '0.75rem' }}>Only unassigned user accounts are shown</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Full Name</label>
                                            <input type="text" name="name" className="form-control rounded-3 p-3 bg-light border-0" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Email</label>
                                            <input type="email" name="email" className="form-control rounded-3 p-3 bg-light border-0" required value={formData.email} onChange={handleInputChange} placeholder="john.doe@company.com" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Phone</label>
                                            <input type="tel" name="phone" className="form-control rounded-3 p-3 bg-light border-0" value={formData.phone} onChange={handleInputChange} placeholder="Phone number" />
                                        </div>

                                        <div className="col-12 mt-4 pt-2">
                                            <div className="text-primary fw-bold small mb-3 border-bottom pb-2">Login Credentials</div>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Username *</label>
                                            <input type="text" name="username" className="form-control rounded-3 p-3 bg-light border-0" required value={formData.username} onChange={handleInputChange} placeholder="dittakavijaya@gmail.com" />
                                            <div className="small text-muted mt-1" style={{ fontSize: '0.75rem' }}>The user will use these credentials to access their account.</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Password *</label>
                                            <input type="password" name="password" className="form-control rounded-3 p-3 bg-light border-0" required value={formData.password} onChange={handleInputChange} placeholder="........" />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Department</label>
                                            <select name="department" className="form-select rounded-3 p-3 bg-light border-0 shadow-none" value={formData.department} onChange={handleInputChange}>
                                                <option value="">Select Department</option>
                                                <option value="IT">IT</option>
                                                <option value="HR">HR</option>
                                                <option value="Finance">Finance</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Designation</label>
                                            <input type="text" name="designation" className="form-control rounded-3 p-3 bg-light border-0" value={formData.designation} onChange={handleInputChange} placeholder="Software Engineer" />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Employee Type</label>
                                            <select name="role" className="form-select rounded-3 p-3 bg-light border-0 shadow-none" value={formData.role} onChange={handleInputChange}>
                                                <option value="employee">Employee</option>
                                                <option value="manager">Manager</option>
                                                <option value="hr">HR</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Joining Date</label>
                                            <input type="date" name="joining_date" className="form-control rounded-3 p-3 bg-light border-0" value={formData.joining_date} onChange={handleInputChange} />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Company</label>
                                            <select name="company_id" className="form-select rounded-3 p-3 bg-light border-0 shadow-none" required value={formData.company_id} onChange={handleInputChange}>
                                                <option value="">Select Company</option>
                                                {companies.map((c, idx) => (
                                                    <option key={idx} value={c.id}>{c.name || c.company_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Branch</label>
                                            <select name="branch" className="form-select rounded-3 p-3 bg-light border-0 shadow-none" value={formData.branch} onChange={handleInputChange}>
                                                <option value="">Select Branch</option>
                                                <option value="Main">Main Branch</option>
                                                <option value="Regional">Regional Branch</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-5 d-flex gap-3 pt-3 border-top">
                                        <button type="button" onClick={() => { setShowAdd(false); setShowEdit(false); }} className="btn btn-light rounded-pill px-4 py-3 fw-bold w-100 border-0" style={{ background: '#f8fafc' }}>Cancel</button>
                                        <button type="submit" className="btn btn-primary rounded-pill px-4 py-3 fw-bold w-100 border-0 shadow-lg" style={{ background: '#6366f1' }}>
                                            {showAdd ? 'Add Employee' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDelete && (
                <div className="modal fade show d-block" style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-2xl rounded-4 overflow-hidden">
                            <div className="modal-body p-5 text-center">
                                <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                                    style={{ width: 80, height: 80, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                                    <FaTrash size={32} />
                                </div>
                                <h4 className="fw-bold mb-3">Delete Employee?</h4>
                                <p className="text-muted mb-4">You are about to remove <strong>{selectedEmployee?.name}</strong> from the system. This action is irreversible.</p>
                                <div className="d-flex gap-3">
                                    <button className="btn btn-light rounded-pill px-4 py-3 fw-bold flex-grow-1 border-0" onClick={() => setShowDelete(false)}>Wait, Cancel</button>
                                    <button className="btn btn-danger rounded-pill px-4 py-3 fw-bold flex-grow-1 border-0 shadow-lg" onClick={handleDelete}>Delete Anyway</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Employees = () => {
    return (
        <DashboardLayout title="Member Directory">
            <EmployeesContent />
        </DashboardLayout>
    );
};

export default Employees;

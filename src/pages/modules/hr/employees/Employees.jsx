import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaEdit, FaCheckCircle, FaBan, FaPlus,
    FaFileCsv, FaSearch, FaUsers, FaUserPlus,
    FaBuilding, FaFilter, FaEllipsisV, FaEnvelope, FaPhone, FaTimesCircle
} from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useSearch } from '../../../../context/SearchContext';
import { useAuth } from '../../../../context/AuthContext';
import { employeeSuperAdminService } from './superadmin-service';
import { companyService } from '../../core/companies/service';
import { coreService } from '../../../../services/coreService';
import "../../../../components/layout/DashboardLayout.css";

export const EmployeesContent = () => {
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();

    const [employees, setEmployees] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [allBranches, setAllBranches] = useState([]);
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Form Data
    const [formData, setFormData] = useState({
        user_account: '',
        full_name: '',
        personal_email: '',
        company_email: '',
        phone_number: '',
        username: '',
        password: '',
        confirm_password: '',
        department: '',
        designation: '',
        role: 'employee',
        employment_type: 'fulltime employee',
        joining_date: '',
        company_id: '',
        branch: '',
        gender: 'Other',
        pay_grade: '',
        ctc: ''
    });

    const isAdmin = currentUser?.role?.toLowerCase() === 'admin';
    const isSuperAdmin = currentUser?.role?.toLowerCase() === 'superadmin' || currentUser?.role?.toUpperCase() === 'SUPER_ADMIN' || isAdmin;
    const isHR = currentUser?.role?.toLowerCase() === 'hr' || currentUser?.role?.toLowerCase() === 'fulltime';
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

                // Fetch branches
                const branchRes = await coreService.getBranches();
                const branchData = Array.isArray(branchRes) ? branchRes : (branchRes.data || branchRes.branches || []);
                setAllBranches(branchData);
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

        // Dependent dropdown logic for branches
        if (name === 'company_id') {
            const selectedCompanyId = value;
            const selectedCompany = companies.find(c => String(c.id) === String(selectedCompanyId));
            const companyName = selectedCompany ? (selectedCompany.name || selectedCompany.company_name) : '';

            // Filter branches by company_id OR company_name (depending on how branch object is structured)
            const filtered = allBranches.filter(b => 
                String(b.company_id) === String(selectedCompanyId) || 
                (b.company && String(b.company).toLowerCase() === String(companyName).toLowerCase()) ||
                (b.company_name && String(b.company_name).toLowerCase() === String(companyName).toLowerCase())
            );
            setFilteredBranches(filtered);
            setFormData(prev => ({ ...prev, company_id: value, branch: '' })); // Reset branch when company changes
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (formData.password?.trim() !== formData.confirm_password?.trim()) {
            alert("Passwords do not match. Please ensure both password fields are identical and contain no extra spaces.");
            return;
        }

        // Basic frontend unique email validation for better UX
        const emailToSubmit = (formData.personal_email || formData.company_email || formData.email || "").toLowerCase();
        const emailExists = employees.some(emp => 
            (emp.personal_email || emp.company_email || emp.email || "").toLowerCase() === emailToSubmit
        );

        if (emailExists && emailToSubmit) {
            const proceed = window.confirm(`An employee with the email ${emailToSubmit} already exists in your current view. Are you sure you want to proceed?`);
            if (!proceed) return;
        }

        try {
            if (canAddEmployee) {
                // Determine the correct company_id
                const companyId = isSuperAdmin ? formData.company_id : currentUser.company_id;
                
                // Construct final payload
                const payload = { 
                    ...formData, 
                    company_id: companyId,
                    ctc: formData.ctc ? Number(formData.ctc) : 0,
                    pay_grade: formData.pay_grade || "N/A"
                };

                await employeeSuperAdminService.createEmployee(payload);
                setShowAdd(false);
                fetchData();
                alert("Employee created successfully!");
                
                // Clear form for next use
                setFormData({
                    user_account: '', full_name: '', personal_email: '', company_email: '', phone_number: '',
                    username: '', password: '', confirm_password: '',
                    department: '', designation: '',
                    role: 'employee', employment_type: 'fulltime employee',
                    joining_date: '', company_id: currentUser?.company_id || '', branch: '',
                    pay_grade: '', ctc: ''
                });
            }
        } catch (error) {
            // Error message is already cleaned by the service
            alert("Error: " + error.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (formData.password || formData.confirm_password) {
            if (formData.password !== formData.confirm_password) {
                alert("Passwords do not match. Please ensure both password fields are identical.");
                return;
            }
        }
        try {
            if ((isSuperAdmin || isAdmin || isHR) && selectedEmployee) {
                const payload = { ...formData };
                payload.ctc = payload.ctc ? Number(payload.ctc) : 0;
                payload.pay_grade = payload.pay_grade || "N/A";
                await employeeSuperAdminService.updateEmployee(selectedEmployee.id, payload);
                setShowEdit(false);
                fetchData();
                alert("Employee updated successfully!");
            }
        } catch (error) {
            alert("Failed to update employee: " + (error.message || "Unknown error"));
        }
    };

    const handleToggleStatus = async (id) => {
        // Simplified based on user request: Action available for all administrative roles
        const canToggle = isSuperAdmin || isAdmin || isHR;
        
        try {
            if (canToggle) {
                await employeeSuperAdminService.toggleStatus(id, currentUser?.role);
                fetchData();
                alert("Status updated successfully!");
            } else {
                alert("Permission Denied: You do not have sufficient privileges to modify member records.");
            }
        } catch (error) {
            console.error("Toggle Failure:", error);
            alert(`Toggle Action Failed:\n\n${error.message}\n\nPlease check your server connectivity or permissions.`);
        }
    };

    const filteredEmployees = employees.filter(emp => {
        const query = searchTerm.toLowerCase();
        return (
            (emp.full_name || emp.name || emp.first_name || '').toLowerCase().includes(query) ||
            (emp.personal_email || emp.company_email || emp.email || '').toLowerCase().includes(query) ||
            (emp.designation || '').toLowerCase().includes(query) ||
            (emp.company_name || '').toLowerCase().includes(query)
        );
    });

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const newThisMonthCount = employees.filter(e => {
        const dateStr = e.joining_date || e.created_at || e.createdAt;
        if (!dateStr) return false;
        const date = new Date(dateStr);
        // Ensure valid date parsing before comparison
        if (isNaN(date.getTime())) return false;
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    const stats = [
        { label: 'Total Employees', count: employees.length, icon: <FaUsers />, color: '#818cf8', bg: 'rgba(129, 140, 248, 0.1)' },
        { label: 'Active Now', count: employees.filter(e => e.status === 'Active' || !e.status).length, icon: <FaCheckCircle />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
        { label: isEmployee ? 'Performance' : 'New This Month', count: isEmployee ? '95%' : newThisMonthCount, icon: <FaUserPlus />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
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
                                        setFilteredBranches([]);
                                        setFormData({
                                            user_account: '', full_name: '', personal_email: '', company_email: '', phone_number: '',
                                            username: '', password: '', confirm_password: '',
                                            department: '', designation: '',
                                            role: 'employee', employment_type: 'fulltime employee', joining_date: '',
                                            company_id: currentUser?.company_id || '', branch: '',
                                            pay_grade: '', ctc: '', gender: 'Other'
                                        });
                                        setShowAdd(true);
                                        setShowEdit(false);
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
                                                        {(emp.full_name || emp.name || 'E').charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="fw-bold text-dark">{emp.full_name || emp.name}</div>
                                                        <div className="small text-muted">ID: #{emp.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="d-flex flex-column gap-1">
                                                    <div className="small text-dark d-flex align-items-center gap-2"><FaEnvelope className="text-muted" size={12} /> {emp.personal_email || emp.company_email || emp.email}</div>
                                                    <div className="small text-muted d-flex align-items-center gap-2"><FaPhone className="text-muted" size={12} /> {emp.phone_number || emp.phone || 'No phone'}</div>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <div className="fw-bold text-dark">{emp.designation || 'Designation'}</div>
                                                <div className="small text-muted">{emp.employment_type || emp.role || 'employee'} | {emp.department || 'N/A'}</div>
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
                                                                const empCompanyId = emp.company_id || '';
                                                                const empCompanyName = emp.company_name || emp.company || '';
                                                                
                                                                // Pre-filter branches for the edit modal
                                                                const initialFiltered = allBranches.filter(b => 
                                                                    String(b.company_id) === String(empCompanyId) || 
                                                                    (b.company && String(b.company).toLowerCase() === String(empCompanyName).toLowerCase()) ||
                                                                    (b.company_name && String(b.company_name).toLowerCase() === String(empCompanyName).toLowerCase())
                                                                );
                                                                setFilteredBranches(initialFiltered);

                                                                setFormData({ 
                                                                    ...emp, 
                                                                    company_id: empCompanyId,
                                                                    full_name: emp.full_name || emp.name || '',
                                                                    personal_email: emp.personal_email || emp.email || '',
                                                                    company_email: emp.company_email || '',
                                                                    phone_number: emp.phone_number || emp.phone || '',
                                                                    password: '',
                                                                    confirm_password: '',
                                                                    pay_grade: emp.pay_grade || '',
                                                                    ctc: emp.ctc || '',
                                                                    role: emp.role || 'employee',
                                                                    employment_type: emp.employment_type || 'fulltime'
                                                                });
                                                                setShowEdit(true);
                                                            }}
                                                            style={{ background: 'rgba(129, 140, 248, 0.1)', color: '#818cf8' }}>
                                                            <FaEdit size={14} />
                                                        </button>
                                                        {(isSuperAdmin || isAdmin || isHR) && (
                                                            <button className="btn btn-sm rounded-circle p-2 border-0 shadow-sm"
                                                                onClick={() => handleToggleStatus(emp.id)}
                                                                title={emp.status === 'Inactive' ? "Activate" : "Deactivate"}
                                                                style={{ 
                                                                    background: emp.status === 'Inactive' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                                                                    color: emp.status === 'Inactive' ? '#10b981' : '#ef4444' 
                                                                }}>
                                                                {emp.status === 'Inactive' ? <FaCheckCircle size={14} /> : <FaTimesCircle size={14} />}
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
                                    <h4 className="fw-bold mb-1" style={{ color: '#0f172a' }}>{showAdd ? 'Add New Employee' : 'Edit Employee Details'}</h4>
                                    <p className="text-muted small mb-0">{showAdd ? 'Enter employee information to add to the system' : 'Modify the existing details for this member and save your changes'}</p>
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
                                            <label className="form-label fw-bold small text-muted text-uppercase">Full Name *</label>
                                            <input type="text" name="full_name" className="form-control rounded-3 p-3 bg-light border-0" required value={formData.full_name} onChange={handleInputChange} placeholder="John Doe" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Personal Email *</label>
                                            <input type="email" name="personal_email" className="form-control rounded-3 p-3 bg-light border-0" required value={formData.personal_email} onChange={handleInputChange} placeholder="john.doe@gmail.com" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Company Email *</label>
                                            <input type="email" name="company_email" className="form-control rounded-3 p-3 bg-light border-0" required value={formData.company_email} onChange={handleInputChange} placeholder="john.doe@company.com" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Phone *</label>
                                            <input type="tel" name="phone_number" className="form-control rounded-3 p-3 bg-light border-0" required value={formData.phone_number} onChange={handleInputChange} placeholder="Phone number" />
                                        </div>

                                        <div className="col-12 mt-4 pt-2">
                                            <div className="text-primary fw-bold small mb-3 border-bottom pb-2">Login Credentials</div>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Username *</label>
                                            <input type="text" name="username" className="form-control rounded-3 p-3 bg-light border-0" required value={formData.username} onChange={handleInputChange} placeholder="username / email" />
                                            <div className="small text-muted mt-1" style={{ fontSize: '0.75rem' }}>The user will use these credentials to access their account.</div>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Password *</label>
                                            <input type="password" name="password" className="form-control rounded-3 p-3 bg-light border-0" required={showAdd} value={formData.password} onChange={handleInputChange} placeholder="........" />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Confirm *</label>
                                            <input type="password" name="confirm_password" className="form-control rounded-3 p-3 bg-light border-0" required={showAdd} value={formData.confirm_password} onChange={handleInputChange} placeholder="........" />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Department</label>
                                            <select name="department" className="form-select rounded-3 p-3 bg-light border-0 shadow-none" value={formData.department} onChange={handleInputChange}>
                                                <option value="">Select Department</option>
                                                <option value="IT">IT</option>
                                                <option value="NON IT">NON IT</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Designation</label>
                                            <input type="text" name="designation" className="form-control rounded-3 p-3 bg-light border-0" value={formData.designation} onChange={handleInputChange} placeholder="Software Engineer" />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Employee Type</label>
                                            <select name="employment_type" className="form-select rounded-3 p-3 bg-light border-0 shadow-none" value={formData.employment_type} onChange={(e) => {
                                                const val = e.target.value;
                                                let newRole = 'employee';
                                                
                                                if (val.toLowerCase().includes('hr')) newRole = 'hr';
                                                else if (val.toLowerCase().includes('manager')) newRole = 'manager';
                                                else if (val.toLowerCase().includes('admin')) newRole = 'admin';
                                                
                                                setFormData({ ...formData, employment_type: val, role: newRole });
                                            }}>
                                                <option value="fulltime HR">fulltime HR</option>
                                                <option value="Intern HR">Intern HR</option>
                                                <option value="MANAGER">MANAGER</option>
                                                <option value="admin">admin</option>
                                                <option value="fulltime employee">fulltime employee</option>
                                                <option value="tech intern">tech intern</option>
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
                                                {filteredBranches.map((b, idx) => (
                                                    <option key={idx} value={b.branch_name || b.name}>{b.branch_name || b.name}</option>
                                                ))}
                                                {/* Fallback if no company selected or no branches found */}
                                                {!formData.company_id && (
                                                    <>
                                                        <option value="Main">Main Branch</option>
                                                        <option value="Regional">Regional Branch</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Gender</label>
                                            <select name="gender" className="form-select rounded-3 p-3 bg-light border-0 shadow-none" value={formData.gender} onChange={handleInputChange}>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
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

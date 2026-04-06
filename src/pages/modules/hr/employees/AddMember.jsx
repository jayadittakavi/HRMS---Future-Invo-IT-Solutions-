import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiShield, FiUsers, FiSearch, FiCheck, FiUserCheck, FiBriefcase } from 'react-icons/fi';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { permissionService } from './permission-service';
import { useAuth } from '../../../../context/AuthContext';
import { companyService } from '../../core/companies/service';
import { coreService } from '../../../../services/coreService';

const AddMember = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const newMember = location.state?.newMember || { name: 'sandhya', email: 'sandhya@23gmail.com', password: '' };

    const [selectedRole, setSelectedRole] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Dropdown Data
    const [companies, setCompanies] = useState([]);
    const [allBranches, setAllBranches] = useState([]);
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');


    const [dynamicModules, setDynamicModules] = useState([]);
    const [dynamicColumns, setDynamicColumns] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(true);
    const [existingMembers, setExistingMembers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    // Initial permissions matrix setup
    useEffect(() => {
        const fetchModules = async () => {
            try {
                let data = null;
                try {
                    data = await permissionService.getModules();
                } catch (e) {
                    console.warn("API Error getting modules:", e);
                }
                
                // Use fallback if data is missing, empty, or improperly formatted
                if (!data || !data.modules || data.modules.length === 0) {
                    console.warn("Using fallback modules data (API returned empty)");
                    data = {
                        modules: [
                            'Dashboard', 'My Team', 'Companies', 'Departments', 
                            'Employees', 'Attendance', 'Requests', 'Payroll', 
                            'Reports', 'Administration', 'Onboarding', 'Recruitment',
                            'Travel & Expenses', 'Loan', 'Financial Reports', 'Documents'
                        ],
                        actions: ['VIEW', 'CREATE', 'EDIT', 'DELETE', 'EXPORT']
                    };
                }
                
                setDynamicModules(data.modules || []);
                setDynamicColumns(data.actions || []);

                // Initialize permissions state
                const initPerms = (data.modules || []).reduce((acc, module) => {
                    acc[module] = (data.actions || []).reduce((colAcc, col) => {
                        colAcc[col] = false;
                        return colAcc;
                    }, {});
                    return acc;
                }, {});
                
                setPermissions(initPerms);
            } catch (err) {
                console.error("Error setting up matrix:", err);
            } finally {
                setLoading(false);
            }
        };

        const fetchDropdownData = async () => {
            try {
                const compRes = await coreService.getCompanies();
                setCompanies(Array.isArray(compRes) ? compRes : (compRes.data || compRes.companies || []));

                const branchRes = await coreService.getBranches();
                setAllBranches(Array.isArray(branchRes) ? branchRes : (branchRes.data || branchRes.branches || []));
            } catch (ce) {
                console.warn("Failed to load companies/branches", ce);
                
                // Fallback attempt with companyService if coreService fails
                try {
                    const compRes2 = await companyService.getAllCompanies();
                    setCompanies(Array.isArray(compRes2) ? compRes2 : (compRes2.data || compRes2.companies || []));
                } catch (e2) {
                    console.error("Fallback company fetch failed too", e2);
                }
            }
        };

        fetchModules();
        fetchDropdownData();
    }, []);

    const handleCompanyChange = (e) => {
        const companyId = e.target.value;
        setSelectedCompany(companyId);
        setSelectedBranch('');

        const comp = companies.find(c => String(c.id) === String(companyId));
        const companyName = comp ? (comp.name || comp.company_name) : '';

        const newFiltered = allBranches.filter(b => 
            String(b.company_id) === String(companyId) || 
            (b.company && String(b.company).toLowerCase() === String(companyName).toLowerCase()) ||
            (b.company_name && String(b.company_name).toLowerCase() === String(companyName).toLowerCase())
        );
        setFilteredBranches(newFiltered);
    };

    // Auto-select permissions based on role
    useEffect(() => {
        if (selectedRole === 'Employee') {
            setPermissions(prev => {
                const newPerms = { ...prev };
                
                // 1. Reset all to false first
                Object.keys(newPerms).forEach(mod => {
                    Object.keys(newPerms[mod]).forEach(act => {
                        newPerms[mod][act] = false;
                    });
                });

                // 2. Dashboard - only view action
                if (newPerms['Dashboard']) newPerms['Dashboard']['VIEW'] = true;

                // 3. Attendance - only view his data and export
                if (newPerms['Attendance']) {
                    newPerms['Attendance']['VIEW'] = true;
                    newPerms['Attendance']['EXPORT'] = true;
                }

                // 4. REQUEST (Leave, WFH) - only view his data and export
                if (newPerms['Requests']) {
                    newPerms['Requests']['VIEW'] = true;
                    newPerms['Requests']['EXPORT'] = true;
                }

                // 5. Payroll - only view his data and export
                const payrollMod = newPerms['Payroll'] ? 'Payroll' : 'Payroll & Salary';
                if (newPerms[payrollMod]) {
                    newPerms[payrollMod]['VIEW'] = true;
                    newPerms[payrollMod]['EXPORT'] = true;
                }

                // 6. Loans - view and export
                const loansMod = newPerms['Loan'] ? 'Loan' : 'Loans & Advances';
                if (newPerms[loansMod]) {
                    newPerms[loansMod]['VIEW'] = true;
                    newPerms[loansMod]['EXPORT'] = true;
                }

                // 7. Travel and expenses - view and export
                if (newPerms['Travel & Expenses']) {
                    newPerms['Travel & Expenses']['VIEW'] = true;
                    newPerms['Travel & Expenses']['EXPORT'] = true;
                }

                // 8. Administration - view, create, export
                if (newPerms['Administration']) {
                    newPerms['Administration']['VIEW'] = true;
                    newPerms['Administration']['CREATE'] = true;
                    newPerms['Administration']['EXPORT'] = true;
                }

                // 9. Documents - view create edit delete export
                if (newPerms['Documents']) {
                    newPerms['Documents']['VIEW'] = true;
                    newPerms['Documents']['CREATE'] = true;
                    newPerms['Documents']['EDIT'] = true;
                    newPerms['Documents']['DELETE'] = true;
                    newPerms['Documents']['EXPORT'] = true;
                }

                return newPerms;
            });
        }
    }, [selectedRole, dynamicModules]);

    const togglePermission = (module, action) => {
        setPermissions(prev => ({
            ...prev,
            [module]: {
                ...prev[module],
                [action]: !prev[module][action]
            }
        }));
    };

    const toggleAllRow = (module) => {
        const rowKeys = Object.keys(permissions[module]);
        const allChecked = rowKeys.every(k => permissions[module][k]);
        
        setPermissions(prev => ({
            ...prev,
            [module]: rowKeys.reduce((acc, k) => {
                acc[k] = !allChecked;
                return acc;
            }, {})
        }));
    };

    const handleAdd = async () => {
        if (!selectedRole && !selectedUserId) {
            alert("Please select a role name.");
            return;
        }
        try {
            // Transform permissions from UI format {module: {action: bool}} to backend format {module: [actions]}
            const formattedPermissions = {};
            Object.keys(permissions).forEach(module => {
                const activeActions = Object.keys(permissions[module]).filter(action => permissions[module][action]);
                if (activeActions.length > 0) {
                    formattedPermissions[module] = activeActions;
                }
            });

            const payload = {
                full_name: newMember?.name || "", 
                name: newMember?.name || "",
                email: newMember?.email || "",
                password: newMember?.password || "Default@123",
                company_id: selectedCompany || null,
                branch: selectedBranch || "",
                role: selectedRole,
                permissions: formattedPermissions,
                user_id: selectedUserId 
            };
            await permissionService.inviteMemberWithPermissions(payload, user?.role || 'admin');
            const msg = selectedUserId ? `Permissions updated successfully!` : `✅ User "${newMember.name}" has been invited!`;
            alert(msg);
            navigate('/roles-list');
        } catch (error) {
            alert(`Failed to assign role: ${error.message || error}`);
        }
    };

    const handleLoadUserPermissions = async (user_id) => {
        try {
            setLoading(true);
            const data = await permissionService.getUserPermissions(user_id);
            setSelectedRole(data.role || '');
            setSelectedUserId(user_id);
            
            // Re-map permissions from backend structure
            // Assume data.permissions looks like: { "Dashboard": ["VIEW", "EDIT"], "Employees": ["VIEW"] }
            if (data.permissions) {
                setPermissions(prev => {
                    const newPerms = { ...prev };
                    Object.keys(newPerms).forEach(mod => {
                        Object.keys(newPerms[mod]).forEach(act => {
                            newPerms[mod][act] = false; // reset
                            if (data.permissions[mod] && data.permissions[mod].includes(act)) {
                                newPerms[mod][act] = true;
                            }
                        });
                    });
                    return newPerms;
                });
            }
        } catch (err) {
            console.error("Error loading user permissions", err);
            alert("Could not load user's existing permissions.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout title="">
            <div className="container-fluid p-0 assign-role-page" style={{ backgroundColor: '#e2e8f0', minHeight: '100vh' }}>
                
                <div style={{ backgroundColor: '#e2e8f0', padding: '24px 32px' }}>
                    {/* Header Top Action Bar */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center gap-4">
                            <button 
                                className="btn rounded-pill px-4 py-2 border-0 shadow-sm d-flex align-items-center gap-2 fw-bold hover-btn"
                                onClick={() => navigate('/roles-list')}
                                style={{ backgroundColor: '#cbd5e1', color: '#1e293b' }}
                            >
                                <FiArrowLeft /> Back to Roles
                            </button>
                            
                            <div className="d-flex align-items-center gap-3">
                                <div className="p-3 rounded-4 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '56px', height: '56px', backgroundColor: '#e0e7ff' }}>
                                    <FiShield size={24} style={{ color: '#4f46e5' }} />
                                </div>
                                <div className="pt-1">
                                    <h3 className="fw-bolder mb-0 text-dark" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>
                                        Assign Role for {newMember.name}
                                    </h3>
                                    <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>
                                        Email: {newMember.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <button className="btn btn-primary rounded-pill px-5 py-2 fw-bold d-flex align-items-center gap-2 shadow" onClick={handleAdd}>
                            <FiCheck /> Add
                        </button>
                    </div>

                    <div className="row g-4">
                        {/* Left Column (Role Info & Team Members) */}
                        <div className="col-lg-4 d-flex flex-column gap-4">
                            
                            {/* Role Information Card */}
                            <div className="card border-0 rounded-4 shadow-sm p-4" style={{ backgroundColor: '#f8fafc' }}>
                                <h6 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                                    <FiShield className="text-primary" /> Role Information
                                </h6>
                                
                                <div>
                                    <label className="form-label fw-bold text-uppercase" style={{ color: '#475569', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                        ROLE NAME <span className="text-danger">*</span>
                                    </label>
                                    <select 
                                        className="form-select bg-transparent border py-3 px-3 rounded-3 fw-medium text-dark custom-select-arrow shadow-sm"
                                        style={{ borderColor: '#cbd5e1' }}
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                    >
                                        <option value="" disabled>Select a role</option>
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="Admin">Admin</option>
                                        <option value="HR">HR</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Employee">Employee</option>
                                    </select>
                                </div>
                            </div>

                            {/* Additional Employee Details Card */}
                            <div className="card border-0 rounded-4 shadow-sm p-4" style={{ backgroundColor: '#f8fafc' }}>
                                <h6 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                                    <FiBriefcase className="text-primary" /> Employee Details
                                </h6>

                                <div className="mb-3">
                                    <label className="form-label fw-bold text-uppercase" style={{ color: '#475569', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                        EMPLOYEE ID (AUTO-GENERATED)
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control bg-light text-muted border py-2 px-3 rounded-3 fw-medium"
                                        style={{ borderColor: '#cbd5e1' }}
                                        value="Auto-generated upon save" 
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold text-uppercase" style={{ color: '#475569', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                        COMPANY <span className="text-danger">*</span>
                                    </label>
                                    <select 
                                        className="form-select bg-transparent border py-2 px-3 rounded-3 fw-medium text-dark custom-select-arrow shadow-sm"
                                        style={{ borderColor: '#cbd5e1' }}
                                        value={selectedCompany}
                                        onChange={handleCompanyChange}
                                    >
                                        <option value="">Select Company</option>
                                        {companies && companies.map((c, idx) => (
                                            <option key={idx} value={c.id || c.company_id || c._id}>{c.company_name || c.name || `Company ${idx+1}`}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label fw-bold text-uppercase" style={{ color: '#475569', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                        BRANCH
                                    </label>
                                    <select 
                                        className="form-select bg-transparent border py-2 px-3 rounded-3 fw-medium text-dark custom-select-arrow shadow-sm"
                                        style={{ borderColor: '#cbd5e1' }}
                                        value={selectedBranch}
                                        onChange={(e) => setSelectedBranch(e.target.value)}
                                    >
                                        <option value="">Select Branch</option>
                                        {allBranches && allBranches.map((b, idx) => (
                                            <option key={idx} value={b.branch_name || b.name || b.id}>{b.branch_name || b.name || `Branch ${idx+1}`}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Assign Team Members Card */}
                            <div className="card border-0 rounded-4 shadow-sm p-4 flex-grow-1" style={{ backgroundColor: '#f8fafc' }}>
                                <h6 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                                    <FiUsers className="text-primary" /> Assign Team Members
                                </h6>
                                
                                <div className="position-relative mb-4">
                                    <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
                                    <input 
                                        type="text" 
                                        className="form-control bg-transparent py-2 rounded-pill ps-5 shadow-sm" 
                                        style={{ border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                                        placeholder="Search users..." 
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="members-list-wrapper">
                                    <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '0.7rem', letterSpacing: '1px', color: '#6366f1' }}>
                                        Pending Invitation
                                    </h6>
                                    
                                    {/* Selected Pending Contact */}
                                    <div className="p-3 rounded-3 mb-4 d-flex align-items-center justify-content-between cursor-pointer border" style={{ backgroundColor: '#e0f2fe', borderColor: '#bae6fd' }}>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style={{ width: '38px', height: '38px', backgroundColor: '#a5b4fc' }}>
                                                {newMember.name ? newMember.name[0].toUpperCase() : 'S'}
                                            </div>
                                            <div>
                                                <p className="fw-bold text-dark mb-0 form-label text-truncate" style={{ maxWidth: '140px' }}>
                                                    {newMember.name} <span className="text-secondary fw-normal">(New)</span>
                                                </p>
                                                <p className="text-secondary mb-0" style={{ fontSize: '0.75rem' }}>{newMember.email}</p>
                                            </div>
                                        </div>
                                        <FiCheck className="text-emerald-500 fs-5" style={{ color: '#10b981' }} />
                                    </div>

                                    <h6 className="fw-bold text-uppercase text-secondary mb-3 mt-2" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                                        Existing Members
                                    </h6>
                                    
                                    {existingMembers.map(member => (
                                        <div 
                                            key={member.user_id}
                                            className={`p-2 rounded-3 mb-2 d-flex align-items-center justify-content-between cursor-pointer ${selectedUserId === member.user_id ? 'border border-primary bg-primary bg-opacity-10' : 'hover-bg-light'}`}
                                            onClick={() => handleLoadUserPermissions(member.user_id)}
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm ${selectedUserId === member.user_id ? 'bg-primary text-white' : 'bg-transparent border text-secondary'}`} style={{ width: '38px', height: '38px' }}>
                                                    {member.initial}
                                                </div>
                                                <div>
                                                    <p className={`fw-bold mb-0 form-label ${selectedUserId === member.user_id ? 'text-primary' : 'text-secondary'}`}>{member.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Right Column - Permissions Matrix */}
                        <div className="col-lg-8">
                            <div className="card border-0 rounded-4 shadow-sm p-4 h-100" style={{ backgroundColor: '#f8fafc' }}>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h6 className="fw-bold mb-0 d-flex align-items-center gap-2 text-dark">
                                        <FiShield className="text-primary" /> Permissions Matrix
                                    </h6>
                                    <p className="text-secondary mb-0" style={{ fontSize: '0.8rem' }}>
                                        Click on a row to toggle all, or individual cells
                                    </p>
                                </div>
                                <div className="table-responsive">
                                    {loading ? (
                                        <div className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <table className="table table-borderless align-middle custom-matrix-table mb-0">
                                            <thead>
                                                <tr style={{ backgroundColor: '#e2e8f0', borderRadius: '8px' }}>
                                                    <th className="py-3 px-4 text-primary fw-bold rounded-start" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>MODULE</th>
                                                    {dynamicColumns.map(col => (
                                                        <th key={col} className="py-3 text-center text-primary fw-bold px-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>{col}</th>
                                                    ))}
                                                    <th className="py-3 text-center text-secondary fw-bold rounded-end" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>ALL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dynamicModules.map((module, idx) => {
                                                    const allChecked = Object.keys(permissions[module] || {}).length > 0 && Object.values(permissions[module]).every(Boolean);
                                                    return (
                                                        <tr key={module} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                            <td className="py-4 px-4 fw-bold text-secondary" style={{ fontSize: '0.9rem' }}>{module}</td>
                                                            {dynamicColumns.map(col => (
                                                                <td key={col} className="text-center py-4 px-1">
                                                                    <div 
                                                                        className={`permission-checkbox ${permissions[module] && permissions[module][col] ? 'checked' : ''}`}
                                                                        onClick={() => togglePermission(module, col)}
                                                                    >
                                                                        {permissions[module] && permissions[module][col] ? <FiCheck className="check-icon" style={{ strokeWidth: '3' }} size={16} /> : <span className="off-icon" style={{ fontSize: '12px' }}>x</span>}
                                                                    </div>
                                                                </td>
                                                            ))}
                                                            <td className="text-center py-4">
                                                                <div 
                                                                    className={`all-toggle-btn ${allChecked ? 'all-on text-white fw-bold' : 'all-off text-slate-400'}`}
                                                                    onClick={() => toggleAllRow(module)}
                                                                >
                                                                    {allChecked ? 'All On' : 'All Off'}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                /* Container Background override if needed */
                .page-content {
                    background-color: #e2e8f0 !important;
                }
                
                .assign-role-page .hover-btn:hover {
                    background-color: #94a3b8 !important;
                }
                .hover-bg-light:hover {
                    background-color: #f1f5f9;
                }
                .cursor-pointer {
                    cursor: pointer;
                }
                .custom-select-arrow {
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 1rem center;
                    background-size: 1em;
                }
                .custom-matrix-table th {
                    text-transform: uppercase;
                }
                .permission-checkbox {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background-color: #f8fafc;
                    border: 1.5px solid #e2e8f0;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .permission-checkbox:hover {
                    background-color: #f1f5f9;
                    border-color: #cbd5e1;
                }
                .permission-checkbox.checked {
                    background-color: #EFF6FF;
                    border-color: #dbeafe;
                }
                .check-icon {
                    color: #3b82f6;
                }
                .off-icon {
                    color: #cbd5e1;
                }
                .all-toggle-btn {
                    font-size: 0.75rem;
                    font-weight: 600;
                    padding: 6px 14px;
                    background-color: transparent;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: inline-block;
                    border-radius: 20px;
                }
                .all-toggle-btn.all-off {
                    color: #94a3b8;
                }
                .all-toggle-btn.all-off:hover {
                    background-color: #f1f5f9;
                    color: #64748b;
                }
                .all-toggle-btn.all-on {
                    background-color: #2563eb;
                }
                .all-toggle-btn.all-on:hover {
                    background-color: #1d4ed8;
                }
            `}</style>
        </DashboardLayout>
    );
};

export default AddMember;

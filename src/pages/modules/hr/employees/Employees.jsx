import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FiUserPlus, FiSearch, FiFilter, FiEdit, FiShield, 
    FiMoreVertical, FiCalendar, FiBriefcase, FiMail, FiPhone, FiCheckCircle, FiXCircle 
} from 'react-icons/fi';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { usePermissions } from '../../../../context/PermissionsContext';
import './Employees.css';

const PermissionDrawer = ({ employee, onClose, onSave }) => {
    const { roles } = usePermissions();
    const rolePermissions = roles.find(r => r.id === employee.role)?.permissions || {};
    const [permissions, setPermissions] = useState(employee.permissionOverrides || rolePermissions);

    const togglePermission = (category, moduleId) => {
        setPermissions(prev => {
            const current = prev[category] || [];
            const updated = current.includes(moduleId) 
                ? current.filter(id => id !== moduleId) 
                : [...current, moduleId];
            return { ...prev, [category]: updated };
        });
    };

    return (
        <div className="permission-drawer-overlay animate__animated animate__fadeIn" onClick={onClose}>
            <div className="permission-drawer animate__animated animate__slideInRight" onClick={e => e.stopPropagation()}>
                <div className="drawer-header border-bottom">
                    <div className="d-flex align-items-center gap-3">
                        <div className="avatar-preview">
                            <img src={employee.avatar} alt={employee.name} className="rounded-circle" width="50" height="50" />
                        </div>
                        <div>
                            <h5 className="mb-0 fw-bold">{employee.name}</h5>
                            <span className="badge bg-primary bg-opacity-10 text-primary small">Individual Permissions</span>
                        </div>
                    </div>
                    <button className="btn-close-custom" onClick={onClose}><FiXCircle size={24} /></button>
                </div>

                <div className="drawer-body">
                    <div className="alert alert-info border-0 rounded-4 mb-4 small">
                        Adjusting these permissions will override the default permissions assigned by the <strong>{employee.role}</strong> role.
                    </div>

                    {Object.entries(rolePermissions).map(([category, modules]) => (
                        <div key={category} className="perm-group mb-4">
                            <h6 className="text-uppercase fw-bold text-muted small mb-3">{category}</h6>
                            <div className="d-flex flex-wrap gap-2">
                                {modules.map(mod => {
                                    const isActive = (permissions[category] || []).includes(mod);
                                    return (
                                        <div 
                                            key={mod} 
                                            className={`perm-toggle ${isActive ? 'active' : ''}`}
                                            onClick={() => togglePermission(category, mod)}
                                        >
                                            <div className={`toggle-switch ${isActive ? 'on' : 'off'}`}></div>
                                            <span className="small fw-bold">{mod.replace(/_/g, ' ')}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="drawer-footer border-top d-flex gap-3">
                    <button className="btn btn-light rounded-pill flex-grow-1" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary rounded-pill flex-grow-1 shadow-sm" onClick={() => { onSave(employee.id, permissions); onClose(); }}>Update Permissions</button>
                </div>
            </div>
        </div>
    );
};

const Employees = () => {
    const navigate = useNavigate();
    const { employees, roles, updateEmployeePermissions } = usePermissions();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmpForPerms, setSelectedEmpForPerms] = useState(null);

    const filteredEmployees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getModulesCount = (emp) => {
        const perms = emp.permissionOverrides || roles.find(r => r.id === emp.role)?.permissions || {};
        return Object.values(perms).flat().length;
    };

    return (
        <DashboardLayout title="">
            <div className="employees-module-container">
                {/* Header Section */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Workforce Directory</h2>
                        <p className="text-muted mb-0">Manage employees, roles, and access across modules</p>
                    </div>
                    <div className="d-flex gap-3">
                        <button className="btn btn-light-glass" onClick={() => navigate('/invite-member')}>
                            <FiUserPlus className="me-2" /> Invite Employee
                        </button>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="filter-bar-glass mb-4">
                    <div className="search-input-modern">
                        <FiSearch />
                        <input 
                            type="text" 
                            placeholder="Search by name, ID or email..." 
                            className="form-control border-0 bg-transparent shadow-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-actions">
                        <button className="btn-filter"><FiFilter className="me-2" /> Filters</button>
                    </div>
                </div>

                {/* Employees Table */}
                <div className="employees-table-card shadow-sm rounded-4 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>ID</th>
                                    <th>Role & Dept</th>
                                    <th className="text-center">Assigned Modules</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Join Date</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map((emp) => (
                                    <tr key={emp.id} className="employee-row-animate">
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="emp-avatar-wrapper">
                                                    <img src={emp.avatar} alt={emp.name} className="rounded-circle border border-2 border-white shadow-sm" width="40" height="40" />
                                                    <div className={`status-indicator ${emp.status === 'Active' ? 'active' : 'invited'}`}></div>
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark">{emp.name}</div>
                                                    <div className="text-muted extra-small d-flex align-items-center gap-1">
                                                        <FiMail size={10} /> {emp.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-muted fw-bold small">{emp.id}</span>
                                        </td>
                                        <td>
                                            <div className="fw-bold text-dark small">{roles.find(r => r.id === emp.role)?.name || emp.role}</div>
                                            <div className="text-muted extra-small d-flex align-items-center gap-1">
                                                <FiBriefcase size={10} /> {emp.department}
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="module-count-badge">
                                                {getModulesCount(emp)} Modules
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <span className={`badge-status ${emp.status.toLowerCase()}`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <div className="text-muted small d-flex align-items-center justify-content-center gap-1">
                                                <FiCalendar size={12} /> {emp.joinDate}
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <button className="btn-icon-action" title="Edit Employee">
                                                    <FiEdit size={16} />
                                                </button>
                                                <button 
                                                    className="btn-icon-action security" 
                                                    title="Edit Permissions"
                                                    onClick={() => setSelectedEmpForPerms(emp)}
                                                >
                                                    <FiShield size={16} />
                                                </button>
                                                <button className="btn-icon-action" title="More Options">
                                                    <FiMoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Permission Edit Drawer */}
            {selectedEmpForPerms && (
                <PermissionDrawer 
                    employee={selectedEmpForPerms} 
                    onClose={() => setSelectedEmpForPerms(null)}
                    onSave={updateEmployeePermissions}
                />
            )}
        </DashboardLayout>
    );
};

export default Employees;

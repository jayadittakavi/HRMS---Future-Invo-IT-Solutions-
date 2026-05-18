import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FiUserPlus, FiSearch, FiFilter, FiEdit, FiShield, 
    FiMoreVertical, FiCalendar, FiBriefcase, FiMail, FiPhone, FiCheckCircle, FiXCircle, FiTrash2
} from 'react-icons/fi';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { usePermissions } from '../../../../context/PermissionsContext';
import './Employees.css';


const Employees = () => {
    const navigate = useNavigate();
    const { employees, roles, updateEmployeePermissions, removeEmployee } = usePermissions();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEmployees = employees.filter(emp => 
        (emp.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (emp.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(emp.id || '').toLowerCase().includes(searchTerm.toLowerCase())
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
                                    <th className="text-center">Dept Type</th>
                                    <th>Department</th>
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
                                            {emp.departmentType ? (
                                                <span
                                                    className="badge rounded-pill fw-bold px-2 py-1"
                                                    style={{
                                                        fontSize: '0.7rem',
                                                        background: emp.departmentType === 'IT'
                                                            ? 'linear-gradient(135deg,#6366f1,#818cf8)'
                                                            : 'linear-gradient(135deg,#10b981,#34d399)',
                                                        color: '#fff'
                                                    }}
                                                >
                                                    {emp.departmentType === 'IT' ? '💻 IT' : '📋 NON-IT'}
                                                </span>
                                            ) : (
                                                <span className="text-muted extra-small">—</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="fw-semibold text-dark small">{emp.subDepartment || emp.department || '—'}</div>
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
                                                <button 
                                                    className="btn-icon-action" 
                                                    title="Edit Employee / Permissions"
                                                    onClick={() => navigate('/add-member', { state: { newMember: { user_id: emp.id, name: emp.name, email: emp.email, role: emp.role, branch: emp.branch } } })}
                                                >
                                                    <FiEdit size={16} />
                                                </button>
                                                <button 
                                                    className="btn-icon-action security" 
                                                    title="Edit Permissions"
                                                    onClick={() => navigate('/add-member', { state: { newMember: { user_id: emp.id, name: emp.name, email: emp.email, role: emp.role, branch: emp.branch } } })}
                                                >
                                                    <FiShield size={16} />
                                                </button>
                                                <button 
                                                    className="btn-icon-action text-danger" 
                                                    title="Remove Member"
                                                    onClick={() => {
                                                        if (window.confirm(`Are you sure you want to remove ${emp.name}?`)) {
                                                            removeEmployee(emp.id);
                                                        }
                                                    }}
                                                >
                                                    <FiTrash2 size={16} />
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

        </DashboardLayout>
    );
};

export default Employees;

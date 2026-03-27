import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    MdGroups, MdAdd, MdSearch, MdArrowBack, 
    MdOutlineEngineering, MdOutlineBusinessCenter, MdAccountTree 
} from 'react-icons/md';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { employeeSuperAdminService } from '../../modules/hr/employees/superadmin-service';
import './SquadManagement.css';

const BuildSquad = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [memberSearchTerm, setMemberSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        type: 'General',
        department: 'IT',
        project: '',
        members: []
    });

    useEffect(() => {
        const fetchEmployees = async () => {
            setIsLoading(true);
            try {
                const res = await employeeSuperAdminService.getAllEmployees();
                const data = Array.isArray(res) ? res : (res.data || res.employees || []);
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
                setEmployees([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const toggleMember = (empId) => {
        setFormData(prev => {
            const isSelected = prev.members.includes(empId);
            return {
                ...prev,
                members: isSelected ? prev.members.filter(id => id !== empId) : [...prev.members, empId]
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally call an API to save the squad
        // For now, let's just show success and go back
        alert(`Squad "${formData.name}" created with ${formData.members.length} members!`);
        navigate('/dashboard/manage-squad');
    };

    return (
        <div className="squad-management-wrap">
            <div className="squad-header glass-card">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="header-content">
                        <button className="btn btn-link p-0 text-muted mb-2 d-flex align-items-center gap-2" onClick={() => navigate('/dashboard/manage-squad')}>
                            <MdArrowBack /> Back to Manage Squads
                        </button>
                        <h2 className="d-flex align-items-center gap-2" style={{ color: '#0f172a', fontWeight: 800 }}>
                            <MdGroups className="header-icon" /> Build New Squad
                        </h2>
                        <p style={{ color: '#475569', fontWeight: 500 }}>Create a new project team or departmental squad</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 row g-4">
                <div className="col-lg-8 mx-auto">
                    <div className="glass-card p-4 shadow-lg animate-zoom">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                <div className="col-md-12">
                                    <label className="form-label" style={{ color: '#64748b', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>Squad / Team Name</label>
                                    <input
                                        type="text"
                                        className="squad-input"
                                        placeholder="Enter squad name (e.g., Growth Ops, Platform Team)"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#64748b', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>Department</label>
                                    <select
                                        className="squad-input"
                                        value={formData.department}
                                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                                    >
                                        <option value="IT">IT Department</option>
                                        <option value="Non-IT">Non-IT Department</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: '#64748b', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>Squad Type</label>
                                    <select
                                        className="squad-input"
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="General">General Team</option>
                                        <option value="Project">Project Wise</option>
                                    </select>
                                </div>
                                
                                {formData.type === 'Project' && (
                                    <div className="col-md-12 animate-fadeIn">
                                        <label className="form-label" style={{ color: '#64748b', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>Associated Project</label>
                                        <input
                                            type="text"
                                            className="squad-input"
                                            placeholder="Enter project name..."
                                            value={formData.project}
                                            onChange={e => setFormData({ ...formData, project: e.target.value })}
                                            required
                                        />
                                    </div>
                                )}

                                <div className="col-md-12">
                                    <label className="form-label d-flex justify-content-between" style={{ color: '#64748b', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase' }}>
                                        Select Squad Members
                                        <span className="badge" style={{ background: '#818cf8' }}>{formData.members.length} selected</span>
                                    </label>
                                    <div className="member-selection-list">
                                        <div className="search-members mb-3">
                                            <MdSearch />
                                            <input
                                                type="text"
                                                placeholder="Search by name or ID..."
                                                className="w-100"
                                                value={memberSearchTerm}
                                                onChange={(e) => setMemberSearchTerm(e.target.value)}
                                            />
                                        </div>
                                        <div className="members-scroll" style={{ maxHeight: '400px' }}>
                                            {isLoading ? (
                                                <div className="text-center p-4">
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            ) : employees.filter(emp => {
                                                const term = memberSearchTerm.toLowerCase();
                                                const fullName = emp.name || `${emp.first_name || ''} ${emp.last_name || ''}`;
                                                return fullName.toLowerCase().includes(term) ||
                                                    (emp.employee_id || emp.id.toString()).toLowerCase().includes(term);
                                            }).map(emp => (
                                                <div
                                                    key={emp.id}
                                                    className={`member-item ${formData.members.includes(emp.id) ? 'selected' : ''}`}
                                                    onClick={() => toggleMember(emp.id)}
                                                    style={{ marginBottom: '8px', padding: '12px' }}
                                                >
                                                    <div className="emp-avatar">{(emp.name || emp.first_name || 'E').charAt(0).toUpperCase()}</div>
                                                    <div className="emp-info">
                                                        <span className="name">{emp.name || `${emp.first_name || ''} ${emp.last_name || ''}`}</span>
                                                        <span className="id">{emp.designation || 'Employee'} • ID: {emp.employee_id || emp.id}</span>
                                                    </div>
                                                    <div className="selection-indicator"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-5 d-flex gap-3">
                                <button type="button" className="cancel-pill w-100" onClick={() => navigate('/dashboard/manage-squad')}>Discard</button>
                                <button type="submit" className="create-pill w-100 py-3" style={{ fontSize: '1.1rem' }}>Create Squad</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildSquad;

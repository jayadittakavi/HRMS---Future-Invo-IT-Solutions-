import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdGroups, MdOutlineComputer, MdOutlineBusinessCenter,
    MdAdd, MdSearch, MdMoreVert, MdDelete, MdEdit,
    MdOutlineDashboard, MdGroupWork, MdAccountTree, MdOutlineEngineering
} from 'react-icons/md';
import { useAuth } from '../../../context/AuthContext';
import { employeeSuperAdminService } from '../../modules/hr/employees/superadmin-service';
import './SquadManagement.css';

const SquadManagement = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('IT'); // IT or Non-IT
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [memberSearchTerm, setMemberSearchTerm] = useState('');

    // Mock Squads for initial view
    const [squads, setSquads] = useState([
        { id: 1, name: 'Core Platform', type: 'Project', department: 'IT', project: 'HRMS Cloud', members: 8, lead: 'Sarah Wilson' },
        { id: 2, name: 'AI Integration', type: 'Project', department: 'IT', project: 'Auto-Bot', members: 5, lead: 'David Chen' },
        { id: 3, name: 'Talent Acquisition', type: 'General', department: 'Non-IT', project: '', members: 12, lead: 'Elena Rodriguez' },
        { id: 4, name: 'Finance Ops', type: 'General', department: 'Non-IT', project: '', members: 6, lead: 'James Miller' },
    ]);

    useEffect(() => {
        fetchEmployees();
    }, []);

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

    const handleCreateSquad = (e) => {
        e.preventDefault();
        const squad = {
            id: squads.length + 1,
            ...newSquad,
            members: newSquad.members.length,
            lead: 'Assigned Leader' // Mock
        };
        setSquads([...squads, squad]);
        setShowCreateModal(false);
        setNewSquad({ name: '', type: 'General', department: 'IT', project: '', members: [] });
    };

    const toggleMember = (empId) => {
        setNewSquad(prev => {
            const isSelected = prev.members.includes(empId);
            return {
                ...prev,
                members: isSelected ? prev.members.filter(id => id !== empId) : [...prev.members, empId]
            };
        });
    };

    const filteredSquads = squads.filter(s => s.department === activeTab);

    return (
        <div className="squad-management-wrap">
            <div className="squad-header glass-card">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="header-content">
                        <h2 className="d-flex align-items-center gap-2" style={{ color: '#0f172a', fontWeight: 800 }}>
                            <MdGroups className="header-icon" /> Manage Squads
                        </h2>
                        <p style={{ color: '#475569', fontWeight: 500 }}>Strategize and build project-wise performance teams</p>
                    </div>
                    <button className="build-squad-btn" onClick={() => navigate('/dashboard/build-squad')}>
                        <MdAdd /> Build New Squad
                    </button>
                </div>

                <div className="squad-stats row mt-4">
                    <div className="col-md-3">
                        <div className="stat-pill">
                            <MdGroupWork className="stat-icon purple" />
                            <div className="stat-info">
                                <h3>{squads.length}</h3>
                                <span>Total Squads</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-pill">
                            <MdOutlineComputer className="stat-icon blue" />
                            <div className="stat-info">
                                <h3>{squads.filter(s => s.department === 'IT').length}</h3>
                                <span>IT Squads</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-pill">
                            <MdOutlineBusinessCenter className="stat-icon gold" />
                            <div className="stat-info">
                                <h3>{squads.filter(s => s.department === 'Non-IT').length}</h3>
                                <span>Non-IT Squads</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stat-pill">
                            <MdAccountTree className="stat-icon green" />
                            <div className="stat-info">
                                <h3>{squads.filter(s => s.type === 'Project').length}</h3>
                                <span>Active Projects</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="squad-content-area mt-4">
                <div className="squad-tabs gap-3">
                    <button
                        className={`squad-tab ${activeTab === 'IT' ? 'active' : ''}`}
                        onClick={() => setActiveTab('IT')}
                    >
                        <MdOutlineEngineering /> IT Squads
                    </button>
                    <button
                        className={`squad-tab ${activeTab === 'Non-IT' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Non-IT')}
                    >
                        <MdOutlineBusinessCenter /> Non-IT Squads
                    </button>
                </div>

                <div className="row mt-4 g-4">
                    {filteredSquads.length > 0 ? (
                        filteredSquads.map(squad => (
                            <div className="col-md-4" key={squad.id}>
                                <div className="squad-card glass-card">
                                    <div className="card-top">
                                        <div className="type-badge">{squad.type}</div>
                                        <button className="more-btn"><MdMoreVert /></button>
                                    </div>
                                    <div className="card-main">
                                        <h4 className="mb-1" style={{ color: '#1e293b', fontWeight: 700 }}>{squad.name}</h4>
                                        {squad.type === 'Project' && (
                                            <div className="project-link">
                                                <MdAccountTree /> {squad.project}
                                            </div>
                                        )}
                                        <div className="member-count mt-3" style={{ color: '#64748b' }}>
                                            <MdGroups /> {squad.members} Members
                                        </div>
                                    </div>
                                    <div className="card-footer-squad mt-3 pt-3">
                                        <div className="leader-info">
                                            <div className="lead-avatar">{squad.lead.charAt(0)}</div>
                                            <div className="lead-text">
                                                <span className="label">Lead</span>
                                                <span className="name">{squad.lead}</span>
                                            </div>
                                        </div>
                                        <button className="view-details-btn">Details</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="empty-squads text-center p-5">
                                <MdGroups className="empty-icon" />
                                <h4 className="mt-3" style={{ color: '#1e293b' }}>No {activeTab} squads found</h4>
                                <p style={{ color: '#64748b' }}>Start building your project teams to drive results.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default SquadManagement;

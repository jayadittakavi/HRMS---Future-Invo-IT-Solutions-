import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdGroups, MdOutlineEngineering, MdOutlineBusinessCenter, MdOutlineTaskAlt, MdOutlineAssignment } from 'react-icons/md';
import './SquadManagement.css'; // Reusing some squad styles

const SquadDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [squad, setSquad] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Mock Squad Data (In real app, fetch from backend using `id`)
    useEffect(() => {
        setIsLoading(true);
        // Simulating API call
        setTimeout(() => {
            const mockData = {
                id: parseInt(id),
                name: id === '1' ? 'Core Platform' : id === '2' ? 'AI Integration' : 'Talent Acquisition',
                type: id === '3' ? 'General' : 'Project',
                department: id === '3' ? 'Non-IT' : 'IT',
                project: id === '1' ? 'HRMS Cloud' : id === '2' ? 'Auto-Bot' : '',
                lead: 'Sarah Wilson',
                members: [
                    { id: 101, name: 'Alice Smith', role: 'Frontend Developer', avatar: 'A', workDetails: 'Working on Dashboard UI refactoring and state management.', progress: 75, status: 'Active' },
                    { id: 102, name: 'Bob Johnson', role: 'Backend Developer', avatar: 'B', workDetails: 'Implementing API endpoints for Squad Management integration.', progress: 60, status: 'Active' },
                    { id: 103, name: 'Charlie Davis', role: 'QA Engineer', avatar: 'C', workDetails: 'Writing automated end-to-end tests for the new release.', progress: 90, status: 'Pending' },
                    { id: 104, name: 'Diana Prince', role: 'UX Designer', avatar: 'D', workDetails: 'Designing high-fidelity mockups for the mobile app.', progress: 40, status: 'Active' },
                ]
            };
            setSquad(mockData);
            setIsLoading(false);
        }, 500);
    }, [id]);

    if (isLoading) {
        return (
            <div className="squad-management-wrap d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!squad) return <div>Squad not found.</div>;

    return (
        <div className="squad-management-wrap">
            <div className="squad-header glass-card mb-4">
                <button className="btn btn-link text-decoration-none text-secondary p-0 mb-3 d-flex align-items-center gap-1" onClick={() => navigate('/dashboard/manage-squad')}>
                    <MdArrowBack /> Back to Squads
                </button>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div className="d-flex align-items-center gap-3 mb-2">
                            <h2 className="m-0" style={{ color: '#0f172a', fontWeight: 800 }}>{squad.name}</h2>
                            <span className={`badge ${squad.department === 'IT' ? 'bg-primary' : 'bg-warning text-dark'}`}>
                                {squad.department === 'IT' ? <MdOutlineEngineering className="me-1"/> : <MdOutlineBusinessCenter className="me-1"/>}
                                {squad.department}
                            </span>
                        </div>
                        <p style={{ color: '#475569', fontWeight: 500, margin: 0 }}>
                            {squad.type === 'Project' ? `Project: ${squad.project}` : 'General Department Team'}
                        </p>
                    </div>
                    <div className="text-end">
                        <div className="fs-5 fw-bold text-dark"><MdGroups className="me-2 text-primary" />{squad.members.length} Members</div>
                        <div className="small text-muted mt-1">Lead: <strong>{squad.lead}</strong></div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {squad.members.map((member) => (
                    <div className="col-lg-6" key={member.id}>
                        <div className="card border-0 shadow-sm rounded-4 h-100" style={{ background: '#ffffff' }}>
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-5" style={{ width: '50px', height: '50px', backgroundColor: `hsl(${member.name.length * 20}, 70%, 60%)` }}>
                                            {member.avatar}
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-1" style={{ color: '#1e293b' }}>{member.name}</h5>
                                            <span className="text-primary small fw-semibold">{member.role}</span>
                                        </div>
                                    </div>
                                    <span className={`badge ${member.status === 'Active' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}>
                                        {member.status}
                                    </span>
                                </div>
                                
                                <div className="mt-4 p-3 rounded-3" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                    <h6 className="d-flex align-items-center gap-2 fw-bold" style={{ color: '#334155', fontSize: '0.9rem' }}>
                                        <MdOutlineAssignment className="text-primary" /> Current Work Details
                                    </h6>
                                    <p className="small mb-0 mt-2" style={{ color: '#475569', lineHeight: '1.5' }}>
                                        {member.workDetails}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <div className="d-flex justify-content-between small mb-1 fw-medium" style={{ color: '#64748b' }}>
                                        <span className="d-flex align-items-center gap-1"><MdOutlineTaskAlt /> Task Progress</span>
                                        <span>{member.progress}%</span>
                                    </div>
                                    <div className="progress" style={{ height: '6px' }}>
                                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${member.progress}%` }} aria-valuenow={member.progress} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SquadDetails;

import React, { useState } from 'react';
import { MdSearch, MdEmail, MdPhone, MdMoreVert, MdPerson } from 'react-icons/md';

const TeamMembers = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data for Team Members
    const teamMembers = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Senior Developer',
            status: 'Online',
            email: 'sarah.j@futureinvo.com',
            phone: '+1 (555) 123-4567',
            department: 'Engineering',
            avatar: null // Placeholder for now
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'UI/UX Designer',
            status: 'Away',
            email: 'michael.c@futureinvo.com',
            phone: '+1 (555) 987-6543',
            department: 'Design',
            avatar: null
        },
        {
            id: 3,
            name: 'Emily Davis',
            role: 'Product Manager',
            status: 'Offline',
            email: 'emily.d@futureinvo.com',
            phone: '+1 (555) 456-7890',
            department: 'Product',
            avatar: null
        },
        {
            id: 4,
            name: 'David Wilson',
            role: 'Backend Developer',
            status: 'Online',
            email: 'david.w@futureinvo.com',
            phone: '+1 (555) 789-0123',
            department: 'Engineering',
            avatar: null
        },
        {
            id: 5,
            name: 'Jessica Lee',
            role: 'QA Engineer',
            status: 'On Leave',
            email: 'jessica.l@futureinvo.com',
            phone: '+1 (555) 234-5678',
            department: 'Quality Assurance',
            avatar: null
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Online': return 'text-success';
            case 'Away': return 'text-warning';
            case 'Offline': return 'text-secondary';
            case 'On Leave': return 'text-danger';
            default: return 'text-secondary';
        }
    };

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container p-0">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="h4 fw-bold text-dark mb-1">Team Members</h2>
                    <p className="text-secondary small mb-0">Manage and view your team details.</p>
                </div>
                <div className="d-flex gap-3">
                    <div className="position-relative">
                        <input
                            type="text"
                            placeholder="Search team..."
                            className="form-control ps-5 rounded-pill border-0 shadow-sm"
                            style={{ width: '250px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <MdSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={20} />
                    </div>
                    {/* Add Member Button - Optional for Managers */}
                    {/* <button className="btn btn-primary rounded-pill d-flex align-items-center gap-2">
                        <MdPersonAdd /> Add Member
                    </button> */}
                </div>
            </div>

            {/* Team Grid */}
            <div className="row g-4">
                {filteredMembers.map(member => (
                    <div className="col-md-6 col-lg-4 col-xl-3" key={member.id}>
                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden dashboard-card hover-lift">
                            <div className="card-body text-center p-4">
                                <div className="position-absolute top-0 end-0 p-3">
                                    <button className="btn btn-link text-secondary p-0">
                                        <MdMoreVert size={20} />
                                    </button>
                                </div>

                                <div className="mb-3 position-relative d-inline-block">
                                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto" style={{ width: '80px', height: '80px' }}>
                                        <MdPerson size={40} className="text-secondary" />
                                    </div>
                                    <span className={`position-absolute bottom-0 end-0 p-1 border border-white rounded-circle bg-white`}>
                                        <span className={`d-block rounded-circle ${getStatusColor(member.status).replace('text-', 'bg-')}`} style={{ width: '12px', height: '12px' }}></span>
                                    </span>
                                </div>

                                <h5 className="fw-bold mb-1">{member.name}</h5>
                                <p className="text-primary small fw-semibold mb-3">{member.role}</p>

                                <div className="d-flex justify-content-center gap-2 mb-4">
                                    <span className={`badge bg-opacity-10 ${getStatusColor(member.status).replace('text-', 'bg-')} ${getStatusColor(member.status)}`}>
                                        {member.status}
                                    </span>
                                    <span className="badge bg-light text-secondary border">
                                        {member.department}
                                    </span>
                                </div>

                                <div className="d-flex flex-column gap-2 text-start bg-light p-3 rounded-3">
                                    <div className="d-flex align-items-center gap-2 text-secondary small">
                                        <MdEmail className="text-primary" />
                                        <span className="text-truncate">{member.email}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 text-secondary small">
                                        <MdPhone className="text-primary" />
                                        <span>{member.phone}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-top">
                                    <button className="btn btn-sm btn-outline-primary w-100 rounded-pill">View Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamMembers;

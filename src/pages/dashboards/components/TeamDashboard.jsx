import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaUsers, FaUserCheck, FaUserClock, FaUserPlus,
    FaChartLine, FaTrophy, FaCalendarAlt, FaSearch,
    FaEllipsisV, FaCommentDots, FaVideo, FaPhone
} from 'react-icons/fa';
import {
    MdOutlineWavingHand, MdOutlineEmojiEvents,
    MdOutlineAutoGraph, MdOutlineGroupWork
} from 'react-icons/md';
import { SimpleDonutChart, SimpleLineChart } from '../../../components/charts/CustomCharts';
import './TeamDashboard.css';

const TeamDashboard = ({ role }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const stats = [
        { label: 'Total Members', value: 42, icon: <FaUsers />, color: 'var(--primary-color)', bg: 'rgba(109, 40, 217, 0.1)', trend: '+3' },
        { label: 'Present Now', value: 38, icon: <FaUserCheck />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', trend: '92%' },
        { label: 'On Leave', value: 2, icon: <FaUserClock />, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', trend: '-1' },
        { label: 'Remote / WFH', value: 12, icon: <MdOutlineGroupWork />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', trend: 'Up' },
    ];

    const teamMembers = [
        { id: 1, name: 'Sarah Wilson', role: 'UI/UX Lead', status: 'online', avatar: 'https://i.pravatar.cc/150?u=sarah', performance: 95 },
        { id: 2, name: 'James Miller', role: 'Frontend Dev', status: 'wfh', avatar: 'https://i.pravatar.cc/150?u=james', performance: 88 },
        { id: 3, name: 'Elena Rodriguez', role: 'HR Manager', status: 'away', avatar: 'https://i.pravatar.cc/150?u=elena', performance: 92 },
        { id: 4, name: 'David Chen', role: 'Backend Expert', status: 'online', avatar: 'https://i.pravatar.cc/150?u=david', performance: 97 },
        { id: 5, name: 'Aisha Khan', role: 'DevOps Engineer', status: 'offline', avatar: 'https://i.pravatar.cc/150?u=aisha', performance: 85 },
        { id: 6, name: 'Tom Hardy', role: 'QA Lead', status: 'online', avatar: 'https://i.pravatar.cc/150?u=tom', performance: 90 },
    ];

    const upcomingEvents = [
        { title: 'Project Launch', date: 'Tomorrow', type: 'Project', icon: <FaTrophy /> },
        { title: 'Sarah\'s Birthday', date: 'Oct 15', type: 'Personal', icon: <FaCalendarAlt /> },
        { title: 'Team Outing', date: 'Next Friday', type: 'Social', icon: <FaUsers /> },
    ];

    const engagementData = [65, 78, 82, 75, 88, 92, 85, 90, 95, 88, 92, 94];

    const [activeFilter, setActiveFilter] = useState('All');

    const filteredMembers = teamMembers.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === 'All' ||
            (activeFilter === 'Developers' && m.role.toLowerCase().includes('dev')) ||
            (activeFilter === 'Manager' && m.role.toLowerCase().includes('manager'));
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="team-dashboard p-1">
            {/* Simple Modern Header */}
            <div className="team-header-modern">
                <div className="team-header-info">
                    <h1 className="fw-bold">My Team <MdOutlineEmojiEvents className="text-primary ms-1" /></h1>
                    <p>Manage your squad and track performance metrics</p>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <div className="team-search-modern d-none d-md-block">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Find a team member..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-primary rounded-pill px-4 btn-sm fw-bold d-flex align-items-center gap-2"
                        onClick={() => navigate('/dashboard/manage-squad')}
                    >
                        <FaUsers /> Manage Squad
                    </button>
                    <button
                        className="btn btn-outline-primary rounded-pill px-4 btn-sm fw-bold d-flex align-items-center gap-2"
                        onClick={() => navigate('/recruitment')}
                    >
                        <FaUserPlus /> Hire Talent
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="row g-4 mb-5">
                {stats.map((stat, i) => (
                    <div className="col-md-3 col-sm-6" key={i}>
                        <div className="stat-card-premium">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div className="stat-icon-wrapper shadow-sm" style={{ backgroundColor: stat.bg, color: stat.color }}>
                                    {stat.icon}
                                </div>
                                <div className="text-end">
                                    <span className={`badge rounded-pill ${stat.trend.includes('+') || stat.trend.includes('Up') || stat.trend.includes('%') ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`} style={{ fontSize: '0.7rem' }}>
                                        {stat.trend}
                                    </span>
                                    <div className="mini-text text-muted mt-1">vs last month</div>
                                </div>
                            </div>
                            <h2 className="fw-bold mb-1 mt-2">{stat.value}</h2>
                            <p className="text-secondary small fw-medium mb-0">{stat.label}</p>
                            <div className="progress mt-3" style={{ height: '4px', backgroundColor: 'rgba(0,0,0,0.05)' }}>
                                <div className="progress-bar" style={{ width: i === 1 ? '92%' : '70%', backgroundColor: stat.color }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4 mb-5">
                {/* Team Members Section */}
                <div className="col-lg-8">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="section-title mb-0"><MdOutlineGroupWork /> Team Superstars</h4>
                        <div className="d-flex gap-2">
                            <button
                                className={`btn btn-sm rounded-pill px-3 ${activeFilter === 'All' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                onClick={() => setActiveFilter('All')}
                            >
                                All
                            </button>
                            <button
                                className={`btn btn-sm rounded-pill px-3 ${activeFilter === 'Developers' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                onClick={() => setActiveFilter('Developers')}
                            >
                                Developers
                            </button>
                            <button
                                className={`btn btn-sm rounded-pill px-3 ${activeFilter === 'Manager' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                onClick={() => setActiveFilter('Manager')}
                            >
                                Manager
                            </button>
                        </div>
                    </div>
                    <div className="row g-3">
                        {filteredMembers.map(member => (
                            <div className="col-md-4 col-sm-6" key={member.id}>
                                <div className="member-card">
                                    <div className="dropdown position-absolute top-0 end-0 p-2">
                                        <button className="btn btn-link text-secondary p-0" data-bs-toggle="dropdown">
                                            <FaEllipsisV />
                                        </button>
                                        <ul className="dropdown-menu shadow-sm">
                                            <li><button className="dropdown-item small" onClick={() => navigate('/employee-directory')}>View Profile</button></li>
                                            <li><button className="dropdown-item small" onClick={() => navigate('/helpdesk')}>Send Message</button></li>
                                            <li><button className="dropdown-item small" onClick={() => navigate('/daily-task')}>Task Assignment</button></li>
                                        </ul>
                                    </div>
                                    <img src={member.avatar} alt={member.name} className="member-avatar" />
                                    <span className={`status-indicator status-${member.status}`}></span>
                                    <h6 className="fw-bold mb-1">{member.name}</h6>
                                    <p className="text-secondary small mb-3">{member.role}</p>
                                    <div className="d-flex justify-content-center gap-2">
                                        <button className="btn btn-sm btn-light border p-2" title="Chat"><FaCommentDots className="text-primary" /></button>
                                        <button className="btn btn-sm btn-light border p-2" title="Call"><FaPhone className="text-success" /></button>
                                        <button className="btn btn-sm btn-light border p-2" title="Video"><FaVideo className="text-danger" /></button>
                                    </div>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-between small mb-1">
                                            <span>Performance</span>
                                            <span className="fw-bold">{member.performance}%</span>
                                        </div>
                                        <div className="engagement-bar">
                                            <div className="engagement-progress" style={{ width: `${member.performance}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance & Events */}
                <div className="col-lg-4">
                    {/* Team Engagement Chart */}
                    <div className="stat-card-premium mb-4">
                        <h5 className="section-title"><MdOutlineAutoGraph /> Team Resilience</h5>
                        <p className="text-secondary small mb-4">Consistency score over the last month.</p>
                        <div className="py-2">
                            <SimpleLineChart data={engagementData} height="150px" color="var(--primary-color)" />
                        </div>
                        <div className="d-flex justify-content-between mt-3 text-center">
                            <div>
                                <h6 className="fw-bold mb-0">94%</h6>
                                <p className="text-muted mini-text mb-0">Current</p>
                            </div>
                            <div>
                                <h6 className="fw-bold mb-0">82%</h6>
                                <p className="text-muted mini-text mb-0">Average</p>
                            </div>
                            <div>
                                <h6 className="fw-bold mb-0">98%</h6>
                                <p className="text-muted mini-text mb-0">Peek</p>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Section */}
                    <div className="stat-card-premium">
                        <h5 className="section-title"><MdOutlineEmojiEvents /> Team Highlights</h5>
                        <div className="events-list">
                            {upcomingHolidays().map((event, i) => (
                                <div className="d-flex align-items-center gap-3 p-2 mb-3 border-bottom last-border-none" key={i}>
                                    <div className="stat-icon-wrapper mb-0 shadow-sm" style={{ width: '40px', height: '40px', fontSize: '1rem', backgroundColor: i % 2 === 0 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: i % 2 === 0 ? 'var(--primary-color)' : '#f59e0b' }}>
                                        {i % 2 === 0 ? <FaTrophy /> : <FaCalendarAlt />}
                                    </div>
                                    <div>
                                        <h6 className="fw-bold mb-0 small">{event.name}</h6>
                                        <p className="text-muted mini-text mb-0">{event.date}</p>
                                    </div>
                                    <span className="ms-auto badge bg-light text-dark border small">{event.type || 'Event'}</span>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-outline-primary btn-sm w-100 mt-2">View Wall of Fame</button>
                    </div>
                </div>
            </div>

            {/* Recent Team Activity */}
            <div className="stat-card-premium mb-4">
                <h4 className="section-title"><MdOutlineWavingHand /> Recent Activity Feed</h4>
                <div className="table-responsive">
                    <table className="table premium-table align-middle">
                        <tbody>
                            <tr>
                                <td width="50">
                                    <div className="avatar px-1 bg-primary-light text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>JD</div>
                                </td>
                                <td>
                                    <span className="fw-bold">John Doe</span> completed the <span className="text-primary">Q3 Performance Milestone</span>
                                </td>
                                <td className="text-secondary small">2 hours ago</td>
                                <td className="text-end">
                                    <span className="badge-soft badge-soft-success">Milestone</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="avatar px-1 bg-success-light text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>SW</div>
                                </td>
                                <td>
                                    <span className="fw-bold">Sarah Wilson</span> started working from <span className="text-blue">Zonal Office (Remote)</span>
                                </td>
                                <td className="text-secondary small">4 hours ago</td>
                                <td className="text-end">
                                    <span className="badge-soft badge-soft-info">Remote</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="avatar px-1 bg-warning-light text-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>AK</div>
                                </td>
                                <td>
                                    <span className="fw-bold">Aisha Khan</span> reached a <span className="text-orange">2 Year Anniversary</span> with the team!
                                </td>
                                <td className="text-secondary small">Yesterday</td>
                                <td className="text-end">
                                    <span className="badge-soft badge-soft-warning">Celebration</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Helper for upcoming events
function upcomingHolidays() {
    return [
        { name: 'Sarah\'s Work Anniversary', date: 'Oct 15', type: 'Anniversary' },
        { name: 'Team Hackathon', date: 'Oct 20', type: 'Event' },
        { name: 'Monthly Review', date: 'Oct 25', type: 'Work' },
        { name: 'Product Release', date: 'Oct 28', type: 'Work' }
    ];
}

export default TeamDashboard;

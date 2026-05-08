import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaUsers, FaUserCheck, FaUserClock, FaUserPlus,
    FaChartLine, FaTrophy, FaCalendarAlt, FaSearch,
    FaEllipsisV, FaCommentDots, FaVideo, FaPhone
} from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import {
    MdOutlineWavingHand, MdOutlineEmojiEvents,
    MdOutlineAutoGraph, MdOutlineGroupWork
} from 'react-icons/md';
import { SimpleDonutChart, SimpleLineChart } from '../../../components/charts/CustomCharts';
import './TeamDashboard.css';
import { teamService } from './teamService';

const TeamDashboard = ({ role }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteData, setInviteData] = useState({ name: '', email: '', company_email: '', password: '', confirm_password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [stats, setStats] = useState([
        { label: 'Total Members', value: 0, icon: <FaUsers />, color: 'var(--primary-color)', bg: 'rgba(109, 40, 217, 0.1)', trend: '0' },
        { label: 'Active Now', value: 0, icon: <FaUserCheck />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', trend: '0%' },
        { label: 'Pending', value: 0, icon: <FaUserClock />, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', trend: '0' },
        { label: 'Admins', value: 0, icon: <MdOutlineGroupWork />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', trend: '0' },
    ]);

    const [teamMembers, setTeamMembers] = useState([]);
    const [engagementData, setEngagementData] = useState([0, 0, 0, 0, 0, 0]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [sData, superData, resData] = await Promise.all([
                teamService.getStats(role),
                teamService.getSuperstars(role),
                teamService.getResilience(role)
            ]);

            // Map stats
            if (sData) {
                setStats([
                    { label: 'Total Members', value: sData.total_members || 0, icon: <FaUsers />, color: 'var(--primary-color)', bg: 'rgba(109, 40, 217, 0.1)', trend: sData.member_trend || '+0' },
                    { label: 'Active Now', value: sData.present || 0, icon: <FaUserCheck />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', trend: sData.present_pct || '0%' },
                    { label: 'Pending', value: sData.pending || 0, icon: <FaUserClock />, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', trend: sData.leave_trend || '0' },
                    { label: 'Admins', value: sData.admins || 0, icon: <MdOutlineGroupWork />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', trend: sData.remote_trend || '0' },
                ]);
            }

            if (Array.isArray(superData)) setTeamMembers(superData);
            if (Array.isArray(resData)) setEngagementData(resData);
            
        } catch (err) {
            console.error("Failed to fetch team data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [activeFilter, setActiveFilter] = useState('All');

    const filteredMembers = teamMembers.filter(m => {
        const matchesSearch = (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || (m.role || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === 'All' ||
            (activeFilter === 'Developers' && (m.role || '').toLowerCase().includes('dev')) ||
            (activeFilter === 'Manager' && (m.role || '').toLowerCase().includes('manager'));
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
                    {(role === 'superadmin' || role === 'admin') && (
                        <>
                            <button
                                className="btn btn-primary rounded-pill px-4 btn-sm fw-bold d-flex align-items-center gap-2 shadow-sm"
                                onClick={() => setShowInviteModal(true)}
                                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderColor: 'transparent' }}
                            >
                                <FaUserPlus /> Invite Member
                            </button>
                            <button
                                className="btn btn-outline-primary rounded-pill px-4 btn-sm fw-bold d-flex align-items-center gap-2"
                                onClick={() => navigate('/dashboard/manage-squad')}
                            >
                                <FaUsers /> Manage Squad
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="row g-4 mb-5">
                {stats.map((stat, i) => (
                    <div className="col-md-3 col-sm-6" key={i}>
                        <div className={`stat-card-premium ${i % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`}>
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
                    <div className="stat-card-premium animate-float mb-4">
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
                    <div className="stat-card-premium animate-float-delayed">
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



            {/* Invite Member Custom Modal */}
            {showInviteModal && (
                <div className="custom-modal-backdrop">
                    <div className="custom-invite-card">
                        <h4 className="fw-bolder mb-4 custom-modal-title">Add New Member</h4>
                        
                        <div className="mb-4">
                            <label className="fw-bold mb-2 custom-label">Full Name</label>
                            <input type="text" className="form-control custom-input" placeholder="Enter full name" value={inviteData.name} onChange={e => setInviteData({...inviteData, name: e.target.value})} />
                        </div>
                        
                        <div className="mb-4">
                            <label className="fw-bold mb-2 custom-label">Email Address</label>
                            <input type="email" className="form-control custom-input" placeholder="Enter email" value={inviteData.email} onChange={e => setInviteData({...inviteData, email: e.target.value})} />
                        </div>

                        <div className="mb-4">
                            <label className="fw-bold mb-2 custom-label">Company Mail</label>
                            <input type="email" className="form-control custom-input" placeholder="Enter company mail" value={inviteData.company_email} onChange={e => setInviteData({...inviteData, company_email: e.target.value})} />
                        </div>
                        
                        <div className="mb-4">
                            <label className="fw-bold mb-2 custom-label d-flex align-items-center gap-1">
                                Password <span className="custom-light-text">(will be sent to employee via email)</span>
                            </label>
                            <div className="position-relative">
                                <input type={showPassword ? "text" : "password"} className="form-control custom-input" placeholder="Set a temporary password" value={inviteData.password} onChange={e => setInviteData({...inviteData, password: e.target.value})} style={{ paddingRight: '40px' }} />
                                <button type="button" className="btn position-absolute top-50 end-0 translate-middle-y border-0 shadow-none bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FiEyeOff size={18} className="text-secondary" /> : <FiEye size={18} className="text-secondary" />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="fw-bold mb-2 custom-label">Confirm Password</label>
                            <div className="position-relative">
                                <input type={showConfirmPassword ? "text" : "password"} className="form-control custom-input" placeholder="Confirm temporary password" value={inviteData.confirm_password} onChange={e => setInviteData({...inviteData, confirm_password: e.target.value})} style={{ paddingRight: '40px' }} />
                                <button type="button" className="btn position-absolute top-50 end-0 translate-middle-y border-0 shadow-none bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FiEyeOff size={18} className="text-secondary" /> : <FiEye size={18} className="text-secondary" />}
                                </button>
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <button className="btn btn-link text-decoration-none custom-cancel p-0" onClick={() => setShowInviteModal(false)}>Cancel</button>
                            <button className="btn btn-primary custom-submit" style={{ backgroundColor: '#6d28d9' }} onClick={() => { 
                                if (!inviteData.email && !inviteData.company_email) {
                                    alert("Please enter at least one email address.");
                                    return;
                                }
                                if (inviteData.password !== inviteData.confirm_password) {
                                    alert("Passwords do not match.");
                                    return;
                                }
                                
                                setShowInviteModal(false); 
                                navigate('/add-member', { state: { newMember: inviteData } }); 
                            }}>
                                Roles & Permissions &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .custom-modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(15, 23, 42, 0.35);
                    backdrop-filter: blur(3px);
                    z-index: 1050;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .custom-invite-card {
                    background-color: #f7f6ec; /* Off-white tint matched closely to image */
                    border-radius: 16px;
                    padding: 40px;
                    width: 100%;
                    max-width: 480px;
                    box-shadow: 0 24px 48px rgba(0,0,0,0.12);
                    animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes slideUpFade {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .custom-modal-title {
                    color: #0f172a;
                    font-family: 'Georgia', serif; /* Serif font mapped from screenshot */
                    font-size: 1.5rem;
                    letter-spacing: -0.5px;
                }
                .custom-label {
                    color: #475569;
                    font-size: 0.82rem;
                    letter-spacing: 0.3px;
                }
                .custom-light-text {
                    color: #64748b;
                    font-weight: 500;
                    font-size: 0.75rem;
                    letter-spacing: 0;
                }
                .custom-input {
                    background-color: transparent;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 10px;
                    padding: 12px 16px;
                    font-size: 0.95rem;
                    color: #334155;
                    box-shadow: none;
                    transition: border-color 0.2s;
                }
                .custom-input:focus {
                    border-color: #94a3b8;
                    box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.1);
                    background-color: #ffffff;
                }
                .custom-input::placeholder {
                    color: #94a3b8;
                }
                .custom-cancel {
                    color: #94a3b8;
                    font-weight: 600;
                    font-size: 0.95rem;
                }
                .custom-cancel:hover {
                    color: #64748b;
                }
                .custom-submit {
                    background-color: #3b82f6;
                    border: none;
                    border-radius: 8px;
                    padding: 10px 24px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
                }
                .custom-submit:hover {
                    background-color: #2563eb;
                }
            `}</style>
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

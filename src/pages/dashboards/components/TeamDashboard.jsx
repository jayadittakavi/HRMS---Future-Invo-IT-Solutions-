import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaUsers, FaUserCheck, FaUserClock, FaUserPlus,
    FaChartLine, FaTrophy, FaCalendarAlt, FaSearch,
    FaEllipsisV, FaCommentDots, FaVideo, FaPhone,
    FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaVolumeMute,
    FaPhoneSlash, FaDesktop, FaPaperPlane, FaTimes, FaKeyboard
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
        { label: 'Pending Invites', value: 0, icon: <FaUserClock />, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', trend: '0' },
        { label: 'Admins', value: 0, icon: <MdOutlineGroupWork />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', trend: '0' },
    ]);

    const [teamMembers, setTeamMembers] = useState([]);
    const [engagementData, setEngagementData] = useState([0, 0, 0, 0, 0, 0]);
    const [loading, setLoading] = useState(true);

    // Communication Modal States
    const [activeChatMember, setActiveChatMember] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [typedMessage, setTypedMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const [activeCallMember, setActiveCallMember] = useState(null);
    const [callState, setCallState] = useState('connecting'); // connecting, ringing, connected
    const [callDuration, setCallDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeakerOn, setIsSpeakerOn] = useState(true);

    const [activeVideoMember, setActiveVideoMember] = useState(null);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [videoDuration, setVideoDuration] = useState(0);

    // Call duration timer
    useEffect(() => {
        let interval = null;
        if (activeCallMember && callState === 'connected') {
            interval = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        } else {
            setCallDuration(0);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeCallMember, callState]);

    // Video duration timer
    useEffect(() => {
        let interval = null;
        if (activeVideoMember) {
            interval = setInterval(() => {
                setVideoDuration(prev => prev + 1);
            }, 1000);
        } else {
            setVideoDuration(0);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeVideoMember]);

    const openCall = (member) => {
        setActiveCallMember(member);
        setCallState('connecting');
        setIsMuted(false);
        setIsSpeakerOn(true);

        const ringTimeout = setTimeout(() => {
            setCallState('ringing');
            
            const connectTimeout = setTimeout(() => {
                setCallState('connected');
            }, 1500);
            
            window._connectTimeout = connectTimeout;
        }, 1200);

        window._ringTimeout = ringTimeout;
    };

    const closeCall = () => {
        clearTimeout(window._ringTimeout);
        clearTimeout(window._connectTimeout);
        setActiveCallMember(null);
        setCallState('connecting');
    };

    const openVideo = (member) => {
        setActiveVideoMember(member);
        setIsVideoMuted(false);
        setIsAudioMuted(false);
        setIsScreenSharing(false);
    };

    const openChat = (member) => {
        setActiveChatMember(member);
        setTypedMessage('');
        setIsTyping(false);

        const roleLower = (member.role || '').toLowerCase();
        let initialMessages = [];

        if (roleLower.includes('hr')) {
            initialMessages = [
                { sender: 'them', text: `Hi! I'm ${member.name} from HR. Let me know if you have any queries about onboarding, payroll structure, or active department policies!`, time: '10:00 AM' },
                { sender: 'them', text: "Also, I've updated the Q2 squad permissions list. Please check it.", time: '10:02 AM' }
            ];
        } else if (roleLower.includes('manager')) {
            initialMessages = [
                { sender: 'them', text: `Hey! ${member.name} here. Let's sync up briefly on the active performance goals and our squad resilience metrics.`, time: '09:30 AM' },
                { sender: 'them', text: "Please review the task assignments before the EOD review.", time: '09:31 AM' }
            ];
        } else if (roleLower.includes('dev') || roleLower.includes('engineer') || roleLower.includes('it')) {
            initialMessages = [
                { sender: 'them', text: "Hey! Just deployed the latest release build. Everything is tested and staging is updated.", time: 'Yesterday' },
                { sender: 'them', text: "Let me know when you want to run through the new dashboard permissions code.", time: '10:15 AM' }
            ];
        } else {
            initialMessages = [
                { sender: 'them', text: `Hello! I'm ${member.name}. Glad to connect with you. Let me know if you need help with any tasks!`, time: '10:00 AM' },
                { sender: 'them', text: "Feel free to drop a message here anytime.", time: '10:05 AM' }
            ];
        }

        setChatMessages(initialMessages);
    };

    const handleSendMessage = (e) => {
        if (e) e.preventDefault();
        if (!typedMessage.trim()) return;

        const userMsg = { sender: 'me', text: typedMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setChatMessages(prev => [...prev, userMsg]);
        const currentTyped = typedMessage;
        setTypedMessage('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const replies = [
                "Understood! I'll take a look at it right away. 👍",
                "Thanks for letting me know. I will verify the HRMS database and get back to you.",
                "Sounds like a plan. Let's schedule a quick call later if needed.",
                "Perfect! I am updating the squad records on my side.",
                "Awesome! I'll get back to you with the results in a bit."
            ];
            
            let replyText = replies[Math.floor(Math.random() * replies.length)];
            const lowerMsg = currentTyped.toLowerCase();
            if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
                replyText = `Hello! Hope you are having a wonderful day. Let me know how I can help!`;
            } else if (lowerMsg.includes('call') || lowerMsg.includes('meeting') || lowerMsg.includes('video')) {
                replyText = `Absolutely! You can click the Call or Video Call icon right on my superstar card to start a sync!`;
            }

            const partnerReply = {
                sender: 'them',
                text: replyText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setChatMessages(prev => [...prev, partnerReply]);
        }, 1500);
    };

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [sData, superData, resData] = await Promise.all([
                teamService.getStats(role).catch(() => null),
                teamService.getSuperstars(role).catch(() => []),
                teamService.getResilience(role).catch(() => [88, 92, 90, 94, 91, 95])
            ]);

            // Merge local mocked employees and pending invites
            const localMocks = JSON.parse(localStorage.getItem('mockEmployees') || '[]');
            const pendingInvites = JSON.parse(localStorage.getItem('pendingInvites') || '[]');
            const userPermissions = JSON.parse(localStorage.getItem('userPermissions') || '{}');

            // STRICT DEDUPLICATION SYSTEM BY EMAIL & NAME
            const uniqueMap = new Map();

            const addUnique = (emp, source, index) => {
                const email = (emp.email || emp.company_email || '').toLowerCase().trim();
                const name = (emp.name || emp.full_name || '').toLowerCase().trim();
                const key = email || name;
                if (!key) return;

                if (!uniqueMap.has(key)) {
                    uniqueMap.set(key, { emp, source, index });
                } else {
                    const existing = uniqueMap.get(key);
                    uniqueMap.set(key, {
                        emp: { ...existing.emp, ...emp },
                        source: existing.source,
                        index: existing.index
                    });
                }
            };

            // Order of additions to ensure data merging preference
            localMocks.forEach((emp, i) => addUnique(emp, 'localMock', i));
            pendingInvites.forEach((emp, i) => addUnique(emp, 'pendingInvite', i));
            if (Array.isArray(superData)) {
                superData.forEach((emp, i) => addUnique(emp, 'api', i));
            }

            const uniqueList = Array.from(uniqueMap.values());

            const mappedSuperstars = uniqueList.map(({ emp, source, index }, i) => {
                const emailKey = (emp.email || emp.company_email || '').toLowerCase().trim();
                const extraPerm = userPermissions[emailKey] || {};

                const finalDeptType = emp.departmentType || extraPerm.departmentType || (emp.department === 'HR' ? 'NON-IT' : 'IT');
                const finalDept = emp.subDepartment || emp.department || extraPerm.subDepartment || 'General';

                const colors = [
                    'linear-gradient(135deg, #6366f1, #818cf8)',
                    'linear-gradient(135deg, #ec4899, #f43f5e)',
                    'linear-gradient(135deg, #10b981, #34d399)',
                    'linear-gradient(135deg, #f59e0b, #d97706)',
                    'linear-gradient(135deg, #3b82f6, #60a5fa)',
                    'linear-gradient(135deg, #8b5cf6, #a78bfa)'
                ];
                const charCodeSum = (emp.name || emp.full_name || 'EE').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const gradient = colors[charCodeSum % colors.length];

                return {
                    id: emp.id || `member-${i}-${Date.now()}`,
                    email: emailKey,
                    name: emp.name || emp.full_name || 'Team Member',
                    role: emp.role || emp.designation || 'Specialist',
                    departmentType: finalDeptType,
                    department: finalDept,
                    branch: emp.branch || 'Head Office',
                    status: emp.status || 'Active',
                    performance: emp.performance || Math.floor(Math.random() * (98 - 86 + 1)) + 86,
                    gradient: gradient,
                    initials: (emp.name || emp.full_name || 'TM').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                };
            });

            // Synchronize Stats Grid accurately with deduplicated figures
            const totalCount = mappedSuperstars.length;
            const activeCount = mappedSuperstars.filter(m => m.status === 'Active').length;
            const pendingCount = pendingInvites.length;
            const adminsCount = mappedSuperstars.filter(m => (m.role || '').toLowerCase().includes('admin')).length;

            setStats([
                { label: 'Total Members', value: sData?.total_members || totalCount, icon: <FaUsers />, color: 'var(--primary-color)', bg: 'rgba(109, 40, 217, 0.1)', trend: sData?.member_trend || `+${mappedSuperstars.length}` },
                { label: 'Active Now', value: sData?.present || activeCount, icon: <FaUserCheck />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', trend: sData?.present_pct || '100%' },
                { label: 'Pending Invites', value: sData?.pending || pendingCount, icon: <FaUserClock />, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', trend: `${pendingCount} Left` },
                { label: 'Admins', value: sData?.admins || adminsCount, icon: <MdOutlineGroupWork />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', trend: 'System' },
            ]);

            setTeamMembers(mappedSuperstars);
            if (Array.isArray(resData)) setEngagementData(resData);

        } catch (err) {
            console.error("Failed to fetch team data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        window.addEventListener('localDataUpdated', fetchData);
        return () => window.removeEventListener('localDataUpdated', fetchData);
    }, []);

    const [activeFilter, setActiveFilter] = useState('All');

    const filteredMembers = teamMembers.filter(m => {
        const nameVal = (m.name || '').toLowerCase();
        const roleVal = (m.role || '').toLowerCase();
        const deptVal = (m.department || '').toLowerCase();

        const matchesSearch = nameVal.includes(searchTerm.toLowerCase()) ||
                             roleVal.includes(searchTerm.toLowerCase()) ||
                             deptVal.includes(searchTerm.toLowerCase());

        let matchesFilter = false;

        if (activeFilter === 'All') {
            matchesFilter = true;
        } else if (activeFilter === 'Developers') {
            matchesFilter = roleVal.includes('dev') || roleVal.includes('engineer') || roleVal.includes('software') ||
                            deptVal.includes('dev') || deptVal.includes('engineer') || deptVal.includes('software') ||
                            deptVal.includes('it') || roleVal.includes('coder');
        } else if (activeFilter === 'HR') {
            matchesFilter = roleVal.includes('hr') || deptVal.includes('hr');
        } else if (activeFilter === 'Managers') {
            matchesFilter = roleVal.includes('manager') || deptVal.includes('manager');
        } else if (activeFilter === 'Designers') {
            matchesFilter = roleVal.includes('designer') || roleVal.includes('ui') || roleVal.includes('ux') ||
                            deptVal.includes('designer') || deptVal.includes('ui') || deptVal.includes('ux');
        } else if (activeFilter === 'Marketing') {
            matchesFilter = roleVal.includes('marketing') || deptVal.includes('marketing');
        } else if (activeFilter === 'QA') {
            matchesFilter = roleVal.includes('qa') || roleVal.includes('tester') || roleVal.includes('quality') ||
                            deptVal.includes('qa') || deptVal.includes('tester') || deptVal.includes('quality');
        }

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
                                    <span className={`badge rounded-pill ${stat.trend.includes('+') || stat.trend.includes('Up') || stat.trend.includes('%') || stat.trend.includes('Left') ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`} style={{ fontSize: '0.7rem' }}>
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
                        <div className="d-flex gap-1 flex-wrap">
                            {['All', 'Developers', 'HR', 'Managers', 'Designers', 'Marketing', 'QA'].map(filter => (
                                <button
                                    key={filter}
                                    className={`btn btn-xs rounded-pill px-3 py-1 ${activeFilter === filter ? 'btn-primary' : 'btn-outline-secondary'}`}
                                    onClick={() => setActiveFilter(filter)}
                                    style={{ fontSize: '0.75rem', fontWeight: '600' }}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="row g-3">
                        {filteredMembers.length === 0 ? (
                            <div className="col-12 text-center py-5">
                                <div className="text-muted">No superstars found in this category</div>
                            </div>
                        ) : (
                            filteredMembers.map(member => (
                                <div className="col-md-4 col-sm-6" key={member.id}>
                                    <div className="member-card position-relative p-4 text-center rounded-3 bg-white border border-light shadow-sm" style={{ transition: 'all 0.3s ease' }}>
                                        <div className="dropdown position-absolute top-0 end-0 p-2">
                                            <button className="btn btn-link text-secondary p-0" data-bs-toggle="dropdown" style={{ boxShadow: 'none' }}>
                                                <FaEllipsisV />
                                            </button>
                                            <ul className="dropdown-menu shadow-sm">
                                                <li><button className="dropdown-item small" onClick={() => navigate('/employee-directory')}>View Profile</button></li>
                                                <li><button className="dropdown-item small" onClick={() => openChat(member)}>Send Message</button></li>
                                                <li><button className="dropdown-item small" onClick={() => navigate('/employee-directory')}>Task Assignment</button></li>
                                            </ul>
                                        </div>

                                        <div className="d-flex justify-content-center mb-3">
                                            <div className="position-relative">
                                                {member.avatar ? (
                                                    <img src={member.avatar} alt={member.name} className="member-avatar rounded-circle shadow-sm" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                ) : (
                                                    <div 
                                                        className="member-avatar rounded-circle shadow-sm d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
                                                        style={{ background: member.gradient, width: '80px', height: '80px', fontSize: '1.5rem', letterSpacing: '0.5px' }}
                                                    >
                                                        {member.initials}
                                                    </div>
                                                )}
                                                <span 
                                                    className="position-absolute bottom-0 end-0 border border-white rounded-circle"
                                                    style={{ 
                                                        width: '14px', 
                                                        height: '14px', 
                                                        backgroundColor: '#10b981',
                                                        display: 'block'
                                                    }}
                                                ></span>
                                            </div>
                                        </div>

                                        <h6 className="fw-bold text-dark mb-1">{member.name}</h6>
                                        <div className="text-secondary small fw-medium mb-2">{member.role}</div>

                                        {/* Dynamic Badges */}
                                        <div className="d-flex justify-content-center gap-1 flex-wrap mb-3">
                                            <span 
                                                className="badge rounded-pill fw-bold text-white"
                                                style={{
                                                    fontSize: '0.65rem',
                                                    background: member.departmentType === 'IT'
                                                        ? 'linear-gradient(135deg,#6366f1,#818cf8)'
                                                        : 'linear-gradient(135deg,#10b981,#34d399)',
                                                }}
                                            >
                                                {member.departmentType === 'IT' ? '💻 IT' : '📋 NON-IT'}
                                            </span>
                                            <span className="badge bg-light text-secondary border rounded-pill fw-bold" style={{ fontSize: '0.65rem' }}>
                                                🏢 {member.branch}
                                            </span>
                                            <span className="badge bg-purple bg-opacity-10 text-purple rounded-pill fw-bold" style={{ fontSize: '0.65rem', color: '#8b5cf6', backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
                                                {member.performance >= 95 ? '🏆 Star' : member.performance >= 90 ? '🚀 Elite' : '🌟 Specialist'}
                                            </span>
                                        </div>

                                        <div className="d-flex justify-content-center gap-2 mb-3">
                                            <button className="btn btn-sm btn-light border p-2 superstar-action-btn" title="Chat" onClick={() => openChat(member)}><FaCommentDots className="text-primary" /></button>
                                            <button className="btn btn-sm btn-light border p-2 superstar-action-btn" title="Call" onClick={() => openCall(member)}><FaPhone className="text-success" /></button>
                                            <button className="btn btn-sm btn-light border p-2 superstar-action-btn" title="Video" onClick={() => openVideo(member)}><FaVideo className="text-danger" /></button>
                                        </div>

                                        <div className="mt-2 text-start pt-2 border-top border-light">
                                            <div className="d-flex justify-content-between small mb-1">
                                                <span className="text-muted mini-text">Performance Score</span>
                                                <span className="fw-bold text-dark mini-text">{member.performance}%</span>
                                            </div>
                                            <div className="progress" style={{ height: '5px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '10px' }}>
                                                <div 
                                                    className="progress-bar rounded-pill" 
                                                    style={{ 
                                                        width: `${member.performance}%`, 
                                                        background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' 
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Performance & Events */}
                <div className="col-lg-4">
                    {/* Team Engagement Chart */}
                    <div className="stat-card-premium compact-card animate-float mb-3">
                        <h5 className="section-title"><MdOutlineAutoGraph /> Team Resilience</h5>
                        <p className="text-secondary small mb-2">Consistency score over the last month.</p>
                        <div className="py-1">
                            <SimpleLineChart data={engagementData} height="95px" color="var(--primary-color)" suffix="%" />
                        </div>
                        <div className="d-flex justify-content-between mt-2 text-center">
                            <div>
                                <h6 className="fw-bold mb-0 small">94%</h6>
                                <p className="text-muted mini-text mb-0">Current</p>
                            </div>
                            <div>
                                <h6 className="fw-bold mb-0 small">82%</h6>
                                <p className="text-muted mini-text mb-0">Average</p>
                            </div>
                            <div>
                                <h6 className="fw-bold mb-0 small">98%</h6>
                                <p className="text-muted mini-text mb-0">Peek</p>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Section */}
                    <div className="stat-card-premium compact-card animate-float-delayed">
                        <h5 className="section-title"><MdOutlineEmojiEvents /> Team Highlights</h5>
                        <div className="events-list">
                            {upcomingHolidays().slice(0, 3).map((event, i) => (
                                <div className="d-flex align-items-center gap-2 py-1 mb-2 border-bottom last-border-none" key={i} style={{ fontSize: '0.82rem' }}>
                                    <div className="stat-icon-wrapper mb-0 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', fontSize: '0.85rem', borderRadius: '8px', backgroundColor: i % 2 === 0 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: i % 2 === 0 ? 'var(--primary-color)' : '#f59e0b' }}>
                                        {i % 2 === 0 ? <FaTrophy /> : <FaCalendarAlt />}
                                    </div>
                                    <div>
                                        <h6 className="fw-bold mb-0 small" style={{ fontSize: '0.8rem' }}>{event.name}</h6>
                                        <p className="text-muted mini-text mb-0" style={{ fontSize: '0.7rem' }}>{event.date}</p>
                                    </div>
                                    <span className="ms-auto badge bg-light text-dark border rounded-pill" style={{ fontSize: '0.62rem', padding: '2px 8px' }}>{event.type || 'Event'}</span>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-outline-primary btn-sm w-100 mt-1" style={{ fontSize: '0.75rem', padding: '4px' }}>View Wall of Fame</button>
                    </div>
                </div>
            </div>

            {/* Live Chat Modal */}
            {activeChatMember && (
                <div className="comms-modal-backdrop" onClick={() => setActiveChatMember(null)}>
                    <div className="chat-modal-card animate-slide-up" onClick={e => e.stopPropagation()}>
                        <div className="chat-modal-header d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                                <div className="chat-avatar-wrapper position-relative">
                                    <div className="chat-avatar d-flex align-items-center justify-content-center text-white fw-bold" style={{ background: activeChatMember.gradient }}>
                                        {activeChatMember.initials}
                                    </div>
                                    <span className="chat-status-dot"></span>
                                </div>
                                <div>
                                    <h5 className="chat-header-name fw-bold mb-0">{activeChatMember.name}</h5>
                                    <span className="chat-header-role text-secondary small">{activeChatMember.role}</span>
                                </div>
                            </div>
                            <button className="chat-close-btn btn p-1 d-flex align-items-center justify-content-center" onClick={() => setActiveChatMember(null)}>
                                <FaTimes />
                            </button>
                        </div>
                        
                        <div className="chat-modal-body d-flex flex-column gap-3 p-3">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`chat-message-row d-flex ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}>
                                    <div className={`chat-message-bubble ${msg.sender === 'me' ? 'sender-me' : 'sender-them'}`}>
                                        <p className="mb-1">{msg.text}</p>
                                        <span className="chat-message-time">{msg.time}</span>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="chat-message-row d-flex justify-content-start">
                                    <div className="chat-message-bubble sender-them chat-typing-bubble">
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <form className="chat-modal-footer d-flex gap-2 p-3 border-top" onSubmit={handleSendMessage}>
                            <input 
                                type="text" 
                                className="form-control chat-input" 
                                placeholder="Type a message..."
                                value={typedMessage}
                                onChange={e => setTypedMessage(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary chat-send-btn d-flex align-items-center justify-content-center">
                                <FaPaperPlane />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Audio Call Modal */}
            {activeCallMember && (
                <div className="comms-modal-backdrop dark-theme">
                    <div className="call-modal-card animate-slide-up text-center">
                        <div className="call-radar-wrapper my-5 d-flex justify-content-center">
                            <div className={`call-avatar-pulse ${callState === 'connected' ? 'connected-pulse' : 'ringing-pulse'}`}>
                                <div className="call-avatar-large d-flex align-items-center justify-content-center text-white fw-bold" style={{ background: activeCallMember.gradient }}>
                                    {activeCallMember.initials}
                                </div>
                            </div>
                        </div>

                        <h4 className="call-name text-white fw-bold mb-1">{activeCallMember.name}</h4>
                        <p className="call-role text-secondary mb-4">{activeCallMember.role}</p>

                        <div className="call-status-badge mb-5">
                            {callState === 'connecting' && <span className="badge rounded-pill bg-secondary bg-opacity-20 text-secondary px-3 py-2 fw-medium letter-spacing-1">CONNECTING...</span>}
                            {callState === 'ringing' && <span className="badge rounded-pill bg-warning bg-opacity-20 text-warning px-3 py-2 fw-medium letter-spacing-1 pulsing-badge">RINGING...</span>}
                            {callState === 'connected' && <span className="badge rounded-pill bg-success bg-opacity-20 text-success px-4 py-2 fw-bold letter-spacing-1">{formatTime(callDuration)}</span>}
                        </div>

                        {callState === 'connected' && (
                            <div className="call-voice-waves d-flex justify-content-center gap-1 mb-5">
                                <div className="voice-wave-bar"></div>
                                <div className="voice-wave-bar wave-delayed-1"></div>
                                <div className="voice-wave-bar wave-delayed-2"></div>
                                <div className="voice-wave-bar wave-delayed-3"></div>
                                <div className="voice-wave-bar wave-delayed-2"></div>
                                <div className="voice-wave-bar wave-delayed-1"></div>
                                <div className="voice-wave-bar"></div>
                            </div>
                        )}

                        <div className="call-controls-row d-flex justify-content-center align-items-center gap-4 mb-4">
                            <button 
                                className={`btn call-control-btn border-0 shadow-none d-flex align-items-center justify-content-center ${isMuted ? 'active-mute' : 'inactive-mute'}`} 
                                onClick={() => setIsMuted(!isMuted)}
                                title={isMuted ? "Unmute Mic" : "Mute Mic"}
                            >
                                {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                            </button>
                            
                            <button 
                                className="btn call-hangup-btn bg-danger text-white border-0 shadow-none d-flex align-items-center justify-content-center" 
                                onClick={closeCall}
                                title="End Call"
                            >
                                <FaPhoneSlash />
                            </button>

                            <button 
                                className={`btn call-control-btn border-0 shadow-none d-flex align-items-center justify-content-center ${isSpeakerOn ? 'active-speaker' : 'inactive-speaker'}`} 
                                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                                title={isSpeakerOn ? "Turn Off Speaker" : "Turn On Speaker"}
                            >
                                {isSpeakerOn ? <FaVolumeUp /> : <FaVolumeMute />}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Video Meeting Modal */}
            {activeVideoMember && (
                <div className="comms-modal-backdrop dark-theme full-viewport">
                    <div className="video-meeting-container animate-fade-in">
                        {/* Status bar */}
                        <div className="video-meeting-top-bar d-flex justify-content-between align-items-center p-3">
                            <div className="video-meeting-info">
                                <span className="badge bg-danger rounded-pill px-3 py-2 fw-bold d-flex align-items-center gap-2">
                                    <span className="live-rec-dot"></span> LIVE SQUAD MEETING
                                </span>
                            </div>
                            <div className="video-meeting-timer text-white fw-bold px-3 py-2 rounded-3 bg-dark bg-opacity-40 backdrop-blur">
                                {formatTime(videoDuration)}
                            </div>
                        </div>

                        {/* Partner Main Video Screen */}
                        <div className="video-main-screen d-flex flex-column align-items-center justify-content-center text-center">
                            {isVideoMuted ? (
                                <div className="video-placeholder-avatar d-flex flex-column align-items-center justify-content-center">
                                    <div className="video-avatar d-flex align-items-center justify-content-center text-white fw-bold shadow-lg" style={{ background: activeVideoMember.gradient, width: '130px', height: '130px', fontSize: '2.5rem' }}>
                                        {activeVideoMember.initials}
                                    </div>
                                    <h4 className="text-white fw-bold mt-4 mb-1">{activeVideoMember.name}</h4>
                                    <p className="text-secondary small">{activeVideoMember.role} (Camera Paused)</p>
                                </div>
                            ) : (
                                <div className="video-active-feed position-relative w-100 h-100 d-flex align-items-center justify-content-center">
                                    {/* Glassmorphic simulated dynamic profile feed */}
                                    <div className="video-active-feed-glowing-wrapper text-center">
                                        <div className="video-avatar pulsing-video-avatar d-flex align-items-center justify-content-center text-white fw-bold mx-auto shadow-lg" style={{ background: activeVideoMember.gradient, width: '120px', height: '120px', fontSize: '2.3rem' }}>
                                            {activeVideoMember.initials}
                                        </div>
                                        <h4 className="text-white fw-bolder mt-4 mb-1">{activeVideoMember.name}</h4>
                                        <p className="text-success small fw-bold d-flex align-items-center justify-content-center gap-2 mt-2">
                                            <span className="live-rec-dot active-green-dot"></span> Active Camera Stream
                                        </p>
                                    </div>
                                    <div className="video-feed-overlay-name">{activeVideoMember.name} ({activeVideoMember.role})</div>
                                </div>
                            )}
                        </div>

                        {/* Local PIP Cam Feed */}
                        <div className="video-pip-screen shadow-lg rounded-3 border border-dark overflow-hidden">
                            {isAudioMuted ? (
                                <div className="pip-placeholder d-flex align-items-center justify-content-center text-white bg-dark w-100 h-100">
                                    <FaMicrophoneSlash className="text-danger" />
                                </div>
                            ) : (
                                <div className="pip-active bg-dark w-100 h-100 d-flex align-items-center justify-content-center position-relative">
                                    <div className="chat-avatar d-flex align-items-center justify-content-center text-white fw-bold" style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)', width: '40px', height: '40px', fontSize: '0.9rem' }}>
                                        ME
                                    </div>
                                    <span className="pip-small-label">You</span>
                                </div>
                            )}
                        </div>

                        {/* Bottom meeting controls panel */}
                        <div className="video-meeting-controls-panel d-flex justify-content-center align-items-center gap-3 p-4">
                            <button 
                                className={`btn video-panel-btn d-flex align-items-center justify-content-center ${isAudioMuted ? 'btn-danger' : 'btn-dark'}`}
                                onClick={() => setIsAudioMuted(!isAudioMuted)}
                                title={isAudioMuted ? "Unmute Audio" : "Mute Audio"}
                            >
                                {isAudioMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                            </button>

                            <button 
                                className={`btn video-panel-btn d-flex align-items-center justify-content-center ${isVideoMuted ? 'btn-danger' : 'btn-dark'}`}
                                onClick={() => setIsVideoMuted(!isVideoMuted)}
                                title={isVideoMuted ? "Turn On Camera" : "Turn Off Camera"}
                            >
                                {isVideoMuted ? <FaVideo className="text-danger" /> : <FaVideo />}
                            </button>

                            <button 
                                className={`btn video-panel-btn d-flex align-items-center justify-content-center ${isScreenSharing ? 'btn-success' : 'btn-dark'}`}
                                onClick={() => setIsScreenSharing(!isScreenSharing)}
                                title={isScreenSharing ? "Stop Screen Share" : "Share Screen"}
                            >
                                <FaDesktop />
                            </button>

                            <button 
                                className="btn video-panel-hangup btn-danger rounded-circle d-flex align-items-center justify-content-center ms-3 shadow-lg"
                                onClick={() => setActiveVideoMember(null)}
                                title="Leave Meeting"
                            >
                                <FaPhoneSlash />
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                /* Premium Interactive Comms Modals */
                .comms-modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    z-index: 1500;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .comms-modal-backdrop.dark-theme {
                    background: rgba(10, 15, 30, 0.92);
                }
                .comms-modal-backdrop.full-viewport {
                    width: 100%;
                    height: 100%;
                }

                /* Superstars action buttons */
                .superstar-action-btn {
                    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
                }
                .superstar-action-btn:hover {
                    transform: scale(1.18);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    background-color: #f8fafc !important;
                }

                /* Live Chat CSS */
                .chat-modal-card {
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 20px;
                    width: 440px;
                    max-width: 90vw;
                    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
                    border: 1px solid rgba(226, 232, 240, 0.8);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    max-height: 85vh;
                }
                .chat-modal-header {
                    padding: 18px 24px;
                    border-bottom: 1px solid #f1f5f9;
                    background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
                }
                .chat-avatar-wrapper {
                    width: 42px;
                    height: 42px;
                }
                .chat-avatar {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    font-size: 1rem;
                }
                .chat-status-dot {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 11px;
                    height: 11px;
                    background-color: #10b981;
                    border: 2px solid #ffffff;
                    border-radius: 50%;
                }
                .chat-header-name {
                    font-size: 0.98rem;
                    color: #0f172a;
                }
                .chat-header-role {
                    font-size: 0.78rem;
                    display: block;
                }
                .chat-close-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    color: #94a3b8;
                    border: none;
                    background: #f1f5f9;
                    transition: all 0.2s ease;
                }
                .chat-close-btn:hover {
                    color: #475569;
                    background: #e2e8f0;
                    transform: rotate(90deg);
                }
                .chat-modal-body {
                    flex: 1;
                    overflow-y: auto;
                    min-height: 340px;
                    max-height: 400px;
                    background-color: #f8fafc;
                }
                .chat-message-bubble {
                    max-width: 78%;
                    padding: 10px 14px;
                    border-radius: 16px;
                    font-size: 0.88rem;
                    line-height: 1.4;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
                }
                .chat-message-bubble.sender-me {
                    background: linear-gradient(135deg, #6d28d9, #4f46e5);
                    color: #ffffff;
                    border-bottom-right-radius: 4px;
                }
                .chat-message-bubble.sender-them {
                    background: #ffffff;
                    color: #334155;
                    border: 1px solid #edf2f7;
                    border-bottom-left-radius: 4px;
                }
                .chat-message-time {
                    font-size: 0.65rem;
                    opacity: 0.6;
                    display: block;
                    text-align: right;
                }
                .chat-input {
                    border-radius: 12px;
                    padding: 10px 16px;
                    border: 1.5px solid #e2e8f0;
                    font-size: 0.9rem;
                    box-shadow: none;
                    transition: border-color 0.2s ease;
                }
                .chat-input:focus {
                    border-color: #6d28d9;
                    background: #ffffff;
                }
                .chat-send-btn {
                    background: linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%);
                    border: none;
                    border-radius: 12px;
                    width: 44px;
                    height: 44px;
                    flex-shrink: 0;
                    color: white;
                    transition: all 0.2s ease;
                }
                .chat-send-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 4px 10px rgba(109, 40, 217, 0.25);
                }

                /* Typing Indicator Dot Animation */
                .chat-typing-bubble {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding: 12px 16px;
                }
                .typing-dot {
                    width: 6px;
                    height: 6px;
                    background-color: #94a3b8;
                    border-radius: 50%;
                    animation: dotsBlink 1.4s infinite both;
                }
                .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                .typing-dot:nth-child(3) { animation-delay: 0.4s; }

                @keyframes dotsBlink {
                    0%, 100% { opacity: 0.2; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }

                /* Audio Call UI styles */
                .call-modal-card {
                    width: 380px;
                    max-width: 90vw;
                    background: linear-gradient(185deg, #111827 0%, #030712 100%);
                    border-radius: 30px;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8);
                    padding: 30px;
                }
                .call-avatar-large {
                    width: 110px;
                    height: 110px;
                    border-radius: 50%;
                    font-size: 2.2rem;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
                .call-avatar-pulse {
                    position: relative;
                    border-radius: 50%;
                    display: inline-block;
                }
                .call-avatar-pulse.ringing-pulse {
                    animation: glowingPulse 1.8s infinite;
                }
                .call-avatar-pulse.connected-pulse {
                    animation: greenPulsing 2s infinite;
                }
                @keyframes glowingPulse {
                    0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.3); }
                    70% { box-shadow: 0 0 0 25px rgba(245, 158, 11, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
                }
                @keyframes greenPulsing {
                    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.35); }
                    70% { box-shadow: 0 0 0 30px rgba(16, 185, 129, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }

                .call-role {
                    letter-spacing: 0.5px;
                }
                .letter-spacing-1 {
                    letter-spacing: 1.5px;
                }
                .pulsing-badge {
                    animation: pulseFade 1.2s infinite;
                }
                @keyframes pulseFade {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }

                /* Call Controls */
                .call-control-btn {
                    width: 54px;
                    height: 54px;
                    border-radius: 50%;
                    font-size: 1.2rem;
                    transition: all 0.2s ease;
                }
                .call-control-btn.inactive-mute, .call-control-btn.inactive-speaker {
                    background: rgba(255, 255, 255, 0.08);
                    color: white;
                }
                .call-control-btn.active-mute {
                    background: #ef4444;
                    color: white;
                }
                .call-control-btn.active-speaker {
                    background: #10b981;
                    color: white;
                }
                .call-control-btn:hover {
                    transform: scale(1.1);
                    background: rgba(255, 255, 255, 0.15);
                }
                .call-hangup-btn {
                    width: 66px;
                    height: 66px;
                    border-radius: 50%;
                    font-size: 1.6rem;
                    transition: all 0.2s ease;
                    box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
                }
                .call-hangup-btn:hover {
                    transform: scale(1.15) rotate(135deg);
                    background-color: #dc2626 !important;
                }

                /* Simulated Voice Waves */
                .call-voice-waves {
                    height: 40px;
                }
                .voice-wave-bar {
                    width: 4px;
                    background: #10b981;
                    border-radius: 4px;
                    animation: voiceWave 1.2s infinite ease-in-out;
                }
                .wave-delayed-1 { animation-delay: 0.15s; }
                .wave-delayed-2 { animation-delay: 0.3s; }
                .wave-delayed-3 { animation-delay: 0.45s; }

                @keyframes voiceWave {
                    0%, 100% { height: 10px; }
                    50% { height: 42px; }
                }

                /* Video Call Layout */
                .video-meeting-container {
                    width: 100vw;
                    height: 100vh;
                    background-color: #0b0f19;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                }
                .video-meeting-top-bar {
                    z-index: 10;
                    background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
                }
                .live-rec-dot {
                    width: 8px;
                    height: 8px;
                    background-color: #ef4444;
                    border-radius: 50%;
                    display: inline-block;
                    animation: pulseFade 1s infinite;
                }
                .live-rec-dot.active-green-dot {
                    background-color: #10b981;
                }
                .video-main-screen {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                }
                .video-active-feed {
                    background: radial-gradient(circle, #1e1b4b 0%, #030712 100%);
                }
                .pulsing-video-avatar {
                    animation: purpleMeetingGlow 2.5s infinite alternate;
                }
                @keyframes purpleMeetingGlow {
                    0% { box-shadow: 0 0 20px rgba(109, 40, 217, 0.3); }
                    100% { box-shadow: 0 0 60px rgba(109, 40, 217, 0.7); }
                }
                .video-feed-overlay-name {
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(10px);
                    padding: 8px 16px;
                    border-radius: 10px;
                    color: white;
                    font-size: 0.85rem;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
                .video-placeholder-avatar {
                    background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
                    width: 100%;
                    height: 100%;
                }
                .video-pip-screen {
                    position: absolute;
                    bottom: 120px;
                    right: 30px;
                    width: 150px;
                    height: 105px;
                    border-radius: 12px;
                    z-index: 10;
                    border: 1.5px solid rgba(255, 255, 255, 0.1);
                    background-color: #1e293b;
                }
                .pip-small-label {
                    position: absolute;
                    bottom: 6px;
                    right: 8px;
                    font-size: 0.65rem;
                    background: rgba(0, 0, 0, 0.5);
                    padding: 2px 6px;
                    border-radius: 4px;
                    color: white;
                }
                .video-meeting-controls-panel {
                    z-index: 10;
                    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
                }
                .video-panel-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    font-size: 1.15rem;
                    transition: all 0.2s ease;
                }
                .video-panel-btn:hover {
                    transform: scale(1.1);
                }
                .video-panel-hangup {
                    width: 60px;
                    height: 60px;
                    font-size: 1.4rem;
                    transition: all 0.25s ease;
                }
                .video-panel-hangup:hover {
                    transform: scale(1.15) rotate(135deg);
                }

                /* Custom Backdrop for Modal Transitions */
                .animate-slide-up {
                    animation: slideUpFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes slideUpFadeIn {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .animate-fade-in {
                    animation: fadeInEffect 0.3s ease-out forwards;
                }
                @keyframes fadeInEffect {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                /* Original Styles */
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
                    background-color: #f7f6ec;
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
                    font-family: 'Georgia', serif;
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
                .compact-card {
                    padding: 1rem !important;
                }
                .compact-card .section-title {
                    margin-bottom: 0.25rem !important;
                    font-size: 1.05rem !important;
                }
                .compact-card p.small {
                    margin-bottom: 0.5rem !important;
                    font-size: 0.78rem !important;
                }
                @media (max-width: 991.98px) {
                    .compact-card {
                        margin-bottom: 1rem;
                    }
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

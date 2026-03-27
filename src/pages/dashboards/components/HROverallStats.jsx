import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleBarChart, SimpleDonutChart, SimpleLineChart } from '../../../components/charts/CustomCharts';
import { FaUsers, FaUserPlus, FaChalkboardTeacher, FaChartLine, FaUmbrellaBeach, FaUserCheck, FaSmile, FaVenusMars, FaBirthdayCake } from 'react-icons/fa';
import { employeeSuperAdminService } from '../../modules/hr/employees/superadmin-service';

const HROverallStats = () => {
    const navigate = useNavigate();
    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        const fetchStaffCount = async () => {
            try {
                const employees = await employeeSuperAdminService.getAllEmployees();
                setEmployeeCount(Array.isArray(employees) ? employees.length : 0);
            } catch (error) {
                console.error("Error fetching staff count:", error);
            }
        };
        fetchStaffCount();
    }, []);

    const rawRecruitmentData = [
        { label: 'Applied', value: 150, color: '#94a3b8' },
        { label: 'Screening', value: 80, color: '#38bdf8' },
        { label: 'Interview', value: 30, color: '#facc15' },
        { label: 'Offer', value: 12, color: '#4ade80' },
        { label: 'Hired', value: 8, color: '#16a34a' },
    ];

    const recruitmentFunnel = rawRecruitmentData.map((item, index, arr) => {
        const totalApplied = arr[0].value;
        const prevValue = index > 0 ? arr[index - 1].value : item.value;
        const conversion = index > 0 ? ((item.value / prevValue) * 100).toFixed(0) : 100;
        const ofTotal = ((item.value / totalApplied) * 100).toFixed(0);

        return {
            ...item,
            topLabel: `${item.value}`,
            subLabel: index === 0 ? '100% Total' : `${conversion}% Conv.`
        };
    });

    const teamGrowthData = [0, 0, 0, 0, 0, employeeCount]; 

    const handleJoinMeeting = (role) => {
        alert(`Starting video session for ${role} position...`);
    };

    return (
        <>
            {/* Top Stats Cards */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Total Staff', value: employeeCount.toLocaleString(), icon: <FaUsers />, color: 'bg-gradient-purple', path: '/employee-directory', sub: 'Active head count' },
                    { label: 'Open Positions', value: '8', icon: <FaUserPlus />, color: 'bg-gradient-orange', path: '/recruitment', sub: '3 Critical' },
                    { label: 'Onboarding', value: '3', icon: <FaChalkboardTeacher />, color: 'bg-gradient-blue', path: '/onboarding', sub: 'In progress' },
                    { label: 'Team Performance', value: '92%', icon: <FaChartLine />, color: 'bg-gradient-green', path: '/performance-reviews', sub: 'Highly Productive' },
                    { label: 'Pending Leaves', value: '12', icon: <FaUmbrellaBeach />, color: 'bg-gradient-cyan', path: '/leave-requests', sub: 'Requires Review' },
                    { label: 'Staff Wellbeing', value: '95%', icon: <FaSmile />, color: 'bg-gradient-pink', path: '/performance-reviews', sub: 'Engagement Score' },
                ].map((stat, index) => (
                    <div className="col-md-2 col-6" key={index}>
                        <div
                            className={`dashboard-card ${stat.color} hover-lift text-white p-3 h-100 shadow-sm border-0`}
                            onClick={() => navigate(stat.path)}
                            style={{
                                cursor: 'pointer',
                                borderRadius: '24px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <div className="d-flex align-items-center mb-3">
                                <div className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: '52px',
                                        height: '52px',
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        backdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                                    }}>
                                    <span style={{ fontSize: '1.4rem', color: '#ffffff' }}>{stat.icon}</span>
                                </div>
                            </div>
                            <h6 className="dashboard-card-title text-white mb-1 opacity-90 fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>{stat.label}</h6>
                            <h3 className="dashboard-value text-white mb-0 fw-bold" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em' }}>{stat.value}</h3>
                            <p className="small mb-0 opacity-75 mt-1" style={{ fontSize: '0.6rem' }}>{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section: Bar, Line */}
            <div className="row g-4 mb-4">
                {/* Bar Chart - Recruitment Funnel */}
                <div className="col-md-6">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title">Recruitment Funnel</h6>
                        <div className="py-2">
                            <SimpleBarChart data={recruitmentFunnel} height="240px" />
                        </div>
                    </div>
                </div>

                {/* Line Chart - Team Growth */}
                <div className="col-md-6">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title">Team Growth Trend</h6>
                        <div className="py-3">
                            <SimpleLineChart data={teamGrowthData} height="240px" color="#10b981" />
                        </div>
                        <div className="text-center small text-muted">
                            Current Headcount: <span className="fw-bold text-success">{employeeCount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tables Section */}
            <div className="row g-4">
                <div className="col-md-8">
                    <div className="dashboard-card">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="dashboard-card-title mb-0">Recent Applications</h6>
                            <button
                                className="btn btn-sm btn-link text-primary text-decoration-none small fw-bold p-0"
                                onClick={() => navigate('/recruitment')}
                            >
                                View All
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="text-secondary small border-0 py-2">Candidate</th>
                                        <th className="text-secondary small border-0 py-2">Job Role</th>
                                        <th className="text-secondary small border-0 py-2">Applied Date</th>
                                        <th className="text-secondary small border-0 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Alice Cooper', role: 'Frontend Developer', date: 'May 21, 2026', badge: 'warning', label: 'Interview' },
                                        { name: 'Bob Marley', role: 'UI/UX Designer', date: 'May 20, 2026', badge: 'info', label: 'Screening' },
                                        { name: 'Charlie Puth', role: 'Backend Developer', date: 'May 19, 2026', badge: 'success', label: 'Hired' },
                                        { name: 'David Gandy', role: 'Project Manager', date: 'May 18, 2026', badge: 'secondary', label: 'Shortlisted' },
                                    ].map((r, i) => (
                                        <tr key={i} onClick={() => alert(`Opening profile for ${r.name}`)} style={{ cursor: 'pointer' }}>
                                            <td className="fw-bold text-dark silver-text py-2">{r.name}</td>
                                            <td className="text-secondary small py-2">{r.role}</td>
                                            <td className="text-secondary small py-2">{r.date}</td>
                                            <td className="py-2">
                                                <span className={`badge bg-${r.badge} ${['warning', 'info'].includes(r.badge) ? 'text-dark' : ''}`} style={{ fontSize: '0.7rem', padding: '4px 10px' }}>
                                                    {r.label}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title">Action Items</h6>
                        <div className="mt-2">
                            <div className="small text-muted mb-3 fw-bold">UPCOMING INTERVIEWS</div>
                            {[
                                { role: 'Frontend Dev', details: '10:00 AM - Candidate Alice C.' },
                                { role: 'UI Designer', details: '02:00 PM - Candidate Bob M.' },
                                { role: 'Node.js Expert', details: '04:30 PM - Candidate Sam R.' },
                            ].map((iv, i) => (
                                <div key={i} className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom last-border-none">
                                    <div>
                                        <div className="fw-bold small text-dark">{iv.role}</div>
                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>{iv.details}</div>
                                    </div>
                                    <button
                                        className="btn btn-sm btn-primary py-1 px-3"
                                        style={{ fontSize: '0.7rem' }}
                                        onClick={() => handleJoinMeeting(iv.role)}
                                    >
                                        Join
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HROverallStats;

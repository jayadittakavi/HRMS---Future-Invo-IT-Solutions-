import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleBarChart, SimpleDonutChart, SimpleLineChart } from '../../../components/charts/CustomCharts';
import { FaUsers, FaUserPlus, FaChalkboardTeacher, FaChartLine, FaUmbrellaBeach, FaUserCheck, FaSmile, FaVenusMars, FaBirthdayCake } from 'react-icons/fa';

const HROverallStats = () => {
    const navigate = useNavigate();

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

    const deptDistribution = [
        { label: 'Engineering', value: 40, color: '#3b82f6' },
        { label: 'Sales', value: 25, color: '#f97316' },
        { label: 'HR', value: 10, color: '#ec4899' },
        { label: 'Marketing', value: 15, color: '#8b5cf6' },
        { label: 'Others', value: 10, color: '#64748b' },
    ];

    const teamGrowthData = [850, 1100, 980, 1250, 1120, 1234];

    const handleJoinMeeting = (role) => {
        alert(`Starting video session for ${role} position...`);
    };

    return (
        <>
            {/* Top Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="dashboard-card bg-gradient-purple" onClick={() => navigate('/employee-directory')} style={{ cursor: 'pointer' }}>
                        <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                            <FaUsers /> Total Staff
                        </h6>
                        <h3 className="dashboard-value">1,234</h3>
                        <p className="small mb-0 fw-bold">↑ 12 New this month</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card bg-gradient-orange" onClick={() => navigate('/recruitment')} style={{ cursor: 'pointer' }}>
                        <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                            <FaUserPlus /> Open Positions
                        </h6>
                        <h3 className="dashboard-value">8</h3>
                        <p className="small mb-0 fw-bold">3 Critical</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card bg-gradient-blue" onClick={() => navigate('/onboarding')} style={{ cursor: 'pointer' }}>
                        <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                            <FaChalkboardTeacher /> Onboarding
                        </h6>
                        <h3 className="dashboard-value">3</h3>
                        <p className="small mb-0">Candidates in progress</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card bg-gradient-green" onClick={() => navigate('/performance-reviews')} style={{ cursor: 'pointer' }}>
                        <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                            <FaChartLine /> Team Performance
                        </h6>
                        <h3 className="dashboard-value">92%</h3>
                        <p className="small mb-0">Overall productivity</p>
                    </div>
                </div>
            </div>

            {/* Charts Section: Pie, Bar, Line */}
            <div className="row g-4 mb-4">
                {/* Pie Chart - Dept Distribution */}
                <div className="col-md-4">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title">Department Allocation</h6>
                        <div className="py-3 d-flex justify-content-center">
                            <SimpleDonutChart segments={deptDistribution} size="200px" centerText="100%" />
                        </div>
                        <div className="text-center mt-3 small text-secondary">
                            <div className="d-flex justify-content-center flex-wrap gap-2">
                                {deptDistribution.map((item, idx) => (
                                    <span key={idx} className="fw-bold" style={{ color: item.color }}>● {item.label}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bar Chart - Recruitment Funnel */}
                <div className="col-md-4">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title">Recruitment Funnel</h6>
                        <div className="py-2">
                            <SimpleBarChart data={recruitmentFunnel} height="240px" />
                        </div>
                    </div>
                </div>

                {/* Line Chart - Team Growth */}
                <div className="col-md-4">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title">Team Growth Trend</h6>
                        <div className="py-3">
                            <SimpleLineChart data={teamGrowthData} height="240px" color="#10b981" />
                        </div>
                        <div className="text-center small text-muted">
                            Current Headcount: <span className="fw-bold text-success">1,234</span>
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

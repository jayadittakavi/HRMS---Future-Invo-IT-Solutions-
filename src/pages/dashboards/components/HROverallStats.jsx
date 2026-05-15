import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimpleBarChart, SimpleDonutChart, SimpleLineChart } from '../../../components/charts/CustomCharts';
import { employeeSuperAdminService } from '../../modules/hr/employees/superadmin-service';
import { spaceService } from '../../../services/spaceService';
import { FaUsers, FaUserPlus, FaChalkboardTeacher, FaChartLine, FaUmbrellaBeach, FaUserCheck, FaSmile, FaVenusMars, FaBirthdayCake, FaCircleNotch } from 'react-icons/fa';

const HROverallStats = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        staffCount: 0,
        openPositions: 0,
        activeOnboarding: 0,
        pendingLeaves: 0,
        performanceScore: '0%',
        wellbeingScore: '0%'
    });
    const [recruitmentData, setRecruitmentData] = useState([]);
    const [recentApplications, setRecentApplications] = useState([]);
    const [upcomingInterviews, setUpcomingInterviews] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // Real data fetching from services
                const [employees, summary, recruitment, applications, interviews] = await Promise.allSettled([
                    employeeSuperAdminService.getAllEmployees(),
                    spaceService.getSummary(),
                    fetch('/api/recruitment/stats').then(res => res.json()),
                    fetch('/api/recruitment/recent').then(res => res.json()),
                    fetch('/api/recruitment/interviews').then(res => res.json())
                ]);

                let headcount = 0;
                if (employees.status === 'fulfilled') {
                    headcount = Array.isArray(employees.value) ? employees.value.length : (employees.value.data?.length || 0);
                }

                if (summary.status === 'fulfilled' && summary.value) {
                    const s = summary.value;
                    setStats({
                        staffCount: s.total_employees || headcount,
                        openPositions: s.open_positions || 0,
                        activeOnboarding: s.active_onboarding || 0,
                        pendingLeaves: s.pending_leaves || 0,
                        performanceScore: s.team_performance_score || '0%',
                        wellbeingScore: s.staff_wellbeing_score || '0%'
                    });
                } else {
                    setStats(prev => ({ ...prev, staffCount: headcount }));
                }

                if (recruitment.status === 'fulfilled') setRecruitmentData(recruitment.value);
                if (applications.status === 'fulfilled') setRecentApplications(applications.value);
                if (interviews.status === 'fulfilled') setUpcomingInterviews(interviews.value);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const recruitmentFunnel = recruitmentData.map((item, index, arr) => {
        const totalApplied = arr[0]?.value || 1;
        const prevValue = index > 0 ? arr[index - 1].value : item.value;
        const conversion = index > 0 ? ((item.value / prevValue) * 100).toFixed(0) : 100;

        return {
            ...item,
            topLabel: `${item.value}`,
            subLabel: index === 0 ? '100% Total' : `${conversion}% Conv.`
        };
    });

    const teamGrowthData = [0, 0, 0, 0, 0, stats.staffCount]; 

    const handleJoinMeeting = (role) => {
        alert(`Starting video session for ${role} position...`);
    };

    return (
        <>
            {/* Top Stats Cards */}
            <div className="row g-4 mb-5">
                {[
                    { label: 'Total Staff', value: stats.staffCount.toLocaleString(), icon: <FaUsers />, color: 'hrms-card-blue', path: '/employee-directory', sub: 'Active head count', iconBg: 'rgba(59, 130, 246, 0.1)', iconColor: '#3b82f6' },
                    { label: 'Open Positions', value: stats.openPositions.toString(), icon: <FaUserPlus />, color: 'hrms-card-orange', path: '/recruitment', sub: 'Action required', iconBg: 'rgba(245, 158, 11, 0.1)', iconColor: '#f59e0b' },
                    { label: 'Onboarding', value: stats.activeOnboarding.toString(), icon: <FaChalkboardTeacher />, color: 'hrms-card-indigo', path: '/onboarding', sub: 'In progress', iconBg: 'rgba(99, 102, 241, 0.1)', iconColor: '#6366f1' },
                    { label: 'Team Performance', value: stats.performanceScore, icon: <FaChartLine />, color: 'hrms-card-green', path: '/performance-reviews', sub: 'Calculated Score', iconBg: 'rgba(16, 185, 129, 0.1)', iconColor: '#10b981' },
                    { label: 'Pending Leaves', value: stats.pendingLeaves.toString(), icon: <FaUmbrellaBeach />, color: 'hrms-card-red', path: '/leave-requests', sub: 'Requires Review', iconBg: 'rgba(239, 68, 68, 0.1)', iconColor: '#ef4444' },
                    { label: 'Staff Wellbeing', value: stats.wellbeingScore, icon: <FaSmile />, color: 'hrms-card-purple', path: '/performance-reviews', sub: 'Engagement Score', iconBg: 'rgba(139, 92, 246, 0.1)', iconColor: '#8b5cf6' },
                ].map((stat, index) => (
                    <div className="col-md-2 col-6" key={index}>
                        <div
                            className={`card hrms-card ${stat.color} h-100`}
                            onClick={() => navigate(stat.path)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body p-3 d-flex flex-column">
                                <div className="icon-box-solid mb-3" style={{ backgroundColor: stat.iconBg, color: stat.iconColor, width: '42px', height: '42px', minHeight: '42px' }}>
                                    {React.cloneElement(stat.icon, { size: 18 })}
                                </div>
                                <div>
                                    <div className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>{stat.label}</div>
                                    <h3 className="fw-bold text-dark mb-1" style={{ fontSize: '1.4rem' }}>{stat.value}</h3>
                                    <p className="text-muted small mb-0" style={{ fontSize: '0.65rem' }}>{stat.sub}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section: Bar, Line */}
            <div className="row g-4 mb-4">
                {/* Bar Chart - Recruitment Funnel */}
                <div className="col-md-6">
                    <div className="card hrms-card hrms-card-indigo h-100">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-dark mb-4">Recruitment Funnel</h6>
                            <div className="py-2">
                                {recruitmentFunnel.length > 0 ? (
                                    <SimpleBarChart data={recruitmentFunnel} height="240px" />
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center" style={{ height: '240px' }}>
                                        <span className="text-muted small">No recruitment data available</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Line Chart - Team Growth */}
                <div className="col-md-6">
                    <div className="card hrms-card hrms-card-green h-100">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-dark mb-4">Team Growth Trend</h6>
                            <div className="py-3">
                                <SimpleLineChart data={teamGrowthData} height="240px" color="#10b981" />
                            </div>
                            <div className="text-center small text-muted">
                                Current Headcount: <span className="fw-bold text-success">{(stats.staffCount || 0).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tables Section */}
            <div className="row g-4">
                <div className="col-md-8">
                    <div className="card hrms-card hrms-card-indigo border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h6 className="fw-bold text-dark mb-0">Recent Applications</h6>
                                <button
                                    className="btn btn-sm btn-link text-primary text-decoration-none small fw-bold p-0"
                                    onClick={() => navigate('/recruitment')}
                                >
                                    View All
                                </button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-muted small border-0 py-2">Candidate</th>
                                            <th className="text-muted small border-0 py-2">Job Role</th>
                                            <th className="text-muted small border-0 py-2">Applied Date</th>
                                            <th className="text-muted small border-0 py-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentApplications.length > 0 ? recentApplications.map((r, i) => (
                                            <tr key={i} onClick={() => alert(`Opening profile for ${r.name}`)} style={{ cursor: 'pointer' }}>
                                                <td className="fw-bold text-dark py-3">{r.name}</td>
                                                <td className="text-muted small py-3">{r.role}</td>
                                                <td className="text-muted small py-3">{r.date}</td>
                                                <td className="py-3">
                                                    <span className={`badge bg-${r.badge || 'secondary'}-subtle text-${r.badge || 'secondary'}`} style={{ fontSize: '0.7rem', padding: '6px 12px', borderRadius: '8px', fontWeight: 700 }}>
                                                        {r.label}
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-5 text-muted small">No recent applications found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card hrms-card hrms-card-orange border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-dark mb-4">Action Items</h6>
                            <div className="mt-2">
                                <div className="text-muted mb-3 fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>UPCOMING INTERVIEWS</div>
                                {upcomingInterviews.length > 0 ? upcomingInterviews.map((iv, i) => (
                                    <div key={i} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom last-border-none">
                                        <div>
                                            <div className="fw-bold small text-dark mb-1">{iv.role}</div>
                                            <div className="text-muted" style={{ fontSize: '0.7rem' }}>{iv.details}</div>
                                        </div>
                                        <button
                                            className="btn btn-primary rounded-pill py-1 px-3"
                                            style={{ fontSize: '0.7rem', fontWeight: 700 }}
                                            onClick={() => handleJoinMeeting(iv.role)}
                                        >
                                            Join
                                        </button>
                                    </div>
                                )) : (
                                    <div className="text-center py-4 text-muted small">No interviews scheduled today</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HROverallStats;

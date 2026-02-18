import React from 'react';
import { SimpleBarChart, SimpleDonutChart, SimpleLineChart } from '../../../components/charts/CustomCharts';
import { FaUsers, FaUserPlus, FaChalkboardTeacher, FaChartLine, FaUmbrellaBeach, FaUserCheck, FaSmile, FaVenusMars, FaBirthdayCake } from 'react-icons/fa';

const HROverallStats = () => {
    const hiringData = [
        { label: 'Applied', value: 150, color: '#94a3b8' },
        { label: 'Screening', value: 80, color: '#38bdf8' },
        { label: 'Interview', value: 30, color: '#facc15' },
        { label: 'Offer', value: 12, color: '#4ade80' },
        { label: 'Hired', value: 8, color: '#16a34a' },
    ];

    const deptDistribution = [
        { label: 'Eng', value: 40, color: '#3b82f6' },
        { label: 'Sales', value: 25, color: '#f97316' },
        { label: 'HR', value: 10, color: '#ec4899' },
        { label: 'Mkt', value: 15, color: '#8b5cf6' },
    ];

    const genderDistribution = [
        { label: 'Male', value: 58, color: '#3b82f6' },
        { label: 'Female', value: 40, color: '#ec4899' },
        { label: 'Other', value: 2, color: '#8b5cf6' },
    ];

    const ageDistribution = [
        { label: '20-30', value: 35, color: '#22c55e' },
        { label: '31-40', value: 45, color: '#3b82f6' },
        { label: '41-50', value: 15, color: '#f97316' },
        { label: '50+', value: 5, color: '#ef4444' },
    ];

    const applicationTrendData = [45, 52, 38, 65, 42, 58];
    const teamGrowthData = [1180, 1195, 1210, 1220, 1225, 1234];

    return (
        <>
            {/* Top Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="dashboard-card bg-gradient-purple">
                        <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                            <FaUsers /> Total Staff
                        </h6>
                        <h3 className="dashboard-value">1,234</h3>
                        <p className="small mb-0 fw-bold">↑ 12 New this month</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card bg-gradient-orange">
                        <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                            <FaUserPlus /> Open Positions
                        </h6>
                        <h3 className="dashboard-value">8</h3>
                        <p className="small mb-0 fw-bold">3 Critical</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card bg-gradient-blue">
                        <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                            <FaChalkboardTeacher /> Onboarding
                        </h6>
                        <h3 className="dashboard-value">3</h3>
                        <p className="small mb-0">Candidates in progress</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card bg-gradient-green">
                        <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                            <FaChartLine /> Team Performance
                        </h6>
                        <h3 className="dashboard-value">92%</h3>
                        <p className="small mb-0">Overall productivity</p>
                    </div>
                </div>
            </div>

            {/* Additional Team Metrics */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                                <div className="icon-box bg-info bg-opacity-10 text-info rounded-circle p-2 me-3">
                                    <FaUmbrellaBeach size={20} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Avg Leave Balance</h6>
                                    <h4 className="fw-bold mb-0">8.5 days</h4>
                                </div>
                            </div>
                            <div className="progress" style={{ height: '6px' }}>
                                <div className="progress-bar bg-info" style={{ width: '70%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                                <div className="icon-box bg-success bg-opacity-10 text-success rounded-circle p-2 me-3">
                                    <FaUserCheck size={20} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Attendance Rate</h6>
                                    <h4 className="fw-bold mb-0">96.8%</h4>
                                </div>
                            </div>
                            <div className="progress" style={{ height: '6px' }}>
                                <div className="progress-bar bg-success" style={{ width: '96.8%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                                <div className="icon-box bg-warning bg-opacity-10 text-warning rounded-circle p-2 me-3">
                                    <FaSmile size={20} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Employee Satisfaction</h6>
                                    <h4 className="fw-bold mb-0">4.2/5</h4>
                                </div>
                            </div>
                            <div className="progress" style={{ height: '6px' }}>
                                <div className="progress-bar bg-warning" style={{ width: '84%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                                <div className="icon-box bg-danger bg-opacity-10 text-danger rounded-circle p-2 me-3">
                                    <FaChartLine size={20} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Turnover Rate</h6>
                                    <h4 className="fw-bold mb-0">2.3%</h4>
                                </div>
                            </div>
                            <div className="progress" style={{ height: '6px' }}>
                                <div className="progress-bar bg-danger" style={{ width: '23%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row 1 - Recruitment & Department */}
            <div className="row g-4 mb-4">
                <div className="col-md-8">
                    <div className="dashboard-card">
                        <h6 className="dashboard-card-title">Recruitment Funnel</h6>
                        <SimpleBarChart data={hiringData} height="300px" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title">Department Headcount</h6>
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
            </div>

            {/* Charts Row 2 - Diversity Metrics */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                            <FaVenusMars /> Gender Diversity
                        </h6>
                        <div className="py-3 d-flex justify-content-center">
                            <SimpleDonutChart segments={genderDistribution} size="180px" centerText="Total" />
                        </div>
                        <div className="text-center mt-2 small text-secondary">
                            <div className="d-flex justify-content-center flex-wrap gap-2">
                                {genderDistribution.map((item, idx) => (
                                    <span key={idx} className="fw-bold" style={{ color: item.color }}>● {item.label} ({item.value}%)</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                            <FaBirthdayCake /> Age Distribution
                        </h6>
                        <SimpleBarChart data={ageDistribution} height="240px" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title">Team Growth (6 Months)</h6>
                        <div className="py-3">
                            <SimpleLineChart data={teamGrowthData} height="240px" color="#10b981" />
                        </div>
                        <div className="text-center small text-muted">
                            <span className="fw-bold text-success">+54</span> employees added
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row 3 - Application Trends */}
            <div className="row g-4 mb-4">
                <div className="col-md-12">
                    <div className="dashboard-card">
                        <h6 className="dashboard-card-title">Application Trends (6 Months)</h6>
                        <div className="py-3">
                            <SimpleLineChart data={applicationTrendData} height="280px" color="#8b5cf6" />
                        </div>
                    </div>
                </div>
            </div>

            {/* HR Tables or Lists */}
            <div className="row g-4">
                <div className="col-md-8">
                    <div className="dashboard-card">
                        <h6 className="dashboard-card-title">Recent Applications</h6>
                        <div className="table-responsive">
                            <table className="table table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th className="text-secondary small border-0">Candidate</th>
                                        <th className="text-secondary small border-0">Role</th>
                                        <th className="text-secondary small border-0">Date</th>
                                        <th className="text-secondary small border-0">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fw-bold text-dark">Alice Cooper</td>
                                        <td className="text-secondary small">Frontend Dev</td>
                                        <td className="text-secondary small">May 21</td>
                                        <td><span className="badge bg-warning text-dark" style={{ fontSize: '0.7rem' }}>Interview</span></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold text-dark">Bob Marley</td>
                                        <td className="text-secondary small">UI Designer</td>
                                        <td className="text-secondary small">May 20</td>
                                        <td><span className="badge bg-info text-dark" style={{ fontSize: '0.7rem' }}>Screening</span></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold text-dark">Charlie Puth</td>
                                        <td className="text-secondary small">Backend Dev</td>
                                        <td className="text-secondary small">May 19</td>
                                        <td><span className="badge bg-success" style={{ fontSize: '0.7rem' }}>Hired</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="dashboard-card">
                        <h6 className="dashboard-card-title">Upcoming Interviews</h6>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 border-bottom mb-2">
                                <div>
                                    <h6 className="mb-0 fw-bold small text-dark">Frontend Dev</h6>
                                    <small className="text-muted">10:00 AM - Alice C.</small>
                                </div>
                                <button className="btn btn-sm btn-outline-primary py-0 px-2">Join</button>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 border-0">
                                <div>
                                    <h6 className="mb-0 fw-bold small text-dark">UI Designer</h6>
                                    <small className="text-muted">02:00 PM - Bob M.</small>
                                </div>
                                <button className="btn btn-sm btn-outline-primary py-0 px-2">Join</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HROverallStats;

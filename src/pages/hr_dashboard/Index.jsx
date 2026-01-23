import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import '../components/DashboardLayout.css';
import { EmployeesContent } from '../pages/employees/Employees';
import { AttendanceContent } from '../pages/attendance/Attendance';
import { SimpleBarChart, SimpleDonutChart, SimpleLineChart } from '../components/charts/CustomCharts';
import { FaUsers, FaUserPlus, FaChalkboardTeacher } from 'react-icons/fa';
import BranchMap from '../components/BranchMap';

const HRDashboard = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('dashboard');

    const handleNavigate = (path) => {
        const view = path.replace('/', '');
        setActiveView(view || 'dashboard');
    };

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

    const applicationTrendData = [45, 52, 38, 65, 42, 58];

    return (
        <DashboardLayout title="" onNavigate={handleNavigate}>
            <div className="container-fluid p-0">
                {activeView === 'dashboard' && (
                    <>
                        {/* Welcome Header */}
                        <div className="mb-4">
                            <h2 className="h4 fw-bold text-dark mb-1">Welcome {user?.name || 'HR Specialist'}!</h2>
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-secondary fw-medium">Recruitment Status:</span>
                                <span className="badge bg-danger text-white fw-bold">URGENT HIRING</span>
                            </div>
                        </div>

                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="dashboard-card bg-gradient-purple">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaUsers /> Total Staff
                                    </h6>
                                    <h3 className="dashboard-value">1,234</h3>
                                    <p className="small mb-0 fw-bold">↑ 12 New this month</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card bg-gradient-orange">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaUserPlus /> Open Positions
                                    </h6>
                                    <h3 className="dashboard-value">8</h3>
                                    <p className="small mb-0 fw-bold">3 Critical</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card bg-gradient-blue">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaChalkboardTeacher /> Onboarding
                                    </h6>
                                    <h3 className="dashboard-value">3</h3>
                                    <p className="small mb-0">Candidates in progress</p>
                                </div>
                            </div>
                        </div>

                        {/* Charts Row 1 */}
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

                        {/* Charts Row 2 */}
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

                        {/* Map Row */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-12">
                                <BranchMap />
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
                )}

                {activeView === 'employees' && <EmployeesContent />}
                {activeView === 'attendance' && <AttendanceContent />}

                {activeView === 'recruitment' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">Recruitment Module Coming Soon</h3>
                        <p>Manage job postings and applications here.</p>
                    </div>
                )}

                {activeView === 'onboarding' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">Onboarding Module Coming Soon</h3>
                        <p>Manage new hire onboarding checklists here.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default HRDashboard;

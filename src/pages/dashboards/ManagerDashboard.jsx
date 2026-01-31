import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import '../../components/layout/DashboardLayout.css';
import { SimpleDonutChart, SimpleBarChart } from '../../components/charts/CustomCharts';
import { AttendanceContent } from '../attendance/Attendance';
import { FaUsersCog, FaClipboardList, FaStar } from 'react-icons/fa';

const ManagerDashboard = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('dashboard');

    const handleNavigate = (path) => {
        const view = path.replace('/', '');
        setActiveView(view || 'dashboard');
    };

    const taskStatus = [
        { label: 'Completed', value: 30, color: '#10b981' },
        { label: 'In Progress', value: 12, color: '#f59e0b' },
        { label: 'Pending', value: 5, color: '#ef4444' },
    ];

    return (
        <DashboardLayout title="" onNavigate={handleNavigate}>
            <div className="container-fluid p-0">
                {activeView === 'dashboard' && (
                    <>
                        {/* Welcome Header */}
                        <div className="mb-4">
                            <h2 className="h4 fw-bold text-dark mb-1">Welcome {user?.name || 'Manager'}!</h2>
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-secondary fw-medium">Team Performance:</span>
                                <span className="badge bg-primary text-white fw-bold">EXCELLENT</span>
                            </div>
                        </div>

                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="dashboard-card bg-gradient-blue">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaUsersCog /> Team Members
                                    </h6>
                                    <h3 className="dashboard-value">12</h3>
                                    <p className="small mb-0">Active in projects</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card bg-gradient-orange">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaClipboardList /> Action Items
                                    </h6>
                                    <h3 className="dashboard-value">5</h3>
                                    <p className="small fw-bold mb-0">Pending Review</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card bg-gradient-green">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaStar /> Avg Performance
                                    </h6>
                                    <h3 className="dashboard-value">4.5</h3>
                                    <p className="small fw-bold mb-0">Top 10%</p>
                                </div>
                            </div>
                        </div>

                        {/* Status Chart */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-6">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Task Completion Status</h6>
                                    <div className="d-flex align-items-center">
                                        <SimpleDonutChart segments={taskStatus} size="160px" centerText="Tasks" />
                                        <div className="ms-4">
                                            {taskStatus.map((item, idx) => (
                                                <div key={idx} className="mb-2 small">
                                                    <span className="fw-bold fs-6 me-2" style={{ color: item.color }}>●</span>
                                                    {item.label}: <span className="fw-bold">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Project Progress</h6>
                                    <SimpleBarChart data={[
                                        { label: 'HRMS', value: 75, color: '#3b82f6' },
                                        { label: 'Website', value: 45, color: '#10b981' },
                                        { label: 'App', value: 30, color: '#f59e0b' }
                                    ]} height="160px" />
                                </div>
                            </div>
                        </div>

                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Pending Leave Requests</h6>
                                    <ul className="list-unstyled mb-0 text-secondary small">
                                        <li className="mb-2 pb-2 border-bottom">
                                            <div className="d-flex justify-content-between">
                                                <strong>John Doe</strong>
                                                <span>2 Days</span>
                                            </div>
                                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Sick Leave</div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between">
                                                <strong>Jane Smith</strong>
                                                <span>1 Week</span>
                                            </div>
                                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Annual Leave</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Placeholders for Manager Views */}
                {activeView === 'my-team' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">My Team</h3>
                        <p>View and manage team members.</p>
                    </div>
                )}
                {activeView === 'projects' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">Projects</h3>
                        <p>Manage project timelines and deliverables.</p>
                    </div>
                )}
                {activeView === 'leave-requests' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">Leave Requests</h3>
                        <p>Approve or reject team leave requests.</p>
                    </div>
                )}
                {activeView === 'team-attendance' && <AttendanceContent />}
                {activeView === 'performance' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">Performance Reviews</h3>
                        <p>Conduct performance reviews for your team.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ManagerDashboard;

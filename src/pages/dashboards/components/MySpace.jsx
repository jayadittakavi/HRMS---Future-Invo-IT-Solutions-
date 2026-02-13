import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FaUserCircle, FaClock, FaCalendarDay, FaHistory, FaEdit, FaUserFriends, FaUserTie } from 'react-icons/fa';
import { SimpleDonutChart } from '../../../components/charts/CustomCharts';

const MySpace = ({ role, onNavigate }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Mock Data for Personal Stats
    const leaveBalance = [
        { label: 'Casual', value: 5, color: '#3b82f6' },
        { label: 'Sick', value: 7, color: '#10b981' },
        { label: 'Earned', value: 12, color: '#f59e0b' }
    ];

    const myAttendance = [
        { label: 'Present', value: 22, color: '#10b981' },
        { label: 'Absent', value: 1, color: '#ef4444' },
        { label: 'Late', value: 3, color: '#f59e0b' }
    ];

    const recentActions = [
        { title: 'Leave Approved', desc: 'Your casual leave for 20th Feb approved.', date: '2 hrs ago', type: 'success' },
        { title: 'Task Assigned', desc: 'New task: Update Documentation', date: '5 hrs ago', type: 'info' },
        { title: 'Expense Rejected', desc: 'Reason: Missing Receipt', date: 'Yesterday', type: 'danger' }
    ];

    const teamStats = [
        { label: 'Total Team', value: 12 },
        { label: 'Present Today', value: 10 },
        { label: 'On Leave', value: 2 }
    ];

    return (
        <div className="container-fluid p-0">
            {/* Greeting */}
            <h4 className="fw-bold mb-4">My Space</h4>

            {/* Top Cards: Personal Stats */}
            <div className="row g-4 mb-4">
                {/* Profile Card */}
                <div className="col-md-4">
                    <div className="dashboard-card bg-white h-100 d-flex flex-column align-items-center justify-content-center p-4">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-secondary mb-3" style={{ width: '80px', height: '80px', fontSize: '2.5rem' }}>
                            <FaUserCircle />
                        </div>
                        <h5 className="fw-bold mb-1">{user?.name || 'User Name'}</h5>
                        <p className="text-muted mb-3">{user?.role || role}</p>
                        <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => navigate('/profile')}>View Profile</button>
                            <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={() => navigate('/profile')}>Edit</button>
                        </div>
                    </div>
                </div>

                {/* Attendance Summary */}
                <div className="col-md-4">
                    <div className="dashboard-card bg-white h-100 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold text-secondary mb-0"><FaClock className="me-2" />My Attendance</h6>
                            <span className="badge bg-success bg-opacity-10 text-success">96%</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="position-relative" style={{ width: '100px', height: '100px' }}>
                                <SimpleDonutChart segments={myAttendance} size="100px" centerText="26" />
                            </div>
                            <div className="ps-3 flex-grow-1">
                                <ul className="list-unstyled mb-0 small">
                                    <li className="mb-1 d-flex justify-content-between fw-bold text-success"><span>Present:</span> <span>22</span></li>
                                    <li className="mb-1 d-flex justify-content-between fw-bold text-danger"><span>Absent:</span> <span>1</span></li>
                                    <li className="d-flex justify-content-between fw-bold text-warning"><span>Late:</span> <span>3</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leave Balance */}
                <div className="col-md-4">
                    <div className="dashboard-card bg-white h-100 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold text-secondary mb-0"><FaCalendarDay className="me-2" />Leave Balance</h6>
                            <button className="btn btn-sm btn-light text-primary py-0" onClick={() => onNavigate && onNavigate('leave-management')}>Apply</button>
                        </div>
                        <div className="row g-2">
                            {leaveBalance.map((lb, idx) => (
                                <div key={idx} className="col-4 text-center">
                                    <div className="p-2 rounded bg-light">
                                        <h5 className="mb-0 fw-bold" style={{ color: lb.color }}>{lb.value}</h5>
                                        <small className="text-muted" style={{ fontSize: '0.7rem' }}>{lb.label}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 text-center">
                            <small className="text-muted">Next Holiday: Independence Day (15 Aug)</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Role Specific Rows */}
            <div className="row g-4 mb-4">
                {/* Recent Activity / Notifications - Common for All */}
                <div className="col-md-6">
                    <div className="dashboard-card bg-white h-100 p-4">
                        <h6 className="fw-bold text-secondary mb-3"><FaHistory className="me-2" />Recent Activity</h6>
                        <div className="list-group list-group-flush">
                            {recentActions.map((action, idx) => (
                                <div key={idx} className="list-group-item bg-transparent px-0 border-bottom">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h6 className="mb-1 small fw-bold">{action.title}</h6>
                                        <small className="text-muted">{action.date}</small>
                                    </div>
                                    <p className="mb-1 small text-secondary">{action.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Conditional Admin/Manager/HR Team View */}
                {(role === 'Administrator' || role === 'Manager' || role === 'HR') && (
                    <div className="col-md-6">
                        <div className="dashboard-card bg-gradient-blue text-white h-100 p-4">
                            <h6 className="fw-bold mb-4"><FaUserFriends className="me-2" />My Team Status</h6>
                            <div className="d-flex justify-content-around text-center">
                                <div>
                                    <h2 className="fw-bold mb-0">{teamStats[0].value}</h2>
                                    <small className="opacity-75">Total Members</small>
                                </div>
                                <div className="vr opacity-50"></div>
                                <div>
                                    <h2 className="fw-bold mb-0">{teamStats[1].value}</h2>
                                    <small className="opacity-75">Present Today</small>
                                </div>
                                <div className="vr opacity-50"></div>
                                <div>
                                    <h2 className="fw-bold mb-0">{teamStats[2].value}</h2>
                                    <small className="opacity-75">On Leave</small>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-top border-white border-opacity-25">
                                <button className="btn btn-sm btn-light text-primary w-100 fw-bold" onClick={() => onNavigate && onNavigate('attendance')}>View Team Attendance</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MySpace;

import React from 'react';
import { SimpleDonutChart } from '../../../components/charts/CustomCharts';
import { FaUsers, FaCalendarCheck, FaClipboardList, FaPlusCircle } from 'react-icons/fa';

const ManagerOverallStats = ({ onNavigate }) => {

    const teamAttendance = [
        { label: 'Present', value: 8, color: '#10b981' },
        { label: 'Absent', value: 1, color: '#ef4444' },
        { label: 'On Leave', value: 2, color: '#f59e0b' },
        { label: 'WFH', value: 1, color: '#3b82f6' }
    ];

    const pendingLeaves = [
        { name: 'John Doe', type: 'Sick Leave', duration: '2 Days', date: 'Feb 20-21' },
        { name: 'Jane Smith', type: 'Casual Leave', duration: '1 Day', date: 'Feb 22' },
        { name: 'Mike Ross', type: 'Privilege Leave', duration: '1 Week', date: 'Mar 1-7' }
    ];

    const upcomingHolidays = [
        { name: 'Republic Day', date: '26 Jan', day: 'Friday' },
        { name: 'Holi', date: '25 Mar', day: 'Monday' },
        { name: 'Good Friday', date: '29 Mar', day: 'Friday' }
    ];

    return (
        <div>
            {/* Top Stats Row */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="dashboard-card bg-white h-100 p-4 border-start border-4 border-primary">
                        <div className="d-flex align-items-center mb-2">
                            <FaUsers className="text-primary fs-4 me-2" />
                            <h6 className="text-secondary fw-bold mb-0">Total Team</h6>
                        </div>
                        <h3 className="fw-bold mb-0">12</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card bg-white h-100 p-4 border-start border-4 border-success">
                        <div className="d-flex align-items-center mb-2">
                            <FaCalendarCheck className="text-success fs-4 me-2" />
                            <h6 className="text-secondary fw-bold mb-0">Present Today</h6>
                        </div>
                        <h3 className="fw-bold mb-0">9</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card bg-white h-100 p-4 border-start border-4 border-warning">
                        <div className="d-flex align-items-center mb-2">
                            <FaClipboardList className="text-warning fs-4 me-2" />
                            <h6 className="text-secondary fw-bold mb-0">Pending Tasks</h6>
                        </div>
                        <h3 className="fw-bold mb-0">5</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <button
                        className="btn btn-primary w-100 h-100 d-flex flex-column align-items-center justify-content-center fw-bold shadow-sm"
                        style={{ minHeight: '120px' }}
                        onClick={() => onNavigate('task')}
                    >
                        <FaPlusCircle className="fs-1 mb-2" />
                        Create New Task
                    </button>
                </div>
            </div>

            <div className="row g-4 mb-4">
                {/* Team Attendance Summary */}
                <div className="col-md-4">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title mb-3">My Team Attendance (Today)</h6>
                        <div className="py-3 d-flex justify-content-center">
                            <SimpleDonutChart segments={teamAttendance} size="200px" centerText="12" />
                        </div>
                        <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                            {teamAttendance.map((item, idx) => (
                                <span key={idx} className="badge rounded-pill text-dark border bg-light small d-flex align-items-center">
                                    <span className="rounded-circle me-1" style={{ width: '8px', height: '8px', backgroundColor: item.color }}></span>
                                    {item.label}: {item.value}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pending Leave Requests */}
                <div className="col-md-4">
                    <div className="dashboard-card h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="dashboard-card-title mb-0">Pending Leave Requests</h6>
                            <span className="badge bg-danger rounded-pill">3</span>
                        </div>
                        <div className="list-group list-group-flush">
                            {pendingLeaves.map((leave, idx) => (
                                <div key={idx} className="list-group-item bg-transparent px-0 border-bottom">
                                    <div className="d-flex justify-content-between mb-1">
                                        <h6 className="fw-bold fs-6 mb-0">{leave.name}</h6>
                                        <small className="text-muted">{leave.date}</small>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-secondary">{leave.type} ({leave.duration})</small>
                                        <div className="btn-group btn-group-sm">
                                            <button className="btn btn-outline-success py-0" title="Approve" onClick={() => onNavigate('leave-management')}>✓</button>
                                            <button className="btn btn-outline-danger py-0" title="Reject" onClick={() => onNavigate('leave-management')}>✕</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-link w-100 text-center text-primary small mt-2" onClick={() => onNavigate('leave-management')}>View All Requests</button>
                    </div>
                </div>

                {/* Upcoming Holidays */}
                <div className="col-md-4">
                    <div className="dashboard-card h-100">
                        <h6 className="dashboard-card-title mb-3">Upcoming Holidays</h6>
                        <div className="list-group list-group-flush">
                            {upcomingHolidays.map((holiday, idx) => (
                                <div key={idx} className="list-group-item bg-transparent px-0 border-bottom d-flex align-items-center">
                                    <div className="bg-light text-primary rounded d-flex flex-column align-items-center justify-content-center p-2 me-3" style={{ width: '50px', height: '50px' }}>
                                        <small className="fw-bold lh-1" style={{ fontSize: '0.6rem' }}>{holiday.date.split(' ')[1].toUpperCase()}</small>
                                        <span className="fw-bold fs-5 lh-1">{holiday.date.split(' ')[0]}</span>
                                    </div>
                                    <div>
                                        <h6 className="fw-bold mb-0">{holiday.name}</h6>
                                        <small className="text-muted">{holiday.day}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-link w-100 text-center text-primary small mt-2" onClick={() => onNavigate('attendance')}>View Full Calendar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerOverallStats;

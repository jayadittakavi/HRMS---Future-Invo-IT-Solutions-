import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { AttendanceContent } from '../pages/attendance/Attendance';
import '../components/DashboardLayout.css';
import { SimpleBarChart, SimpleDonutChart } from '../components/charts/CustomCharts';
import { FaCalendarCheck, FaUmbrellaBeach, FaTasks, FaFileInvoiceDollar } from 'react-icons/fa';

const EmployeeDashboard = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('dashboard');

    const handleNavigate = (path) => {
        const view = path.replace('/', '');
        setActiveView(view || 'dashboard');
    };

    const attendanceStats = [
        { label: 'Present', value: 22, color: '#10b981' },
        { label: 'Leave', value: 2, color: '#f59e0b' },
        { label: 'Holiday', value: 6, color: '#3b82f6' },
    ];

    const salaryHistory = [
        { label: 'Jan', value: 45000, color: '#3b82f6' },
        { label: 'Feb', value: 45000, color: '#10b981' },
        { label: 'Mar', value: 45000, color: '#f59e0b' },
        { label: 'Apr', value: 48000, color: '#ef4444' },
        { label: 'May', value: 48000, color: '#8b5cf6' },
    ];

    return (
        <DashboardLayout title="" onNavigate={handleNavigate}>
            <div className="container-fluid p-0">
                {activeView === 'dashboard' && (
                    <>
                        {/* Welcome Header */}
                        <div className="mb-4">
                            <h2 className="h4 fw-bold text-dark mb-1">Welcome {user?.name || 'Employee'}!</h2>
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-secondary fw-medium">Next Pay Date:</span>
                                <span className="badge bg-primary text-white fw-bold">JUN 30</span>
                            </div>
                        </div>

                        {/* Top Cards */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaCalendarCheck className="fs-5 text-success" /> Attendance
                                    </h6>
                                    <h3 className="dashboard-value">98%</h3>
                                    <p className="text-success small mb-0 fw-bold">Present this month</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaUmbrellaBeach className="fs-5 text-primary" /> Leave Balance
                                    </h6>
                                    <h3 className="dashboard-value">12</h3>
                                    <p className="text-secondary small mb-0">Days remaining</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaTasks className="fs-5 text-danger" /> Pending Tasks
                                    </h6>
                                    <h3 className="dashboard-value">3</h3>
                                    <p className="text-warning small fw-bold mb-0">Due today</p>
                                </div>
                            </div>
                        </div>

                        {/* Charts Row (New) */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Attendance Overview</h6>
                                    <div className="py-2">
                                        <SimpleDonutChart segments={attendanceStats} size="140px" centerText="30 Days" />
                                    </div>
                                    <div className="text-center mt-3 small text-secondary">
                                        {attendanceStats.map((item, idx) => (
                                            <span key={idx} className="fw-bold me-2" style={{ color: item.color }}>● {item.label}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">Salary History (Last 5 Months)</h6>
                                    <SimpleBarChart data={salaryHistory} height="180px" />
                                </div>
                            </div>
                        </div>

                        {/* Recent Payslips & Tasks */}
                        <div className="row g-4">
                            <div className="col-md-8">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2">
                                        <FaFileInvoiceDollar className="text-primary" /> Recent Payslips
                                    </h6>
                                    <div className="d-flex flex-column gap-2">
                                        <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-light p-2 rounded text-primary fw-bold">MAY</div>
                                                <div>
                                                    <h6 className="mb-0 text-dark small fw-bold">May 2024 Salary</h6>
                                                    <small className="text-muted">Paid on May 31, 2024</small>
                                                </div>
                                            </div>
                                            <button className="btn btn-sm btn-outline-dark">Download</button>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-light p-2 rounded text-primary fw-bold">APR</div>
                                                <div>
                                                    <h6 className="mb-0 text-dark small fw-bold">April 2024 Salary</h6>
                                                    <small className="text-muted">Paid on Apr 30, 2024</small>
                                                </div>
                                            </div>
                                            <button className="btn btn-sm btn-outline-dark">Download</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title">My Tasks</h6>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item bg-transparent px-0 border-bottom mb-1">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="myTask1" />
                                                <label className="form-check-label text-secondary small" htmlFor="myTask1">Submit Weekly Report</label>
                                            </div>
                                        </li>
                                        <li className="list-group-item bg-transparent px-0 border-0">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="myTask2" />
                                                <label className="form-check-label text-secondary small" htmlFor="myTask2">Update Project Status</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeView === 'attendance' && <AttendanceContent />}

                {activeView === 'profile' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">My Profile</h3>
                        <p>View and edit your personal information.</p>
                    </div>
                )}
                {activeView === 'my-leaves' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">My Leaves</h3>
                        <p>Apply for leave and view leave history.</p>
                    </div>
                )}
                {activeView === 'payslips' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">My Payslips</h3>
                        <p>View and download your monthly payslips.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default EmployeeDashboard;

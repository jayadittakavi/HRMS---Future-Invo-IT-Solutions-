import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { AttendanceContent } from '../modules/hr/attendance/Attendance';
import '../../components/layout/DashboardLayout.css';
import { SimpleBarChart, SimpleDonutChart } from '../../components/charts/CustomCharts';
import { LeaveManagementContent } from '../modules/hr/leave_management/LeaveManagement';
import { PayrollContent } from '../modules/finance/payroll/Payroll';
import { FaCalendarCheck, FaUmbrellaBeach, FaTasks, FaFileInvoiceDollar, FaClock, FaBusinessTime, FaSignInAlt, FaSignOutAlt, FaMugHot } from 'react-icons/fa';

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
                        {/* Quick Personal Snapshot (Status, Shift, Timings) */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-12">
                                <div className="dashboard-card bg-white border-0 shadow-sm">
                                    <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                                        <h6 className="dashboard-card-title mb-0 d-flex align-items-center gap-2">
                                            <FaBusinessTime className="text-primary" /> Today's Status
                                        </h6>
                                        <div className="d-flex gap-2">
                                            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger px-3 rounded-pill fw-bold">
                                                LATE BY 5 MINS
                                            </span>
                                            <span className="badge bg-light text-secondary border px-3 rounded-pill">
                                                28 Jan 2026
                                            </span>
                                        </div>
                                    </div>

                                    <div className="row g-4 text-center">
                                        {/* Attendance Status */}
                                        <div className="col-md-3 border-end">
                                            <div className="mb-2 text-secondary small text-uppercase fw-bold">Current Status</div>
                                            <h4 className="fw-bold text-success mb-1">Present</h4>
                                            <div className="small text-muted">Checked in at 10:05 AM</div>
                                        </div>

                                        {/* Shift Timing */}
                                        <div className="col-md-3 border-end">
                                            <div className="mb-2 text-secondary small text-uppercase fw-bold">Shift Timing</div>
                                            <h5 className="fw-bold text-dark mb-1">10:00 AM - 07:00 PM</h5>
                                            <div className="small text-muted">General Shift (9h)</div>
                                        </div>

                                        {/* Clock In / Out */}
                                        <div className="col-md-3 border-end">
                                            <div className="mb-2 text-secondary small text-uppercase fw-bold">Clock In / Out</div>
                                            <div className="d-flex justify-content-center gap-4">
                                                <div className="text-start">
                                                    <div className="d-flex align-items-center gap-1 small text-success fw-bold">
                                                        <FaSignInAlt /> In
                                                    </div>
                                                    <span className="d-block fw-bold display-6" style={{ fontSize: '1.2rem' }}>10:05</span>
                                                </div>
                                                <div className="border-start mx-2"></div>
                                                <div className="text-start">
                                                    <div className="d-flex align-items-center gap-1 small text-secondary fw-bold">
                                                        <FaSignOutAlt /> Out
                                                    </div>
                                                    <span className="d-block text-muted fw-bold" style={{ fontSize: '1.2rem' }}>--:--</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Working Hours */}
                                        <div className="col-md-3">
                                            <div className="mb-2 text-secondary small text-uppercase fw-bold">Working Hours</div>
                                            <h4 className="fw-bold text-primary mb-1">04h 12m</h4>
                                            <div className="progress mt-2" style={{ height: '6px' }}>
                                                <div className="progress-bar bg-primary" style={{ width: '45%' }}></div>
                                            </div>
                                            <div className="small text-muted mt-1">Target: 9h/day</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Stats Row */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="dashboard-card bg-gradient-blue text-white">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2 text-white">
                                        <FaUmbrellaBeach className="fs-5" /> Leave Balance
                                    </h6>
                                    <h3 className="dashboard-value text-white">12 Days</h3>
                                    <p className="small mb-0 opacity-75">Casual & Sick Leaves Remaining</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card bg-gradient-orange text-white">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2 text-white">
                                        <FaTasks className="fs-5" /> Pending Actions
                                    </h6>
                                    <h3 className="dashboard-value text-white">3 Tasks</h3>
                                    <p className="small fw-bold mb-0 opacity-75">Compliance Training Pending</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="dashboard-card bg-gradient-green text-white">
                                    <h6 className="dashboard-card-title d-flex align-items-center gap-2 text-white">
                                        <FaMugHot className="fs-5" /> Next Holiday
                                    </h6>
                                    <h3 className="dashboard-value text-white">Aug 15</h3>
                                    <p className="small fw-bold mb-0 opacity-75">Independence Day (Upcoming)</p>
                                </div>
                            </div>
                        </div>

                        {/* Charts Row (New) */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <h6 className="dashboard-card-title d-flex justify-content-between align-items-center">
                                        Attendance Summary <span className="badge bg-light text-secondary">January 2026</span>
                                    </h6>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-between border-bottom py-2">
                                            <span className="text-secondary small">Total Working Days</span>
                                            <span className="fw-bold text-dark">26</span>
                                        </div>
                                        <div className="d-flex justify-content-between border-bottom py-2">
                                            <span className="text-secondary small">Present Days</span>
                                            <span className="fw-bold text-success">24</span>
                                        </div>
                                        <div className="d-flex justify-content-between border-bottom py-2">
                                            <span className="text-secondary small">Absent Days</span>
                                            <span className="fw-bold text-danger">1</span>
                                        </div>
                                        <div className="d-flex justify-content-between border-bottom py-2">
                                            <span className="text-secondary small">Late Count</span>
                                            <span className="fw-bold text-warning">1</span>
                                        </div>
                                        <div className="d-flex justify-content-between pt-2">
                                            <span className="text-secondary small">Overtime (Approved)</span>
                                            <span className="fw-bold text-primary">2h 30m</span>
                                        </div>
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

                {activeView === 'my-attendance' && <AttendanceContent personal={true} />}

                {activeView === 'profile' && (
                    <div className="p-5 text-center">
                        <h3 className="text-muted">My Profile</h3>
                        <p>View and edit your personal information.</p>
                    </div>
                )}
                {activeView === 'my-leaves' && <LeaveManagementContent personal={true} />}
                {activeView === 'my-payslips' && <PayrollContent personal={true} />}
            </div>
        </DashboardLayout>
    );
};

export default EmployeeDashboard;

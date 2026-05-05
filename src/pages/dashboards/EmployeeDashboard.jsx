import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { AttendanceContent } from '../../pages/attendance/Attendance';
import '../../components/layout/DashboardLayout.css';
import { SimpleBarChart } from '../../components/charts/CustomCharts';
import { LeaveManagementContent } from '../modules/hr/leave_management/LeaveManagement';
import { PayrollContent } from '../modules/finance/payroll/Payroll';
import { FaCalendarCheck, FaUmbrellaBeach, FaListCheck, FaFileInvoiceDollar, FaRightToBracket, FaRightFromBracket, FaMugHot, FaCircleCheck } from 'react-icons/fa6';
import { MdOutlineWavingHand, MdOutlineNotificationsActive } from 'react-icons/md';
import { ProfileContent } from '../modules/hr/profile/Profile';
import { attendanceService } from '../attendance/service/service';
import { VisitorContent } from '../modules/administration/visitor/Visitor';
import { DeskManagementContent } from '../modules/administration/desk/DeskManagement';

import { dashboardsService } from './dashboardsService';

const EmployeeDashboard = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        employeeStatus: user?.status || 'Onboarding', // Added employee status
        nextPayDate: 'JUNE 30, 2026',
        atAGlance: {
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            status: 'Absent',
            checkIn: '--:--',
            checkOut: '--:--',
            workingHours: '0h 0m',
            shift: '10:00 AM - 07:00 PM',
        },
        leaveBalance: { count: 12, footer: 'Next Leave Approval: Pending' },
        actionRequired: { count: 3, description: 'Compliance & Security training' },
        nextHoliday: { date: 'Aug 15', name: 'Independence Day (Fri)' },
        salaryTrend: [
            { label: 'Jan', value: 45000, color: '#3b82f6' },
            { label: 'Feb', value: 45000, color: '#10b981' },
            { label: 'Mar', value: 45000, color: '#f59e0b' },
            { label: 'Apr', value: 48000, color: '#ef4444' },
            { label: 'May', value: 48000, color: '#8b5cf6' },
        ],
        recentPayslips: [
            { month: 'MAY', ref: '#PS-2024-05', status: 'Paid' },
            { month: 'APR', ref: '#PS-2024-06', status: 'Paid' },
            { month: 'MAR', ref: '#PS-2024-07', status: 'Paid' },
        ]
    });

    const fetchDashboardData = async () => {
        try {
            const data = await dashboardsService.getEmployeeDashboard();
            if (data) {
                setDashboardData(prev => ({
                    ...prev,
                    employeeStatus: data.employee_status || user?.status || prev.employeeStatus,
                    nextPayDate: data.next_pay_date || prev.nextPayDate,
                    atAGlance: {
                        ...prev.atAGlance,
                        ...(data.at_a_glance || {})
                    },
                    leaveBalance: data.leave_balance || prev.leaveBalance,
                    actionRequired: data.action_required || prev.actionRequired,
                    nextHoliday: data.next_holiday || prev.nextHoliday,
                    salaryTrend: data.salary_trend?.map(item => ({
                        label: item.month || item.label,
                        value: item.amount || item.value,
                        color: item.color || '#3b82f6'
                    })) || prev.salaryTrend,
                    recentPayslips: data.recent_payslips || prev.recentPayslips
                }));
            }
        } catch (error) {
            console.error("Error fetching employee dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        const interval = setInterval(fetchDashboardData, 300000); // 5 mins
        return () => clearInterval(interval);
    }, []);

    const handleCheckAction = async (type) => {
        try {
            const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            if (type === 'IN') {
                const res = await attendanceService.checkIn();
                setDashboardData(prev => ({
                    ...prev,
                    atAGlance: { ...prev.atAGlance, status: 'Present', checkIn: now }
                }));
            } else {
                const res = await attendanceService.checkOut();
                setDashboardData(prev => ({
                    ...prev,
                    atAGlance: { ...prev.atAGlance, status: 'Completed', checkOut: now }
                }));
            }
            alert(`Logged ${type} at ${now}`);
        } catch (err) {
            console.error(`Failed to ${type}:`, err);
            // Mock behavior for demo
            const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            if (type === 'IN') {
                setDashboardData(prev => ({
                    ...prev,
                    atAGlance: { ...prev.atAGlance, status: 'Present', checkIn: now }
                }));
            } else {
                setDashboardData(prev => ({
                    ...prev,
                    atAGlance: { ...prev.atAGlance, status: 'Completed', checkOut: now }
                }));
            }
        }
    };

    return (
        <div className="animate__animated animate__fadeIn">
            {activeView === 'dashboard' && (
                <div className="container-fluid p-0">
                    {/* Welcome Header */}
                    <div className="d-flex justify-content-between align-items-end mb-4 pb-2">
                        <div>
                            <div className="d-flex align-items-center gap-3 mb-1 flex-wrap">
                                <h3 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                                    <MdOutlineWavingHand className="text-warning me-2" />
                                    Hey, {user?.firstName} {user?.lastName}!
                                </h3>
                                <span className={`badge rounded-pill shadow-sm align-middle`} style={{ 
                                    backgroundColor: dashboardData.employeeStatus?.toLowerCase() === 'active' ? '#10b981' : 
                                                     dashboardData.employeeStatus?.toLowerCase() === 'under review' ? '#f59e0b' : '#3b82f6',
                                    fontSize: '0.8rem',
                                    padding: '0.5em 1em',
                                    fontWeight: '600'
                                }}>
                                    {dashboardData.employeeStatus || 'Onboarding'}
                                </span>
                            </div>
                            <p className="text-secondary small mb-0">Here's what's happening with your work profile today.</p>
                        </div>
                        <div className="d-flex gap-3 align-items-center">
                            <div className="text-end d-none d-md-block">
                                <span className="text-muted smaller d-block mb-1">NEXT PAY DATE</span>
                                <span className="fw-bold text-primary ls-tight">{dashboardData.nextPayDate}</span>
                            </div>
                            <div className="bg-white p-2 rounded-circle shadow-sm position-relative cursor-pointer hover-scale transition-all">
                                <MdOutlineNotificationsActive size={20} className="text-primary" />
                                {dashboardData.actionRequired?.count > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-2 border-white" style={{ padding: '0.35em' }}>
                                        <span className="visually-hidden">unread notifications</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Today's Status Large Card */}
                    <div className="row g-4 mb-4">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                                <div className="card-body p-0">
                                    <div className="p-4 border-bottom bg-light-subtle d-flex justify-content-between align-items-center">
                                        <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                                            <FaCalendarCheck className="text-primary" /> At a Glance
                                        </h6>
                                        <div className="d-flex gap-2">
                                            <button 
                                                className={`btn btn-sm rounded-pill px-3 fw-bold d-flex align-items-center gap-1 ${dashboardData.atAGlance.checkIn === '--:--' ? 'btn-success shadow-sm' : 'btn-light text-muted border-0'}`}
                                                disabled={dashboardData.atAGlance.checkIn !== '--:--'}
                                                onClick={() => handleCheckAction('IN')}
                                            >
                                                <FaRightToBracket /> {dashboardData.atAGlance.checkIn === '--:--' ? 'Check In' : 'Logged In'}
                                            </button>
                                            <button 
                                                className={`btn btn-sm rounded-pill px-3 fw-bold d-flex align-items-center gap-1 ${dashboardData.atAGlance.checkIn !== '--:--' && dashboardData.atAGlance.checkOut === '--:--' ? 'btn-danger shadow-sm' : 'btn-light text-muted border-0'}`}
                                                disabled={dashboardData.atAGlance.checkIn === '--:--' || dashboardData.atAGlance.checkOut !== '--:--'}
                                                onClick={() => handleCheckAction('OUT')}
                                            >
                                                <FaRightFromBracket /> {dashboardData.atAGlance.checkOut === '--:--' ? 'Check Out' : 'Logged Out'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4 row g-0 text-center">
                                        <div className="col-md-3 border-end py-3">
                                            <p className="smaller text-uppercase fw-bold text-secondary mb-3 ls-1">Status</p>
                                            <h4 className={`fw-bold mb-1 ${dashboardData.atAGlance.status === 'Absent' ? 'text-danger' : dashboardData.atAGlance.status === 'Present' ? 'text-success' : 'text-warning'}`}>
                                                {dashboardData.atAGlance.status}
                                            </h4>
                                            <div className="small text-muted">{dashboardData.atAGlance.checkIn !== '--:--' ? `Since ${dashboardData.atAGlance.checkIn}` : 'Check-in pending'}</div>
                                        </div>
                                        <div className="col-md-3 border-end py-3 px-3">
                                            <p className="smaller text-uppercase fw-bold text-secondary mb-3 ls-1">Shift</p>
                                            <h5 className="fw-bold text-dark mb-1">{dashboardData.atAGlance.shift}</h5>
                                            <div className="small text-muted">9 Hours General</div>
                                        </div>
                                        <div className="col-md-3 border-end py-3 px-3">
                                            <p className="smaller text-uppercase fw-bold text-secondary mb-3 ls-1">Timings</p>
                                            <div className="d-flex justify-content-center gap-4 align-items-center mt-2">
                                                <div className="text-center">
                                                    <span className="d-block smaller text-success fw-bold mb-1">IN</span>
                                                    <span className="fw-bold h5 mb-0 ls-tight">{dashboardData.atAGlance.checkIn}</span>
                                                </div>
                                                <div className="vr h-100 mx-2"></div>
                                                <div className="text-center">
                                                    <span className="d-block smaller text-muted fw-bold mb-1">OUT</span>
                                                    <span className="fw-bold h5 mb-0 text-muted ls-tight">{dashboardData.atAGlance.checkOut}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 py-3 px-3">
                                            <p className="smaller text-uppercase fw-bold text-secondary mb-3 ls-1">Logged Hours</p>
                                            <h4 className="fw-bold text-primary mb-1 ls-tight">{dashboardData.atAGlance.workingHours}</h4>
                                            <div className="progress mt-2 mx-auto" style={{ height: '6px', maxWidth: '120px' }}>
                                                <div className="progress-bar bg-primary rounded-pill" style={{ width: dashboardData.atAGlance.checkIn !== '--:--' ? '65%' : '0%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="row g-4 mb-4">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm rounded-4 premium-card-blue text-white overflow-hidden p-4 h-100 position-relative">
                                <h6 className="smaller fw-bold text-white-50 text-uppercase mb-4 ls-1">Leave Balance</h6>
                                <div className="d-flex align-items-end gap-2 mb-2">
                                    <h2 className="fw-bold mb-0">{dashboardData.leaveBalance.count}</h2>
                                    <span className="mb-1 fw-medium h5 opacity-75">Days</span>
                                </div>
                                <p className="smaller mb-0 opacity-75">{dashboardData.leaveBalance.footer}</p>
                                <FaUmbrellaBeach className="card-floating-icon text-white opacity-10" size={80} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm rounded-4 premium-card-orange text-white overflow-hidden p-4 h-100 position-relative">
                                <h6 className="smaller fw-bold text-white-50 text-uppercase mb-4 ls-1">Action Required</h6>
                                <div className="d-flex align-items-end gap-2 mb-2">
                                    <h2 className="fw-bold mb-0">{String(dashboardData.actionRequired.count).padStart(2, '0')}</h2>
                                    <span className="mb-1 fw-medium h5 opacity-75">Tasks</span>
                                </div>
                                <p className="smaller mb-0 opacity-75">{dashboardData.actionRequired.description}</p>
                                <FaListCheck className="card-floating-icon text-white opacity-10" size={80} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm rounded-4 premium-card-green text-white overflow-hidden p-4 h-100 position-relative">
                                <h6 className="smaller fw-bold text-white-50 text-uppercase mb-4 ls-1">Next Holiday</h6>
                                <div className="d-flex align-items-end gap-2 mb-2">
                                    <h2 className="fw-bold mb-0">{dashboardData.nextHoliday.date}</h2>
                                </div>
                                <p className="smaller mb-0 opacity-75">{dashboardData.nextHoliday.name}</p>
                                <FaMugHot className="card-floating-icon text-white opacity-10" size={80} />
                            </div>
                        </div>
                    </div>

                    {/* Chart & History Row */}
                    <div className="row g-4">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h6 className="fw-bold text-dark mb-0">Salary Trend (Last 5 Months)</h6>
                                    <div className="badge-modern pending rounded-pill" style={{ background: '#e0e7ff', color: '#4338ca' }}>Net Pay Overview</div>
                                </div>
                                <SimpleBarChart data={dashboardData.salaryTrend} height="240px" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                                <h6 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                                    <FaFileInvoiceDollar className="text-primary" /> Current Payslips
                                </h6>
                                <div className="d-flex flex-column gap-3">
                                    {dashboardData.recentPayslips.map((payslip, idx) => (
                                        <div key={idx} className={`d-flex align-items-center justify-content-between p-3 rounded-4 bg-light hover-bg-light transition-all cursor-pointer`} onClick={() => setActiveView('my-payslips')}>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-primary-subtle text-primary rounded-3 px-2 py-1 fw-bold smaller">{payslip.month}</div>
                                                <div>
                                                    <div className="fw-bold text-dark smaller">{payslip.month} Log</div>
                                                    <div className="text-muted smallest">Ref: {payslip.ref}</div>
                                                </div>
                                            </div>
                                            <FaCircleCheck className="text-success opacity-50" />
                                        </div>
                                    ))}
                                    <button className="btn btn-primary btn-sm rounded-pill mt-2 py-2 shadow-sm fw-bold" onClick={() => setActiveView('my-payslips')}>View Full History &rarr;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeView === 'my-attendance' && <AttendanceContent personal={true} />}
            {activeView === 'profile' && <ProfileContent />}
            {activeView === 'my-leaves' && <LeaveManagementContent personal={true} />}
            {activeView === 'my-payslips' && <PayrollContent personal={true} />}
            {activeView === 'visitors' && <VisitorContent />}
            {activeView === 'desk-management' && <DeskManagementContent />}

            <style>{`
                .smaller { font-size: 0.75rem; }
                .smallest { font-size: 0.65rem; }
                .ls-1 { letter-spacing: 0.05rem; }
                .ls-tight { letter-spacing: -0.05rem; }
                
                .premium-card-blue { 
                    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
                    box-shadow: 0 10px 20px rgba(30, 58, 138, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                }
                .premium-card-orange { 
                    background: linear-gradient(135deg, #9a3412 0%, #f97316 50%, #fb923c 100%);
                    box-shadow: 0 10px 20px rgba(154, 52, 18, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                }
                .premium-card-green { 
                    background: linear-gradient(135deg, #064e3b 0%, #10b981 50%, #34d399 100%);
                    box-shadow: 0 10px 20px rgba(6, 78, 59, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                }
                
                .card-floating-icon {
                    position: absolute; right: -15px; bottom: -15px;
                    transform: rotate(-15deg); pointer-events: none;
                }
                
                .hover-scale:hover { transform: scale(1.05); }
                .hover-bg-light:hover { background-color: #f1f5f9 !important; }
                
                .badge-modern {
                    display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px;
                    border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
                }
                .approved { background: #dcfce7; color: #166534; }
                .pending { background: #fef9c3; color: #854d0e; }
                .badge-modern .dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
                
                .transition-all { transition: all 0.2s ease-in-out; }
            `}</style>
        </div>
    );
};

export default EmployeeDashboard;

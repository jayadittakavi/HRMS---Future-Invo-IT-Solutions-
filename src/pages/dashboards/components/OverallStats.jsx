import React, { useState, useEffect } from 'react';
import { SimpleBarChart, SimpleDonutChart, SimpleLineChart, ModernTrendChart } from '../../../components/charts/CustomCharts';
import { FaUsers, FaBuilding, FaClipboardList, FaMoneyBillWave, FaUserTie, FaUserCog, FaUserShield, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { coreService } from '../../../services/coreService';
import { employeeSuperAdminService } from '../../modules/hr/employees/superadmin-service';

const OverallStats = () => {
    const navigate = useNavigate();
    const [statsData, setStatsData] = useState({
        companies: 0,
        branches: 0,
        admins: 0,
        hrs: 0,
        managers: 0,
        employees: 0
    });
    const [attendanceSummary, setAttendanceSummary] = useState([
        { label: 'Present', value: 0, color: '#10b981' },
        { label: 'Absent', value: 0, color: '#ef4444' },
        { label: 'WFH', value: 0, color: '#3b82f6' },
        { label: 'Leave', value: 0, color: '#f59e0b' },
    ]);
    const [revenueTrend, setRevenueTrend] = useState([0]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await coreService.getSuperAdminDashboardStats();
                setStatsData({
                    companies: data.companies || 0,
                    branches: data.branches || 0,
                    admins: data.admins || 0,
                    hrs: data.hrs || 0,
                    managers: data.managers || 0,
                    employees: data.employees || 0
                });

                if (data.attendance_summary) {
                    setAttendanceSummary(data.attendance_summary);
                }
                
                if (data.revenue_trend) {
                    setRevenueTrend(data.revenue_trend);
                }

                if (data.department_distribution) {
                    setDepartmentData(data.department_distribution);
                }

                if (data.pending_requests) {
                    setPendingRequests(data.pending_requests);
                }
                
                if (data.missing_checkouts !== undefined) {
                    setAlerts(prev => [
                        { type: "Warning", message: `${data.missing_checkouts} Employees missing attendance check-out yesterday.` },
                        ...prev
                    ]);
                }
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };
        fetchStats();
    }, []);

    // Dynamic Data for Overall Stats
    const stats = [
        { label: 'Total Companies', value: statsData.companies, icon: <FaBuilding />, color: 'bg-gradient-purple', path: '/companies' },
        { label: 'Total Branches', value: statsData.branches, icon: <FaMapMarkerAlt />, color: 'bg-gradient-blue', path: '/branches' },
        { label: 'Total Admins', value: statsData.admins, icon: <FaUserShield />, color: 'bg-gradient-green', path: '/users' },
        { label: 'Total HRs', value: statsData.hrs, icon: <FaUserTie />, color: 'bg-gradient-orange', path: '/users' },
        { label: 'Total Managers', value: statsData.managers, icon: <FaUserCog />, color: 'bg-gradient-cyan', path: '/users' },
        { label: 'Total Employees', value: statsData.employees, icon: <FaUsers />, color: 'bg-gradient-pink', path: '/employees' },
    ];

    const [departmentData, setDepartmentData] = useState([]);

    const handleAction = (type, data) => {
        console.log(`${type} Action:`, data);
        alert(`${type} successful!`);
    };

    return (
        <div>
            {/* Top Stat Grid */}
            <div className="row g-4 mb-5">
                {stats.map((stat, index) => (
                    <div className="col-md-4 col-lg-2" key={index}>
                        <div className={`card hrms-card h-100 ${
                            stat.label.includes('Companies') ? 'hrms-card-purple' :
                            stat.label.includes('Branches') ? 'hrms-card-blue' :
                            stat.label.includes('Admins') ? 'hrms-card-green' :
                            stat.label.includes('HRs') ? 'hrms-card-orange' :
                            stat.label.includes('Managers') ? 'hrms-card-indigo' : 'hrms-card-red'
                        }`} onClick={() => navigate(stat.path)} style={{ cursor: 'pointer' }}>
                            <div className="card-body p-3 d-flex flex-column">
                                <div className="icon-box-solid mb-3" style={{ 
                                    backgroundColor: stat.color.includes('purple') ? 'rgba(139, 92, 246, 0.1)' :
                                                     stat.color.includes('blue') ? 'rgba(59, 130, 246, 0.1)' :
                                                     stat.color.includes('green') ? 'rgba(16, 185, 129, 0.1)' :
                                                     stat.color.includes('orange') ? 'rgba(245, 158, 11, 0.1)' :
                                                     stat.color.includes('cyan') ? 'rgba(6, 182, 212, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: stat.color.includes('purple') ? '#8b5cf6' :
                                           stat.color.includes('blue') ? '#3b82f6' :
                                           stat.color.includes('green') ? '#10b981' :
                                           stat.color.includes('orange') ? '#f59e0b' :
                                           stat.color.includes('cyan') ? '#06b6d4' : '#ef4444',
                                    width: '40px', height: '40px', minHeight: '40px'
                                }}>
                                    {React.cloneElement(stat.icon, { size: 18 })}
                                </div>
                                <div className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '0.55rem', letterSpacing: '0.05em' }}>{stat.label}</div>
                                <h3 className="fw-bold text-dark mb-1" style={{ fontSize: '1.4rem' }}>{stat.value}</h3>
                                <div className="config-link small text-primary fw-bold mt-auto" style={{ fontSize: '0.7rem' }}>Manage →</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Attendance & Pending Requests Row */}
            <div className="row g-4 mb-4">
                {/* Attendance Summary Donut */}
                <div className="col-md-4">
                    <div className="card hrms-card hrms-card-indigo h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-dark mb-4">Today's Attendance</h6>
                            <div className="py-3 d-flex justify-content-center">
                                <SimpleDonutChart segments={attendanceSummary} size="180px" centerText="Total" />
                            </div>
                            <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                                {attendanceSummary.map((item, idx) => (
                                    <span key={idx} className="badge rounded-pill text-dark border-0 bg-light-subtle px-3 py-2 small d-flex align-items-center fw-bold" style={{ fontSize: '0.65rem' }}>
                                        <span className="rounded-circle me-2" style={{ width: '8px', height: '8px', backgroundColor: item.color }}></span>
                                        {item.label}: {item.value}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Requests List */}
                <div className="col-md-4">
                    <div className="card hrms-card hrms-card-orange h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h6 className="fw-bold text-dark mb-0">Pending Requests</h6>
                                <span className="badge bg-danger-subtle text-danger rounded-pill px-2 py-1 fw-bold" style={{ fontSize: '0.7rem' }}>{pendingRequests.length}</span>
                            </div>
                            <div className="list-group list-group-flush">
                                {pendingRequests.map((item) => (
                                    <div key={item.id} className="list-group-item bg-transparent px-0 border-bottom d-flex align-items-center justify-content-between py-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                                                style={{ width: '36px', height: '36px', fontSize: '0.7rem', backgroundColor: item.color }}>
                                                {item.initials}
                                            </div>
                                            <div>
                                                <div className="fw-bold text-dark mb-0" style={{ fontSize: '0.8rem' }}>{item.name}</div>
                                                <div className="text-muted" style={{ fontSize: '0.7rem' }}>{item.type} Request</div>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-sm btn-success-subtle text-success py-1 px-2 border-0 rounded-circle" style={{ fontSize: '0.75rem' }} onClick={() => handleAction('Approve', item)}>✓</button>
                                            <button className="btn btn-sm btn-danger-subtle text-danger py-1 px-2 border-0 rounded-circle" style={{ fontSize: '0.75rem' }} onClick={() => handleAction('Reject', item)}>✕</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-link w-100 text-center text-primary fw-bold small mt-3 text-decoration-none" onClick={() => navigate('/leave-management')}>View All Requests</button>
                        </div>
                    </div>
                </div>

                {/* Company Growth / Trend */}
                <div className="col-md-4">
                    <div className="card hrms-card hrms-card-blue h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-dark mb-4">Revenue / Growth Trend</h6>
                            <div className="pt-2">
                                <ModernTrendChart data={revenueTrend} height="200px" color="#6366f1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Department Distribution Bar Chart */}
            <div className="row g-4 mb-4">
                <div className="col-md-8">
                    <div className="card hrms-card hrms-card-purple border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h6 className="fw-bold text-dark mb-4">Employees by Department</h6>
                            <SimpleBarChart data={departmentData} height="300px" />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card hrms-card hrms-card-red bg-gradient-orange h-100 text-white shadow-sm border-0">
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h6 className="mb-0 fw-bold">System Alerts</h6>
                                <FaClipboardList className="fs-4 opacity-50" />
                            </div>
                            <ul className="list-unstyled mb-0">
                                {alerts.map((alert, idx) => (
                                    <li key={idx} className="mb-3 border-bottom border-white border-opacity-25 pb-3">
                                        <span className={`badge ${alert.type === 'Critical' ? 'bg-danger' : alert.type === 'Warning' ? 'bg-warning text-dark' : 'bg-info text-dark'} mb-2 fw-bold`}>
                                            {alert.type}
                                        </span>
                                        <p className="mb-0 small" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>{alert.message}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverallStats;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
    MdBusiness, MdPeople, MdSecurity, MdHistory, 
    MdMemory, MdStorage, MdCloudQueue, MdTrendingUp,
    MdAddBusiness, MdCheckCircle, MdErrorOutline, MdInfoOutline
} from 'react-icons/md';
import { ModernTrendChart, SimpleBarChart, SimpleDonutChart } from '../../components/charts/CustomCharts';

// Mock data for the Information Related Dashboard
const SYSTEM_LOGS = [
    { id: 1, user: 'Super Admin', action: 'Modified System Settings', module: 'Administration', time: '5 mins ago', status: 'success' },
    { id: 2, user: 'Admin (Coke)', action: 'Updated Payroll Policy', module: 'Payroll', time: '12 mins ago', status: 'success' },
    { id: 3, user: 'System', action: 'Database Backup Completed', module: 'Database', time: '1 hour ago', status: 'success' },
    { id: 4, user: 'HR (Pepsi)', action: 'Batch Import: 45 Employees', module: 'HR', time: '2 hours ago', status: 'warning' },
    { id: 5, user: 'Super Admin', action: 'Created New Workspace: Tesla Inc', module: 'Workspaces', time: '3 hours ago', status: 'success' },
];

const RECENT_WORKSPACES = [
    { name: 'Tesla Inc', owner: 'Elon Musk', status: 'Active', plan: 'Enterprise', joined: 'Oct 2023' },
    { name: 'SpaceX', owner: 'Gwynne Shotwell', status: 'Active', plan: 'Enterprise', joined: 'Sep 2023' },
    { name: 'Microsoft', owner: 'Satya Nadella', status: 'Pending', plan: 'Trial', joined: 'Nov 2023' },
];

const SuperAdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Stats
    const stats = [
        { label: 'Total Workspaces', value: '24', sub: '+3 this month', icon: <MdBusiness />, color: '#6366f1' },
        { label: 'Global Users', value: '1,245', sub: '98% Active', icon: <MdPeople />, color: '#10b981' },
        { label: 'System Uptime', value: '99.98%', sub: 'Healthy', icon: <MdCloudQueue />, color: '#3b82f6' },
        { label: 'DB Connections', value: '42', sub: '12% Load', icon: <MdStorage />, color: '#f59e0b' },
    ];

    return (
        <div className="container-fluid p-0 animate__animated animate__fadeIn">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="h4 fw-bold text-dark mb-1">Super Admin Information Hub</h2>
                    <p className="text-secondary small mb-0">Complete system overview and global workspace management.</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm rounded-pill px-3 shadow-sm" onClick={() => navigate('/settings')}>
                        System Config
                    </button>
                    <button className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm d-flex align-items-center gap-1" onClick={() => navigate('/companies')}>
                        <MdAddBusiness size={18} /> New Workspace
                    </button>
                </div>
            </div>

            {/* KPI Section */}
            <div className="row g-4 mb-4">
                {stats.map((s, i) => (
                    <div className="col-md-6 col-xl-3" key={i}>
                        <div className="card border-0 shadow-sm rounded-4 p-3 h-100 bg-white">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div className="p-2 rounded-3" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                                    {React.cloneElement(s.icon, { size: 24 })}
                                </div>
                                <span className={`small fw-bold ${s.label.includes('Uptime') ? 'text-success' : 'text-primary'}`}>
                                    {s.sub}
                                </span>
                            </div>
                            <h3 className="fw-bold mb-0 text-dark">{s.value}</h3>
                            <p className="text-secondary smaller mb-0 fw-medium">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="row g-4 mb-4">
                {/* Growth Chart */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                                <MdTrendingUp className="text-primary" /> Workspace Growth Metric
                            </h6>
                            <select className="form-select form-select-sm border-0 bg-light w-auto fw-bold" style={{ fontSize: '0.75rem' }}>
                                <option>Last 6 Months</option>
                                <option>Year to Date</option>
                            </select>
                        </div>
                        <ModernTrendChart data={[12, 15, 18, 14, 21, 24]} height="250px" color="#6366f1" />
                        <div className="mt-4 p-3 rounded-3 bg-light border-start border-primary border-4">
                            <p className="small text-secondary mb-0">
                                <strong>Pro-Tip:</strong> Organization onboardings are up by 20% compared to last quarter. System resources are scaling automatically.
                            </p>
                        </div>
                    </div>
                </div>

                {/* System Health / Donut */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                        <h6 className="fw-bold text-dark mb-4">Global License Usage</h6>
                        <div className="d-flex justify-content-center py-2">
                            <SimpleDonutChart 
                                segments={[
                                    { label: 'Standard', value: 45, color: '#10b981' },
                                    { label: 'Enterprise', value: 35, color: '#6366f1' },
                                    { label: 'Trial', value: 20, color: '#f59e0b' }
                                ]} 
                                size="180px" 
                                centerText="100%" 
                            />
                        </div>
                        <div className="mt-4">
                            {['Standard', 'Enterprise', 'Trial'].map((l, i) => (
                                <div key={i} className="d-flex justify-content-between align-items-center mb-2 small">
                                    <span className="text-secondary fw-medium d-flex align-items-center gap-2">
                                        <span className="rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: i === 0 ? '#10b981' : i === 1 ? '#6366f1' : '#f59e0b' }}></span>
                                        {l} Plan
                                    </span>
                                    <span className="fw-bold">{i === 0 ? '45%' : i === 1 ? '35%' : '20%'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Logs and Workspaces */}
            <div className="row g-4">
                {/* Global Logs */}
                <div className="col-lg-7">
                    <div className="card border-0 shadow-sm rounded-4 bg-white">
                        <div className="p-4 border-bottom border-light d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                                <MdHistory className="text-primary" size={20} /> Recent Global Events
                            </h6>
                            <button className="btn btn-link btn-sm text-primary p-0 fw-bold text-decoration-none" onClick={() => navigate('/super-admin/audit-logs')}>
                                View Audit Trail
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light">
                                    <tr className="smaller text-secondary text-uppercase fw-bold">
                                        <th className="px-4 py-3 border-0">User / Action</th>
                                        <th className="py-3 border-0">Module</th>
                                        <th className="py-3 border-0">Time</th>
                                        <th className="py-3 border-0 text-end px-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {SYSTEM_LOGS.map(log => (
                                        <tr key={log.id}>
                                            <td className="px-4 py-3">
                                                <div className="fw-bold text-dark small">{log.user}</div>
                                                <div className="text-secondary smaller">{log.action}</div>
                                            </td>
                                            <td className="py-3">
                                                <span className="badge bg-light text-dark border smaller">{log.module}</span>
                                            </td>
                                            <td className="py-3 smaller text-secondary">{log.time}</td>
                                            <td className="py-3 text-end px-4">
                                                <span className={`badge rounded-pill ${log.status === 'success' ? 'bg-success' : 'bg-warning'} bg-opacity-10 ${log.status === 'success' ? 'text-success' : 'text-warning'} smaller`}>
                                                    {log.status.toUpperCase()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Recently Added Workspaces */}
                <div className="col-lg-5">
                    <div className="card border-0 shadow-sm rounded-4 bg-white h-100">
                        <div className="p-4 border-bottom border-light">
                            <h6 className="fw-bold text-dark mb-0">Recently Onboarded</h6>
                        </div>
                        <div className="p-4 pt-2">
                            {RECENT_WORKSPACES.map((ws, i) => (
                                <div key={i} className="d-flex align-items-center justify-content-between p-3 rounded-4 mb-2 hover-bg-light transition-all border border-light border-opacity-50">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', fontSize: '12px' }}>
                                            {ws.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="fw-bold text-dark small">{ws.name}</div>
                                            <div className="text-secondary smaller">{ws.plan} • {ws.owner}</div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <span className={`badge ${ws.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} rounded-pill smaller px-2`}>
                                            {ws.status}
                                        </span>
                                        <div className="smaller text-muted mt-1">{ws.joined}</div>
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-outline-light text-primary fw-bold w-100 rounded-4 mt-3 py-2 border-primary border-opacity-25" onClick={() => navigate('/companies')}>
                                Manage All Workspaces
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .smaller { font-size: 0.72rem; }
                .hover-bg-light:hover { background-color: #f8fafc; }
                .transition-all { transition: all 0.2s ease; }
            `}</style>
        </div>
    );
};

export default SuperAdminDashboard;

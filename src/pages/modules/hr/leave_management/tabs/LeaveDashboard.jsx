import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { FaCalendarPlus, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const LeaveDashboard = () => {
    // Mock Data
    const balanceData = {
        labels: ['Sick Leave', 'Casual Leave', 'Privilege Leave', 'Used'],
        datasets: [{
            data: [5, 3, 10, 4],
            backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#cbd5e1'],
            borderWidth: 0,
        }]
    };

    const trendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Leaves Taken',
            data: [2, 1, 3, 0, 1, 2],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };

    return (
        <div className="container-fluid p-0">
            {/* Top Stats */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100 bg-gradient-purple text-white p-3 d-flex align-items-center justify-content-between" style={{ borderRadius: '15px' }}>
                        <div>
                            <h3 className="fw-bold mb-0">12</h3>
                            <small className="opacity-75 text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Total Leaves</small>
                        </div>
                        <FaCalendarPlus className="fs-1 opacity-50" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100 bg-gradient-orange text-white p-3 d-flex align-items-center justify-content-between" style={{ borderRadius: '15px' }}>
                        <div>
                            <h3 className="fw-bold mb-0">3</h3>
                            <small className="opacity-75 text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Pending Requests</small>
                        </div>
                        <FaClock className="fs-1 opacity-50" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100 bg-gradient-green text-white p-3 d-flex align-items-center justify-content-between" style={{ borderRadius: '15px' }}>
                        <div>
                            <h3 className="fw-bold mb-0">8</h3>
                            <small className="opacity-75 text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Leaves Approved</small>
                        </div>
                        <FaCheckCircle className="fs-1 opacity-50" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100 bg-gradient-red text-white p-3 d-flex align-items-center justify-content-between" style={{ borderRadius: '15px' }}>
                        <div>
                            <h3 className="fw-bold mb-0">1</h3>
                            <small className="opacity-75 text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Leaves Rejected</small>
                        </div>
                        <FaTimesCircle className="fs-1 opacity-50" />
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 p-4" style={{ borderRadius: '15px' }}>
                        <h6 className="fw-bold text-secondary mb-3">Leave Balance Distribution</h6>
                        <div className="d-flex justify-content-center" style={{ height: '250px' }}>
                            <Doughnut data={balanceData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm h-100 p-4" style={{ borderRadius: '15px' }}>
                        <h6 className="fw-bold text-secondary mb-3">Monthly Leave Trend</h6>
                        <div style={{ height: '250px' }}>
                            <Line data={trendData} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Requests Table Placeholder */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <div className="card-header bg-white border-0 py-3">
                    <h6 className="mb-0 fw-bold text-secondary">Recent Leave Requests</h6>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 text-secondary small text-uppercase">Employee</th>
                                <th className="text-secondary small text-uppercase">Type</th>
                                <th className="text-secondary small text-uppercase">From</th>
                                <th className="text-secondary small text-uppercase">To</th>
                                <th className="text-secondary small text-uppercase">Reason</th>
                                <th className="text-secondary small text-uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="ps-4 fw-medium">Alice Wonder</td>
                                <td className="text-secondary">Sick Leave</td>
                                <td className="text-secondary small">2025-02-20</td>
                                <td className="text-secondary small">2025-02-22</td>
                                <td className="text-secondary small text-truncate" style={{ maxWidth: '150px' }}>Feeling unwell due to fever...</td>
                                <td><span className="badge bg-warning text-dark">Pending</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeaveDashboard;

import React from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { FaChartLine, FaStar, FaPlus, FaEllipsisV } from 'react-icons/fa';

const PerformanceReviewsContent = () => {
    const reviews = [
        { id: 1, employee: 'John Doe', department: 'Engineering', reviewer: 'Robert Fox', cycle: 'Q1 2024', status: 'Pending Review', score: '-' },
        { id: 2, employee: 'Jane Smith', department: 'Design', reviewer: 'Cody Fisher', cycle: 'Q1 2024', status: 'Completed', score: '4.5/5' },
        { id: 3, employee: 'Alice Johnson', department: 'Marketing', reviewer: 'Bessie Cooper', cycle: 'Annual 2023', status: 'Completed', score: '4.8/5' },
    ];

    return (
        <div className="performance-content p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Performance Reviews</h5>
                    <p className="text-secondary small mb-0">Manage employee appraisals and feedback cycles</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill d-flex align-items-center gap-2">
                    <FaPlus /> Start New Review Cycle
                </button>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold mb-0">Review Tracker</h6>
                    <div className="d-flex gap-2">
                        <select className="form-select form-select-sm" style={{ width: '150px' }}>
                            <option>Q1 2024</option>
                            <option>Annual 2023</option>
                        </select>
                        <select className="form-select form-select-sm" style={{ width: '150px' }}>
                            <option>All Departments</option>
                            <option>Engineering</option>
                            <option>Sales</option>
                        </select>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">Employee</th>
                                <th>Department</th>
                                <th>Reviewer</th>
                                <th>Cycle</th>
                                <th>Status</th>
                                <th>Final Score</th>
                                <th className="text-end pe-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(r => (
                                <tr key={r.id}>
                                    <td className="ps-4 fw-bold">{r.employee}</td>
                                    <td>{r.department}</td>
                                    <td>{r.reviewer}</td>
                                    <td>{r.cycle}</td>
                                    <td>
                                        <span className={`badge bg-opacity-10 text-dark border ${r.status === 'Completed' ? 'bg-success text-success border-success' :
                                                'bg-warning text-warning border-warning'
                                            }`}>
                                            {r.status}
                                        </span>
                                    </td>
                                    <td className="fw-bold text-dark">{r.score}</td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-sm btn-light border">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const PerformanceReviews = () => (
    <DashboardLayout title="">
        <PerformanceReviewsContent />
    </DashboardLayout>
);

export default PerformanceReviews;

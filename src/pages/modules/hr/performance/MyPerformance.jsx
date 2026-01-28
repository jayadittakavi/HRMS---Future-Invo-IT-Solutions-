import React from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";
import { FaStar, FaChartLine, FaQuoteLeft } from 'react-icons/fa';

const MyPerformance = () => {
    const reviews = [
        { id: 1, period: 'Q4 2025', reviewer: 'Anjali Singh', rating: 4.5, feedback: 'Excellent performance on the HRMS project implementation.', date: '2026-01-15' },
        { id: 2, period: 'Q3 2025', reviewer: 'Anjali Singh', rating: 4.0, feedback: 'Consistent delivery, room for improvement in communication.', date: '2025-10-10' },
    ];

    const goals = [
        { id: 1, title: 'Complete React Certification', progress: 75, status: 'In Progress' },
        { id: 2, title: 'Improve Code Coverage', progress: 100, status: 'Completed' },
        { id: 3, title: 'Mentorship Program', progress: 30, status: 'In Progress' },
    ];

    return (
        <DashboardLayout title="My Performance">
            <div className="container-fluid p-0">
                {/* Stats Row */}
                <div className="row g-4 mb-4">
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-3 bg-gradient-purple text-white h-100">
                            <div className="card-body p-4 text-center">
                                <h6 className="opacity-75 mb-2">Average Rating</h6>
                                <div className="display-4 fw-bold mb-2">4.2</div>
                                <div className="d-flex justify-content-center text-warning mb-2">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-white opacity-50" />
                                </div>
                                <span className="badge bg-white bg-opacity-25">Top 15%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card border-0 shadow-sm rounded-3 h-100">
                            <div className="card-header bg-white border-bottom py-3">
                                <h6 className="mb-0 fw-bold"><FaChartLine className="me-2 text-primary" /> Active Goals</h6>
                            </div>
                            <div className="card-body">
                                <div className="d-flex flex-column gap-3">
                                    {goals.map(goal => (
                                        <div key={goal.id}>
                                            <div className="d-flex justify-content-between mb-1">
                                                <span className="fw-medium small">{goal.title}</span>
                                                <span className="small text-muted">{goal.progress}%</span>
                                            </div>
                                            <div className="progress" style={{ height: '6px' }}>
                                                <div
                                                    className={`progress-bar ${goal.progress === 100 ? 'bg-success' : 'bg-primary'}`}
                                                    style={{ width: `${goal.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="card border-0 shadow-sm rounded-3">
                    <div className="card-header bg-white border-bottom py-3">
                        <h6 className="mb-0 fw-bold">Performance Reviews</h6>
                    </div>
                    <div className="card-body p-0">
                        {reviews.map((review, index) => (
                            <div key={review.id} className={`p-4 ${index !== reviews.length - 1 ? 'border-bottom' : ''}`}>
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h6 className="fw-bold mb-1">{review.period} Review</h6>
                                        <div className="small text-muted">Reviewer: {review.reviewer} • {review.date}</div>
                                    </div>
                                    <div className="badge bg-warning text-dark d-flex align-items-center gap-1">
                                        {review.rating} <FaStar size={10} />
                                    </div>
                                </div>
                                <div className="bg-light p-3 rounded mt-2">
                                    <FaQuoteLeft className="text-secondary opacity-25 mb-2" />
                                    <p className="mb-0 text-secondary fst-italic small">{review.feedback}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyPerformance;

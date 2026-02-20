import React from 'react';
import { FaMoneyBillWave, FaUserTie, FaChartLine, FaCalendarAlt } from 'react-icons/fa';

const DashboardTab = () => {
    return (
        <div className="container-fluid p-0">
            {/* Quick Stats */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body d-flex align-items-center">
                            <div className="rounded-circle p-3 bg-primary bg-opacity-10 text-primary me-3">
                                <FaMoneyBillWave size={24} />
                            </div>
                            <div>
                                <h6 className="card-subtitle text-muted mb-1">Total Payout</h6>
                                <h4 className="card-title fw-bold mb-0">₹5.6L</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body d-flex align-items-center">
                            <div className="rounded-circle p-3 bg-success bg-opacity-10 text-success me-3">
                                <FaUserTie size={24} />
                            </div>
                            <div>
                                <h6 className="card-subtitle text-muted mb-1">Processed Employees</h6>
                                <h4 className="card-title fw-bold mb-0">124</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body d-flex align-items-center">
                            <div className="rounded-circle p-3 bg-info bg-opacity-10 text-info me-3">
                                <FaChartLine size={24} />
                            </div>
                            <div>
                                <h6 className="card-subtitle text-muted mb-1">Avg Salary</h6>
                                <h4 className="card-title fw-bold mb-0">₹45k</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body d-flex align-items-center">
                            <div className="rounded-circle p-3 bg-warning bg-opacity-10 text-warning me-3">
                                <FaCalendarAlt size={24} />
                            </div>
                            <div>
                                <h6 className="card-subtitle text-muted mb-1">Pending Processing</h6>
                                <h4 className="card-title fw-bold mb-0">12</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="alert alert-info">
                Charts are temporarily disabled for debugging purposes.
            </div>
        </div>
    );
};

export default DashboardTab;

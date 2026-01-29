import React from 'react';
import { FaDownload, FaChartPie, FaListAlt } from 'react-icons/fa';

const AttendanceReports = () => {
    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">Attendance Reports</h4>
                <button className="btn btn-primary rounded-pill btn-sm px-3 d-flex align-items-center gap-2">
                    <FaDownload /> Export Report
                </button>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 text-center">
                            <FaChartPie className="text-primary mb-3" size={32} />
                            <h5>Monthly Summary</h5>
                            <p className="text-muted small">Aggregate view of presence, absence, and leaves.</p>
                            <button className="btn btn-outline-primary btn-sm rounded-pill w-100">View</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 text-center">
                            <FaListAlt className="text-danger mb-3" size={32} />
                            <h5>Exception Report</h5>
                            <p className="text-muted small">Late comers, early leavers, and missed punches.</p>
                            <button className="btn btn-outline-danger btn-sm rounded-pill w-100">View</button>
                        </div>
                    </div>
                </div>
                {/* More report cards... */}
            </div>
        </div>
    );
};

export default AttendanceReports;

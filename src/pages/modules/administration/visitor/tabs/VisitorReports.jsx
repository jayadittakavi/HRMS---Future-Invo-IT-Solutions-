import React from 'react';

const VisitorReports = ({ visitors, stats, API_BASE }) => {
    return (
        <div className="p-4 bg-white rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="fw-bold mb-0 text-primary">Operational Performance Report</h6>
                <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => window.open(`${API_BASE}/visitor/list?tab=log&export=true`, '_blank')}>
                    Export Data
                </button>
            </div>
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="p-4 border rounded-4 bg-light text-center hrms-card">
                        <h2 className="fw-bold text-dark">85%</h2>
                        <p className="text-secondary small mb-0">Check-in Efficiency</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="p-4 border rounded-4 bg-light text-center hrms-card">
                        <h2 className="fw-bold text-dark">18 mins</h2>
                        <p className="text-secondary small mb-0">Avg. Meeting Duration</p>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="p-3 border-start border-primary border-4 rounded bg-primary-subtle mt-2">
                        <small className="fw-bold d-block">Monthly Insight</small>
                        <span className="small">Visitor traffic increased by 12% this week compared to last week.</span>
                    </div>
                </div>
            </div>
            <hr className="my-4" />
            <div className="table-responsive mt-3">
                <h6 className="small fw-bold text-uppercase text-secondary mb-3">All Visitor Data Export View</h6>
                <table className="table table-sm border">
                    <thead className="bg-light">
                        <tr className="small">
                            <th>Ref ID</th>
                            <th>Visitor</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitors.map(v => (
                            <tr key={v.id} className="small">
                                <td>#VST-00{v.id}</td>
                                <td>{v.name}</td>
                                <td>{v.date}</td>
                                <td>{v.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VisitorReports;

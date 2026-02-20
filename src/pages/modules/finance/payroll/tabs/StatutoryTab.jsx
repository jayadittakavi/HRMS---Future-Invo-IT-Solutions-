import React from 'react';

const StatutoryTab = () => {
    return (
        <div className="container-fluid p-0">
            <h5 className="fw-bold mb-3">Statutory Compliance</h5>
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white fw-bold text-primary">Provident Fund (PF)</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label fw-bold">PF Number</label>
                                <input type="text" className="form-control" defaultValue="MH/BAN/12345/000" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Employee Contribution Rate</label>
                                <input type="text" className="form-control" defaultValue="12%" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Employer Contribution Rate</label>
                                <input type="text" className="form-control" defaultValue="12%" />
                            </div>
                            <button className="btn btn-primary btn-sm">Update PF Settings</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white fw-bold text-success">ESI</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label fw-bold">ESI Number</label>
                                <input type="text" className="form-control" defaultValue="56-12-345678-001" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Employee Contribution Rate</label>
                                <input type="text" className="form-control" defaultValue="0.75%" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Employer Contribution Rate</label>
                                <input type="text" className="form-control" defaultValue="3.25%" />
                            </div>
                            <button className="btn btn-success btn-sm">Update ESI Settings</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatutoryTab;

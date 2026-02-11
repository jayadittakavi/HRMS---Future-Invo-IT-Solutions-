import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { FaLaptopHouse, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const WFHRequests = () => {
    const [showWFHModal, setShowWFHModal] = useState(false);

    // Mock WFH Data
    const wfhRequests = [
        { id: 1, employee: "John Doe", startDate: "2024-06-01", endDate: "2024-06-05", reason: "Medical Emergency", status: "Pending" },
        { id: 2, employee: "Jane Smith", startDate: "2024-06-10", endDate: "2024-06-12", reason: "Home Renovation", status: "Approved" },
    ];

    return (
        <DashboardLayout title="WFH Requests">
            <div className="container-fluid p-4 bg-light" style={{ minHeight: '80vh' }}>
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h6 className="mb-0 fw-bold"><FaLaptopHouse className="me-2" />Remote Work / WFH Requests</h6>
                        <button className="btn btn-primary btn-sm" onClick={() => setShowWFHModal(true)}>+ New WFH Allocation</button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4">Employee</th>
                                    <th>Duration</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wfhRequests.map(r => (
                                    <tr key={r.id}>
                                        <td className="ps-4 fw-bold">{r.employee}</td>
                                        <td className="text-secondary small">{r.startDate} to {r.endDate}</td>
                                        <td className="text-secondary small">{r.reason}</td>
                                        <td>
                                            <span className={`badge ${r.status === 'Approved' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="text-end pe-4">
                                            {r.status === 'Pending' && (
                                                <>
                                                    <button className="btn btn-sm btn-success me-1 p-1"><FaCheckCircle /></button>
                                                    <button className="btn btn-sm btn-danger p-1"><FaTimesCircle /></button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* WFH Modal */}
                {showWFHModal && (
                    <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Allocate WFH</h5>
                                    <button className="btn-close" onClick={() => setShowWFHModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="mb-3">
                                            <label className="form-label">Employee</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">From</label>
                                                <input type="date" className="form-control" />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">To</label>
                                                <input type="date" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Reason / Project</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowWFHModal(false)}>Cancel</button>
                                    <button className="btn btn-primary">Allocate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default WFHRequests;

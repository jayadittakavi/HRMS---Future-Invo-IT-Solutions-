import React from 'react';

const FullAndFinalTab = () => {
    return (
        <div className="container-fluid p-0">
            <h5 className="fw-bold mb-3">Full & Final Settlement (F&F)</h5>
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Employee</th>
                                    <th>Resignation Date</th>
                                    <th>Last Working Day</th>
                                    <th>Notice Period</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Vikram Singh</td>
                                    <td>2025-06-01</td>
                                    <td>2025-06-30</td>
                                    <td>Served</td>
                                    <td><span className="badge bg-warning text-dark">Pending</span></td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-primary">Process F&F</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullAndFinalTab;

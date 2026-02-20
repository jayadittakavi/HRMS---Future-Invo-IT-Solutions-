import React from 'react';

const SalaryTab = () => {
    return (
        <div className="container-fluid p-0">
            <h5 className="fw-bold mb-3">Salary Structure Management</h5>
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <p className="text-secondary">Configure and manage salary components, pay grades, and structures here.</p>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Component Name</th>
                                    <th>Type</th>
                                    <th>Calculation Type</th>
                                    <th>Frequency</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Basic Salary</td>
                                    <td>Earning</td>
                                    <td>Fixed</td>
                                    <td>Monthly</td>
                                    <td><span className="badge bg-success">Active</span></td>
                                    <td className="text-end"><button className="btn btn-sm btn-light text-primary">Edit</button></td>
                                </tr>
                                <tr>
                                    <td>HRA</td>
                                    <td>Earning</td>
                                    <td>% of Basic</td>
                                    <td>Monthly</td>
                                    <td><span className="badge bg-success">Active</span></td>
                                    <td className="text-end"><button className="btn btn-sm btn-light text-primary">Edit</button></td>
                                </tr>
                                <tr>
                                    <td>PF (Employee)</td>
                                    <td>Deduction</td>
                                    <td>% of Basic</td>
                                    <td>Monthly</td>
                                    <td><span className="badge bg-success">Active</span></td>
                                    <td className="text-end"><button className="btn btn-sm btn-light text-primary">Edit</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryTab;

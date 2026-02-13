import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';

const AssetAllocation = () => {
    const [allocations, setAllocations] = useState([
        { id: 1, type: 'Laptop', model: 'MacBook Pro 16"', assignedTo: 'Sarah Johnson', status: 'In Use', date: '2023-01-10' },
        { id: 2, type: 'Headphones', model: 'Bose QC35', assignedTo: 'Michael Chen', status: 'In Use', date: '2022-05-12' },
        { id: 3, type: 'Monitor', model: 'Dell UltraSharp', assignedTo: 'David Wilson', status: 'Maintenance', date: '2021-11-20' },
    ]);

    return (
        <div className="container p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 fw-bold text-dark mb-0">Asset Allocation</h2>
                <button className="btn btn-primary btn-sm d-flex align-items-center gap-2">
                    <MdAdd /> Allocate New Asset
                </button>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th scope="col" className="border-0 py-3 ps-4 text-secondary text-uppercase small fw-bold">Asset Type</th>
                                <th scope="col" className="border-0 py-3 text-secondary text-uppercase small fw-bold">Model</th>
                                <th scope="col" className="border-0 py-3 text-secondary text-uppercase small fw-bold">Assigned To</th>
                                <th scope="col" className="border-0 py-3 text-secondary text-uppercase small fw-bold">Allocated Date</th>
                                <th scope="col" className="border-0 py-3 text-secondary text-uppercase small fw-bold">Status</th>
                                <th scope="col" className="border-0 py-3 pe-4 text-end text-secondary text-uppercase small fw-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allocations.map(item => (
                                <tr key={item.id}>
                                    <td className="ps-4 fw-medium text-dark">{item.type}</td>
                                    <td className="text-secondary">{item.model}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="bg-light rounded-circle text-primary fw-bold d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', fontSize: '12px' }}>
                                                {item.assignedTo.charAt(0)}
                                            </div>
                                            <span className="text-dark fw-medium">{item.assignedTo}</span>
                                        </div>
                                    </td>
                                    <td className="text-secondary">{item.date}</td>
                                    <td>
                                        <span className={`badge rounded-pill ${item.status === 'In Use' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="pe-4 text-end">
                                        <button className="btn btn-sm btn-link text-primary text-decoration-none fw-medium">Edit</button>
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

export default AssetAllocation;

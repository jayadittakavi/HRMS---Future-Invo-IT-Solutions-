import React from 'react';
import { FaDownload, FaUpload } from 'react-icons/fa';

const Form16Tab = () => {
    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Form-16 Management</h5>
                <button className="btn btn-primary btn-sm d-flex align-items-center gap-2">
                    <FaUpload size={12} /> Upload Form-16
                </button>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Employee Name</th>
                                    <th>PAN Number</th>
                                    <th>Financial Year</th>
                                    <th>Uploaded Date</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Rahul Sharma</td>
                                    <td>APKPB1234F</td>
                                    <td>2024-2025</td>
                                    <td>2025-05-15</td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-light text-primary me-2" title="Download"><FaDownload /></button>
                                        <button className="btn btn-sm btn-light text-danger" title="Remove">Remove</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Sanjay Gupta</td>
                                    <td>BPKPB5678G</td>
                                    <td>2024-2025</td>
                                    <td>2025-05-16</td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-light text-primary me-2" title="Download"><FaDownload /></button>
                                        <button className="btn btn-sm btn-light text-danger" title="Remove">Remove</button>
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

export default Form16Tab;

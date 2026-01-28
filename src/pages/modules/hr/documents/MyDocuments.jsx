import React from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";
import { FaFilePdf, FaCloudUploadAlt, FaEye } from 'react-icons/fa';

const MyDocuments = () => {
    const documents = [
        { id: 1, name: 'Employment Contract', type: 'PDF', date: '2024-01-10', status: 'Approved' },
        { id: 2, name: 'Offer Letter', type: 'PDF', date: '2024-01-05', status: 'Approved' },
        { id: 3, name: 'ID Proof (Aadhar)', type: 'PDF', date: '2024-01-12', status: 'Submitted' },
        { id: 4, name: 'Tax Declaration', type: 'PDF', date: '2024-04-01', status: 'Pending Review' },
    ];

    return (
        <DashboardLayout title="My Documents">
            <div className="container-fluid p-0">
                {/* Header Actions */}
                <div className="d-flex justify-content-end mb-4">
                    <button className="btn btn-primary d-flex align-items-center gap-2">
                        <FaCloudUploadAlt /> Upload New Document
                    </button>
                </div>

                <div className="row g-4">
                    {/* Documents List */}
                    <div className="col-12">
                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-header bg-white border-bottom py-3">
                                <h6 className="card-title fw-bold text-secondary mb-0">Personal Documents</h6>
                            </div>
                            <div className="table-responsive">
                                <table className="table align-middle mb-0 text-nowrap">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Document Name</th>
                                            <th>Type</th>
                                            <th>Upload Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documents.map(doc => (
                                            <tr key={doc.id}>
                                                <td>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="bg-danger bg-opacity-10 text-danger p-2 rounded">
                                                            <FaFilePdf size={18} />
                                                        </div>
                                                        <span className="fw-medium text-dark">{doc.name}</span>
                                                    </div>
                                                </td>
                                                <td><span className="badge bg-light text-secondary border">{doc.type}</span></td>
                                                <td className="text-secondary small">{doc.date}</td>
                                                <td>
                                                    <span className={`badge ${doc.status === 'Approved' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}`}>
                                                        {doc.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary border-0" title="View">
                                                        <FaEye /> View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyDocuments;

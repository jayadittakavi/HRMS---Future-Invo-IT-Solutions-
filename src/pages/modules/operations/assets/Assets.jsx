import React, { useState } from 'react';
import { FaEdit, FaTrash, FaBox, FaUserCheck, FaShoppingCart, FaExclamationTriangle } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";

export const AssetsContent = () => {
    // Basic Mock Data
    const initialAssets = [
        { id: 1, name: 'MacBook Pro M2', category: 'IT Equipment', serial: 'MBP2023001', assignedTo: 'Praveen Kumar', employeeId: 'EMP001', issueDate: '2025-01-10', status: 'Assigned', history: [] },
        { id: 2, name: 'Dell XPS 15', category: 'IT Equipment', serial: 'DXPS15002', assignedTo: 'Nitin Patel', employeeId: 'EMP002', issueDate: '2025-01-15', status: 'Assigned', history: [] },
        { id: 3, name: 'Office Chair', category: 'Office Furniture', serial: 'OCE005', assignedTo: 'Priyanka Sharma', employeeId: 'EMP003', issueDate: '2024-11-20', status: 'Assigned', history: [] },
        { id: 4, name: 'Projector', category: 'IT Equipment', serial: 'PRJ009', assignedTo: null, employeeId: null, issueDate: null, status: 'Available', history: [] },
        { id: 5, name: 'Honda City', category: 'Vehicles', serial: 'KA01AB1234', assignedTo: 'Management', employeeId: 'MGT', issueDate: '2023-05-01', status: 'Assigned', history: [] },
        { id: 6, name: 'Old HP Laptop', category: 'IT Equipment', serial: 'HP2019001', assignedTo: null, employeeId: null, issueDate: null, status: 'Damaged', history: [] },
    ];

    const [assets, setAssets] = useState(initialAssets);
    const [auditLogs, setAuditLogs] = useState([
        { id: 1, assetId: 1, assetName: 'MacBook Pro M2', action: 'Assigned', performedBy: 'Super Admin', date: '2025-01-10', remarks: 'New joining kit' },
        { id: 2, assetId: 6, assetName: 'Old HP Laptop', action: 'Marked Damaged', performedBy: 'Admin', date: '2025-01-28', remarks: 'Screen broken' }
    ]);

    // View State
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'audit'
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Stats Calculation
    const stats = {
        total: assets.length,
        assigned: assets.filter(a => a.status === 'Assigned').length,
        unassigned: assets.filter(a => a.status === 'Available').length,
        damaged: assets.filter(a => ['Damaged', 'Retired', 'Maintenance'].includes(a.status)).length
    };

    // Category Stats
    const getCategoryStats = () => {
        const counts = {};
        assets.forEach(a => {
            counts[a.category] = (counts[a.category] || 0) + 1;
        });
        return Object.keys(counts).map(cat => ({ name: cat, count: counts[cat] }));
    };

    // Modals
    const [showActionModal, setShowActionModal] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [actionType, setActionType] = useState(''); // 'assign', 'return', 'maintenance', 'retire'
    const [actionRemarks, setActionRemarks] = useState('');
    const [assignEmployee, setAssignEmployee] = useState('');

    // Handlers
    const handleActionClick = (asset, type) => {
        setSelectedAsset(asset);
        setActionType(type);
        setAssignEmployee('');
        setActionRemarks('');
        setShowActionModal(true);
    };

    const submitAction = () => {
        if (!selectedAsset) return;

        let updatedStatus = selectedAsset.status;
        let updatedAssignedTo = selectedAsset.assignedTo;
        let updatedIssueDate = selectedAsset.issueDate;

        if (actionType === 'assign') {
            updatedStatus = 'Assigned';
            updatedAssignedTo = assignEmployee || 'Unknown';
            updatedIssueDate = new Date().toISOString().split('T')[0];
        } else if (actionType === 'return') {
            updatedStatus = 'Available';
            updatedAssignedTo = null;
            updatedIssueDate = null;
        } else if (actionType === 'maintenance') {
            updatedStatus = 'Under Maintenance';
        } else if (actionType === 'retire') {
            updatedStatus = 'Retired';
        } else if (actionType === 'damaged') {
            updatedStatus = 'Damaged';
        }

        // Update Asset
        const updatedAssets = assets.map(a =>
            a.id === selectedAsset.id ? { ...a, status: updatedStatus, assignedTo: updatedAssignedTo, issueDate: updatedIssueDate } : a
        );
        setAssets(updatedAssets);

        // Add Log
        const newLog = {
            id: auditLogs.length + 1,
            assetId: selectedAsset.id,
            assetName: selectedAsset.name,
            action: actionType.charAt(0).toUpperCase() + actionType.slice(1),
            performedBy: 'Super Admin', // Mocked user
            date: new Date().toISOString().split('T')[0],
            remarks: actionRemarks || 'No remarks'
        };
        setAuditLogs([newLog, ...auditLogs]);

        setShowActionModal(false);
    };

    const filteredAssets = selectedCategory === 'All' ? assets : assets.filter(a => a.category === selectedCategory);

    return (
        <div className="container-fluid p-0">
            {/* 1. Asset Summary Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="dashboard-card bg-white border-start border-4 border-primary shadow-sm h-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted small fw-bold text-uppercase mb-1">Total Assets</h6>
                                <h3 className="fw-bold text-dark mb-0">{stats.total}</h3>
                            </div>
                            <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-2">
                                <FaBox size={24} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card bg-white border-start border-4 border-success shadow-sm h-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted small fw-bold text-uppercase mb-1">Assigned</h6>
                                <h3 className="fw-bold text-dark mb-0">{stats.assigned}</h3>
                            </div>
                            <div className="icon-box bg-success bg-opacity-10 text-success rounded-circle p-2">
                                <FaUserCheck size={24} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card bg-white border-start border-4 border-info shadow-sm h-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted small fw-bold text-uppercase mb-1">Available</h6>
                                <h3 className="fw-bold text-dark mb-0">{stats.unassigned}</h3>
                            </div>
                            <div className="icon-box bg-info bg-opacity-10 text-info rounded-circle p-2">
                                <FaShoppingCart size={24} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="dashboard-card bg-white border-start border-4 border-danger shadow-sm h-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted small fw-bold text-uppercase mb-1">Lost / Damaged</h6>
                                <h3 className="fw-bold text-dark mb-0">{stats.damaged}</h3>
                            </div>
                            <div className="icon-box bg-danger bg-opacity-10 text-danger rounded-circle p-2">
                                <FaExclamationTriangle size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Asset Category Breakdown */}
            <div className="row g-4 mb-4">
                <div className="col-12">
                    <div className="bg-white p-3 rounded shadow-sm">
                        <h6 className="fw-bold mb-3">Asset Category Breakdown</h6>
                        <div className="d-flex flex-wrap gap-3">
                            {getCategoryStats().map((cat, idx) => (
                                <div key={idx} className="d-flex align-items-center bg-light px-3 py-2 rounded border">
                                    <span className="fw-bold me-2">{cat.name}:</span>
                                    <span className="badge bg-secondary">{cat.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Header / Controls */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-3 align-items-center">
                    <h5 className="fw-bold text-dark mb-0">Assets</h5>
                    {/* 7. Categories Dropdown */}
                    <select
                        className="form-select form-select-sm"
                        style={{ width: '200px' }}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        {getCategoryStats().map((cat, idx) => (
                            <option key={idx} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="btn-group">
                    <button className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setViewMode('list')}>Asset List</button>
                    <button className={`btn btn-sm ${viewMode === 'audit' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setViewMode('audit')}>Audit Log</button>
                    {/* Add Asset Button Placeholder */}
                </div>
            </div>

            {/* Main Content Area */}
            {viewMode === 'list' && (
                <div className="table-card">
                    <div className="table-responsive">
                        <table className="table custom-table table-hover align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th>Asset ID</th>
                                    <th>Asset Name</th>
                                    <th>Category</th>
                                    <th>Assigned To</th>
                                    <th>Issue Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAssets.map((asset) => (
                                    <tr key={asset.id}>
                                        <td className="small text-secondary">#{asset.id}</td>
                                        <td>
                                            <span className="fw-bold text-dark">{asset.name}</span>
                                            <div className="text-muted small">{asset.serial}</div>
                                        </td>
                                        <td><span className="badge bg-light text-dark border">{asset.category}</span></td>
                                        <td>
                                            {asset.assignedTo ? (
                                                <span className="fw-bold text-primary">{asset.assignedTo}</span>
                                            ) : (
                                                <span className="text-muted small">-</span>
                                            )}
                                        </td>
                                        <td className="small">{asset.issueDate || '-'}</td>
                                        <td>
                                            {/* 4. Asset Status Tracking */}
                                            <span className={`badge rounded-pill px-3 py-1 ${asset.status === 'Assigned' ? 'bg-success' :
                                                asset.status === 'Available' ? 'bg-info text-dark' :
                                                    asset.status === 'Damaged' ? 'bg-danger' :
                                                        asset.status === 'Retired' ? 'bg-secondary' :
                                                            'bg-warning text-dark'
                                                }`}>
                                                {asset.status}
                                            </span>
                                        </td>
                                        <td>
                                            {/* 5. Lifecycle Actions */}
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-light border dropdown-toggle" type="button" data-bs-toggle="dropdown" onClick={(e) => {
                                                    // Bootstrap dropdown toggle fix if needed or standard bootstrap js
                                                    e.currentTarget.nextElementSibling.classList.toggle('show');
                                                }}>
                                                    Actions
                                                </button>
                                                <ul className="dropdown-menu">
                                                    {asset.status === 'Available' && (
                                                        <li><button className="dropdown-item" onClick={() => handleActionClick(asset, 'assign')}>Assign Asset</button></li>
                                                    )}
                                                    {asset.status === 'Assigned' && (
                                                        <li><button className="dropdown-item" onClick={() => handleActionClick(asset, 'return')}>Mark Returned</button></li>
                                                    )}
                                                    <li><button className="dropdown-item" onClick={() => handleActionClick(asset, 'maintenance')}>Mark Maintenance</button></li>
                                                    <li><button className="dropdown-item text-danger" onClick={() => handleActionClick(asset, 'damaged')}>Mark Damaged</button></li>
                                                    <li><button className="dropdown-item text-secondary" onClick={() => handleActionClick(asset, 'retire')}>Retire Asset</button></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 6. Audit & Logs View */}
            {viewMode === 'audit' && (
                <div className="table-card">
                    <div className="table-responsive">
                        <table className="table custom-table table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Asset Name</th>
                                    <th>Action</th>
                                    <th>Performed By</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditLogs.map((log) => (
                                    <tr key={log.id}>
                                        <td className="small">{log.date}</td>
                                        <td className="fw-bold">{log.assetName}</td>
                                        <td>
                                            <span className="badge bg-light text-dark border">{log.action}</span>
                                        </td>
                                        <td className="small text-secondary">{log.performedBy}</td>
                                        <td className="small text-muted">{log.remarks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Lifecycle Action Modal */}
            {showActionModal && selectedAsset && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-capitalize">{actionType} Asset: {selectedAsset.name}</h5>
                                <button className="btn-close" onClick={() => setShowActionModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    {actionType === 'assign' && (
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold">Assign To (Employee Name)</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={assignEmployee}
                                                onChange={(e) => setAssignEmployee(e.target.value)}
                                                placeholder="e.g. John Doe"
                                            />
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Remarks / Notes</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={actionRemarks}
                                            onChange={(e) => setActionRemarks(e.target.value)}
                                            placeholder="Enter audit remarks..."
                                        ></textarea>
                                    </div>
                                    <p className="small text-muted mb-0">
                                        This action will be logged in the audit trail.
                                    </p>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowActionModal(false)}>Cancel</button>
                                <button className="btn btn-primary btn-sm text-capitalize" onClick={submitAction}>Confirm {actionType}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Assets = () => {
    return (
        <DashboardLayout title="">
            <AssetsContent />
        </DashboardLayout>
    );
};

export default Assets;

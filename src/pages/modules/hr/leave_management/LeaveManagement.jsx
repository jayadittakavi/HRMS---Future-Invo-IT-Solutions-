import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";
import { useAuth } from '../../../../context/AuthContext';
import BulkLeaveModal from './BulkLeaveModal';
import { FaLayerGroup } from 'react-icons/fa';

export const LeaveManagementContent = ({ personal = false }) => {
    // Mock Data - Admin
    const { user } = useAuth();
    // ... (keep existing data) ...

    // Modal States
    const [showApply, setShowApply] = useState(false);
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [showApprove, setShowApprove] = useState(false);
    const [showReject, setShowReject] = useState(false);
    const [showPolicies, setShowPolicies] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');

    // ... (keep existing handlers) ...

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">{personal ? 'My Leaves' : 'Leave Management'}</h5>
                    <p className="text-secondary small mb-0">{personal ? 'View your leave history and application status' : 'Review and manage employee leave requests'}</p>
                </div>
                <div>
                    {!personal && (
                        <>
                            <button className="btn btn-outline-primary btn-sm px-3 rounded-pill me-2" onClick={() => setShowPolicies(true)}>
                                Leave Policies
                            </button>
                            <button className="btn btn-outline-secondary btn-sm px-3 rounded-pill me-2 d-inline-flex align-items-center gap-1" onClick={() => setShowBulkModal(true)}>
                                <FaLayerGroup /> Bulk Allocation
                            </button>
                        </>
                    )}
                    {(!personal && user?.role !== 'superadmin') && (
                        <button className="btn btn-primary btn-sm px-3 rounded-pill" onClick={() => setShowApply(true)}>
                            + Apply Leave
                        </button>
                    )}
                </div>
            </div>

            {/* ... (keep table and other modals) ... */}

            {/* Bulk Leave Modal */}
            {showBulkModal && (
                <BulkLeaveModal onClose={() => setShowBulkModal(false)} />
            )}
        </>
    );
};

// ... (keep default export)

const LeaveManagement = ({ personal = false }) => {
    return (
        <DashboardLayout title={personal ? "My Leaves" : "Leave Management"}>
            <LeaveManagementContent personal={personal} />
        </DashboardLayout>
    );
};

export default LeaveManagement;

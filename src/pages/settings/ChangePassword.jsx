import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FaLock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState(null); // 'success' | 'error'

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setStatus('error');
            return;
        }
        // Mock API Call
        setTimeout(() => {
            setStatus('success');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }, 1000);
    };

    return (
        <DashboardLayout title="Change Password">
            <div className="container-fluid p-0">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <div className="bg-light rounded-circle d-inline-flex p-3 mb-3 text-primary">
                                        <FaLock size={24} />
                                    </div>
                                    <h5 className="fw-bold">Update Security</h5>
                                    <p className="text-secondary small">Ensure your account stays secure by updating your password regularly.</p>
                                </div>

                                {status === 'success' && (
                                    <div className="alert alert-success d-flex align-items-center gap-2 small">
                                        <FaCheckCircle /> Password updated successfully!
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="alert alert-danger d-flex align-items-center gap-2 small">
                                        <FaExclamationTriangle /> Passwords do not match.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">Current Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold">New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label small fw-bold">Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ChangePassword;

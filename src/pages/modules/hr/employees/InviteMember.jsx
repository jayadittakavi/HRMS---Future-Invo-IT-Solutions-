import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FiUserPlus, FiArrowRight, FiCheckCircle, FiInfo, FiArrowLeft, 
    FiShield, FiLayers, FiCheck, FiMail, FiPhone, FiTarget 
} from 'react-icons/fi';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { usePermissions } from '../../../../context/PermissionsContext';
import './InviteMember.css';

const InviteMember = () => {
    const navigate = useNavigate();
    const { roles, inviteEmployee } = usePermissions();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: 'Engineering',
        designation: '',
        role: 'employee',
        manager: '',
        status: 'Invited'
    });

    const [isInviting, setIsInviting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInvite = async () => {
        setIsInviting(true);
        setError('');
        
        try {
            const success = await inviteEmployee(formData);
            if (success) {
                setIsInviting(false);
                setShowSuccess(true);
                setTimeout(() => {
                    navigate('/employee-directory');
                }, 3000);
            } else {
                throw new Error("Failed to send invitation. Please try again.");
            }
        } catch (err) {
            setError(err.message || "An error occurred while sending the invitation.");
            setIsInviting(false);
        }
    };

    const selectedRole = roles.find(r => r.id === formData.role) || (roles.length > 0 ? roles[0] : null);

    return (
        <DashboardLayout title="">
            <div className="invite-flow-container">
                {/* Flow Header */}
                <div className="d-flex align-items-center gap-3 mb-5">
                    <button className="btn-back-circle" onClick={() => navigate(-1)}>
                        <FiArrowLeft />
                    </button>
                    <div>
                        <h2 className="fw-bold text-dark mb-0">Invite New Employee</h2>
                        <p className="text-muted small">Step {step} of 2: {step === 1 ? 'Employee Details' : 'Review Permissions'}</p>
                    </div>
                </div>

                {showSuccess ? (
                    <div className="success-simulation-card animate__animated animate__zoomIn">
                        <div className="success-icon-wrapper">
                            <FiCheckCircle size={60} color="#10b981" />
                        </div>
                        <h3 className="fw-bold mt-4">Invitation Sent!</h3>
                        <p className="text-muted text-center max-w-400">
                            The invitation email has been sent successfully to <strong>{formData.email}</strong>. 
                            The employee will receive instructions to set up their account.
                        </p>
                        <div className="loading-bar-container mt-4">
                            <div className="loading-bar-progress"></div>
                        </div>
                        <p className="extra-small text-muted mt-2">Redirecting to directory...</p>
                    </div>
                ) : (
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-8">
                            {error && (
                                <div className="alert alert-danger mb-4 rounded-4 small">
                                    {error}
                                </div>
                            )}
                            <div className="invite-card-modern shadow-lg">
                                {step === 1 ? (
                                    <div className="step-1-form animate__animated animate__fadeIn">
                                        <div className="form-section-header mb-4">
                                            <FiUserPlus className="text-primary me-2" />
                                            <h5 className="mb-0 fw-bold">Basic Information</h5>
                                        </div>
                                        <div className="row g-4">
                                            <div className="col-md-12">
                                                <label className="form-label modern-label">Full Name</label>
                                                <input type="text" name="name" className="form-control modern-input" placeholder="John Doe" value={formData.name} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label modern-label">Work Email</label>
                                                <div className="input-with-icon">
                                                    <FiMail />
                                                    <input type="email" name="email" className="form-control modern-input" placeholder="john@company.com" value={formData.email} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label modern-label">Phone Number</label>
                                                <div className="input-with-icon">
                                                    <FiPhone />
                                                    <input type="tel" name="phone" className="form-control modern-input" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label modern-label">Department</label>
                                                <select name="department" className="form-select modern-input" value={formData.department} onChange={handleInputChange}>
                                                    <option value="Engineering">Engineering</option>
                                                    <option value="Product">Product</option>
                                                    <option value="Marketing">Marketing</option>
                                                    <option value="Sales">Sales</option>
                                                    <option value="HR">HR</option>
                                                    <option value="Finance">Finance</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label modern-label">Designation</label>
                                                <input type="text" name="designation" className="form-control modern-input" placeholder="Senior Software Engineer" value={formData.designation} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label modern-label">Access Role</label>
                                                <select name="role" className="form-select modern-input role-highlight" value={formData.role} onChange={handleInputChange}>
                                                    {roles.length > 0 ? roles.map(r => (
                                                        <option key={r.id} value={r.id}>{r.name}</option>
                                                    )) : (
                                                        <option value="employee">Employee</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label modern-label">Reporting Manager</label>
                                                <input type="text" name="manager" className="form-control modern-input" placeholder="Select Manager" value={formData.manager} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end mt-5">
                                            <button className="btn btn-primary-modern" onClick={() => setStep(2)}>
                                                Review Permissions <FiArrowRight className="ms-2" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="step-2-review animate__animated animate__fadeIn">
                                        <div className="review-header mb-4">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="role-icon-preview" style={{ backgroundColor: selectedRole?.dotColor || '#3b82f6' }}>
                                                    <FiShield color="white" />
                                                </div>
                                                <div>
                                                    <h5 className="mb-0 fw-bold">Role Permissions Preview</h5>
                                                    <p className="text-muted small mb-0">Permissions assigned to <strong>{selectedRole?.name || 'Selected'}</strong> role</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="permissions-preview-grid">
                                            {selectedRole && selectedRole.permissions ? Object.entries(selectedRole.permissions).map(([cat, perms]) => (
                                                <div key={cat} className="preview-category-card">
                                                    <h6 className="text-uppercase fw-bold text-primary extra-small mb-3">{cat}</h6>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {Array.isArray(perms) ? perms.map(p => (
                                                            <div key={p} className="preview-tag">
                                                                <FiCheck size={10} className="me-1" /> {p.replace(/_/g, ' ')}
                                                            </div>
                                                        )) : (
                                                            <div className="text-muted extra-small">No specific permissions</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="text-center py-4 text-muted small">No permission details available for this role</div>
                                            )}
                                        </div>

                                        <div className="alert-permission-info mt-4">
                                            <FiInfo className="me-2" size={18} />
                                            <span className="small">These permissions can be customized for the individual later from the Employee Directory.</span>
                                        </div>

                                        <div className="d-flex justify-content-between mt-5">
                                            <button className="btn btn-outline-modern" onClick={() => setStep(1)}>
                                                <FiArrowLeft className="me-2" /> Back to Details
                                            </button>
                                            <button className="btn btn-success-modern" onClick={handleInvite} disabled={isInviting}>
                                                {isInviting ? 'Sending Invitation...' : 'Save & Send Invitation'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="col-lg-4">
                            <div className="invite-summary-card shadow-sm border-0">
                                <h6 className="fw-bold mb-4">Invitation Summary</h6>
                                <div className="summary-item mb-3">
                                    <label className="text-muted extra-small text-uppercase fw-bold">Employee</label>
                                    <div className="fw-bold">{formData.name || 'New Employee'}</div>
                                    <div className="text-muted small">{formData.email || 'No email provided'}</div>
                                </div>
                                <div className="summary-item mb-3">
                                    <label className="text-muted extra-small text-uppercase fw-bold">Position</label>
                                    <div className="fw-bold">{formData.designation || 'Not specified'}</div>
                                    <div className="text-muted small">{formData.department} Department</div>
                                </div>
                                <div className="summary-item">
                                    <label className="text-muted extra-small text-uppercase fw-bold">Assigned Access</label>
                                    <div className="role-tag-summary" style={{ borderColor: selectedRole?.dotColor || '#3b82f6' }}>
                                        <FiShield size={14} style={{ color: selectedRole?.dotColor || '#3b82f6' }} className="me-2" />
                                        <span className="fw-bold">{selectedRole?.name || 'Employee'}</span>
                                    </div>
                                </div>

                                <div className="summary-footer mt-5 p-3 bg-light rounded-4">
                                    <div className="d-flex align-items-center gap-2 text-primary fw-bold">
                                        <FiTarget /> <span className="small">Access Level: {selectedRole?.modulesCount || 0} Modules</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default InviteMember;

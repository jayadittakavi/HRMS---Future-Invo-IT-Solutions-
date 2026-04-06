import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import DashboardLayout from '../../../../components/layout/DashboardLayout';

const InviteMember = () => {
    const navigate = useNavigate();
    const [inviteData, setInviteData] = useState({ name: '', email: '', company_email: '', password: '', confirm_password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <DashboardLayout title="Invite Member">
            <div className="container-fluid p-0 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="custom-invite-card shadow-lg" style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '480px' }}>
                    <h4 className="fw-bolder mb-4 custom-modal-title" style={{ fontFamily: 'Georgia, serif', color: '#0f172a' }}>Add / Invite New Member</h4>
                    
                    <div className="mb-4">
                        <label className="fw-bold mb-2 text-secondary" style={{ fontSize: '0.85rem' }}>Full Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter full name" 
                            value={inviteData.name} 
                            onChange={e => setInviteData({...inviteData, name: e.target.value})} 
                            style={{ padding: '12px 16px', borderRadius: '10px' }}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="fw-bold mb-2 text-secondary" style={{ fontSize: '0.85rem' }}>Email Address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter email" 
                            value={inviteData.email} 
                            onChange={e => setInviteData({...inviteData, email: e.target.value})} 
                            style={{ padding: '12px 16px', borderRadius: '10px' }}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="fw-bold mb-2 text-secondary" style={{ fontSize: '0.85rem' }}>Company Mail</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter company mail" 
                            value={inviteData.company_email} 
                            onChange={e => setInviteData({...inviteData, company_email: e.target.value})} 
                            style={{ padding: '12px 16px', borderRadius: '10px' }}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="fw-bold mb-2 text-secondary d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
                            Password <span className="text-muted fw-normal" style={{ fontSize: '0.75rem' }}>(will be sent to employee via email)</span>
                        </label>
                        <div className="position-relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="form-control" 
                                placeholder="Set a temporary password" 
                                value={inviteData.password} 
                                onChange={e => setInviteData({...inviteData, password: e.target.value})} 
                                style={{ padding: '12px 16px', borderRadius: '10px', paddingRight: '40px' }}
                            />
                            <button 
                                type="button"
                                className="btn position-absolute top-50 end-0 translate-middle-y border-0 shadow-none bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff size={18} className="text-secondary" /> : <FiEye size={18} className="text-secondary" />}
                            </button>
                        </div>
                    </div>
                    
                    <div className="mb-5">
                        <label className="fw-bold mb-2 text-secondary" style={{ fontSize: '0.85rem' }}>Confirm Password</label>
                        <div className="position-relative">
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                className="form-control" 
                                placeholder="Confirm temporary password" 
                                value={inviteData.confirm_password} 
                                onChange={e => setInviteData({...inviteData, confirm_password: e.target.value})} 
                                style={{ padding: '12px 16px', borderRadius: '10px', paddingRight: '40px' }}
                            />
                            <button 
                                type="button"
                                className="btn position-absolute top-50 end-0 translate-middle-y border-0 shadow-none bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FiEyeOff size={18} className="text-secondary" /> : <FiEye size={18} className="text-secondary" />}
                            </button>
                        </div>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <button className="btn btn-link text-decoration-none text-muted fw-bold p-0" onClick={() => navigate('/employee-directory')}>Cancel</button>
                        <button className="btn btn-primary fw-bold px-4 py-2 rounded-3 shadow-sm" style={{ background: '#3b82f6' }} onClick={() => { 
                            if (!inviteData.email && !inviteData.company_email) {
                                alert("Please enter at least one email address to send the invitation.");
                                return;
                            }
                            if (inviteData.password !== inviteData.confirm_password) {
                                alert("Passwords do not match. Please ensure both fields are identical.");
                                return;
                            }
                            
                            // Proceed to Assign Roles process
                            navigate('/add-member', { state: { newMember: inviteData } }); 
                        }}>
                            Roles & Permissions &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default InviteMember;

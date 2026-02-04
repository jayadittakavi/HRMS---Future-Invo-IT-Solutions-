import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useAuth } from "../../../../context/AuthContext";
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const ProfileContent = () => {
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    // Update local state when user context changes (e.g. after save)
    useEffect(() => {
        setName(user?.name || '');
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSave = () => {
        updateProfile({ name: name });
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handleCancel = () => {
        setName(user?.name || '');
        setIsEditing(false);
    };

    return (
        <div className="container py-4">
            <div className="row g-4 justify-content-center">
                {/* Components Left: User Card */}
                <div className="col-md-4 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100">
                        <div className="position-relative d-inline-block mx-auto mb-3">
                            <div
                                className="rounded-circle bg-primary bg-gradient text-white d-flex align-items-center justify-content-center shadow-lg overflow-hidden cursor-pointer position-relative"
                                style={{ width: '120px', height: '120px', fontSize: '3rem', cursor: 'pointer' }}
                                onClick={() => isEditing && document.getElementById('profile-upload').click()}
                            >
                                {user?.profilePic ? (
                                    <img src={user.profilePic} alt="Profile" className="w-100 h-100 object-fit-cover" />
                                ) : (
                                    user?.name?.charAt(0) || 'U'
                                )}
                                {isEditing && (
                                    <div className="position-absolute w-100 h-100 bg-black bg-opacity-50 d-flex align-items-center justify-content-center">
                                        <span className="fs-6 text-white fw-bold">Change</span>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="profile-upload"
                                className="d-none"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            updateProfile({ profilePic: reader.result });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                disabled={!isEditing}
                            />
                        </div>
                        {isEditing ? (
                            <input
                                type="text"
                                className="form-control text-center mb-1 fw-bold"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        ) : (
                            <h4 className="fw-bold text-main mb-1">{user?.name || 'User Name'}</h4>
                        )}
                        <p className="text-secondary mb-3">{user?.role || 'Role'}</p>

                        <div className="d-flex justify-content-center gap-2 mb-4">
                            {isEditing ? (
                                <>
                                    <button className="btn btn-success rounded-pill px-3 btn-sm" onClick={handleSave}>Save</button>
                                    <button className="btn btn-secondary rounded-pill px-3 btn-sm" onClick={handleCancel}>Cancel</button>
                                </>
                            ) : (
                                <button className="btn btn-primary rounded-pill px-3 btn-sm" onClick={() => setIsEditing(true)}>Edit Profile</button>
                            )}
                            <button className="btn btn-outline-danger rounded-pill px-3 btn-sm" onClick={handleLogout}>Logout</button>
                        </div>

                        <hr className="text-secondary opacity-25" />

                        <div className="text-start mt-4">
                            <div className="d-flex align-items-center mb-3 text-secondary">
                                <FaEnvelope className="me-3 opacity-50" />
                                <span>{user?.email || 'user@example.com'}</span>
                            </div>
                            <div className="d-flex align-items-center mb-3 text-secondary">
                                <FaMapMarkerAlt className="me-3 opacity-50" />
                                <span>San Francisco, CA</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Components Right: Details */}
                <div className="col-md-8 col-lg-9">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-transparent border-0 pt-4 px-4 pb-0">
                            <h5 className="fw-bold">Profile Details</h5>
                        </div>
                        <div className="card-body p-4">
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small text-secondary">Full Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-card border-0"><FaUser className="text-secondary" /></span>
                                            <input
                                                type="text"
                                                className={`form-control bg-card border-0 ${isEditing ? 'bg-white border rounded' : ''}`}
                                                value={name}
                                                readOnly={!isEditing}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-secondary">Email</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-card border-0"><FaEnvelope className="text-secondary" /></span>
                                            <input type="text" className="form-control bg-card border-0" value={user?.email || ''} readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-secondary">Role</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-card border-0"><FaBriefcase className="text-secondary" /></span>
                                            <input type="text" className="form-control bg-card border-0" value={user?.role || ''} readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-secondary">Status</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-card border-0"><FaCheckCircle className="text-success" /></span>
                                            <input type="text" className="form-control bg-card border-0 text-success fw-bold" value="Active" readOnly />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Profile = () => {
    return (
        <DashboardLayout title="">
            <ProfileContent />
        </DashboardLayout>
    );
};

export { ProfileContent };
export default Profile;

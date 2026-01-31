import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useAuth } from "../../../../context/AuthContext";
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const ProfileContent = () => {
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container py-4">
            <div className="row g-4 justify-content-center">
                {/* Components Left: User Card */}
                <div className="col-md-4 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100">
                        <div className="position-relative d-inline-block mx-auto mb-3">
                            <div
                                className="rounded-circle bg-primary bg-gradient text-white d-flex align-items-center justify-content-center shadow-lg overflow-hidden cursor-pointer"
                                style={{ width: '120px', height: '120px', fontSize: '3rem', cursor: 'pointer' }}
                                onClick={() => document.getElementById('profile-upload').click()}
                            >
                                {user?.profilePic ? (
                                    <img src={user.profilePic} alt="Profile" className="w-100 h-100 object-fit-cover" />
                                ) : (
                                    user?.name?.charAt(0) || 'U'
                                )}
                            </div>
                            <div className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-2"></div>
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
                            />
                        </div>
                        <h4 className="fw-bold text-main mb-1">{user?.name || 'User Name'}</h4>
                        <p className="text-secondary mb-3">{user?.role || 'Role'}</p>
                        <div className="d-flex justify-content-center gap-2 mb-4">
                            <button className="btn btn-primary rounded-pill px-3 btn-sm">Edit Profile</button>
                            <button className="btn btn-outline-danger rounded-pill px-3 btn-sm" onClick={handleLogout}>Logout</button>
                        </div>

                        <hr className="text-secondary opacity-25" />

                        <div className="text-start mt-4">
                            <div className="d-flex align-items-center mb-3 text-secondary">
                                <FaEnvelope className="me-3 opacity-50" />
                                <span>{user?.email || 'user@example.com'}</span>
                            </div>
                            <div className="d-flex align-items-center mb-3 text-secondary">
                                <FaPhone className="me-3 opacity-50" />
                                <span>+1 (555) 123-4567</span>
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
                                            <input type="text" className="form-control bg-card border-0" value={user?.name || ''} readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-secondary">Department</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-card border-0"><FaBuilding className="text-secondary" /></span>
                                            <input type="text" className="form-control bg-card border-0" value="Engineering" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-secondary">Job Title</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-card border-0"><FaBriefcase className="text-secondary" /></span>
                                            <input type="text" className="form-control bg-card border-0" value="Senior Developer" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-secondary">Joining Date</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-card border-0"><FaCalendarAlt className="text-secondary" /></span>
                                            <input type="text" className="form-control bg-card border-0" value="Jan 15, 2023" readOnly />
                                        </div>
                                    </div>
                                </div>

                                <h6 className="fw-bold mt-5 mb-3">Bio</h6>
                                <textarea className="form-control bg-card border-0 rounded-3 p-3" rows="4" readOnly defaultValue="Experienced software engineer with a focus on frontend technologies. Passionate about building clean, efficient, and user-friendly applications."></textarea>
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

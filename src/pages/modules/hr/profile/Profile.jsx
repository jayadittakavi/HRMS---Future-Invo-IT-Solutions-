import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useAuth } from "../../../../context/AuthContext";
import { attendanceService } from "../../../attendance/service/service";
import {
    FaUser, FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt,
    FaBriefcase, FaCalendarAlt, FaCheckCircle, FaIdCard, FaUserTie, FaNetworkWired
} from 'react-icons/fa';

const ProfileContent = () => {
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();

    // State
    const [loading, setLoading] = useState(true);
    const [employeeData, setEmployeeData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [pendingPic, setPendingPic] = useState(null);

    // Fetch Real-time Data
    useEffect(() => {
        const fetchProfileData = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                // Fetch all employees to find current user's detailed record
                // Ideally, there should be a dedicated /me endpoint for full profile
                const response = await attendanceService.getAllEmployees();
                const employees = Array.isArray(response) ? response : (response.data || response.employees || []);

                const matchedEmployee = employees.find(emp =>
                    emp.email?.toLowerCase() === user.email.toLowerCase() ||
                    emp.user?.toLowerCase() === user.username?.toLowerCase()
                );

                if (matchedEmployee) {
                    setEmployeeData(matchedEmployee);
                    setName(matchedEmployee.name || user.name);
                } else {
                    console.warn("User profile not found in employee records.");
                }
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSave = () => {
        const updates = { name: name };
        if (pendingPic) {
            updates.profilePic = pendingPic;
        }
        updateProfile(updates);
        setPendingPic(null);
        setIsEditing(false);
        // Note: Real API update for employee details matches here would go here
        alert('Profile updated successfully! (Local changes only)');
    };

    const handleCancel = () => {
        setName(employeeData?.name || user?.name || '');
        setPendingPic(null);
        setIsEditing(false);
    };

    if (loading) {
        return <div className="p-5 text-center text-secondary">Loading profile...</div>;
    }

    // Merge Context User and Fetched Employee Data
    const displayUser = {
        ...user,
        ...employeeData, // Employee data takes precedence for details
        name: name, // Local state for editing
        role: employeeData?.type || user?.role || 'User',
        status: employeeData?.status || 'Active'
    };

    return (
        <div className="container p-4">
            {/* Header / Cover Area - could be added if design requires */}

            <div className="row g-4">
                {/* Left Column: User Card */}
                <div className="col-12 col-xl-3 col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 text-center p-4">
                        <div className="position-relative d-inline-block mx-auto mb-3">
                            <div
                                className="rounded-circle bg-light border d-flex align-items-center justify-content-center overflow-hidden position-relative"
                                style={{ width: '130px', height: '130px', cursor: isEditing ? 'pointer' : 'default' }}
                                onClick={() => isEditing && document.getElementById('profile-upload').click()}
                            >
                                {(pendingPic || displayUser.profilePic) ? (
                                    <img src={pendingPic || displayUser.profilePic} alt="Profile" className="w-100 h-100 object-fit-cover" />
                                ) : (
                                    <span className="display-4 fw-bold text-secondary">{displayUser.name?.charAt(0) || <FaUser />}</span>
                                )}

                                {isEditing && (
                                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
                                        <small className="text-white fw-bold">Change</small>
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
                                        reader.onloadend = () => setPendingPic(reader.result);
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                disabled={!isEditing}
                            />
                        </div>

                        <h4 className="fw-bold text-dark mb-1">{displayUser.name}</h4>
                        <p className="text-secondary mb-3">{displayUser.desig || displayUser.role}</p>

                        <div className="d-flex justify-content-center gap-2 mb-4">
                            {isEditing ? (
                                <>
                                    <button className="btn btn-success rounded-pill px-4 btn-sm" onClick={handleSave}>Save</button>
                                    <button className="btn btn-light rounded-pill px-4 btn-sm" onClick={handleCancel}>Cancel</button>
                                </>
                            ) : (
                                <button className="btn btn-primary rounded-pill px-4 btn-sm" onClick={() => setIsEditing(true)}>Edit Profile</button>
                            )}
                        </div>

                        <div className="card bg-light border-0 rounded-3 p-3 text-start">
                            <div className="d-flex align-items-center mb-2">
                                <div className="rounded-circle bg-white p-2 text-primary me-3 shadow-sm">
                                    <FaEnvelope size={14} />
                                </div>
                                <div>
                                    <small className="text-muted d-block" style={{ fontSize: '10px' }}>EMAIL</small>
                                    <span className="fw-bold small text-dark text-break">{displayUser.email}</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-white p-2 text-primary me-3 shadow-sm">
                                    <FaPhone size={14} />
                                </div>
                                <div>
                                    <small className="text-muted d-block" style={{ fontSize: '10px' }}>PHONE</small>
                                    <span className="fw-bold small text-dark">{displayUser.phone || 'Not set'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button className="btn btn-outline-danger w-100 rounded-pill btn-sm" onClick={handleLogout}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="col-12 col-xl-9 col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white border-bottom p-4">
                            <h5 className="fw-bold mb-0">General Information</h5>
                        </div>
                        <div className="card-body p-4">
                            <form>
                                <h6 className="text-uppercase text-secondary fw-bold small mb-3">Work Information</h6>
                                <div className="row g-4 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted">Employee ID</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><FaIdCard className="text-secondary" /></span>
                                            <input type="text" className="form-control bg-light border-start-0 fw-bold" value={displayUser.employee_id || displayUser.id || 'N/A'} readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted">Department</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><FaNetworkWired className="text-secondary" /></span>
                                            <input type="text" className="form-control bg-light border-start-0 fw-bold" value={displayUser.dept || 'N/A'} readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted">Role / Designation</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><FaBriefcase className="text-secondary" /></span>
                                            <input type="text" className="form-control bg-light border-start-0 fw-bold" value={displayUser.desig || displayUser.role || 'N/A'} readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted">Manager / Reporting To</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><FaUserTie className="text-secondary" /></span>
                                            <input type="text" className="form-control bg-light border-start-0 fw-bold" value={displayUser.manager || 'N/A'} readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted">Date of Joining</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><FaCalendarAlt className="text-secondary" /></span>
                                            <input type="text" className="form-control bg-light border-start-0 fw-bold" value={displayUser.joiningDate || 'N/A'} readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted">Branch / Location</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><FaMapMarkerAlt className="text-secondary" /></span>
                                            <input type="text" className="form-control bg-light border-start-0 fw-bold" value={displayUser.branch || displayUser.city || 'N/A'} readOnly />
                                        </div>
                                    </div>
                                </div>

                                <hr className="my-4 text-secondary opacity-25" />

                                <h6 className="text-uppercase text-secondary fw-bold small mb-3">Basic Details</h6>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted">Full Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white"><FaUser className="text-secondary" /></span>
                                            <input
                                                type="text"
                                                className={`form-control ${isEditing ? 'border-primary' : 'bg-light'}`}
                                                value={displayUser.name}
                                                onChange={(e) => setName(e.target.value)}
                                                readOnly={!isEditing}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted">Personal Email</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white"><FaEnvelope className="text-secondary" /></span>
                                            <input
                                                type="email"
                                                className="form-control bg-light"
                                                value={displayUser.email}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted">Phone Number</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white"><FaPhone className="text-secondary" /></span>
                                            <input
                                                type="tel"
                                                className={`form-control ${isEditing ? 'border-primary' : 'bg-light'}`}
                                                value={displayUser.phone || ''}
                                                readOnly={!isEditing}
                                            // Note: Ideally update a phone state similarly to name
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-muted">Account Status</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><FaCheckCircle className="text-success" /></span>
                                            <input type="text" className="form-control bg-light border-start-0 text-success fw-bold" value={displayUser.status} readOnly />
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

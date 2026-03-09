import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiBriefcase, FiDollarSign, FiCalendar, FiMail, FiPhone, FiLock, FiChevronLeft } from 'react-icons/fi';
import DashboardLayout from '../../../../components/layout/DashboardLayout';

const AddMember = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userAccount: '',
        name: '',
        email: '',
        phone: '',
        dept: '',
        desig: '',
        type: 'Employee',
        joiningDate: '',
        company: '',
        branch: '',
        ctc: '',
        manager: '',
        status: 'Active',
        lock: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Employee Data:", formData);
        alert("Employee profile initialized and added successfully!");
        navigate('/employee-directory');
    };

    return (
        <DashboardLayout title="Member Initialization">
            <div className="container-fluid p-0">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <button
                            className="btn btn-link text-decoration-none text-muted p-0 d-flex align-items-center gap-1 mb-2 hover-text-primary transition-all"
                            onClick={() => navigate('/employee-directory')}
                        >
                            <FiChevronLeft /> Back to Directory
                        </button>
                        <h2 className="h3 fw-bold text-main">Add New Employee</h2>
                        <p className="text-secondary small">Initialize a new employee record and set up their credentials.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        {/* LEFT COLUMN: Main Info */}
                        <div className="col-lg-8">
                            {/* Personal Details Card */}
                            <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
                                <div className="card-header bg-white py-3 border-bottom-0 ps-4">
                                    <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                                        <div className="p-2 bg-primary bg-opacity-10 text-primary rounded-3"><FiUser size={18} /></div>
                                        Personal Particulars
                                    </h5>
                                </div>
                                <div className="card-body p-4 pt-0">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-secondary">FULL NAME</label>
                                            <div className="input-group-premium">
                                                <span className="input-group-icon"><FiUser /></span>
                                                <input type="text" className="form-control-premium" name="name" placeholder="e.g. Aditi Sharma" value={formData.name} onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-secondary">EMAIL ADDRESS</label>
                                            <div className="input-group-premium">
                                                <span className="input-group-icon"><FiMail /></span>
                                                <input type="email" className="form-control-premium" name="email" placeholder="aditi@company.com" value={formData.email} onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-secondary">PHONE NUMBER</label>
                                            <div className="input-group-premium">
                                                <span className="input-group-icon"><FiPhone /></span>
                                                <input type="tel" className="form-control-premium" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-secondary">USER ACCOUNT / USERNAME</label>
                                            <div className="input-group-premium">
                                                <span className="input-group-icon"><FiLock /></span>
                                                <input type="text" className="form-control-premium" name="userAccount" placeholder="user_aditi" value={formData.userAccount} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Employment & Organization Card */}
                            <div className="card border-0 shadow-sm rounded-4 mb-4">
                                <div className="card-header bg-white py-3 border-bottom-0 ps-4">
                                    <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                                        <div className="p-2 bg-success bg-opacity-10 text-success rounded-3"><FiBriefcase size={18} /></div>
                                        Organization & Placement
                                    </h5>
                                </div>
                                <div className="card-body p-4 pt-0">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-secondary">COMPANY / ENTITY</label>
                                            <input type="text" className="form-control-premium bg-light" name="company" placeholder="Select Company" value={formData.company} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-secondary">PRIMARY HUB / BRANCH</label>
                                            <input type="text" className="form-control-premium bg-light" name="branch" placeholder="Select Branch" value={formData.branch} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-secondary">DEPARTMENT</label>
                                            <select className="form-select-premium" name="dept" value={formData.dept} onChange={handleInputChange}>
                                                <option value="">Select Department</option>
                                                <option value="Administration">Administration</option>
                                                <option value="HR Performance">HR & Performance</option>
                                                <option value="Engineering">Engineering</option>
                                                <option value="Finance">Finance & Tax</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-secondary">DESIGNATION</label>
                                            <input type="text" className="form-control-premium" name="desig" placeholder="e.g. Senior Software Engineer" value={formData.desig} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-secondary">EMPLOYMENT TYPE</label>
                                            <select className="form-select-premium" name="type" value={formData.type} onChange={handleInputChange}>
                                                <option value="Employee">Permanent Employee</option>
                                                <option value="Contractor">Contractor</option>
                                                <option value="Intern">Internship</option>
                                                <option value="Manager">Executive / Manager</option>
                                                <option value="HR">HR Admin</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-secondary">REPORTING MANAGER</label>
                                            <input type="text" className="form-control-premium" name="manager" placeholder="Search Manager" value={formData.manager} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Secondary Info & Actions */}
                        <div className="col-lg-4">
                            {/* Salary & Dates Card */}
                            <div className="card border-0 shadow-sm rounded-4 mb-4">
                                <div className="card-body p-4">
                                    <h6 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                        <div className="p-2 bg-warning bg-opacity-10 text-warning rounded-3"><FiDollarSign size={16} /></div>
                                        Compensation & Timeline
                                    </h6>

                                    <div className="mb-4">
                                        <label className="form-label small fw-bold text-secondary text-uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>JOINING DATE</label>
                                        <div className="input-group-premium">
                                            <span className="input-group-icon"><FiCalendar /></span>
                                            <input type="date" className="form-control-premium" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label small fw-bold text-secondary text-uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>ANNUAL CTC (GROSS)</label>
                                        <div className="input-group-premium">
                                            <span className="input-group-icon">₹</span>
                                            <input type="text" className="form-control-premium" name="ctc" placeholder="e.g. 12,00,000" value={formData.ctc} onChange={handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="mb-1">
                                        <label className="form-label small fw-bold text-secondary text-uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>INITIAL ACCOUNT STATUS</label>
                                        <select className="form-select-premium border-0 bg-light" name="status" value={formData.status} onChange={handleInputChange}>
                                            <option value="Active">Active / Onboarded</option>
                                            <option value="Pending">Pending Invitation</option>
                                            <option value="On-Hold">On-Hold</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Security Settings */}
                            <div className="card border-0 shadow-sm rounded-4 mb-4 bg-light">
                                <div className="card-body p-4">
                                    <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0">
                                        <div>
                                            <h6 className="fw-bold mb-0">Lock Record</h6>
                                            <p className="text-secondary smaller-text mb-0">Prevent non-admin edits to this profile.</p>
                                        </div>
                                        <input
                                            className="form-check-input ms-0 custom-switch"
                                            type="checkbox"
                                            name="lock"
                                            checked={formData.lock}
                                            onChange={handleInputChange}
                                            id="lockSwitch"
                                            style={{ width: '40px', height: '20px' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Actions */}
                            <div className="d-grid gap-3">
                                <button type="submit" className="btn btn-primary btn-lg rounded-pill shadow px-5 py-3 fw-bold transition-all hover-lift">
                                    INITIALIZE RECORD
                                </button>
                                <button type="button" onClick={() => navigate('/employee-directory')} className="btn btn-light btn-lg rounded-pill border-0 px-5 py-3 fw-bold text-secondary hover-bg-light">
                                    DISCARD CHANGES
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <style>{`
                .text-main { color: #1e293b; }
                .text-secondary { color: #64748b; }
                .smaller-text { font-size: 0.75rem; }
                
                .card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2) !important; }
                
                .input-group-premium {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .input-group-icon {
                    position: absolute;
                    left: 14px;
                    color: #94a3b8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                    z-index: 5;
                }
                .form-control-premium {
                    width: 100%;
                    padding: 12px 14px 12px 42px;
                    border-radius: 12px;
                    border: 2px solid #f1f5f9;
                    background: #ffffff;
                    color: #1e293b;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                }
                .form-control-premium:focus {
                    outline: none;
                    border-color: #818cf8;
                    box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1);
                }
                
                .form-select-premium {
                    width: 100%;
                    padding: 12px 14px;
                    border-radius: 12px;
                    border: 2px solid #f1f5f9;
                    background: #ffffff;
                    color: #1e293b;
                    font-size: 0.95rem;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 14px center;
                    background-size: 16px;
                }
                .form-select-premium:focus {
                    outline: none;
                    border-color: #818cf8;
                    box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1);
                }

                .custom-switch:checked {
                    background-color: #818cf8;
                    border-color: #818cf8;
                }
                
                .tracking-wider { letter-spacing: 0.05em; }
                .hover-text-primary:hover { color: #6366f1 !important; }
                .transition-all { transition: all 0.2s ease; }
            `}</style>
        </DashboardLayout>
    );
};

export default AddMember;

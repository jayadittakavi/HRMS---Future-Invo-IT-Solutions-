import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        payGrade: '',
        ctc: '',
        manager: '',
        status: 'Active',
        lock: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would be an API call
        console.log("New User Data:", formData);
        alert("Member Added Successfully!");
        navigate('/employee-directory');
    };

    return (
        <DashboardLayout title="Add New Member">
            <div className="container-fluid p-4 bg-light" style={{ minHeight: '80vh' }}>
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white py-3">
                        <h5 className="mb-0 fw-bold">Employee Information</h5>
                    </div>
                    <div className="card-body p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                {/* Personal Info */}
                                <div className="col-12"><h6 className="text-secondary border-bottom pb-2 mt-2">Personal Details</h6></div>

                                <div className="col-md-4">
                                    <label className="form-label">Full Name <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Email <span className="text-danger">*</span></label>
                                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Phone</label>
                                    <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} />
                                </div>

                                {/* Employment Info */}
                                <div className="col-12"><h6 className="text-secondary border-bottom pb-2 mt-4">Employment Details</h6></div>

                                <div className="col-md-4">
                                    <label className="form-label">User Account / Username</label>
                                    <input type="text" className="form-control" name="userAccount" value={formData.userAccount} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Role / Type</label>
                                    <select className="form-select" name="type" value={formData.type} onChange={handleInputChange}>
                                        <option value="Employee">Employee</option>
                                        <option value="HR">HR</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Department</label>
                                    <select className="form-select" name="dept" value={formData.dept} onChange={handleInputChange}>
                                        <option value="">Select Department</option>
                                        <option value="Administration">Administration</option>
                                        <option value="HR">HR</option>
                                        <option value="Engineering">Engineering</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Designation</label>
                                    <input type="text" className="form-control" name="desig" value={formData.desig} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Joining Date</label>
                                    <input type="date" className="form-control" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} />
                                </div>

                                {/* Organization Info */}
                                <div className="col-12"><h6 className="text-secondary border-bottom pb-2 mt-4">Organization & Pay</h6></div>

                                <div className="col-md-4">
                                    <label className="form-label">Company</label>
                                    <input type="text" className="form-control" name="company" value={formData.company} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Branch</label>
                                    <input type="text" className="form-control" name="branch" value={formData.branch} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Manager</label>
                                    <input type="text" className="form-control" name="manager" value={formData.manager} onChange={handleInputChange} placeholder="Reporting Manager" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Pay Grade</label>
                                    <input type="text" className="form-control" name="payGrade" value={formData.payGrade} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">CTC (Yearly)</label>
                                    <input type="number" className="form-control" name="ctc" value={formData.ctc} onChange={handleInputChange} />
                                </div>

                            </div>

                            <div className="d-flex justify-content-end gap-3 mt-5">
                                <button type="button" className="btn btn-secondary px-4" onClick={() => navigate('/employee-directory')}>Cancel</button>
                                <button type="submit" className="btn btn-primary px-4">Create Member</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AddMember;

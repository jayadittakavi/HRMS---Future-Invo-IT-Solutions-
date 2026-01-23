import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const SetupOrganization = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        orgName: 'Acme Corp',
        industry: 'Select',
        companySize: 'Select',
        country: 'India',
        state: 'Telangana',
        city: 'Hyderabad',
        teammateEmail: 'teammate@company.com',
        teammateRole: 'User'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would submit to API
        console.log("Submitting setup:", formData);
        navigate('/dashboard'); // Navigate to dashboard after setup
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div className="card shadow-sm border-0" style={{ maxWidth: '900px', width: '100%', borderRadius: '16px' }}>
                <div className="card-body p-5">
                    {/* Header */}
                    <div className="mb-5">
                        <span className="text-secondary small fw-medium text-uppercase mb-2 d-block">Basic Setup</span>
                        <h1 className="display-6 fw-bold text-dark mb-1" style={{ letterSpacing: '-0.5px' }}>Set up your organization</h1>
                        <p className="text-muted">This helps us personalize your CRM workspace.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Company Details Section */}
                        <div className="mb-4">
                            <h5 className="fw-bold text-dark mb-4">Company details</h5>

                            <div className="row g-4 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-secondary">Organization name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="orgName"
                                        value={formData.orgName}
                                        onChange={handleChange}
                                        style={{ padding: '0.75rem', borderRadius: '8px', borderColor: '#dae1e7' }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-secondary">Industry <span className="text-danger">*</span></label>
                                    <select
                                        className="form-select"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        style={{ padding: '0.75rem', borderRadius: '8px', borderColor: '#dae1e7' }}
                                    >
                                        <option>Select</option>
                                        <option>Technology</option>
                                        <option>Healthcare</option>
                                        <option>Finance</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row g-4 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-secondary">Company size <span className="text-danger">*</span></label>
                                    <select
                                        className="form-select"
                                        name="companySize"
                                        value={formData.companySize}
                                        onChange={handleChange}
                                        style={{ padding: '0.75rem', borderRadius: '8px', borderColor: '#dae1e7' }}
                                    >
                                        <option>Select</option>
                                        <option>1-10</option>
                                        <option>11-50</option>
                                        <option>51-200</option>
                                        <option>201-500</option>
                                        <option>500+</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-secondary">Country <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        readOnly
                                        style={{ padding: '0.75rem', borderRadius: '8px', borderColor: '#dae1e7', backgroundColor: '#f3f4f6' }}
                                    />
                                </div>
                            </div>

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-secondary">State <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        style={{ padding: '0.75rem', borderRadius: '8px', borderColor: '#dae1e7', backgroundColor: '#f3f4f6' }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-secondary">City / Branch <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        style={{ padding: '0.75rem', borderRadius: '8px', borderColor: '#dae1e7', backgroundColor: '#f3f4f6' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Invite Teammate Section */}
                        <div className="mb-5">
                            <h5 className="fw-bold text-dark mb-4">Invite your first teammate (optional)</h5>
                            <div className="row g-0 border rounded-3 overflow-hidden" style={{ borderColor: '#dae1e7' }}>
                                <div className="col-9 border-end">
                                    <input
                                        type="email"
                                        className="form-control border-0 h-100"
                                        name="teammateEmail"
                                        value={formData.teammateEmail}
                                        onChange={handleChange}
                                        style={{ padding: '0.75rem 1rem', borderRadius: 0 }}
                                    />
                                </div>
                                <div className="col-3 bg-white">
                                    <select
                                        className="form-select border-0 h-100 fw-medium"
                                        name="teammateRole"
                                        value={formData.teammateRole}
                                        onChange={handleChange}
                                        style={{ padding: '0.75rem 1rem', borderRadius: 0 }}
                                    >
                                        <option>User</option>
                                        <option>Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="d-flex justify-content-end align-items-center gap-4">
                            <button type="button" className="btn btn-link text-secondary text-decoration-none fw-medium" onClick={() => navigate('/')}>
                                Add later
                            </button>
                            <button type="submit" className="btn btn-dark px-4 py-2 rounded-3 fw-medium d-flex align-items-center gap-2" style={{ background: '#1e293b' }}>
                                Create Workspace <FaArrowRight size={14} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SetupOrganization;

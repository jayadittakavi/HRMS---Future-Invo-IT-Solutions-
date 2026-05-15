import React, { useState } from 'react';
import { 
    FiUser, FiMapPin, FiBookOpen, FiBriefcase, FiPhone, FiUpload, 
    FiCheckCircle, FiChevronRight, FiChevronLeft, FiPlus, FiFilter, FiSearch, FiClock
} from 'react-icons/fi';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useAuth } from '../../../../context/AuthContext';
import { usePermissions } from '../../../../context/PermissionsContext';
import './Onboarding.css';

const OnboardingForm = ({ onSubmit }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Personal
        fullName: '', dob: '', gender: '', bloodGroup: '',
        // Step 2: Address
        currentAddress: '', permanentAddress: '', emergencyContactName: '', emergencyContactPhone: '',
        // Step 3: Education
        highestQualification: '', university: '', passYear: '',
        // Step 4: Experience
        prevCompany: '', yearsExp: '',
        // Step 5: Documents
        docs: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const steps = [
        { id: 1, label: 'Personal', icon: <FiUser /> },
        { id: 2, label: 'Address', icon: <FiMapPin /> },
        { id: 3, label: 'Education', icon: <FiBookOpen /> },
        { id: 4, label: 'Experience', icon: <FiBriefcase /> },
        { id: 5, label: 'Documents', icon: <FiUpload /> }
    ];

    return (
        <div className="onboarding-form-wrapper animate__animated animate__fadeIn">
            <div className="onboarding-stepper mb-5">
                {steps.map((s, i) => (
                    <React.Fragment key={s.id}>
                        <div className={`step-item ${step === s.id ? 'active' : step > s.id ? 'completed' : ''}`}>
                            <div className="step-icon">{step > s.id ? <FiCheckCircle /> : s.icon}</div>
                            <span className="step-label">{s.label}</span>
                        </div>
                        {i < steps.length - 1 && <div className="step-line"></div>}
                    </React.Fragment>
                ))}
            </div>

            <div className="onboarding-card shadow-sm rounded-4 p-4 p-md-5">
                {step === 1 && (
                    <div className="form-step animate__animated animate__fadeIn">
                        <h4 className="fw-bold mb-4">Personal Details</h4>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label">Full Name</label>
                                <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" name="dob" className="form-control" value={formData.dob} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Gender</label>
                                <select name="gender" className="form-select" value={formData.gender} onChange={handleInputChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Blood Group</label>
                                <input type="text" name="bloodGroup" className="form-control" placeholder="O+" value={formData.bloodGroup} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step animate__animated animate__fadeIn">
                        <h4 className="fw-bold mb-4">Address & Emergency Contact</h4>
                        <div className="row g-4">
                            <div className="col-md-12">
                                <label className="form-label">Current Address</label>
                                <textarea name="currentAddress" className="form-control" rows="2" value={formData.currentAddress} onChange={handleInputChange}></textarea>
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Permanent Address</label>
                                <textarea name="permanentAddress" className="form-control" rows="2" value={formData.permanentAddress} onChange={handleInputChange}></textarea>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Emergency Contact Name</label>
                                <input type="text" name="emergencyContactName" className="form-control" value={formData.emergencyContactName} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Emergency Phone</label>
                                <input type="tel" name="emergencyContactPhone" className="form-control" value={formData.emergencyContactPhone} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="form-step animate__animated animate__fadeIn">
                        <h4 className="fw-bold mb-4">Educational Background</h4>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label">Highest Qualification</label>
                                <input type="text" name="highestQualification" className="form-control" placeholder="B.Tech, MBA etc." value={formData.highestQualification} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">University / College</label>
                                <input type="text" name="university" className="form-control" value={formData.university} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Year of Passing</label>
                                <input type="number" name="passYear" className="form-control" value={formData.passYear} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="form-step animate__animated animate__fadeIn">
                        <h4 className="fw-bold mb-4">Previous Experience</h4>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label">Previous Organization</label>
                                <input type="text" name="prevCompany" className="form-control" value={formData.prevCompany} onChange={handleInputChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Years of Experience</label>
                                <input type="number" name="yearsExp" className="form-control" value={formData.yearsExp} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="form-step animate__animated animate__fadeIn">
                        <h4 className="fw-bold mb-4">Document Upload</h4>
                        <p className="text-muted small mb-4">Please upload scanned copies of your ID proof, degree certificates, and relieving letters.</p>
                        <div className="upload-zone rounded-4 p-5 text-center">
                            <FiUpload size={40} className="text-primary mb-3" />
                            <h6>Click to upload or drag and drop</h6>
                            <p className="text-muted extra-small">PDF, PNG, JPG (Max 5MB per file)</p>
                            <input type="file" multiple className="d-none" id="onb-upload" />
                            <label htmlFor="onb-upload" className="btn btn-outline-primary btn-sm mt-2">Browse Files</label>
                        </div>
                        <div className="mt-4">
                            <div className="alert alert-warning border-0 rounded-3 small">
                                <FiInfo className="me-2" /> By submitting, you certify that the information provided is accurate and verifiable.
                            </div>
                        </div>
                    </div>
                )}

                <div className="form-actions d-flex justify-content-between mt-5">
                    <button className={`btn btn-light-glass px-4 ${step === 1 ? 'invisible' : ''}`} onClick={prevStep}>
                        <FiChevronLeft className="me-2" /> Back
                    </button>
                    {step < 5 ? (
                        <button className="btn btn-primary px-5 rounded-pill" onClick={nextStep}>
                            Continue <FiChevronRight className="ms-2" />
                        </button>
                    ) : (
                        <button className="btn btn-success px-5 rounded-pill" onClick={() => onSubmit(formData)}>
                            Submit Onboarding
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const HRDashboard = () => {
    const { onboardingData } = usePermissions();

    return (
        <div className="hr-onboarding-pipeline animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 className="fw-bold text-dark">Onboarding Pipeline</h2>
                    <p className="text-muted mb-0">Monitor new hire document submissions and verification status</p>
                </div>
                <div className="d-flex gap-3">
                    <button className="btn-filter"><FiFilter className="me-2" /> Filter</button>
                    <button className="btn btn-primary rounded-pill px-4"><FiPlus className="me-2" /> Add Joiner</button>
                </div>
            </div>

            <div className="pipeline-grid">
                {['Pending Review', 'Document Verification', 'Background Check', 'Completed'].map(stage => (
                    <div key={stage} className="pipeline-column">
                        <div className="column-header d-flex align-items-center justify-content-between mb-3">
                            <h6 className="mb-0 fw-bold">{stage}</h6>
                            <span className="badge-count">{onboardingData.filter(o => o.status === stage).length}</span>
                        </div>
                        <div className="column-body">
                            {onboardingData.filter(o => o.status === stage).map(item => (
                                <div key={item.id} className="onboarding-item-card shadow-sm rounded-4 p-3 mb-3">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <div className="avatar-sm">{item.fullName?.charAt(0) || 'U'}</div>
                                        <div>
                                            <div className="fw-bold small">{item.fullName}</div>
                                            <div className="text-muted extra-small">{item.id}</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-3">
                                        <span className="text-muted extra-small"><FiClock className="me-1" /> 2h ago</span>
                                        <button className="btn-view-onb">Review</button>
                                    </div>
                                </div>
                            ))}
                            {onboardingData.filter(o => o.status === stage).length === 0 && (
                                <div className="empty-stage text-center p-4">
                                    <p className="text-muted extra-small mb-0">No joiners in this stage</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const OnboardingContent = () => {
    const { user } = useAuth();
    const { submitOnboarding } = usePermissions();
    const [submitted, setSubmitted] = useState(false);

    const isHR = user?.role?.toLowerCase() === 'hr' || user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'superadmin';

    const handleSubmit = (data) => {
        submitOnboarding(data);
        setSubmitted(true);
    };

    return (
        <div className="onboarding-module-container">
            {isHR ? (
                <HRDashboard />
            ) : submitted ? (
                <div className="success-onb-wrapper text-center animate__animated animate__zoomIn mt-5">
                    <div className="success-icon-large"><FiCheckCircle size={80} color="#10b981" /></div>
                    <h2 className="fw-bold mt-4">Onboarding Submitted!</h2>
                    <p className="text-muted">Your details have been sent to the HR team for verification. You will be notified once the process is complete.</p>
                    <button className="btn btn-outline-primary rounded-pill mt-4" onClick={() => setSubmitted(false)}>View Submitted Info</button>
                </div>
            ) : (
                <OnboardingForm onSubmit={handleSubmit} />
            )}
        </div>
    );
};

const Onboarding = () => (
    <DashboardLayout title="">
        <OnboardingContent />
    </DashboardLayout>
);

export default Onboarding;

const FiInfo = ({ className, size }) => (
    <svg className={className} width={size || 16} height={size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);

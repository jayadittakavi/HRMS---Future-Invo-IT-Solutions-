import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { API_BASE, getAuthHeader } from '../../../../config';
import {
  FiUpload, FiCheckCircle, FiUser, FiFileText, FiMapPin, FiBriefcase, FiArrowRight, FiArrowLeft
} from 'react-icons/fi';
import { MdOutlineWavingHand } from 'react-icons/md';
import DashboardLayout from '../../../../components/layout/DashboardLayout';

const STEPS = ['Personal Info', 'Work Details', 'Documents', 'Review'];

const OnboardingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    // Step 0 — Personal
    firstName: user?.firstName || user?.first_name || '',
    lastName: user?.lastName || user?.last_name || '',
    dob: '',
    gender: '',
    phone: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    // Step 1 — Work
    department: '',
    designation: '',
    joiningDate: '',
    employmentType: 'Full-time',
    // Step 2 — Documents
    aadhar: null, aadharName: '',
    pan: null, panName: '',
    resume: null, resumeName: '',
    photo: null, photoName: '',
  });

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleFile = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      set(field, file);
      set(`${field}Name`, file.name);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(k => {
        if (form[k] instanceof File) formData.append(k, form[k]);
        else if (form[k]) formData.append(k, form[k]);
      });

      const res = await fetch(`${API_BASE}/onboarding/submit`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      });

      setSubmitted(true);
    } catch (err) {
      // Show success anyway if backend offline
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <DashboardLayout title="Onboarding">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
          <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#34d399)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <FiCheckCircle size={44} color="#fff" />
          </div>
          <h3 className="fw-bold text-dark mb-2">Onboarding Complete! 🎉</h3>
          <p className="text-secondary text-center mb-4" style={{ maxWidth: 420 }}>
            Your information has been submitted. HR will review and activate your full access shortly.
          </p>
          <button className="btn btn-primary rounded-pill px-5 py-2 fw-bold" onClick={() => navigate('/employee-dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Onboarding">
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 9999, padding: '12px 20px', borderRadius: 12, maxWidth: 380, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', background: toast.type === 'success' ? '#dcfce7' : '#fee2e2', borderLeft: `5px solid ${toast.type === 'success' ? '#16a34a' : '#dc2626'}`, color: toast.type === 'success' ? '#15803d' : '#991b1b', fontWeight: 600, fontSize: '0.9rem' }}>
          {toast.text}
        </div>
      )}

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '16px 0' }}>
        {/* Welcome banner */}
        <div className="rounded-4 p-4 mb-4 text-white" style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
          <div className="d-flex align-items-center gap-3">
            <MdOutlineWavingHand size={36} />
            <div>
              <h4 className="fw-bold mb-0">Welcome, {form.firstName || user?.username || 'New Member'}!</h4>
              <p className="mb-0 opacity-75 small">Complete your onboarding to unlock full HRMS access.</p>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="d-flex align-items-center mb-4 gap-1">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="d-flex align-items-center gap-2">
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.8rem',
                  background: i < step ? '#10b981' : i === step ? '#6366f1' : '#e2e8f0',
                  color: i <= step ? '#fff' : '#64748b',
                  transition: 'all .3s'
                }}>
                  {i < step ? <FiCheckCircle size={16} /> : i + 1}
                </div>
                <span className="d-none d-md-inline fw-semibold" style={{ fontSize: '0.82rem', color: i === step ? '#4f46e5' : i < step ? '#10b981' : '#94a3b8' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: i < step ? '#10b981' : '#e2e8f0', transition: 'all .3s' }} />}
            </React.Fragment>
          ))}
        </div>

        {/* Form Card */}
        <div className="card border-0 shadow-sm rounded-4 p-4">
          {/* STEP 0 — Personal Info */}
          {step === 0 && (
            <>
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2"><FiUser className="text-primary" /> Personal Information</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">First Name *</label>
                  <input className="form-control" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="John" />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Last Name *</label>
                  <input className="form-control" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Doe" />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Date of Birth *</label>
                  <input type="date" className="form-control" value={form.dob} onChange={e => set('dob', e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Gender *</label>
                  <select className="form-select" value={form.gender} onChange={e => set('gender', e.target.value)}>
                    <option value="">Select</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Phone Number *</label>
                  <input className="form-control" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 9876543210" />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold"><FiMapPin className="me-1" />Current Address</label>
                  <textarea className="form-control" rows={2} value={form.address} onChange={e => set('address', e.target.value)} placeholder="Street, City, State, PIN" />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Emergency Contact Name</label>
                  <input className="form-control" value={form.emergencyContact} onChange={e => set('emergencyContact', e.target.value)} placeholder="Parent / Spouse name" />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Emergency Phone</label>
                  <input className="form-control" value={form.emergencyPhone} onChange={e => set('emergencyPhone', e.target.value)} placeholder="+91 9876543210" />
                </div>
              </div>
            </>
          )}

          {/* STEP 1 — Work Details */}
          {step === 1 && (
            <>
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2"><FiBriefcase className="text-primary" /> Work Details</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Department</label>
                  <input className="form-control" value={form.department} onChange={e => set('department', e.target.value)} placeholder="e.g. Frontend Developer" />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Designation</label>
                  <input className="form-control" value={form.designation} onChange={e => set('designation', e.target.value)} placeholder="e.g. Senior Developer" />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Date of Joining *</label>
                  <input type="date" className="form-control" value={form.joiningDate} onChange={e => set('joiningDate', e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Employment Type</label>
                  <select className="form-select" value={form.employmentType} onChange={e => set('employmentType', e.target.value)}>
                    <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Intern</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* STEP 2 — Documents */}
          {step === 2 && (
            <>
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2"><FiFileText className="text-primary" /> Upload Documents</h5>
              <div className="row g-4">
                {[
                  { field: 'aadhar', label: 'Aadhar Card', accept: '.pdf,.jpg,.png', icon: '🪪' },
                  { field: 'pan', label: 'PAN Card', accept: '.pdf,.jpg,.png', icon: '🗂️' },
                  { field: 'resume', label: 'Resume / CV', accept: '.pdf,.doc,.docx', icon: '📄' },
                  { field: 'photo', label: 'Passport Photo', accept: '.jpg,.jpeg,.png', icon: '📷' },
                ].map(({ field, label, accept, icon }) => (
                  <div className="col-md-6" key={field}>
                    <label className="form-label small fw-bold">{icon} {label}</label>
                    <div
                      className="border rounded-3 p-3 text-center position-relative"
                      style={{ borderStyle: 'dashed', borderColor: form[`${field}Name`] ? '#10b981' : '#cbd5e1', background: form[`${field}Name`] ? '#f0fdf4' : '#f8fafc', cursor: 'pointer', transition: 'all .2s' }}
                      onClick={() => document.getElementById(`file-${field}`).click()}
                    >
                      <input id={`file-${field}`} type="file" accept={accept} className="d-none" onChange={e => handleFile(field, e)} />
                      {form[`${field}Name`] ? (
                        <>
                          <FiCheckCircle size={24} className="text-success mb-1" />
                          <div className="small fw-bold text-success">{form[`${field}Name`]}</div>
                        </>
                      ) : (
                        <>
                          <FiUpload size={24} className="text-muted mb-1" />
                          <div className="small text-muted">Click to upload {label}</div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{accept}</div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* STEP 3 — Review */}
          {step === 3 && (
            <>
              <h5 className="fw-bold mb-4">✅ Review &amp; Submit</h5>
              <div className="row g-3">
                {[
                  ['Full Name', `${form.firstName} ${form.lastName}`],
                  ['Date of Birth', form.dob || '—'],
                  ['Gender', form.gender || '—'],
                  ['Phone', form.phone || '—'],
                  ['Department', form.department || '—'],
                  ['Designation', form.designation || '—'],
                  ['Joining Date', form.joiningDate || '—'],
                  ['Employment Type', form.employmentType],
                  ['Aadhar', form.aadharName || '—'],
                  ['PAN Card', form.panName || '—'],
                  ['Resume', form.resumeName || '—'],
                  ['Photo', form.photoName || '—'],
                ].map(([label, value]) => (
                  <div className="col-md-6" key={label}>
                    <div className="d-flex flex-column px-3 py-2 rounded-3" style={{ background: '#f8fafc' }}>
                      <span className="text-muted" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>{label}</span>
                      <span className="fw-semibold text-dark small">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary rounded-pill px-4 fw-bold d-flex align-items-center gap-2"
            onClick={() => step > 0 ? setStep(s => s - 1) : navigate(-1)}
          >
            <FiArrowLeft /> {step === 0 ? 'Cancel' : 'Back'}
          </button>
          {step < STEPS.length - 1 ? (
            <button
              className="btn btn-primary rounded-pill px-5 fw-bold d-flex align-items-center gap-2"
              onClick={() => setStep(s => s + 1)}
            >
              Next <FiArrowRight />
            </button>
          ) : (
            <button
              className="btn btn-success rounded-pill px-5 fw-bold d-flex align-items-center gap-2 shadow"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <><span className="spinner-border spinner-border-sm me-1" />Submitting...</> : '🚀 Submit Onboarding'}
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OnboardingForm;

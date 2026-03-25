import React, { useState, useEffect } from 'react';
import { FaEnvelopeOpenText, FaTimes, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { payrollService } from '../payrollService';
import { employeeSuperAdminService } from '../../../hr/employees/superadmin-service';

const LettersTab = () => {
    const [modalConfig, setModalConfig] = useState(null); // { type, title }
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });
    
    // Form state
    const [formData, setFormData] = useState({
        employee_id: '',
        effectDate: '',
        newSalary: '',
        newDesignation: '',
        letterType: '',
        extraContent: ''
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const data = await employeeSuperAdminService.getAllEmployees();
            setEmployees(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (type, title) => {
        setFormData({
            employee_id: '',
            effectDate: '',
            newSalary: '',
            newDesignation: '',
            letterType: type === 'new' ? '' : type,
            extraContent: ''
        });
        setModalConfig({ type, title });
        setStatus({ type: '', msg: '' });
    };

    const handleCloseModal = () => setModalConfig(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            setStatus({ type: '', msg: '' });
            
            const payload = {
                employee_id: formData.employee_id,
                letter_type: formData.letterType || modalConfig.type,
                effective_date: formData.effectDate,
                meta: {
                    new_salary: formData.newSalary,
                    new_designation: formData.newDesignation,
                    message: formData.extraContent
                }
            };
            
            await payrollService.createPayoutLetter(payload);
            setStatus({ type: 'success', msg: `${modalConfig.title} has been generated successfully!` });
            setTimeout(() => handleCloseModal(), 2000);
        } catch (error) {
            setStatus({ type: 'error', msg: "Generation failed: " + error.message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container-fluid p-0 position-relative">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Payroll Letters</h5>
                <button 
                    className="btn btn-primary btn-sm d-flex align-items-center gap-2"
                    onClick={() => handleOpenModal('new', 'Issue New Letter')}
                >
                    <FaEnvelopeOpenText size={12} /> Issue New Letter
                </button>
            </div>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center p-4">
                            <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-block mb-3">
                                <FaEnvelopeOpenText size={24} />
                            </div>
                            <h6 className="fw-bold">Increment Letter</h6>
                            <p className="text-muted small">Generate salary increment letters for employees.</p>
                            <button 
                                className="btn btn-outline-primary btn-sm w-100"
                                onClick={() => handleOpenModal('increment', 'Generate Increment Letter')}
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center p-4">
                            <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 d-inline-block mb-3">
                                <FaEnvelopeOpenText size={24} />
                            </div>
                            <h6 className="fw-bold">Promotion Letter</h6>
                            <p className="text-muted small">Generate promotion and role change letters.</p>
                            <button 
                                className="btn btn-outline-success btn-sm w-100"
                                onClick={() => handleOpenModal('promotion', 'Generate Promotion Letter')}
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Letter Generation Modal Overlay */}
            {modalConfig && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 1050, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
                    <div className="card border-0 shadow-lg" style={{ width: '100%', maxWidth: '500px', borderRadius: '12px' }}>
                        <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center pt-4 px-4 pb-0">
                            <h5 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                                <FaEnvelopeOpenText className="text-primary" /> {modalConfig.title}
                            </h5>
                            <button className="btn btn-sm btn-light rounded-circle" onClick={handleCloseModal}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="card-body p-4">
                            {status.msg && (
                                <div className={`alert d-flex align-items-center gap-2 border-0 shadow-sm mb-4 ${status.type === 'success' ? 'alert-success text-success bg-success bg-opacity-10' : 'alert-danger text-danger bg-danger bg-opacity-10'}`} style={{ fontSize: '0.85rem' }}>
                                    {status.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                                    {status.msg}
                                </div>
                            )}

                            {loading ? (
                                <div className="text-center py-4">
                                    <FaSpinner className="spinner-border text-primary border-0" size={16} />
                                    <p className="mt-2 text-muted small">Loading employee list...</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-secondary">Select Employee <span className="text-danger">*</span></label>
                                        <select 
                                            className="form-select border-0 bg-light rounded-3" 
                                            required
                                            style={{ fontSize: '0.88rem' }}
                                            value={formData.employee_id}
                                            onChange={e => setFormData({...formData, employee_id: e.target.value})}
                                        >
                                            <option value="">Choose Employee...</option>
                                            {employees.map(emp => (
                                                <option key={emp.id} value={emp.id}>{emp.full_name} ({emp.employee_id})</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-secondary">Effective Date <span className="text-danger">*</span></label>
                                        <input 
                                            type="date" 
                                            className="form-control border-0 bg-light rounded-3" 
                                            required 
                                            style={{ fontSize: '0.88rem' }}
                                            value={formData.effectDate}
                                            onChange={e => setFormData({...formData, effectDate: e.target.value})}
                                        />
                                    </div>

                                    {modalConfig.type === 'increment' && (
                                        <div className="row g-3">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label small fw-bold text-secondary">Current Salary</label>
                                                <input type="text" className="form-control border-0 bg-white" placeholder="Auto-fetched" readOnly />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label small fw-bold text-primary">New Salary <span className="text-danger">*</span></label>
                                                <input 
                                                    type="number" 
                                                    className="form-control border-0 bg-light rounded-3 shadow-none" 
                                                    placeholder="Enter new salary" 
                                                    required 
                                                    value={formData.newSalary}
                                                    onChange={e => setFormData({...formData, newSalary: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    
                                    {modalConfig.type === 'promotion' && (
                                        <div className="row g-3">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label small fw-bold text-secondary">Current Role</label>
                                                <input type="text" className="form-control border-0 bg-white" placeholder="Auto-fetched" readOnly />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label small fw-bold text-success">New Designation <span className="text-danger">*</span></label>
                                                <input 
                                                    type="text" 
                                                    className="form-control border-0 bg-light rounded-3 shadow-none" 
                                                    placeholder="e.g. Senior Engineer" 
                                                    required 
                                                    value={formData.newDesignation}
                                                    onChange={e => setFormData({...formData, newDesignation: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {modalConfig.type === 'new' && (
                                        <>
                                            <div className="mb-3">
                                                <label className="form-label small fw-bold text-secondary">Letter Type <span className="text-danger">*</span></label>
                                                <select 
                                                    className="form-select border-0 bg-light rounded-3" 
                                                    required
                                                    value={formData.letterType}
                                                    onChange={e => setFormData({...formData, letterType: e.target.value})}
                                                >
                                                    <option value="">Select type...</option>
                                                    <option value="warning">Warning Letter</option>
                                                    <option value="experience">Experience Letter</option>
                                                    <option value="noc">No Objection Certificate (NOC)</option>
                                                    <option value="custom">Custom Letter</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label small fw-bold text-secondary">Message / Content</label>
                                                <textarea 
                                                    className="form-control border-0 bg-light rounded-3" 
                                                    rows="4" 
                                                    placeholder="Additional details or custom message content to include in the letter." 
                                                    required
                                                    value={formData.extraContent}
                                                    onChange={e => setFormData({...formData, extraContent: e.target.value})}
                                                ></textarea>
                                            </div>
                                        </>
                                    )}

                                    <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                                        <button type="button" className="btn btn-light rounded-3 fw-bold px-4" onClick={handleCloseModal}>Cancel</button>
                                        <button 
                                            type="submit" 
                                            disabled={submitting}
                                            className={`btn rounded-3 fw-bold px-4 d-flex align-items-center gap-2 ${modalConfig.type === 'promotion' ? 'btn-success' : 'btn-primary'}`}
                                        >
                                            {submitting ? (
                                                <><FaSpinner className="spinner-border border-0" size={14} /> Generating...</>
                                            ) : (
                                                'Generate Draft'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LettersTab;

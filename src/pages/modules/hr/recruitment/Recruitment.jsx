import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useSearch } from '../../../../context/SearchContext';
import { FaPlus, FaSearch, FaBriefcase, FaUserTie, FaCheckCircle, FaFilter, FaEdit, FaTrash, FaEye, FaTimes } from 'react-icons/fa';
import { recruitmentService } from './service';

export const RecruitmentContent = () => {
    const [activeTab, setActiveTab] = useState('jobs');
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [search, setSearch] = useState(globalSearchTerm);

    useEffect(() => {
        setSearch(globalSearchTerm);
    }, [globalSearchTerm]);

    const [showJobModal, setShowJobModal] = useState(false);
    const [showViewJobModal, setShowViewJobModal] = useState(false);
    const [showEditJobModal, setShowEditJobModal] = useState(false);
    const [showDeleteJobModal, setShowDeleteJobModal] = useState(false);
    const [showCandidateModal, setShowCandidateModal] = useState(false);
    const [showMoveStageModal, setShowMoveStageModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showApplicantsModal, setShowApplicantsModal] = useState(false);

    // Live Data state
    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [stats, setStats] = useState({ open_positions: 0, total_applicants: 0, in_interview: 0, offers_made: 0 });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [jData, cData, sData] = await Promise.all([
                recruitmentService.getJobs('All'),
                recruitmentService.getApplicants(),
                recruitmentService.getStats()
            ]);
            if (Array.isArray(jData)) setJobs(jData);
            if (Array.isArray(cData)) setCandidates(cData);
            if (sData) setStats(sData);
        } catch (err) {
            console.error("Failed to load recruitment data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [jobForm, setJobForm] = useState({
        title: '',
        department: '',
        type: 'Full-time',
        location: 'Office',
        description: '',
        requirements: ''
    });

    const [newStage, setNewStage] = useState('');

    // Action Handlers
    const handleViewJob = (job) => {
        setSelectedJob(job);
        setShowViewJobModal(true);
    };

    const handleViewApplicants = (job) => {
        setSelectedJob(job);
        setShowApplicantsModal(true);
    };

    const handleEditJob = (job) => {
        setSelectedJob(job);
        setJobForm({
            title: job.title,
            department: job.department,
            type: job.type,
            location: job.location,
            description: job.description || '',
            requirements: job.requirements || ''
        });
        setShowEditJobModal(true);
    };

    const handleDeleteJob = (job) => {
        setSelectedJob(job);
        setShowDeleteJobModal(true);
    };

    const confirmDeleteJob = () => {
        setJobs(jobs.filter(j => j.id !== selectedJob.id));
        setShowDeleteJobModal(false);
        setSelectedJob(null);
    };

    const handleSaveEditJob = () => {
        setJobs(jobs.map(j =>
            j.id === selectedJob.id
                ? { ...j, ...jobForm }
                : j
        ));
        setShowEditJobModal(false);
        setSelectedJob(null);
    };

    const handlePostJob = () => {
        const newJob = {
            id: jobs.length + 1,
            ...jobForm,
            applicants: 0,
            status: 'Open',
            postedDate: new Date().toISOString().split('T')[0]
        };
        setJobs([...jobs, newJob]);
        setShowJobModal(false);
        setJobForm({
            title: '',
            department: '',
            type: 'Full-time',
            location: 'Office',
            description: '',
            requirements: ''
        });
    };

    const handleViewCandidate = (candidate) => {
        setSelectedCandidate(candidate);
        setShowCandidateModal(true);
    };

    const handleMoveStage = (candidate) => {
        setSelectedCandidate(candidate);
        setNewStage(candidate.stage);
        setShowMoveStageModal(true);
    };

    const confirmMoveStage = () => {
        setCandidates(candidates.map(c =>
            c.id === selectedCandidate.id
                ? { ...c, stage: newStage }
                : c
        ));
        setShowMoveStageModal(false);
        setSelectedCandidate(null);
    };

    return (
        <div className="recruitment-content p-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <div>
                    <h4 className="fw-bold text-dark mb-2">
                        Recruitment Management
                    </h4>
                    <p className="text-secondary mb-0">Manage job postings and track candidate pipelines</p>
                </div>
                <button
                    className="btn btn-primary px-4 py-2 rounded-3 d-flex align-items-center gap-2 shadow-sm"
                    onClick={() => setShowJobModal(true)}
                    style={{ transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <FaPlus /> Post New Job
                </button>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100" style={{
                        borderLeft: '4px solid #0d6efd',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                        }}>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <div className="text-secondary small mb-2 fw-semibold text-uppercase" style={{ letterSpacing: '0.5px' }}>Open Positions</div>
                                    <h2 className="mb-0 fw-bold text-primary">{stats.open_positions || jobs.filter(j => j.status === 'Open').length}</h2>
                                    <p className="text-muted small mb-0 mt-2">Active job listings</p>
                                </div>
                                <FaBriefcase className="text-primary" size={36} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100" style={{
                        borderLeft: '4px solid #198754',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                        }}>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <div className="text-secondary small mb-2 fw-semibold text-uppercase" style={{ letterSpacing: '0.5px' }}>Total Applicants</div>
                                    <h2 className="mb-0 fw-bold text-success">{stats.total_applicants || jobs.reduce((sum, j) => sum + j.applicants, 0)}</h2>
                                    <p className="text-muted small mb-0 mt-2">All applications</p>
                                </div>
                                <FaUserTie className="text-success" size={36} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100" style={{
                        borderLeft: '4px solid #ffc107',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                        }}>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <div className="text-secondary small mb-2 fw-semibold text-uppercase" style={{ letterSpacing: '0.5px' }}>In Interview</div>
                                    <h2 className="mb-0 fw-bold text-warning">{stats.in_interview || candidates.filter(c => c.stage === 'Interview').length}</h2>
                                    <p className="text-muted small mb-0 mt-2">Active interviews</p>
                                </div>
                                <FaCheckCircle className="text-warning" size={36} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100" style={{
                        borderLeft: '4px solid #0dcaf0',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                        }}>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <div className="text-secondary small mb-2 fw-semibold text-uppercase" style={{ letterSpacing: '0.5px' }}>Offers Made</div>
                                    <h2 className="mb-0 fw-bold text-info">{stats.offers_made || candidates.filter(c => c.stage === 'Offer').length}</h2>
                                    <p className="text-muted small mb-0 mt-2">Pending acceptance</p>
                                </div>
                                <FaCheckCircle className="text-info" size={36} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs border-0 mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link px-4 py-3 border-0 fw-semibold ${activeTab === 'jobs' ? 'active bg-primary text-white rounded-top' : 'text-secondary'}`}
                        onClick={() => setActiveTab('jobs')}
                        style={{ transition: 'all 0.3s ease' }}
                    >
                        <FaBriefcase className="me-2" />
                        Job Openings ({jobs.length})
                    </button>
                </li>
                <li className="nav-item ms-2">
                    <button
                        className={`nav-link px-4 py-3 border-0 fw-semibold ${activeTab === 'candidates' ? 'active bg-primary text-white rounded-top' : 'text-secondary'}`}
                        onClick={() => setActiveTab('candidates')}
                        style={{ transition: 'all 0.3s ease' }}
                    >
                        <FaUserTie className="me-2" />
                        Candidates ({candidates.length})
                    </button>
                </li>
            </ul>

            {/* Content */}
            {activeTab === 'jobs' && (
                <div>
                    <div className="d-flex justify-content-end mb-3">
                        <div className="input-group" style={{ width: '280px' }}>
                            <span className="input-group-text bg-white border-end-0 border-light shadow-sm">
                                <FaSearch className="text-muted" />
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0 border-light shadow-sm"
                                placeholder="Search jobs..."
                                value={search}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSearch(val);
                                    setGlobalSearchTerm(val);
                                }}
                            />
                        </div>
                    </div>
                    <div className="row g-4">
                        {jobs.filter(j =>
                            j.title.toLowerCase().includes(search.toLowerCase()) ||
                            j.department.toLowerCase().includes(search.toLowerCase())
                        ).map(job => (
                            <div className="col-md-6 col-lg-4" key={job.id}>
                                <div
                                    className="card h-100 border-0 shadow-sm"
                                    style={{
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleViewApplicants(job)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 0.75rem 1.5rem rgba(0,0,0,0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                                    }}
                                >
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <FaBriefcase className="text-primary" size={32} />
                                            <span className={`badge ${job.status === 'Open' ? 'bg-success' : 'bg-secondary'} px-3 py-2`}>
                                                {job.status}
                                            </span>
                                        </div>
                                        <h5 className="fw-bold mb-3 text-dark">{job.title}</h5>
                                        <div className="text-muted small mb-3">
                                            <div className="mb-2 d-flex align-items-center gap-2">
                                                <span className="badge bg-light text-dark border">{job.department}</span>
                                                <span className="badge bg-light text-dark border">{job.type}</span>
                                            </div>
                                            <div className="mb-2">📍 {job.location}</div>
                                            <div className="text-secondary">📅 Posted: {job.postedDate}</div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <FaUserTie className="text-primary" size={18} />
                                                <span className="fw-bold text-primary">{job.applicants}</span>
                                                <span className="small text-muted">Applicants</span>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-primary rounded-circle p-2"
                                                    title="View"
                                                    onClick={(e) => { e.stopPropagation(); handleViewJob(job); }}
                                                    style={{ width: '36px', height: '36px', transition: 'all 0.2s ease' }}
                                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary rounded-circle p-2"
                                                    title="Edit"
                                                    onClick={(e) => { e.stopPropagation(); handleEditJob(job); }}
                                                    style={{ width: '36px', height: '36px', transition: 'all 0.2s ease' }}
                                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger rounded-circle p-2"
                                                    title="Delete"
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteJob(job); }}
                                                    style={{ width: '36px', height: '36px', transition: 'all 0.2s ease' }}
                                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'candidates' && (
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white py-4 d-flex justify-content-between align-items-center border-bottom">
                        <div>
                            <h5 className="mb-1 fw-bold">Candidate Pipeline</h5>
                            <p className="text-muted small mb-0">Track and manage all applicants</p>
                        </div>
                        <div className="d-flex gap-3">
                            <div className="input-group" style={{ width: '280px' }}>
                                <span className="input-group-text bg-light border-end-0">
                                    <FaSearch className="text-muted" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0 bg-light"
                                    placeholder="Search candidates..."
                                    value={search}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setSearch(val);
                                        setGlobalSearchTerm(val);
                                    }}
                                />
                            </div>
                            <select className="form-select shadow-sm" style={{ width: '180px' }}>
                                <option value="">All Stages</option>
                                <option>Applied</option>
                                <option>Screening</option>
                                <option>Interview</option>
                                <option>Offer</option>
                            </select>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead style={{ backgroundColor: '#f8f9fa' }}>
                                <tr>
                                    <th className="ps-4 py-3 fw-semibold text-uppercase small" style={{ letterSpacing: '0.5px' }}>Candidate Name</th>
                                    <th className="py-3 fw-semibold text-uppercase small" style={{ letterSpacing: '0.5px' }}>Email</th>
                                    <th className="py-3 fw-semibold text-uppercase small" style={{ letterSpacing: '0.5px' }}>Applied For</th>
                                    <th className="py-3 fw-semibold text-uppercase small" style={{ letterSpacing: '0.5px' }}>Applied Date</th>
                                    <th className="py-3 fw-semibold text-uppercase small" style={{ letterSpacing: '0.5px' }}>Stage</th>
                                    <th className="text-end pe-4 py-3 fw-semibold text-uppercase small" style={{ letterSpacing: '0.5px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.filter(c =>
                                    c.name.toLowerCase().includes(search.toLowerCase()) ||
                                    c.email.toLowerCase().includes(search.toLowerCase()) ||
                                    c.role.toLowerCase().includes(search.toLowerCase())
                                ).map(c => (
                                    <tr key={c.id} style={{ transition: 'background-color 0.2s ease' }}>
                                        <td className="ps-4 py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div
                                                    className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                                                    style={{ width: '40px', height: '40px' }}
                                                >
                                                    <FaUserTie className="text-white" size={18} />
                                                </div>
                                                <span className="fw-semibold text-dark">{c.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <span className="text-muted">{c.email}</span>
                                        </td>
                                        <td className="py-3">
                                            <span className="fw-medium">{c.role}</span>
                                        </td>
                                        <td className="py-3">
                                            <span className="text-muted small">{c.date}</span>
                                        </td>
                                        <td className="py-3">
                                            <span className={`badge px-3 py-2 ${c.stage === 'Applied' ? 'bg-secondary bg-opacity-10 text-secondary border border-secondary' :
                                                c.stage === 'Screening' ? 'bg-info bg-opacity-10 text-info border border-info' :
                                                    c.stage === 'Interview' ? 'bg-warning bg-opacity-10 text-warning border border-warning' :
                                                        'bg-success bg-opacity-10 text-success border border-success'
                                                }`}>
                                                {c.stage}
                                            </span>
                                        </td>
                                        <td className="text-end pe-4 py-3">
                                            <div className="d-flex justify-content-end gap-2 flex-nowrap">
                                                <button
                                                    className="btn btn-sm btn-outline-primary px-2 py-1"
                                                    onClick={() => handleViewCandidate(c)}
                                                    style={{ transition: 'all 0.2s ease', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#0d6efd';
                                                        e.currentTarget.style.color = 'white';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = '';
                                                        e.currentTarget.style.color = '';
                                                    }}
                                                >
                                                    <FaEye size={11} className="me-1" /> View
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-primary px-2 py-1"
                                                    onClick={() => handleMoveStage(c)}
                                                    style={{ transition: 'all 0.2s ease', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                                >
                                                    <FaCheckCircle size={11} className="me-1" /> Move
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Post Job Modal */}
            {showJobModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <div>
                                    <h5 className="modal-title fw-bold">Post New Job</h5>
                                    <p className="text-muted small mb-0">Fill in the details to create a job posting</p>
                                </div>
                                <button className="btn-close" onClick={() => setShowJobModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Job Title *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="e.g. Senior Software Engineer"
                                                value={jobForm.title}
                                                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Department *</label>
                                            <select className="form-select" value={jobForm.department} onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}>
                                                <option value="">Select Department</option>
                                                <option>Engineering</option>
                                                <option>Design</option>
                                                <option>Marketing</option>
                                                <option>Sales</option>
                                                <option>HR</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Employment Type *</label>
                                            <select className="form-select" value={jobForm.type} onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}>
                                                <option>Full-time</option>
                                                <option>Part-time</option>
                                                <option>Contract</option>
                                                <option>Internship</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Location *</label>
                                            <select className="form-select" value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}>
                                                <option>Office</option>
                                                <option>Remote</option>
                                                <option>Hybrid</option>
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small fw-bold">Job Description</label>
                                            <textarea className="form-control" rows="3" placeholder="Describe the role and responsibilities..." value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}></textarea>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small fw-bold">Requirements</label>
                                            <textarea className="form-control" rows="3" placeholder="List the required skills and qualifications..." value={jobForm.requirements} onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light" onClick={() => setShowJobModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handlePostJob}>Post Job</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View Job Modal */}
            {showViewJobModal && selectedJob && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <div>
                                    <h5 className="modal-title fw-bold">{selectedJob.title}</h5>
                                    <p className="text-muted small mb-0">{selectedJob.department} • {selectedJob.type} • {selectedJob.location}</p>
                                </div>
                                <button className="btn-close" onClick={() => setShowViewJobModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <span className={`badge ${selectedJob.status === 'Open' ? 'bg-success' : 'bg-secondary'} me-2`}>{selectedJob.status}</span>
                                    <span className="text-muted small">Posted: {selectedJob.postedDate}</span>
                                    <span className="text-muted small ms-3">{selectedJob.applicants} Applicants</span>
                                </div>
                                <div className="mb-3">
                                    <h6 className="fw-bold">Job Description</h6>
                                    <p className="text-muted">{selectedJob.description || 'No description provided.'}</p>
                                </div>
                                <div>
                                    <h6 className="fw-bold">Requirements</h6>
                                    <p className="text-muted">{selectedJob.requirements || 'No requirements specified.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Job Modal */}
            {showEditJobModal && selectedJob && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <div>
                                    <h5 className="modal-title fw-bold">Edit Job Posting</h5>
                                    <p className="text-muted small mb-0">Update job details</p>
                                </div>
                                <button className="btn-close" onClick={() => setShowEditJobModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Job Title *</label>
                                            <input type="text" className="form-control" value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Department *</label>
                                            <select className="form-select" value={jobForm.department} onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}>
                                                <option value="">Select Department</option>
                                                <option>Engineering</option>
                                                <option>Design</option>
                                                <option>Marketing</option>
                                                <option>Sales</option>
                                                <option>HR</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Employment Type *</label>
                                            <select className="form-select" value={jobForm.type} onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}>
                                                <option>Full-time</option>
                                                <option>Part-time</option>
                                                <option>Contract</option>
                                                <option>Internship</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Location *</label>
                                            <select className="form-select" value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}>
                                                <option>Office</option>
                                                <option>Remote</option>
                                                <option>Hybrid</option>
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small fw-bold">Job Description</label>
                                            <textarea className="form-control" rows="3" value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}></textarea>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small fw-bold">Requirements</label>
                                            <textarea className="form-control" rows="3" value={jobForm.requirements} onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light" onClick={() => setShowEditJobModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleSaveEditJob}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Job Confirmation Modal */}
            {showDeleteJobModal && selectedJob && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold">Delete Job Posting</h5>
                                <button className="btn-close" onClick={() => setShowDeleteJobModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete the job posting for <strong>{selectedJob.title}</strong>?</p>
                                <p className="text-danger small mb-0">This action cannot be undone. All {selectedJob.applicants} applications will be archived.</p>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light" onClick={() => setShowDeleteJobModal(false)}>Cancel</button>
                                <button className="btn btn-danger" onClick={confirmDeleteJob}><FaTrash className="me-2" />Delete Job</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View Candidate Profile Modal */}
            {showCandidateModal && selectedCandidate && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <div>
                                    <h5 className="modal-title fw-bold">{selectedCandidate.name}</h5>
                                    <p className="text-muted small mb-0">{selectedCandidate.email}</p>
                                </div>
                                <button className="btn-close" onClick={() => setShowCandidateModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="small text-muted">Applied For</label>
                                        <p className="fw-bold mb-0">{selectedCandidate.role}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted">Application Date</label>
                                        <p className="fw-bold mb-0">{selectedCandidate.date}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted">Phone</label>
                                        <p className="fw-bold mb-0">{selectedCandidate.phone}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small text-muted">Current Stage</label>
                                        <p className="mb-0">
                                            <span className={`badge bg-opacity-10 text-dark border ${selectedCandidate.stage === 'Applied' ? 'bg-secondary border-secondary' :
                                                selectedCandidate.stage === 'Screening' ? 'bg-info border-info' :
                                                    selectedCandidate.stage === 'Interview' ? 'bg-warning border-warning' :
                                                        'bg-success border-success'
                                                }`}>
                                                {selectedCandidate.stage}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light" onClick={() => setShowCandidateModal(false)}>Close</button>
                                <button className="btn btn-primary" onClick={() => { setShowCandidateModal(false); handleMoveStage(selectedCandidate); }}>Move to Next Stage</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Move Candidate Stage Modal */}
            {showMoveStageModal && selectedCandidate && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <div>
                                    <h5 className="modal-title fw-bold">Move Candidate Stage</h5>
                                    <p className="text-muted small mb-0">{selectedCandidate.name}</p>
                                </div>
                                <button className="btn-close" onClick={() => setShowMoveStageModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label className="form-label small fw-bold">Select New Stage</label>
                                <select className="form-select" value={newStage} onChange={(e) => setNewStage(e.target.value)}>
                                    <option value="Applied">Applied</option>
                                    <option value="Screening">Screening</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Hired">Hired</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                                <p className="text-muted small mt-2 mb-0">Current stage: <strong>{selectedCandidate.stage}</strong></p>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light" onClick={() => setShowMoveStageModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={confirmMoveStage}><FaCheckCircle className="me-2" />Update Stage</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Applicants List Modal */}
            {showApplicantsModal && selectedJob && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowApplicantsModal(false)}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header border-bottom bg-light">
                                <div>
                                    <h5 className="modal-title fw-bold text-dark d-flex align-items-center">
                                        <FaBriefcase className="me-2 text-primary" />
                                        Applicants for {selectedJob.title}
                                    </h5>
                                    <p className="text-secondary small mb-0 mt-1">
                                        Total Candidates: {candidates.filter(c => c.role === selectedJob.title).length}
                                    </p>
                                </div>
                                <button className="btn-close" onClick={() => setShowApplicantsModal(false)}></button>
                            </div>
                            <div className="modal-body p-0">
                                {candidates.filter(c => c.role === selectedJob.title).length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle mb-0">
                                            <thead className="bg-white text-secondary small text-uppercase">
                                                <tr>
                                                    <th className="ps-4 py-3">Candidate Name</th>
                                                    <th className="py-3">Current Stage</th>
                                                    <th className="py-3">Applied Date</th>
                                                    <th className="text-end pe-4 py-3">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {candidates.filter(c => c.role === selectedJob.title).map(candidate => (
                                                    <tr key={candidate.id}>
                                                        <td className="ps-4">
                                                            <div className="d-flex align-items-center">
                                                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                                                    <FaUserTie className="text-primary" />
                                                                </div>
                                                                <div>
                                                                    <div className="fw-bold text-dark">{candidate.name}</div>
                                                                    <div className="small text-muted">{candidate.email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className={`badge px-3 py-2 rounded-pill ${candidate.stage === 'Hired' ? 'bg-success bg-opacity-10 text-success' :
                                                                candidate.stage === 'Rejected' ? 'bg-danger bg-opacity-10 text-danger' :
                                                                    candidate.stage === 'Offer' ? 'bg-info bg-opacity-10 text-info' :
                                                                        'bg-warning bg-opacity-10 text-warning'
                                                                }`}>
                                                                {candidate.stage}
                                                            </span>
                                                        </td>
                                                        <td className="text-secondary small">{candidate.date}</td>
                                                        <td className="text-end pe-4">
                                                            <button
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() => {
                                                                    setShowApplicantsModal(false);
                                                                    handleViewCandidate(candidate);
                                                                }}
                                                            >
                                                                View Details
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center p-5">
                                        <div className="mb-3 text-muted">
                                            <FaUserTie size={48} className="opacity-25" />
                                        </div>
                                        <h6 className="text-secondary fw-bold">No Applicants Yet</h6>
                                        <p className="text-muted small">Candidates who apply for this position will appear here.</p>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer border-top">
                                <button className="btn btn-secondary" onClick={() => setShowApplicantsModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Recruitment = () => (
    <DashboardLayout title="">
        <RecruitmentContent />
    </DashboardLayout>
);

export default Recruitment;

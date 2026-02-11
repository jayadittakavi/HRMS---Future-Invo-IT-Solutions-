import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { FaGraduationCap, FaPlus, FaUserGraduate, FaCalendarAlt, FaCheck, FaClock, FaEye, FaUsers, FaFileAlt, FaDownload } from 'react-icons/fa';

export const TrainingContent = () => {
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);

    const trainings = [
        {
            id: 1,
            title: 'React Advanced Patterns',
            trainer: 'CodeAcademy',
            date: '2024-03-01',
            duration: '2 Weeks',
            participants: 15,
            status: 'Upcoming',
            description: 'Advanced React patterns including hooks, context, and performance optimization techniques.',
            enrolledEmployees: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'Tom Brown'],
            progress: 0,
            materials: ['Course Syllabus.pdf', 'React Hooks Guide.pdf', 'Performance Tips.pdf']
        },
        {
            id: 2,
            title: 'Workplace Safety',
            trainer: 'Internal HR',
            date: '2024-02-15',
            duration: '2 Hours',
            participants: 45,
            status: 'Completed',
            description: 'Comprehensive workplace safety training covering emergency procedures, ergonomics, and health protocols.',
            enrolledEmployees: ['All Employees'],
            progress: 100,
            materials: ['Safety Manual.pdf', 'Emergency Procedures.pdf', 'Completion Certificate.pdf']
        },
        {
            id: 3,
            title: 'Management 101',
            trainer: 'Udemy Business',
            date: '2024-03-10',
            duration: '4 Weeks',
            participants: 5,
            status: 'In Progress',
            description: 'Essential management skills including team leadership, communication, and conflict resolution.',
            enrolledEmployees: ['Alice Johnson', 'Bob Smith', 'Charlie Davis', 'Diana Prince', 'Eve Adams'],
            progress: 65,
            materials: ['Leadership Guide.pdf', 'Communication Skills.pdf', 'Week 1-3 Assignments.pdf']
        },
    ];

    const handleView = (training) => {
        setSelectedTraining(training);
        setShowViewModal(true);
    };

    return (
        <div className="training-content p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Training & Development</h5>
                    <p className="text-secondary small mb-0">Upskill employees and track progress</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill d-flex align-items-center gap-2">
                    <FaPlus /> Assign Training
                </button>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
                        <FaGraduationCap className="text-primary" size={32} />
                        <div>
                            <h3 className="mb-0 fw-bold">12</h3>
                            <div className="text-secondary small">Active Courses</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
                        <FaUserGraduate className="text-success" size={32} />
                        <div>
                            <h3 className="mb-0 fw-bold">85%</h3>
                            <div className="text-secondary small">Completion Rate</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
                        <FaClock className="text-warning" size={32} />
                        <div>
                            <h3 className="mb-0 fw-bold">450</h3>
                            <div className="text-secondary small">Training Hours</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                    <h6 className="fw-bold mb-0">Training Programs</h6>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">Training Title</th>
                                <th>Trainer / Platform</th>
                                <th>Start Date</th>
                                <th>Duration</th>
                                <th>Participants</th>
                                <th>Status</th>
                                <th className="text-end pe-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainings.map(t => (
                                <tr key={t.id}>
                                    <td className="ps-4 fw-bold">{t.title}</td>
                                    <td>{t.trainer}</td>
                                    <td><div className="d-flex align-items-center gap-2"><FaCalendarAlt className="text-muted" /> {t.date}</div></td>
                                    <td>{t.duration}</td>
                                    <td>{t.participants} Employees</td>
                                    <td>
                                        <span className={`badge bg-opacity-10 text-dark border ${t.status === 'Completed' ? 'bg-success text-success border-success' :
                                            t.status === 'In Progress' ? 'bg-primary text-primary border-primary' :
                                                'bg-warning text-warning border-warning'
                                            }`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-sm btn-dark" onClick={() => handleView(t)}>VIEW</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Training Modal */}
            {showViewModal && selectedTraining && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowViewModal(false)}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header bg-white border-bottom">
                                <div>
                                    <h5 className="modal-title fw-bold text-dark mb-1">
                                        <FaGraduationCap className="me-2 text-primary" />
                                        {selectedTraining.title}
                                    </h5>
                                    <small className="text-muted">
                                        <FaCalendarAlt className="me-1" />
                                        {selectedTraining.date} • {selectedTraining.duration}
                                    </small>
                                </div>
                                <button className="btn-close" onClick={() => setShowViewModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {/* Training Info */}
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <p className="mb-2"><strong>Trainer/Platform:</strong> {selectedTraining.trainer}</p>
                                        <p className="mb-2"><strong>Duration:</strong> {selectedTraining.duration}</p>
                                        <p className="mb-2">
                                            <strong>Status:</strong>
                                            <span className={`badge ms-2 ${selectedTraining.status === 'Completed' ? 'bg-success' :
                                                selectedTraining.status === 'In Progress' ? 'bg-primary' :
                                                    'bg-warning text-dark'
                                                }`}>
                                                {selectedTraining.status}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="mb-2"><strong>Start Date:</strong> {selectedTraining.date}</p>
                                        <p className="mb-2"><strong>Participants:</strong> {selectedTraining.participants} Employees</p>
                                        <p className="mb-2">
                                            <strong>Completion:</strong>
                                            <span className={`badge ms-2 ${selectedTraining.progress === 100 ? 'bg-success' :
                                                selectedTraining.progress > 0 ? 'bg-info' :
                                                    'bg-secondary'
                                                }`} style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>
                                                {selectedTraining.progress}% Complete
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <h6 className="fw-bold text-dark mb-2">Description</h6>
                                    <p className="text-secondary">{selectedTraining.description}</p>
                                </div>

                                {/* Enrolled Employees */}
                                <div className="mb-4">
                                    <h6 className="fw-bold text-dark mb-3">
                                        <FaUsers className="me-2" />
                                        Enrolled Employees ({selectedTraining.participants})
                                    </h6>
                                    <div className="border rounded p-3 bg-light">
                                        <div className="row g-2">
                                            {selectedTraining.enrolledEmployees.map((emp, idx) => (
                                                <div className="col-md-6" key={idx}>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <FaCheck className="text-success" size={12} />
                                                        <span className="small">{emp}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Training Materials */}
                                <div className="mb-3">
                                    <h6 className="fw-bold text-dark mb-3">
                                        <FaFileAlt className="me-2" />
                                        Training Materials
                                    </h6>
                                    <div className="list-group">
                                        {selectedTraining.materials.map((material, idx) => (
                                            <div className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
                                                <div className="d-flex align-items-center gap-2">
                                                    <FaFileAlt className="text-danger" />
                                                    <span>{material}</span>
                                                </div>
                                                <button className="btn btn-sm btn-outline-primary">
                                                    <FaDownload size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
                                <button className="btn btn-primary" onClick={() => {
                                    setShowViewModal(false);
                                    setShowEditModal(true);
                                }}>Edit Training</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Training Modal */}
            {showEditModal && selectedTraining && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowEditModal(false)}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header bg-white border-bottom">
                                <h5 className="modal-title fw-bold text-dark">
                                    <FaGraduationCap className="me-2 text-primary" />
                                    Edit Training Program
                                </h5>
                                <button className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    {/* Training Title */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Training Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={selectedTraining.title}
                                            placeholder="Enter training title"
                                        />
                                    </div>

                                    {/* Trainer/Platform */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Trainer / Platform</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue={selectedTraining.trainer}
                                            placeholder="Enter trainer or platform name"
                                        />
                                    </div>

                                    {/* Date and Duration Row */}
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Start Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                defaultValue={selectedTraining.date}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Duration</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue={selectedTraining.duration}
                                                placeholder="e.g., 2 Weeks, 3 Days"
                                            />
                                        </div>
                                    </div>

                                    {/* Status and Participants Row */}
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Status</label>
                                            <select className="form-select" defaultValue={selectedTraining.status}>
                                                <option value="Upcoming">Upcoming</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Number of Participants</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                defaultValue={selectedTraining.participants}
                                                placeholder="Enter number"
                                            />
                                        </div>
                                    </div>

                                    {/* Completion Percentage */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Completion Percentage</label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                defaultValue={selectedTraining.progress}
                                                min="0"
                                                max="100"
                                                placeholder="0-100"
                                            />
                                            <span className="input-group-text">%</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Description</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            defaultValue={selectedTraining.description}
                                            placeholder="Enter training description"
                                        ></textarea>
                                    </div>

                                    {/* Enrolled Employees */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Enrolled Employees</label>
                                        <div className="border rounded p-3 bg-light">
                                            <small className="text-muted d-block mb-2">Current enrollments:</small>
                                            <div className="d-flex flex-wrap gap-2">
                                                {selectedTraining.enrolledEmployees.map((emp, idx) => (
                                                    <span key={idx} className="badge bg-primary">
                                                        {emp}
                                                    </span>
                                                ))}
                                            </div>
                                            <button type="button" className="btn btn-sm btn-outline-primary mt-2">
                                                <FaPlus size={12} className="me-1" /> Add Employees
                                            </button>
                                        </div>
                                    </div>

                                    {/* Training Materials */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Training Materials</label>
                                        <div className="border rounded p-3 bg-light">
                                            <small className="text-muted d-block mb-2">Current materials:</small>
                                            <ul className="list-unstyled mb-2">
                                                {selectedTraining.materials.map((material, idx) => (
                                                    <li key={idx} className="mb-1">
                                                        <FaFileAlt className="text-danger me-2" size={12} />
                                                        <small>{material}</small>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button type="button" className="btn btn-sm btn-outline-primary">
                                                <FaPlus size={12} className="me-1" /> Upload Materials
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={() => {
                                    alert('Training updated successfully!');
                                    setShowEditModal(false);
                                }}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Training = () => (
    <DashboardLayout title="">
        <TrainingContent />
    </DashboardLayout>
);

export default Training;

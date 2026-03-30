import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { FaGraduationCap, FaPlus, FaUserGraduate, FaCalendarAlt, FaCheck, FaClock, FaEye, FaUsers, FaFileAlt, FaDownload } from 'react-icons/fa';
import { trainingService } from './service';

export const TrainingContent = () => {
    const [stats, setStats] = useState({ active_courses: 0, completion_rate: 0, training_hours: 0 });
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newProgram, setNewProgram] = useState({
        title: '', trainer: '', start_date: '', duration: '', participants: 0, description: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [sData, pData] = await Promise.all([
                trainingService.getStats(),
                trainingService.getPrograms()
            ]);
            setStats(sData);
            setTrainings(pData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateProgram = async () => {
        try {
            await trainingService.createProgram(newProgram);
            setShowCreateModal(false);
            fetchData();
            alert("Training program created successfully!");
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const handleView = async (training) => {
        setLoading(true);
        try {
            const details = await trainingService.getProgramDetails(training.id);
            setSelectedTraining(details || training);
            setShowViewModal(true);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAssignEmployees = async () => {
        const ids = prompt("Enter Employee IDs (comma separated):", "EMP-001, EMP-002");
        if (!ids) return;
        try {
            const idList = ids.split(',').map(id => id.trim());
            await trainingService.assignEmployees(selectedTraining.id, idList);
            alert("Employees assigned successfully!");
            handleView(selectedTraining);
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const handleMaterialUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
            await trainingService.uploadMaterials(selectedTraining.id, formData);
            alert("Material uploaded successfully!");
            handleView(selectedTraining);
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
        <div className="training-content p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Training & Development</h5>
                    <p className="text-secondary small mb-0">Upskill employees and track progress</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill d-flex align-items-center gap-2" onClick={() => setShowCreateModal(true)}>
                    <FaPlus /> Create Program
                </button>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
                        <FaGraduationCap className="text-primary" size={32} />
                        <div>
                            <h3 className="mb-0 fw-bold">{stats.active_courses}</h3>
                            <div className="text-secondary small">Active Courses</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
                        <FaUserGraduate className="text-success" size={32} />
                        <div>
                            <h3 className="mb-0 fw-bold">{stats.completion_rate}%</h3>
                            <div className="text-secondary small">Completion Rate</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
                        <FaClock className="text-warning" size={32} />
                        <div>
                            <h3 className="mb-0 fw-bold">{stats.training_hours}</h3>
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
                                    <td>{t.platform || t.trainer}</td>
                                    <td><div className="d-flex align-items-center gap-2"><FaCalendarAlt className="text-muted" /> {t.start_date || t.date}</div></td>
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
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="fw-bold text-dark mb-0">
                                            <FaUsers className="me-2" />
                                            Enrolled Employees ({selectedTraining.participants})
                                        </h6>
                                        <button className="btn btn-sm btn-outline-primary" style={{ fontSize: '0.75rem' }} onClick={handleAssignEmployees}>
                                            <FaPlus className="me-1" /> Add
                                        </button>
                                    </div>
                                    <div className="border rounded p-3 bg-light">
                                        <div className="row g-2">
                                            {(selectedTraining.enrolledEmployees || []).map((emp, idx) => (
                                                <div className="col-md-6" key={idx}>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <FaCheck className="text-success" size={12} />
                                                        <span className="small">{emp}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            {(!selectedTraining.enrolledEmployees || selectedTraining.enrolledEmployees.length === 0) && (
                                                <div className="col-12 text-center text-secondary small py-2">No employees enrolled yet</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Training Materials */}
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="fw-bold text-dark mb-0">
                                            <FaFileAlt className="me-2" />
                                            Training Materials
                                        </h6>
                                        <label className="btn btn-sm btn-outline-primary mb-0" style={{ fontSize: '0.75rem', cursor: 'pointer' }}>
                                            <FaPlus className="me-1" /> Upload
                                            <input type="file" hidden onChange={handleMaterialUpload} />
                                        </label>
                                    </div>
                                    <div className="list-group">
                                        {(selectedTraining.materials || []).map((material, idx) => (
                                            <div className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
                                                <div className="d-flex align-items-center gap-2">
                                                    <FaFileAlt className="text-danger" />
                                                    <span>{typeof material === 'string' ? material : material.name}</span>
                                                </div>
                                                <button className="btn btn-sm btn-outline-primary">
                                                    <FaDownload size={12} />
                                                </button>
                                            </div>
                                        ))}
                                        {(!selectedTraining.materials || selectedTraining.materials.length === 0) && (
                                            <div className="list-group-item text-center text-secondary small py-4">No materials uploaded yet</div>
                                        )}
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

            {/* Create Training Modal */}
            {showCreateModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowCreateModal(false)}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content border-0 shadow-lg rounded-4">
                            <div className="modal-header border-0 p-4">
                                <h5 className="modal-title fw-bold">Create New Training Program</h5>
                                <button className="btn-close" onClick={() => setShowCreateModal(false)}></button>
                            </div>
                            <div className="modal-body p-4 pt-0">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label small fw-bold">Training Title *</label>
                                        <input className="form-control" value={newProgram.title} onChange={e => setNewProgram({...newProgram, title: e.target.value})} placeholder="e.g. Advanced React" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Trainer / Platform</label>
                                        <input className="form-control" value={newProgram.trainer} onChange={e => setNewProgram({...newProgram, trainer: e.target.value})} placeholder="e.g. Udemy" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Start Date</label>
                                        <input type="date" className="form-control" value={newProgram.start_date} onChange={e => setNewProgram({...newProgram, start_date: e.target.value})} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Duration</label>
                                        <input className="form-control" value={newProgram.duration} onChange={e => setNewProgram({...newProgram, duration: e.target.value})} placeholder="e.g. 2 Weeks" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Max Participants</label>
                                        <input type="number" className="form-control" value={newProgram.participants} onChange={e => setNewProgram({...newProgram, participants: e.target.value})} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-bold">Description</label>
                                        <textarea className="form-control" rows={3} value={newProgram.description} onChange={e => setNewProgram({...newProgram, description: e.target.value})} placeholder="Program objectives..." />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0 p-4 pt-0 gap-2">
                                <button className="btn btn-light" onClick={() => setShowCreateModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleCreateProgram}>Create Program</button>
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

import React, { useState } from 'react';
import { MdAdd, MdAssignment } from 'react-icons/md';

const Task = () => {
    // Similar to DailyTask but might be more project-oriented or team-wide
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Quarterly Planning', priority: 'High', status: 'In Progress', assignedTo: 'Team' },
        { id: 2, title: 'Client Preservation', priority: 'Medium', status: 'Pending', assignedTo: 'Sarah' },
    ]);

    return (
        <div className="container p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 fw-bold text-dark mb-0">Project Tasks</h2>
                <button className="btn btn-primary btn-sm d-flex align-items-center gap-2">
                    <MdAdd /> Create Task
                </button>
            </div>

            <div className="row g-4">
                {tasks.map(task => (
                    <div className="col-md-6" key={task.id}>
                        <div className="card border-0 shadow-sm rounded-4 p-4 h-100 position-relative hover-lift">
                            <span className={`position-absolute top-0 end-0 m-3 badge rounded-pill ${task.priority === 'High' ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning'}`}>
                                {task.priority}
                            </span>
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="bg-light p-3 rounded-circle text-primary">
                                    <MdAssignment size={24} />
                                </div>
                                <h5 className="fw-bold mb-0">{task.title}</h5>
                            </div>
                            <p className="text-secondary small mb-3">Assigned to: <span className="fw-medium text-dark">{task.assignedTo}</span></p>
                            <div className="mt-auto">
                                <div className="progress" style={{ height: '6px' }}>
                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: task.status === 'Completed' ? '100%' : '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="d-flex justify-content-between mt-2 small text-secondary">
                                    <span>Progress</span>
                                    <span>{task.status === 'Completed' ? '100%' : '50%'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Task;

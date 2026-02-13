import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';

const DailyTask = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Team Meeting Prep', status: 'Pending', dueDate: '2026-02-12' },
        { id: 2, title: 'Review Code PRs', status: 'Completed', dueDate: '2026-02-12' },
        { id: 3, title: 'Update JIRA tickets', status: 'In Progress', dueDate: '2026-02-13' },
    ]);

    return (
        <div className="container p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 fw-bold text-dark mb-0">Daily Tasks</h2>
                <button className="btn btn-primary btn-sm d-flex align-items-center gap-2">
                    <MdAdd /> Add Task
                </button>
            </div>

            <div className="row g-3">
                {tasks.map(task => (
                    <div className="col-12" key={task.id}>
                        <div className="card border-0 shadow-sm rounded-3 p-3 d-flex flex-row align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3">
                                <input type="checkbox" className="form-check-input" checked={task.status === 'Completed'} readOnly />
                                <div>
                                    <h6 className={`mb-0 fw-semibold ${task.status === 'Completed' ? 'text-decoration-line-through text-muted' : ''}`}>{task.title}</h6>
                                    <small className="text-secondary">Due: {task.dueDate}</small>
                                </div>
                            </div>
                            <span className={`badge ${task.status === 'Completed' ? 'bg-success-subtle text-success' : task.status === 'In Progress' ? 'bg-primary-subtle text-primary' : 'bg-secondary-subtle text-secondary'}`}>
                                {task.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyTask;

import React, { useEffect } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { FaTrash } from 'react-icons/fa';

export const DailyTaskContent = () => {
    // Mock Data based on Screenshot
    const tasks = [
        { id: 1, task: 'Administrative Work', employee: 'Meera Joshi', manager: 'Arjun Singh', description: 'Administrative tasks: Office coordination, Vendor management, Meeting coordination. Ensured smooth office operations and organizational efficiency.', createdAt: '26-09-2025' },
        { id: 2, task: 'Vendor management', employee: 'Sanjay Gupta', manager: 'Praveen Kumar', description: 'Daily administrative work: Vendor management, Budget tracking, Process improvement. Supported organizational operations and management.', createdAt: '26-09-2025' },
        { id: 3, task: 'Benefits administration', employee: 'Mohan Prasad', manager: 'Priyanka Sharma', description: 'Daily HR operations: Benefits administration. Ensured smooth HR processes and employee engagement.', createdAt: '26-09-2025' },
        { id: 4, task: 'Training coordination', employee: 'Kiran Desai', manager: 'Priyanka Sharma', description: 'HR activities completed: Training coordination. Focused on employee satisfaction and organizational development.', createdAt: '26-09-2025' },
        { id: 5, task: 'Social media management', employee: 'Priya Nair', manager: 'Kavita Rao', description: 'Creative and marketing tasks: Social media management, Website content updates. Worked on increasing brand visibility and engagement.', createdAt: '26-09-2025' },
    ];

    return (
        <div className="attendance-content bg-light p-4" style={{ minHeight: '80vh' }}>
            {/* Header */}
            <div className="text-center mb-4">
                <h4 className="fw-bold text-dark">Employee Daily Task</h4>
            </div>

            {/* Config / Filters */}
            <div className="bg-white p-3 rounded shadow-sm mb-4">
                <div className="row">
                    <div className="col-md-3">
                        <select className="form-select text-secondary bg-light">
                            <option>Select Department</option>
                            <option>HR</option>
                            <option>Sales</option>
                            <option>Marketing</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="border-bottom-0 text-dark fw-bold small ps-4" style={{ width: '15%' }}>Task</th>
                                <th className="border-bottom-0 text-dark fw-bold small" style={{ width: '15%' }}>Employee</th>
                                <th className="border-bottom-0 text-dark fw-bold small" style={{ width: '15%' }}>Manager</th>
                                <th className="border-bottom-0 text-dark fw-bold small" style={{ width: '35%' }}>Description</th>
                                <th className="border-bottom-0 text-dark fw-bold small" style={{ width: '10%' }}>Created At</th>
                                <th className="border-bottom-0 text-dark fw-bold small text-center" style={{ width: '10%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((row) => (
                                <tr key={row.id}>
                                    <td className="ps-4 text-secondary small fw-bold">{row.task}</td>
                                    <td className="text-secondary small">{row.employee}</td>
                                    <td className="text-secondary small">{row.manager}</td>
                                    <td className="text-secondary small" style={{ lineHeight: '1.4' }}>{row.description}</td>
                                    <td className="text-secondary small">{row.createdAt}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm text-danger border-0 p-1"><FaTrash size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-end align-items-center p-3 border-top">
                    <span className="small text-muted me-3">Rows per page: 10</span>
                    <span className="small text-muted me-3">1-5 of 5</span>
                    <div className="btn-group">
                        <button className="btn btn-sm btn-link text-muted border-0">&lt;</button>
                        <button className="btn btn-sm btn-link text-muted border-0">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DailyTask = () => {
    return (
        <DashboardLayout title="Daily Task">
            <DailyTaskContent />
        </DashboardLayout>
    );
};

export default DailyTask;

import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../components/DashboardLayout.css';

export const DepartmentsContent = () => {
    const departments = [
        { id: 1, name: 'Administration', head: 'Praveen Kumar', location: 'Bangalore', employees: 12 },
        { id: 2, name: 'HR', head: 'Priyanka Sharma', location: 'Bangalore', employees: 5 },
        { id: 3, name: 'Engineering', head: 'Rajesh Gupta', location: 'Hyderabad', employees: 40 },
        { id: 4, name: 'Sales', head: 'Vikram Singh', location: 'Pune', employees: 25 },
        { id: 5, name: 'Marketing', head: 'Ananya Roy', location: 'Mumbai', employees: 15 },
    ];

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Department Management</h5>
                    <p className="text-secondary small mb-0">Manage company departments</p>
                </div>
                <button className="btn btn-primary btn-sm px-3 rounded-pill">
                    + Add Department
                </button>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Department Name</th>
                                <th>Department Head</th>
                                <th>Location</th>
                                <th>Employees</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((dept) => (
                                <tr key={dept.id}>
                                    <td>
                                        <span className="fw-bold text-dark">{dept.name}</span>
                                    </td>
                                    <td>{dept.head}</td>
                                    <td>{dept.location}</td>
                                    <td>{dept.employees}</td>
                                    <td>
                                        <button className="action-btn edit">Edit</button>
                                        <button className="action-btn delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

const Departments = () => {
    return (
        <DashboardLayout title="">
            <DepartmentsContent />
        </DashboardLayout>
    );
};

export default Departments;

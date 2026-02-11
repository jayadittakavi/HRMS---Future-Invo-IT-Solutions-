import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { FaUserShield, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const CreateUsername = () => {
    const navigate = useNavigate();
    // Mock Data simulating employees with and without accounts
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Praveen Kumar', email: 'praveen@trickuweb.com', dept: 'Administration', user: 'praveen', status: 'Active' },
        { id: 2, name: 'Priyanka Sharma', email: 'priyanka@trickuweb.com', dept: 'HR', user: 'priyanka', status: 'Active' },
        { id: 3, name: 'Nitin Patel', email: 'nitin@trickuweb.com', dept: 'Engineering', user: '', status: 'Pending' },
        { id: 4, name: 'Amit Singh', email: 'amit@example.com', dept: 'Sales', user: '', status: 'Pending' },
        { id: 5, name: 'Sarah Lee', email: 'sarah@example.com', dept: 'Marketing', user: '', status: 'Pending' },
    ]);

    const handleGenerate = (id) => {
        setEmployees(employees.map(emp => {
            if (emp.id === id) {
                // simple username generation logic
                const username = emp.email.split('@')[0];
                return { ...emp, user: username, status: 'Active' };
            }
            return emp;
        }));
    };

    const handleGenerateAll = () => {
        setEmployees(employees.map(emp => {
            if (!emp.user) {
                const username = emp.email.split('@')[0];
                return { ...emp, user: username, status: 'Active' };
            }
            return emp;
        }));
        alert("All usernames generated successfully!");
    };

    return (
        <DashboardLayout title="Create Usernames">
            <div className="container-fluid p-4" style={{ minHeight: '80vh' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="fw-bold mb-1">Create Usernames</h4>
                        <p className="text-muted small mb-0">Generate login credentials for employees who don't have access yet.</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleGenerateAll}>
                        <FaUserShield className="me-2" /> Generate All Missing
                    </button>
                </div>

                <div className="card border-0 shadow-sm">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">Employee Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Username</th>
                                    <th>Status</th>
                                    <th className="text-end pe-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(emp => (
                                    <tr key={emp.id}>
                                        <td className="ps-4 fw-bold">{emp.name}</td>
                                        <td className="text-secondary">{emp.email}</td>
                                        <td><span className="badge bg-light text-dark border">{emp.dept}</span></td>
                                        <td>
                                            {emp.user ? (
                                                <span className="fw-bold text-success">{emp.user}</span>
                                            ) : (
                                                <span className="text-muted fst-italic">Not Generated</span>
                                            )}
                                        </td>
                                        <td>
                                            {emp.user ? (
                                                <span className="badge bg-success"><FaCheckCircle className="me-1" /> Active</span>
                                            ) : (
                                                <span className="badge bg-warning text-dark"><FaExclamationCircle className="me-1" /> Pending</span>
                                            )}
                                        </td>
                                        <td className="text-end pe-4">
                                            {!emp.user ? (
                                                <button className="btn btn-sm btn-outline-primary" onClick={() => handleGenerate(emp.id)}>
                                                    Generate Username
                                                </button>
                                            ) : (
                                                <button className="btn btn-sm btn-light disabled" disabled>Created</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <button className="btn btn-link text-decoration-none text-secondary" onClick={() => navigate('/employee-directory')}>&larr; Back to Employee Directory</button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CreateUsername;

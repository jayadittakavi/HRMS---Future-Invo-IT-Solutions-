import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheckCircle, FaBan, FaPlus, FaFileCsv, FaUserPlus } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import "../../../../components/layout/DashboardLayout.css";

export const EmployeesContent = () => {
    const navigate = useNavigate();
    // Mock Data
    const [employees, setEmployees] = useState([
        { id: 1, user: 'praveen', name: 'Praveen Kumar', email: 'praveen@trickuweb.com', dept: 'Administration', desig: 'System Administrator', pay: 'N/A', type: 'Admin', status: 'Active' },
        { id: 2, user: 'priyanka', name: 'Priyanka Sharma', email: 'priyanka@trickuweb.com', dept: 'HR', desig: 'HR Manager', pay: 'N/A', type: 'Manager', status: 'Active' },
        { id: 3, user: 'nitin', name: 'Nitin Patel', email: 'nitin@trickuweb.com', dept: 'Engineering', desig: 'Software Developer', pay: 'N/A', type: 'Employee', status: 'Active' },
    ]);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [filterDept, setFilterDept] = useState('');
    const [filterName, setFilterName] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // asc or desc
    const [sortBy, setSortBy] = useState('id'); // id or name


    // Form Data State
    const [formData, setFormData] = useState({
        userAccount: '',
        name: '',
        email: '',
        phone: '',
        dept: '',
        desig: '',
        type: 'Employee',
        joiningDate: '',
        company: '',
        branch: '',
        payGrade: '',
        ctc: '',
        manager: '',
        status: 'Active',
        lock: false
    });

    // Handlers
    // Handlers
    const openAddModal = (type) => {
        setFormData({
            userAccount: '', name: '', email: '', phone: '',
            dept: '', desig: '', type: type, joiningDate: '',
            company: '', branch: '', payGrade: '', ctc: '',
            manager: '', status: 'Active', lock: false
        });
        setShowAdd(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const handleEdit = (emp) => {
        setSelectedEmployee(emp);
        setFormData(emp);
        setShowEdit(true);
    };

    const handleUpdateEmployee = () => {
        const updatedList = employees.map(emp =>
            emp.id === selectedEmployee.id ? { ...formData, id: selectedEmployee.id } : emp
        );
        setEmployees(updatedList);
        setShowEdit(false);
    };

    const handleDelete = (emp) => {
        setSelectedEmployee(emp);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        setEmployees(employees.filter(e => e.id !== selectedEmployee.id));
        setShowDelete(false);
    };

    const toggleStatus = (id) => {
        const updatedList = employees.map(emp => {
            if (emp.id === id) {
                return { ...emp, status: emp.status === 'Active' ? 'Inactive' : 'Active' };
            }
            return emp;
        });
        setEmployees(updatedList);
    };

    const handleSaveEmployee = () => {
        const newEmp = {
            id: employees.length + 1,
            ...formData,
            // Map form fields to table expected fields if necessary
            user: formData.userAccount || formData.name.toLowerCase().replace(/\s/g, '').slice(0, 8),
            // Ensure other fields are present or defaulted
            pay: formData.ctc || 'N/A'
        };
        setEmployees([...employees, newEmp]);
        setShowAdd(false);
        // Reset form for next add
        setFormData({
            userAccount: '', name: '', email: '', phone: '',
            dept: '', desig: '', type: 'Employee', joiningDate: '',
            company: '', branch: '', payGrade: '', ctc: '',
            manager: '', status: 'Active', lock: false
        });
    };

    const handleExportCSV = () => {
        const headers = ["ID,Username,Name,Email,Department,Designation,Phone,Status"];
        const rows = employees.map(emp =>
            `${emp.id},${emp.user},${emp.name},${emp.email},${emp.dept},${emp.desig},${emp.phone || ''},${emp.status}`
        );
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "employees_list.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCreateUsername = () => {
        navigate('/create-username');
    };

    // Derived State for Filtering
    const filteredEmployees = employees
        .filter(emp => {
            if (filterDept && filterDept !== 'Select Department' && emp.dept !== filterDept) return false;
            if (filterName && !emp.name.toLowerCase().includes(filterName.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'name') {
                return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
            return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
        });


    return (
        <>
            <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold text-dark mb-0">Employee Details</h5>
                </div>

                <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center bg-white p-3 rounded shadow-sm">
                    <div className="d-flex gap-2 flex-grow-1">
                        <select className="form-select form-select-sm" style={{ maxWidth: '200px' }} value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
                            <option value="">Select Department</option>
                            <option>Administration</option>
                            <option>HR</option>
                            <option>Engineering</option>
                        </select>
                        <select className="form-select form-select-sm" style={{ maxWidth: '150px' }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="id">By ID</option>
                            <option value="name">By Name</option>
                        </select>
                        <select className="form-select form-select-sm" style={{ maxWidth: '150px' }} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-success btn-sm d-flex align-items-center gap-2" onClick={handleExportCSV}>
                            <FaFileCsv /> EXPORT CSV
                        </button>
                        <button className="btn btn-primary btn-sm d-flex align-items-center gap-2" onClick={handleCreateUsername}>
                            <FaUserPlus /> CREATE USERNAME
                        </button>
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary btn-sm dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown" aria-expanded="false">
                                <FaPlus /> ADD MEMBER
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><button className="dropdown-item" onClick={() => navigate('/add-member', { state: { type: 'Employee' } })}>Add Employee</button></li>
                                <li><button className="dropdown-item" onClick={() => navigate('/add-member', { state: { type: 'HR' } })}>Add HR</button></li>
                                <li><button className="dropdown-item" onClick={() => navigate('/add-member', { state: { type: 'Manager' } })}>Add Manager</button></li>
                                <li><button className="dropdown-item" onClick={() => navigate('/add-member', { state: { type: 'Admin' } })}>Add Admin</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>City</th>
                                <th>Status</th>
                                <th>Download</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((emp) => (
                                <tr key={emp.id} className={emp.status === 'Inactive' ? 'opacity-50' : ''}>
                                    <td>{emp.user}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.phone || '+91 9876543210'}</td>
                                    <td>Female</td>
                                    <td>{emp.city || 'Mumbai'}</td>
                                    <td>
                                        <span className={`badge ${emp.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td>---</td>
                                    <td>27-09-2025</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-sm btn-outline-primary border-0" onClick={() => handleEdit(emp)}><FaEdit /></button>
                                            <button
                                                className="btn btn-sm btn-outline-warning border-0"
                                                onClick={() => toggleStatus(emp.id)}
                                                title={emp.status === 'Active' ? "Deactivate" : "Activate"}
                                            >
                                                {emp.status === 'Active' ? <FaBan /> : <FaCheckCircle />}
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDelete(emp)}><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Employee Modal (New Design) */}
            {showAdd && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div>
                                    <h5 className="modal-title fw-bold">Add New {formData.type}</h5>
                                    <p className="text-muted small mb-0">Enter employee information to add to the system</p>
                                </div>
                                <button className="btn-close" onClick={() => setShowAdd(false)}></button>
                            </div>
                            <div className="modal-body pt-4">
                                <form>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Select User Account</label>
                                            <select className="form-select" name="userAccount" value={formData.userAccount} onChange={handleInputChange}>
                                                <option value="">Select a user account</option>
                                                <option value="new_user_1">New User 1</option>
                                            </select>
                                            <div className="form-text small text-muted">Only unassigned user accounts are shown</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Full Name</label>
                                            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Email</label>
                                            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} placeholder="john.doe@company.com" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Phone</label>
                                            <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone number" />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Department</label>
                                            <select className="form-select" name="dept" value={formData.dept} onChange={handleInputChange}>
                                                <option value="">Select Department</option>
                                                <option>Administration</option>
                                                <option>HR</option>
                                                <option>Engineering</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Designation</label>
                                            <input type="text" className="form-control" name="desig" value={formData.desig} onChange={handleInputChange} placeholder="Software Engineer" />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Employee Type</label>
                                            <select className="form-select" name="type" value={formData.type} onChange={handleInputChange}>
                                                <option>Employee</option>
                                                <option>Manager</option>
                                                <option>Admin</option>
                                                <option>HR</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Joining Date</label>
                                            <input type="date" className="form-control" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Company</label>
                                            <select className="form-select" name="company" value={formData.company} onChange={handleInputChange}>
                                                <option value="">Select Company</option>
                                                <option>Future Invo</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Branch</label>
                                            <select className="form-select" name="branch" value={formData.branch} onChange={handleInputChange}>
                                                <option value="">Select Branch</option>
                                                <option>Main Branch</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">PayGrade *</label>
                                            <select className="form-select" name="payGrade" value={formData.payGrade} onChange={handleInputChange}>
                                                <option value="">Select PayGrade</option>
                                                <option>Grade A</option>
                                                <option>Grade B</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">CTC (Annual)</label>
                                            <input type="number" className="form-control" name="ctc" value={formData.ctc} onChange={handleInputChange} placeholder="600000" />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label small fw-bold">Manager (Optional)</label>
                                            <select className="form-select" name="manager" value={formData.manager} onChange={handleInputChange}>
                                                <option value="">Select Manager</option>
                                                <option>Priyanka Sharma (HR Manager)</option>
                                            </select>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="lockCheck"
                                                    checked={formData.lock}
                                                    onChange={(e) => setFormData({ ...formData, lock: e.target.checked })}
                                                />
                                                <label className="form-check-label small" htmlFor="lockCheck">
                                                    Lock Form Editing
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-primary w-100 mb-2" onClick={handleSaveEmployee}>Add Employee</button>
                                <button className="btn btn-light w-100" onClick={() => setShowAdd(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEdit && selectedEmployee && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Employee</h5>
                                <button className="btn-close" onClick={() => setShowEdit(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Department</label>
                                            <select
                                                className="form-select"
                                                name="dept"
                                                value={formData.dept}
                                                onChange={handleInputChange}
                                            >
                                                <option>Administration</option>
                                                <option>HR</option>
                                                <option>Engineering</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Designation</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="desig"
                                                value={formData.desig}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">User Type</label>
                                            <select
                                                className="form-select"
                                                name="type"
                                                value={formData.type}
                                                onChange={handleInputChange}
                                            >
                                                <option>Employee</option>
                                                <option>Admin</option>
                                                <option>Manager</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Status</label>
                                            <select
                                                className="form-select"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowEdit(false)}>Close</button>
                                <button className="btn btn-primary btn-sm" onClick={handleUpdateEmployee}>Update Employee</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDelete && selectedEmployee && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Delete Employee</h5>
                                <button className="btn-close" onClick={() => setShowDelete(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete <strong>{selectedEmployee.name}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowDelete(false)}>Cancel</button>
                                <button className="btn btn-danger btn-sm" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};

const Employees = () => {
    return (
        <DashboardLayout title="">
            <EmployeesContent />
        </DashboardLayout>
    );
};

export default Employees;

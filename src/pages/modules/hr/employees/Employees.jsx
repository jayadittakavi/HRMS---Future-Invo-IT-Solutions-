import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheckCircle, FaBan, FaPlus, FaFileCsv, FaSearch } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useSearch } from '../../../../context/SearchContext';
import { useAuth } from '../../../../context/AuthContext';
import "../../../../components/layout/DashboardLayout.css";

export const EmployeesContent = () => {
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    // Mock Data
    const [employees, setEmployees] = useState([
        { id: 1, user: 'praveen', name: 'Praveen Kumar', email: 'praveen@trickuweb.com', dept: '1', desig: 'System Administrator', type: 'Admin', company: 'N/A', status: 'Active' },
        { id: 2, user: 'priyanka', name: 'Priyanka Sharma', email: 'priyanka@trickuweb.com', dept: '2', desig: 'HR Manager', type: 'Manager', company: 'N/A', status: 'Active' },
        { id: 3, user: 'nitin', name: 'Nitin Patel', email: 'nitin@trickuweb.com', dept: '3', desig: 'Software Developer', type: 'Employee', company: 'N/A', status: 'Active' },
        { id: 4, user: 'admin', name: 'System Admin', email: 'admin@trickuweb.com', dept: '1', desig: 'System Administrator', type: 'Admin', company: 'N/A', status: 'Active' },
        { id: 5, user: 'manager', name: 'Department Manager', email: 'manager@trickuweb.com', dept: '2', desig: 'Department Manager', type: 'Manager', company: 'N/A', status: 'Active' },
    ]);

    // Modal States
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [filterDept, setFilterDept] = useState('');
    const [filterName, setFilterName] = useState(globalSearchTerm);
    const [sortOrder, setSortOrder] = useState('asc'); // asc or desc
    const [sortBy, setSortBy] = useState('id'); // id or name

    // Sync local search with global search
    React.useEffect(() => {
        setFilterName(globalSearchTerm);
    }, [globalSearchTerm]);


    // Form Data State
    const [formData, setFormData] = useState({
        userAccount: '',
        name: '',
        email: '',
        phone: '',
        dept: '',
        desig: '',
        type: 'Employee',
        username: '',
        password: '',
        joiningDate: '',
        company: '',
        branch: '',
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
            username: '', password: '',
            company: '', branch: '', ctc: '',
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
        setShowStatusModal(true);
    };

    const confirmStatusToggle = () => {
        toggleStatus(selectedEmployee.id);
        setShowStatusModal(false);
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
            username: '', password: '',
            company: '', branch: '', ctc: '',
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
        <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold text-dark mb-1">Employee Management</h4>
                    <p className="text-secondary small mb-0">Manage employee records and information</p>
                </div>
                <button
                    type="button"
                    className="btn btn-primary px-4 fw-bold shadow-sm d-flex align-items-center gap-2"
                    onClick={() => openAddModal('Employee')}
                >
                    <FaPlus /> ADD EMPLOYEE
                </button>
            </div>

            <div className="bg-white p-3 rounded shadow-sm mb-4 border-0 d-flex flex-wrap gap-2 justify-content-between align-items-center">
                <div className="d-flex gap-2 flex-grow-1 align-items-center">
                    <div className="position-relative">
                        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                        <input
                            type="text"
                            className="form-control form-control-sm rounded ps-5 bg-light border-0"
                            style={{ width: '300px' }}
                            placeholder="Search by name or username..."
                            value={filterName}
                            onChange={(e) => {
                                const val = e.target.value;
                                setFilterName(val);
                                setGlobalSearchTerm(val);
                            }}
                        />
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-light btn-sm border d-flex align-items-center gap-2" onClick={handleExportCSV}>
                        <FaFileCsv className="text-success" /> EXPORT
                    </button>
                </div>
            </div>

            <div className="table-card">
                <div className="table-responsive">
                    <table className="table custom-table align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Type</th>
                                <th>Company ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((emp) => (
                                <tr key={emp.id} className={emp.status === 'Inactive' ? 'opacity-50' : ''}>
                                    <td className="fw-bold">{emp.user}</td>
                                    <td>{emp.name}</td>
                                    <td className="text-secondary small">{emp.email}</td>
                                    <td>{emp.dept}</td>
                                    <td>{emp.desig}</td>
                                    <td>
                                        <span className={`badge ${emp.type === 'Admin' ? 'bg-purple-role' : emp.type === 'Manager' ? 'bg-purple-soft-role' : 'bg-secondary'} rounded-pill px-3`}>
                                            {emp.type}
                                        </span>
                                    </td>
                                    <td>{emp.company || 'N/A'}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-sm btn-light border p-2" onClick={() => handleEdit(emp)} title="Edit">
                                                <FaEdit className="text-primary" />
                                            </button>
                                            <button
                                                className={`btn btn-sm ${emp.status === 'Active' ? 'btn-danger' : 'btn-success'} p-2`}
                                                onClick={() => handleDelete(emp)}
                                                title={emp.status === 'Active' ? "Deactivate" : "Activate"}
                                            >
                                                {emp.status === 'Active' ? <FaBan /> : <FaCheckCircle />}
                                            </button>
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

                                        {/* Credentials Section */}
                                        <div className="col-12"><h6 className="text-primary small fw-bold border-bottom pb-1 mt-2">Login Credentials</h6></div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Username <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control form-control-sm" name="username" value={formData.username} onChange={handleInputChange} placeholder="Create username" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold">Password <span className="text-danger">*</span></label>
                                            <input type="password" name="password" className="form-control form-control-sm" value={formData.password} onChange={handleInputChange} placeholder="Set password" required />
                                        </div>
                                        <div className="col-12 text-muted xsmall" style={{ fontSize: '0.7rem' }}>
                                            The user will use these credentials to access their account.
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

            {/* Deactivate/Activate Modal */}
            {showStatusModal && selectedEmployee && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className={`modal-title ${selectedEmployee.status === 'Active' ? 'text-danger' : 'text-success'}`}>
                                    {selectedEmployee.status === 'Active' ? 'Deactivate' : 'Activate'} Employee
                                </h5>
                                <button className="btn-close" onClick={() => setShowStatusModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to <strong>{selectedEmployee.status === 'Active' ? 'deactivate' : 'activate'}</strong> <strong>{selectedEmployee.name}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowStatusModal(false)}>Cancel</button>
                                <button className={`btn ${selectedEmployee.status === 'Active' ? 'btn-danger' : 'btn-success'} btn-sm`} onClick={confirmStatusToggle}>
                                    {selectedEmployee.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
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

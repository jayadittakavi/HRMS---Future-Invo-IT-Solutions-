import React, { useEffect, useState } from "react";
import { attendanceService } from "./server/server";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";

// Exporting the content component separately for use in dashboards
export const AttendanceContent = ({ personal = false }) => {
    const { user } = useAuth();
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter/Form states for manual entry could go here
    const [showManualModal, setShowManualModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null); // State to hold record being edited

    // Import state
    const [showImportModal, setShowImportModal] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [isImporting, setIsImporting] = useState(false);

    useEffect(() => {
        fetchAttendance();
    }, [user, personal]);

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            let res;
            // Normalize role checking
            const role = user?.role?.toLowerCase();

            // If personal prop is true, force fetching my attendance
            if (personal || role === "employee") {
                res = await attendanceService.getMyAttendance();
            } else if (["admin", "superadmin", "hr", "manager"].includes(role)) {
                res = await attendanceService.getAllAttendance();
            } else {
                // Fallback for unexpected roles
                res = await attendanceService.getMyAttendance();
            }

            // Unpack data - fetch returns analyzed json directly
            // Adjust based on actual API response structure. Assuming direct array or { data: [] }
            setAttendance(res.data || res || []);
            setError(null);
        } catch (err) {
            console.error("Attendance fetch error", err);
            setError("Failed to fetch attendance records.");
        } finally {
            setLoading(false);
        }
    };

    const handleManualAttendance = async (formData) => {
        try {
            if (editingRecord) {
                await attendanceService.updateAttendance(editingRecord.id || editingRecord._id, formData);
                alert("Attendance updated successfully!");
            } else {
                await attendanceService.addManualAttendance(formData);
                alert("Attendance added successfully!");
            }
            setShowManualModal(false);
            setEditingRecord(null); // Reset edit state
            fetchAttendance(); // 🔥 refresh list after add
        } catch (err) {
            console.error("Manual attendance error", err);
            alert("Failed to save attendance.");
        }
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        setShowManualModal(true);
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        try {
            await attendanceService.deleteAttendance(id);
            fetchAttendance();
        } catch (err) {
            console.error("Delete error", err);
            alert("Failed to delete record.");
        }
    };

    // CSV Import Logic
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImportFile(e.target.files[0]);
        }
    };

    const handleImportSubmit = async () => {
        if (!importFile) return;
        setIsImporting(true);
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            // Simple CSV Parser (Assumes header: Employee ID, Date, Status, Check In, Check Out)
            const rows = text.split('\n').slice(1); // Skip header
            let successCount = 0;
            let errorCount = 0;

            for (let row of rows) {
                if (!row.trim()) continue;
                const cols = row.split(',');
                if (cols.length < 3) continue;

                const record = {
                    employeeId: cols[0]?.trim(),
                    date: cols[1]?.trim() || new Date().toISOString().split('T')[0],
                    status: cols[2]?.trim() || 'Present',
                    checkIn: cols[3]?.trim() || '',
                    checkOut: cols[4]?.trim() || ''
                };

                try {
                    // Sequentially save to backend using the manual add API
                    // In a real app, use a bulk API
                    await attendanceService.addManualAttendance(record);
                    successCount++;
                } catch (err) {
                    console.error("Import error for row", row, err);
                    errorCount++;
                }
            }

            alert(`Import complete. Success: ${successCount}, Failed: ${errorCount}`);
            setIsImporting(false);
            setShowImportModal(false);
            setImportFile(null);
            fetchAttendance();
        };
        reader.readAsText(importFile);
    };

    // Helper to check permissions - IF personal mode is on, manage actions are disabled
    const canManage = !personal && ["superadmin", "admin", "hr", "manager"].includes(user?.role?.toLowerCase());

    return (
        <>
            <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 style={{ color: 'var(--text-main)' }}>Attendance Records</h2>
                    {canManage && (
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-outline-success"
                                onClick={() => setShowImportModal(true)}
                            >
                                Import CSV
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowManualModal(true)}
                            >
                                Add Manual Attendance
                            </button>
                        </div>
                    )}
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {loading ? (
                    <div className="text-center" style={{ color: 'var(--text-main)' }}>Loading...</div>
                ) : (
                    <div className="table-responsive rounded shadow-sm" style={{ backgroundColor: 'var(--card-bg)' }}>
                        <table className="table table-hover mb-0" style={{ color: 'var(--text-main)' }}>
                            <thead style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-secondary)' }}>
                                <tr>
                                    <th style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)' }}>Date</th>
                                    <th style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)' }}>Employee</th> {/* Show Name/ID if admin */}
                                    <th style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)' }}>Status</th>
                                    <th style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)' }}>Check In</th>
                                    <th style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)' }}>Check Out</th>
                                    {/* Added Role and Department for visibility */}
                                    <th style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)' }}>Role</th>
                                    <th style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)' }}>Department</th>
                                    {canManage && <th style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)' }}>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.length > 0 ? (
                                    attendance.map((row) => (
                                        <tr key={row.id || row._id}>
                                            <td style={{ color: 'var(--text-main)' }}>{new Date(row.date).toLocaleDateString()}</td>
                                            <td style={{ color: 'var(--text-main)' }}>
                                                {/* Display name if available, else generic */}
                                                {row.employeeId?.name || row.employeeName || row.employeeId || "Self"}
                                            </td>
                                            <td>
                                                <span className={`badge ${row.status === 'Present' ? 'bg-success' :
                                                    row.status === 'Absent' ? 'bg-danger' : 'bg-warning'
                                                    }`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td style={{ color: 'var(--text-main)' }}>{row.checkIn || '-'}</td>
                                            <td style={{ color: 'var(--text-main)' }}>{row.checkOut || '-'}</td>
                                            {/* Role and Department Columns */}
                                            <td style={{ color: 'var(--text-main)', textTransform: 'capitalize' }}>{row.employeeId?.role || '-'}</td>
                                            <td style={{ color: 'var(--text-main)', textTransform: 'capitalize' }}>{row.employeeId?.department?.name || row.employeeId?.department || '-'}</td>
                                            {canManage && (
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(row.id || row._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-primary ms-2"
                                                        onClick={() => handleEdit(row)}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={canManage ? 8 : 7} className="text-center py-4">
                                            No attendance records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Import CSV Modal */}
            {showImportModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}>
                            <div className="modal-header" style={{ borderBottomColor: 'var(--border-color)' }}>
                                <h5 className="modal-title">Import Attendance CSV</h5>
                                <button className="btn-close" onClick={() => setShowImportModal(false)} style={{ filter: 'var(--filter-invert)' }}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Select CSV File</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept=".csv"
                                        onChange={handleFileChange}
                                        style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                                    />
                                    <div className="form-text" style={{ color: 'var(--text-muted)' }}>
                                        Format: Employee ID, Date (YYYY-MM-DD), Status, Check In (HH:mm), Check Out (HH:mm)
                                    </div>
                                </div>
                                {importFile && (
                                    <div className="alert alert-info py-2">
                                        Selected: {importFile.name}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowImportModal(false)}>Cancel</button>
                                <button
                                    className="btn btn-success"
                                    onClick={handleImportSubmit}
                                    disabled={!importFile || isImporting}
                                >
                                    {isImporting ? 'Importing...' : 'Upload & Process'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Simple Manual Entry Modal */}
            {showManualModal && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-main)' }}>
                            <div className="modal-header" style={{ borderBottomColor: 'var(--border-color)' }}>
                                <h5 className="modal-title">{editingRecord ? 'Edit Attendance' : 'Add Manual Attendance'}</h5>
                                <button className="btn-close" onClick={() => { setShowManualModal(false); setEditingRecord(null); }} style={{ filter: 'var(--filter-invert)' }}></button>
                            </div>
                            <div className="modal-body">
                                <ManualAttendanceForm
                                    onSubmit={handleManualAttendance}
                                    onCancel={() => { setShowManualModal(false); setEditingRecord(null); }}
                                    initialData={editingRecord}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Simple internal component for the form
const ManualAttendanceForm = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
        checkIn: '',
        checkOut: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                employeeId: initialData.employeeId?.employeeId || initialData.employeeId || '', // Handle populated vs raw ID
                date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
                status: initialData.status || 'Present',
                checkIn: initialData.checkIn || '',
                checkOut: initialData.checkOut || ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Employee ID</label>
                <input
                    type="text"
                    name="employeeId"
                    className="form-control"
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                    name="status"
                    className="form-select"
                    onChange={handleChange}
                    style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Half Day">Half Day</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Check In Time</label>
                <input
                    type="time"
                    name="checkIn"
                    className="form-control"
                    onChange={handleChange}
                    style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Check Out Time</label>
                <input
                    type="time"
                    name="checkOut"
                    className="form-control"
                    onChange={handleChange}
                    style={{ backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                />
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>
    );
};

const Attendance = () => {
    return (
        <DashboardLayout title="Attendance Management">
            <AttendanceContent />
        </DashboardLayout>
    );
};

export default Attendance;

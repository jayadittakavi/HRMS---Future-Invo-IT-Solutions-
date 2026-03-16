import React, { useState, useRef, useEffect } from 'react';
import {
    MdCloudUpload, MdDownload, MdTableChart, MdArrowBack,
    MdAdd, MdDelete, MdSave, MdCheckCircle, MdSync
} from 'react-icons/md';
import { attendanceService } from '../service/service';

const BulkAttendance = () => {
    const [isExcelMode, setIsExcelMode] = useState(false);
    const [excelData, setExcelData] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const fileInputRef = useRef(null);

    // Standard View States
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
    const [globalStatus, setGlobalStatus] = useState('Present');
    const [globalShift, setGlobalShift] = useState(1);

    // Fetch Bulk Attendance List
    const fetchBulkList = async () => {
        setLoading(true);
        try {
            const data = await attendanceService.getBulkAttendanceList(currentDate);
            setEmployees(data.employees || []);
            setSelectedEmployees([]); // Reset selection on date change
        } catch (err) {
            console.error("Fetch bulk list failed:", err);
            alert("Failed to load employee list: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBulkList();
    }, [currentDate]);

    // Handle updates locally before saving
    const handleEmployeeUpdate = (id, field, value) => {
        setEmployees(prev => prev.map(emp =>
            emp.employee_id === id ? { ...emp, [field]: value } : emp
        ));
    };

    const toggleEmployee = (id) => {
        setSelectedEmployees(prev =>
            prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        setSelectedEmployees(selectedEmployees.length === employees.length ? [] : employees.map(e => e.employee_id));
    };

    const applyGlobalSettings = () => {
        if (selectedEmployees.length === 0) {
            alert("Please select at least one employee first.");
            return;
        }
        setEmployees(prev => prev.map(emp =>
            selectedEmployees.includes(emp.employee_id)
                ? { ...emp, current_status: globalStatus, shift_id: globalShift }
                : emp
        ));
    };

    const handleSaveAll = async () => {
        setSaving(true);
        try {
            const updates = employees.map(emp => ({
                employee_id: emp.employee_id,
                status: emp.current_status,
                reason: emp.reason || '',
                shift_id: emp.shift_id || 1,
                // These can be extended if needed by the UI
                in_time: emp.in_time || null,
                out_time: emp.out_time || null
            }));

            await attendanceService.saveBulkAttendance({
                date: currentDate,
                updates: updates
            });

            alert("Bulk attendance saved successfully!");
            fetchBulkList(); // Refresh data
        } catch (err) {
            console.error("Save bulk failed:", err);
            alert("Failed to save: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // --- CSV Import & Excel Handlers ---
    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            const rows = text.split('\n').filter(row => row.trim() !== '');
            const startIndex = (rows[0].toLowerCase().includes('id') || rows[0].toLowerCase().includes('name')) ? 1 : 0;

            const importedData = rows.slice(startIndex).map(row => {
                const columns = row.split(',').map(col => col.trim());
                return {
                    id: columns[0] || '',
                    name: columns[1] || '',
                    date: columns[2] || '',
                    shift: columns[3] || '',
                    status: columns[4] || '',
                    inTime: columns[5] || '',
                    outTime: columns[6] || ''
                };
            });

            if (importedData.length > 0) {
                setExcelData(importedData);
                setIsExcelMode(true);
            }
        };
        reader.readAsText(file);
    };

    const handleCellChange = (rowIndex, field, value) => {
        const newData = [...excelData];
        newData[rowIndex][field] = value;
        setExcelData(newData);
    };

    const addExcelRow = () => {
        setExcelData([...excelData, { id: '', name: '', date: '', shift: '', status: '', inTime: '', outTime: '' }]);
    };

    const deleteExcelRow = (index) => {
        setExcelData(excelData.filter((_, i) => i !== index));
    };

    const saveExcelData = async () => {
        const validData = excelData.filter(row => row.id || row.name);
        setSaving(true);
        try {
            // Map excel data to API format
            const updates = validData.map(row => ({
                employee_id: row.id,
                status: row.status || 'Present',
                reason: 'Imported from CSV',
                shift_id: 1, // Default or parsed
                in_time: row.inTime,
                out_time: row.outTime
            }));

            await attendanceService.saveBulkAttendance({
                date: currentDate,
                updates: updates
            });

            alert('Imported data saved successfully!');
            setIsExcelMode(false);
            fetchBulkList();
        } catch (err) {
            alert("Failed to save imported data: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // --- Render Excel View ---
    if (isExcelMode) {
        return (
            <div className="card border-0 shadow-sm animate__animated animate__fadeIn" style={{ borderRadius: '15px' }}>
                <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 rounded-pill px-3" onClick={() => setIsExcelMode(false)}>
                            <MdArrowBack /> Back
                        </button>
                        <div>
                            <h5 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                                <MdTableChart className="text-success" /> Attendance Excel Editor
                            </h5>
                            <p className="text-muted small mb-0">Modify the imported data before processing</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary d-flex align-items-center gap-2 rounded-pill px-4" onClick={saveExcelData} disabled={saving}>
                            {saving ? <div className="spinner-border spinner-border-sm" role="status"></div> : <MdSave />}
                            {saving ? 'Saving...' : 'Process & Save'}
                        </button>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive" style={{ maxHeight: '550px' }}>
                        <table className="excel-table-inbuilt">
                            <thead>
                                <tr className="bg-light">
                                    <th className="num-col">#</th>
                                    <th>Emp ID</th>
                                    <th>Full Name</th>
                                    <th>Date</th>
                                    <th>Shift</th>
                                    <th>Status</th>
                                    <th>In Time</th>
                                    <th>Out Time</th>
                                    <th className="action-col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {excelData.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="text-center bg-light small">{idx + 1}</td>
                                        <td><input type="text" value={row.id} onChange={(e) => handleCellChange(idx, 'id', e.target.value)} /></td>
                                        <td><input type="text" value={row.name} onChange={(e) => handleCellChange(idx, 'name', e.target.value)} /></td>
                                        <td><input type="text" value={row.date} onChange={(e) => handleCellChange(idx, 'date', e.target.value)} /></td>
                                        <td><input type="text" value={row.shift} onChange={(e) => handleCellChange(idx, 'shift', e.target.value)} /></td>
                                        <td><input type="text" value={row.status} onChange={(e) => handleCellChange(idx, 'status', e.target.value)} /></td>
                                        <td><input type="text" value={row.inTime} onChange={(e) => handleCellChange(idx, 'inTime', e.target.value)} /></td>
                                        <td><input type="text" value={row.outTime} onChange={(e) => handleCellChange(idx, 'outTime', e.target.value)} /></td>
                                        <td className="text-center">
                                            <button className="btn btn-link text-danger p-0" onClick={() => deleteExcelRow(idx)}><MdDelete /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-3 border-top bg-light">
                        <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2 rounded-3" onClick={addExcelRow}>
                            <MdAdd /> Add Row
                        </button>
                    </div>
                </div>
                <style>{`
                    .excel-table-inbuilt { width: 100%; border-collapse: collapse; }
                    .excel-table-inbuilt th { border: 1px solid #dee2e6; padding: 10px; font-size: 0.8rem; text-transform: uppercase; color: #64748b; }
                    .excel-table-inbuilt td { border: 1px solid #dee2e6; padding: 0; }
                    .excel-table-inbuilt input { width: 100%; border: none; padding: 10px 12px; outline: none; font-size: 0.85rem; background: transparent; }
                    .excel-table-inbuilt input:focus { background: #f0f7ff; box-shadow: inset 0 0 0 2px #2563eb; }
                    .num-col, .action-col { width: 45px; }
                `}</style>
            </div>
        );
    }

    // --- Render Standard View ---
    return (
        <div className="card border-0 shadow-sm animate__animated animate__fadeIn" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold text-dark">Bulk Attendance Management</h5>
                <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2 rounded-2" onClick={fetchBulkList}>
                        <MdSync /> Refresh List
                    </button>
                    <button className="btn btn-outline-success btn-sm d-flex align-items-center gap-2 rounded-2">
                        <MdDownload /> Download Template
                    </button>
                    <button
                        className="btn btn-primary btn-sm d-flex align-items-center gap-2 rounded-2"
                        onClick={handleImportClick}
                    >
                        <MdCloudUpload /> Import CSV
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept=".csv"
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            <div className="card-body p-4">
                {/* Global Settings */}
                <div className="row g-3 mb-4 bg-light p-3 rounded-4 border">
                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-secondary">Select Date</label>
                        <input
                            type="date"
                            className="form-control border-0 shadow-sm"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-secondary">Select Shift</label>
                        <select className="form-select border-0 shadow-sm" value={globalShift} onChange={(e) => setGlobalShift(parseInt(e.target.value))}>
                            <option value={1}>General Shift</option>
                            <option value={2}>Morning Shift</option>
                            <option value={3}>Night Shift</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-secondary">Set Status For All</label>
                        <select className="form-select border-0 shadow-sm" value={globalStatus} onChange={(e) => setGlobalStatus(e.target.value)}>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="WFH">WFH</option>
                            <option value="WeekOff">WeekOff</option>
                        </select>
                    </div>
                    <div className="col-md-3 d-flex align-items-end">
                        <button
                            className="btn btn-warning w-100 fw-bold border-0 shadow-sm"
                            style={{ background: '#f59e0b', color: '#fff' }}
                            onClick={applyGlobalSettings}
                        >
                            APPLY TO SELECTED
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="table-responsive border rounded-4 overflow-hidden shadow-sm bg-white">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4" style={{ width: '60px' }}>
                                    <input type="checkbox" className="form-check-input shadow-none" checked={employees.length > 0 && selectedEmployees.length === employees.length} onChange={toggleAll} />
                                </th>
                                <th className="text-secondary small fw-bold">EMPLOYEE NAME</th>
                                <th className="text-secondary small fw-bold">DEPARTMENT</th>
                                <th className="text-secondary small fw-bold">CURRENT STATUS</th>
                                <th className="pe-4 text-secondary small fw-bold">REASON</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status"></div>
                                        <div className="mt-2 text-muted">Loading employee list...</div>
                                    </td>
                                </tr>
                            ) : employees.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        No employees found for this date.
                                    </td>
                                </tr>
                            ) : (
                                employees.map(emp => (
                                    <tr key={emp.employee_id} className={selectedEmployees.includes(emp.employee_id) ? 'table-primary bg-opacity-10' : ''}>
                                        <td className="ps-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input shadow-none"
                                                checked={selectedEmployees.includes(emp.employee_id)}
                                                onChange={() => toggleEmployee(emp.employee_id)}
                                            />
                                        </td>
                                        <td>
                                            <div className="fw-bold text-dark">{emp.full_name || emp.name}</div>
                                            <div className="text-muted small">{emp.employee_code || `EMP-${emp.employee_id}`}</div>
                                        </td>
                                        <td className="text-secondary small">{emp.department || 'N/A'}</td>
                                        <td>
                                            <select
                                                className="form-select form-select-sm border border-light rounded-pill px-3 fw-bold text-primary w-auto shadow-none"
                                                value={emp.current_status || 'Present'}
                                                onChange={(e) => handleEmployeeUpdate(emp.employee_id, 'current_status', e.target.value)}
                                                disabled={!selectedEmployees.includes(emp.employee_id)}
                                            >
                                                <option value="Present">Present</option>
                                                <option value="Absent">Absent</option>
                                                <option value="Half Day">Half Day</option>
                                                <option value="Late">Late</option>
                                                <option value="WFH">WFH</option>
                                                <option value="WeekOff">WeekOff</option>
                                            </select>
                                        </td>
                                        <td className="pe-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm border-0 bg-transparent shadow-none"
                                                placeholder="Add reason..."
                                                value={emp.reason || ''}
                                                onChange={(e) => handleEmployeeUpdate(emp.employee_id, 'reason', e.target.value)}
                                                disabled={!selectedEmployees.includes(emp.employee_id)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-end mt-4 gap-2">
                    <button className="btn btn-outline-secondary px-4 rounded-3 border-0" onClick={() => fetchBulkList()}>Discard Changes</button>
                    <button
                        className="btn btn-primary px-5 rounded-pill fw-bold shadow-lg border-0"
                        style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                        onClick={handleSaveAll}
                        disabled={saving || loading}
                    >
                        {saving ? (
                            <span className="d-flex align-items-center gap-2">
                                <div className="spinner-border spinner-border-sm" role="status"></div>
                                Saving Changes...
                            </span>
                        ) : (
                            <span className="d-flex align-items-center gap-2">
                                <MdCheckCircle /> Save All Changes
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BulkAttendance;

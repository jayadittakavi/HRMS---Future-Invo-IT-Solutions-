import React, { useState, useRef } from 'react';
import {
    MdCloudUpload, MdDownload, MdTableChart, MdArrowBack,
    MdAdd, MdDelete, MdSave, MdCheckCircle
} from 'react-icons/md';

const BulkAttendance = () => {
    const [isExcelMode, setIsExcelMode] = useState(false);
    const [excelData, setExcelData] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const fileInputRef = useRef(null);

    // Mock Employee List for standard view
    const employees = [
        { id: 1, name: 'John Doe', dept: 'IT', status: 'Present' },
        { id: 2, name: 'Jane Smith', dept: 'HR', status: 'Present' },
        { id: 3, name: 'Mike Ross', dept: 'Sales', status: 'Present' },
        { id: 4, name: 'Rachel Green', dept: 'Marketing', status: 'Present' },
        { id: 5, name: 'Harvey Specter', dept: 'Legal', status: 'Present' },
    ];

    // --- Standard View Handlers ---
    const toggleEmployee = (id) => {
        setSelectedEmployees(prev =>
            prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        setSelectedEmployees(selectedEmployees.length === employees.length ? [] : employees.map(e => e.id));
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

    const saveExcelData = () => {
        const validData = excelData.filter(row => row.id || row.name);
        console.log('Saving Excel Data:', validData);
        alert('Attendance processed and saved successfully!');
        setIsExcelMode(false);
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
                        <button className="btn btn-primary d-flex align-items-center gap-2 rounded-pill px-4" onClick={saveExcelData}>
                            <MdSave /> Process & Save
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
        <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold text-dark">Bulk Attendance Management</h5>
                <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2 rounded-2">
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
                        <input type="date" className="form-control border-0 shadow-sm" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-secondary">Select Shift</label>
                        <select className="form-select border-0 shadow-sm">
                            <option>General Shift</option>
                            <option>Morning Shift</option>
                            <option>Night Shift</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-secondary">Set Status For All</label>
                        <select className="form-select border-0 shadow-sm">
                            <option>Present</option>
                            <option>Absent</option>
                            <option>WFH</option>
                            <option>WeekOff</option>
                        </select>
                    </div>
                    <div className="col-md-3 d-flex align-items-end">
                        <button className="btn btn-warning w-100 fw-bold border-0 shadow-sm" style={{ background: '#f59e0b', color: '#fff' }}>
                            APPLY TO SELECTED
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="table-responsive border rounded-4 overflow-hidden">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4" style={{ width: '60px' }}>
                                    <input type="checkbox" className="form-check-input" checked={selectedEmployees.length === employees.length} onChange={toggleAll} />
                                </th>
                                <th className="text-secondary small fw-bold">EMPLOYEE NAME</th>
                                <th className="text-secondary small fw-bold">DEPARTMENT</th>
                                <th className="text-secondary small fw-bold">CURRENT STATUS</th>
                                <th className="pe-4 text-secondary small fw-bold">REASON</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.id} className={selectedEmployees.includes(emp.id) ? 'table-primary bg-opacity-10' : ''}>
                                    <td className="ps-4">
                                        <input type="checkbox" className="form-check-input" checked={selectedEmployees.includes(emp.id)} onChange={() => toggleEmployee(emp.id)} />
                                    </td>
                                    <td>
                                        <div className="fw-bold text-dark">{emp.name}</div>
                                        <div className="text-muted small">EMP-00{emp.id}</div>
                                    </td>
                                    <td className="text-secondary small">{emp.dept}</td>
                                    <td>
                                        <select className="form-select form-select-sm border-0 bg-transparent fw-bold text-primary w-auto" disabled={!selectedEmployees.includes(emp.id)}>
                                            <option>Present</option>
                                            <option>Absent</option>
                                            <option>WFH</option>
                                        </select>
                                    </td>
                                    <td className="pe-4">
                                        <input type="text" className="form-control form-control-sm border-0 bg-transparent" placeholder="Add reason..." disabled={!selectedEmployees.includes(emp.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-end mt-4 gap-2">
                    <button className="btn btn-outline-secondary px-4 rounded-3">Cancel</button>
                    <button className="btn btn-success px-4 rounded-3 fw-bold shadow-sm">Save All Changes</button>
                </div>
            </div>
        </div>
    );
};

export default BulkAttendance;

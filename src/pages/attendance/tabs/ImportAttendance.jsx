import React from 'react';
import { MdCloudUpload, MdFileDownload } from 'react-icons/md';

const ImportAttendance = () => {
    return (
        <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0 fw-bold text-dark">Import Attendance Data</h5>
            </div>
            <div className="card-body p-5 text-center">
                <div className="mb-4">
                    <MdCloudUpload size={64} className="text-primary opacity-50" />
                </div>
                <h4 className="fw-bold text-dark mb-3">Upload CSV File</h4>
                <p className="text-muted mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    Please upload a CSV file following the predefined template. The system will automatically parse and update attendance records.
                </p>

                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-outline-primary btn-lg d-flex align-items-center gap-2 fw-bold">
                        <MdFileDownload /> Download Template
                    </button>
                    <button className="btn btn-primary btn-lg d-flex align-items-center gap-2 fw-bold">
                        Choose File
                    </button>
                </div>

                <div className="mt-5 text-start mx-auto p-4 bg-light rounded" style={{ maxWidth: '600px' }}>
                    <h6 className="fw-bold text-dark mb-3">CSV Format Instructions:</h6>
                    <ul className="text-muted small mb-0 ps-3">
                        <li className="mb-2"><strong>Employee ID:</strong> Unique identifier for the employee.</li>
                        <li className="mb-2"><strong>Date:</strong> Format as YYYY-MM-DD.</li>
                        <li className="mb-2"><strong>Shift:</strong> Values: General Shift, Morning Shift, Night Shift.</li>
                        <li className="mb-2"><strong>Status:</strong> Values: Present, Absent, Half Day, Late, WFH.</li>
                        <li className="mb-2"><strong>Punch In/Out:</strong> Format as HH:MM AM/PM.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ImportAttendance;

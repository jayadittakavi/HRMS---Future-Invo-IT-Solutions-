import React from 'react';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa';

const ReportsTab = () => {
    return (
        <div className="container-fluid p-0">
            <h5 className="fw-bold mb-3">Payroll Reports</h5>
            <div className="table-responsive table-card">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Report Name</th>
                            <th>Description</th>
                            <th>Last Generated</th>
                            <th className="text-end">Format</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Salary Register</td>
                            <td>Monthly salary register with all components</td>
                            <td>2 days ago</td>
                            <td className="text-end">
                                <button className="btn btn-sm btn-light text-success me-1"><FaFileExcel /></button>
                                <button className="btn btn-sm btn-light text-danger"><FaFilePdf /></button>
                            </td>
                        </tr>
                        <tr>
                            <td>PF Report</td>
                            <td>EPF contribution report for filing</td>
                            <td>1 week ago</td>
                            <td className="text-end">
                                <button className="btn btn-sm btn-light text-success me-1"><FaFileExcel /></button>
                                <button className="btn btn-sm btn-light text-danger"><FaFilePdf /></button>
                            </td>
                        </tr>
                        <tr>
                            <td>ESI Report</td>
                            <td>ESI contribution list</td>
                            <td>1 week ago</td>
                            <td className="text-end">
                                <button className="btn btn-sm btn-light text-success me-1"><FaFileExcel /></button>
                                <button className="btn btn-sm btn-light text-danger"><FaFilePdf /></button>
                            </td>
                        </tr>
                        <tr>
                            <td>Tax Deduction Report</td>
                            <td>Income tax deductions summary</td>
                            <td>Just now</td>
                            <td className="text-end">
                                <button className="btn btn-sm btn-light text-success me-1"><FaFileExcel /></button>
                                <button className="btn btn-sm btn-light text-danger"><FaFilePdf /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportsTab;

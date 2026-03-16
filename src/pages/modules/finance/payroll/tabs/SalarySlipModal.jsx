import React, { useState, useEffect } from 'react';
import { MdClose, MdSave, MdPictureAsPdf, MdCalculate, MdPerson, MdEventNote } from 'react-icons/md';

const SalarySlipModal = ({ show, onClose, onSave }) => {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Selection, 2: Calculation/Review
    const [form, setForm] = useState({
        employeeId: '',
        employeeName: '',
        month: new Date().toISOString().substring(0, 7), // YYYY-MM
        ctc: 600000,
        workingDays: 22,
        leaves: 0,
        bonus: 0,
    });

    const [calculation, setCalculation] = useState(null);

    const employees = [
        { id: 'EMP001', name: 'Ravi Kumar', ctc: 800000 },
        { id: 'EMP002', name: 'Priya Sharma', ctc: 1200000 },
        { id: 'EMP003', name: 'Amit Singh', ctc: 500000 },
    ];

    const calculateSalary = () => {
        const monthlyGross = form.ctc / 12;
        const perDaySalary = monthlyGross / 30; // Standard 30 days divisor
        const leaveDeduction = perDaySalary * form.leaves;

        // Basic Statutory Components
        const basic = monthlyGross * 0.50;
        const hra = basic * 0.40;
        const specialAllowance = monthlyGross - basic - hra;

        const pf = Math.min(basic * 0.12, 1800); // PF Cap 1800
        const pt = 200; // Standard PT

        const netSalary = monthlyGross - leaveDeduction - pf - pt + Number(form.bonus);

        setCalculation({
            monthlyGross,
            basic,
            hra,
            specialAllowance,
            leaveDeduction,
            pf,
            pt,
            bonus: Number(form.bonus),
            netSalary
        });
        setStep(2);
    };

    const handleEmployeeChange = (e) => {
        const emp = employees.find(emp => emp.id === e.target.value);
        if (emp) {
            setForm({ ...form, employeeId: emp.id, employeeName: emp.name, ctc: emp.ctc });
        } else {
            setForm({ ...form, employeeId: '', employeeName: '', ctc: 0 });
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                    <div className="modal-header border-0 bg-dark text-white p-4">
                        <div>
                            <h5 className="modal-title fw-bold mb-0">Generate Salary Slip</h5>
                            <p className="text-white-50 small mb-0">Automatic calculation based on attendance & leaves</p>
                        </div>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>

                    <div className="modal-body p-4 bg-light">
                        {step === 1 ? (
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold small text-muted">Employee Selector</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0"><MdPerson className="text-primary" /></span>
                                        <select className="form-select border-start-0" value={form.employeeId} onChange={handleEmployeeChange}>
                                            <option value="">Select Employee</option>
                                            {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.id})</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold small text-muted">Payroll Month</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0"><MdEventNote className="text-primary" /></span>
                                        <input type="month" className="form-control border-start-0" value={form.month} onChange={e => setForm({ ...form, month: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold small text-muted">Total Leaves (Deduction)</label>
                                    <input type="number" className="form-control" value={form.leaves} onChange={e => setForm({ ...form, leaves: e.target.value })} placeholder="0" />
                                    <div className="form-text x-small text-warning">Salary will be automatically deducted for these days</div>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold small text-muted">Bonus / Incentives</label>
                                    <input type="number" className="form-control" value={form.bonus} onChange={e => setForm({ ...form, bonus: e.target.value })} placeholder="0" />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold small text-muted">Est. Working Days</label>
                                    <input type="number" className="form-control" value={form.workingDays} readOnly disabled />
                                </div>
                            </div>
                        ) : (
                            <div className="animate__animated animate__fadeIn">
                                <div className="card border-0 shadow-sm rounded-3 mb-4 overflow-hidden">
                                    <div className="card-header bg-white border-bottom py-3">
                                        <h6 className="fw-bold mb-0 text-primary">Calculation Summary - {form.employeeName}</h6>
                                    </div>
                                    <div className="card-body p-0">
                                        <table className="table table-sm table-borderless mb-0">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th className="ps-4 py-2 small text-uppercase text-muted">Earnings</th>
                                                    <th className="text-end py-2 small text-uppercase text-muted">Amount</th>
                                                    <th className="py-2 small text-uppercase text-muted">Deductions</th>
                                                    <th className="text-end pe-4 py-2 small text-uppercase text-muted">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="ps-4 py-2">Basic Salary</td>
                                                    <td className="text-end py-2 fw-medium">₹{calculation.basic.toFixed(2)}</td>
                                                    <td className="py-2 text-danger">Leaves Deduction ({form.leaves} days)</td>
                                                    <td className="text-end py-2 text-danger fw-bold">₹{calculation.leaveDeduction.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-4 py-2">HRA</td>
                                                    <td className="text-end py-2 fw-medium">₹{calculation.hra.toFixed(2)}</td>
                                                    <td className="py-2">Provident Fund (PF)</td>
                                                    <td className="text-end py-2 fw-medium">₹{calculation.pf.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="ps-4 py-2">Special Allowance</td>
                                                    <td className="text-end py-2 fw-medium">₹{calculation.specialAllowance.toFixed(2)}</td>
                                                    <td className="py-2">Professional Tax (PT)</td>
                                                    <td className="text-end py-2 fw-medium">₹{calculation.pt.toFixed(2)}</td>
                                                </tr>
                                                <tr className="border-top">
                                                    <td className="ps-4 py-3 fw-bold text-success">Total Earnings (Incl. Bonus)</td>
                                                    <td className="text-end py-3 fw-bold text-success">₹{(calculation.monthlyGross + calculation.bonus).toFixed(2)}</td>
                                                    <td className="py-3 fw-bold text-danger">Total Deductions</td>
                                                    <td className="text-end pe-4 py-3 fw-bold text-danger">₹{(calculation.leaveDeduction + calculation.pf + calculation.pt).toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="card-footer bg-primary text-white text-center py-3">
                                        <span className="small opacity-75 me-2">NET PAYABLE:</span>
                                        <h4 className="fw-bold mb-0 d-inline">₹{calculation.netSalary.toFixed(2)}</h4>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="modal-footer border-0 p-4 bg-white d-flex justify-content-between">
                        {step === 1 ? (
                            <>
                                <button className="btn btn-light rounded-pill px-4" onClick={onClose}>Cancel</button>
                                <button className="btn btn-primary rounded-pill px-4 fw-bold d-flex align-items-center gap-2"
                                    onClick={calculateSalary} disabled={!form.employeeId}>
                                    <MdCalculate size={18} /> Run Automatic Calculation
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setStep(1)}>← Back to Adjust</button>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-success rounded-pill px-4 fw-bold d-flex align-items-center gap-2">
                                        <MdSave size={18} /> Save & Post
                                    </button>
                                    <button className="btn btn-dark rounded-pill px-4 fw-bold d-flex align-items-center gap-2"
                                        onClick={() => window.print()}>
                                        <MdPictureAsPdf size={18} /> Download Payslip
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                .x-small { font-size: 0.7rem; }
            `}</style>
        </div>
    );
};

export default SalarySlipModal;

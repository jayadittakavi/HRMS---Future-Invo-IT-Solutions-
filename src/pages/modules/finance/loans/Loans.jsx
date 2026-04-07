import React, { useState, useEffect } from 'react';
import { SimpleBarChart, SimpleDonutChart } from '../../../../components/charts/CustomCharts';
import { FaHandHoldingUsd, FaMoneyBillAlt, FaPercent, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';
import { useSearch } from '../../../../context/SearchContext';
import { useAuth } from '../../../../context/AuthContext';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { loansService } from './service';

export const LoansContent = () => {
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);
    const [loading, setLoading] = useState(false);
    const [dashboard, setDashboard] = useState({
        stats: { totalDisbursed: "₹0", activeLoans: 0, avgInterest: "0%" },
        charts: { distribution: [], trend: [] }
    });
    const [requests, setRequests] = useState([]);

    const { user } = useAuth();
    const role = user?.role?.toLowerCase() || 'employee';
    const isEmployee = role === 'employee';

    const fetchData = async () => {
        setLoading(true);
        try {
            const [dData, rData] = await Promise.all([
                loansService.getDashboard(role),
                loansService.getRequests(role)
            ]);
            // Ensure we have the nested objects
            const safeDData = {
                stats: dData?.stats || { totalDisbursed: "₹0", activeLoans: 0, avgInterest: "0%" },
                charts: {
                    distribution: dData?.charts?.distribution || [],
                    trend: dData?.charts?.trend || []
                }
            };
            setDashboard(safeDData);
            setRequests(Array.isArray(rData) ? rData : []);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        setSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);

    const handleAction = async (id, action) => {
        if (!window.confirm(`Are you sure you want to ${action.toLowerCase()} this loan?`)) return;
        try {
            await loansService.updateLoanStatus(id, action);
            fetchData();
            alert(`Loan ${action.toLowerCase()}ed successfully!`);
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const handleApplyLoan = async () => {
        try {
            await loansService.applyLoan(applicationForm);
            setShowApplyModal(false);
            fetchData();
            alert("Loan application submitted successfully!");
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const calculateEMI = (p, r, n) => {
        if (!p || !r || !n) return 0;
        const monthlyRate = r / 12 / 100;
        const emi = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
        return Math.round(emi);
    };

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [applicationForm, setApplicationForm] = useState({
        employee_id: '', amount: '', interest_rate: '8.5', tenure_months: '12', type: 'Personal', purpose: ''
    });

    useEffect(() => {
        const emi = calculateEMI(applicationForm.amount, applicationForm.interest_rate, applicationForm.tenure_months);
        setApplicationForm(prev => ({ ...prev, emi, employee_id: user?.employee_id || '' }));
    }, [applicationForm.amount, applicationForm.interest_rate, applicationForm.tenure_months, user?.employee_id]);

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">{isEmployee ? 'My Loan Space' : 'Loan Management'}</h4>
                <button className="btn btn-primary px-4 rounded-pill fw-bold" onClick={() => setShowApplyModal(true)}>
                    + Apply for Loan
                </button>
            </div>
            {/* Key Metrics */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="bg-white p-4 rounded shadow-sm d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary"><FaHandHoldingUsd size={24} /></div>
                        <div>
                            <div className="text-secondary small fw-bold">Total Disbursed</div>
                            <h3 className="mb-0 fw-bold">{dashboard.stats.totalDisbursed || "₹12.5L"}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white p-4 rounded shadow-sm d-flex align-items-center gap-3">
                        <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success"><FaMoneyBillAlt size={24} /></div>
                        <div>
                            <div className="text-secondary small fw-bold">Active Loans</div>
                            <h3 className="mb-0 fw-bold">{dashboard.stats.activeLoans || 24}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white p-4 rounded shadow-sm d-flex align-items-center gap-3">
                        <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning"><FaPercent size={24} /></div>
                        <div>
                            <div className="text-secondary small fw-bold">Avg. Interest Rate</div>
                            <h3 className="mb-0 fw-bold">{dashboard.stats.avgInterest || "8.5%"}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-5">
                    <div className="bg-white p-4 rounded shadow-sm h-100">
                        <h6 className="fw-bold mb-4">Loan Type Distribution</h6>
                        <div className="d-flex justify-content-center">
                            <SimpleDonutChart segments={dashboard.charts?.distribution?.length > 0 ? dashboard.charts.distribution : [
                                { label: 'Personal', value: 45, color: '#3b82f6' },
                                { label: 'Home', value: 30, color: '#10b981' },
                                { label: 'Emergency', value: 25, color: '#f59e0b' },
                            ]} size="220px" centerText="Types" />
                        </div>
                        <p className="text-center small text-muted mt-2">Distribution by Purpose</p>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="bg-white p-4 rounded shadow-sm h-100">
                        <h6 className="fw-bold mb-4">Monthly Disbursement Trend</h6>
                        <SimpleBarChart data={dashboard.charts?.trend?.length > 0 ? dashboard.charts.trend : [
                            { label: 'Jan', value: 120000, color: '#6366f1' },
                            { label: 'Feb', value: 85000, color: '#6366f1' },
                            { label: 'Mar', value: 150000, color: '#6366f1' },
                            { label: 'Apr', value: 90000, color: '#6366f1' },
                            { label: 'May', value: 200000, color: '#6366f1' },
                        ]} height="280px" />
                    </div>
                </div>
            </div>

            {/* Loan Requests Table */}
            <div className="bg-white rounded shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Recent Loan Requests</h5>
                    <div className="input-group input-group-sm" style={{ width: '250px' }}>
                        <span className="input-group-text bg-light border-0"><FaSearch /></span>
                        <input
                            type="text"
                            className="form-control border-0 bg-light"
                            placeholder="Search employee or type..."
                            value={searchTerm}
                            onChange={e => {
                                const val = e.target.value;
                                setSearchTerm(val);
                                setGlobalSearchTerm(val);
                            }}
                        />
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="border-0 small fw-bold text-secondary">ID</th>
                                {!isEmployee && <th className="border-0 small fw-bold text-secondary">Employee</th>}
                                <th className="border-0 small fw-bold text-secondary">Amount</th>
                                <th className="border-0 small fw-bold text-secondary">Type</th>
                                <th className="border-0 small fw-bold text-secondary">Status</th>
                                <th className="border-0 small fw-bold text-secondary">EMI</th>
                                <th className="border-0 small fw-bold text-secondary text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.filter(loan =>
                                (loan.employee || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                                (loan.type || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                                String(loan.id).includes(searchTerm)
                            ).map(loan => (
                                <tr key={loan.id}>
                                    <td className="text-muted">#{loan.id}</td>
                                    {!isEmployee && <td className="fw-bold">{loan.employee}</td>}
                                    <td>{loan.amount}</td>
                                    <td>{loan.type}</td>
                                    <td>
                                        <span className={`badge ${loan.status === 'Active' ? 'bg-primary' :
                                            loan.status === 'Approved' ? 'bg-success' :
                                                loan.status === 'Paid' ? 'bg-secondary' :
                                                    'bg-warning'
                                            }`}>{loan.status}</span>
                                    </td>
                                    <td>{loan.emi}</td>
                                    <td className="text-end">
                                        <div className="d-flex gap-2 justify-content-end">
                                            {loan.status === 'Pending' && !isEmployee && (
                                                <>
                                                    <button onClick={() => handleAction(loan.id, 'APPROVE')} className="btn btn-sm btn-outline-success border-0 px-2" title="Approve"><FaCheck /></button>
                                                    <button onClick={() => handleAction(loan.id, 'REJECT')} className="btn btn-sm btn-outline-danger border-0 px-2" title="Reject"><FaTimes /></button>
                                                </>
                                            )}
                                            <button className="btn btn-sm btn-outline-primary border-0 fw-bold">View</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {requests.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-muted small">No loan requests found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Apply Loan Modal */}
            {showApplyModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowApplyModal(false)}>
                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content border-0 shadow-lg rounded-4">
                            <div className="modal-header border-0 p-4 pb-0">
                                <h5 className="modal-title fw-bold">Apply for Loan</h5>
                                <button className="btn-close" onClick={() => setShowApplyModal(false)}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label small fw-bold">Employee ID / Name</label>
                                        <input className="form-control" value={applicationForm.employee_id} onChange={e => setApplicationForm({...applicationForm, employee_id: e.target.value})} placeholder="e.g. EMP-001" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Loan Amount (Principle)</label>
                                        <div className="input-group">
                                            <span className="input-group-text">₹</span>
                                            <input type="number" className="form-control" value={applicationForm.amount} onChange={e => setApplicationForm({...applicationForm, amount: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Interest Rate (%)</label>
                                        <input type="number" step="0.1" className="form-control" value={applicationForm.interest_rate} onChange={e => setApplicationForm({...applicationForm, interest_rate: e.target.value})} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Tenure (Months)</label>
                                        <input type="number" className="form-control" value={applicationForm.tenure_months} onChange={e => setApplicationForm({...applicationForm, tenure_months: e.target.value})} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Loan Type</label>
                                        <select className="form-select" value={applicationForm.type} onChange={e => setApplicationForm({...applicationForm, type: e.target.value})}>
                                            <option>Personal</option>
                                            <option>Home Renovation</option>
                                            <option>Emergency</option>
                                            <option>Education</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <div className="p-3 rounded-3" style={{ background: '#f8faff', border: '1px solid #eef2f7' }}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="text-secondary small fw-bold">Monthly EMI Projection</div>
                                                <div className="h4 mb-0 fw-bold text-primary">₹ {applicationForm.emi || 0}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-bold">Purpose</label>
                                        <textarea className="form-control" rows="2" value={applicationForm.purpose} onChange={e => setApplicationForm({...applicationForm, purpose: e.target.value})} placeholder="Briefly state the reason..."></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0 p-4 pt-0 gap-2">
                                <button className="btn btn-light px-4" onClick={() => setShowApplyModal(false)}>Cancel</button>
                                <button className="btn btn-primary px-4" onClick={handleApplyLoan}>Submit Application</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Loans = () => {
    return (
        <DashboardLayout title="Loan Management">
            <LoansContent />
        </DashboardLayout>
    );
};

export default Loans;

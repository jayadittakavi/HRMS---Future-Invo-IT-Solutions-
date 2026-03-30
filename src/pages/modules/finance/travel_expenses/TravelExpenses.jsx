import React, { useState, useEffect } from 'react';
import { useSearch } from '../../../../context/SearchContext';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { SimpleLineChart } from '../../../../components/charts/CustomCharts';
import { expenseService } from './service';
import { FaPlaneDeparture, FaReceipt, FaWallet, FaArrowTrendUp, FaEllipsisVertical, FaPlus } from 'react-icons/fa6';
import { MdOutlineHistory, MdFilterList, MdFileDownload } from 'react-icons/md';

export const TravelExpensesContent = () => {
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);
    const [loading, setLoading] = useState(false);
    const [showNewClaim, setShowNewClaim] = useState(false);
    const [stats, setStats] = useState({ totalExpenses: "$0", pendingClaims: "0", approvedTrips: "0" });
    const [trends, setTrends] = useState([0, 0, 0, 0, 0, 0]);
    const [claims, setClaims] = useState([]);
    const [claimFormData, setClaimFormData] = useState({
        project: '',
        category: 'Flight',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [sData, tData, cData] = await Promise.all([
                expenseService.getStats(),
                expenseService.getTrends(),
                expenseService.getClaims()
            ]);
            setStats(sData);
            setTrends(tData.length > 0 ? tData : [650, 900, 1200, 850, 1500, 1100]);
            setClaims(cData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        setSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);

    const handleAction = async (id, action) => {
        const reason = action === 'Rejected' ? prompt("Please provide a reason for rejection:") : "";
        if (action === 'Rejected' && reason === null) return;
        try {
            await expenseService.updateClaimStatus(id, action, reason);
            fetchData();
            alert(`Claim ${action.toLowerCase()}ed successfully!`);
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const handleExport = () => {
        const headers = ['ID', 'Employee', 'Project', 'Category', 'Date', 'Amount', 'Status'];
        const csvContent = [
            headers.join(','),
            ...claims.map(exp => [
                exp.id,
                `"${exp.employee}"`,
                `"${exp.project}"`,
                exp.category,
                exp.date,
                `"${exp.amount}"`,
                exp.status
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `expense_claims_${new Date().toLocaleDateString()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert("Exporting expense claims to CSV...");
    };

    const handleNewClaim = async (e) => {
        e.preventDefault();
        try {
            await expenseService.submitClaim(claimFormData);
            setShowNewClaim(false);
            setClaimFormData({ project: '', category: 'Flight', amount: '', date: new Date().toISOString().split('T')[0], description: '' });
            fetchData();
            alert("New expense claim submitted successfully!");
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
        <div className="container-fluid p-0 animate__animated animate__fadeIn">
            {/* Header / Actions */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold text-dark mb-1">Travel & Expenses</h4>
                    <p className="text-secondary small mb-0">Track employee travel requests and expense reimbursements.</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-flex align-items-center gap-2" onClick={handleExport}>
                        <MdFileDownload /> Export
                    </button>
                    <button className="btn btn-primary btn-sm rounded-pill px-4 d-flex align-items-center gap-2 shadow-sm" onClick={() => setShowNewClaim(true)}>
                        <FaPlus size={12} /> New Claim
                    </button>
                </div>
            </div>

            {/* Overview Cards... no changes here ... */}
            {/* Overview Cards */}
            <div className="row g-4 mb-4">
                {/* BLUE CARD */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden premium-card premium-card-blue-solid h-100">
                        <div className="card-body p-4 position-relative">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div className="icon-box-solid text-primary">
                                    <FaWallet size={20} />
                                </div>
                                <span className="badge bg-white text-success rounded-pill px-3 py-2 small d-flex align-items-center gap-1 shadow-sm border border-success border-opacity-25" style={{ fontSize: '0.75rem' }}>
                                    <FaArrowTrendUp size={10} /> +12%
                                </span>
                            </div>
                            <h6 className="small fw-bold text-uppercase mb-2 ls-1" style={{ color: '#475569' }}>Total Expenses (YTD)</h6>
                            <h2 className="fw-bolder mb-0" style={{ fontSize: '2.5rem', letterSpacing: '-0.05rem', color: '#0f172a' }}>{stats.totalExpenses || "$45,200"}</h2>
                            <p className="smaller mt-2 mb-0 fw-medium" style={{ color: '#64748b' }}>Updated 2h ago</p>
                            <div className="card-bg-icon text-primary"><FaWallet /></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden premium-card premium-card-amber-solid h-100">
                        <div className="card-body p-4 position-relative">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div className="icon-box-solid text-warning" style={{ background: '#fef3c7' }}>
                                    <FaReceipt size={20} />
                                </div>
                                <div className="tall-pill-icon text-secondary cursor-pointer hover-shadow transition-all">
                                    <FaEllipsisVertical size={14} />
                                </div>
                            </div>
                            <h6 className="small fw-bold text-uppercase mb-2 ls-1" style={{ color: '#78350f' }}>Pending Claims</h6>
                            <h2 className="fw-bolder mb-0" style={{ fontSize: '2.5rem', letterSpacing: '-0.05rem', color: '#1e293b' }}>{stats.pendingClaims || "08"}</h2>
                            <p className="smaller mt-2 mb-0 fw-bold" style={{ color: '#d97706' }}>Requires approval action</p>
                            <div className="card-bg-icon text-warning"><FaReceipt /></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden premium-card premium-card-green-solid h-100">
                        <div className="card-body p-4 position-relative">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div className="icon-box-solid text-success" style={{ background: '#dcfce7' }}>
                                    <FaPlaneDeparture size={20} />
                                </div>
                                <div className="tall-pill-icon text-secondary cursor-pointer hover-shadow transition-all">
                                    <MdOutlineHistory size={16} />
                                </div>
                            </div>
                            <h6 className="small fw-bold text-uppercase mb-2 ls-1" style={{ color: '#064e3b' }}>Approved Trips</h6>
                            <h2 className="fw-bolder mb-0" style={{ fontSize: '2.5rem', letterSpacing: '-0.05rem', color: '#1e293b' }}>{stats.approvedTrips || "15"}</h2>
                            <p className="smaller mt-2 mb-0 fw-medium" style={{ color: '#047857' }}>Next: NYC Client Meeting (Tomorrow)</p>
                            <div className="card-bg-icon text-success"><FaPlaneDeparture /></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart & Summary */}
            <div className="row g-4 mb-4">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h6 className="fw-bold text-dark mb-1">Expense Trends (Last 6 Months)</h6>
                                    {(() => {
                                        const last = trends[trends.length - 1];
                                        const prev = trends[trends.length - 2];
                                        const diff = last - prev;
                                        const percent = prev !== 0 ? ((diff / prev) * 100).toFixed(1) : "0.0";
                                        const isUp = diff > 0;
                                        return (
                                            <div className="d-flex align-items-center gap-2">
                                                <span className={`smaller fw-bold ${isUp ? 'text-danger' : 'text-success'}`}>
                                                    {isUp ? '+' : ''}${Math.abs(diff)}
                                                    <span className="ms-1">({isUp ? '+' : ''}{percent}%)</span>
                                                </span>
                                                <span className="smallest text-muted text-uppercase fw-bold ls-1">vs Last Month</span>
                                            </div>
                                        );
                                    })()}
                                </div>
                                <select className="form-select form-select-sm border-0 bg-light w-auto rounded-3 px-3 fw-bold">
                                    <option>2025 Overview</option>
                                    <option>2024 Overview</option>
                                </select>
                            </div>
                             <div className="px-2" style={{ marginTop: '-10px' }}>
                                <SimpleLineChart data={trends} height="300px" color="#3b82f6" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100 text-white position-relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #06b6d4 100%)',
                            boxShadow: '0 15px 35px rgba(59, 130, 246, 0.3)'
                        }}>
                        <div className="card-body p-4 position-relative z-1">
                            <h6 className="small fw-bold text-uppercase text-white-50 mb-4 ls-1">Budget Utilization</h6>
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="small">Marketing Dept</span>
                                    <span className="small fw-bold">85%</span>
                                </div>
                                <div className="progress bg-white-10" style={{ height: '6px' }}>
                                    <div className="progress-bar bg-white" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="small">Sales Operations</span>
                                    <span className="small fw-bold">42%</span>
                                </div>
                                <div className="progress bg-white-10" style={{ height: '6px' }}>
                                    <div className="progress-bar bg-white" style={{ width: '42%' }}></div>
                                </div>
                            </div>
                            <div className="mt-5 pt-3">
                                <p className="small text-white-50 mb-2">Policy Compliance</p>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="fs-3 fw-bold">98.4%</div>
                                    <span className="badge bg-white text-primary rounded-pill smaller px-2">High</span>
                                </div>
                            </div>
                        </div>
                        <div className="chart-bg-accent"></div>
                    </div>
                </div>
            </div>

            {/* Expense Table */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4" style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.3) !important' }}>
                <div className="card-header bg-white border-bottom-0 p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="fw-bold text-dark m-0">Recent Expense Claims</h6>
                        <div className="d-flex gap-2">
                            <div className="input-group input-group-sm bg-light rounded-pill px-2 border-0">
                                <span className="input-group-text border-0 bg-transparent text-secondary"><MdFilterList /></span>
                                <input
                                    type="text"
                                    className="form-control border-0 bg-transparent ps-0"
                                    placeholder="Filter claims..."
                                    value={searchTerm}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setSearchTerm(val);
                                        setGlobalSearchTerm(val);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light-subtle">
                            <tr>
                                <th className="border-0 ps-4 py-3 small fw-bold text-secondary text-uppercase ls-1">Employee</th>
                                <th className="border-0 py-3 small fw-bold text-secondary text-uppercase ls-1">Category / Project</th>
                                <th className="border-0 py-3 small fw-bold text-secondary text-uppercase ls-1">Date</th>
                                <th className="border-0 py-3 small fw-bold text-secondary text-uppercase ls-1">Amount</th>
                                <th className="border-0 py-3 small fw-bold text-secondary text-uppercase ls-1">Status</th>
                                <th className="border-0 pe-4 py-3 small fw-bold text-secondary text-uppercase ls-1 text-end">Action</th>
                            </tr>
                        </thead>
                         <tbody>
                            {claims.filter(item =>
                                (item.employee || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                                (item.project || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                                (item.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                                (item.id || '').toLowerCase().includes(searchTerm.toLowerCase())
                            ).map((item, idx) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td className="ps-4 py-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className={`avatar-circle bg-secondary-subtle text-secondary small fw-bold`}>{item.avatar || (item.employee ? item.employee[0] : 'U')}</div>
                                            <div>
                                                <div className="fw-bold text-dark">{item.employee}</div>
                                                <div className="text-muted smaller">{item.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <div className="fw-medium text-dark">{item.category}</div>
                                        <div className="text-muted smaller">{item.project}</div>
                                    </td>
                                    <td className="py-3">
                                        <div className="text-secondary fw-medium small mb-0">{item.date}</div>
                                        <div className="smaller text-muted opacity-75">{item.time || '10:45 AM'}</div>
                                    </td>
                                    <td className="py-3">
                                        <div className="fw-bold text-dark">{item.amount}</div>
                                        <div className="smaller text-success">Fully Reimbursable</div>
                                    </td>
                                    <td className="py-3">
                                        <span className={`badge-modern ${item.status === 'Approved' ? 'approved' :
                                            item.status === 'Rejected' ? 'rejected' : 'pending'
                                            }`}>
                                            <div className="dot"></div>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="pe-4 py-3 text-end">
                                        <div className="d-flex gap-2 justify-content-end align-items-center">
                                            {item.status === 'Pending' && (
                                                <div className="dropdown">
                                                    <button className="btn btn-sm btn-dark rounded-pill px-3 fw-bold dropdown-toggle no-caret" data-bs-toggle="dropdown">Process</button>
                                                    <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
                                                        <li><button className="dropdown-item py-2 small fw-bold text-success" onClick={() => handleAction(item.id, 'Approved')}>✅ Approve</button></li>
                                                        <li><button className="dropdown-item py-2 small fw-bold text-danger" onClick={() => handleAction(item.id, 'Rejected')}>❌ Reject</button></li>
                                                    </ul>
                                                </div>
                                            )}
                                            <button className="btn btn-sm btn-light border rounded-pill px-3 hover-shadow transition-all text-primary fw-bold">View</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {claims.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted small">No expense claims found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* NEW CLAIM MODAL */}
            {showNewClaim && (
                <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="modal-header border-0 p-4 pb-0 d-flex justify-content-between align-items-center">
                                <h5 className="fw-bold m-0">New Expense Claim</h5>
                                <button className="btn-close" onClick={() => setShowNewClaim(false)}></button>
                            </div>
                            <form onSubmit={handleNewClaim}>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-muted text-uppercase">Project / Purpose</label>
                                        <input 
                                            type="text" 
                                            className="form-control rounded-3 p-3 bg-light border-0 shadow-none" 
                                            placeholder="e.g. Client Meeting NYC" 
                                            required 
                                            value={claimFormData.project}
                                            onChange={e => setClaimFormData({...claimFormData, project: e.target.value})}
                                        />
                                    </div>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted text-uppercase">Category</label>
                                            <select 
                                                className="form-select rounded-3 p-3 bg-light border-0 shadow-none"
                                                value={claimFormData.category}
                                                onChange={e => setClaimFormData({...claimFormData, category: e.target.value})}
                                            >
                                                <option>Flight</option>
                                                <option>Hotel</option>
                                                <option>Meals</option>
                                                <option>Taxi</option>
                                                <option>Training</option>
                                                <option>Others</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted text-uppercase">Amount</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-0 ps-3 text-muted">$</span>
                                                <input 
                                                    type="number" 
                                                    className="form-control rounded-end-3 p-3 bg-light border-0 shadow-none" 
                                                    placeholder="0.00" 
                                                    required 
                                                    value={claimFormData.amount}
                                                    onChange={e => setClaimFormData({...claimFormData, amount: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label className="form-label small fw-bold text-muted text-uppercase">Date of Expense</label>
                                        <input 
                                            type="date" 
                                            className="form-control rounded-3 p-3 bg-light border-0 shadow-none" 
                                            required 
                                            value={claimFormData.date}
                                            onChange={e => setClaimFormData({...claimFormData, date: e.target.value})}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <label className="form-label small fw-bold text-muted text-uppercase">Description</label>
                                        <textarea 
                                            className="form-control rounded-3 p-3 bg-light border-0 shadow-none" 
                                            rows="3" 
                                            placeholder="Provide detail about this expense..."
                                            value={claimFormData.description}
                                            onChange={e => setClaimFormData({...claimFormData, description: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer border-0 p-4 pt-0">
                                    <button type="button" className="btn btn-light rounded-pill px-4 fw-bold" onClick={() => setShowNewClaim(false)}>Discard</button>
                                    <button type="submit" className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm">Submit Claim</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* STYLES ... same as before ... */}
            <style>{`
                .ls-1 { letter-spacing: 0.05rem; }
                .ls-tight { letter-spacing: -0.05rem; }
                .smaller { font-size: 0.75rem; }
                .smallest { font-size: 0.65rem; }
                
                .premium-card { 
                    transition: transform 0.3s ease, box-shadow 0.3s ease; 
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.4) !important;
                    position: relative;
                }
                .premium-card::after {
                    content: "";
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                        45deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.05) 45%,
                        rgba(255, 255, 255, 0.1) 50%,
                        rgba(255, 255, 255, 0.05) 55%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    transform: rotate(-45deg);
                    pointer-events: none;
                    transition: all 0.6s ease;
                }
                .premium-card:hover::after {
                    transform: rotate(-45deg) translate(20%, 20%);
                }
                .premium-card-blue-solid { background-color: #dbeafe !important; }
                .premium-card-amber-solid { background-color: #ffedd5 !important; }
                .premium-card-green-solid { background-color: #d1fae5 !important; }
                
                .icon-box-solid {
                    background: white; border-radius: 14px; padding: 14px;
                    display: inline-flex; align-items: center; justify-content: center;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.02);
                }
                
                .tall-pill-icon {
                    background: white; border-radius: 50px;
                    width: 32px; height: 60px;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
                }
                
                .premium-card:hover { transform: translateY(-5px); box-shadow: 0 12px 24px rgba(0,0,0,0.06) !important; }
                
                .card-bg-icon {
                    position: absolute; right: -10px; bottom: -10px; font-size: 6rem;
                    opacity: 0.03; transform: rotate(-15deg); pointer-events: none;
                }
                
                .avatar-circle {
                    width: 38px; height: 38px; border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                }
                
                .badge-modern {
                    display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px;
                    border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
                }
                .badge-modern.approved { background: #dcfce7; color: #166534; }
                .badge-modern.pending { background: #fef9c3; color: #854d0e; }
                .badge-modern.rejected { background: #fee2e2; color: #991b1b; }
                .badge-modern .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
                
                .bg-white-10 { background: rgba(255,255,255,0.15); }
                .chart-bg-accent {
                    position: absolute; right: -50px; top: -50px; width: 200px; height: 200px;
                    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
                    pointer-events: none;
                }
                .bg-light-subtle { background-color: #fbfcfd; }
                .hover-shadow:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
                .cursor-pointer { cursor: pointer; }
                .transition-all { transition: all 0.2s ease; }
            `}</style>
        </div>
    );
};

const TravelExpenses = () => {
    return (
        <DashboardLayout title="Travel & Expenses" activePath="/travel-expenses">
            <TravelExpensesContent />
        </DashboardLayout>
    );
};

export default TravelExpenses;

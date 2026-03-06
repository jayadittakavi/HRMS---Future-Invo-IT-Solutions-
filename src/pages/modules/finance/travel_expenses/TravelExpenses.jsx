import React, { useState, useEffect } from 'react';
import { useSearch } from '../../../../context/SearchContext';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { SimpleLineChart } from '../../../../components/charts/CustomCharts';
import { FaPlaneDeparture, FaReceipt, FaWallet, FaArrowTrendUp, FaEllipsisVertical, FaPlus } from 'react-icons/fa6';
import { MdOutlineHistory, MdFilterList, MdFileDownload } from 'react-icons/md';

export const TravelExpensesContent = () => {
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);

    useEffect(() => {
        setSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);
    // Mock Data
    const expenses = [
        { id: 'EXP-001', employee: 'John Doe', avatar: 'JD', project: 'Client Visit - NYC', amount: '$1,200', date: 'Oct 10, 2025', status: 'Approved', category: 'Flight' },
        { id: 'EXP-002', employee: 'Sarah Lee', avatar: 'SL', project: 'Tech Conference', amount: '$850', date: 'Oct 12, 2025', status: 'Pending', category: 'Hotel' },
        { id: 'EXP-003', employee: 'Mike Chen', avatar: 'MC', project: 'Team Offsite', amount: '$300', date: 'Oct 15, 2025', status: 'Rejected', category: 'Meals' },
        { id: 'EXP-004', employee: 'Meera Joshi', avatar: 'MJ', project: 'Branch Audit', amount: '$550', date: 'Oct 18, 2025', status: 'Approved', category: 'Taxi' },
    ];

    const expenseTrend = [650, 900, 1200, 850, 1500, 1100]; // Last 6 months

    return (
        <div className="container-fluid p-0 animate__animated animate__fadeIn">
            {/* Header / Actions */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold text-dark mb-1">Travel & Expenses</h4>
                    <p className="text-secondary small mb-0">Track employee travel requests and expense reimbursements.</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                        <MdFileDownload /> Export
                    </button>
                    <button className="btn btn-primary btn-sm rounded-pill px-4 d-flex align-items-center gap-2 shadow-sm">
                        <FaPlus size={12} /> New Claim
                    </button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden premium-card premium-card-blue-trans h-100">
                        <div className="card-body p-4 position-relative">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div className="icon-box bg-primary-subtle text-primary rounded-4 p-3">
                                    <FaWallet size={24} />
                                </div>
                                <span className="badge bg-success-subtle text-success rounded-pill px-2 py-1 small d-flex align-items-center gap-1">
                                    <FaArrowTrendUp size={10} /> +12%
                                </span>
                            </div>
                            <h6 className="text-secondary small fw-bold text-uppercase mb-1 ls-1">Total Expenses (YTD)</h6>
                            <h2 className="fw-bold text-dark mb-0 ls-tight">$45,200</h2>
                            <p className="text-muted smaller mt-2 mb-0">Updated 2h ago</p>
                            <div className="card-bg-icon"><FaWallet /></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden premium-card premium-card-amber-trans h-100">
                        <div className="card-body p-4 position-relative">
                            <div className="d-flex justify-content-between mb-3">
                                <div className="icon-box bg-warning-subtle text-warning rounded-4 p-3">
                                    <FaReceipt size={24} />
                                </div>
                                <div className="bg-light rounded-circle p-2 text-secondary cursor-pointer hover-bg-primary hover-text-white transition-all">
                                    <FaEllipsisVertical size={12} />
                                </div>
                            </div>
                            <h6 className="text-secondary small fw-bold text-uppercase mb-1 ls-1">Pending Claims</h6>
                            <h2 className="fw-bold text-dark mb-0 ls-tight">08</h2>
                            <p className="text-warning smaller mt-2 mb-0 fw-medium">Requires approval action</p>
                            <div className="card-bg-icon"><FaReceipt /></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden premium-card premium-card-green-trans h-100">
                        <div className="card-body p-4 position-relative">
                            <div className="d-flex justify-content-between mb-3">
                                <div className="icon-box bg-success-subtle text-success rounded-4 p-3">
                                    <FaPlaneDeparture size={24} />
                                </div>
                                <div className="bg-light rounded-circle p-2 text-secondary cursor-pointer transition-all">
                                    <MdOutlineHistory size={16} />
                                </div>
                            </div>
                            <h6 className="text-secondary small fw-bold text-uppercase mb-1 ls-1">Approved Trips</h6>
                            <h2 className="fw-bold text-dark mb-0 ls-tight">15</h2>
                            <p className="text-muted smaller mt-2 mb-0">Next: NYC Client Meeting (Tomorrow)</p>
                            <div className="card-bg-icon"><FaPlaneDeparture /></div>
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
                                        const last = expenseTrend[expenseTrend.length - 1];
                                        const prev = expenseTrend[expenseTrend.length - 2];
                                        const diff = last - prev;
                                        const percent = ((diff / prev) * 100).toFixed(1);
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
                                <SimpleLineChart data={expenseTrend} height="300px" color="#3b82f6" />
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
                            {expenses.filter(item =>
                                item.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.id.toLowerCase().includes(searchTerm.toLowerCase())
                            ).map((item, idx) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td className="ps-4 py-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className={`avatar-circle bg-secondary-subtle text-secondary small fw-bold`}>{item.avatar}</div>
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
                                        <div className="smaller text-muted opacity-75">10:45 AM</div>
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
                                        <button className="btn btn-sm btn-light border rounded-pill px-3 hover-shadow transition-all text-primary fw-bold">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

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
                .premium-card-blue-trans { 
                    background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.15) 100%) !important;
                }
                .premium-card-amber-trans { 
                    background: linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(180, 83, 9, 0.15) 100%) !important;
                }
                .premium-card-green-trans { 
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.15) 100%) !important;
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

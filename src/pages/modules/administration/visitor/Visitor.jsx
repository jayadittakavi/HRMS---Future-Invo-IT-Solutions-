import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useSearch } from '../../../../context/SearchContext';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { visitorService } from '../../../../services/visitorService';
import { API_BASE } from '../../../../config';
import {
    MdPersonAdd, MdAssignment, MdHistory, MdBarChart,
    MdCheckCircle, MdSearch, MdFilterList, MdTimer
} from 'react-icons/md';
import VisitorRequest from './tabs/VisitorRequest';
import VisitorLog from './tabs/VisitorLog';
import VisitorReports from './tabs/VisitorReports';

export const VisitorContent = () => {
    const { user } = useAuth();
    const role = user?.role?.toLowerCase() || 'employee';

    const [activeTab, setActiveTab] = useState('request');
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);

    useEffect(() => {
        setSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);
    const [showModal, setShowModal] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({
        status: 'All',
        date: '',
        host: ''
    });

    const [stats, setStats] = useState({ total_expected: 0, inside_premise: 0, completed: 0 });
    const [requestForm, setRequestForm] = useState({
        visitor_name: '',
        organization: '',
        phone_number: '',
        visit_date: new Date().toISOString().split('T')[0],
        preferred_time: '14:00',
        meeting_with_employee_id: '',
        purpose: ''
    });
    const [staffList, setStaffList] = useState([]);

    const fetchData = async () => {
        try {
            const params = {
                tab: activeTab === 'reports' ? 'log' : activeTab,
                search: searchTerm,
                status: filters.status !== 'All' ? filters.status : ''
            };
            const [vData, sData] = await Promise.all([
                visitorService.getVisitorList(params, role),
                visitorService.getStats(role)
            ]);
            if (vData) setVisitors(vData);
            if (sData) setStats(sData);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    const fetchStaff = async () => {
        try {
            const data = await visitorService.getStaffList(role);
            setStaffList(data || []);
        } catch (error) {
            console.error("Staff Fetch Error:", error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchStaff();
    }, [activeTab]); // Refetch when tab changes

    const [visitors, setVisitors] = useState([]);

    // Unified filtering logic based on Tab, Search, and Filters
    const filteredVisitors = visitors.filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.purpose.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        // Apply Advanced Filters
        if (filters.status !== 'All' && v.status !== filters.status) return false;
        if (filters.date && v.date !== filters.date) return false;
        if (filters.host && !v.host.toLowerCase().includes(filters.host.toLowerCase())) return false;

        // Tab-specific status filtering (acts as an additional constraint)
        if (activeTab === 'log') return ['Checked-In', 'Checked-Out'].includes(v.status);
        if (activeTab === 'request') return true;
        if (activeTab === 'reports') return true;

        return true;
    });

    const resetFilters = () => {
        setFilters({ status: 'All', date: '', host: '' });
        setSearchTerm('');
    };

    const getStatusBadge = (status) => {
        const styles = {
            'Pending': 'bg-warning-subtle text-warning border-warning',
            'Approved': 'bg-info-subtle text-info border-info',
            'Rejected': 'bg-danger-subtle text-danger border-danger',
            'Checked-In': 'bg-success-subtle text-success border-success',
            'Checked-Out': 'bg-secondary-subtle text-secondary border-secondary'
        };
        return <span className={`badge rounded-pill border px-3 py-1 ${styles[status] || 'bg-light text-dark'}`}>{status}</span>;
    };

    const handleSubmitRequest = async (e) => {
        if (e) e.preventDefault();
        try {
            const res = await visitorService.submitRequest(requestForm, role);
            if (res.success) {
                alert("Visitor request submitted successfully!");
                setShowModal(false);
                fetchData();
                setRequestForm({
                    visitor_name: '',
                    organization: '',
                    phone_number: '',
                    visit_date: new Date().toISOString().split('T')[0],
                    preferred_time: '14:00',
                    meeting_with_employee_id: '',
                    purpose: ''
                });
            }
        } catch (error) {
            alert("Submission failed: " + error.message);
        }
    };

    const handleAction = async (id, action) => {
        try {
            const apiAction = action === 'Approved' ? 'APPROVE' : 
                             action === 'Rejected' ? 'REJECT' : 
                             action === 'Checked-In' ? 'CHECK_IN' : 'CHECK_OUT';
            const res = await visitorService.takeAction(id, apiAction, role);
            if (res.success) {
                alert(`Action ${action} successful!`);
                fetchData();
            }
        } catch (error) {
            alert("Action failed: " + error.message);
        }
    };

    const handlePrint = async (id) => {
        try {
            const data = await visitorService.getPrintData(id, role);
            if (data) {
                alert("Pass data fetched for printing: " + (data.visitor_name || data.name || "Visitor"));
                // Trigger browser print or custom print logic
            }
        } catch (error) {
            alert("Print fetch failed: " + error.message);
        }
    };

    return (
        <div className="container-fluid p-0 animate__animated animate__fadeIn">
            {/* Header Area */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Visitor Management</h4>
                    <p className="text-secondary small mb-0">Track office guests, approvals, and logs.</p>
                </div>
                <button className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm" style={{ borderRadius: '12px' }} onClick={() => setShowModal(true)}>
                    <MdPersonAdd size={20} /> New Request
                </button>
            </div>

            {/* Navigation Tabs - Redesigned to match image */}
            <div className="mb-4">
                <div className="bg-white p-2 rounded-5 shadow-sm d-inline-flex align-items-center gap-2 border">
                    <button 
                        className={`btn d-flex align-items-center gap-2 px-4 py-2 rounded-4 transition-all ${activeTab === 'request' ? 'btn-primary shadow-sm' : 'btn-link text-secondary text-decoration-none'}`} 
                        onClick={() => setActiveTab('request')}
                    >
                        <MdAssignment size={18} /> <span className="fw-bold small">Visitor Request</span>
                    </button>

                    <button 
                        className={`btn d-flex align-items-center gap-2 px-4 py-2 rounded-4 transition-all ${activeTab === 'log' ? 'active-tab-secondary' : 'btn-link text-secondary text-decoration-none'}`} 
                        onClick={() => setActiveTab('log')}
                        style={{ background: activeTab === 'log' ? '#f1f5f9' : 'transparent', color: activeTab === 'log' ? '#334155' : '' }}
                    >
                        <MdHistory size={18} className={activeTab === 'log' ? 'text-primary' : ''} /> <span className="fw-bold small">Visitor Log</span>
                    </button>
                    <button 
                        className={`btn d-flex align-items-center gap-2 px-4 py-2 rounded-4 transition-all ${activeTab === 'reports' ? 'active-tab-secondary' : 'btn-link text-secondary text-decoration-none'}`} 
                        onClick={() => setActiveTab('reports')}
                        style={{ background: activeTab === 'reports' ? '#f1f5f9' : 'transparent', color: activeTab === 'reports' ? '#334155' : '' }}
                    >
                        <MdBarChart size={18} className={activeTab === 'reports' ? 'text-primary' : ''} /> <span className="fw-bold small">Reports</span>
                    </button>
                </div>
            </div>

            {/* Search & Statistics */}
            <div className="row g-4 mb-4">
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                        <div className="p-3 bg-white d-flex align-items-center">
                            <MdSearch size={22} className="text-secondary ms-2" />
                            <input
                                type="text"
                                className="form-control border-0 shadow-none bg-transparent ps-3"
                                placeholder="Search visitor by name or purpose..."
                                value={searchTerm}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSearchTerm(val);
                                    setGlobalSearchTerm(val);
                                }}
                            />
                            <button
                                className={`btn ${showFilter ? 'btn-primary' : 'btn-light'} rounded-pill px-3 border ms-2 d-flex align-items-center gap-1`}
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                <MdFilterList /> Filter {(filters.status !== 'All' || filters.date || filters.host) && <span className="badge bg-white text-primary ms-1" style={{ fontSize: '0.6rem' }}>•</span>}
                            </button>
                        </div>

                        {/* Dropdown Filter Bar */}
                        {showFilter && (
                            <div className="px-3 pb-3 bg-white border-bottom animate__animated animate__fadeInDown">
                                <div className="row g-2 align-items-end">
                                    <div className="col-md-3">
                                        <label className="x-small fw-bold text-secondary mb-1">Status</label>
                                        <select
                                            className="form-select form-select-sm border-0 bg-light rounded-3"
                                            value={filters.status}
                                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                        >
                                            <option value="All">All Status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                            <option value="Checked-In">Checked-In</option>
                                            <option value="Checked-Out">Checked-Out</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="x-small fw-bold text-secondary mb-1">Visit Date</label>
                                        <input
                                            type="date"
                                            className="form-control form-control-sm border-0 bg-light rounded-3"
                                            value={filters.date}
                                            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="x-small fw-bold text-secondary mb-1">Host Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm border-0 bg-light rounded-3"
                                            placeholder="Enter host name..."
                                            value={filters.host}
                                            onChange={(e) => setFilters({ ...filters, host: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 d-flex gap-1">
                                        <button className="btn btn-sm btn-outline-secondary w-100 rounded-3 border-0" onClick={resetFilters}>Reset</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Tab Content Rendering */}
                        <div className="bg-white">
                            {activeTab === 'request' && (
                                <VisitorRequest 
                                    visitors={filteredVisitors} 
                                    onAction={handleAction} 
                                    onPrint={handlePrint} 
                                    getStatusBadge={getStatusBadge} 
                                />
                            )}

                            {activeTab === 'log' && (
                                <VisitorLog 
                                    visitors={filteredVisitors} 
                                    onPrint={handlePrint} 
                                    getStatusBadge={getStatusBadge} 
                                />
                            )}
                            {activeTab === 'reports' && (
                                <VisitorReports 
                                    visitors={visitors} 
                                    stats={stats} 
                                    API_BASE={API_BASE} 
                                />
                            )}
                        </div>
                    </div>
                </div>

            {/* Side Stats */}
                <div className="col-md-4">
                    <div className="row g-4">
                        <div className="col-12">
                            <div 
                                className="card border-0 shadow-sm rounded-4 p-4" 
                                style={{ 
                                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', 
                                    color: '#fff' 
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="fw-bold mb-0">Daily Summary</h6>
                                    <MdTimer size={24} className="opacity-50" />
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    <div className="d-flex justify-content-between">
                                        <span className="opacity-75 small">Total Expected</span>
                                        <span className="fw-bold h5 mb-0">{stats.total_expected}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="opacity-75 small">Inside Premise</span>
                                        <span className="fw-bold h5 mb-0">{stats.inside_premise}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="opacity-75 small">Completed</span>
                                        <span className="fw-bold h5 mb-0">{stats.completed}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                                <h6 className="fw-bold text-dark mb-4">Quick Alerts</h6>
                                <div className="d-flex flex-column gap-3">
                                    {(stats.alerts || []).length > 0 ? (
                                        stats.alerts.map((alert, idx) => (
                                            <div key={idx} className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 animate__animated animate__fadeIn">
                                                <div className={`p-2 rounded-circle ${alert.type === 'warning' ? 'bg-warning' : 'bg-info'}`}></div>
                                                <div className="small">{alert.message}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4">
                                            <p className="text-muted small mb-0 font-italic">No active alerts at this time.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Visitor Request Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1050, backdropFilter: 'blur(5px)'
                }}>
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden animate__animated animate__zoomIn" style={{ width: '600px' }}>
                        <div className="p-4 bg-primary text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">Visitor Entry Request</h5>
                            <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="p-4 bg-light">
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label className="form-label small fw-bold">Visitor Name</label>
                                    <input type="text" className="form-control border-0 shadow-sm" placeholder="Enter guest name" 
                                        value={requestForm.visitor_name} onChange={e => setRequestForm({...requestForm, visitor_name: e.target.value})} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">Organization / Company</label>
                                    <input type="text" className="form-control border-0 shadow-sm" placeholder="Self or Company" 
                                        value={requestForm.organization} onChange={e => setRequestForm({...requestForm, organization: e.target.value})} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">Phone No.</label>
                                    <input type="text" className="form-control border-0 shadow-sm" placeholder="+91" 
                                        value={requestForm.phone_number} onChange={e => setRequestForm({...requestForm, phone_number: e.target.value})} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">Date of Visit</label>
                                    <input type="date" className="form-control border-0 shadow-sm" 
                                        value={requestForm.visit_date} onChange={e => setRequestForm({...requestForm, visit_date: e.target.value})} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold">Preferred Time</label>
                                    <input type="time" className="form-control border-0 shadow-sm" 
                                        value={requestForm.preferred_time} onChange={e => setRequestForm({...requestForm, preferred_time: e.target.value})} />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label small fw-bold">Meeting With (Employee)</label>
                                    <select className="form-select border-0 shadow-sm" 
                                        value={requestForm.meeting_with_employee_id} onChange={e => setRequestForm({...requestForm, meeting_with_employee_id: e.target.value})}>
                                        <option value="">Select staff member...</option>
                                        {staffList.map(s => (
                                            <option key={s.id} value={s.id}>{s.name} - {s.designation}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label small fw-bold">Purpose of Visit</label>
                                    <textarea className="form-control border-0 shadow-sm" rows="3" placeholder="Meeting, Delivery, Technical Support..."
                                        value={requestForm.purpose} onChange={e => setRequestForm({...requestForm, purpose: e.target.value})}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-white d-flex gap-2">
                            <button className="btn btn-light border w-100 py-2 rounded-3" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary w-100 py-2 rounded-3" onClick={handleSubmitRequest}>Submit Request</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .border-bottom-light { border-bottom: 1px solid #f1f5f9; }
                .nav-pills .nav-link { font-weight: 600; font-size: 0.9rem; transition: all 0.2s; }
                .nav-pills .nav-link.active { background-color: var(--primary-color) !important; color: #fff !important; }
                .bg-warning-subtle { background-color: #fff9db; color: #f08c00; }
                .bg-info-subtle { background-color: #e3fafc; color: #0c8599; }
                .bg-success-subtle { background-color: #ebfbee; color: #2b8a3e; }
                .bg-danger-subtle { background-color: #fff5f5; color: #c92a2a; }
                .bg-secondary-subtle { background-color: #f1f3f5; color: #495057; }
                .x-small { font-size: 0.7rem; }
            `}</style>
        </div>
    );
};

const Visitor = () => {
    return (
        <DashboardLayout title="Visitor Management" activePath="/visitors">
            <VisitorContent />
        </DashboardLayout>
    );
};

export default Visitor;

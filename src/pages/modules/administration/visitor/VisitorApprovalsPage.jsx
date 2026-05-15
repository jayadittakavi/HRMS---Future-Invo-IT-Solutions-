import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useSearch } from '../../../../context/SearchContext';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { visitorService } from '../../../../services/visitorService';
import { MdCheckCircle, MdSearch, MdFilterList, MdTimer } from 'react-icons/md';
import VisitorApprovals from './tabs/VisitorApprovals';

const VisitorApprovalsPage = () => {
    const { user } = useAuth();
    const role = user?.role?.toLowerCase() || 'employee';
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({
        status: 'Pending',
        date: '',
        host: ''
    });

    const [visitors, setVisitors] = useState([]);
    const [stats, setStats] = useState({ total_expected: 0, inside_premise: 0, completed: 0 });

    useEffect(() => {
        setSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);

    const fetchData = async () => {
        try {
            const params = {
                tab: 'approvals',
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

    useEffect(() => {
        fetchData();
    }, [searchTerm, filters.status, filters.date, filters.host]);

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

    const resetFilters = () => {
        setFilters({ status: 'Pending', date: '', host: '' });
        setSearchTerm('');
    };

    const filteredVisitors = visitors.filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.purpose.toLowerCase().includes(searchTerm.toLowerCase());
        if (!matchesSearch) return false;
        if (filters.status !== 'All' && v.status !== filters.status) return false;
        if (filters.date && v.date !== filters.date) return false;
        if (filters.host && !v.host.toLowerCase().includes(filters.host.toLowerCase())) return false;
        return v.status === 'Pending';
    });

    return (
        <DashboardLayout title="Visitor Approvals" activePath="/visitor-approvals">
            <div className="container-fluid p-0 animate__animated animate__fadeIn">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Visitor Approvals</h4>
                        <p className="text-secondary small mb-0">Review and approve incoming visitor requests.</p>
                    </div>
                </div>

                <div className="row g-4 mb-4">
                    <div className="col-md-8">
                        <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                            <div className="p-3 bg-white d-flex align-items-center">
                                <MdSearch size={22} className="text-secondary ms-2" />
                                <input
                                    type="text"
                                    className="form-control border-0 shadow-none bg-transparent ps-3"
                                    placeholder="Search by visitor name..."
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
                                    <MdFilterList /> Filter
                                </button>
                            </div>

                            {showFilter && (
                                <div className="px-3 pb-3 bg-white border-bottom animate__animated animate__fadeInDown">
                                    <div className="row g-2 align-items-end">
                                        <div className="col-md-4">
                                            <label className="x-small fw-bold text-secondary mb-1">Visit Date</label>
                                            <input
                                                type="date"
                                                className="form-control form-control-sm border-0 bg-light rounded-3"
                                                value={filters.date}
                                                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <label className="x-small fw-bold text-secondary mb-1">Host Name</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm border-0 bg-light rounded-3"
                                                placeholder="Enter host name..."
                                                value={filters.host}
                                                onChange={(e) => setFilters({ ...filters, host: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <button className="btn btn-sm btn-outline-secondary w-100 rounded-3 border-0" onClick={resetFilters}>Reset</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-white">
                                <VisitorApprovals 
                                    visitors={filteredVisitors} 
                                    onAction={handleAction} 
                                    getStatusBadge={getStatusBadge} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 p-4" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: '#fff' }}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="fw-bold mb-0">Approval Summary</h6>
                                <MdCheckCircle size={24} className="opacity-50" />
                            </div>
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex justify-content-between">
                                    <span className="opacity-75 small">Pending Requests</span>
                                    <span className="fw-bold h5 mb-0">{filteredVisitors.length}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className="opacity-75 small">Total Expected Today</span>
                                    <span className="fw-bold h5 mb-0">{stats.total_expected}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .border-bottom-light { border-bottom: 1px solid #f1f5f9; }
                .bg-warning-subtle { background-color: #fff9db; color: #f08c00; }
                .bg-info-subtle { background-color: #e3fafc; color: #0c8599; }
                .bg-success-subtle { background-color: #ebfbee; color: #2b8a3e; }
                .bg-danger-subtle { background-color: #fff5f5; color: #c92a2a; }
                .bg-secondary-subtle { background-color: #f1f3f5; color: #495057; }
                .x-small { font-size: 0.7rem; }
            `}</style>
        </DashboardLayout>
    );
};

export default VisitorApprovalsPage;

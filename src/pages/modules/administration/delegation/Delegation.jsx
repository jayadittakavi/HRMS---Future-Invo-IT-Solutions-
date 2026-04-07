import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useSearch } from '../../../../context/SearchContext';
import { delegationService } from '../../../../services/delegationService';
import {
    MdSecurity, MdAdd, MdHistory, MdCancel, MdCheckCircle,
    MdTimer, MdPerson, MdLayers, MdCalendarToday, MdFilterList
} from 'react-icons/md';

export const DelegationContent = () => {
    const { user } = useAuth();
    const { globalSearchTerm, setGlobalSearchTerm } = useSearch();
    const [searchTerm, setSearchTerm] = useState(globalSearchTerm);

    useEffect(() => {
        setSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);

    const [loading, setLoading] = useState(false);
    const [delegations, setDelegations] = useState([]);
    const [stats, setStats] = useState({
        active: 0,
        expired: 0,
        total: 0
    });

    useEffect(() => {
        setSearchTerm(globalSearchTerm);
    }, [globalSearchTerm]);

    useEffect(() => {
        fetchData();
    }, [searchTerm]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [list, sData] = await Promise.all([
                delegationService.getDelegationHistory(searchTerm),
                delegationService.getStats()
            ]);
            setDelegations(Array.isArray(list) ? list : []);
            if (sData) setStats({
                active: sData.active_count || 0,
                expired: (sData.total_count || 0) - (sData.active_count || 0),
                total: sData.total_count || 0
            });
        } catch (error) {
            console.error("Delegation Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        delegated_to: '',
        module: 'Leave Approval',
        start_date: '',
        end_date: ''
    });

    const userRole = user?.role?.toLowerCase() || 'employee';

    // Role Hierarchy rules
    const canCreateDelegation = ['superadmin', 'admin', 'manager', 'hr'].includes(userRole);

    // Filtering delegations based on role visibility and search
    const visibleDelegations = delegations; // API already filters if needed, or we filter here if returned all

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await delegationService.createDelegation(formData);
            if (res.success) {
                alert("Delegation created successfully!");
                setShowModal(false);
                fetchData();
            }
        } catch (error) {
            alert("Creation failed: " + error.message);
        }
    };

    const cancelDelegation = async (id) => {
        try {
            const res = await delegationService.cancelDelegation(id);
            if (res.success) {
                alert("Delegation cancelled!");
                fetchData();
            }
        } catch (error) {
            alert("Cancel failed: " + error.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return '#10b981';
            case 'Expired': return '#6b7280';
            case 'Cancelled': return '#ef4444';
            default: return '#6b7280';
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Delegation Management</h4>
                    <p className="text-muted small mb-0">Manage and track temporary authority delegation across modules.</p>
                </div>
                {canCreateDelegation && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-primary d-flex align-items-center gap-2 shadow-sm"
                        style={{ borderRadius: '10px', padding: '10px 20px', fontWeight: 600 }}
                    >
                        <MdAdd size={20} /> Create Delegation
                    </button>
                )}
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Active Delegations', value: stats.active, icon: <MdCheckCircle />, color: '#10b981' },
                    { label: 'Expired', value: stats.expired, icon: <MdHistory />, color: '#6b7280' },
                    { label: 'Total Logs', value: stats.total, icon: <MdLayers />, color: '#6366f1' }
                ].map((stat, i) => (
                    <div key={i} className="col-md-4">
                        <div className="card border-0 shadow-sm p-3" style={{ borderRadius: '15px' }}>
                            <div className="d-flex align-items-center gap-3">
                                <div className="p-3 rounded-circle" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <h6 className="text-muted mb-0 small fw-bold">{stat.label}</h6>
                                    <h3 className="fw-bold mb-0">{stat.value}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* List Table */}
            <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
                <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-white">
                    <h6 className="fw-bold mb-0">Recent Delegations</h6>
                    <div className="d-flex gap-2">
                        <div className="input-group input-group-sm" style={{ width: '220px' }}>
                            <span className="input-group-text bg-light border-0"><MdLayers size={14} /></span>
                            <input
                                type="text"
                                className="form-control border-0 bg-light"
                                placeholder="Search delegation..."
                                value={searchTerm}
                                onChange={e => {
                                    const val = e.target.value;
                                    setSearchTerm(val);
                                    setGlobalSearchTerm(val);
                                }}
                            />
                        </div>
                        <button className="btn btn-sm btn-light border d-flex align-items-center gap-1">
                            <MdFilterList /> Filter
                        </button>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 py-3 small text-muted">DELEGATED BY</th>
                                <th className="py-3 small text-muted">DELEGATED TO</th>
                                <th className="py-3 small text-muted">MODULE</th>
                                <th className="py-3 small text-muted">VALIDITY</th>
                                <th className="py-3 small text-muted">STATUS</th>
                                <th className="pe-4 py-3 small text-muted text-end">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleDelegations.map((d) => (
                                <tr key={d.id}>
                                    <td className="ps-4 py-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: 32, height: 32, color: '#3b82f6' }}>
                                                <MdPerson size={18} />
                                            </div>
                                            <div>
                                                <div className="fw-bold small">{d.delegated_by}</div>
                                                <div className="text-muted" style={{ fontSize: '0.7rem' }}>{d.delegated_by_role.toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <div className="fw-bold small">{d.delegated_to}</div>
                                    </td>
                                    <td className="py-3">
                                        <span className="badge bg-light text-dark border px-2 py-1 fw-medium" style={{ fontSize: '0.75rem' }}>
                                            {d.module}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <div className="small text-muted d-flex align-items-center gap-1">
                                            <MdTimer size={14} /> {d.start_date} <span className="mx-1">→</span> {d.end_date}
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <div className="d-flex align-items-center gap-1 fw-bold" style={{ color: getStatusColor(d.status), fontSize: '0.8rem' }}>
                                            <span className="rounded-circle" style={{ width: 8, height: 8, backgroundColor: getStatusColor(d.status) }}></span>
                                            {d.status}
                                        </div>
                                    </td>
                                    <td className="pe-4 py-3 text-end">
                                        {d.status === 'Active' && (d.delegated_by_role === userRole || userRole === 'superadmin') && (
                                            <button
                                                onClick={() => cancelDelegation(d.id)}
                                                className="btn btn-sm btn-outline-danger px-3"
                                                style={{ borderRadius: '8px', fontSize: '0.75rem' }}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {visibleDelegations.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted">No delegations found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
                }}>
                    <div className="bg-white p-4 shadow-lg" style={{ width: '450px', borderRadius: '20px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">Assign New Delegation</h5>
                            <button className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <form onSubmit={handleCreate}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold">Delegate Authority To</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0"><MdPerson /></span>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-start-0"
                                        placeholder="Enter name or ID..."
                                        required
                                        value={formData.delegated_to}
                                        onChange={(e) => setFormData({ ...formData, delegated_to: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold">Select Module</label>
                                <select
                                    className="form-select bg-light"
                                    value={formData.module}
                                    onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                                >
                                    <option>Leave Approval</option>
                                    <option>Attendance Approval</option>
                                    <option>Task Approval</option>
                                    {['superadmin', 'admin'].includes(userRole) && <option>Payroll Approval</option>}
                                </select>
                            </div>

                            <div className="row g-3 mb-4">
                                <div className="col-6">
                                    <label className="form-label small fw-bold">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control bg-light"
                                        required
                                        value={formData.start_date}
                                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-bold">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control bg-light"
                                        required
                                        value={formData.end_date}
                                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-light w-100 py-2 border"
                                    onClick={() => setShowModal(false)}
                                    style={{ borderRadius: '10px' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2"
                                    style={{ borderRadius: '10px' }}
                                >
                                    Save Delegation
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

import DashboardLayout from '../../../../components/layout/DashboardLayout';

const Delegation = () => {
    return (
        <DashboardLayout title="Delegation Management">
            <DelegationContent />
        </DashboardLayout>
    );
};

export default Delegation;

import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useAutomation } from '../../../../context/AutomationContext';
import {
    MdPlayCircleFilled, MdPauseCircleFilled, MdSettings, MdHistory,
    MdAddCircle, MdNotificationsActive, MdRule, MdTimer, MdBolt
} from 'react-icons/md';

const AutomationCenter = () => {
    const { rules, logs, updateRule, addRule } = useAutomation();
    const [activeTab, setActiveTab] = useState('rules');
    const [showAddModal, setShowAddModal] = useState(false);

    const modules = ['Attendance', 'Leave', 'Payroll', 'Helpdesk', 'Desk', 'Lifecycle'];

    return (
        <DashboardLayout title="Automation Control Center" activePath="/automation-center">
            <div className="container-fluid p-0 animate__animated animate__fadeIn">
                {/* Header Section */}
                <div className="row mb-4">
                    <div className="col-md-8">
                        <h4 className="fw-bold text-dark mb-1">Automation Hub</h4>
                        <p className="text-secondary small">Define and manage system-wide event-driven workflows.</p>
                    </div>
                    <div className="col-md-4 text-end">
                        <button className="btn btn-primary rounded-pill px-4 shadow-sm d-inline-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}>
                            <MdAddCircle size={20} /> Create New Rule
                        </button>
                    </div>
                </div>

                {/* Automation Stats */}
                <div className="row g-4 mb-4">
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-primary-subtle p-3 rounded-4 text-primary"><MdRule size={24} /></div>
                                <div>
                                    <h3 className="fw-bold mb-0">{rules.length}</h3>
                                    <p className="text-secondary smaller mb-0">Total Rules</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-success-subtle p-3 rounded-4 text-success"><MdBolt size={24} /></div>
                                <div>
                                    <h3 className="fw-bold mb-0">{rules.filter(r => r.isActive).length}</h3>
                                    <p className="text-secondary smaller mb-0">Active Triggers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-info-subtle p-3 rounded-4 text-info"><MdTimer size={24} /></div>
                                <div>
                                    <h3 className="fw-bold mb-0">12</h3>
                                    <p className="text-secondary smaller mb-0">Scheduled Tasks</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-warning-subtle p-3 rounded-4 text-warning"><MdHistory size={24} /></div>
                                <div>
                                    <h3 className="fw-bold mb-0">{logs.length}</h3>
                                    <p className="text-secondary smaller mb-0">Events Today</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Tabs */}
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                    <div className="card-header bg-white border-bottom-0 p-0">
                        <ul className="nav nav-tabs px-4 pt-3 border-0">
                            <li className="nav-item">
                                <button className={`nav-link border-0 fw-bold pb-3 px-4 ${activeTab === 'rules' ? 'active text-primary border-bottom border-primary border-3' : 'text-secondary'}`} onClick={() => setActiveTab('rules')}>
                                    <MdSettings className="me-2" /> Active Rules
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link border-0 fw-bold pb-3 px-4 ${activeTab === 'logs' ? 'active text-primary border-bottom border-primary border-3' : 'text-secondary'}`} onClick={() => setActiveTab('logs')}>
                                    <MdHistory className="me-2" /> Audit & Logs
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="card-body p-4">
                        {activeTab === 'rules' && (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="bg-light">
                                        <tr className="small text-secondary fw-bold text-uppercase">
                                            <th className="border-0 px-4">Module</th>
                                            <th className="border-0">Trigger Event</th>
                                            <th className="border-0">Condition</th>
                                            <th className="border-0">Action</th>
                                            <th className="border-0 text-center">Status</th>
                                            <th className="border-0 text-end px-4">Toggle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rules.map(rule => (
                                            <tr key={rule.id}>
                                                <td className="px-4 fw-bold text-dark">{rule.module}</td>
                                                <td><span className="badge bg-light text-dark border">{rule.event}</span></td>
                                                <td className="small text-muted">{rule.condition}</td>
                                                <td><span className="badge bg-primary-subtle text-primary">{rule.action}</span></td>
                                                <td className="text-center">
                                                    {rule.isActive ? (
                                                        <span className="text-success d-flex align-items-center justify-content-center gap-1 small fw-bold">
                                                            <div className="rounded-circle bg-success" style={{ width: 8, height: 8 }}></div> Running
                                                        </span>
                                                    ) : (
                                                        <span className="text-secondary d-flex align-items-center justify-content-center gap-1 small fw-bold">
                                                            <div className="rounded-circle bg-secondary" style={{ width: 8, height: 8 }}></div> Paused
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="text-end px-4">
                                                    <button
                                                        className={`btn btn-sm ${rule.isActive ? 'btn-outline-danger' : 'btn-outline-success'} rounded-pill px-3`}
                                                        onClick={() => updateRule(rule.id, { isActive: !rule.isActive })}
                                                    >
                                                        {rule.isActive ? <><MdPauseCircleFilled /> Pause</> : <><MdPlayCircleFilled /> Resume</>}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'logs' && (
                            <div className="table-responsive">
                                <table className="table border-0">
                                    <thead className="bg-light">
                                        <tr className="small text-secondary fw-bold text-uppercase">
                                            <th className="border-0 px-4">Timestamp</th>
                                            <th className="border-0">Module</th>
                                            <th className="border-0">Executed Action</th>
                                            <th className="border-0">Status</th>
                                            <th className="border-0">Audit Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs.map(log => (
                                            <tr key={log.id} className="border-bottom-light">
                                                <td className="px-4 small text-muted">{log.timestamp}</td>
                                                <td className="fw-bold">{log.module}</td>
                                                <td><span className="text-primary fw-medium">{log.action}</span></td>
                                                <td><span className="badge bg-success-subtle text-success">SUCCESS</span></td>
                                                <td className="small text-secondary">{log.details}</td>
                                            </tr>
                                        ))}
                                        {logs.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="text-center py-5 text-muted">No automation events recorded yet.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Rule Modal */}
            {showAddModal && (
                <div className="modal-overlay d-flex align-items-center justify-content-center">
                    <div className="card border-0 shadow-lg rounded-4 p-4 animate__animated animate__zoomIn" style={{ width: '500px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold text-primary mb-0">Create Automation Rule</h5>
                            <button className="btn btn-light rounded-circle p-1" onClick={() => setShowAddModal(false)}><MdTimer /></button>
                        </div>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label small fw-bold text-secondary">Target Module</label>
                                <select className="form-select border-0 bg-light shadow-sm" id="ruleModule">
                                    {modules.map(m => <option key={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-bold text-secondary">Trigger Event</label>
                                <select className="form-select border-0 bg-light shadow-sm" id="ruleEvent">
                                    <option value="onApply">On Leave Apply</option>
                                    <option value="onMark">On Attendance Mark</option>
                                    <option value="onCreate">On Ticket Create</option>
                                    <option value="onPayrollRun">On Payroll Initiation</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label className="form-label small fw-bold text-secondary">Condition Logic</label>
                                <input type="text" className="form-control border-0 bg-light shadow-sm" id="ruleCondition" placeholder="e.g. status == 'Urgent' or duration < 2" />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label small fw-bold text-secondary">Action to Execute</label>
                                <input type="text" className="form-control border-0 bg-light shadow-sm" id="ruleAction" placeholder="e.g. notify_hr, auto_approve" />
                            </div>
                        </div>
                        <div className="d-flex gap-2 mt-4">
                            <button className="btn btn-light w-100 rounded-pill" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="btn btn-primary w-100 rounded-pill shadow-sm" onClick={() => {
                                const newRule = {
                                    module: document.getElementById('ruleModule').value,
                                    event: document.getElementById('ruleEvent').value,
                                    condition: document.getElementById('ruleCondition').value,
                                    action: document.getElementById('ruleAction').value,
                                    target: 'System'
                                };
                                addRule(newRule);
                                setShowAddModal(false);
                            }}>Activate Rule</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; }
                .smaller { font-size: 0.75rem; }
                .nav-tabs .nav-link:hover { background: #f8fafc; }
                .border-bottom-light { border-bottom: 1px solid #f1f5f9; }
            `}</style>
        </DashboardLayout>
    );
};

export default AutomationCenter;

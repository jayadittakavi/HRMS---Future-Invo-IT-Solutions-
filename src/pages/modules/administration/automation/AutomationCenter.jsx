import React, { useMemo, useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { useAutomation } from '../../../../context/AutomationContext';
import {
    MdPlayCircleFilled,
    MdPauseCircleFilled,
    MdSettings,
    MdHistory,
    MdAddCircle,
    MdRule,
    MdTimer,
    MdBolt,
    MdErrorOutline,
    MdAccessTime,
    MdClose,
    MdCheckCircle,
    MdOutlineCategory,
} from 'react-icons/md';

const AutomationCenter = () => {
    const { rules, logs, updateRule, addRule } = useAutomation();

    const [activeTab, setActiveTab] = useState('rules');
    const [showAddModal, setShowAddModal] = useState(false);

    // Form State
    const [ruleData, setRuleData] = useState({
        module: 'Attendance',
        category: 'Employee Events',
        event: 'On Attendance Mark',
        condition: '',
        action: '',
    });

    const modules = ['Attendance', 'Leave', 'Payroll', 'Helpdesk', 'Desk', 'Lifecycle'];

    const categories = [
        'Employee Events',
        'Attendance Events',
        'Payroll Events',
        'Helpdesk Events',
    ];

    const automationTemplates = [
        {
            title: 'Auto Approve Casual Leave',
            module: 'Leave',
            event: 'On Leave Apply',
            condition: 'duration < 2',
            action: 'auto_approve',
        },
        {
            title: 'Notify HR on Late Attendance',
            module: 'Attendance',
            event: 'On Attendance Mark',
            condition: 'late_minutes > 15',
            action: 'notify_hr',
        },
        {
            title: 'Generate Payslip Automatically',
            module: 'Payroll',
            event: 'On Payroll Initiation',
            condition: 'salary_status == ready',
            action: 'generate_payslip',
        },
    ];

    const failedEvents = useMemo(() => {
        return [
            {
                id: 1,
                module: 'Payroll',
                reason: 'SMTP server timeout',
                time: '10 mins ago',
            },
        ];
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRuleData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateRule = () => {
        const newRule = {
            module: ruleData.module,
            category: ruleData.category,
            event: ruleData.event,
            condition: ruleData.condition,
            action: ruleData.action,
            target: 'System',
            isActive: true,
            lastRun: 'Just now',
        };

        addRule(newRule);

        setRuleData({
            module: 'Attendance',
            category: 'Employee Events',
            event: 'On Attendance Mark',
            condition: '',
            action: '',
        });

        setShowAddModal(false);
    };

    const applyTemplate = (template) => {
        setRuleData({
            module: template.module,
            category: 'Employee Events',
            event: template.event,
            condition: template.condition,
            action: template.action,
        });

        setShowAddModal(true);
    };

    return (
        <DashboardLayout title="Automation Control Center" activePath="/automation-center">
            <div className="container-fluid p-0 animate__animated animate__fadeIn">

                {/* Header */}
                <div className="row mb-4 align-items-center">
                    <div className="col-md-8">
                        <h4 className="fw-bold text-dark mb-1">Automation Hub</h4>
                        <p className="text-secondary small mb-0">
                            Automate approvals, notifications, payroll workflows, and repetitive business tasks.
                        </p>
                    </div>

                    <div className="col-md-4 text-end">
                        <button
                            className="btn btn-primary rounded-pill px-4 shadow-sm d-inline-flex align-items-center gap-2"
                            onClick={() => setShowAddModal(true)}
                        >
                            <MdAddCircle size={20} /> Create Rule
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="row g-4 mb-4">
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-3 stat-card">
                            <div className="d-flex align-items-center gap-3">
                                <div className="icon-box bg-primary-subtle text-primary">
                                    <MdRule size={24} />
                                </div>
                                <div>
                                    <h3 className="fw-bold mb-0">{rules.length}</h3>
                                    <p className="text-secondary smaller mb-0">Total Rules</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-3 stat-card">
                            <div className="d-flex align-items-center gap-3">
                                <div className="icon-box bg-success-subtle text-success">
                                    <MdBolt size={24} />
                                </div>
                                <div>
                                    <h3 className="fw-bold mb-0">
                                        {rules.filter((r) => r.isActive).length}
                                    </h3>
                                    <p className="text-secondary smaller mb-0">Active Automations</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-3 stat-card">
                            <div className="d-flex align-items-center gap-3">
                                <div className="icon-box bg-info-subtle text-info">
                                    <MdTimer size={24} />
                                </div>
                                <div>
                                    <h3 className="fw-bold mb-0">12</h3>
                                    <p className="text-secondary smaller mb-0">Scheduled Tasks</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-3 stat-card">
                            <div className="d-flex align-items-center gap-3">
                                <div className="icon-box bg-danger-subtle text-danger">
                                    <MdErrorOutline size={24} />
                                </div>
                                <div>
                                    <h3 className="fw-bold mb-0">{failedEvents.length}</h3>
                                    <p className="text-secondary smaller mb-0">Failed Events</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Templates */}
                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <MdOutlineCategory className="text-primary" size={22} />
                        <h5 className="fw-bold mb-0">Automation Templates</h5>
                    </div>

                    <div className="row g-3">
                        {automationTemplates.map((template, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="template-card border rounded-4 p-3 h-100">
                                    <h6 className="fw-bold">{template.title}</h6>
                                    <p className="small text-secondary mb-3">
                                        {template.module} • {template.event}
                                    </p>

                                    <button
                                        className="btn btn-light-primary rounded-pill px-3 small"
                                        onClick={() => applyTemplate(template)}
                                    >
                                        Use Template
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Tabs */}
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">

                    <div className="card-header bg-white border-bottom-0 p-0">
                        <ul className="nav nav-tabs px-4 pt-3 border-0">
                            <li className="nav-item">
                                <button
                                    className={`nav-link border-0 fw-bold pb-3 px-4 ${activeTab === 'rules'
                                        ? 'active text-primary border-bottom border-primary border-3'
                                        : 'text-secondary'
                                        }`}
                                    onClick={() => setActiveTab('rules')}
                                >
                                    <MdSettings className="me-2" /> Active Rules
                                </button>
                            </li>

                            <li className="nav-item">
                                <button
                                    className={`nav-link border-0 fw-bold pb-3 px-4 ${activeTab === 'logs'
                                        ? 'active text-primary border-bottom border-primary border-3'
                                        : 'text-secondary'
                                        }`}
                                    onClick={() => setActiveTab('logs')}
                                >
                                    <MdHistory className="me-2" /> Audit Logs
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="card-body p-4">

                        {/* Rules Table */}
                        {activeTab === 'rules' && (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="bg-light">
                                        <tr className="small text-secondary fw-bold text-uppercase">
                                            <th className="border-0 px-4">Module</th>
                                            <th className="border-0">Event</th>
                                            <th className="border-0">Condition</th>
                                            <th className="border-0">Action</th>
                                            <th className="border-0">Last Run</th>
                                            <th className="border-0 text-center">Status</th>
                                            <th className="border-0 text-end px-4">Toggle</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {rules.map((rule) => (
                                            <tr key={rule.id}>
                                                <td className="px-4 fw-bold text-dark">
                                                    {rule.module}
                                                </td>

                                                <td>
                                                    <span className="badge bg-light text-dark border">
                                                        {rule.event}
                                                    </span>
                                                </td>

                                                <td className="small text-muted">
                                                    {rule.condition || 'No condition'}
                                                </td>

                                                <td>
                                                    <span className="badge bg-primary-subtle text-primary">
                                                        {rule.action}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="small text-secondary d-flex align-items-center gap-1">
                                                        <MdAccessTime />
                                                        {rule.lastRun || '2 mins ago'}
                                                    </span>
                                                </td>

                                                <td className="text-center">
                                                    {rule.isActive ? (
                                                        <span className="text-success fw-bold small">
                                                            <MdCheckCircle className="me-1" /> Running
                                                        </span>
                                                    ) : (
                                                        <span className="text-secondary fw-bold small">
                                                            <MdPauseCircleFilled className="me-1" /> Paused
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="text-end px-4">
                                                    <div className="form-check form-switch d-inline-flex justify-content-end">
                                                        <input
                                                            className="form-check-input custom-switch"
                                                            type="checkbox"
                                                            checked={rule.isActive}
                                                            onChange={() =>
                                                                updateRule(rule.id, {
                                                                    isActive: !rule.isActive,
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Logs */}
                        {activeTab === 'logs' && (
                            <div className="table-responsive">
                                <table className="table align-middle">
                                    <thead className="bg-light">
                                        <tr className="small text-secondary fw-bold text-uppercase">
                                            <th className="border-0 px-4">Timestamp</th>
                                            <th className="border-0">Module</th>
                                            <th className="border-0">Action</th>
                                            <th className="border-0">Status</th>
                                            <th className="border-0">Details</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {logs.map((log) => (
                                            <tr key={log.id}>
                                                <td className="px-4 small text-muted">
                                                    {log.timestamp}
                                                </td>

                                                <td className="fw-bold">{log.module}</td>

                                                <td>
                                                    <span className="text-primary fw-medium">
                                                        {log.action}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="badge bg-success-subtle text-success">
                                                        SUCCESS
                                                    </span>
                                                </td>

                                                <td className="small text-secondary">
                                                    {log.details}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Failed Events */}
                <div className="card border-0 shadow-sm rounded-4 p-4 mt-4 bg-white">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <MdErrorOutline className="text-danger" size={22} />
                        <h5 className="fw-bold mb-0">Failed Automation Events</h5>
                    </div>

                    {failedEvents.map((event) => (
                        <div
                            key={event.id}
                            className="failed-event d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <h6 className="fw-bold mb-1">{event.module}</h6>
                                <p className="small text-secondary mb-0">
                                    Reason: {event.reason}
                                </p>
                            </div>

                            <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill">
                                {event.time}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Rule Modal */}
            {showAddModal && (
                <div className="modal-overlay d-flex align-items-center justify-content-center">
                    <div
                        className="card border-0 shadow-lg rounded-4 p-4 animate__animated animate__zoomIn"
                        style={{ width: '480px' }}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold text-primary mb-0">
                                Create Automation Rul
                            </h5>

                            <button
                                className="btn btn-light rounded-circle p-2"
                                onClick={() => setShowAddModal(false)}
                            >
                                <MdClose />
                            </button>
                        </div>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label small fw-bold text-secondary">
                                    Module
                                </label>

                                <select
                                    className="form-select border-0 bg-light shadow-sm"
                                    name="module"
                                    value={ruleData.module}
                                    onChange={handleInputChange}
                                >
                                    {modules.map((m) => (
                                        <option key={m}>{m}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label small fw-bold text-secondary">
                                    Event Category
                                </label>

                                <select
                                    className="form-select border-0 bg-light shadow-sm"
                                    name="category"
                                    value={ruleData.category}
                                    onChange={handleInputChange}
                                >
                                    {categories.map((category) => (
                                        <option key={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-12">
                                <label className="form-label small fw-bold text-secondary">
                                    Trigger Event
                                </label>

                                <select
                                    className="form-select border-0 bg-light shadow-sm"
                                    name="event"
                                    value={ruleData.event}
                                    onChange={handleInputChange}
                                >
                                    <option>On Leave Apply</option>
                                    <option>On Attendance Mark</option>
                                    <option>On Payroll Initiation</option>
                                    <option>On Ticket Create</option>
                                </select>
                            </div>

                            <div className="col-md-12">
                                <label className="form-label small fw-bold text-secondary">
                                    Condition Logic
                                </label>

                                <input
                                    type="text"
                                    className="form-control border-0 bg-light shadow-sm"
                                    name="condition"
                                    value={ruleData.condition}
                                    onChange={handleInputChange}
                                    placeholder="e.g. duration < 2"
                                />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label small fw-bold text-secondary">
                                    Action to Execute
                                </label>

                                <input
                                    type="text"
                                    className="form-control border-0 bg-light shadow-sm"
                                    name="action"
                                    value={ruleData.action}
                                    onChange={handleInputChange}
                                    placeholder="e.g. auto_approve"
                                />
                            </div>
                        </div>

                        <div className="d-flex gap-2 mt-4">
                            <button
                                className="btn btn-light w-100 rounded-pill"
                                onClick={() => setShowAddModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-primary w-100 rounded-pill shadow-sm"
                                onClick={handleCreateRule}
                            >
                                Activate Rule
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.55);
                    backdrop-filter: blur(4px);
                    z-index: 2000;
                }

                .icon-box {
                    width: 55px;
                    height: 55px;
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .smaller {
                    font-size: 0.78rem;
                }

                .stat-card {
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    transform: translateY(-3px);
                }

                .template-card {
                    transition: all 0.3s ease;
                    background: #ffffff;
                }

                .template-card:hover {
                    border-color: #7c3aed;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
                    transform: translateY(-3px);
                }

                .btn-light-primary {
                    background: rgba(124, 58, 237, 0.08);
                    color: #7c3aed;
                }

                .btn-light-primary:hover {
                    background: #7c3aed;
                    color: #ffffff;
                }

                .custom-switch {
                    width: 3rem;
                    height: 1.5rem;
                    cursor: pointer;
                }
                .form-check-input:checked, 
                .form-switch .form-check-input:checked,
                .custom-switch:checked {
                    background-color: #7c3aed !important;
                    border-color: #7c3aed !important;
                    box-shadow: none !important;
                }
                .btn-primary, .bg-primary {
                    background-color: #7c3aed !important;
                    border-color: #7c3aed !important;
                }
                .btn-primary:hover {
                    background-color: #6d28d9 !important;
                    border-color: #6d28d9 !important;
                }
                .text-primary {
                    color: #7c3aed !important;
                }
                .bg-primary-subtle {
                    background-color: rgba(124, 58, 237, 0.12) !important;
                }
                .border-primary {
                    border-color: #7c3aed !important;
                }

                .failed-event {
                    padding: 16px;
                    border: 1px solid #f1f5f9;
                    border-radius: 16px;
                    margin-bottom: 12px;
                }

                .nav-tabs .nav-link:hover {
                    background: #f8fafc;
                }
            `}</style>
        </DashboardLayout>
    );
};

export default AutomationCenter;
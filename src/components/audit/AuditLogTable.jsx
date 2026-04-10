import React from 'react';
import { FaTrash, FaCheckCircle, FaEdit, FaSyncAlt, FaClipboardList, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

const AuditLogTable = ({ logs }) => {
    return (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0" style={{ minWidth: '1000px' }}>
                    <thead className="bg-light">
                        <tr>
                            <th className="small fw-bold text-secondary ps-4 py-3 border-0 text-uppercase">Action</th>
                            <th className="small fw-bold text-secondary py-3 border-0 text-uppercase">Module</th>
                            <th className="small fw-bold text-secondary py-3 border-0 text-uppercase">Entity</th>
                            <th className="small fw-bold text-secondary py-3 border-0 text-uppercase">Performed By</th>
                            <th className="small fw-bold text-secondary py-3 border-0 text-uppercase">Status</th>
                            <th className="small fw-bold text-secondary py-3 border-0 text-uppercase">Date & Time</th>
                            <th className="small fw-bold text-secondary py-3 border-0 text-uppercase">IP Address</th>
                            <th className="small fw-bold text-secondary py-3 border-0 text-uppercase">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center p-5 text-muted">
                                    <div className="py-5">
                                        <p className="mb-0">No audit logs found matching your criteria.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            logs.map((log, index) => {
                                const getActionConfig = (action) => {
                                    const act = (action || '').toLowerCase();
                                    if (act.includes('delete')) return { color: 'danger', icon: <FaTrash className="me-1" />, label: 'Delete' };
                                    if (act.includes('create')) return { color: 'success', icon: <FaCheckCircle className="me-1" />, label: 'Create' };
                                    if (act.includes('update')) return { color: 'warning', icon: <FaEdit className="me-1" />, label: 'Update' };
                                    if (act.includes('login') || act.includes('auth')) return { color: 'info', icon: <FaCheckCircle className="me-1" />, label: action || 'Login' };
                                    if (act.includes('process') || act.includes('payroll')) return { color: 'primary', icon: <FaSyncAlt className="me-1" />, label: action || 'Process' };
                                    return { color: 'secondary', icon: <FaClipboardList className="me-1" />, label: action || 'Action' };
                                };

                                const config = getActionConfig(log.action);
                                const statusColor = (log.status || '').toLowerCase() === 'failed' ? 'danger' : 'success';

                                return (
                                    <tr key={log.id || index}>
                                        <td className="ps-4">
                                            <span className={`badge bg-${config.color} bg-opacity-10 text-${config.color} px-2 py-1 rounded-pill d-inline-flex align-items-center fw-medium`} style={{ fontSize: '11px' }}>
                                                {config.icon}
                                                {config.label}
                                            </span>
                                        </td>
                                        <td className="small">
                                            <span className="badge bg-light text-dark border fw-normal">{log.module || 'System'}</span>
                                        </td>
                                        <td className="small fw-medium text-dark">
                                            {log.entity}
                                            {log.entityId && <div className="text-muted font-monospace x-small" style={{ fontSize: '10px' }}>ID: {log.entityId}</div>}
                                        </td>
                                        <td className="small fw-bold text-dark d-flex align-items-center gap-2">
                                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold" style={{ width: '28px', height: '28px', fontSize: '11px' }}>
                                                {(log.performedBy || 'U').charAt(0).toUpperCase()}
                                            </div>
                                            {log.performedBy || 'Unknown User'}
                                        </td>
                                        <td>
                                            <span className={`text-${statusColor} small d-flex align-items-center gap-1`}>
                                                {statusColor === 'danger' ? <FaTimesCircle size={10} /> : <FaCheckCircle size={10} />}
                                                {log.status || 'SUCCESS'}
                                            </span>
                                        </td>
                                        <td className="small text-muted">{log.date || log.timestamp || 'N/A'}</td>
                                        <td className="small text-muted font-monospace">{log.ipAddress || '0.0.0.0'}</td>
                                        <td className="small text-dark" title={log.details}>
                                            <div className="text-truncate" style={{ maxWidth: '200px' }}>{log.details}</div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuditLogTable;

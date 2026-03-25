import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSync, FaCheckCircle, FaTimesCircle, FaDesktop } from 'react-icons/fa';
import { attendanceService } from '../service/service';

const AddDevice = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingDevice, setEditingDevice] = useState(null);
    const [formData, setFormData] = useState({
        deviceName: '',
        deviceId: '',
        ipAddress: '',
        location: '',
        type: 'Biometric',
        status: 'Active'
    });

    const fetchDevices = async () => {
        setLoading(true);
        try {
            const data = await attendanceService.getDeviceList();
            setDevices(data || []);
        } catch (err) {
            console.error("Fetch devices failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    const handleAdd = () => {
        setFormData({
            deviceName: '',
            deviceId: '',
            ipAddress: '',
            location: '',
            type: 'Biometric',
            status: 'Active'
        });
        setEditingDevice(null);
        setShowModal(true);
    };

    const handleEdit = (device) => {
        setFormData(device);
        setEditingDevice(device.id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this device?')) {
            try {
                // Assuming there's a delete endpoint, if not, this is a placeholder
                // await attendanceService.deleteDevice(id);
                setDevices(devices.filter(d => d.id !== id));
            } catch (err) {
                alert(`Failed: ${err.message}`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await attendanceService.registerDevice(formData);
            alert(`Device ${editingDevice ? 'updated' : 'registered'} successfully!`);
            setShowModal(false);
            fetchDevices();
        } catch (err) {
            alert(`Failed: ${err.message}`);
        }
    };


    const handleSync = (deviceId) => {
        const now = new Date().toLocaleString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        setDevices(devices.map(d =>
            d.id === deviceId ? { ...d, lastSync: now } : d
        ));
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold text-dark mb-1">Device Management</h5>
                    <p className="text-muted small mb-0">Manage attendance devices and biometric systems</p>
                </div>
                <button className="btn btn-primary rounded-pill px-4 shadow-sm" onClick={handleAdd}>
                    <FaPlus className="me-2" />
                    Add Device
                </button>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="text-primary me-3">
                                    <FaDesktop size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Total Devices</h6>
                                    <h3 className="fw-bold mb-0">{devices.length}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-success bg-opacity-10 text-success rounded-circle p-3 me-3">
                                    <FaCheckCircle size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Active Devices</h6>
                                    <h3 className="fw-bold mb-0">{devices.filter(d => d.status === 'Active').length}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-danger bg-opacity-10 text-danger rounded-circle p-3 me-3">
                                    <FaTimesCircle size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Inactive Devices</h6>
                                    <h3 className="fw-bold mb-0">{devices.filter(d => d.status === 'Inactive').length}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="icon-box bg-info bg-opacity-10 text-info rounded-circle p-3 me-3">
                                    <FaSync size={24} />
                                </div>
                                <div>
                                    <h6 className="text-muted small mb-0">Total Employees</h6>
                                    <h3 className="fw-bold mb-0">{devices.reduce((sum, d) => sum + d.employeesRegistered, 0)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Devices Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-4 py-3">Device Name</th>
                                    <th className="border-0 py-3">Device ID</th>
                                    <th className="border-0 py-3">IP Address</th>
                                    <th className="border-0 py-3">Location</th>
                                    <th className="border-0 py-3">Type</th>
                                    <th className="border-0 py-3">Status</th>
                                    <th className="border-0 py-3">Last Sync</th>
                                    <th className="border-0 py-3">Employees</th>
                                    <th className="border-0 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.map(device => (
                                    <tr key={device.id}>
                                        <td className="px-4">
                                            <div className="d-flex align-items-center">
                                                <div className="text-primary me-3">
                                                    <FaDesktop size={16} />
                                                </div>
                                                <span className="fw-bold text-dark">{device.deviceName}</span>
                                            </div>
                                        </td>
                                        <td className="text-secondary small">{device.deviceId}</td>
                                        <td className="text-secondary small font-monospace">{device.ipAddress}</td>
                                        <td className="text-secondary small">{device.location}</td>
                                        <td>
                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                {device.type}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${device.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                                                {device.status}
                                            </span>
                                        </td>
                                        <td className="text-secondary small">{device.lastSync}</td>
                                        <td>
                                            <span className="badge bg-primary bg-opacity-10 text-primary">
                                                {device.employeesRegistered}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-primary rounded-circle"
                                                    onClick={() => handleSync(device.id)}
                                                    title="Sync Now"
                                                >
                                                    <FaSync size={12} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary rounded-circle"
                                                    onClick={() => handleEdit(device)}
                                                    title="Edit"
                                                >
                                                    <FaEdit size={12} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger rounded-circle"
                                                    onClick={() => handleDelete(device.id)}
                                                    title="Delete"
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title fw-bold">
                                    {editingDevice ? 'Edit Device' : 'Add New Device'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Device Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.deviceName}
                                                onChange={e => setFormData({ ...formData, deviceName: e.target.value })}
                                                placeholder="e.g., Main Office Biometric"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Device ID</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.deviceId}
                                                onChange={e => setFormData({ ...formData, deviceId: e.target.value })}
                                                placeholder="e.g., BIO-001"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">IP Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.ipAddress}
                                                onChange={e => setFormData({ ...formData, ipAddress: e.target.value })}
                                                placeholder="e.g., 192.168.1.100"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Location</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={formData.location}
                                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="e.g., Main Entrance"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Device Type</label>
                                            <select
                                                className="form-select"
                                                value={formData.type}
                                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                            >
                                                <option value="Biometric">Biometric</option>
                                                <option value="Face Recognition">Face Recognition</option>
                                                <option value="RFID Card">RFID Card</option>
                                                <option value="Mobile App">Mobile App</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small text-muted fw-bold">Status</label>
                                            <select
                                                className="form-select"
                                                value={formData.status}
                                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button
                                        type="button"
                                        className="btn btn-light rounded-pill px-4"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary rounded-pill px-4">
                                        {editingDevice ? 'Update Device' : 'Add Device'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddDevice;

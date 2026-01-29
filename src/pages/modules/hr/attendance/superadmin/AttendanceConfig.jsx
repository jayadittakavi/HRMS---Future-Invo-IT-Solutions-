import React, { useState } from 'react';
import { FaFingerprint, FaQrcode, FaMobileAlt, FaClock, FaGlobe, FaSave } from 'react-icons/fa';

const AttendanceConfig = () => {
    const [config, setConfig] = useState({
        attendanceMethods: {
            biometric: true,
            qrCode: true,
            manual: false,
            deviceApi: true
        },
        timezone: 'Asia/Kolkata',
        multiLocation: true,
        geoFencing: false
    });

    const handleMethodToggle = (method) => {
        setConfig(prev => ({
            ...prev,
            attendanceMethods: {
                ...prev.attendanceMethods,
                [method]: !prev.attendanceMethods[method]
            }
        }));
    };

    return (
        <div className="container-fluid p-4">
            <h4 className="fw-bold mb-4">Global Attendance Configuration</h4>

            {/* Master Toggle */}
            <div className="card border-0 shadow-sm rounded-4 mb-4 bg-primary text-white">
                <div className="card-body p-4 d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="fw-bold mb-1">Attendance Module Status</h5>
                        <p className="mb-0 opacity-75">Enable or disable the attendance system for the entire organization.</p>
                    </div>
                    <div className="form-check form-switch custom-switch-lg">
                        <input className="form-check-input" type="checkbox" role="switch" id="masterSwitch" defaultChecked style={{ width: '3em', height: '1.5em' }} />
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Attendance Methods Card */}
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white border-0 pt-4 px-4">
                            <h5 className="fw-bold d-flex align-items-center gap-2">
                                <FaFingerprint className="text-primary" /> Attendance Methods
                            </h5>
                            <p className="text-muted small">Select allowed methods for the entire organization</p>
                        </div>
                        <div className="card-body px-4 pb-4">
                            <div className="d-flex flex-column gap-3">
                                <div className="form-check form-switch p-0 d-flex justify-content-between align-items-center bg-light p-3 rounded-3">
                                    <label className="form-check-label fw-bold d-flex align-items-center gap-2" htmlFor="bioSwitch">
                                        <FaFingerprint /> Biometric Devices
                                    </label>
                                    <input
                                        className="form-check-input ms-0"
                                        type="checkbox"
                                        id="bioSwitch"
                                        checked={config.attendanceMethods.biometric}
                                        onChange={() => handleMethodToggle('biometric')}
                                    />
                                </div>
                                <div className="form-check form-switch p-0 d-flex justify-content-between align-items-center bg-light p-3 rounded-3">
                                    <label className="form-check-label fw-bold d-flex align-items-center gap-2" htmlFor="qrSwitch">
                                        <FaQrcode /> QR Code
                                    </label>
                                    <input
                                        className="form-check-input ms-0"
                                        type="checkbox"
                                        id="qrSwitch"
                                        checked={config.attendanceMethods.qrCode}
                                        onChange={() => handleMethodToggle('qrCode')}
                                    />
                                </div>
                                <div className="form-check form-switch p-0 d-flex justify-content-between align-items-center bg-light p-3 rounded-3">
                                    <label className="form-check-label fw-bold d-flex align-items-center gap-2" htmlFor="manualSwitch">
                                        <FaEdit /> Manual Entry (Fallback)
                                    </label>
                                    <input
                                        className="form-check-input ms-0"
                                        type="checkbox"
                                        id="manualSwitch"
                                        checked={config.attendanceMethods.manual}
                                        onChange={() => handleMethodToggle('manual')}
                                    />
                                </div>
                                <div className="form-check form-switch p-0 d-flex justify-content-between align-items-center bg-light p-3 rounded-3">
                                    <label className="form-check-label fw-bold d-flex align-items-center gap-2" htmlFor="apiSwitch">
                                        <FaMobileAlt /> Device/API Integration
                                    </label>
                                    <input
                                        className="form-check-input ms-0"
                                        type="checkbox"
                                        id="apiSwitch"
                                        checked={config.attendanceMethods.deviceApi}
                                        onChange={() => handleMethodToggle('deviceApi')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Settings Card */}
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white border-0 pt-4 px-4">
                            <h5 className="fw-bold d-flex align-items-center gap-2">
                                <FaGlobe className="text-success" /> Global Settings
                            </h5>
                            <p className="text-muted small">Configure timezone and location rules</p>
                        </div>
                        <div className="card-body px-4 pb-4">
                            <div className="mb-4">
                                <label className="form-label fw-bold">Default Timezone</label>
                                <select
                                    className="form-select bg-light border-0"
                                    value={config.timezone}
                                    onChange={(e) => setConfig({ ...config, timezone: e.target.value })}
                                >
                                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                    <option value="UTC">UTC (Universal)</option>
                                    <option value="America/New_York">America/New_York (EST)</option>
                                </select>
                            </div>

                            <div className="form-check form-switch p-0 d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                <div>
                                    <span className="fw-bold d-block">Multi-Location Support</span>
                                    <small className="text-muted">Allow employees to clock in from different offices</small>
                                </div>
                                <input
                                    className="form-check-input ms-0"
                                    type="checkbox"
                                    checked={config.multiLocation}
                                    onChange={() => setConfig({ ...config, multiLocation: !config.multiLocation })}
                                />
                            </div>

                            <div className="form-check form-switch p-0 d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="fw-bold d-block">Geo-Fencing</span>
                                    <small className="text-muted">Restrict clock-in to office radius</small>
                                </div>
                                <input
                                    className="form-check-input ms-0"
                                    type="checkbox"
                                    checked={config.geoFencing}
                                    onChange={() => setConfig({ ...config, geoFencing: !config.geoFencing })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-primary px-4 py-2 d-flex align-items-center gap-2 rounded-pill shadow">
                    <FaSave /> Save Configuration
                </button>
            </div>
        </div>
    );
};

// Start of FaEdit component fix (It was used but not imported in my snippet above, let's fix imports)
import { FaEdit } from 'react-icons/fa';

export default AttendanceConfig;

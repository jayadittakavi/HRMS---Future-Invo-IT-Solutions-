import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { MdWeekend, MdSearch, MdFilterList, MdCheckCircle, MdEvent, MdLocationOn, MdPeople, MdLayers, MdInfo } from 'react-icons/md';

const DeskBooking = () => {
    const [selectedFloor, setSelectedFloor] = useState('Floor 1');
    const [selectedDesk, setSelectedDesk] = useState(null);

    // Mock Desk Data
    const floors = ['Floor 1', 'Floor 2', 'Floor 3'];
    const desks = Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        code: `D-${i + 1}`,
        status: i % 5 === 0 ? 'Occupied' : i % 7 === 0 ? 'Maintenance' : 'Available',
        user: i % 5 === 0 ? 'User ' + (i + 1) : null
    }));

    return (
        <DashboardLayout title="Desk Booking">
            <div className="container-fluid p-0 animate__animated animate__fadeIn">
                {/* Header and Quick Stats */}
                <div className="row g-4 mb-4">
                    <div className="col-12 d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h4 className="fw-bold mb-1 text-dark">Office Hot-Desking</h4>
                            <p className="text-secondary small mb-0">Book your workspace for the day and view real-time office occupancy.</p>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-primary d-flex align-items-center gap-2 px-4 rounded-pill shadow-sm" onClick={() => { }}>
                                <MdEvent size={20} />
                                <span className="fw-semibold">My Bookings</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mb-4">
                    <div className="col-lg-3">
                        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                            <h6 className="fw-bold mb-4 text-primary d-flex align-items-center gap-2">
                                <MdFilterList size={18} /> Booking Filters
                            </h6>

                            <div className="mb-4">
                                <label className="form-label small fw-bold text-secondary">SELECT FLOOR</label>
                                <div className="d-flex flex-column gap-2">
                                    {floors.map(f => (
                                        <button
                                            key={f}
                                            className={`btn btn-sm py-2 px-3 text-start rounded-3 border-0 transition-all ${selectedFloor === f ? 'bg-primary text-white shadow' : 'bg-light text-secondary'}`}
                                            onClick={() => setSelectedFloor(f)}
                                        >
                                            <MdLayers size={18} className="me-2" /> {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label small fw-bold text-secondary">BOOKING DATE</label>
                                <input type="date" className="form-control border-0 bg-light rounded-3 py-2 shadow-none" defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>

                            <div className="mb-4">
                                <label className="form-label small fw-bold text-secondary">AMENITIES</label>
                                <div className="form-check small mb-2">
                                    <input className="form-check-input" type="checkbox" id="dualMonitor" />
                                    <label className="form-check-label text-secondary" htmlFor="dualMonitor">Dual Monitor</label>
                                </div>
                                <div className="form-check small mb-2">
                                    <input className="form-check-input" type="checkbox" id="standingDesk" />
                                    <label className="form-check-label text-secondary" htmlFor="standingDesk">Standing Desk</label>
                                </div>
                                <div className="form-check small">
                                    <input className="form-check-input" type="checkbox" id="windowView" />
                                    <label className="form-check-label text-secondary" htmlFor="windowView">Window View</label>
                                </div>
                            </div>

                            <div className="mt-auto p-3 bg-primary-subtle rounded-4 text-primary border border-primary-subtle shadow-sm">
                                <div className="d-flex align-items-center gap-2 mb-1">
                                    <MdInfo size={16} />
                                    <span className="fw-bold small">Current Occupancy</span>
                                </div>
                                <div className="h4 fw-bold mb-0">65%</div>
                                <div className="progress mt-2" style={{ height: '4px' }}>
                                    <div className="progress-bar bg-primary" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                                    <MdLocationOn size={18} className="text-danger" /> Layout: {selectedFloor}
                                </h6>
                                <div className="d-flex gap-4">
                                    <div className="d-flex align-items-center gap-2 small">
                                        <div className="rounded-circle" style={{ width: '12px', height: '12px', background: '#dcfce7', border: '1px solid #86efac' }}></div>
                                        <span className="text-secondary">Available</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 small">
                                        <div className="rounded-circle" style={{ width: '12px', height: '12px', background: '#fee2e2', border: '1px solid #fca5a5' }}></div>
                                        <span className="text-secondary">Occupied</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 small">
                                        <div className="rounded-circle bg-light border" style={{ width: '12px', height: '12px' }}></div>
                                        <span className="text-secondary">Service</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floor Map Grid */}
                            <div className="floor-map p-4 bg-light rounded-4 border">
                                <div className="row g-3">
                                    {desks.map(desk => (
                                        <div key={desk.id} className="col-2">
                                            <div
                                                className={`desk-card p-2 rounded-3 text-center border transition-all position-relative shadow-sm ${desk.status === 'Available' ? 'bg-white border-success-subtle cursor-pointer hover-active' :
                                                        desk.status === 'Occupied' ? 'bg-danger-subtle border-danger-subtle opacity-75' :
                                                            'bg-gray-100 border-gray-200'
                                                    } ${selectedDesk?.id === desk.id ? 'selected-desk shadow-lg' : ''}`}
                                                onClick={() => desk.status === 'Available' && setSelectedDesk(desk)}
                                            >
                                                <MdWeekend size={28} className={desk.status === 'Available' ? 'text-success' : desk.status === 'Occupied' ? 'text-danger' : 'text-muted'} />
                                                <div className="fw-bold small mt-1" style={{ fontSize: '10px' }}>{desk.code}</div>
                                                {desk.status === 'Occupied' && (
                                                    <div className="position-absolute top-0 start-100 translate-middle-x badge bg-white p-1 rounded-circle border shadow-sm" title={desk.user}>
                                                        <MdPeople size={10} className="text-primary" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Booking Action Area */}
                            {selectedDesk && (
                                <div className="mt-4 p-4 rounded-4 animate__animated animate__fadeInUp" style={{ background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)', color: '#fff' }}>
                                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                        <div className="d-flex align-items-center gap-4">
                                            <div className="bg-white p-3 rounded-circle shadow">
                                                <MdWeekend size={32} className="text-primary" />
                                            </div>
                                            <div>
                                                <h5 className="fw-bold mb-1">Confirm Booking: {selectedDesk.code}</h5>
                                                <div className="d-flex align-items-center gap-3 opacity-75 small">
                                                    <span>Floor: {selectedFloor}</span>
                                                    <span>&bull;</span>
                                                    <span>Date: Feb 22, 2026</span>
                                                    <span>&bull;</span>
                                                    <span>Type: Hot Desk</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-white text-dark px-4 rounded-pill fw-bold bg-white" onClick={() => setSelectedDesk(null)}>Cancel</button>
                                            <button className="btn btn-dark bg-opacity-25 border-0 text-white px-4 rounded-pill fw-bold shadow-sm" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} onClick={() => setSelectedDesk(null)}>
                                                <MdCheckCircle size={18} className="me-2" /> Confirm & Book
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!selectedDesk && (
                                <div className="mt-4 py-4 text-center border-top">
                                    <p className="text-secondary small mb-0">Select an available desk from the map to confirm your booking.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .transition-all { transition: all 0.2s ease; }
                .cursor-pointer { cursor: pointer; }
                .hover-active:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important; border-color: #10b981 !important; }
                .selected-desk { border: 2px solid #3b82f6 !important; background-color: #eff6ff !important; transform: scale(1.05); }
                .bg-primary-subtle { background-color: #eff6ff; }
                .bg-danger-subtle { background-color: #fee2e2; }
                .floor-map { min-height: 400px; display: flex; align-items: center; justify-content: center; }
            `}</style>
        </DashboardLayout>
    );
};

export default DeskBooking;

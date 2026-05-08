import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import { deskService } from '../../../../services/deskService';
import {
    MdWindow, MdEventAvailable, MdHistory, MdSettings,
    MdPeople, MdLocationOn, MdLibraryAdd, MdFactCheck,
    MdPieChart, MdOutlineAssignment, MdCancel, MdCheckCircle,
    MdSearch, MdFilterList, MdSave, MdEdit, MdDelete
} from 'react-icons/md';

export const DeskManagementContent = () => {
    const { user } = useAuth();
    const role = user?.role?.toLowerCase() || 'employee';

    const [activeTab, setActiveTab] = useState(
        role === 'employee' ? 'booking' :
            role === 'manager' ? 'team' :
                'occupancy'
    );
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showDeskModal, setShowDeskModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedDesk, setSelectedDesk] = useState(null);
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [showFloorModal, setShowFloorModal] = useState(false);
    const [floorModalView, setFloorModalView] = useState('options'); // 'options' | 'layout'


    const [loading, setLoading] = useState(false);
    const [desks, setDesks] = useState([]);
    const [occupancyData, setOccupancyData] = useState([]);
    const [stats, setStats] = useState({ total: 0, available: 0, booked: 0, assigned: 0 });
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [dData, sData, oData] = await Promise.all([
                deskService.getDeskList(role),
                deskService.getStats(role),
                deskService.getOccupancy(role)
            ]);
            setDesks(dData || []);
            setStats(sData || stats);
            setOccupancyData(oData || []);

            if (activeTab === 'my-bookings' || activeTab === 'all-bookings') {
                const bData = await deskService.getMyBookings(role);
                setBookings(bData || []);
            }
        } catch (error) {
            console.error("Desk Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (action, data) => {
        try {
            if (action === 'Booking') {
                await deskService.bookDesk({ desk_id: data.id, date: new Date().toISOString().split('T')[0] }, role);
            }
            alert(`${action} successful!`);
            fetchData();
        } catch (error) {
            alert(`${action} failed: ` + error.message);
        }
    };

    const getStatusStyle = (status) => {
        const styles = {
            'Available': 'bg-success-subtle text-success border-success',
            'Booked': 'bg-info-subtle text-info border-info',
            'Assigned': 'bg-primary-subtle text-primary border-primary',
            'Out of Order': 'bg-danger-subtle text-danger border-danger',
            'Confirmed': 'bg-success-subtle text-success border-success',
            'Pending Approval': 'bg-warning-subtle text-warning border-warning',
            'Cancelled': 'bg-secondary-subtle text-secondary border-secondary',
        };
        return `badge rounded-pill border px-3 py-1 ${styles[status] || 'bg-light text-dark'}`;
    };

    return (
        <div className="container-fluid p-0 animate__animated animate__fadeIn">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Desk Management</h4>
                    <p className="text-secondary small mb-0">Manage workspace, bookings, and office occupancy.</p>
                </div>
                {role === 'employee' && (
                    <button className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm" style={{ borderRadius: '12px' }} onClick={() => setShowBookingModal(true)}>
                        <MdEventAvailable size={20} /> Book a Desk
                    </button>
                )}
                {(role === 'superadmin' || role === 'admin') && (
                    <button className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm" style={{ borderRadius: '12px' }} onClick={() => { setSelectedDesk(null); setShowDeskModal(true); }}>
                        <MdLibraryAdd size={20} /> Add New Desk
                    </button>
                )}
            </div>

            {/* Stats Overview */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Total Desks', val: stats.total, icon: <MdWindow size={24} />, color: 'primary' },
                    { label: 'Available Now', val: stats.available, icon: <MdCheckCircle size={24} />, color: 'success' },
                    { label: 'Today\'s Bookings', val: stats.booked, icon: <MdEventAvailable size={24} />, color: 'info' },
                    { label: 'Permanent Seats', val: stats.assigned, icon: <MdPeople size={24} />, color: 'primary' },
                ].map((s, i) => (
                    <div className="col-md-3" key={i}>
                        <div className={`dashboard-card p-3 shadow-sm ${i % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`} style={{ borderRadius: '20px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                            <div className="d-flex align-items-center gap-3">
                                <div className={`bg-${s.color}-subtle p-3 rounded-4 text-${s.color}`}>{s.icon}</div>
                                <div>
                                    <h3 className="fw-bold mb-0">{s.val}</h3>
                                    <p className="text-secondary small mb-0">{s.label}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Tabs */}
            <div className="mb-4">
                <ul className="nav nav-pills bg-white p-2 rounded-4 shadow-sm overflow-auto flex-nowrap" style={{ display: 'inline-flex', gap: '8px' }}>
                    {/* Common Tabs */}
                    <li className="nav-item">
                        <button className={`nav-link rounded-3 px-4 ${activeTab === 'occupancy' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('occupancy')}>
                            <MdPieChart className="me-2" /> Occupancy
                        </button>
                    </li>

                    {/* Employee Tabs */}
                    {role === 'employee' && (
                        <>
                            <li className="nav-item">
                                <button className={`nav-link rounded-3 px-4 ${activeTab === 'booking' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('booking')}>
                                    <MdEventAvailable className="me-2" /> Book Desk
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link rounded-3 px-4 ${activeTab === 'my-bookings' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('my-bookings')}>
                                    <MdHistory className="me-2" /> My Bookings
                                </button>
                            </li>
                        </>
                    )}

                    {/* Admin / SuperAdmin Tabs */}
                    {(role === 'admin' || role === 'superadmin') && (
                        <>
                            <li className="nav-item">
                                <button className={`nav-link rounded-3 px-4 ${activeTab === 'desks' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('desks')}>
                                    <MdWindow className="me-2" /> Desk Master
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link rounded-3 px-4 ${activeTab === 'all-bookings' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('all-bookings')}>
                                    <MdHistory className="me-2" /> All Bookings
                                </button>
                            </li>
                        </>
                    )}

                    {/* HR Tabs */}
                    {role === 'hr' && (
                        <li className="nav-item">
                            <button className={`nav-link rounded-3 px-4 ${activeTab === 'allocation' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('allocation')}>
                                <MdOutlineAssignment className="me-2" /> Allocation
                            </button>
                        </li>
                    )}

                    {/* Manager Tabs */}
                    {role === 'manager' && (
                        <li className="nav-item">
                            <button className={`nav-link rounded-3 px-4 ${activeTab === 'team' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('team')}>
                                <MdPeople className="me-2" /> Team Desk View
                            </button>
                        </li>
                    )}

                    {/* SuperAdmin specific */}
                    {role === 'superadmin' && (
                        <>
                            <li className="nav-item">
                                <button className={`nav-link rounded-3 px-4 ${activeTab === 'layout' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('layout')}>
                                    <MdLocationOn className="me-2" /> Office Layout
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link rounded-3 px-4 ${activeTab === 'rules' ? 'active shadow-sm' : 'text-secondary'}`} onClick={() => setActiveTab('rules')}>
                                    <MdSettings className="me-2" /> Booking Rules
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Content Area */}
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
                {activeTab === 'occupancy' && (
                    <div className="p-4 text-center">
                        <h5 className="fw-bold mb-4">Floor Occupancy Overview</h5>
                        <div className="row g-4">
                            {occupancyData.length > 0 ? (
                                occupancyData.map(floor => (
                                    <div key={floor.id || floor.name} className="col-md-4">
                                        <div
                                            className="dashboard-card animate-float p-4 shadow-sm floor-card cursor-pointer transition-all h-100"
                                            style={{ borderRadius: '24px', background: '#fff' }}
                                            onClick={() => {
                                                setSelectedFloor(floor.name);
                                                setFloorModalView('options');
                                                setShowFloorModal(true);
                                            }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h6 className="fw-bold mb-0 text-main">{floor.name}</h6>
                                                <span className="badge bg-primary-subtle text-primary border border-primary small">Manage</span>
                                            </div>
                                            <div className="progress mb-3" style={{ height: '10px', borderRadius: '5px' }}>
                                                <div
                                                    className={`progress-bar progress-bar-striped progress-bar-animated bg-primary`}
                                                    role="progressbar"
                                                    style={{ width: `${floor.occupancy_percentage || floor.occupancy || 0}%` }}
                                                ></div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <small className="text-secondary fw-medium">
                                                    {floor.occupied_count} / {floor.total_capacity} occupied ({floor.occupancy_percentage}% )
                                                </small>
                                                <button className="btn btn-sm btn-link text-decoration-none p-0 fw-bold">Open View</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center py-5 text-muted">
                                    No occupancy data available at this time.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {(activeTab === 'desks' || activeTab === 'booking' || activeTab === 'allocation' || activeTab === 'team') && (
                    <div className="table-responsive">
                        <table className="table border-0 mb-0 align-middle">
                            <thead className="bg-light">
                                <tr className="small text-secondary fw-bold text-uppercase">
                                    <th className="px-4 py-3 border-0">Desk ID</th>
                                    <th className="py-3 border-0">Location</th>
                                    <th className="py-3 border-0">Team</th>
                                    {activeTab === 'allocation' && <th className="py-3 border-0">Allocation Time</th>}
                                    <th className="py-3 border-0">Status</th>
                                    <th className="py-3 border-0 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {desks.map(desk => (
                                    <tr key={desk.id} className="border-bottom-light">
                                        <td className="px-4 py-3 fw-bold">{desk.id}</td>
                                        <td className="py-3">
                                            <div className="fw-medium">{desk.name}</div>
                                            <div className="text-muted small">{desk.floor} - {desk.wing} Wing</div>
                                        </td>
                                        <td className="py-3 fw-medium">{desk.team}</td>
                                        {activeTab === 'allocation' && (
                                            <td className="py-3 small fw-bold text-primary">
                                                {desk.allocatedAt || '--'}
                                            </td>
                                        )}
                                        <td className="py-3">
                                            <span className={getStatusStyle(desk.status)}>{desk.status}</span>
                                        </td>
                                        <td className="py-3 text-center">
                                            {activeTab === 'booking' && desk.status === 'Available' && (
                                                <button className="btn btn-sm btn-primary rounded-pill px-3 shadow-sm" onClick={() => { setSelectedDesk(desk); setShowBookingModal(true); }}>Book</button>
                                            )}
                                            {activeTab === 'allocation' && desk.status === 'Available' && (
                                                <button className="btn btn-sm btn-info text-white rounded-pill px-3 shadow-sm" onClick={() => { setSelectedDesk(desk); setShowAssignModal(true); }}>Assign</button>
                                            )}
                                            {activeTab === 'desks' && (
                                                <div className="d-flex justify-content-center gap-2">
                                                    <button className="btn btn-sm btn-light border-0 rounded-circle text-primary" title="Edit" onClick={() => { setSelectedDesk(desk); setShowDeskModal(true); }}><MdEdit /></button>
                                                    <button className="btn btn-sm btn-light border-0 rounded-circle text-danger" title="Delete" onClick={() => handleAction('Delete Desk', desk)}><MdDelete /></button>
                                                </div>
                                            )}
                                            {activeTab === 'team' && (
                                                <small className="text-muted">{desk.bookedBy || '--'}</small>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {(activeTab === 'my-bookings' || activeTab === 'all-bookings') && (
                    <div className="table-responsive">
                        <table className="table border-0 mb-0 align-middle">
                            <thead className="bg-light">
                                <tr className="small text-secondary fw-bold text-uppercase">
                                    <th className="px-4 py-3 border-0">Booking ID</th>
                                    <th className="py-3 border-0">Desk</th>
                                    <th className="py-3 border-0">Employee</th>
                                    <th className="py-3 border-0">Date & Time</th>
                                    <th className="py-3 border-0">Status</th>
                                    <th className="py-3 border-0 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.id} className="border-bottom-light">
                                        <td className="px-4 py-3 fw-bold">{booking.id}</td>
                                        <td className="py-3 fw-medium">{booking.deskId}</td>
                                        <td className="py-3 fw-medium">{booking.employee}</td>
                                        <td className="py-3 small">
                                            <div className="fw-bold">{booking.date}</div>
                                            <div className="text-primary fw-medium">{booking.time}</div>
                                        </td>
                                        <td className="py-3">
                                            <span className={getStatusStyle(booking.status)}>{booking.status}</span>
                                        </td>
                                        <td className="py-3 text-center">
                                            {booking.status === 'Pending Approval' && role === 'manager' && (
                                                <div className="d-flex justify-content-center gap-2">
                                                    <button className="btn btn-sm btn-success rounded-pill px-3 shadow-sm" onClick={() => handleAction('Approve Booking', booking)}>Approve</button>
                                                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => handleAction('Reject Booking', booking)}>Reject</button>
                                                </div>
                                            )}
                                            {(booking.status === 'Confirmed' || booking.status === 'Pending Approval') && (
                                                <button className="btn btn-sm btn-light text-danger rounded-pill px-3 shadow-sm d-flex align-items-center gap-1 mx-auto" onClick={() => handleAction('Cancel Booking', booking)}>
                                                    <MdCancel /> Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'rules' && (
                    <div className="p-4">
                        <h6 className="fw-bold mb-4">Workspace Booking Policies</h6>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="p-3 border rounded-3 bg-light d-flex justify-content-between align-items-center">
                                    <span>Max advance booking days</span>
                                    <input type="number" className="form-control w-25 shadow-sm border-0" defaultValue={7} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-3 border rounded-3 bg-light d-flex justify-content-between align-items-center">
                                    <span>Require manager approval</span>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" defaultChecked />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary mt-4 d-flex align-items-center gap-2 shadow-sm rounded-3" onClick={() => handleAction('Save Rules', {})}>
                            <MdSave /> Save Configuration
                        </button>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showBookingModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050 }}>
                    <div className="card border-0 shadow-lg rounded-4 p-4 animate__animated animate__zoomIn" style={{ width: '400px' }}>
                        <h5 className="fw-bold mb-3 text-primary">New Desk Booking {selectedDesk ? `- ${selectedDesk.id}` : ''}</h5>
                        <div className="mb-3">
                            <label className="form-label small fw-bold text-secondary">Select Date</label>
                            <input type="date" className="form-control border-0 bg-light shadow-sm" defaultValue={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="mb-4">
                            <label className="form-label small fw-bold text-secondary">Preferred Floor</label>
                            <select className="form-select border-0 bg-light shadow-sm" defaultValue={selectedDesk?.floor || '1st Floor'}>
                                <option>1st Floor</option>
                                <option>2nd Floor</option>
                            </select>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-light w-100 rounded-pill" onClick={() => setShowBookingModal(false)}>Cancel</button>
                            <button className="btn btn-primary w-100 rounded-pill shadow-sm" onClick={() => { handleAction('Booking', selectedDesk); setShowBookingModal(false); }}>Confirm Booking</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeskModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050 }}>
                    <div className="card border-0 shadow-lg rounded-4 p-4 animate__animated animate__zoomIn" style={{ width: '450px' }}>
                        <h5 className="fw-bold mb-3 text-primary">{selectedDesk ? 'Edit Desk' : 'Add New Desk'}</h5>
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label small fw-bold text-secondary">Desk ID</label>
                                <input type="text" className="form-control border-0 bg-light shadow-sm" defaultValue={selectedDesk?.id} placeholder="e.g. D105" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-bold text-secondary">Desk Name</label>
                                <input type="text" className="form-control border-0 bg-light shadow-sm" defaultValue={selectedDesk?.name} placeholder="e.g. Desk 105" />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label small fw-bold text-secondary">Location (Floor & Wing)</label>
                                <div className="d-flex gap-2">
                                    <select className="form-select border-0 bg-light shadow-sm" defaultValue={selectedDesk?.floor}>
                                        <option>1st Floor</option>
                                        <option>2nd Floor</option>
                                        <option>3rd Floor</option>
                                    </select>
                                    <select className="form-select border-0 bg-light shadow-sm" defaultValue={selectedDesk?.wing}>
                                        <option>Alpha</option>
                                        <option>Beta</option>
                                        <option>Gamma</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <label className="form-label small fw-bold text-secondary">Team Access</label>
                                <select className="form-select border-0 bg-light shadow-sm" defaultValue={selectedDesk?.team}>
                                    <option>Engineering</option>
                                    <option>Marketing</option>
                                    <option>HR</option>
                                    <option>Sales</option>
                                    <option>Any</option>
                                </select>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-light w-100 rounded-pill" onClick={() => setShowDeskModal(false)}>Cancel</button>
                            <button className="btn btn-primary w-100 rounded-pill shadow-sm" onClick={() => { handleAction(selectedDesk ? 'Update Desk' : 'Create Desk', selectedDesk); setShowDeskModal(false); }}>Save Desk</button>
                        </div>
                    </div>
                </div>
            )}

            {showAssignModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050 }}>
                    <div className="card border-0 shadow-lg rounded-4 p-4 animate__animated animate__zoomIn" style={{ width: '400px' }}>
                        <h5 className="fw-bold mb-3 text-primary">Assign Permanent Seat - {selectedDesk?.id}</h5>
                        <div className="mb-4">
                            <label className="form-label small fw-bold text-secondary">Search Employee</label>
                            <div className="input-group bg-light rounded-pill shadow-sm overflow-hidden">
                                <span className="input-group-text border-0 bg-transparent ps-3"><MdSearch /></span>
                                <input type="text" className="form-control border-0 bg-transparent" placeholder="Name or Emp ID..." />
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-light w-100 rounded-pill" onClick={() => setShowAssignModal(false)}>Cancel</button>
                            <button className="btn btn-info text-white w-100 rounded-pill shadow-sm" onClick={() => { handleAction('Assignment', selectedDesk); setShowAssignModal(false); }}>Assign Seat</button>
                        </div>
                    </div>
                </div>
            )}

            {showFloorModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050 }}>
                    <div className="card border-0 shadow-lg rounded-4 p-0 animate__animated animate__fadeInUp overflow-hidden" style={{ width: '650px', maxWidth: '90vw' }}>
                        {/* Modal Header */}
                        <div className="p-4 bg-primary text-white d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="fw-bold mb-0">{selectedFloor} - {floorModalView === 'options' ? 'Actions' : 'Office Layout'}</h5>
                                <p className="mb-0 small opacity-75">{floorModalView === 'options' ? 'Select an operation' : 'Click a desk to select and book'}</p>
                            </div>
                            <div className="d-flex gap-2">
                                {floorModalView === 'layout' && (
                                    <button className="btn btn-sm btn-light rounded-pill px-3 fw-bold" onClick={() => setFloorModalView('options')}>Back</button>
                                )}
                                <button className="btn btn-link text-white p-0" onClick={() => setShowFloorModal(false)}><MdCancel size={24} /></button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 bg-white" style={{ minHeight: '400px' }}>
                            {floorModalView === 'options' ? (
                                <div className="row g-4 pt-2">
                                    {[
                                        { title: 'Floor Layout', icon: <MdLocationOn />, color: 'success', desc: 'Visual map of the office layout', view: 'layout' },
                                        { title: 'Book Desk', icon: <MdEventAvailable />, color: 'info', desc: 'Browse and book a desk instantly', view: 'layout' },
                                        { title: 'View Desk List', icon: <MdWindow />, color: 'primary', desc: 'Full list of desks and status', action: 'view-desks' },
                                        { title: 'Report', icon: <MdFactCheck />, color: 'secondary', desc: 'Download occupancy records', action: 'report' },
                                        { title: 'Maintenance', icon: <MdCheckCircle />, color: 'warning', desc: 'Cleaning and sanitization status', action: 'cleaning' },
                                        { title: 'Floor Rules', icon: <MdSettings />, color: 'dark', desc: 'Configure floor specific settings', action: 'settings' },
                                    ].map((item, idx) => (
                                        <div className="col-md-6" key={idx}>
                                            <div
                                                className="p-3 border rounded-4 floor-action-item transition-all cursor-pointer h-100 d-flex align-items-center gap-3"
                                                onClick={() => {
                                                    if (item.view) {
                                                        setFloorModalView(item.view);
                                                    } else {
                                                        handleAction(item.title, { floor: selectedFloor });
                                                        if (item.action === 'view-desks') {
                                                            setActiveTab(role === 'employee' ? 'booking' : 'desks');
                                                            setShowFloorModal(false);
                                                        }
                                                    }
                                                }}
                                            >
                                                <div className={`bg-${item.color}-subtle p-3 rounded-4 text-${item.color} fs-3`}>{item.icon}</div>
                                                <div>
                                                    <h6 className="fw-bold mb-1">{item.title}</h6>
                                                    <p className="text-secondary smaller mb-0">{item.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="animate__animated animate__fadeIn">
                                    {/* Layout Legend */}
                                    <div className="d-flex justify-content-center gap-4 mb-4 pb-3 border-bottom">
                                        <div className="d-flex align-items-center gap-2 small fw-medium">
                                            <div className="rounded-1" style={{ width: '15px', height: '15px', backgroundColor: '#dcfce7', border: '1px solid #22c55e' }}></div> Available
                                        </div>
                                        <div className="d-flex align-items-center gap-2 small fw-medium">
                                            <div className="rounded-1" style={{ width: '15px', height: '15px', backgroundColor: '#fee2e2', border: '1px solid #ef4444' }}></div> Occupied
                                        </div>
                                        <div className="d-flex align-items-center gap-2 small fw-medium">
                                            <div className="rounded-1" style={{ width: '15px', height: '15px', backgroundColor: '#dbeafe', border: '1px solid #3b82f6' }}></div> Assigned
                                        </div>
                                    </div>

                                    {/* Interactive Grid */}
                                    <div className="desk-grid-container p-3 rounded-4 bg-light shadow-inner border border-2 overflow-auto" style={{ maxHeight: '350px' }}>
                                        <div className="d-grid gap-3" style={{ gridTemplateColumns: 'repeat(5, 1fr)', minWidth: '500px' }}>
                                            {Array.from({ length: 25 }).map((_, i) => {
                                                const deskNum = 101 + i;
                                                const deskId = `D${deskNum}`;
                                                // Mock mapping to existing data
                                                const actualDesk = desks.find(d => d.id === deskId) || { status: i % 3 === 0 ? 'Booked' : i % 5 === 0 ? 'Assigned' : 'Available' };

                                                return (
                                                    <div
                                                        key={i}
                                                        className={`desk-cell p-3 rounded-3 text-center transition-all cursor-pointer ${actualDesk.status === 'Available' ? 'bg-success-subtle border-success text-success' :
                                                            actualDesk.status === 'Assigned' ? 'bg-primary-subtle border-primary text-primary' :
                                                                'bg-danger-subtle border-danger text-danger opacity-75'
                                                            }`}
                                                        style={{ border: '2px solid', position: 'relative' }}
                                                        onClick={() => {
                                                            if (actualDesk.status === 'Available') {
                                                                setSelectedDesk({ id: deskId, floor: selectedFloor });
                                                                setShowBookingModal(true);
                                                            } else {
                                                                alert('This desk is already occupied.');
                                                            }
                                                        }}
                                                    >
                                                        <MdWindow className="mb-1 d-block mx-auto fs-5" />
                                                        <div className="smaller fw-bold">{deskId}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <p className="text-center mt-3 text-secondary small fw-medium">Front of Office / Main Entrance</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-3 bg-light border-top d-flex justify-content-between align-items-center">
                            <div className="small text-secondary ps-2">Viewing floor specific data</div>
                            <button className="btn btn-secondary rounded-pill px-4 shadow-sm fw-bold" onClick={() => setShowFloorModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .border-bottom-light { border-bottom: 1px solid #f1f5f9; }
                .nav-pills .nav-link { font-weight: 600; font-size: 0.9rem; transition: all 0.2s; white-space: nowrap; }
                .nav-pills .nav-link.active { background-color: var(--primary-color) !important; color: #fff !important; }
                .progress { background-color: #e2e8f0; }
                .text-main { color: #1e293b; }
                .cursor-pointer { cursor: pointer; }
                .floor-card { transition: all 0.3s ease; border: 1px solid #eef2f6 !important; }
                .floor-card:hover { transform: translateY(-5px); border-color: var(--primary-color) !important; box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important; }
                .floor-action-item { background: #fff; border: 1px solid #eef2f6; }
                .floor-action-item:hover { background-color: #f8fafc !important; border-color: var(--primary-color) !important; transform: scale(1.02); }
                .desk-cell { transition: all 0.2s ease; }
                .desk-cell:hover { transform: scale(1.1); z-index: 10; font-weight: bold; }
                .desk-cell.bg-success-subtle:hover { cursor: crosshair; }
                .smaller { font-size: 0.75rem; }
                .shadow-inner { box-shadow: inset 0 2px 4px rgba(0,0,0,0.06); }
            `}</style>
        </div>
    );
};

const DeskManagement = () => {
    return (
        <DashboardLayout title="Desk Management" activePath="/desk-management">
            <DeskManagementContent />
        </DashboardLayout>
    );
};

export default DeskManagement;

import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, isSameMonth, isSameDay, addDays, isToday } from 'date-fns';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import Navbar from '../../../../components/layout/Navbar';
import '../../../../components/layout/DashboardLayout.css'; // Keep for dashboard-card styles
import { calendarService } from '../../../../services/calendarService';
import { useAuth } from '../../../../context/AuthContext';

const Calendar = () => {
    const { user } = useAuth();
    const role = user?.role?.toLowerCase() || 'employee';
    const canManageEvents = ['superadmin', 'admin', 'hr'].includes(role);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Event State
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({
        id: null,
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        type: 'work',
        description: ''
    });

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const data = await calendarService.getEvents();
            const formatted = data.map(ev => ({
                ...ev,
                date: new Date(ev.date),
                time: ev.time || `${ev.startTime} - ${ev.endTime}`
            }));
            setEvents(formatted);
        } catch (err) {
            console.error("Failed to load events", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const onDateClick = (day) => {
        setSelectedDate(day);
        // Optional: Open modal immediately on date click? 
        // For now, just select the date. We can add a "Add Event" button or double click.
        // Let's stick to selecting the date, and the user can click "+" to add event for selected date.
    };

    const handleAddEventClick = () => {
        setIsEditing(false);
        setCurrentEvent({
            id: null,
            title: '',
            date: format(selectedDate, 'yyyy-MM-dd'),
            startTime: '09:00',
            endTime: '10:00',
            type: 'work',
            description: ''
        });
        setShowModal(true);
    };

    const handleEditEventClick = (e, event) => {
        e.stopPropagation(); // Prevent triggering date click
        setIsEditing(true);
        setCurrentEvent({
            ...event,
            date: format(event.date, 'yyyy-MM-dd'),
            startTime: event.time.split(' - ')[0] || '',
            endTime: event.time.split(' - ')[1] || ''
        });
        setShowModal(true);
    };

    const handleSaveEvent = async () => {
        if (!canManageEvents) {
            alert("Permission denied: Only Super Admin, Admin, and HR can create or edit events.");
            return;
        }

        try {
            if (isEditing) {
                await calendarService.updateEvent(currentEvent.id, {
                    ...currentEvent,
                    time: `${currentEvent.startTime} - ${currentEvent.endTime}`
                });
            } else {
                await calendarService.createEvent({
                    ...currentEvent,
                    time: `${currentEvent.startTime} - ${currentEvent.endTime}`
                });
            }
            fetchEvents();
            setShowModal(false);
        } catch (err) {
            alert("Failed to save event: " + err.message);
        }
    };

    const handleDeleteEvent = async () => {
        if (!canManageEvents) {
            alert("Permission denied");
            return;
        }

        try {
            await calendarService.deleteEvent(currentEvent.id);
            fetchEvents();
            setShowModal(false);
        } catch (err) {
            alert("Failed to delete event: " + err.message);
        }
    };

    const renderHeader = () => {
        return (
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-dark mb-0">{format(currentDate, 'MMMM yyyy')}</h4>
                <div className="d-flex gap-2">
                    <button className="btn btn-light btn-sm rounded-circle p-2" onClick={prevMonth}><FaChevronLeft /></button>
                    <button className="btn btn-light btn-sm rounded-circle p-2" onClick={nextMonth}><FaChevronRight /></button>
                    <div className="btn-group ms-2">
                        <button className="btn btn-white border px-3 rounded-start-pill active">Month</button>
                        <button className="btn btn-white border px-3 rounded-end-pill">Week</button>
                    </div>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return (
            <div className="d-flex mb-2">
                {days.map(day => (
                    <div key={day} className="flex-grow-1 text-center text-secondary small fw-bold py-2">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, 'd');
                const cloneDay = day;

                // Find events for this day
                const dayEvents = events.filter(e => isSameDay(e.date, day));

                days.push(
                    <div
                        key={day}
                        className={`flex-grow-1 border-end border-bottom p-2 position-relative ${!isSameMonth(day, monthStart)
                            ? 'text-muted bg-light opacity-50'
                            : isSameDay(day, selectedDate) ? 'bg-white border-primary border-2' : 'bg-white'
                            }`}
                        style={{ height: '120px', cursor: 'pointer', minWidth: '0' }}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span className={`small fw-bold ${isToday(day) ? 'bg-primary text-white rounded-circle px-2 py-1' : 'text-secondary'}`}>
                            {formattedDate}
                        </span>

                        <div className="mt-2 d-flex flex-column gap-1 overflow-auto" style={{ maxHeight: '80px' }}>
                            {dayEvents.map(ev => (
                                <div
                                    key={ev.id}
                                    className={`badge text-start text-truncate fw-normal px-2 ${ev.type === 'work' ? 'bg-purple-subtle text-purple' :
                                        ev.type === 'important' ? 'bg-danger-subtle text-danger' :
                                            'bg-success-subtle text-success'
                                        }`}
                                    style={{ fontSize: '0.7rem', cursor: 'pointer' }}
                                    onClick={(e) => handleEditEventClick(e, ev)}
                                    title={ev.title}
                                >
                                    • {ev.title}
                                </div>
                            ))}
                        </div>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="d-flex border-start border-top bg-white" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="rounded overflow-hidden border">{rows}</div>;
    };

    const renderMiniCalendar = () => {
        const monthStart = startOfMonth(selectedDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                days.push(
                    <div
                        key={day}
                        className={`flex-grow-1 text-center py-2 small rounded-circle cursor-pointer ${isSameDay(day, selectedDate) ? 'bg-primary text-white' :
                            !isSameMonth(day, monthStart) ? 'text-muted' : 'text-dark'
                            }`}
                        style={{ width: '30px', height: '30px', lineHeight: '15px' }}
                        onClick={() => {
                            setSelectedDate(cloneDay);
                            setCurrentDate(cloneDay); // Sync main calendar too
                        }}
                    >
                        {format(day, 'd')}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(<div className="d-flex justify-content-between mb-1" key={day}>{days}</div>);
            days = [];
        }

        return (
            <div className="dashboard-card p-4 mb-4" style={{ height: 'auto' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">{format(selectedDate, 'MMMM yyyy')}</h6>
                    <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-light p-1" onClick={() => setSelectedDate(subMonths(selectedDate, 1))}><FaChevronLeft size={10} /></button>
                        <button className="btn btn-sm btn-light p-1" onClick={() => setSelectedDate(addMonths(selectedDate, 1))}><FaChevronRight size={10} /></button>
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <small key={d} className="text-secondary fw-bold">{d}</small>)}
                </div>
                {rows}

                <div className="mt-4 pt-3 border-top">
                    <div className="d-flex flex-wrap gap-2 mb-2">
                        <span className="badge rounded-pill bg-purple-subtle text-purple px-2">Work</span>
                        <span className="badge rounded-pill bg-success-subtle text-success px-2">Personal</span>
                        <span className="badge rounded-pill bg-danger-subtle text-danger px-2">Important</span>
                        <button className="btn btn-sm btn-primary rounded-circle ms-auto" onClick={handleAddEventClick}><FaPlus /></button>
                    </div>
                    <small className="text-muted d-block mt-2">Click + to add important dates</small>
                </div>
            </div>
        );
    };

    const renderEventList = () => {
        // Filter events for the selected date
        const selectedDateEvents = events.filter(e => isSameDay(e.date, selectedDate));

        return (
            <div className="dashboard-card p-4" style={{ height: 'auto' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">Events for {format(selectedDate, 'MMM d')}</h6>
                    <FaPlus className="text-primary cursor-pointer" onClick={handleAddEventClick} title="Add Event" />
                </div>

                <div className="d-flex flex-column gap-3">
                    {selectedDateEvents.length > 0 ? (
                        selectedDateEvents.map((ev, idx) => (
                            <div key={idx} className="d-flex gap-3 position-relative cursor-pointer" onClick={(e) => handleEditEventClick(e, ev)}>
                                <div className="d-flex flex-column align-items-center" style={{ width: '40px' }}>
                                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>{ev.time.split('-')[0]}</small>
                                    <div className="h-100 border-start my-1" style={{ borderStyle: 'dashed' }}></div>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="mb-0 small fw-bold">{ev.title}</h6>
                                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>{ev.time} • {ev.type}</small>
                                </div>
                                <div className={`rounded-circle p-1 ${ev.type === 'important' ? 'bg-danger' : ev.type === 'work' ? 'bg-purple' : 'bg-success'}`} style={{ width: '8px', height: '8px', marginTop: '5px' }}></div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted small text-center my-3">No events scheduled.</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="d-flex flex-column min-vh-100" style={{ background: '#f5f3ff' }}>
            <Navbar isHome={true} />
            <div className="container-fluid py-4 pt-5">
                <div className="row g-4 d-flex align-items-start">
                    {/* Left Sidebar */}
                    <div className="col-lg-3 col-md-4">
                        {renderMiniCalendar()}
                        {renderEventList()}
                    </div>

                    {/* Main Calendar */}
                    <div className="col-lg-9 col-md-8">
                        <div className="dashboard-card p-4 bg-white rounded shadow-sm" style={{ height: 'auto', minHeight: '100%' }}>
                            {renderHeader()}
                            {renderDays()}
                            {renderCells()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Modal */}
            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isEditing ? 'Edit Event' : 'Add New Event'}</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Event Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={currentEvent.title}
                                        onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                                        placeholder="Meeting, Birthday, etc."
                                    />
                                </div>
                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <label className="form-label small fw-bold">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={currentEvent.date}
                                            onChange={(e) => setCurrentEvent({ ...currentEvent, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label small fw-bold">Type</label>
                                        <select
                                            className="form-select"
                                            value={currentEvent.type}
                                            onChange={(e) => setCurrentEvent({ ...currentEvent, type: e.target.value })}
                                        >
                                            <option value="work">Work</option>
                                            <option value="personal">Personal</option>
                                            <option value="important">Important</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <label className="form-label small fw-bold">Start Time</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            value={currentEvent.startTime}
                                            onChange={(e) => setCurrentEvent({ ...currentEvent, startTime: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label small fw-bold">End Time</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            value={currentEvent.endTime}
                                            onChange={(e) => setCurrentEvent({ ...currentEvent, endTime: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={currentEvent.description}
                                        onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
                                        placeholder="Add details..."
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {isEditing && (
                                    <button className="btn btn-danger btn-sm me-auto" onClick={handleDeleteEvent}>Delete</button>
                                )}
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-primary btn-sm" onClick={handleSaveEvent}>Save Event</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;

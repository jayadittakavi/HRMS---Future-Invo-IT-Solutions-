import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, isSameMonth, isSameDay, addDays, isToday } from 'date-fns';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import Footer from '../../../../components/layout/Footer';
import '../../../../components/layout/DashboardLayout.css'; // Keep for dashboard-card styles

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock Events
    const events = [
        { id: 1, title: 'Dentist Appointment', time: '9:30 AM - 10:30 AM', date: new Date(), type: 'personal' },
        { id: 2, title: 'Team Meeting', time: '11:00 AM - 12:00 PM', date: new Date(), type: 'work' },
        { id: 3, title: 'Project Review', time: '2:00 PM - 3:00 PM', date: addDays(new Date(), 2), type: 'urgent' },
    ];

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const onDateClick = (day) => setSelectedDate(day);

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
                            : isSameDay(day, selectedDate) ? 'bg-white' : 'bg-white'
                            }`}
                        style={{ height: '120px', cursor: 'pointer', minWidth: '0' }}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span className={`small fw-bold ${isToday(day) ? 'bg-primary text-white rounded-circle px-2 py-1' : 'text-secondary'}`}>
                            {formattedDate}
                        </span>

                        <div className="mt-2 d-flex flex-column gap-1">
                            {dayEvents.map(ev => (
                                <div key={ev.id} className={`badge text-start text-truncate fw-normal px-2 ${ev.type === 'work' ? 'bg-purple-subtle text-purple' :
                                    ev.type === 'urgent' ? 'bg-danger-subtle text-danger' :
                                        'bg-success-subtle text-success'
                                    }`} style={{ fontSize: '0.7rem' }}>
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
        // Simplified mini calendar logic (reuse similar logic but smaller)
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
                        onClick={() => setSelectedDate(cloneDay)}
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
                        <button className="btn btn-sm btn-light p-1"><FaChevronLeft size={10} /></button>
                        <button className="btn btn-sm btn-light p-1"><FaChevronRight size={10} /></button>
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <small key={d} className="text-secondary fw-bold">{d}</small>)}
                </div>
                {rows}

                <div className="mt-4 pt-3 border-top">
                    <div className="d-flex gap-2 mb-2">
                        <span className="badge rounded-pill bg-purple-subtle text-purple px-3">Work</span>
                        <span className="badge rounded-pill bg-success-subtle text-success px-3">Personal</span>
                        <span className="badge rounded-pill bg-danger-subtle text-danger px-3">Urgent</span>
                        <button className="btn btn-sm btn-light rounded-circle"><FaPlus /></button>
                    </div>
                </div>
            </div>
        );
    };

    const renderEventList = () => {
        return (
            <div className="dashboard-card p-4" style={{ height: 'auto' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">Today's Events</h6>
                    <FaPlus className="text-secondary cursor-pointer" />
                </div>

                <div className="d-flex flex-column gap-3">
                    {events.map((ev, idx) => (
                        <div key={idx} className="d-flex gap-3 position-relative">
                            <div className="d-flex flex-column align-items-center" style={{ width: '40px' }}>
                                <small className="text-muted" style={{ fontSize: '0.7rem' }}>{ev.time.split('-')[0]}</small>
                                <div className="h-100 border-start my-1" style={{ borderStyle: 'dashed' }}></div>
                            </div>
                            <div>
                                <h6 className="mb-0 small fw-bold">{ev.title}</h6>
                                <small className="text-muted" style={{ fontSize: '0.7rem' }}>{ev.time}</small>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-3 pt-3 border-top text-center">
                    <button className="btn btn-light btn-sm w-100 fw-bold">Yesterdays Events</button>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white min-vh-100 d-flex flex-column">
            <Navbar />
            <main className="flex-grow-1 p-4 bg-light">
                <div className="container">
                    <div className="row g-4 d-flex align-items-start">
                        {/* Added align-items-start to ensure columns don't stretch unnaturally if not needed, though stretching is fine if content is handled */}
                        {/* Left Sidebar */}
                        <div className="col-lg-3 col-md-4">
                            {renderMiniCalendar()}
                            {renderEventList()}
                        </div>

                        {/* Main Calendar */}
                        <div className="col-lg-9 col-md-8">
                            <div className="dashboard-card p-4" style={{ height: 'auto', minHeight: '100%' }}>
                                {renderHeader()}
                                {renderDays()}
                                {renderCells()}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Calendar;

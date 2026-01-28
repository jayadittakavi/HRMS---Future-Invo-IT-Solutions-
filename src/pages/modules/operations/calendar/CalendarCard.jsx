import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './DashboardLayout.css'; // Ensure styles are available

const CalendarCard = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const startDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const renderCalendarDays = () => {
        const totalDays = daysInMonth(currentDate);
        const startingEmpty = startDayOfMonth(currentDate);
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < startingEmpty; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

        // Days
        for (let i = 1; i <= totalDays; i++) {
            const isToday = isCurrentMonth && i === today.getDate();
            // We can also keep the specific "17th" highlight if strict adherence to reference is desired, 
            // but "Realtime usability" usually implies highlighting *today*.
            // Let's highlight today.

            days.push(
                <div key={i} className={`calendar-day ${isToday ? 'active' : ''}`}>
                    {i}
                </div>
            );
        }
        return days;
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="dashboard-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-dark mb-0">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h6>
                <div className="d-flex gap-1">
                    <button
                        className="btn btn-sm btn-light border px-2 py-0 d-flex align-items-center justify-content-center"
                        onClick={handlePrevMonth}
                        style={{ width: '28px', height: '28px' }}
                    >
                        <FaChevronLeft size={10} />
                    </button>
                    <button
                        className="btn btn-sm btn-primary px-2 py-0 d-flex align-items-center justify-content-center"
                        onClick={handleNextMonth}
                        style={{ width: '28px', height: '28px' }}
                    >
                        <FaChevronRight size={10} />
                    </button>
                </div>
            </div>
            <div className="calendar-grid">
                <div className="calendar-header-day">Sun</div>
                <div className="calendar-header-day">Mon</div>
                <div className="calendar-header-day">Tue</div>
                <div className="calendar-header-day">Wed</div>
                <div className="calendar-header-day">Thu</div>
                <div className="calendar-header-day">Fri</div>
                <div className="calendar-header-day">Sat</div>
                {renderCalendarDays()}
            </div>
        </div>
    );
};

export default CalendarCard;

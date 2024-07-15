import React from 'react';
//import './Calendar.css';

const Calendar = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'long' });

    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(year, currentDate.getMonth(), 1).getDay();

    const generateCalendar = () => {
        const calendarDays = [];
        for (let i = 0; i < firstDayIndex; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(
                <div key={day} className="calendar-day">
                    {day}
                </div>
            );
        }
        return calendarDays;
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button className="prev-button">&lt;</button>
                <div className="calendar-month">{`${month} ${year}`}</div>
                <button className="next-button">&gt;</button>
            </div>
            <div className="calendar-grid">
                <div className="calendar-day-name">Sun</div>
                <div className="calendar-day-name">Mon</div>
                <div className="calendar-day-name">Tue</div>
                <div className="calendar-day-name">Wed</div>
                <div className="calendar-day-name">Thu</div>
                <div className="calendar-day-name">Fri</div>
                <div className="calendar-day-name">Sat</div>
                {generateCalendar()}
            </div>
        </div>
    );
};

export default Calendar;

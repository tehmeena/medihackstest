import React from 'react';
import './Calendar.css';

const Calendar = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'long' });

    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();

    // Generate array of days in the month
    const daysArray = [...Array(daysInMonth).keys()];

    return (
        <div className="calendar-container">
            <div className="calendar">
                <h2 className="calendar-header">{month} {year}</h2>
                <div className="weekdays">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                <div className="days">
                    {daysArray.map((day) => (
                        <div key={day + 1} className={`day ${day + 1 === currentDate.getDate() ? 'today' : ''}`}>
                            {day + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;

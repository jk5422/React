import React, { useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import './DatePicker.css'; // Import your custom CSS

const DatePicker = () => {
    const [date, setDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (value) => {
        setDate(value);
        setInputValue(value ? value.toLocaleDateString('en-GB') : '');
        setShowCalendar(false);
    };

    const formatDateInput = (value) => {
        const cleanedValue = value.replace(/\D/g, '');
        let formattedValue = '';

        for (let i = 0; i < cleanedValue.length; i++) {
            if (i === 2) {
                formattedValue += '/'; // Add slash after the day
            } else if (i === 4) {
                formattedValue += '/'; // Add slash after the month
            }
            formattedValue += cleanedValue[i];
        }

        return formattedValue;
    };

    const handleInputChange = (e) => {
        const rawValue = e.target.value;
        const formattedValue = formatDateInput(rawValue);
        setInputValue(formattedValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const parts = inputValue.split('/');
            if (parts.length === 1 && parts[0]) {
                const day = parts[0];
                const currentDate = new Date();
                const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                setDate(newDate);
                setInputValue(newDate.toLocaleDateString('en-GB'));
                setShowCalendar(false);
            } else if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
                const day = parts[0];
                const month = parts[1] - 1; // month is 0-indexed in Date
                const year = parts[2];
                const newDate = new Date(year, month, day);
                setDate(newDate);
                setInputValue(newDate.toLocaleDateString('en-GB'));
                setShowCalendar(false);
            }
        }
    };

    return (
        <div className="date-picker">
            <div className="input-container">
                <input
                    type="text"
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="DD/MM/YYYY"
                    className="date-input"
                    onFocus={() => setShowCalendar(false)} // Prevent calendar from opening on focus
                />
                <span className="calendar-icon" onClick={toggleCalendar}>📅</span>
            </div>
            {showCalendar && (
                <div className="calendar-container">
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        className="react-calendar"
                    />
                </div>
            )}
        </div>
    );
};

export default DatePicker;

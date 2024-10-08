import React, { useRef, useEffect, useState } from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';

const CustomDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const datePickerRef = useRef(null);

    const handleDateChange = (e) => {
        setSelectedDate(e.value);
    };

    // Function to close the calendar manually
    const closeCalendar = () => {
        if (datePickerRef.current) {
            datePickerRef.current.toggleCalendar(false); // Close the calendar
        }
    };

    // Handle "Esc" key press
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                closeCalendar();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, []);

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log("inside the handleClickOutside")
            if (datePickerRef.current && !datePickerRef.current.element.contains(event.target)) {
                closeCalendar();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div>
            <DatePicker
                ref={datePickerRef}
                value={selectedDate}
                onChange={handleDateChange}
                format="dd/MM/yyyy"
                placeholder="Select a date"
            />
        </div>
    );
};

export default CustomDatePicker;

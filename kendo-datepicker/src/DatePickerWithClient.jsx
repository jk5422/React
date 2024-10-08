import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';

const DatePickerWithClient = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const datePickerRef = useRef(null);

    const handleDateChange = (e) => {
        setSelectedDate(e.value);
    };

    // Handle the open/close state manually
    const handleToggle = () => {
        setIsOpen(!isOpen); // Toggle the calendar visibility
    };

    // Function to close the calendar manually
    const closeCalendar = () => {
        setIsOpen(false); // Set the open state to false
    };

    // Handle outside clicks
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current) {
                const rect = datePickerRef.current.element.getBoundingClientRect();

                const isOutside =
                    event.clientX < rect.left || event.clientX > rect.right ||
                    event.clientY < rect.top || event.clientY > rect.bottom;

                if (isOutside) {
                    closeCalendar();
                }
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
                open={isOpen} // Control the open state manually
            />
            <button onClick={handleToggle}>
                Toggle Calendar
            </button>
        </div>
    );
};

export default DatePickerWithClient;

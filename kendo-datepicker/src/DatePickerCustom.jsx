import React, { useRef, useEffect, useState } from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';

const DatePickerOutSide = () => {
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

    // Handle outside click using clientX and clientY
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current) {
                // Get the bounding rectangle of the DatePicker element
                const rect = datePickerRef.current.element.getBoundingClientRect();

                // Check if the click was outside the DatePicker element
                const isOutside =
                    event.clientX < rect.left || event.clientX > rect.right ||
                    event.clientY < rect.top || event.clientY > rect.bottom;

                if (isOutside) {
                    console.log("inside the outside click condition")
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
            />
        </div>
    );
};

export default DatePickerOutSide;

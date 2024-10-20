import { useState } from "react";
import InputMask from "react-input-mask";
import "./styles.css";

export default function InputMaskDatePicker() {
    const [date, setDate] = useState("");
    const [datePickerDate, setDatePickerDate] = useState("");

    const lastday = (y, m) => new Date(y, m + 1, 0).getDate();

    const handleInputChange = (e) => {
        const inputElement = document.getElementById("date-input");
        const cursorPosBeforeChange = inputElement.selectionStart;
        let value = e.target.value.replace(/[^0-9/]/g, ""); // Allow only numbers and slashes
        const segments = value.split("/").filter(Boolean);

        let day = segments[0] || "";
        let month = segments[1] || "";
        let year = segments[2] || "";

        if (day.length > 2) day = day.slice(0, 2);
        if (month.length > 2) month = month.slice(0, 2);
        if (year.length > 4) year = year.slice(0, 4);

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        if (day.length === 2) {
            if (month.length === 2) {
                const lastDateOfMonth = lastday(year || currentYear, month - 1);
                day = Math.min(Number(day), lastDateOfMonth).toString().padStart(2, "0");
            } else {
                day = Math.min(Number(day), 31).toString().padStart(2, "0");
            }
        }

        if (month.length === 2) {
            month = Math.min(Number(month), 12).toString().padStart(2, "0");
        }

        if (year.length >= 4) {
            year = Math.min(Number(year.slice(0, 4)), 2999); // Limit to 2999
        }

        let newValue = [day, month, year].filter(Boolean).join("/");

        if (day.length === 2 && !month) newValue += "/";
        if (month.length === 2 && !year) newValue += "/";

        setDate(newValue);

        // Restore the cursor position if not a full valid date
        if (!newValue.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            setTimeout(() => {
                inputElement.setSelectionRange(cursorPosBeforeChange, cursorPosBeforeChange);
            }, 0);
        }
    };

    const handleKeyDown = (e) => {
        const inputElement = document.getElementById("date-input");
        const segments = date.split("/");

        if (e.key === "Enter") {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            let day = segments[0];
            let month = segments[1] || currentMonth.toString().padStart(2, "0");
            let year = segments[2] || currentYear.toString();

            if (segments[0] && !segments[1]) {
                setDate(`${day}/${month}/${year}`);
            } else if (segments[0] && segments[1]) {
                setDate(`${day}/${month}/${year}`);
            }

            // After setting the full date, move the cursor to the end of the entire string
            const finalDate = `${day}/${month}/${year}`;
            if (finalDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                setTimeout(() => {
                    const dateLength = finalDate.length;
                    inputElement.setSelectionRange(dateLength, dateLength); // Move cursor to the end
                }, 0);
            }

            e.preventDefault(); // Prevent further handling of "Enter"
        }
    };

    const convertToInputDateFormat = (dateStr) => {
        const [day, month, year] = dateStr.split(/[-\/]/);
        return `${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`;
    };

    const handleBlur = (e) => {
        if (e.target.value.length === 10) {
            setDatePickerDate(convertToInputDateFormat(e.target.value));
        }
    };

    return (
        <div className="date-picker">
            <InputMask
                id="date-input"
                value={date}
                className="date-picker-input"
                mask="99/99/9999"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />

            <input
                type="date"
                className="calendar"
                value={datePickerDate}
                onChange={(e) => {
                    const selectedDate = new Date(e.target.value).toLocaleDateString("en-GB");
                    setDate(selectedDate);
                    setDatePickerDate(e.target.value);
                }}
            />
        </div>
    );
}


{/*https://chatgpt.com/share/67153fa7-ed98-8011-83c1-ed4a36d24bec --> svg use in typescript*/ }
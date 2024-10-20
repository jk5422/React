import { useState, useRef } from "react";
import InputMask from 'react-input-mask';
import "./styles.css";

export default function InputMaskDatePicker() {
    const [date, setDate] = useState("");
    const [datePickerDate, setDatePickerDate] = useState("");
    const inputRef = useRef(null);

    const lastday = (y, m) => {
        return new Date(y, m + 1, 0).getDate();
    };

    const handleInputChange = (e) => {
        const cursorPosBeforeChange = inputRef.current.selectionStart; // Get cursor position before change
        let value = e.target.value?.replace(/[^0-9/]/g, ""); // Allow only numbers and slashes
        const segments = value?.split("/").filter(Boolean);

        let day = segments[0] || "";
        let month = segments[1] || "";
        let year = segments[2] || "";

        // Limit the input length
        if (day.length > 2) day = day.slice(0, 2);
        if (month.length > 2) month = month.slice(0, 2);
        if (year.length > 4) year = year.slice(0, 4);

        // Get current date details
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        // Validate day (dd)
        if (day.length === 2) {
            if (month.length === 2) {
                const lastDateOfMonth =
                    !month && !year
                        ? lastday(currentYear, month - 1)
                        : lastday(year, month - 1); // Last date based on selected month & year
                day = Math.min(Number(day), lastDateOfMonth)
                    .toString()
                    .padStart(2, "0");
            } else {
                day = Math.min(Number(day), 31).toString().padStart(2, "0");
            }
        }

        // Validate month (mm)
        if (month.length === 2) {
            month = Math.min(Number(month), 12).toString().padStart(2, "0");
        }

        // Ensure year is valid and 4 digits long
        if (year.length >= 4) {
            // year = year.slice(0, 4); // Limit to 4 characters
            year = Math.min(year.slice(0, 4), 2999); // Limit to 4 characters
        }

        // Prevent invalid dates
        if (day === "00" || month === "00" || year === "0000") {
            return; // Do not update if the date is invalid
        }

        // Build the final value
        let newValue = [day, month, year].filter(Boolean).join("/");

        // Automatically add slashes while editing
        if (day.length === 2 && !month) newValue += "/";
        if (month.length === 2 && !year) newValue += "/";

        // Update the input and restore cursor position
        setDate(newValue);
        setDatePickerDate(convertToInputDateFormat(newValue));
        const newCursorPos = calculateCursorPosition(
            cursorPosBeforeChange,
            newValue
        );

        setTimeout(() => {
            inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const calculateCursorPosition = (prevCursorPos, value) => {
        const segments = value.split("/");
        let newCursorPos = prevCursorPos;

        const dayLength = segments[0]?.length;
        const monthLength = segments[1]?.length;

        if (prevCursorPos <= 2) {
            newCursorPos = Math.min(prevCursorPos, dayLength); // Stay in the day part
            if (dayLength === 2) newCursorPos += 1; // Move cursor after slash if day is complete
        } else if (prevCursorPos > 2 && prevCursorPos <= 5) {
            newCursorPos = 3 + Math.min(prevCursorPos - 3, monthLength); // Stay in month part
            if (monthLength === 2) newCursorPos += 1; // Move cursor after slash if month is complete
        } else if (prevCursorPos > 5) {
            newCursorPos = 6 + Math.min(prevCursorPos - 6, 4); // Stay in year part
        }

        return newCursorPos;
    };

    const handleKeyDown = (e) => {
        const cursorPosition = inputRef.current.selectionStart;
        const segments = date.split("/");

        // Handle auto-filling date when Enter or Tab is pressed
        if (e.key === "Enter" || e.key === "Tab") {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
            const nextYear = currentYear + 1;

            if (segments[0] && segments[0] > 0 && !segments[1]) {
                const newDate = `${segments[0]?.padStart(2, "0")}/${String(currentMonth).padStart(2, "0")}/${currentYear}`;
                setDate(newDate);
                setTimeout(() => {
                    inputRef.current.value = newDate;
                }, 0);
            }

            if (segments[0] && segments[1]) {
                let day = segments[0];
                let month = segments[1];
                let year = segments[2] || "";

                if (year && (year.length === 2 || year.length === 1)) {
                    year = `${currentYear.toString().slice(0, 2)}${year.padStart(2, "0")}`;
                } else if (!year && parseInt(month) > 0) {
                    year = parseInt(month) >= 4 ? currentYear.toString() : nextYear.toString();
                }

                const newDate = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
                setDate(newDate);
                setDatePickerDate(convertToInputDateFormat(newDate));

                // Move cursor to the end of the input
                setTimeout(() => {
                    inputRef.current.setSelectionRange(newDate.length, newDate.length);
                }, 0);
            }

            return; // Prevent further handling of Enter/Tab
        }

        // Clear input if entire input is selected and Backspace/Delete is pressed
        if ((e.key === "Backspace" || e.key === "Delete") && inputRef.current.selectionStart === 0 && inputRef.current.selectionEnd === date.length) {
            e.preventDefault();
            setDate("");
            setTimeout(() => {
                inputRef.current.setSelectionRange(0, 0); // Set cursor at the start
            }, 0);
            return;
        }

        // Prevent segment shifting by ensuring that each backspace/delete action removes characters only within the current segment
        if (e.key === "Backspace") {
            if (cursorPosition <= 2) {
                e.preventDefault(); // Prevent default backspace behavior
                if (segments[0] && segments[0].length > 0) {
                    const newDay = segments[0].slice(0, -1);
                    setDate(newDay + "/" + (segments[1] || "") + "/" + (segments[2] || ""));
                    setTimeout(() => {
                        inputRef.current.setSelectionRange(newDay.length, newDay.length);
                    }, 0);
                } else {
                    setDate("/" + (segments[1] || "") + "/" + (segments[2] || ""));
                    setTimeout(() => {
                        inputRef.current.setSelectionRange(1, 1);
                    }, 0);
                }
            } else if (cursorPosition > 2 && cursorPosition <= 5) {
                e.preventDefault();
                const newMonth = segments[1] ? segments[1].slice(0, -1) : "";
                setDate(segments[0] + "/" + newMonth + "/" + (segments[2] || ""));
                setTimeout(() => {
                    inputRef.current.setSelectionRange(3 + newMonth.length, 3 + newMonth.length);
                }, 0);
            } else if (cursorPosition > 5) {
                e.preventDefault();
                const newYear = segments[2] ? segments[2].slice(0, -1) : "";
                setDate(segments[0] + "/" + (segments[1] || "") + "/" + newYear);
                setTimeout(() => {
                    inputRef.current.setSelectionRange(6 + newYear.length, 6 + newYear.length);
                }, 0);
            }
        }

        // Handle Delete key similarly for each segment
        if (e.key === "Delete") {
            if (cursorPosition <= 2) {
                e.preventDefault();
                const newDay = segments[0]?.slice(1) || "";
                setDate(newDay + "/" + (segments[1] || "") + "/" + (segments[2] || ""));
                setTimeout(() => {
                    inputRef.current.setSelectionRange(0, 0);
                }, 0);
            } else if (cursorPosition > 2 && cursorPosition <= 5) {
                e.preventDefault();
                const newMonth = segments[1] ? segments[1].slice(1) : "";
                setDate(segments[0] + "/" + newMonth + "/" + (segments[2] || ""));
                setTimeout(() => {
                    inputRef.current.setSelectionRange(3, 3);
                }, 0);
            } else if (cursorPosition > 5) {
                e.preventDefault();
                const newYear = segments[2] ? segments[2].slice(1) : "";
                setDate(segments[0] + "/" + (segments[1] || "") + "/" + newYear);
                setTimeout(() => {
                    inputRef.current.setSelectionRange(6, 6);
                }, 0);
            }
        }
    };


    const handleFocus = (e) => {
        const cursorPosition = e.target.selectionStart;
        setTimeout(() => {
            inputRef.current.setSelectionRange(0, date.length); // Select the whole date
        }, 0);
    };

    // Function to convert "DD/MM/YYYY" back to "YYYY-MM-DD" or ISO standard formate
    const convertToInputDateFormat = (dateStr) => {
        // const [day, month, year] = dateStr?.split("/");
        const [day, month, year] = dateStr.split(/[-\/]/);
        return `${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`;
    };

    const handleBlur = (e) => {
        const segments = e.target.value?.split("/");
        let dd = segments[0] || "";
        let mm = segments[1] || "";
        let year = segments[2] || "";

        if (e.target.value !== "" && e.target.value.length === 10) {
            setDatePickerDate(convertToInputDateFormat(e.target.value));
        }

        if (e.target.value?.length < 10) {
            setDate("");
        }
    };

    return (
        <div className="date-picker">

            <InputMask
                value={date}
                className="date-picker-input"
                mask="99/99/9999"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e)}
                ref={inputRef}
            />


            <input
                type="date"
                className="calendar"
                value={datePickerDate}
                onChange={(e) => {
                    if (
                        e.target.value !== "" &&
                        new Date(e.target.value).toISOString().split("T")[0] <=
                        new Date("2999-12-31").toISOString().split("T")[0]
                    ) {
                        const selectedDate = new Date(e.target.value).toLocaleDateString(
                            "en-GB"
                        );
                        setDate(selectedDate);
                        setDatePickerDate(e.target.value);
                    } else if (e.target.value === "") {
                        setDate("");
                        setDatePickerDate("");
                    }
                }}
            />
        </div>
    );
}

import { useState, useRef } from "react";
import "./styles.css";

export default function StandardDatePicker() {
    const [date, setDate] = useState("");
    const [datePickerDate, setDatePickerDate] = useState("");
    const inputRef = useRef(null);

    const lastday = (y, m) => {
        return new Date(y, m + 1, 0).getDate();
    };

    const handleInputChange = (e) => {
        const cursorPosBeforeChange = inputRef.current.selectionStart;
        let value = e.target.value?.replace(/[^0-9/]/g, ""); // Allow only numbers and slashes
        const segments = value?.split("/").filter(Boolean);

        let day = segments[0] || "";
        let month = segments[1] || "";
        let year = segments[2] || "";

        // Limit the input length
        if (day.length > 2) day = day.slice(0, 2);
        if (month.length > 2) month = month.slice(0, 2);
        if (year.length > 4) year = year.slice(0, 4);

        // Validate day (dd)
        if (day.length === 2) {
            day = Math.min(Number(day), 31).toString().padStart(2, "0");
        }

        // Validate month (mm)
        if (month.length === 2) {
            month = Math.min(Number(month), 12).toString().padStart(2, "0");
        }

        // Handle clearing all segments (empty input)
        let newValue = "";
        if (day || month || year) {
            newValue = [day, month, year].filter(Boolean).join("/");
        }

        // Automatically add slashes while editing, but not when day and month are both empty
        if (day.length === 2 && !month && newValue) newValue += "/";
        if (month.length === 2 && !year && newValue) newValue += "/";

        // Update the input and restore cursor position
        setDate(newValue);
        setDatePickerDate(convertToInputDateFormat(newValue));
        const newCursorPos = calculateCursorPosition(cursorPosBeforeChange, newValue);

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

    const handleKeyPress = (e) => {
        const cursorPosition = inputRef.current.selectionStart; // Get cursor position before change

        if (e.key === "Enter") {
            const segments = date.split("/");
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
            const nextYear = currentYear + 1;

            // If only day is entered, append the current month and year
            if (segments[0] && segments[0] > 0 && !segments[1]) {
                // if (segments[0] && segments[0].length === 2 && !segments[1]) {
                const newDate = `${segments[0]?.toString().padStart(2, "0")}/${String(
                    currentMonth
                ).padStart(2, "0")}/${currentYear}`;
                setDate(newDate);
                setTimeout(() => {
                    inputRef.current.value = newDate;
                }, 0);
            }

            if (segments[0] && segments[1]) {
                const day = segments[0];
                const month = segments[1];
                let year = segments[2] || ""; // Extract the year segment if present

                // Check if the year segment is 2 digits or less and add the current century
                if (year && (year.length === 2 || year.length === 1)) {
                    // if (year.length === 2 || year.length === 1) {
                    year = `${currentYear.toString().slice(0, 2)}${year.padStart(
                        2,
                        "0"
                    )}`;
                } else if (
                    !year ||
                    (year && cursorPosition >= 3 && cursorPosition <= 6)
                ) {
                    // decide year based on the month
                    if (parseInt(month) >= 4) {
                        year = currentYear.toString();
                    } else {
                        year = nextYear.toString();
                    }
                }

                // Construct the new date
                const newDate = `${day.toString().padStart(2, "0")}/${month
                    ?.toString()
                    .padStart(2, "0")}/${year}`;
                setDate(newDate);
                setDatePickerDate(convertToInputDateFormat(newDate));

                // Move cursor to the end of the input
                setTimeout(() => {
                    inputRef.current.setSelectionRange(newDate.length, newDate.length);
                }, 0);
            }
        }
    };

    const handleKeyDown = (e) => {
        const cursorPosition = inputRef.current.selectionStart;
        const segments = date.split("/");

        // Handle Ctrl + A selection
        if (e.ctrlKey && e.key === "a") {
            e.preventDefault(); // Prevent default select all behavior
            inputRef.current.select(); // Select the entire input
            return; // Exit the function after selecting
        }

        // Clear input on Backspace or Delete when everything is selected (Ctrl + A)
        if (
            (e.key === "Backspace" || e.key === "Delete") &&
            inputRef.current.selectionStart === 0 &&
            inputRef.current.selectionEnd === date.length
        ) {
            e.preventDefault(); // Prevent default behavior
            setDate(""); // Clear entire date
            setTimeout(() => {
                inputRef.current.setSelectionRange(0, 0); // Set cursor at the start
            }, 0);
            return; // Exit the function
        }

        // Clear input if only slashes remain (e.g., when dd and mm are removed)
        if (date === "//" || date === "///") {
            e.preventDefault(); // Prevent default behavior
            setDate(""); // Clear entire date
            setTimeout(() => {
                inputRef.current.setSelectionRange(0, 0); // Set cursor at the start
            }, 0);
            return; // Exit the function
        }

        // Handle Backspace for the dd segment
        if (e.key === "Backspace") {
            if (cursorPosition <= 2) {
                e.preventDefault(); // Prevent default backspace behavior

                if (segments[0] && segments[0].length > 0) {
                    // Remove one character from dd segment
                    const newDay = segments[0].slice(0, -1); // Remove last character of dd

                    // If newDay is empty and both mm and yyyy are also empty, clear the entire input
                    if (newDay === "" && !segments[1] && !segments[2]) {
                        setDate(""); // Clear entire date if dd, mm, and yyyy are empty
                        setTimeout(() => {
                            inputRef.current.setSelectionRange(0, 0); // Set cursor at the start
                        }, 0);
                        return; // Exit the function
                    }

                    // Only display slashes if mm or yyyy exists
                    let updatedDate = newDay;
                    if (segments[1] || segments[2]) {
                        updatedDate += "/" + (segments[1] || "") + "/" + (segments[2] || "");
                    }

                    setDate(updatedDate); // Update date
                    setTimeout(() => {
                        inputRef.current.setSelectionRange(newDay.length, newDay.length); // Move cursor to the end of dd
                    }, 0);
                } else {
                    // If dd is fully cleared
                    let updatedDate = "/";
                    if (segments[1] || segments[2]) {
                        updatedDate += (segments[1] || "") + "/" + (segments[2] || "");
                    }

                    setDate(updatedDate); // Update date
                    setTimeout(() => {
                        inputRef.current.setSelectionRange(1, 1); // Move cursor to before the first slash
                    }, 0);

                    // If mm and yyyy are empty, also clear the slashes
                    if (!segments[1] && !segments[2]) {
                        setDate(""); // Clear entire date if mm and yyyy are empty
                    }
                }

                return; // Exit the function
            } else if (cursorPosition === 3) {
                // If at the month separator, move cursor back to day segment
                e.preventDefault(); // Prevent default backspace behavior
                setDate(segments[0]); // Set date to only the day part
                setTimeout(() => {
                    inputRef.current.setSelectionRange(
                        segments[0].length,
                        segments[0].length
                    ); // Move cursor to the end of dd
                }, 0);
                return; // Exit the function
            } else if (cursorPosition === 6) {
                // Handle Backspace for mm segment
                e.preventDefault(); // Prevent default backspace behavior
                if (segments[1] && segments[1].length > 0) {
                    const newMonth = segments[1].slice(0, -1); // Remove last character of mm
                    setDate(segments[0] + "/" + newMonth + "/" + (segments[2] || "")); // Update date while keeping dd/yyyy
                    setTimeout(() => {
                        inputRef.current.setSelectionRange(
                            segments[0].length + 1 + newMonth.length,
                            segments[0].length + 1 + newMonth.length
                        ); // Move cursor to the end of mm
                    }, 0);
                } else {
                    // If mm is fully cleared
                    setDate(segments[0] + "//" + (segments[2] || "")); // Keep dd and clear mm
                    setTimeout(() => {
                        inputRef.current.setSelectionRange(segments[0].length + 1, segments[0].length + 1); // Move cursor to after the first slash
                    }, 0);
                }

                return; // Exit the function
            } else if (cursorPosition > 6) {
                // Handle Backspace for yyyy segment
                e.preventDefault(); // Prevent default backspace behavior
                if (segments[2] && segments[2].length > 0) {
                    const newYear = segments[2].slice(0, -1); // Remove last digit of year
                    setDate(segments[0] + "/" + (segments[1] || "") + "/" + newYear); // Update date while keeping dd/mm
                    setTimeout(() => {
                        inputRef.current.setSelectionRange(
                            segments[0].length +
                            (segments[1] ? segments[1].length : 0) +
                            2 +
                            newYear.length,
                            segments[0].length +
                            (segments[1] ? segments[1].length : 0) +
                            2 +
                            newYear.length
                        ); // Move cursor to the end of year
                    }, 0);
                }
            }
        }
    };

    const handleFocus = (e) => {
        setTimeout(() => {
            inputRef.current.setSelectionRange(0, date.length); // Select the whole date
        }, 0);
    };

    // Function to convert "DD/MM/YYYY" back to "YYYY-MM-DD"
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
            // for dd segment if 0 or null
            if (dd === "" || dd === 0) {
                dd += "/";
            } else {
                dd = dd.toString().padStart(2, "0") + "/";
            }

            // for mm segment if 0 or null
            if (mm === "" || mm === 0) {
                mm += "/";
            } else {
                mm = mm.toString().padStart(2, "0") + "/";
            }

            if (
                (dd === "" && mm === "" && year === "") ||
                (dd === "/" && mm === "/")
            ) {
                setDate("");
                return;
            }
            // Build the final value
            let newValue = `${dd}${mm}${year}`;
            setDate(newValue);
        }
    };

    return (
        <div className="date-picker">
            <input
                type="text"
                value={date}
                className="date-picker-input"
                placeholder="__/__/____"
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e)}
                maxLength={10}
                ref={inputRef}
            />

            <input
                type="date"
                className="calendar"
                value={datePickerDate}
                onChange={(e) => {
                    if (e.target.value !== "") {
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

import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

const EmailInputMask: React.FC = () => {
    const [value, setValue] = useState(""); // Email value
    const [insertedAtOrDot, setInsertedAtOrDot] = useState(false); // Track if @ or . was inserted automatically
    const [cursorPosition, setCursorPosition] = useState(0); // Track the cursor position

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        let caretPosition = e.target.selectionStart || 0;
        let wasInserted = false;

        // Automatically insert '@' only if it's missing
        if (!inputValue.includes('@') && inputValue.length > 1) {
            inputValue = inputValue.slice(0, caretPosition) + '@' + inputValue.slice(caretPosition);
            caretPosition += 1; // Adjust caret position after inserting '@'
            wasInserted = true;
        }

        // Automatically insert '.' only if it's missing and there is an '@'
        if (inputValue.includes('@') && !inputValue.includes('.') && inputValue.length > inputValue.indexOf('@') + 2) {
            inputValue = inputValue.slice(0, caretPosition) + '.' + inputValue.slice(caretPosition);
            caretPosition += 1; // Adjust caret position after inserting '.'
            wasInserted = true;
        }

        setValue(inputValue);
        setInsertedAtOrDot(wasInserted);
        setCursorPosition(caretPosition);
    };

    // Handle key down events (e.g., arrow keys, spacebar)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const caretPosition = (e.target as HTMLInputElement).selectionStart || 0;

        // Allow the user to manually delete @ and . using backspace
        if (e.key === 'Backspace' || e.key === 'Delete') {
            if (caretPosition === value.indexOf('@') + 1 || caretPosition === value.indexOf('.') + 1) {
                e.preventDefault(); // Allow @ and . to be deleted manually
                setValue(prevValue => prevValue.slice(0, caretPosition - 1) + prevValue.slice(caretPosition));
                setCursorPosition(caretPosition - 1);
            }
        }

        // Move cursor ahead if pressing spacebar or arrow keys directly before @ or .
        const atIndex = value.indexOf('@');
        const dotIndex = value.indexOf('.');
        if (
            (caretPosition === atIndex || caretPosition === dotIndex) &&
            (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown')
        ) {
            e.preventDefault(); // Prevent default behavior
            setCursorPosition(caretPosition + 1); // Move cursor one step ahead
            setInsertedAtOrDot(false); // Allow manual cursor movement after automatic insertion
        }
    };

    // Update the cursor position after input changes
    useEffect(() => {
        const inputElement = document.getElementById('email-input') as HTMLInputElement;
        if (inputElement) {
            if (insertedAtOrDot) {
                inputElement.setSelectionRange(cursorPosition - 1, cursorPosition - 1); // Keep cursor in place after automatic insertion
            } else {
                inputElement.setSelectionRange(cursorPosition, cursorPosition); // Normal behavior
            }
        }
    }, [cursorPosition, insertedAtOrDot]);

    return (
        <div>
            <label htmlFor="email-input">Enter Email:</label>
            <InputMask
                mask=""                          // No specific mask for the email
                value={value}                    // Controlled input value
                onChange={handleInputChange}     // Handle input change and automatic '@' and '.'
                onKeyDown={handleKeyDown}        // Handle arrow key, spacebar, and backspace behavior
                maskChar={null}                  // No mask character
                id="email-input"                 // ID for the input element
                placeholder="Enter your email"   // Placeholder text
            />
            {/* Basic validation error message */}
            {value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && (
                <span style={{ color: 'red' }}>Please enter a valid email.</span>
            )}
        </div>
    );
};

export default EmailInputMask;

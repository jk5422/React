import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

interface EmailInputMaskProps {
    value: string;
    id: string;
    className?: string;
    name?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    [key: string]: any;
}

const EmailInputMask: React.FC<EmailInputMaskProps> = () => {
    const [value, setValue] = useState(""); // Email value
    const [insertedAtOrDot, setInsertedAtOrDot] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        let caretPosition = e.target.selectionStart || 0;
        let wasInserted = false;

        // If the input is empty or only has one character, prevent auto-insertion
        if (inputValue.length <= 1) {
            setValue(inputValue);
            setCursorPosition(caretPosition);
            return;
        }

        // Prevent inserting @ or . if it's already there
        if (inputValue[caretPosition - 1] === '@' && inputValue[caretPosition] === '@') {
            e.preventDefault();
            setCursorPosition(caretPosition + 1);
            return;
        }

        if (inputValue[caretPosition - 1] === '.' && inputValue[caretPosition] === '.') {
            e.preventDefault();
            setCursorPosition(caretPosition + 1);
            return;
        }

        // Insert '@' if it's missing after the first character
        if (!inputValue.includes('@') && inputValue.length > 1) {
            inputValue = inputValue.slice(0, caretPosition) + '@' + inputValue.slice(caretPosition);
            caretPosition += 1;
            wasInserted = true;
        }

        // Insert '.' after '@' if missing and there are enough characters after '@'
        if (inputValue.includes('@') && !inputValue.includes('.') && inputValue.length > inputValue.indexOf('@') + 2) {
            inputValue = inputValue.slice(0, caretPosition) + '.' + inputValue.slice(caretPosition);
            caretPosition += 1;
            wasInserted = true;
        }

        setValue(inputValue);
        setInsertedAtOrDot(wasInserted);
        setCursorPosition(caretPosition);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const caretPosition = (e.target as HTMLInputElement).selectionStart || 0;
        const isCtrlA = e.ctrlKey && e.key === 'a';
        const isBackspaceOrDelete = e.key === 'Backspace' || e.key === 'Delete';

        if (isCtrlA) {
            const inputElement = e.target as HTMLInputElement;
            inputElement.setSelectionRange(0, value.length);
        }

        if (isBackspaceOrDelete && (e.target as HTMLInputElement).selectionStart === 0 && (e.target as HTMLInputElement).selectionEnd === value.length) {
            e.preventDefault();
            setValue('');
            setCursorPosition(0);
            return;
        }

        if (isBackspaceOrDelete) {
            if (caretPosition === value.indexOf('@') + 1 || caretPosition === value.indexOf('.') + 1) {
                e.preventDefault();
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
            e.preventDefault();
            setCursorPosition(caretPosition + 1);
            setInsertedAtOrDot(false);
        }
    };

    useEffect(() => {
        const inputElement = document.getElementById('email-input') as HTMLInputElement;
        if (inputElement) {
            if (insertedAtOrDot) {
                inputElement.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
            } else {
                inputElement.setSelectionRange(cursorPosition, cursorPosition);
            }
        }
    }, [cursorPosition, insertedAtOrDot]);

    return (
        <div>
            <label htmlFor="email-input">Enter Email:</label>
            <InputMask
                mask=""
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                maskChar={null}
                id="email-input"
                placeholder="Enter your email"
            />
            {/* Basic validation error message */}
            {value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && (
                <span style={{ color: 'red' }}>Please enter a valid email.</span>
            )}
        </div>
    );
};

export default EmailInputMask;

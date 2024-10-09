import React, { useState, useRef } from 'react';
import InputMask from 'react-input-mask';

interface PANCardInputMaskProps {
    id: string;
    className?: string;
    name?: string;
    isRequired?: boolean;
    onValid?: () => void; // Callback when valid PAN is entered
    [key: string]: any;
}

const PANCardInputMask: React.FC<PANCardInputMaskProps> = ({
    id,
    className,
    name,
    isRequired = true,
    onValid,
    ...rest
}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // PAN card validation regex: 5 uppercase letters, 4 digits, 1 uppercase letter
    const panCardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toUpperCase(); // Always uppercase for PAN
        setValue(inputValue);

        if (panCardRegex.test(inputValue)) {
            setError(''); // No error if the PAN is valid
        } else {
            setError('Invalid PAN card number.'); // Show error for invalid PAN
        }
    };

    // Handle key press (prevent moving on Enter/Tab if invalid)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === 'Tab') && !panCardRegex.test(value)) {
            e.preventDefault();
            inputRef.current?.focus(); // Keep focus on the PAN input field
            setError('Please enter a valid PAN card number.'); // Display error
        }
    };

    // Handle blur (re-focus if invalid)
    const handleBlur = () => {
        if (!panCardRegex.test(value)) {
            setError('Please enter a valid PAN card number.');
            inputRef.current?.focus(); // Bring focus back to input if invalid
        } else {
            setError(''); // Clear error if valid
            onValid?.(); // Optional callback when valid PAN is entered
        }
    };

    return (
        <div className={className}>
            <label htmlFor={id}>Enter PAN Card:</label>
            <InputMask
                mask="aaaaa9999a" // PAN mask
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder="ABCDE1234F"
                maskChar={null} // Don't display any extra character in mask
                ref={inputRef}
                id={id}
                {...rest}
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
        </div>
    );
};

export default PANCardInputMask;

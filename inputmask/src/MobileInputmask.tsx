import React, { useState } from 'react';
import InputMask from 'react-input-mask';

interface MobileNumberInputProps {
    id?: string;
    name?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
}

const MobileNumberInput: React.FC<MobileNumberInputProps> = ({
    id,
    name,
    className,
    value: propValue,
    onChange,
    onBlur,
    isRequired = false
}) => {
    const [value, setValue] = useState<string>(propValue || "");

    // Handle input changes and ensure valid mobile number format
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Only update value if it's a valid mobile number in the format of 99999-99999
        const mobileNumberPattern = /^\d{0,5}-?\d{0,5}$/;
        if (mobileNumberPattern.test(inputValue)) {
            setValue(inputValue);
            if (onChange) {
                onChange(e); // Trigger onChange prop if available
            }
        }
    };

    // Handle the focus event to ensure cursor is positioned correctly
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!value) {
            setValue(""); // Ensure the field is empty initially
        }
    };

    // Prevent user from entering invalid characters
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const invalidChars = ['e', 'E', '+', '-', '.'];
        if (invalidChars.includes(e.key)) {
            e.preventDefault(); // Prevent invalid key presses
        }
    };

    return (
        <div>
            <label htmlFor={id || 'mobile-number-input'}>
                {isRequired && <span style={{ color: 'red' }}>*</span>} Enter Mobile Number:
            </label>
            <InputMask
                id={id}
                name={name}
                className={className}
                mask="99999-99999"             // Mask for the mobile number
                value={value}                   // Controlled input value
                onChange={handleInputChange}    // Validate and restrict input
                onFocus={handleFocus}           // Focus behavior
                onBlur={onBlur}                 // Pass down onBlur handler
                onKeyDown={handleKeyDown}       // Prevent invalid key presses
                maskChar={null}                 // No additional mask characters
                style={{ textAlign: 'left' }}   // Align the input correctly
                placeholder="99999-99999"       // Placeholder for the input
            />
        </div>
    );
};

export default MobileNumberInput;

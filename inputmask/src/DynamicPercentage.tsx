import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

interface PercentageInputMaskProps {
    id?: string;
    name?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    decimalPoints?: number; // Decimal precision, default 2
    allowNegative?: boolean; // New prop to allow negative values
}

const DynamicPercentage: React.FC<PercentageInputMaskProps> = ({
    id,
    name,
    className,
    value: propValue,
    onChange,
    onKeyDown,
    onBlur,
    isRequired = false,
    decimalPoints = 2, // Default value for decimal places
    allowNegative = false // Default to not allow negative values
}) => {
    const [value, setValue] = useState<string>(propValue || "");

    // Regex pattern to handle dynamic decimal precision and optional negative values
    const decimalPattern = new RegExp(
        `^${allowNegative ? '-?' : ''}\\d*\\.?\\d{0,${decimalPoints}}$`
    );

    useEffect(() => {
        // Keep internal value in sync with prop value
        if (propValue !== undefined) {
            setValue(propValue);
        }
    }, [propValue]);

    // Handle input changes and ensure valid percentage
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        // Allow '-' at the start if negative values are allowed
        if (allowNegative && inputValue === "-") {
            setValue(inputValue);
            if (onChange) {
                onChange(e);
            }
            return;
        }

        // Prepend '0' if input starts with '.'
        if (inputValue.startsWith('.')) {
            inputValue = '0' + inputValue;
        }

        // Remove leading zeros unless it's a valid decimal like 0.55 or -0.55
        if (inputValue.startsWith('-0') && inputValue.length > 2 && inputValue[2] !== '.') {
            inputValue = inputValue.replace(/^-0+/, '-');
        } else if (inputValue.startsWith('0') && inputValue.length > 1 && inputValue[1] !== '.') {
            inputValue = inputValue.replace(/^0+/, '');
        }

        // Match the input with the dynamic regex pattern
        if (decimalPattern.test(inputValue)) {
            const percentageValue = parseFloat(inputValue);

            // Ensure percentage is between -100 and 100 if negative is allowed, or just 0-100
            if (!isNaN(percentageValue) && percentageValue <= 100 && (allowNegative || percentageValue >= 0)) {
                setValue(inputValue); // Update internal value
                if (onChange) {
                    onChange(e); // Trigger onChange prop if available
                }
            } else if (inputValue === "") {
                setValue(""); // Allow clearing the input
                if (onChange) {
                    onChange(e);
                }
            }
        }
    };

    // Handle blur event to replace '-' with '0' if needed
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (value === "-") {
            setValue("0"); // Replace '-' with '0' on blur
            if (onChange) {
                const modifiedEvent = { ...e, target: { ...e.target, value: "0" } };
                onChange(modifiedEvent as React.ChangeEvent<HTMLInputElement>);
            }
        }
        if (onBlur) {
            onBlur(e); // Pass the blur event to the parent if provided
        }
    };

    // Handle focus events
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!value) {
            setValue(""); // Ensure no pre-filling with "0"
        }
    };

    return (
        <div>
            <label htmlFor={id || 'percentage-input'}>
                {isRequired && <span style={{ color: 'red' }}>*</span>} Enter Percentage:
            </label>
            <InputMask
                id={id}
                name={name}
                className={className}
                mask=""                          // No specific mask
                value={value}                    // Controlled input value
                onChange={handleInputChange}     // Validate and restrict input
                onFocus={handleFocus}            // Focus behavior
                onKeyDown={onKeyDown}            // Pass down onKeyDown handler
                onBlur={handleBlur}              // Handle blur event with validation
                maskChar={null}                  // No additional mask characters
                style={{ textAlign: 'right' }}   // Right-align the input for better UX
                placeholder={`Enter percentage (${decimalPoints} decimal${decimalPoints > 1 ? 's' : ''})`} // Dynamic placeholder
            />
        </div>
    );
};

export default DynamicPercentage;

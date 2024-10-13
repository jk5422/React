import React, { useState, useEffect, useRef } from 'react';
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
    const [value, setValue] = useState<string>(propValue || '');
    const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

    // Regex pattern to handle dynamic decimal precision and optional negative values
    const decimalPattern = new RegExp(
        `^${allowNegative ? '-?' : ''}\\d*\\.?\\d{0,${decimalPoints}}$`
    );

    useEffect(() => {
        if (propValue !== undefined) {
            setValue(propValue);
        }
    }, [propValue]);

    // Handle input changes and ensure valid percentage
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = e.target;
        let inputValue = inputElement.value.replace('%', ''); // Remove % for validation
        const cursorPosition = inputElement.selectionStart || 0; // Get current cursor position

        // Handle '-' for negative values
        if (allowNegative && inputValue === '-') {
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

        // Handle leading zeros
        if (inputValue.startsWith('-0') && inputValue.length > 2 && inputValue[2] !== '.') {
            inputValue = inputValue.replace(/^-0+/, '-');
        } else if (inputValue.startsWith('0') && inputValue.length > 1 && inputValue[1] !== '.') {
            inputValue = inputValue.replace(/^0+/, '');
        }

        // Match input with regex pattern
        if (decimalPattern.test(inputValue)) {
            const percentageValue = parseFloat(inputValue);
            if (!isNaN(percentageValue) && percentageValue <= 100 && (allowNegative || percentageValue >= 0)) {
                const newValue = inputValue + '%'; // Append % during input
                setValue(newValue);

                // Manage cursor position after percentage is appended
                setTimeout(() => {
                    if (inputRef.current) {
                        const newCursorPosition = newValue.indexOf('%') > 0 ? newValue.indexOf('%') - (inputValue.length - cursorPosition) : cursorPosition;
                        inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
                    }
                }, 0);

                if (onChange) {
                    const modifiedEvent = { ...e, target: { ...e.target, value: inputValue } }; // Pass value without %
                    onChange(modifiedEvent as React.ChangeEvent<HTMLInputElement>);
                }
            } else if (inputValue === '') {
                setValue(''); // Allow clearing the input
                if (onChange) {
                    onChange(e);
                }
            }
        }
    };

    // Handle blur event to remove the % sign when the input loses focus
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const cleanValue = value.replace('%', ''); // Remove % on blur
        const formattedValue = parseFloat(cleanValue).toFixed(decimalPoints); // Fix to decimal points if greater than 0
        const finalValue = isNaN(parseFloat(cleanValue)) || parseFloat(cleanValue) === 0 ? '' : formattedValue; // If value is 0, clear it
        setValue(finalValue); // Update internal state

        if (onBlur) {
            const modifiedEvent = { ...e, target: { ...e.target, value: finalValue } }; // Pass the cleaned value on blur
            onBlur(modifiedEvent); // Trigger the onBlur prop
        }
    };

    // Handle keydown event for managing cursor behavior
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { selectionStart } = e.currentTarget;
        const decimalIndex = value.indexOf('.');

        if (e.key === '.' && selectionStart !== null && decimalIndex === -1) {
            // Move cursor after the decimal point when '.' is pressed
            requestAnimationFrame(() => {
                if (inputRef.current) {
                    inputRef.current.setSelectionRange(selectionStart + 1, selectionStart + 1);
                }
            });
        }

        if (onKeyDown) {
            onKeyDown(e); // Trigger onKeyDown prop if provided
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
                onKeyDown={handleKeyDown}        // Strict cursor control on keydown
                onBlur={handleBlur}              // Handle blur event with validation
                maskChar={null}                  // No additional mask characters
                style={{ textAlign: 'right' }}   // Right-align the input for better UX
                placeholder={`Enter percentage (${decimalPoints} decimal${decimalPoints > 1 ? 's' : ''})`} // Dynamic placeholder
                inputRef={inputRef}              // Attach input ref for cursor management
            />
        </div>
    );
};

export default DynamicPercentage;

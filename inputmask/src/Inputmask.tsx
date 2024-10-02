import React, { useState } from 'react';
import InputMask from 'react-input-mask';

const RupeeInputMask: React.FC = () => {
    const [value, setValue] = useState(""); // Start with an empty string

    // Handle input changes and ensure valid input with two decimal places
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        // If input starts with '.', prepend '0'
        if (inputValue.startsWith('.')) {
            inputValue = '0' + inputValue; // Append '0' before '.'
        }

        // Prevent values like 055.23 or 000.55 but allow 0.55
        // Remove leading zeros unless the user is entering a decimal (e.g., 0.55)
        if (inputValue.startsWith('0') && inputValue.length > 1 && inputValue[1] !== '.') {
            inputValue = inputValue.replace(/^0+/, ''); // Remove all leading zeros
        }

        // Prevent input with more than two zeros after the decimal (e.g., 100.00 is allowed, 100.000 is not)
        const validInput = inputValue.match(/^\d*\.?\d{0,2}$/);
        if (validInput) {
            const parts = inputValue.split('.');
            if (parts.length === 2 && parts[1].startsWith('00')) {
                return; // Don't update the value if there are two zeros after the decimal
            }
            setValue(inputValue);
        }
    };

    // Handle focus and ensure cursor starts before the decimal
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!value) {
            setValue(""); // Ensure no pre-filling with "0"
        }
    };

    return (
        <div>
            <label htmlFor="rupee-input">Enter Amount:</label>
            <InputMask
                mask=""                          // No specific mask
                value={value}                    // Controlled input value
                onChange={handleInputChange}     // Validate and restrict input
                onFocus={handleFocus}            // Focus behavior
                maskChar={null}                  // No additional mask characters
                style={{ textAlign: 'right' }}   // Right-align the input for better UX
                placeholder="Enter amount"       // Placeholder instead of default 0.00
            />
        </div>
    );
};

export default RupeeInputMask;

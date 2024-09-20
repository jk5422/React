import React, { useState } from 'react';
import InputMask from 'react-input-mask';

const PercentageInputMask: React.FC = () => {
    const [value, setValue] = useState(""); // Start with an empty string

    // Handle input changes and ensure valid percentage with two decimal places and no negative values
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        // If input starts with '.', prepend '0'
        if (inputValue.startsWith('.')) {
            inputValue = '0' + inputValue; // Append '0' before '.'
        }

        // Prevent leading zeros unless it's a valid decimal like 0.55
        if (inputValue.startsWith('0') && inputValue.length > 1 && inputValue[1] !== '.') {
            inputValue = inputValue.replace(/^0+/, ''); // Remove all leading zeros
        }

        // Ensure the input is a valid number with up to two decimal places and no negative sign
        const validInput = inputValue.match(/^\d*\.?\d{0,2}$/);

        if (validInput) {
            // Convert to a number for validation purposes
            const percentageValue = parseFloat(inputValue);

            // Check if the percentage is between 0 and 100 (no negative values)
            if (!isNaN(percentageValue) && percentageValue <= 100) {
                setValue(inputValue); // Only update state if value is between 0 and 100
            } else if (inputValue === "") {
                setValue(""); // Allow clearing the input
            }
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
            <label htmlFor="percentage-input">Enter Percentage:</label>
            <InputMask
                mask=""                          // No specific mask
                value={value}                    // Controlled input value
                onChange={handleInputChange}     // Validate and restrict input
                onFocus={handleFocus}            // Focus behavior
                maskChar={null}                  // No additional mask characters
                style={{ textAlign: 'right' }}   // Right-align the input for better UX
                placeholder="Enter percentage"   // Placeholder instead of default 0.00
            />
        </div>
    );
};

export default PercentageInputMask;

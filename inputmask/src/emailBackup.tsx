import React, { useState } from 'react';
import InputMask from 'react-input-mask';

const EmailInputMask: React.FC = () => {
    const [value, setValue] = useState(""); // Email value

    // Regex for a simple email validation structure
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        // Automatically insert '@' at the correct place if it doesn't exist
        if (!inputValue.includes('@') && inputValue.length > 3) {
            inputValue = inputValue.replace(/^([a-zA-Z0-9._%+-]+)(.*)$/, '$1@.'); // Insert '@' at correct place
        }

        setValue(inputValue);
    };

    return (
        <div>
            <label htmlFor="email-input">Enter Email:</label>
            <InputMask
                mask=""                          // No specific mask for the email
                value={value}                    // Controlled input value
                onChange={handleInputChange}     // Handle input change and automatic '@'
                maskChar={null}                  // No mask character
                placeholder="Enter your email"   // Placeholder text
            />
            {/* Basic validation error message */}
            {!emailRegex.test(value) && value.length > 0 && (
                <span style={{ color: 'red' }}>Please enter a valid email.</span>
            )}
        </div>
    );
};

export default EmailInputMask;

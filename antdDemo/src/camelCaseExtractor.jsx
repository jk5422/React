import React, { useState } from 'react';

const SecondWordExtractor = () => {
    const [inputValue, setInputValue] = useState('');
    const [secondWord, setSecondWord] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Regex to extract the second word in camelCase or PascalCase
        const regex = /^[a-z]+|([A-Z][a-z]+)/g;
        const matches = [...value.matchAll(regex)];

        if (matches.length > 1) {
            // Extract the second word (matches[1] will hold the second word)
            const secondMatch = matches[1][0]; // The second matched word
            setSecondWord(secondMatch);
        } else {
            setSecondWord(''); // Clear second word if not found
        }
    };

    return (
        <div>
            <h2>Second Word Extractor</h2>
            <input
                type="text"
                placeholder="Type camelCase or PascalCase"
                value={inputValue}
                onChange={handleInputChange}
            />
            {secondWord && (
                <p>Second word: <strong>{secondWord}</strong></p>
            )}
        </div>
    );
};

export default SecondWordExtractor;

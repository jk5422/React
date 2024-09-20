import React from 'react'

const Cell = ({ value, onChange, isEditable }) => {
    return (
        <input
            type="text"
            value={value || ''}
            onChange={onChange}
            maxLength="1"
            disabled={!isEditable}
            className={`sudoku-cell ${isEditable ? 'editable' : ''}`}
        />
    );
};

export default Cell;
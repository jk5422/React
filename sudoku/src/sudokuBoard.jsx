import React from 'react';
import Cell from './Cell';

const SudokuBoard = ({ board, onChange }) => {
    return (
        <div className="sudoku-board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="sudoku-row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            value={cell.value}
                            isEditable={cell.isEditable}
                            onChange={(e) => onChange(e, rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SudokuBoard;

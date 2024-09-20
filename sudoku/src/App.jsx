import { useState } from 'react'
import './App.css'
import SudokuBoard from './sudokuBoard';

function App() {
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill({ value: "", isEditable: true })));

  const handleChange = (e, rowIndex, colIndex) => {
    const value = parseInt(e.target.value) || 0;

    if (value < 1 || value > 9 || !board[rowIndex][colIndex].isEditable) {
      return; // Ignore if the value is not between 1-9 or cell is not editable
    }
    // Copy the current board to avoid mutating state directly
    const newBoard = board.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          return { ...cell, value: value };
        }
        return cell;
      })
    );

    setBoard(newBoard);
  };

  const handleCheckSolution = () => {
    if (isValidSolution(board)) {
      alert("Correct solution!");
    } else {
      alert("Incorrect solution.");
    }
  };


  const isValidSolution = (board) => {
    const isUnique = (arr) => {
      const filtered = arr.filter(num => num > 0);
      return new Set(filtered).size === filtered.length;
    };

    // Check rows
    for (let row = 0; row < 9; row++) {
      const rowValues = board[row].map(cell => cell.value);
      if (!isUnique(rowValues)) return false;
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
      const colValues = board.map(row => row[col].value);
      if (!isUnique(colValues)) return false;
    }

    // Check 3x3 subgrids
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const gridValues = [
          board[row][col].value, board[row][col + 1].value, board[row][col + 2].value,
          board[row + 1][col].value, board[row + 1][col + 1].value, board[row + 1][col + 2].value,
          board[row + 2][col].value, board[row + 2][col + 1].value, board[row + 2][col + 2].value
        ];
        if (!isUnique(gridValues)) return false;
      }
    }

    return true; // Passed all checks, solution is valid
  };



  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <SudokuBoard board={board} onChange={handleChange} />
      <button onClick={handleCheckSolution}>Check Solution</button>
    </div>
  );
};

export default App

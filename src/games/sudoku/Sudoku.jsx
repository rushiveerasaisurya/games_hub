import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Sudoku.css';

function Sudoku() {
  const location = useLocation();
  const navigate = useNavigate();
  const { difficulty = 'medium' } = location.state || {};

  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hints, setHints] = useState(3);

  const difficultySettings = {
    easy: 40,
    medium: 50,
    hard: 60
  };

  useEffect(() => {
    generatePuzzle();
  }, [difficulty]);

  useEffect(() => {
    let interval;
    if (isRunning && !isComplete) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isComplete]);

  const generatePuzzle = () => {
    const fullBoard = generateSolvedBoard();
    setSolution([...fullBoard.map(row => [...row])]);
    
    const puzzle = [...fullBoard.map(row => [...row])];
    const cellsToRemove = difficultySettings[difficulty];
    
    for (let i = 0; i < cellsToRemove; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * 9);
        col = Math.floor(Math.random() * 9);
      } while (puzzle[row][col] === 0);
      puzzle[row][col] = 0;
    }
    
    setBoard(puzzle);
    setTimer(0);
    setIsRunning(true);
    setMistakes(0);
    setIsComplete(false);
    setHints(3);
  };

  const generateSolvedBoard = () => {
    const board = Array(9).fill().map(() => Array(9).fill(0));
    solveSudoku(board);
    return board;
  };

  const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
          for (let num of numbers) {
            if (isValidMove(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const isValidMove = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false;
      }
    }

    return true;
  };

  const handleCellClick = (row, col) => {
    if (solution[row][col] !== 0 && board[row][col] !== 0) return;
    setSelectedCell({ row, col });
  };

  const handleNumberInput = (num) => {
    if (selectedCell.row === -1 || selectedCell.col === -1) return;
    if (solution[selectedCell.row][selectedCell.col] !== 0 && board[selectedCell.row][selectedCell.col] !== 0) return;

    const newBoard = [...board];
    newBoard[selectedCell.row][selectedCell.col] = num;

    if (num !== 0 && solution[selectedCell.row][selectedCell.col] !== num) {
      setMistakes(prev => prev + 1);
      setTimeout(() => {
        newBoard[selectedCell.row][selectedCell.col] = 0;
        setBoard([...newBoard]);
      }, 500);
    }

    setBoard(newBoard);
    checkCompletion(newBoard);
  };
 useEffect(() => {
    const handleKeyDown = (event) => {
      const num = parseInt(event.key, 10);
      if (num >= 1 && num <= 9) {
        handleNumberInput(num);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNumberInput]);

  const checkCompletion = (currentBoard) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentBoard[row][col] === 0 || currentBoard[row][col] !== solution[row][col]) {
          return;
        }
      }
    }
    setIsComplete(true);
    setIsRunning(false);
  };

  const useHint = () => {
    if (hints <= 0 || selectedCell.row === -1 || selectedCell.col === -1) return;
    
    const { row, col } = selectedCell;
    if (board[row][col] !== 0) return;

    const newBoard = [...board];
    newBoard[row][col] = solution[row][col];
    setBoard(newBoard);
    setHints(prev => prev - 1);
    checkCompletion(newBoard);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCellClass = (row, col) => {
    let className = 'sudoku-cell';
    
    if (selectedCell.row === row && selectedCell.col === col) {
      className += ' selected';
    }
    
    if (selectedCell.row === row || selectedCell.col === col) {
      className += ' highlighted';
    }
    
    const boxRow = Math.floor(row / 3);
    const boxCol = Math.floor(col / 3);
    const selectedBoxRow = Math.floor(selectedCell.row / 3);
    const selectedBoxCol = Math.floor(selectedCell.col / 3);
    
    if (boxRow === selectedBoxRow && boxCol === selectedBoxCol) {
      className += ' box-highlighted';
    }
    
    if (solution[row][col] !== 0 && board[row][col] !== 0 && board[row][col] === solution[row][col]) {
      className += ' given';
    } else if (board[row][col] !== 0) {
      className += ' user-input';
    }
    
    return className;
  };

  if (board.length === 0) {
    return <div className="loading">Generating puzzle...</div>;
  }

  return (
    <div className="sudoku-game fade-in">
      <div className="game-container">
        <div className="game-header">
          <h2>Sudoku - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
          <div className="game-stats">
            <div className="stat">⏱️ {formatTime(timer)}</div>
            <div className="stat">❌ {mistakes}</div>
            <div className="stat">💡 {hints}</div>
          </div>
        </div>

        <div className="sudoku-main-content">
          <div className="game-controls">
            <button className="btn" onClick={useHint} disabled={hints <= 0}>
              💡 Hint ({hints})
            </button>
            <button className="btn" onClick={generatePuzzle}>
              🔄 New Puzzle
            </button>
            <button className="btn" onClick={() => navigate('/sudoku')}>
             🏠 Home
            </button>
          </div>
          <div className="sudoku-board">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={getCellClass(rowIndex, colIndex)}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              ))
            )}
          </div>
          <div className="number-pad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                className="number-btn"
                onClick={() => handleNumberInput(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {isComplete && (
          <div className="game-overlay">
            <h3>🎉 Puzzle Completed!</h3>
            <p>Time: {formatTime(timer)}</p>
            <p>Mistakes: {mistakes}</p>
            <div className="completion-buttons">
              <button className="play-again-btn" onClick={generatePuzzle}>
                🔄 New Puzzle
              </button>
              <button className="back-btn" onClick={() => navigate('/sudoku')}>
                ⚙️ Change Difficulty
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sudoku;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SudokuHome() {
  const [difficulty, setDifficulty] = useState('medium');
  const navigate = useNavigate();

  const difficultyOptions = {
    easy: { label: '😊 Easy', description: 'Perfect for beginners' },
    medium: { label: '🤔 Medium', description: 'Balanced challenge' },
    hard: { label: '😤 Hard', description: 'For puzzle masters' }
  };

  const startGame = () => {
    navigate('/sudoku/play', { 
      state: { difficulty } 
    });
  };

  return (
    <div className="sudoku-home fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">🔢</div>
        <h1 className="game-title">Sudoku</h1>
        <p className="game-subtitle">Fill the 9×9 grid with numbers 1-9</p>

        <div className="game-options">
          <div className="option-group">
            <h3>Difficulty Level</h3>
            <div className="option-buttons">
              {Object.entries(difficultyOptions).map(([key, option]) => (
                <button
                  key={key}
                  className={`option-btn ${difficulty === key ? 'active' : ''}`}
                  onClick={() => setDifficulty(key)}
                >
                  <div>{option.label}</div>
                  <small>{option.description}</small>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="game-instructions">
          <h4>How to Play</h4>
          <div className="instructions">
            <p>🎯 Fill each row, column, and 3×3 box with digits 1-9</p>
            <p>🚫 No repeating numbers in any row, column, or box</p>
            <p>💡 Use logic and deduction to solve the puzzle</p>
          </div>
        </div>

        <button className="start-game-btn pulse" onClick={startGame}>
          🚀 Start Puzzle
        </button>
      </div>
    </div>
  );
}

export default SudokuHome;
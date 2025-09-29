import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicTacToeHome.css';

function TicTacToeHome() {
  const [gameMode, setGameMode] = useState('pvp');
  const [difficulty, setDifficulty] = useState('medium');
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/tic-tac-toe/play', { 
      state: { gameMode, difficulty } 
    });
  };

  return (
    <div className="tic-tac-toe-home fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">⭕</div>
        <h1 className="game-title">Tic Tac Toe</h1>
        <p className="game-subtitle">Classic 3x3 Strategy Game</p>

        <div className="game-options">
          <div className="option-group">
            <h3>Game Mode</h3>
            <div className="option-buttons">
              <button
                className={`option-btn ${gameMode === 'pvp' ? 'active' : ''}`}
                onClick={() => setGameMode('pvp')}
              >
                👥 Player vs Player
              </button>
              <button
                className={`option-btn ${gameMode === 'pvc' ? 'active' : ''}`}
                onClick={() => setGameMode('pvc')}
              >
                🤖 Player vs Computer
              </button>
            </div>
          </div>

          {gameMode === 'pvc' && (
            <div className="option-group">
              <h3>Difficulty</h3>
              <div className="option-buttons">
                <button
                  className={`option-btn ${difficulty === 'easy' ? 'active' : ''}`}
                  onClick={() => setDifficulty('easy')}
                >
                  😊 Easy
                </button>
                <button
                  className={`option-btn ${difficulty === 'medium' ? 'active' : ''}`}
                  onClick={() => setDifficulty('medium')}
                >
                  🤔 Medium
                </button>
                <button
                  className={`option-btn ${difficulty === 'hard' ? 'active' : ''}`}
                  onClick={() => setDifficulty('hard')}
                >
                  😤 Hard
                </button>
              </div>
            </div>
          )}
        </div>

        <button className="start-game-btn pulse" onClick={startGame}>
          🚀 Start Game
        </button>
      </div>
    </div>
  );
}

export default TicTacToeHome;
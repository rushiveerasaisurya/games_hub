import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SnakeHome.css';

function SnakeHome() {
  const [speed, setSpeed] = useState('normal');
  const navigate = useNavigate();

  const speedOptions = {
    slow: { label: '🐌 Slow', value: 200 },
    normal: { label: '🐍 Normal', value: 150 },
    fast: { label: '⚡ Fast', value: 100 }
  };

  const startGame = () => {
    navigate('/snake/play', { 
      state: { speed: speedOptions[speed].value } 
    });
  };

  return (
    <div className="snake-home fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">🐍</div>
        <h1 className="game-title">Snake Game</h1>
        <p className="game-subtitle">Eat food, grow longer, avoid walls!</p>

        <div className="game-options">
          <div className="option-group">
            <h3>Game Speed</h3>
            <div className="option-buttons">
              {Object.entries(speedOptions).map(([key, option]) => (
                <button
                  key={key}
                  className={`option-btn ${speed === key ? 'active' : ''}`}
                  onClick={() => setSpeed(key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="game-instructions">
          <h4>How to Play</h4>
          <div className="instructions">
            <p>🎮 Use arrow keys or WASD to move</p>
            <p>🍎 Eat red food to grow and score points</p>
            <p>💀 Don't hit walls or your own tail</p>
          </div>
        </div>

        <button className="start-game-btn pulse" onClick={startGame}>
          🚀 Start Game
        </button>
      </div>
    </div>
  );
}

export default SnakeHome;
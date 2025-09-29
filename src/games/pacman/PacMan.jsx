import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PacMan.css';

function PacMan() {
  const location = useLocation();
  const navigate = useNavigate();
  const { difficulty = 'medium' } = location.state || {};

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [level, setLevel] = useState(1);

  // Simple Pac-Man implementation - coming soon message
  return (
    <div className="pacman-game fade-in">
      <div className="game-container">
        <div className="game-header">
          <h2>Pac-Man</h2>
          <div className="game-stats">
            <div className="stat">Score: {score}</div>
            <div className="stat">Lives: {'❤️'.repeat(lives)}</div>
            <div className="stat">Level: {level}</div>
          </div>
        </div>

        <div className="coming-soon">
          <div className="pacman-icon">🟡</div>
          <h3>Pac-Man Coming Soon!</h3>
          <p>This classic arcade game is under development.</p>
          <p>Features will include:</p>
          <ul>
            <li>🟡 Classic Pac-Man gameplay</li>
            <li>👻 Four unique ghost AI behaviors</li>
            <li>🔵 Power pellets for ghost hunting</li>
            <li>🍒 Bonus fruits for extra points</li>
            <li>🏆 Progressive difficulty levels</li>
          </ul>
          
          <div className="temp-controls">
            <button className="back-btn" onClick={() => navigate('/pacman')}>
              ⚙️ Settings
            </button>
            <button className="home-btn" onClick={() => navigate('/')}>
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PacMan;
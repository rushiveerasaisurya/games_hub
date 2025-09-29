import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PacManHome() {
  const [difficulty, setDifficulty] = useState('medium');
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/pacman/play', { 
      state: { difficulty } 
    });
  };

  return (
    <div className="pacman-home fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">👻</div>
        <h1 className="game-title" style={{ color: '#f1c40f' }}>Pac-Man</h1>
        <p className="game-subtitle">Eat dots, avoid ghosts, survive!</p>

        <div className="game-options">
          <div className="option-group">
            <h3>Difficulty</h3>
            <div className="option-buttons">
              <button
                className={`option-btn ${difficulty === 'easy' ? 'active' : ''}`}
                onClick={() => setDifficulty('easy')}
                style={{ '--btn-color': '#f1c40f' }}
              >
                😊 Easy
              </button>
              <button
                className={`option-btn ${difficulty === 'medium' ? 'active' : ''}`}
                onClick={() => setDifficulty('medium')}
                style={{ '--btn-color': '#f1c40f' }}
              >
                🤔 Medium
              </button>
              <button
                className={`option-btn ${difficulty === 'hard' ? 'active' : ''}`}
                onClick={() => setDifficulty('hard')}
                style={{ '--btn-color': '#f1c40f' }}
              >
                😤 Hard
              </button>
            </div>
          </div>
        </div>

        <button 
          className="start-game-btn pulse" 
          onClick={startGame}
          style={{ background: 'linear-gradient(135deg, #f1c40f, #f39c12)' }}
        >
          🚀 Start Game
        </button>
      </div>
    </div>
  );
}

export default PacManHome;
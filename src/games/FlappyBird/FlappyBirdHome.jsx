import { useNavigate } from 'react-router-dom';
import './FlappyBird.css'; 

function FlappyBirdHome() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/flappy-bird/play');
  }

  return (
      <div className="game-home-page fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">🐦</div>
        <h1 className="game-title" style={{ color: '#ff8a00' }}>Flappy Bird</h1>
        <p className="game-subtitle">Ready to Fly?</p>

        <div className="game-instructions">
          <h4>How to Play</h4>
          <div className="instructions">
            <h4>How to Play</h4>
            <p>👆 Click or press Spacebar to make the bird flap up.</p>
            <p>⚠️ Avoid hitting the pipes or the ground.</p>
            <p>🏆 Pass through pipes to score points.</p>
          </div>
        </div>

        <button 
          className="start-game-btn pulse" 
          onClick={startGame}
          style={{ background: 'linear-gradient(135deg, #ff8a00, #f65e3b)' }}
        >
          🚀 Start Game
        </button>
      </div>
    </div>
      
  );
}

export default FlappyBirdHome;
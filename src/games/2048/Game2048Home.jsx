import { useNavigate } from 'react-router-dom';

function Game2048Home() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/2048/play');
  };

  return (
    <div className="game-home-page fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">🧠</div>
        <h1 className="game-title" style={{ color: '#ff8a00' }}>2048</h1>
        <p className="game-subtitle">Slide and merge tiles to reach the 2048 tile!</p>
        <div className="game-instructions">
          <h4>How to Play</h4>
          <div className="instructions">
            <p>🧠 Use arrow keys or swipe to move all tiles</p>
            <p>➕ Tiles with the same number merge into one</p>
            <p>🎯 Create a tile with the number 2048 to win</p>
            <p>📈 The game ends when no more moves are possible</p>
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

export default Game2048Home;
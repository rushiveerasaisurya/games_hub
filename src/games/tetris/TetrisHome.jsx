import { useNavigate } from 'react-router-dom';

function TetrisHome() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/tetris/play');
  };

  return (
    <div className="tetris-home fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">T</div>
        <h1 className="game-title">Tetris Game</h1>
        <p className="game-subtitle">The classic block-stacking game.</p>

        <button className="start-game-btn pulse" onClick={startGame}>
          🚀 Start Game
        </button>
      </div>
    </div>
  );
}

export default TetrisHome;

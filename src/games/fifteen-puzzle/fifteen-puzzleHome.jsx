import { useNavigate } from 'react-router-dom';
import './FifteenPuzzle.css';

function FifteenPuzzleHome() {
  const navigate = useNavigate();
  const startGame = () => {
    navigate('/fifteen-puzzle/play');
  };
  return (
      <div className="game-home-page fade-in">
            <div className="game-home-container">
                <div className="game-icon-large">🔢</div>
                <h1 className="game-title" style={{ color: '#ff8a00' }}>15 Puzzle</h1>
                <p className="game-subtitle">Arrange the Tiles!</p>
                <div className="game-instructions">
                    <h4>How to Play</h4>
                    <div className="instructions">
                        <p>👆 Click or tap a tile adjacent to the empty space.</p>
                        <p>➡️ The tile will slide into the empty spot.</p>
                        <p>🏆 Arrange all numbers from 1 to 15, with the empty space in the bottom right, to win!</p>
                    </div>
                </div>

                <button 
                    className="start-game-btn pulse" 
                    onClick={startGame}
                    style={{ background: 'linear-gradient(135deg, #ff8a00, #f65e3b)' }}>
                        🚀 Start Game
                </button>
            </div>
        </div>
  );
}
export default FifteenPuzzleHome;
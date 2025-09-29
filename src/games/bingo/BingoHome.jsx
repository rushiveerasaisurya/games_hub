import { useNavigate } from 'react-router-dom';

function BingoHome() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/bingo/play');
  };

  return (
    <div className="bingo-home fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">🎱</div>
        <h1 className="game-title" style={{ color: '#e67e22' }}>Bingo</h1>
        <p className="game-subtitle">Mark your numbers and call BINGO!</p>

        <div className="game-instructions">
          <h4>How to Play</h4>
          <div className="instructions">
            <p>🎯 Get a 5x5 card with random numbers</p>
            <p>🔢 Mark numbers as they're called</p>
            <p>🏆 Get 5 in a row (any direction) to win</p>
            <p>🎉 Call BINGO when you have a winning pattern</p>
          </div>
        </div>

        <button 
          className="start-game-btn pulse" 
          onClick={startGame}
          style={{ background: 'linear-gradient(135deg, #e67e22, #d35400)' }}
        >
          🚀 Start Game
        </button>
      </div>
    </div>
  );
}

export default BingoHome;
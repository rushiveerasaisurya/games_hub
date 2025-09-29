import { useNavigate } from 'react-router-dom';

function SnakesLadders() {
  const navigate = useNavigate();

  return (
    <div className="snakes-ladders-game fade-in">
      <div className="game-container">
        <div className="coming-soon">
          <div className="game-icon">🐍🪜</div>
          <h3>Snakes & Ladders Coming Soon!</h3>
          <p>This classic board game is under development.</p>
          
          <div className="temp-controls">
            <button className="back-btn" onClick={() => navigate('/snakes-ladders')}>
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

export default SnakesLadders;
import { useNavigate } from 'react-router-dom';

function Ludo() {
  const navigate = useNavigate();

  return (
    <div className="ludo-game fade-in">
      <div className="game-container">
        <div className="coming-soon">
          <div className="game-icon">🎲</div>
          <h3>Ludo Coming Soon!</h3>
          <p>This classic board game is under development.</p>
          
          <div className="temp-controls">
            <button className="back-btn" onClick={() => navigate('/ludo')}>
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

export default Ludo;
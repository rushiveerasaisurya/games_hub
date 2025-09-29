import { useNavigate } from 'react-router-dom';

function Mario() {
  const navigate = useNavigate();

  return (
    <div className="mario-game fade-in">
      <div className="game-container">
        <div className="coming-soon">
          <div className="mario-icon">🍄</div>
          <h3>Super Mario Coming Soon!</h3>
          <p>This classic 2D platformer is under development.</p>
          
          <div className="temp-controls">
            <button className="back-btn" onClick={() => navigate('/mario')}>
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

export default Mario;
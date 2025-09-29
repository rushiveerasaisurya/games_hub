import { useNavigate } from 'react-router-dom';

function Skribble() {
  const navigate = useNavigate();

  return (
    <div className="skribble-game fade-in">
      <div className="game-container">
        <div className="coming-soon">
          <div className="game-icon">✏️</div>
          <h3>Skribble Coming Soon!</h3>
          <p>This drawing and guessing game is under development.</p>
          
          <div className="temp-controls">
            <button className="back-btn" onClick={() => navigate('/skribble')}>
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

export default Skribble;
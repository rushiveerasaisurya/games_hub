import { useNavigate } from 'react-router-dom';

function FruitNinja() {
  const navigate = useNavigate();

  return (
    <div className="fruit-ninja-game fade-in">
      <div className="game-container">
        <div className="coming-soon">
          <div className="game-icon">🥷🍎</div>
          <h3>Fruit Ninja Coming Soon!</h3>
          <p>This fruit slicing game is under development.</p>
          
          <div className="temp-controls">
            <button className="back-btn" onClick={() => navigate('/fruit-ninja')}>
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

export default FruitNinja;
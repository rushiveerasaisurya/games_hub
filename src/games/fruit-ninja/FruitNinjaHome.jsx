import { useNavigate } from 'react-router-dom';

function FruitNinjaHome() {
  const navigate = useNavigate();

  return (
    <div className="fruit-ninja-home fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">🥷🍎</div>
        <h1 className="game-title" style={{ color: '#e67e22' }}>Fruit Ninja</h1>
        <p className="game-subtitle">Slice fruits, avoid bombs!</p>

        <div className="coming-soon" style={{ padding: '2rem', background: 'rgba(230, 126, 34, 0.1)', borderRadius: '15px', margin: '2rem 0' }}>
          <h4 style={{ color: '#e67e22', marginBottom: '1rem' }}>Coming Soon!</h4>
          <p style={{ color: '#2c3e50', marginBottom: '1rem' }}>This fruit slicing game is under development.</p>
          <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🍎 Flying fruits to slice</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>💣 Bombs to avoid</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🗡️ Mouse/touch slicing mechanics</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🎯 Combo system for high scores</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>💥 Satisfying slice animations</p>
          </div>
        </div>

        <button 
          className="start-game-btn" 
          onClick={() => navigate('/')}
          style={{ background: 'linear-gradient(135deg, #95a5a6, #7f8c8d)' }}
        >
          🏠 Back to Hub
        </button>
      </div>
    </div>
  );
}

export default FruitNinjaHome;
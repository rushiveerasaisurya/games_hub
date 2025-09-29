import { useNavigate } from 'react-router-dom';

function MarioHome() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/mario/play');
  };

  return (
    <div className="mario-home fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">🍄</div>
        <h1 className="game-title" style={{ color: '#e74c3c' }}>Super Mario</h1>
        <p className="game-subtitle">Classic 2D platformer adventure!</p>

        <div className="coming-soon" style={{ padding: '2rem', background: 'rgba(231, 76, 60, 0.1)', borderRadius: '15px', margin: '2rem 0' }}>
          <h4 style={{ color: '#e74c3c', marginBottom: '1rem' }}>Coming Soon!</h4>
          <p style={{ color: '#2c3e50', marginBottom: '1rem' }}>This classic platformer is under development.</p>
          <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🏃‍♂️ Classic Mario physics and movement</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🪙 Collectible coins and power-ups</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>👹 Various enemies and obstacles</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🏰 50+ unique levels</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🎵 Classic sound effects</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="start-game-btn" 
            onClick={() => navigate('/')}
            style={{ background: 'linear-gradient(135deg, #95a5a6, #7f8c8d)' }}
          >
            🏠 Back to Hub
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarioHome;
import { useNavigate } from 'react-router-dom';

function LudoHome() {
  const navigate = useNavigate();

  return (
    <div className="ludo-home fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">🎲</div>
        <h1 className="game-title" style={{ color: '#3498db' }}>Ludo</h1>
        <p className="game-subtitle">Classic board game for 2-4 players!</p>

        <div className="coming-soon" style={{ padding: '2rem', background: 'rgba(52, 152, 219, 0.1)', borderRadius: '15px', margin: '2rem 0' }}>
          <h4 style={{ color: '#3498db', marginBottom: '1rem' }}>Coming Soon!</h4>
          <p style={{ color: '#2c3e50', marginBottom: '1rem' }}>This classic board game is under development.</p>
          <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🎲 Animated dice rolling</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>👥 2-4 player support</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🤖 Computer opponents</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🏠 Safe zones and home stretch</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>⚡ Power moves and captures</p>
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

export default LudoHome;
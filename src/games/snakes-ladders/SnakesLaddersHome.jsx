import { useNavigate } from 'react-router-dom';

function SnakesLaddersHome() {
  const navigate = useNavigate();

  return (
    <div className="snakes-ladders-home fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">🐍🪜</div>
        <h1 className="game-title" style={{ color: '#1abc9c' }}>Snakes & Ladders</h1>
        <p className="game-subtitle">Climb up, slide down - reach 100!</p>

        <div className="coming-soon" style={{ padding: '2rem', background: 'rgba(26, 188, 156, 0.1)', borderRadius: '15px', margin: '2rem 0' }}>
          <h4 style={{ color: '#1abc9c', marginBottom: '1rem' }}>Coming Soon!</h4>
          <p style={{ color: '#2c3e50', marginBottom: '1rem' }}>This classic board game is under development.</p>
          <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🎲 Animated dice and movement</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🐍 Snakes that send you down</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🪜 Ladders that lift you up</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>👥 1-2 player modes</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🏁 Race to square 100</p>
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

export default SnakesLaddersHome;
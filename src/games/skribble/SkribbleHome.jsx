import { useNavigate } from 'react-router-dom';

function SkribbleHome() {
  const navigate = useNavigate();

  return (
    <div className="skribble-home fade-in">
      <div className="game-home-container">
        <div className="game-icon-large">✏️</div>
        <h1 className="game-title" style={{ color: '#9b59b6' }}>Skribble</h1>
        <p className="game-subtitle">Draw words and guess what others draw!</p>

        <div className="coming-soon" style={{ padding: '2rem', background: 'rgba(155, 89, 182, 0.1)', borderRadius: '15px', margin: '2rem 0' }}>
          <h4 style={{ color: '#9b59b6', marginBottom: '1rem' }}>Coming Soon!</h4>
          <p style={{ color: '#2c3e50', marginBottom: '1rem' }}>This drawing and guessing game is under development.</p>
          <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>✏️ Drawing canvas with tools</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🎨 Color picker and brush sizes</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>📝 Random word generation</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>⏱️ Timed drawing challenges</p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#2c3e50' }}>🏆 Scoring system</p>
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

export default SkribbleHome;
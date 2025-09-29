import { useNavigate } from 'react-router-dom';
import './GameLayout.css';

function GameLayout({ children }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="game-layout">
      <header className="game-header">
        <button onClick={handleGoHome} className="home-button">
          🏠 Home
        </button>
        <h1 className="game-hub-title">🎮 Game Hub</h1>
      </header>
      <main className="game-content">
        {children}
      </main>
    </div>
  );
}

export default GameLayout;
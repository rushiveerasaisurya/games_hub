import { useState } from 'react';
import './GameCard.css';

function GameCard({ game, onClick, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="game-card fade-in"
      style={{ 
        animationDelay: `${delay}s`,
        '--card-color': game.color
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-background"></div>
      <div className="card-content">
        <div className="game-icon">{game.icon}</div>
        <h3 className="game-title">{game.name}</h3>
        <p className="game-description">{game.description}</p>
        <div className="game-info">
          <span className="players-count">{game.players}</span>
        </div>
        <div className={`play-button ${isHovered ? 'hovered' : ''}`}>
          <span>Play Now</span>
          <div className="button-arrow">→</div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
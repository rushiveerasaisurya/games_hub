import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { games } from '../games';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGameClick = (gameId) => {
    navigate(`/${gameId}`);
  };

  return (
    <div className="home">
      <header className="home-header">
        <div className="header-content">
          <h1 className="main-title bounce">🎮 Game Hub</h1>
          <p className="subtitle">Choose your adventure from our collection of classic games</p>
        </div>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <main className="games-grid">
        {filteredGames.map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => handleGameClick(game.id)}
            delay={index * 0.1}
          />
        ))}
      </main>

      <footer className="home-footer">
        <p>&copy; 2025 Game Hub. Built with React & Love ❤️</p>
      </footer>
    </div>
  );
}

export default Home;
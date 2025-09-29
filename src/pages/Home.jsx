import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import './Home.css';

const games = [
  {
    id: 'tic-tac-toe',
    name: 'Tic Tac Toe',
    description: 'Classic 3x3 grid game',
    icon: '⭕',
    color: '#e74c3c',
    players: '1-2 Players'
  },
  {
    id: 'snake',
    name: 'Snake',
    description: 'Grow your snake and avoid walls',
    icon: '🐍',
    color: '#2ecc71',
    players: '1 Player'
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    description: 'Number puzzle challenge',
    icon: '🔢',
    color: '#9b59b6',
    players: '1 Player'
  },
  {
    id: 'pacman',
    name: 'Pac-Man',
    description: 'Classic arcade maze game',
    icon: '👻',
    color: '#f1c40f',
    players: '1 Player'
  },
  {
    id: 'bingo',
    name: 'Bingo',
    description: 'Mark your numbers and win',
    icon: '🎱',
    color: '#e67e22',
    players: '1 Player'
  },
  {
    id: 'mario',
    name: 'Super Mario',
    description: '2D platformer adventure',
    icon: '🍄',
    color: '#e74c3c',
    players: '1 Player'
  },
  {
    id: 'ludo',
    name: 'Ludo',
    description: 'Classic board game',
    icon: '🎲',
    color: '#3498db',
    players: '2-4 Players'
  },
  {
    id: 'snakes-ladders',
    name: 'Snakes & Ladders',
    description: 'Climb up, slide down',
    icon: '🐍🪜',
    color: '#1abc9c',
    players: '1-2 Players'
  },
  {
    id: 'skribble',
    name: 'Skribble',
    description: 'Draw and guess words',
    icon: '✏️',
    color: '#9b59b6',
    players: '1 Player'
  },
  {
    id: 'fruit-ninja',
    name: 'Fruit Ninja',
    description: 'Slice fruits, avoid bombs',
    icon: '🥷🍎',
    color: '#e67e22',
    players: '1 Player'
  }
];

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
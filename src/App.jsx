import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameLayout from './components/GameLayout';
import { games } from './games';
import './App.css';

function App() {
  return (
    <Router basename="/games_hub/">
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {games.flatMap(game => ([
              <Route 
                key={game.id}
                path={`/${game.id}`}
                element={
                  <GameLayout>
                    <game.homeComponent />
                  </GameLayout>
                }
              />,
              <Route 
                key={`${game.id}-play`}
                path={`/${game.id}/play`}
                element={
                  <GameLayout>
                    <game.gameComponent />
                  </GameLayout>
                }
              />
          ]))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

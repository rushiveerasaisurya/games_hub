import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameLayout from './components/GameLayout';
import TicTacToeHome from './games/tic-tac-toe/TicTacToeHome';
import TicTacToe from './games/tic-tac-toe/TicTacToe';
import SnakeHome from './games/snake/SnakeHome';
import Snake from './games/snake/Snake';
import SudokuHome from './games/sudoku/SudokuHome';
import Sudoku from './games/sudoku/Sudoku';
import PacManHome from './games/pacman/PacManHome';
import PacMan from './games/pacman/PacMan';
import BingoHome from './games/bingo/BingoHome';
import Bingo from './games/bingo/Bingo';
import MarioHome from './games/mario/MarioHome';
import Mario from './games/mario/Mario';
import LudoHome from './games/ludo/LudoHome';
import Ludo from './games/ludo/Ludo';
import SnakesLaddersHome from './games/snakes-ladders/SnakesLaddersHome';
import SnakesLadders from './games/snakes-ladders/SnakesLadders';
import SkribbleHome from './games/skribble/SkribbleHome';
import Skribble from './games/skribble/Skribble';
import FruitNinjaHome from './games/fruit-ninja/FruitNinjaHome';
import FruitNinja from './games/fruit-ninja/FruitNinja';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Tic Tac Toe */}
          <Route path="/tic-tac-toe" element={
            <GameLayout>
              <TicTacToeHome />
            </GameLayout>
          } />
          <Route path="/tic-tac-toe/play" element={
            <GameLayout>
              <TicTacToe />
            </GameLayout>
          } />
          
          {/* Snake */}
          <Route path="/snake" element={
            <GameLayout>
              <SnakeHome />
            </GameLayout>
          } />
          <Route path="/snake/play" element={
            <GameLayout>
              <Snake />
            </GameLayout>
          } />
          
          {/* Sudoku */}
          <Route path="/sudoku" element={
            <GameLayout>
              <SudokuHome />
            </GameLayout>
          } />
          <Route path="/sudoku/play" element={
            <GameLayout>
              <Sudoku />
            </GameLayout>
          } />
          
          {/* PacMan */}
          <Route path="/pacman" element={
            <GameLayout>
              <PacManHome />
            </GameLayout>
          } />
          <Route path="/pacman/play" element={
            <GameLayout>
              <PacMan />
            </GameLayout>
          } />
          
          {/* Bingo */}
          <Route path="/bingo" element={
            <GameLayout>
              <BingoHome />
            </GameLayout>
          } />
          <Route path="/bingo/play" element={
            <GameLayout>
              <Bingo />
            </GameLayout>
          } />
          
          {/* Mario */}
          <Route path="/mario" element={
            <GameLayout>
              <MarioHome />
            </GameLayout>
          } />
          <Route path="/mario/play" element={
            <GameLayout>
              <Mario />
            </GameLayout>
          } />
          
          {/* Ludo */}
          <Route path="/ludo" element={
            <GameLayout>
              <LudoHome />
            </GameLayout>
          } />
          <Route path="/ludo/play" element={
            <GameLayout>
              <Ludo />
            </GameLayout>
          } />
          
          {/* Snakes and Ladders */}
          <Route path="/snakes-ladders" element={
            <GameLayout>
              <SnakesLaddersHome />
            </GameLayout>
          } />
          <Route path="/snakes-ladders/play" element={
            <GameLayout>
              <SnakesLadders />
            </GameLayout>
          } />
          
          {/* Skribble */}
          <Route path="/skribble" element={
            <GameLayout>
              <SkribbleHome />
            </GameLayout>
          } />
          <Route path="/skribble/play" element={
            <GameLayout>
              <Skribble />
            </GameLayout>
          } />
          
          {/* Fruit Ninja */}
          <Route path="/fruit-ninja" element={
            <GameLayout>
              <FruitNinjaHome />
            </GameLayout>
          } />
          <Route path="/fruit-ninja/play" element={
            <GameLayout>
              <FruitNinja />
            </GameLayout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
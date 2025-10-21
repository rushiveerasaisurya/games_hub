import TicTacToeHome from './games/tic-tac-toe/TicTacToeHome';
import TicTacToe from './games/tic-tac-toe/TicTacToe';
import SnakeHome from './games/snake/SnakeHome';
import Snake from './games/snake/Snake';
import SudokuHome from './games/sudoku/SudokuHome';
import Sudoku from './games/sudoku/Sudoku';
import Game2048Home from './games/2048/Game2048Home';
import Game2048 from './games/2048/Game2048';
import FifteenPuzzleHome from './games/fifteen-puzzle/fifteen-puzzleHome';
import FifteenPuzzle from './games/fifteen-puzzle/fifteen-puzzle';
import RockPaperScissorsHome from './games/RockPaperScissors/RockPaperScissorsHome';
import RockPaperScissors from './games/RockPaperScissors/RockPaperScissors';
import FlappyBirdHome from './games/FlappyBird/FlappyBirdHome';
import FlappyBird from './games/FlappyBird/FlappyBird';
import TetrisHome from './games/tetris/TetrisHome';
import Tetris from './games/tetris/Tetris';
import MemoryHome from './games/memory/MemoryHome';
import Memory from './games/memory/Memory';

export const games = [
  {
    id: 'tic-tac-toe',
    name: 'Tic Tac Toe',
    description: 'Classic 3x3 grid game',
    icon: '⭕',
    color: '#e74c3c',
    players: '1-2 Players',
    homeComponent: TicTacToeHome,
    gameComponent: TicTacToe,
  },
  {
    id: 'snake',
    name: 'Snake',
    description: 'Grow your snake and avoid walls',
    icon: '🐍',
    color: '#2ecc71',
    players: '1 Player',
    homeComponent: SnakeHome,
    gameComponent: Snake,
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    description: 'Number puzzle challenge',
    icon: '🔢',
    color: '#9b59b6',
    players: '1 Player',
    homeComponent: SudokuHome,
    gameComponent: Sudoku,
  },
  {
    id: '2048',
    name: '2048',
    description: 'Slide tiles to reach the 2048 tile',
    icon: '🧠',
    color: '#ff8a00',
    players: '1 Player',
    homeComponent: Game2048Home,
    gameComponent: Game2048,
  },
  {
  id: 'fifteen-puzzle',
  name: '15 Puzzle',
  description: 'Slide tiles to solve the puzzle',
  icon: '🔢',
  color: '#ffaa44',
  players: '1 Player',
  homeComponent: FifteenPuzzleHome,
  gameComponent: FifteenPuzzle,
},
  {
    id: 'rock-paper-scissors',
    name: 'Rock Paper Scissors',
    description: 'Challenge the computer in a classic game.',
    icon: '✊✋✌️',
    color: '#3498db',
    players: '1 Player',
    homeComponent: RockPaperScissorsHome,
    gameComponent: RockPaperScissors,
  },
  {
  id: 'flappy-bird',
  name: 'Flappy Bird',
  description: 'Tap to fly through the pipes',
  icon: '🐦',
  color: '#f1c40f',
  players: '1 Player',
  homeComponent: FlappyBirdHome,
  gameComponent: FlappyBird,
  },
  {
    id: 'tetris',
    name: 'Tetris',
    description: 'The classic block-stacking game',
    icon: '🧱',
    color: '#8e44ad',
    players: '1 Player',
    homeComponent: TetrisHome,
    gameComponent: Tetris,
  },
  {
    id: 'memory',
    name: 'Memory',
    description: 'Test your memory',
    icon: '🧠',
    color: '#3498db',
    players: '1 Player',
    homeComponent: MemoryHome,
    gameComponent: Memory,
  },
];

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TicTacToe.css';

function TicTacToe() {
  const location = useLocation();
  const navigate = useNavigate();
  const { gameMode = 'pvp', difficulty = 'medium' } = location.state || {};

  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  useEffect(() => {
    checkWinner();
  }, [board]);

  useEffect(() => {
    if (gameMode === 'pvc' && currentPlayer === 'O' && !isGameOver) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, isGameOver]);

  const checkWinner = () => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setIsGameOver(true);
        setScores(prev => ({ ...prev, [board[a]]: prev[board[a]] + 1 }));
        return;
      }
    }

    if (board.every(cell => cell !== '')) {
      setWinner('tie');
      setIsGameOver(true);
      setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
    }
  };

  const makeMove = (index) => {
    if (board[index] || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const makeComputerMove = () => {
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    
    if (availableMoves.length === 0) return;

    let move;
    
    if (difficulty === 'easy') {
      move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else if (difficulty === 'medium') {
      if (Math.random() < 0.5) {
        move = getBestMove(availableMoves);
      } else {
        move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      }
    } else {
      move = getBestMove(availableMoves);
    }

    const newBoard = [...board];
    newBoard[move] = 'O';
    setBoard(newBoard);
    setCurrentPlayer('X');
  };

  const getBestMove = (availableMoves) => {
    for (let move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = 'O';
      if (checkWinningMove(testBoard, 'O')) return move;
    }

    for (let move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = 'X';
      if (checkWinningMove(testBoard, 'X')) return move;
    }

    if (availableMoves.includes(4)) return 4;

    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(corner => availableMoves.includes(corner));
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const checkWinningMove = (testBoard, player) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (testBoard[a] === player && testBoard[b] === player && testBoard[c] === player) {
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
    setIsGameOver(false);
  };

  const newGame = () => {
    setScores({ X: 0, O: 0, ties: 0 });
    resetGame();
  };

  return (
    <div className="tic-tac-toe-game fade-in">
      <div className="game-container">
        <div className="tic-tac-toe-game-header">
          <h2>TIC TAC TOE</h2>
          <div className="game-mode-info">
            {gameMode === 'pvp' ? '👥 Player vs Player' : `🤖 vs Computer (${difficulty})`}
          </div>
        </div>

        <div className="scores">
          <div className="score">
            <span className="player-x">X: {scores.X}</span>
          </div>
          <div className="score">
            <span>Ties: {scores.ties}</span>
          </div>
          <div className="score">
            <span className="player-o">O: {scores.O}</span>
          </div>
        </div>

        {!isGameOver && (
          <div className="current-player">
            Current Player: <span className={`player-${currentPlayer.toLowerCase()}`}>{currentPlayer}</span>
          </div>
        )}

        <div className="board">
          {board.map((cell, index) => (
            <button
              key={index}
              className={`cell ${cell ? 'filled' : ''} ${cell === 'X' ? 'player-x' : 'player-o'}`}
              onClick={() => makeMove(index)}
              disabled={isGameOver || (gameMode === 'pvc' && currentPlayer === 'O')}
            >
              {cell}
            </button>
          ))}
        </div>

        {isGameOver && (
          <div className="game-over">
            <h3>
              {winner === 'tie' ? "It's a Tie! 🤝" : `Player ${winner} Wins! 🎉`}
            </h3>
            <div className="game-over-buttons">
              <button className="play-again-btn" onClick={resetGame}>
                🔄 Play Again
              </button>
              <button className="new-game-btn" onClick={newGame}>
                🆕 New Game
              </button>
              <button className="back-btn" onClick={() => navigate('/tic-tac-toe')}>
                ⚙️ Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicTacToe;
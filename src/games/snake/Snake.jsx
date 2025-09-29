import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Snake.css';

function Snake() {
  const location = useLocation();
  const navigate = useNavigate();
  const { speed = 150 } = location.state || {};

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('snakeHighScore')) || 0);
  const [isPaused, setIsPaused] = useState(false);

  const boardSize = 20;

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        setGameOver(true);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  const handleKeyPress = useCallback((e) => {
    if (gameOver) return;

    const key = e.key.toLowerCase();
    
    if (key === ' ') {
      setIsPaused(prev => !prev);
      return;
    }

    let newDirection = { ...direction };

    switch (key) {
      case 'arrowup':
      case 'w':
        if (direction.y === 0) newDirection = { x: 0, y: -1 };
        break;
      case 'arrowdown':
      case 's':
        if (direction.y === 0) newDirection = { x: 0, y: 1 };
        break;
      case 'arrowleft':
      case 'a':
        if (direction.x === 0) newDirection = { x: -1, y: 0 };
        break;
      case 'arrowright':
      case 'd':
        if (direction.x === 0) newDirection = { x: 1, y: 0 };
        break;
    }

    setDirection(newDirection);
  }, [direction, gameOver]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [moveSnake, speed]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: -1 });
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const renderBoard = () => {
    const board = [];
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        let cellType = 'empty';
        
        if (snake.some(segment => segment.x === x && segment.y === y)) {
          cellType = snake[0].x === x && snake[0].y === y ? 'snake-head' : 'snake-body';
        } else if (food.x === x && food.y === y) {
          cellType = 'food';
        }

        board.push(
          <div
            key={`${x}-${y}`}
            className={`cell ${cellType}`}
          />
        );
      }
    }
    return board;
  };

  return (
    <div className="snake-game fade-in">
      <div className="game-container">
        <div className="game-header">
          <h2>Snake Game</h2>
          <div className="game-stats">
            <div className="score">Score: {score}</div>
            <div className="high-score">Best: {highScore}</div>
          </div>
        </div>

        <div className="game-board">
          {renderBoard()}
        </div>

        <div className="game-controls">
          <p>Use arrow keys or WASD to move • Press SPACE to pause</p>
        </div>

        {isPaused && !gameOver && (
          <div className="game-overlay">
            <h3>Game Paused</h3>
            <p>Press SPACE to continue</p>
          </div>
        )}

        {gameOver && (
          <div className="game-overlay">
            <h3>Game Over!</h3>
            <p>Final Score: {score}</p>
            {score === highScore && <p className="new-record">🎉 New High Score!</p>}
            <div className="game-over-buttons">
              <button className="play-again-btn" onClick={resetGame}>
                🔄 Play Again
              </button>
              <button className="back-btn" onClick={() => navigate('/snake')}>
                ⚙️ Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Snake;
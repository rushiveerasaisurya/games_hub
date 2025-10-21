import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Snake.css';

const GRID_SIZE = 18;
const BOARD_SIZE = 23;
const generateFoodPosition = (snake) => {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE),
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
};

const Snake = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const canvasRef = useRef(null);

    const { level, speed } = location.state || { level: 'easy', speed: 200 };

    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState(generateFoodPosition(snake));
    const [direction, setDirection] = useState('right');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isGameOver, setGameOver] = useState(false);
    const [gameState, setGameState] = useState('PLAYING');

    const directionRef = useRef(direction);

    useEffect(() => {
        const storedScores = JSON.parse(localStorage.getItem('snakeHighScores')) || { easy: 0, medium: 0, hard: 0 };
        setHighScore(storedScores[level]);
    }, [level]);

    const startGame = () => {
        const initialSnake = [{ x: 10, y: 10 }];
        setSnake(initialSnake);
        setFood(generateFoodPosition(initialSnake));
        setDirection('right');
        directionRef.current = 'right';
        setScore(0);
        setGameOver(false);
        setGameState('PLAYING');
    };
    
    const changeDirection = useCallback((newDirection) => {
        const currentDirection = directionRef.current;
        const goingUp = currentDirection === 'up';
        const goingDown = currentDirection === 'down';
        const goingLeft = currentDirection === 'left';
        const goingRight = currentDirection === 'right';

        if (newDirection === 'up' && !goingDown) directionRef.current = 'up';
        if (newDirection === 'down' && !goingUp) directionRef.current = 'down';
        if (newDirection === 'left' && !goingRight) directionRef.current = 'left';
        if (newDirection === 'right' && !goingLeft) directionRef.current = 'right';
    }, []);

    useEffect(() => {
        if (gameState !== 'PLAYING' || isGameOver) {
            return;
        }

        const gameInterval = setInterval(() => {
            setSnake(prevSnake => {
                const newSnake = [...prevSnake];
                const head = { ...newSnake[0] };

                switch (directionRef.current) {
                    case 'up': head.y -= 1; break;
                    case 'down': head.y += 1; break;
                    case 'left': head.x -= 1; break;
                    case 'right': head.x += 1; break;
                    default: break;
                }

                if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE ||
                    newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                    setGameOver(true);
                    setGameState('GAMEOVER');
                    
                    const storedScores = JSON.parse(localStorage.getItem('snakeHighScores')) || { easy: 0, medium: 0, hard: 0 };
                    if (score > storedScores[level]) {
                        storedScores[level] = score;
                        localStorage.setItem('snakeHighScores', JSON.stringify(storedScores));
                        setHighScore(score);
                    }
                    return prevSnake;
                }

                newSnake.unshift(head);

                if (head.x === food.x && head.y === food.y) {
                    setScore(s => s + 10);
                    setFood(generateFoodPosition(newSnake));
                } else {
                    newSnake.pop();
                }
                
                return newSnake;
            });
        }, speed);

        return () => clearInterval(gameInterval);
    }, [gameState, isGameOver, speed, food, score, level]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');
        context.fillStyle = '#0d1117';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        
        context.fillStyle = '#f00';
        context.strokeStyle = '#500';
        context.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        context.strokeRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);

        snake.forEach((segment, index) => {
            context.fillStyle = index === 0 ? '#0f0' : '#0a0';
            context.strokeStyle = '#000';
            context.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            context.strokeRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        });
    }, [snake, food]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState !== 'PLAYING') return;
            const keyMap = { 'ArrowUp': 'up', 'ArrowDown': 'down', 'ArrowLeft': 'left', 'ArrowRight': 'right' };
            const newDirection = keyMap[e.key];
            if (newDirection) {
                e.preventDefault();
                changeDirection(newDirection);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [changeDirection, gameState]);

    const pauseGame = () => {
        setGameState(prev => (prev === 'PLAYING' ? 'PAUSED' : 'PLAYING'));
    };

    const goHome = () => navigate('/snake');

    const Stats = ({ title, value }) => (
        <div className="w-full p-2 bg-gray-900 rounded-lg shadow-md border-2 border-gray-700 text-center">
            <h3 className="text-xs font-bold text-gray-300">{title}</h3>
            <p className="text-lg font-mono text-cyan-400 mt-1">{value}</p>
        </div>
    );

    const GameOverModal = ({ score, onRestart }) => (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50">
            <h2 className="text-4xl font-extrabold text-red-500 mb-4 animate-pulse">GAME OVER</h2>
            <p className="text-lg text-white mb-2">Final Score</p>
            <p className="text-3xl font-bold text-cyan-400 mb-8">{score}</p>
            <button onClick={onRestart} className="px-6 py-3 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg">
                RESTART
            </button>
            <button onClick={goHome} className="px-6 py-3 bg-red-500 text-white font-bold text-sm rounded-lg hover:bg-red-400 transition mt-2">
                HOME
            </button>
        </div>
    );

    const PauseOverlay = () => (
        <div className="pause-overlay">
            <h2 className="pause-text">PAUSED</h2>
        </div>
    );

    return (
        <div className="snake-game-container">
            <h1 className="text-5xl md:text-6xl font-black text-center mb-4 uppercase">
            <span className="text-red-500">S</span><span className="text-orange-500">N</span><span className="text-yellow-400">A</span><span className="text-green-500">K</span><span className="text-cyan-400">E</span>
        </h1>
            {isGameOver && <GameOverModal score={score} onRestart={startGame} />}
            <div className="snake-main-content">
                <aside className="snake-left-panel">
                    <Stats title="SCORE" value={score} />
                    <Stats title="HIGH SCORE" value={highScore} />
                </aside>
                
                <main className="snake-board-container">
                    {gameState === 'PAUSED' && <PauseOverlay />}
                    <canvas ref={canvasRef} id="game-board" width={GRID_SIZE * BOARD_SIZE} height={GRID_SIZE * BOARD_SIZE}></canvas>
                </main>
                
                <aside className="snake-right-panel">
                    <Stats title="LEVEL" value={level.toUpperCase()} />
                    <button onClick={pauseGame} disabled={isGameOver} className="w-full px-4 py-2 bg-yellow-500 text-gray-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition disabled:bg-gray-500">
                        {gameState === 'PAUSED' ? 'RESUME' : 'PAUSE'}
                    </button>
                    <button onClick={goHome} className="w-full px-4 py-2 bg-red-500 text-white font-bold text-sm rounded-lg hover:bg-red-400 transition mt-2">
                        END GAME
                    </button>
                </aside>
            </div>
        <div id="touch-controls">
            <div id="up-button" class="control-button" onTouchStart={() => changeDirection('up')} aria-label="Up">▲</div>
            <div id="left-button" class="control-button" onTouchStart={() => changeDirection('left')} aria-label="Move Left">◄</div>
            <div id="right-button" class="control-button" onTouchStart={() => changeDirection('right')} aria-label="Move Right">►</div>
            <div id="down-button" class="control-button" onTouchStart={() => changeDirection('down')} aria-label="Down">▼</div>
        </div>
        </div>
    );
};

export default Snake;
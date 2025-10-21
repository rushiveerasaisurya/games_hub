import React, { useState, useEffect, useCallback } from 'react';
import './Tetris.css';

const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 24;

const TETROMINOS = {
  0: { shape: [[0]], color: 'bg-transparent' },
  I: { shape: [[1, 1, 1, 1]], color: 'bg-cyan-400' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: 'bg-blue-600' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: 'bg-orange-500' },
  O: { shape: [[1, 1], [1, 1]], color: 'bg-yellow-400' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'bg-green-500' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'bg-purple-600' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'bg-red-600' },
};

const randomTetromino = () => {
  const tetrominos = 'IJLOSTZ';
  const randKey = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return { key: randKey, ...TETROMINOS[randKey] };
};


const useBoard = () => {
  const [board, setBoard] = useState(
    Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0))
  );

  const resetBoard = useCallback(() => {
    setBoard(Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0)));
  }, []);

  return [board, setBoard, resetBoard];
};

const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: { key: 0, ...TETROMINOS[0] },
    collided: false,
  });

  const rotate = (matrix) => {
    const m = matrix.length;
    const n = matrix[0].length;
    const rotated = Array.from({ length: n }, () => Array(m).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            rotated[j][m - 1 - i] = matrix[i][j];
        }
    }
    return rotated;
  };

  const playerRotate = (board) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino.shape = rotate(clonedPlayer.tetromino.shape);
   
    let offset = 1;
    while (checkCollision(clonedPlayer, board, { moveX: 0, moveY: 0 })) {
        clonedPlayer.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > clonedPlayer.tetromino.shape[0].length) {
            return; 
        }
    }
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  const resetPlayer = useCallback((nextTetromino) => {
    setPlayer({
      pos: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
      tetromino: nextTetromino || randomTetromino(),
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};

const useGameStatus = () => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('tetrisHighScore')) || 0);
    const [rowsCleared, setRowsCleared] = useState(0);
    const [level, setLevel] = useState(1);
  
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('tetrisHighScore', score.toString());
        }
    }, [score, highScore]);
  
    const resetGameStatus = useCallback(() => {
        setScore(0);
        setRowsCleared(0);
        setLevel(1);
    }, []);

    const addScore = useCallback(cleared => {
        const linePoints = [10, 50, 100, 500];
        if (cleared > 0) {
            setScore(prev => prev + linePoints[cleared - 1] * level);
            setRowsCleared(prev => prev + cleared);
        }
    }, [level]);

    useEffect(() => {
        if (rowsCleared > 0 && rowsCleared >= level * 5) {
            setLevel(prev => prev + 1);
        }
    }, [rowsCleared, level]);

    return [score, highScore, addScore, level, resetGameStatus];
};

const checkCollision = (p, b, { moveX, moveY }) => {
    for (let y = 0; y < p.tetromino.shape.length; y++) {
        for (let x = 0; x < p.tetromino.shape[y].length; x++) {
            if (p.tetromino.shape[y][x] !== 0) {
                const newY = y + p.pos.y + moveY;
                const newX = x + p.pos.x + moveX;
                if (
                    !b[newY] ||
                    b[newY][newX] === undefined || 
                    b[newY][newX] !== 0 
                ) {
                    return true;
                }
            }
        }
    }
    return false;
};
const Cell = React.memo(({ type }) => (
    <div className={`w-full aspect-square border-black/20 border-[1px] ${type !== 0 ? TETROMINOS[type].color : 'bg-gray-800'}`}></div>
));

const Board = ({ board }) => (
    <div
        className="grid gap-px bg-gray-900 border-4 border-gray-600 rounded-lg shadow-lg"
        style={{
            gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1rem)`,
            gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1rem)`,
        }}
    >
        {board.map((row, y) => row.map((cell, x) => <Cell key={`${y}-${x}`} type={cell} />))}
    </div>
);

const NextPiecePreview = ({ piece }) => {
    const previewGrid = Array.from({ length: 4 }, () => Array(4).fill(0));
    const shape = piece.shape;
    const yOffset = Math.floor((4 - shape.length) / 2);
    const xOffset = Math.floor((4 - shape[0].length) / 2);

    shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                previewGrid[y + yOffset][x + xOffset] = piece.key;
            }
        });
    });

    return (
        <div className="p-4 bg-gray-900 rounded-lg shadow-md border-2 border-gray-700">
            <h3 className="text-sm font-bold text-gray-300 mb-2 text-center">NEXT</h3>
            <div className="flex justify-center items-center h-24">
                 <div className="grid gap-px" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)' }}>
                    {previewGrid.map((row, y) => row.map((cell, x) => <div key={`${y}-${x}`} className={`w-4 h-4 ${cell ? TETROMINOS[cell].color : 'bg-transparent'}`} />))}
                </div>
            </div>
        </div>
    );
};

const Stats = ({ title, value }) => (
    <div className="w-full p-2 bg-gray-900 rounded-lg shadow-md border-2 border-gray-700 text-center">
        <h3 className="text-xs font-bold text-gray-300">{title}</h3>
        <p className="text-lg font-mono text-cyan-400 mt-1">{value}</p>
    </div>
);

const GameOverModal = ({ score, onRestart, onEndGame}) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50">
        <h2 className="text-4xl font-extrabold text-red-500 mb-4 animate-pulse">GAME OVER</h2>
        <p className="text-lg text-white mb-2">Final Score</p>
        <p className="text-3xl font-bold text-cyan-400 mb-8">{score}</p>
        <button
            onClick={onRestart}
            className="px-6 py-3 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg"
        >
            RESTART
        </button>
        <button onClick={onEndGame} className="px-6 py-3 bg-red-500 text-white font-bold text-sm rounded-lg hover:bg-red-400 transition mt-2">
            HOME
        </button>
    </div>
);

const HomeScreen = ({ onStart }) => (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-800 text-white p-8">
        <h1 className="text-5xl md:text-6xl font-black text-center mb-4 uppercase">
            <span className="text-red-500">T</span><span className="text-orange-500">E</span><span className="text-yellow-400">T</span><span className="text-green-500">R</span><span className="text-cyan-400">I</span><span className="text-purple-600">S</span>
        </h1>
        <p className="text-md text-gray-300 mb-12">Classic Block-Stacking</p>
        <button
            onClick={onStart}
            className="px-8 py-4 bg-cyan-500 text-gray-900 font-bold text-xl rounded-lg hover:bg-cyan-400 transition duration-300 transform hover:scale-110 shadow-2xl"
        >
            START GAME
        </button>
        <div className="mt-12 text-center text-gray-400 text-xs">
            <h2 className="text-md font-bold mb-2">Controls</h2>
            <p><span className="font-bold text-cyan-400">← →</span> : Move</p>
            <p><span className="font-bold text-cyan-400">↓</span> : Soft Drop</p>
            <p><span className="font-bold text-cyan-400">↑</span> : Rotate</p>
            <p><span className="font-bold text-cyan-400">SPACE</span> : Hard Drop</p>
        </div>
    </div>
);

const PauseOverlay = () => (
    <div className="pause-overlay">
        <h2 className="pause-text">PAUSED</h2>
    </div>
);

const TetrisGame = () => {
    const [gameState, setGameState] = useState('HOME');
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (gameState === 'PLAYING' || gameState === 'PAUSED') {
            htmlElement.classList.add('tetris-active');
        } else {
            htmlElement.classList.remove('tetris-active');
        }

        return () => {
            htmlElement.classList.remove('tetris-active');
        };
    }, [gameState]);

    const [isHardDropping, setIsHardDropping] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [board, setBoard, resetBoard] = useBoard();
    const [score, highScore, addScore, level, resetGameStatus] = useGameStatus();
    const [nextPiece, setNextPiece] = useState(randomTetromino());

    const startGame = () => {
        resetBoard();
        resetGameStatus();
        const firstPiece = randomTetromino();
        setNextPiece(randomTetromino());
        resetPlayer(firstPiece);
        setDropTime(1000);
        setGameOver(false);
        setGameState('PLAYING');
    };
    
    const pauseGame = () => {
        setGameState(prev => (prev === 'PLAYING' ? 'PAUSED' : 'PLAYING'));
    };

    const endGame = () => {
        setGameState('HOME');
    };

    const movePlayer = dir => {
        if (!checkCollision(player, board, { moveX: dir, moveY: 0 })) {
            updatePlayerPos({ x: dir, y: 0, collided: false });
        }
    };
    
    const drop = useCallback(() => {
        if (!checkCollision(player, board, { moveX: 0, moveY: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
                return;
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }, [player, board, updatePlayerPos]);
    
    const hardDrop = () => {
        if (isHardDropping) return;
        setIsHardDropping(true);

        let y = 0;
        while (!checkCollision(player, board, { moveX: 0, moveY: y + 1 })) {
            y++;
        }
        updatePlayerPos({ x: 0, y: y, collided: true });
    };

    useEffect(() => {
        if (gameState !== 'PLAYING' || gameOver) {
            setDropTime(null);
        } else {
            setDropTime(1000 / level);
        }
    }, [level, gameState, gameOver]);

    useEffect(() => {
        const dropInterval = setInterval(() => {
            if (gameState === 'PLAYING' && !gameOver) {
                drop();
            }
        }, dropTime);

        return () => clearInterval(dropInterval);
    }, [drop, dropTime, gameState, gameOver]);
    
    useEffect(() => {
        if (!player.collided) return;
        
        const newBoard = board.map(row => [...row]);
        player.tetromino.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const yPos = y + player.pos.y;
                    const xPos = x + player.pos.x;
                    if (yPos >= 0 && yPos < BOARD_HEIGHT && xPos >= 0 && xPos < BOARD_WIDTH) {
                        newBoard[yPos][xPos] = player.tetromino.key;
                    }
                }
            });
        });
        
        let clearedRows = 0;
        const sweptBoard = newBoard.reduce((ack, row) => {
            if (row.every(cell => cell !== 0)) {
                clearedRows++;
                ack.unshift(new Array(BOARD_WIDTH).fill(0));
                return ack;
            }
            ack.push(row);
            return ack;
        }, []);

        if (clearedRows > 0) addScore(clearedRows);
        
        setBoard(sweptBoard);

        const newPlayer = {
            pos: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
            tetromino: nextPiece,
            collided: false,
        };

        if (checkCollision(newPlayer, sweptBoard, { moveX: 0, moveY: 0 })) {
            setGameOver(true);
            setDropTime(null);
        }

        resetPlayer(nextPiece);
        setNextPiece(randomTetromino());
        setIsHardDropping(false);

    }, [player.collided, board, nextPiece, resetPlayer, addScore, setBoard]);

    const handleKeyDown = useCallback(
        ({ keyCode, repeat }) => {
            if (gameOver || gameState !== 'PLAYING') return;
            if (keyCode === 37) movePlayer(-1);
            else if (keyCode === 39) movePlayer(1);
            else if (keyCode === 40) drop();
            else if (keyCode === 38) playerRotate(board);
            else if (keyCode === 32) {
                if (repeat) return;
                hardDrop();
            }
        },
        [movePlayer, drop, playerRotate, board, hardDrop, gameOver, gameState]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const displayBoard = board.map(row => [...row]);
    if (!gameOver) {
        player.tetromino.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const yPos = y + player.pos.y;
                    const xPos = x + player.pos.x;
                    if (yPos >= 0 && yPos < BOARD_HEIGHT && xPos >= 0 && xPos < BOARD_WIDTH) {
                        displayBoard[yPos][xPos] = player.tetromino.key;
                    }
                }
            });
        });
    }

    if (gameState === 'HOME') {
        return <HomeScreen onStart={startGame} />;
    }

    return (
        <div className="tetris-game-container">
            <h1 className="tetris-header">TETRIS</h1>
            {gameOver && <GameOverModal score={score} onRestart={startGame} onEndGame={endGame}/>}
            <div className="tetris-main-content">
                <aside className="tetris-left-panel">
                    <Stats title="SCORE" value={score} />
                    <Stats title="HIGH SCORE" value={highScore} />
                </aside>
                
                <main className="tetris-board-container">
                    {gameState === 'PAUSED' && <PauseOverlay />}
                    <Board board={displayBoard} />
                </main>
                
                <aside className="tetris-right-panel">
                    <NextPiecePreview piece={nextPiece} />
                    <Stats title="LEVEL" value={level} />
                    <button onClick={pauseGame} disabled={gameOver} className="w-full px-4 py-2 bg-yellow-500 text-gray-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition disabled:bg-gray-500">
                        {gameState === 'PAUSED' ? 'RESUME' : 'PAUSE'}
                    </button>
                    <button onClick={endGame} className="w-full px-4 py-2 bg-red-500 text-white font-bold text-sm rounded-lg hover:bg-red-400 transition mt-2">
                        END GAME
                    </button>
                </aside>
            </div>
            
            <div className="tetris-controls">
                <div className="d-pad">
                    <button className="control-btn left" onTouchStart={() => movePlayer(-1)} aria-label="Move Left">←</button>
                    <button className="control-btn right" onTouchStart={() => movePlayer(1)} aria-label="Move Right">→</button>
                    <button className="control-btn down" onTouchStart={drop} aria-label="Soft Drop">↓</button>
                </div>
                <div className="action-buttons">
                    <button className="control-btn rotate" onTouchStart={() => playerRotate(board)} aria-label="Rotate">⟳</button>
                    <button className="control-btn hard-drop" onTouchStart={hardDrop} aria-label="Hard Drop">Drop</button>
                </div>
            </div>
        </div>
    );
};

export default TetrisGame;
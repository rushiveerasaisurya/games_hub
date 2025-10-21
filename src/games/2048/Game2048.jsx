import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Game2048.css';

const BOARD_SIZE = 4;

const moveTiles = (direction, board) => {
    const isVertical = direction === 'UP' || direction === 'DOWN';
    const isReversed = direction === 'RIGHT' || direction === 'DOWN';
    let initialBoard = board.map(tile => ({ ...tile, isNew: false, isMerged: false }));
    let hasChanged = false;
    let score = 0;

    const groups = Array.from({ length: BOARD_SIZE }, () => []);
    initialBoard.forEach(tile => {
        const groupIndex = isVertical ? tile.col : tile.row;
        groups[groupIndex].push(tile);
    });

    const processedGroups = groups.map(group => {
        
        group.sort((a, b) => (isVertical ? a.row - b.row : a.col - b.col) * (isReversed ? -1 : 1));

        const finalGroup = [];
        let i = 0;
        while (i < group.length) {
            if (i + 1 < group.length && group[i].value === group[i+1].value) {
                const newValue = group[i].value * 2;
                const mergedTile = { ...group[i+1], value: newValue, isMerged: true };
                finalGroup.push(mergedTile);
                score += newValue;
                hasChanged = true;
                i += 2;
            } else {
                finalGroup.push(group[i]);
                i++;
            }
        }

        const positionedGroup = finalGroup.map((tile, index) => {
            const newPos = isReversed ? BOARD_SIZE - 1 - index : index;
            const oldPos = isVertical ? tile.row : tile.col;
            const newTilePos = isVertical ? { row: newPos } : { col: newPos };
            
            if ((isVertical && oldPos !== newTilePos.row) || (!isVertical && oldPos !== newTilePos.col)) {
                hasChanged = true;
            }
            
            return { ...tile, ...newTilePos };
        });

        return positionedGroup;
    });

    const newBoard = processedGroups.flat();
    return { board: newBoard, hasChanged, score };
};

const isGameOver = (board) => {
    if (board.length < BOARD_SIZE * BOARD_SIZE) return false;
    for (const tile of board) {
        const { row, col, value } = tile;

        if (row < BOARD_SIZE - 1 && board.some(t => t.row === row + 1 && t.col === col && t.value === value)) return false;
        if (col < BOARD_SIZE - 1 && board.some(t => t.row === row && t.col === col + 1 && t.value === value)) return false;
    }
    return true;
};


const useSwipe = (callbacks) => {
    const [touchStart, setTouchStart] = useState(null);
    const minSwipeDistance = 50;
    const onTouchStart = (e) => setTouchStart(e.targetTouches[0]);
    const onTouchMove = (e) => {
        if (touchStart) {
            const dx = e.targetTouches[0].clientX - touchStart.clientX;
            const dy = e.targetTouches[0].clientY - touchStart.clientY;
            if (Math.abs(dx) > 10 || Math.abs(dy) > 10) e.preventDefault();
        }
    };
    const onTouchEnd = (e) => {
        if (!touchStart) return;
        const touchEnd = e.changedTouches[0];
        const dx = touchEnd.clientX - touchStart.clientX;
        const dy = touchEnd.clientY - touchStart.clientY;
        if (Math.abs(dx) < minSwipeDistance && Math.abs(dy) < minSwipeDistance) return;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) callbacks.onSwipeRight(); else callbacks.onSwipeLeft();
        } else {
            if (dy > 0) callbacks.onSwipeDown(); else callbacks.onSwipeUp();
        }
        setTouchStart(null);
    };
    return { onTouchStart, onTouchMove, onTouchEnd };
};


const Tile = React.memo(({ value, x, y, isNew, isMerged }) => {
    const className = `tile tile-${value} ${isNew ? 'new' : ''} ${isMerged ? 'merged' : ''}`;
    const style = { '--x': x, '--y': y };
    return <div className={className} style={style}>{value > 0 ? value : ''}</div>;
});

const GameOverlay = ({ title, score, onRestart, buttonText }) => (
    <div className="game-overlay">
        <div className="overlay-content">
            <h2>{title}</h2>
            {score !== null && <p>Your Score: {score}</p>}
            <button onClick={onRestart} className="restart-btn">{buttonText}</button>
        </div>
    </div>
);

const Stats = ({ title, value }) => (
    <div className="stats-box"><h3>{title}</h3><p>{value}</p></div>
);


export const Game2048 = () => {
    const [board, setBoard] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('2048-highScore')) || 0);
    const [gameState, setGameState] = useState('PLAYING');
    const tileIdCounter = useRef(0);

    const createTile = useCallback((row, col, value) => {
        return {
            id: tileIdCounter.current++,
            row,
            col,
            value,
            isNew: true,
            isMerged: false,
        };
    }, []);

    const addRandomTile = useCallback((currentBoard) => {
        const emptyCells = [];
        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (!currentBoard.some(tile => tile.row === r && tile.col === c)) {
                    emptyCells.push({ r, c });
                }
            }
        }
        if (emptyCells.length === 0) return currentBoard;
        const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const value = Math.random() < 0.9 ? 2 : 4;
        return [...currentBoard, createTile(r, c, value)];
    }, [createTile]);

    const initializeGame = useCallback(() => {
        tileIdCounter.current = 0;
        setBoard(addRandomTile(addRandomTile([])));
        setScore(0);
        setGameState('PLAYING');
    }, [addRandomTile]);

    useEffect(() => {
        initializeGame();
    }, [initializeGame]);

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('2048-highScore', score);
        }
    }, [score, highScore]);

    const handleMove = useCallback((direction) => {
        if (gameState !== 'PLAYING') return;

        const { board: newBoard, hasChanged, score: moveScore } = moveTiles(direction, board);

        if (hasChanged) {
            let boardWithNewTile = addRandomTile(newBoard);
            setBoard(boardWithNewTile);
            setScore(prev => prev + moveScore);

            if (gameState === 'PLAYING' && boardWithNewTile.some(t => t.value === 2048)) {
                setGameState('WON');
            } else if (isGameOver(boardWithNewTile)) {
                setGameState('LOST');
            }
        }
    }, [board, gameState, addRandomTile]);

    const swipeHandlers = useSwipe({
        onSwipeLeft: () => handleMove('LEFT'),
        onSwipeRight: () => handleMove('RIGHT'),
        onSwipeUp: () => handleMove('UP'),
        onSwipeDown: () => handleMove('DOWN'),
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState !== 'PLAYING') return;
            const moveMap = {
                ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
                ArrowUp: 'UP', ArrowDown: 'DOWN'
            };
            if (moveMap[e.key]) {
                e.preventDefault();
                handleMove(moveMap[e.key]);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleMove, gameState]);

    return (
        <div className="game-2048-container">
            <h1 className="game-2048-header">2048</h1>
            <div className="game-2048-main-content">
                <aside className="game-2048-left-panel">
                    <Stats title="SCORE" value={score} />
                    <Stats title="BEST" value={highScore} />
                </aside>
                <main className="game-2048-board-container" {...swipeHandlers}>
                    {gameState === 'LOST' && <GameOverlay title="Game Over!" score={score} onRestart={initializeGame} buttonText="Try Again" />}
                    {gameState === 'WON' && <GameOverlay title="You Win!" score={null} onRestart={() => setGameState('PLAYING')} buttonText="Continue Playing" />}
                    <div className="game-board-grid">
                        {Array.from({ length: 16 }).map((_, i) => <div key={i} className="grid-cell" />)}
                    </div>
                    <div className="tile-container">
                        {board.map(tile => <Tile key={tile.id} value={tile.value} x={tile.col} y={tile.row} isNew={tile.isNew} isMerged={tile.isMerged} />)}
                    </div>
                </main>
                <aside className="game-2048-right-panel">
                    <div className="instructions-box"><h3>HOW TO PLAY</h3><p>Use arrow keys or swipe to move tiles. Two tiles with the same number merge into one!</p></div>
                    <button onClick={initializeGame} className="restart-btn">New Game</button>
                </aside>
            </div>
        </div>
    );
};

export default Game2048;

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './FifteenPuzzle.css';

const GRID_SIZE = 4;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;
const EMPTY_TILE_VALUE = 0;

const isSolvable = (tiles) => {
    let inversions = 0;
    const flatTiles = tiles.filter(t => t !== EMPTY_TILE_VALUE);

    for (let i = 0; i < flatTiles.length - 1; i++) {
        for (let j = i + 1; j < flatTiles.length; j++) {
            if (flatTiles[i] > flatTiles[j]) {
                inversions++;
            }
        }
    }

    const emptyRow = Math.floor(tiles.indexOf(EMPTY_TILE_VALUE) / GRID_SIZE);
    const rowFromBottom = GRID_SIZE - emptyRow; 


    if (GRID_SIZE % 2 !== 0) { 
        return inversions % 2 === 0;
    } else { 
        if (rowFromBottom % 2 !== 0) { 
            return inversions % 2 === 0;
        } else { 
            return inversions % 2 !== 0;
        }
    }
};


const shuffleTiles = () => {
    let tiles = Array.from({ length: TOTAL_TILES }, (_, i) => i);

    do {
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
    } while (!isSolvable(tiles) || tiles.every((val, i) => val === i)); 

    return tiles;
};


const isSolved = (tiles) => {
    for (let i = 0; i < TOTAL_TILES - 1; i++) {
        if (tiles[i] !== i + 1) {
            return false;
        }
    }
    return tiles[TOTAL_TILES - 1] === EMPTY_TILE_VALUE; 
};


function FifteenPuzzle() {
    const navigate = useNavigate();
    const [tiles, setTiles] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const initializeGame = useCallback(() => {
        setTiles(shuffleTiles());
        setMoves(0);
        setGameOver(false);
    }, []);

    useEffect(() => {
        initializeGame();
    }, [initializeGame]);

    const handleTileClick = (index) => {
        if (gameOver) return;

        const emptyIndex = tiles.indexOf(EMPTY_TILE_VALUE);
        const clickedRow = Math.floor(index / GRID_SIZE);
        const clickedCol = index % GRID_SIZE;
        const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
        const emptyCol = emptyIndex % GRID_SIZE;

        const isAdjacent = (
            (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
            (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow)
        );

        if (isAdjacent) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]]; // Swap
            setTiles(newTiles);
            setMoves(prev => prev + 1);

            if (isSolved(newTiles)) {
                setGameOver(true);
            }
        }
    };

    return (
        <div className="fp-app-container">
            <h1 className="fp-header">15 Puzzle</h1>

            <div className="puzzle-board">
                {tiles.map((tile, index) => (
                    <div
                        key={index}
                        className={`puzzle-tile ${tile === EMPTY_TILE_VALUE ? 'empty' : ''}`}
                        onClick={() => handleTileClick(index)}
                    >
                        {tile !== EMPTY_TILE_VALUE ? tile : ''}
                    </div>
                ))}
                {gameOver && (
                    <div className="win-overlay">
                        <h2>Puzzle Solved!</h2>
                        <p>You did it in <span>{moves}</span> moves!</p>
                        <button className="fp-button" onClick={initializeGame}>Play Again</button>
                        <button className="fp-button-secondary" onClick={() => navigate('/fifteen-puzzle')}>Back to Home</button>
                    </div>
                )}
            </div>

            <div className="game-ui">
                <div>Moves: <span>{moves}</span></div>
                <button className="fp-button-secondary" onClick={initializeGame} disabled={gameOver}>Shuffle</button>
            </div>
            <button className="fp-button-secondary" onClick={() => navigate('/fifteen-puzzle')} style={{marginTop: '2rem', background: '#474'}}>HOME</button>
        </div>
    );
}

export default FifteenPuzzle;
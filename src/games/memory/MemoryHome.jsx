import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Memory.css';

const MemoryHome = () => {
    const navigate = useNavigate();
    const [level, setLevel] = useState({ name: 'easy', size: 16, cols: 4 });
    const [highScores, setHighScores] = useState({ easy: 'N/A', medium: 'N/A', hard: 'N/A' });

    useEffect(() => {
        const storedScores = localStorage.getItem('memoryHighScores');
        if (storedScores) {
            setHighScores(JSON.parse(storedScores));
        }
    }, []);

    const handleLevelSelect = (name, size, cols) => {
        setLevel({ name, size, cols });
    };

    const startGame = () => {
        navigate('/memory/play', { state: { level: level.name, size: level.size, cols: level.cols } });
    };

    return (
        <div className="memory-home-page fade-in">
            <div className="game-home-container">
                <div className="game-icon-large">🧠</div>
                <h1 className="game-title" style={{ color: '#3498db' }}>MEMORY GAME</h1>
                <p className="game-subtitle">Test your memory and find all the matching pairs!</p>

                <div className="game-options">
                    <div className="option-group">
                        <h3>SELECT LEVEL</h3>
                        <div className="option-buttons">
                            <button
                                className={`option-btn ${level.name === 'easy' ? 'active' : ''}`}
                                onClick={() => handleLevelSelect('easy', 16, 4)}
                            >
                                😊 Easy (4x4)
                            </button>
                            <button
                                className={`option-btn ${level.name === 'medium' ? 'active' : ''}`}
                                onClick={() => handleLevelSelect('medium', 30, 6)}
                            >
                                🤔 Medium (6x5)
                            </button>
                            <button
                                className={`option-btn ${level.name === 'hard' ? 'active' : ''}`}
                                onClick={() => handleLevelSelect('hard', 36, 6)}
                            >
                                😤 Hard (6x6)
                            </button>
                        </div>
                    </div>
                </div>

                <div className="high-scores">
                    <h2>BEST TIMES</h2>
                    <ul>
                        <li>Easy: <span>{highScores.easy}</span></li>
                        <li>Medium: <span>{highScores.medium}</span></li>
                        <li>Hard: <span>{highScores.hard}</span></li>
                    </ul>
                </div>

                <button
                    className="start-game-btn pulse"
                    onClick={startGame}
                    style={{ background: 'linear-gradient(135deg, #3498db, #2980b9)' }}
                >
                    🚀 Start Game
                </button>
            </div>
        </div>
    );
};

export default MemoryHome;

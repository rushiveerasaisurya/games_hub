
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Memory.css';

const Memory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { level, size, cols } = location.state || { level: 'easy', size: 16, cols: 4 };

    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const timerRef = useRef(null);

    const icons = ['🍒', '🍇', '🍉', '🍋', '🍏', '🍑', '🍓', '🍊', '🥝', '🥥', '🍍', '🥬', '🍅', '🍐', '🥒', '🌻', '🌼', '🌷', '🍀', '🌱', '🌸', '🌹', '🍁', '🍂', '🍃', '🍄', '🍆', '🍈', '🍔', '🍕', '🍖'];

    useEffect(() => {
        initializeGame();
    }, [size]);

    useEffect(() => {
        if (isRunning && !isGameOver) {
            timerRef.current = setInterval(() => {
                setTimer(prev => prev + 10);
            }, 10);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isRunning, isGameOver]);

    useEffect(() => {
        if (matchedCards.length === size / 2 && size > 0) {
            setIsGameOver(true);
            setIsRunning(false);
            updateHighScore();
        }
    }, [matchedCards, size]);

    const initializeGame = () => {
        const selectedIcons = icons.slice(0, size / 2);
        const shuffledCards = [...selectedIcons, ...selectedIcons]
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({ id: index, icon, isFlipped: false, isMatched: false }));
        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTimer(0);
        setIsRunning(false);
        setIsGameOver(false);
    };

    const handleCardClick = (card) => {
        if (!isRunning) {
            setIsRunning(true);
        }

        if (flippedCards.length === 2 || card.isFlipped || card.isMatched) {
            return;
        }

        const newFlippedCards = [...flippedCards, card];
        setFlippedCards(newFlippedCards);

        const newCards = cards.map(c => (c.id === card.id ? { ...c, isFlipped: true } : c));
        setCards(newCards);

        if (newFlippedCards.length === 2) {
            setMoves(moves + 1);
            checkForMatch(newFlippedCards);
        }
    };

    const checkForMatch = (flipped) => {
        const [card1, card2] = flipped;
        if (card1.icon === card2.icon) {
            setMatchedCards(prev => [...prev, card1.icon]);
            setCards(prevCards => prevCards.map(c => (c.icon === card1.icon ? { ...c, isMatched: true } : c)));
            setFlippedCards([]);
        } else {
            setTimeout(() => {
                setCards(prevCards => prevCards.map(c => (c.id === card1.id || c.id === card2.id ? { ...c, isFlipped: false } : c)));
                setFlippedCards([]);
            }, 1000);
        }
    };

    const updateHighScore = () => {
        const storedScores = JSON.parse(localStorage.getItem('memoryHighScores')) || { easy: 'N/A', medium: 'N/A', hard: 'N/A' };
        const currentBest = storedScores[level];

        if (currentBest === 'N/A' || formatTime(timer) < currentBest) {
            const newScores = { ...storedScores, [level]: formatTime(timer) };
            localStorage.setItem('memoryHighScores', JSON.stringify(newScores));
        }
    };

    const formatTime = (milliseconds) => {
        const mins = Math.floor(milliseconds / 60000).toString().padStart(2, '0');
        const secs = Math.floor((milliseconds % 60000) / 1000).toString().padStart(2, '0');
        const ms = (milliseconds % 1000).toString().padStart(3, '0').slice(0, 2);
        return `${mins}:${secs}.${ms}`;
    };

    return (
        <div className="memory-game fade-in">
            <div className="memory-container">
                <div className="memory-game-header">
                    <h2>MEMORY GAME</h2>
                </div>

                <div className="memory-game-body">
                    <div className="memory-info">
                        <div>📊 Level: {level.charAt(0).toUpperCase() + level.slice(1)}</div>
                        <div>🔄 Moves: {moves}</div>
                        <div>⏱️ Time: {formatTime(timer)}</div>
                    </div>

                    <div className="memory-board-container">
                        <div className="memory-board" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                            {cards.map(card => (
                                <div
                                    key={card.id}
                                    className={`memory-card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                                    onClick={() => handleCardClick(card)}
                                >
                                    <div className="memory-card-content">{card.icon}</div>
                                </div>
                            ))}
                        </div>
                        {isGameOver && (
                            <div className="game-over-overlay">
                                <div className="game-over">
                                    <h3>Congratulations! You won! 🎉</h3>
                                    <p>You completed the {level} level in {formatTime(timer)} with {moves} moves.</p>
                                    <div className="game-over-buttons">
                                        <button className="play-again-btn" onClick={initializeGame}>Play Again</button>
                                        <button className="back-btn" onClick={() => navigate('/memory')}>Back to Levels</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="footer-buttons">
                    <button className="footer-btn" onClick={initializeGame}>Restart</button>
                    <button className="footer-btn" onClick={() => navigate('/memory')}>Back to Home</button>
                </div>
            </div>
        </div>
    );
};

export default Memory;

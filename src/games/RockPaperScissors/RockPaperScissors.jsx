import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RockPaperScissors.css';

const CHOICES = ['rock', 'paper', 'scissors'];
const HandIcon = ({ choice, isShaking }) => {
    const iconMap = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };
    return <div className={`hand-icon ${isShaking ? 'shaking' : ''}`}>{iconMap[choice]}</div>;
};

const RockPaperScissors = () => {
    const navigate = useNavigate();

    const [gameState, setGameState] = useState('waiting'); 
    const [playerChoice, setPlayerChoice] = useState(null);
    const [cpuChoice, setCpuChoice] = useState(null);
    const [result, setResult] = useState(null);
    const [scores, setScores] = useState({ player: 0, cpu: 0 });
    const [countdown, setCountdown] = useState(3);

    const handlePlayerChoice = (choice) => {
        setPlayerChoice(choice);
        setCpuChoice(CHOICES[Math.floor(Math.random() * 3)]);
        setGameState('countdown');
    };

    const determineWinner = (p1, cpu) => {
        if (p1 === cpu) return 'draw';
        if (
            (p1 === 'rock' && cpu === 'scissors') ||
            (p1 === 'scissors' && cpu === 'paper') ||
            (p1 === 'paper' && cpu === 'rock')
        ) {
            return 'player';
        }
        return 'cpu';
    };

    useEffect(() => {
        if (gameState === 'countdown') {
            const timer = setInterval(() => {
                setCountdown(c => {
                    if (c === 1) {
                        clearInterval(timer);
                        const winner = determineWinner(playerChoice, cpuChoice);
                        if (winner === 'player') {
                            setScores(s => ({ ...s, player: s.player + 1 }));
                            setResult('You Win!');
                        } else if (winner === 'cpu') {
                            setScores(s => ({ ...s, cpu: s.cpu + 1 }));
                            setResult('CPU Wins!');
                        } else {
                            setResult('It\'s a Draw!');
                        }
                        setGameState('reveal');
                    }
                    return c - 1;
                });
            }, 800);
            return () => clearInterval(timer);
        }
    }, [gameState, playerChoice, cpuChoice]);

    const playAgain = () => {
        setGameState('waiting');
        setPlayerChoice(null);
        setCpuChoice(null);
        setResult(null);
        setCountdown(3);
    };

    const getResultClass = () => {
        if (!result) return '';
        if (result.includes('You')) return 'win';
        if (result.includes('Draw')) return 'draw';
        return 'lose';
    };

    return (
        <div className="rps-app-container">
            <h1 className="rps-header">Rock Paper Scissors</h1>
            <div className="rps-main-content">,
                <div className={`cpu-panel`}>
                    <div>
                        <h2 className="player-title">CPU</h2>
                        <p className="player-score">Score: {scores.cpu}</p>
                    </div>
                    <div className="hand-animation-stage">
                        {gameState === 'countdown' && <HandIcon choice="rock" isShaking={true} />}
                        {gameState === 'reveal' && <HandIcon choice={cpuChoice} />}
                    </div>
                    <div className="cpu-message">
                        <p>Waiting for player...</p>
                    </div>
                </div>,
                <div className="game-status-panel">
                    {gameState === 'countdown' && <h2 className="countdown-text">{countdown}</h2>}
                    {gameState === 'reveal' && (
                        <>
                            <h2 className={`result-text ${getResultClass()}`}>{result}</h2>
                            <button className="rps-button" onClick={playAgain}>Play Again</button>
                        </>
                    )}
                </div>
                <div className={`player-panel active-turn`}>
                    <div>
                        <h2 className="player-title">Player</h2>
                        <p className="player-score">Score: {scores.player}</p>
                    </div>
                    <div className="hand-animation-stage">
                        {gameState === 'countdown' && <HandIcon choice="rock" isShaking={true} />}
                        {gameState === 'reveal' && <HandIcon choice={playerChoice} />}
                    </div>
                    <div className="choice-buttons">
                        {CHOICES.map(choice => (
                            <button
                                key={choice}
                                className="choice-btn"
                                onClick={() => handlePlayerChoice(choice)}
                                disabled={gameState !== 'waiting'}
                            >
                                <HandIcon choice={choice} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <button className="rps-button" style={{ marginTop: '2rem' }} onClick={() => navigate('/')}>
                Back to Home
            </button>
        </div>
    );
};

export default RockPaperScissors;

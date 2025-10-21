import { useNavigate } from 'react-router-dom';
import './RockPaperScissors.css';

const RockPaperScissorsHome = () => {
    const navigate = useNavigate();

    const selectMode = (mode) => {
        navigate('/rock-paper-scissors/play', { state: { gameMode: mode } });
    };

    return (
        <div className="game-home-page fade-in">
            <div className="game-home-container">
                <div className="game-icon-large">✊✋✌️</div>
                <h1 className="game-title" style={{ color: '#ff8a00' }}>Rock Paper Scissors</h1>
                <p className="game-subtitle">Outsmart your opponent in this classic game of choices!</p>
                <div className="game-instructions">
                    <h4>How to Play</h4>
                    <div className="instructions">
                        <p>✊ Rock crushes Scissors</p>
                        <p>✋ Paper covers Rock</p>
                        <p>✌️ Scissors cuts Paper</p>
                        <p>🏆 Choose your move to claim victory!</p>
                    </div>
                </div>

                <button 
                    className="start-game-btn pulse" 
                    onClick={() => selectMode('pvc')}
                    style={{ background: 'linear-gradient(135deg, #ff8a00, #f65e3b)' }}>
                        🚀 Start Game
                </button>
            </div>
        </div>
        
    );
};

export default RockPaperScissorsHome;
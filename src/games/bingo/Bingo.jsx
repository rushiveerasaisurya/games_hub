import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bingo.css';

function Bingo() {
  const navigate = useNavigate();
  const [card, setCard] = useState([]);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [markedNumbers, setMarkedNumbers] = useState(new Set());
  const [gameWon, setGameWon] = useState(false);
  const [isAutoCall, setIsAutoCall] = useState(false);

  const ranges = {
    B: [1, 15],
    I: [16, 30],
    N: [31, 45],
    G: [46, 60],
    O: [61, 75]
  };

  useEffect(() => {
    generateCard();
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoCall && calledNumbers.length < 75 && !gameWon) {
      interval = setInterval(() => {
        callNextNumber();
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isAutoCall, calledNumbers, gameWon]);

  const generateCard = () => {
    const newCard = [];
    const letters = ['B', 'I', 'N', 'G', 'O'];
    
    for (let col = 0; col < 5; col++) {
      const column = [];
      const [min, max] = ranges[letters[col]];
      const usedNumbers = new Set();
      
      for (let row = 0; row < 5; row++) {
        if (col === 2 && row === 2) {
          // Free space in center
          column.push({ number: 'FREE', letter: 'N', isFree: true });
        } else {
          let num;
          do {
            num = Math.floor(Math.random() * (max - min + 1)) + min;
          } while (usedNumbers.has(num));
          
          usedNumbers.add(num);
          column.push({ number: num, letter: letters[col], isFree: false });
        }
      }
      newCard.push(column);
    }
    
    setCard(newCard);
    setMarkedNumbers(new Set(['FREE']));
  };

  const callNextNumber = () => {
    const availableNumbers = [];
    
    Object.entries(ranges).forEach(([letter, [min, max]]) => {
      for (let i = min; i <= max; i++) {
        if (!calledNumbers.find(call => call.number === i)) {
          availableNumbers.push({ number: i, letter });
        }
      }
    });
    
    if (availableNumbers.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newCall = availableNumbers[randomIndex];
    
    setCalledNumbers(prev => [...prev, newCall]);
    setCurrentNumber(newCall);
  };

  const markNumber = (number) => {
    if (number === 'FREE' || markedNumbers.has(number)) return;
    
    const isNumberOnCard = card.some(column => 
      column.some(cell => cell.number === number)
    );
    
    if (isNumberOnCard && calledNumbers.find(call => call.number === number)) {
      setMarkedNumbers(prev => new Set([...prev, number]));
    }
  };

  const checkForWin = () => {
    if (card.length === 0) return false;
    
    // Check rows
    for (let row = 0; row < 5; row++) {
      if (card.every(col => markedNumbers.has(col[row].number) || col[row].isFree)) {
        return true;
      }
    }
    
    // Check columns
    for (let col = 0; col < 5; col++) {
      if (card[col].every(cell => markedNumbers.has(cell.number) || cell.isFree)) {
        return true;
      }
    }
    
    // Check diagonals
    const diagonal1 = [0, 1, 2, 3, 4].every(i => 
      markedNumbers.has(card[i][i].number) || card[i][i].isFree
    );
    
    const diagonal2 = [0, 1, 2, 3, 4].every(i => 
      markedNumbers.has(card[i][4-i].number) || card[i][4-i].isFree
    );
    
    return diagonal1 || diagonal2;
  };

  const handleBingo = () => {
    if (checkForWin()) {
      setGameWon(true);
      setIsAutoCall(false);
    } else {
      alert('No BINGO yet! Keep playing!');
    }
  };

  const resetGame = () => {
    setCalledNumbers([]);
    setCurrentNumber(null);
    setMarkedNumbers(new Set());
    setGameWon(false);
    setIsAutoCall(false);
    generateCard();
  };

  return (
    <div className="bingo-game fade-in">
      <div className="game-container">
        <div className="game-header">
          <h2>Bingo Game</h2>
          <div className="game-controls">
            <button 
              className={`auto-call-btn ${isAutoCall ? 'active' : ''}`}
              onClick={() => setIsAutoCall(!isAutoCall)}
              disabled={gameWon}
            >
              {isAutoCall ? '⏸️ Pause' : '▶️ Auto Call'}
            </button>
            <button 
              className="manual-call-btn"
              onClick={callNextNumber}
              disabled={isAutoCall || gameWon || calledNumbers.length >= 75}
            >
              📢 Call Number
            </button>
          </div>
        </div>

        <div className="game-board">
          <div className="caller-section">
            <div className="current-call">
              {currentNumber ? (
                <div className="called-number">
                  <span className="letter">{currentNumber.letter}</span>
                  <span className="number">{currentNumber.number}</span>
                </div>
              ) : (
                <div className="no-call">Ready to start!</div>
              )}
            </div>
            
            <div className="called-numbers">
              <h4>Called Numbers ({calledNumbers.length}/75)</h4>
              <div className="numbers-grid">
                {calledNumbers.slice(-10).map((call, index) => (
                  <span key={index} className="called-chip">
                    {call.letter}{call.number}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bingo-card">
            <div className="card-header">
              {['B', 'I', 'N', 'G', 'O'].map(letter => (
                <div key={letter} className="header-letter">{letter}</div>
              ))}
            </div>
            
            <div className="card-grid">
              {Array.from({ length: 5 }, (_, row) =>
                Array.from({ length: 5 }, (_, col) => {
                  const cell = card[col] && card[col][row];
                  if (!cell) return null;
                  
                  const isMarked = markedNumbers.has(cell.number) || cell.isFree;
                  
                  return (
                    <div
                      key={`${col}-${row}`}
                      className={`bingo-cell ${isMarked ? 'marked' : ''} ${cell.isFree ? 'free' : ''}`}
                      onClick={() => markNumber(cell.number)}
                    >
                      {cell.number}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="bingo-button-section">
          <button 
            className="bingo-btn"
            onClick={handleBingo}
            disabled={gameWon}
          >
            🎉 BINGO!
          </button>
        </div>

        <div className="game-actions">
          <button className="action-btn" onClick={resetGame}>
            🔄 New Game
          </button>
          <button className="action-btn" onClick={() => navigate('/bingo')}>
            ⚙️ Settings
          </button>
        </div>

        {gameWon && (
          <div className="game-overlay">
            <h3>🎉 BINGO!</h3>
            <p>Congratulations! You won!</p>
            <p>Numbers called: {calledNumbers.length}</p>
            <div className="win-buttons">
              <button className="play-again-btn" onClick={resetGame}>
                🔄 Play Again
              </button>
              <button className="back-btn" onClick={() => navigate('/')}>
                🏠 Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bingo;
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./FlappyBird.css";

const GAME_WIDTH = 360, GAME_HEIGHT = 520, BIRD_X = 90, BIRD_SIZE = 28;
const GRAVITY = 0.2, JUMP_VEL = -5, PIPE_WIDTH = 54, PIPE_GAP = 157, PIPE_SPEED = 2.6;
const GROUND_HEIGHT = 90, PIPE_INTERVAL = 1400;

function getPipeTop() {
  const min = 70, max = GAME_HEIGHT - GROUND_HEIGHT - PIPE_GAP - 60;
  return Math.floor(Math.random() * (max - min)) + min;
}

function FlappyBird() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('flappyBirdHighScore')) || 0;
  });
  const [birdTransform, setBirdTransform] = useState(`translateY(0px) rotate(0deg)`);
  const [pipes, setPipes] = useState([]);
  const birdY = useRef(GAME_HEIGHT / 2 - BIRD_SIZE / 2);
  const birdVel = useRef(0);
  const pipesRef = useRef([]);
  const frame = useRef();
  const lastTime = useRef();
  const nextPipeTime = useRef(Date.now());
  
  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setPipes([]);
    pipesRef.current = [];
    birdY.current = GAME_HEIGHT / 2 - BIRD_SIZE / 2;
    birdVel.current = JUMP_VEL;
    nextPipeTime.current = Date.now() + PIPE_INTERVAL;
    lastTime.current = undefined;
  }, []);

  const flap = useCallback(() => {
    if (gameState === 'over') {
      startGame();
    } else {
      if (gameState === 'start') {
        setGameState('playing');
      }
      birdVel.current = JUMP_VEL;
    }
  }, [gameState, startGame]);

  useEffect(() => {
    if (gameState === 'over' && score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappyBirdHighScore', score.toString());
    }
  }, [gameState, score, highScore]);

  useEffect(() => {
    function animate(now) {
      if (!lastTime.current) lastTime.current = now;
      const dt = (now - lastTime.current) / 16.67;
      lastTime.current = now;

      if (gameState === 'playing') {
        birdVel.current += GRAVITY * dt;
        birdY.current += birdVel.current * dt;
        if (nextPipeTime.current <= Date.now()) {
          pipesRef.current.push({ x: GAME_WIDTH, top: getPipeTop(), passed: false });
          nextPipeTime.current = Date.now() + PIPE_INTERVAL;
        }
        pipesRef.current = pipesRef.current
          .map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED * dt }))
          .filter(pipe => pipe.x + PIPE_WIDTH > 0);
        let collisionDetected = false;
        let scoredThisFrame = 0;
        const birdBox = { x: BIRD_X, y: birdY.current, w: BIRD_SIZE, h: BIRD_SIZE };
        if (birdY.current <= 0 || birdY.current + BIRD_SIZE >= GAME_HEIGHT - GROUND_HEIGHT) {
          collisionDetected = true;
        }
        for (let pipe of pipesRef.current) {
          if (!pipe.passed && pipe.x + PIPE_WIDTH < birdBox.x) {
            scoredThisFrame++;
            pipe.passed = true;
          }
          if (birdBox.x + birdBox.w > pipe.x && birdBox.x < pipe.x + PIPE_WIDTH) {
            if (birdBox.y < pipe.top || birdBox.y + birdBox.h > pipe.top + PIPE_GAP) {
              collisionDetected = true;
            }
          }
        }
        if (collisionDetected) {
          setGameState('over');
        } else {
          const angle = Math.max(-30, Math.min(90, birdVel.current * 7));
          setBirdTransform(`translateY(${birdY.current}px) rotate(${angle}deg)`);
          setPipes([...pipesRef.current]);
          if (scoredThisFrame > 0) setScore(s => s + scoredThisFrame);
        }
      }
      frame.current = requestAnimationFrame(animate);
    }
    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current);
  }, [gameState]);
  useEffect(() => {
    const handleKey = (e) => { if (e.code === "Space" || e.key === " ") flap(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [flap]);

  return (
    <div className="flappy-bird-app-container">
      <h1 className="fb-header">Flappy Bird</h1>
      <div className="flappy-game-container" onClick={flap}>
        {pipes.map((pipe, idx) => (
          <React.Fragment key={idx}>
            <div className="flappy-pipe top" style={{ left: pipe.x + "px", height: pipe.top + "px" }} />
            <div className="flappy-pipe bottom" style={{
              left: pipe.x + "px",
              height: (GAME_HEIGHT - pipe.top - PIPE_GAP - GROUND_HEIGHT) + "px"
            }} />
          </React.Fragment>
        ))}
        <div className="flappy-bird" style={{ left: BIRD_X + "px", transform: birdTransform }}>
          <div className="flappy-bird-body"></div>
          <div className="flappy-bird-wing"></div>
          <div className="flappy-bird-eye"></div>
        </div>
        <div className="flappy-score">{score}</div>
        <div className="flappy-ground" />
        {(gameState === 'start' || gameState === 'over') && (
          <div className="flappy-overlay">
            <h2>{gameState === 'over' ? "Game Over!" : "Click or Space to Start!"}</h2>
            {gameState === 'over' && <div style={{ color: 'white', fontSize: '1.5rem', marginTop: '1rem' }}>High Score: {highScore}</div>}
            <button onClick={flap}>{gameState === 'over' ? "Play Again" : "Start"}</button>
            <button onClick={() => navigate("/flappy-bird")} style={{ marginTop: "1rem", background: "#474" }}>Back to Home</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default FlappyBird;